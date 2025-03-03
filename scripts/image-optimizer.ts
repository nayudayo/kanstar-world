import sharp from 'sharp';
import path from 'path';
import { promises as fs } from 'fs';
import { existsSync } from 'fs';

interface OptimizationOptions {
  quality?: number;
  width?: number;
  height?: number;
  fit?: keyof sharp.FitEnum;
  format?: 'webp' | 'avif';
}

interface ImageStats {
  originalSize: number;
  optimizedSize: number;
  compressionRatio: number;
  format: string;
  filePath: string;
}

const DEFAULT_OPTIONS: OptimizationOptions = {
  quality: 80,
  format: 'webp'
};

async function optimizeImage(
  inputPath: string,
  outputPath: string,
  options: OptimizationOptions = DEFAULT_OPTIONS
): Promise<ImageStats> {
  // Ensure output directory exists
  const outputDir = path.dirname(outputPath);
  if (!existsSync(outputDir)) {
    await fs.mkdir(outputDir, { recursive: true });
  }

  // Read original file stats
  const originalStats = await fs.stat(inputPath);
  const originalSize = originalStats.size;

  // Process image
  let pipeline = sharp(inputPath);

  // Resize if dimensions provided
  if (options.width || options.height) {
    pipeline = pipeline.resize(options.width, options.height, {
      fit: options.fit || 'contain',
      withoutEnlargement: true
    });
  }

  // Convert to WebP with quality settings
  if (options.format === 'webp') {
    pipeline = pipeline.webp({
      quality: options.quality,
      effort: 6, // Higher effort = better compression but slower
      smartSubsample: true
    });
  } else if (options.format === 'avif') {
    pipeline = pipeline.avif({
      quality: options.quality,
      effort: 6,
      chromaSubsampling: '4:4:4'
    });
  }

  // Save optimized image
  await pipeline.toFile(outputPath);

  // Get optimized file stats
  const optimizedStats = await fs.stat(outputPath);
  const optimizedSize = optimizedStats.size;

  return {
    originalSize,
    optimizedSize,
    compressionRatio: (1 - (optimizedSize / originalSize)) * 100,
    format: options.format || 'webp',
    filePath: path.relative(process.cwd(), inputPath)
  };
}

async function* findImageFiles(dir: string): AsyncGenerator<string> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      yield* findImageFiles(fullPath);
    } else if (/\.(jpg|jpeg|png)$/i.test(entry.name)) {
      yield fullPath;
    }
  }
}

async function processDirectory(
  inputDir: string,
  outputDir: string,
  options: OptimizationOptions = DEFAULT_OPTIONS
): Promise<ImageStats[]> {
  const stats: ImageStats[] = [];
  
  try {
    // Recursively find all image files
    for await (const inputPath of findImageFiles(inputDir)) {
      try {
        // Create corresponding output path maintaining directory structure
        const relativePath = path.relative(inputDir, inputPath);
        const outputPath = path.join(
          outputDir,
          relativePath.replace(/\.[^.]+$/, `.${options.format || 'webp'}`)
        );
        
        console.log(`🔄 Processing ${relativePath}...`);
        const imageStats = await optimizeImage(inputPath, outputPath, options);
        stats.push(imageStats);
        
        console.log(`✅ Processed ${relativePath}:`);
        console.log(`   Original size: ${(imageStats.originalSize / 1024).toFixed(2)}KB`);
        console.log(`   Optimized size: ${(imageStats.optimizedSize / 1024).toFixed(2)}KB`);
        console.log(`   Compression ratio: ${imageStats.compressionRatio.toFixed(2)}%\n`);
      } catch (error) {
        console.error(`❌ Error processing ${inputPath}:`, error);
      }
    }

    if (stats.length === 0) {
      console.log('⚠️ No compatible image files found (looking for .jpg, .jpeg, .png)');
    }
  } catch (error) {
    console.error('Error reading directory:', error);
  }
  
  return stats;
}

export type { OptimizationOptions, ImageStats };
export { optimizeImage, processDirectory }; 
#!/usr/bin/env node
import { processDirectory } from './image-optimizer';
import path from 'path';

const INPUT_DIR = path.join(process.cwd(), 'public/images');
const OUTPUT_DIR = path.join(process.cwd(), 'public/images/optimized');

async function main() {
  console.log('🚀 Starting image optimization process...');
  console.log(`📁 Input directory: ${INPUT_DIR}`);
  console.log(`📁 Output directory: ${OUTPUT_DIR}`);
  
  try {
    const stats = await processDirectory(INPUT_DIR, OUTPUT_DIR, {
      quality: 80,
      format: 'webp'
    });
    
    // Print summary
    const totalOriginal = stats.reduce((sum, stat) => sum + stat.originalSize, 0);
    const totalOptimized = stats.reduce((sum, stat) => sum + stat.optimizedSize, 0);
    const averageCompression = stats.reduce((sum, stat) => sum + stat.compressionRatio, 0) / stats.length;
    
    console.log('\n📊 Optimization Summary:');
    console.log(`   Total files processed: ${stats.length}`);
    console.log(`   Total original size: ${(totalOriginal / 1024 / 1024).toFixed(2)}MB`);
    console.log(`   Total optimized size: ${(totalOptimized / 1024 / 1024).toFixed(2)}MB`);
    console.log(`   Average compression ratio: ${averageCompression.toFixed(2)}%`);
    
  } catch (error) {
    console.error('❌ Error during optimization:', error);
    process.exit(1);
  }
}

main(); 
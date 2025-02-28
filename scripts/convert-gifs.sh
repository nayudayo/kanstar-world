#!/bin/bash

# Directory structure
INPUT_DIR="public/images"
OUTPUT_DIR="public/videos"
QUALITY="good"  # can be 'best', 'good', or 'fast'

# Create output directory if it doesn't exist
mkdir -p "$OUTPUT_DIR"

# Function to convert GIF to WebM and MP4
convert_gif() {
    input_file="$1"
    relative_path="${input_file#$INPUT_DIR/}"
    dirname=$(dirname "$relative_path")
    filename=$(basename "$relative_path")
    output_dir="$OUTPUT_DIR/$dirname"
    
    echo "-----------------------------------"
    echo "Processing: $input_file"
    echo "Relative path: $relative_path"
    echo "Directory: $dirname"
    echo "Filename: $filename"
    echo "Output directory: $output_dir"
    
    # Create output directory structure
    mkdir -p "$output_dir"
    
    # Convert to WebM with VP9 codec
    echo "Converting to WebM..."
    ffmpeg -y -i "$input_file" \
        -c:v libvpx-vp9 \
        -b:v 1M \
        -deadline "$QUALITY" \
        -cpu-used 2 \
        "$output_dir/$filename.webm" || {
            echo "❌ Error: WebM conversion failed for $input_file"
            return 1
        }
    
    # Convert to MP4 with H.264 codec
    echo "Converting to MP4..."
    ffmpeg -y -i "$input_file" \
        -c:v libx264 \
        -b:v 1M \
        -preset medium \
        -movflags faststart \
        "$output_dir/$filename.mp4" || {
            echo "❌ Error: MP4 conversion failed for $input_file"
            return 1
        }
    
    echo "✓ Successfully converted $filename"
    echo "  WebM: $output_dir/$filename.webm"
    echo "  MP4: $output_dir/$filename.mp4"
}

# Print start message
echo "==================================="
echo "Starting GIF conversion..."
echo "Input directory: $INPUT_DIR"
echo "Output directory: $OUTPUT_DIR"
echo "==================================="

# List of all GIFs to convert
gifs_to_convert=(
    "assets/footer.gif"
    "gif/coin-spin.gif"
    "gif/lore/lore-1.gif"
    "gif/lore/lore-2.gif"
    "gif/lore/lore-3.gif"
    "gif/lore/lore-4.gif"
    "gif/lore/story-telling.gif"
    "planet.gif"
    "token-section/token.GIF"
)

# Convert all GIFs
for file in "${gifs_to_convert[@]}"; do
    full_path="$INPUT_DIR/$file"
    if [ -f "$full_path" ]; then
        echo "Converting file: $file"
        convert_gif "$full_path"
    else
        echo "⚠️ Warning: File not found: $full_path"
    fi
done

echo "==================================="
echo "Conversion process completed!"
echo "Please check the output directory for the converted files."
echo "===================================" 
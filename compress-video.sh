#!/bin/bash

# Script to compress video for web optimization
# Install ffmpeg first: brew install ffmpeg

# Input and output files
INPUT="public/video/vid-bg-amforest(1).mp4"
OUTPUT="public/video/vid-bg-amforest-optimized.mp4"

# Compress video with the following settings:
# -t 9: Limit to 9 seconds
# -vf scale=1280:720: Scale down to 720p
# -c:v libx264: Use H.264 codec
# -crf 28: Higher CRF = lower quality but smaller file (range: 0-51, 23 is default)
# -preset fast: Faster encoding
# -c:a aac -b:a 64k: Compress audio to 64kbps
# -movflags +faststart: Optimize for web streaming

ffmpeg -i "$INPUT" -t 9 -vf "scale=1280:720" -c:v libx264 -crf 28 -preset fast -c:a aac -b:a 64k -movflags +faststart "$OUTPUT"

echo "Video compressed successfully!"
echo "Original: $INPUT"
echo "Optimized: $OUTPUT"
echo "Now update your code to use: /video/vid-bg-amforest-optimized.mp4"
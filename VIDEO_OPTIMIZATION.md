# Video Optimization Instructions

## Current Issue
The video file `vid-bg-amforest(1).mp4` is 15MB, which causes loading issues on mobile devices.

## Solutions Implemented
1. Modified `ProgressiveMedia.jsx` to:
   - Detect mobile devices
   - Show play button on mobile instead of autoplay
   - Load video only on user interaction on mobile
   - Use poster image for initial display

## Required Actions

### 1. Create Poster Image
Extract the first frame from your video as a poster:
```bash
ffmpeg -i public/video/vid-bg-amforest\(1\).mp4 -vframes 1 -q:v 2 public/video/poster.jpg
```

### 2. Optimize Video for Mobile
Create a mobile-optimized version of your video:
```bash
# Create a compressed version for mobile (target ~2-3MB)
ffmpeg -i public/video/vid-bg-amforest\(1\).mp4 \
  -c:v libx264 \
  -preset slow \
  -crf 28 \
  -vf scale=854:480 \
  -movflags +faststart \
  -c:a aac -b:a 96k \
  public/video/vid-bg-amforest-mobile.mp4
```

### 3. Alternative: Use Handbrake GUI
If you prefer a GUI tool:
1. Download Handbrake: https://handbrake.fr/
2. Open your video file
3. Use "Web Preset" > "Gmail Medium 10MB 480p30"
4. Save as `vid-bg-amforest-mobile.mp4`

### 4. Update Component to Use Different Videos
After creating the mobile version, update the ProgressiveVideo component usage:
```jsx
<ProgressiveVideo
  src={isMobile ? "/video/vid-bg-amforest-mobile.mp4" : "/video/vid-bg-amforest(1).mp4"}
  poster="/video/poster.jpg"
  // ... other props
/>
```

## Additional Optimizations

### Consider Using Video CDN
For production, consider using:
- Cloudinary Video
- Mux
- Cloudflare Stream
- Bunny Stream

These services automatically optimize videos for different devices and connection speeds.

### Video Format Recommendations
- **Resolution**: 1920x1080 for desktop, 854x480 for mobile
- **Bitrate**: 2-5 Mbps for desktop, 500-1000 kbps for mobile
- **Format**: MP4 with H.264 codec for best compatibility
- **File size**: Aim for <5MB for mobile, <10MB for desktop
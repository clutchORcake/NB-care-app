// Cloudinary Configuration
// Instructions for setup: See CLOUDINARY_SETUP.md
// 1. Go to https://cloudinary.com/users/register_free
// 2. Sign up for a free account (no credit card needed!)
// 3. Go to Dashboard > Settings
// 4. Go to Settings > Upload > Upload presets
// 5. Create an unsigned upload preset (for easier setup)

const cloudinaryConfig = {
  cloudName: "dqk52uzp7",  // Your Cloudinary cloud name
  uploadPreset: "jasmine",  // Your unsigned upload preset name
  apiKey: ""  // Leave empty for unsigned preset
};

// Note: For privacy, Cloudinary URLs are public by default
// Your site password protects access to the page, but URLs can be shared
// For better privacy, consider using signed URLs or Cloudinary's access control features

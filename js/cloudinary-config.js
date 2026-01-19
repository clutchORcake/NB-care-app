// Cloudinary Configuration
// Instructions for setup: See CLOUDINARY_SETUP.md
// 1. Go to https://cloudinary.com/users/register_free
// 2. Sign up for a free account (no credit card needed!)
// 3. Go to Dashboard > Settings
// 4. Go to Settings > Upload > Upload presets
// 5. Create an unsigned upload preset (for easier setup)
// 6. (Optional) Get API Key from Dashboard > Settings > Access Keys for cross-device sync

const cloudinaryConfig = {
  cloudName: "dqk52uzp7",  // Your Cloudinary cloud name
  uploadPreset: "jasmine",  // Your unsigned upload preset name
  apiKey: "216261242336146"  // Optional: Add your API Key here to enable cross-device image sync
};

// For cross-device access (viewing photos uploaded from different devices):
// 1. Get your API Key from Dashboard > Settings > Access Keys (click "View key" under API Key)
// 2. Paste it above to enable fetching images across devices
// Without the API Key, photos sync locally on each device but still upload to the shared folder

// Note: For privacy, Cloudinary URLs are public by default
// Your site password protects access to the page, but URLs can be shared
// For better privacy, consider using signed URLs or Cloudinary's access control features

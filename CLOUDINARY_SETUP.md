# Cloudinary Setup Instructions for Memory Book Feature

## Why Cloudinary?

✅ **100% Free** - No credit card required  
✅ **25GB Storage** - More than enough for baby photos  
✅ **25GB Bandwidth/month** - Plenty for family sharing  
✅ **No Billing Setup** - Just sign up and go!  
✅ **Easy Integration** - Simple JavaScript API  

## Step 1: Create Cloudinary Account

1. Go to [Cloudinary Sign Up](https://cloudinary.com/users/register_free)
2. Fill in your details (name, email, password)
3. Verify your email address
4. **No credit card required!** 🎉

## Step 2: Get Your Cloud Name

1. After signing up, you'll be taken to your Dashboard
2. At the top, you'll see your **Cloud Name** (e.g., `dxy8yxyz`)
3. Copy this - you'll need it for the config

## Step 3: Create Upload Preset

1. In Cloudinary Dashboard, go to **Settings** (gear icon)
2. Click **Upload** in the left sidebar
3. Scroll down to **Upload presets** section
4. Click **Add upload preset**
5. Fill in:
   - **Preset name**: `baby-memory-book` (or any name you like)
   - **Signing mode**: Select **Unsigned** (easier setup)
   - **Folder**: `baby-memories` (optional, for organization)
   - **Resource type**: `Image`
   - **Allowed formats**: `jpg, png, gif, webp`
   - **Max file size**: `10MB` (or adjust as needed)
6. Click **Save**

## Step 4: Get API Key (Optional)

If you want to use signed uploads (more secure), you'll need:
1. Go to **Settings** > **Security**
2. Copy your **API Key** and **API Secret**
3. **Note**: For unsigned presets, you don't need these

## Step 5: Configure Your Site

1. Open `js/cloudinary-config.js` in your project
2. Replace the placeholder values:

```javascript
const cloudinaryConfig = {
  cloudName: "your-cloud-name",  // From Step 2
  uploadPreset: "baby-memory-book",  // From Step 3
  apiKey: ""  // Leave empty if using unsigned preset
};
```

**Example:**
```javascript
const cloudinaryConfig = {
  cloudName: "dxy8yxyz",
  uploadPreset: "baby-memory-book",
  apiKey: ""
};
```

## Step 6: Test It!

1. Open your site → Memory Book page
2. Click "Select Photos" or drag & drop images
3. Upload should work! 🎉

## Privacy Notes

⚠️ **Important**: Cloudinary URLs are **public by default**. This means:
- Anyone with the direct URL can access the image
- Your site password protects the page, but URLs can be shared
- Photos are organized in folders, but URLs are still accessible

**For Better Privacy:**
- Your site password already protects access to the Memory Book page
- Only people with the password can see/upload photos
- URLs are long and random (hard to guess)
- Consider using Cloudinary's **Access Control** features for stricter privacy

## Free Tier Limits

- ✅ **25GB Storage** - Store thousands of photos
- ✅ **25GB Bandwidth/month** - Share with family
- ✅ **Unlimited Transformations** - Resize, crop, etc.
- ✅ **No Credit Card Required**

## Troubleshooting

**"Cloudinary not configured" error:**
- Check that `cloudinary-config.js` has your actual cloud name and preset
- Make sure preset name matches exactly (case-sensitive)

**Upload fails:**
- Check that upload preset is set to "Unsigned"
- Verify file size is under limit (default 10MB)
- Check browser console for error messages

**Photos not showing:**
- Check browser console for errors
- Verify Cloudinary widget script loaded
- Check localStorage in browser DevTools

## Support

- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [Upload Widget Guide](https://cloudinary.com/documentation/upload_widget)
- [Free Tier Details](https://cloudinary.com/pricing)

## Security Best Practices

1. ✅ Keep your Cloud Name public (it's safe)
2. ✅ Use unsigned presets for simplicity
3. ✅ Protect your site with password (already done!)
4. ✅ Consider signed uploads for production (requires API secret)
5. ✅ Monitor usage in Cloudinary Dashboard

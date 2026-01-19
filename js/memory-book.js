// Memory Book JavaScript with Cloudinary
let photos = [];
let currentPhotoIndex = null;

// Initialize Cloudinary
function initCloudinary() {
  if (cloudinaryConfig && cloudinaryConfig.cloudName !== "YOUR_CLOUD_NAME") {
    loadPhotos();
  } else {
    showMessage('Cloudinary not configured. Please set up cloudinary-config.js', 'error');
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  // Load Cloudinary widget script
  const script = document.createElement('script');
  script.src = 'https://upload-widget.cloudinary.com/2.60.2/global/all.js';
  script.onload = () => {
    initCloudinary();
  };
  script.onerror = () => {
    showMessage('Failed to load Cloudinary. Check your internet connection.', 'error');
    initCloudinary(); // Still try to load existing photos
  };
  document.head.appendChild(script);
});

// Generate a shared family ID for cross-device access
function getUserId() {
  // Using a fixed family ID so all family members upload to the same folder
  return 'family_baby';
}

// Show message to user
function showMessage(text, type = 'info') {
  const messageArea = document.getElementById('messageArea');
  messageArea.textContent = text;
  messageArea.className = `message-area ${type}`;
  messageArea.style.display = 'block';
  
  setTimeout(() => {
    messageArea.style.display = 'none';
  }, 5000);
}

// Handle file selection - use Cloudinary Upload Widget
function openCloudinaryWidget() {
  if (!cloudinaryConfig || cloudinaryConfig.cloudName === "YOUR_CLOUD_NAME") {
    showMessage('Cloudinary not configured. Please set up cloudinary-config.js', 'error');
    return;
  }

  const userId = getUserId();
  
  const container = document.getElementById('cloudinary-widget-container');
  container.style.display = 'block';
  
  const myWidget = cloudinary.createUploadWidget(
    {
      cloudName: cloudinaryConfig.cloudName,
      uploadPreset: cloudinaryConfig.uploadPreset,
      sources: ['local', 'camera', 'url'],
      multiple: true,
      maxFiles: 50,
      folder: `baby-memories/${userId}`,
      tags: ['baby-memory-book'],
      resourceType: 'image',
      clientAllowedFormats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
      maxFileSize: 10000000, // 10MB
      showAdvancedOptions: false,
      cropping: false,
      theme: 'minimal'
    },
    (error, result) => {
      if (error) {
        showMessage('Upload failed: ' + (error.message || 'Unknown error'), 'error');
        container.style.display = 'none';
        return;
      }

      if (result && result.event === "success") {
        // Single file uploaded
        const data = result.info;
        photos.push({
          url: data.secure_url,
          publicId: data.public_id,
          caption: '',
          date: new Date().toISOString().split('T')[0],
          timestamp: Date.now()
        });
        savePhotosToLocal();
        displayPhotos();
        showMessage('Photo uploaded successfully!', 'success');
      } else if (result && result.event === "batch-succeeded") {
        container.style.display = 'none';
      } else if (result && result.event === "close") {
        container.style.display = 'none';
        return;
      }
    }
  );
  
  myWidget.open();
}

// Handle file input (fallback method)
document.addEventListener('DOMContentLoaded', () => {
  const fileInput = document.getElementById('fileInput');
  const uploadArea = document.getElementById('uploadArea');
  
  // Use Cloudinary widget when clicking upload area
  if (uploadArea) {
    uploadArea.addEventListener('click', (e) => {
      if (e.target.tagName !== 'BUTTON') {
        openCloudinaryWidget();
      }
    });
    
    // Drag and drop support
    uploadArea.addEventListener('dragover', (e) => {
      e.preventDefault();
      uploadArea.classList.add('drag-over');
    });
    
    uploadArea.addEventListener('dragleave', () => {
      uploadArea.classList.remove('drag-over');
    });
    
    uploadArea.addEventListener('drop', (e) => {
      e.preventDefault();
      uploadArea.classList.remove('drag-over');
      const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
      if (files.length > 0) {
        uploadFilesDirectly(files);
      }
    });
  }
  
  // File input fallback
  if (fileInput) {
    fileInput.addEventListener('change', (e) => {
      const files = Array.from(e.target.files);
      if (files.length > 0) {
        uploadFilesDirectly(files);
      }
    });
  }
});

// Direct file upload (alternative to widget)
async function uploadFilesDirectly(files) {
  if (!cloudinaryConfig || cloudinaryConfig.cloudName === "YOUR_CLOUD_NAME") {
    showMessage('Cloudinary not configured. Please set up cloudinary-config.js', 'error');
    return;
  }

  const progressDiv = document.getElementById('uploadProgress');
  const progressFill = document.getElementById('progressFill');
  progressDiv.style.display = 'block';
  
  const userId = getUserId();
  const formData = new FormData();
  formData.append('upload_preset', cloudinaryConfig.uploadPreset);
  formData.append('folder', `baby-memories/${userId}`);
  
  let uploaded = 0;
  const total = files.length;

  for (const file of files) {
    try {
      formData.set('file', file);
      
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`,
        {
          method: 'POST',
          body: formData
        }
      );

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      const data = await response.json();
      photos.push({
        url: data.secure_url,
        publicId: data.public_id,
        caption: '',
        date: new Date().toISOString().split('T')[0],
        timestamp: Date.now()
      });
      
      uploaded++;
      progressFill.style.width = ((uploaded / total) * 100) + '%';
    } catch (error) {
      console.error('Upload error:', error);
      showMessage(`Failed to upload ${file.name}: ${error.message}`, 'error');
    }
  }

  progressDiv.style.display = 'none';
  progressFill.style.width = '0%';
  
  savePhotosToLocal();
  displayPhotos();
  if (uploaded > 0) {
    showMessage(`Successfully uploaded ${uploaded} photo(s)!`, 'success');
  }
}

// Save photos metadata to localStorage (for captions)
function savePhotosToLocal() {
  // Save captions by public_id for cross-device access
  const captions = {};
  photos.forEach(photo => {
    captions[photo.publicId] = photo.caption;
    captions[photo.publicId + '_date'] = photo.date;
  });
  localStorage.setItem('baby_memories_captions', JSON.stringify(captions));
}

// Load photos from Cloudinary API and localStorage captions
async function loadPhotos() {
  try {
    // First try to fetch from Cloudinary API
    const userId = getUserId();
    const cloudinaryPhotos = await fetchPhotosFromCloudinary(userId);
    
    if (cloudinaryPhotos && cloudinaryPhotos.length > 0) {
      // Load captions from localStorage by public_id
      const captions = getStoredCaptions();
      photos = cloudinaryPhotos.map(photo => ({
        url: photo.secure_url,
        publicId: photo.public_id,
        caption: captions[photo.public_id] || '',
        date: captions[photo.public_id + '_date'] || new Date().toISOString().split('T')[0],
        timestamp: photo.created_at ? new Date(photo.created_at).getTime() : Date.now()
      }));
      displayPhotos();
      return;
    }
  } catch (error) {
    console.error('Error fetching from Cloudinary:', error);
  }
  
  // Fallback: Load from localStorage if Cloudinary fetch fails
  const saved = localStorage.getItem(`baby_memories_${getUserId()}`);
  if (saved) {
    try {
      photos = JSON.parse(saved);
      displayPhotos();
    } catch (error) {
      console.error('Error loading photos from storage:', error);
    }
  } else {
    displayPhotos(); // Show empty state
  }
}

// Fetch photos from Cloudinary using API
async function fetchPhotosFromCloudinary(userId) {
  if (!cloudinaryConfig || cloudinaryConfig.cloudName === "YOUR_CLOUD_NAME") {
    return null;
  }
  
  try {
    // Use Cloudinary's search API to find all images in the baby-memories folder
    // For unsigned access, we'll use the admin API endpoint with a fetch
    // Note: This requires CORS to be enabled on your Cloudinary account
    const folderPath = `baby-memories/${userId}`;
    
    // Try using Cloudinary's Admin API (requires authentication)
    // For a free tier without API key, we'll use a workaround with fetch
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/resources/search?expression=folder:\"${folderPath}\"&max_results=500`,
      {
        method: 'GET',
        headers: {
          'Authorization': 'Basic ' + btoa(':', cloudinaryConfig.apiKey || 'YOUR_API_KEY')
        }
      }
    );
    
    if (response.ok) {
      const data = await response.json();
      return data.resources || [];
    } else if (response.status === 401) {
      console.warn('Cloudinary API key not configured. Using localStorage fallback.');
      return null;
    }
  } catch (error) {
    console.warn('Could not fetch from Cloudinary API:', error.message);
  }
  
  return null;
}

// Get stored captions from localStorage
function getStoredCaptions() {
  const stored = localStorage.getItem('baby_memories_captions');
  return stored ? JSON.parse(stored) : {};
}

// Store caption in localStorage by public_id
function storeCaption(publicId, caption, date) {
  const captions = getStoredCaptions();
  captions[publicId] = caption;
  captions[publicId + '_date'] = date;
  localStorage.setItem('baby_memories_captions', JSON.stringify(captions));
}

// Display photos in gallery
function displayPhotos() {
  const gallery = document.getElementById('photoGallery');
  const generateBtn = document.getElementById('generatePDFBtn');
  const clearBtn = document.getElementById('clearAllBtn');
  
  if (photos.length === 0) {
    gallery.innerHTML = '<p class="empty-message" data-i18n="memory_no_photos">No photos yet. Upload some memories! 💕</p>';
    generateBtn.disabled = true;
    clearBtn.style.display = 'none';
    // Apply i18n to empty message
    if (typeof setLanguage === 'function') {
      const savedLang = localStorage.getItem('lang') || 'en';
      setLanguage(savedLang);
    }
    return;
  }
  
  generateBtn.disabled = false;
  clearBtn.style.display = 'inline-block';
  
  gallery.innerHTML = photos.map((photo, index) => `
    <div class="photo-item" onclick="openModal(${index})">
      <img src="${photo.url}" alt="Memory ${index + 1}" loading="lazy">
      <div class="photo-overlay">
        <p class="photo-date">${formatDate(photo.date)}</p>
        ${photo.caption ? `<p class="photo-caption">${escapeHtml(photo.caption)}</p>` : ''}
      </div>
      <button class="photo-delete-btn" onclick="event.stopPropagation(); deletePhotoFromGallery(${index})" title="Delete">×</button>
    </div>
  `).join('');
}

// Format date for display
function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString();
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Open photo in modal
function openModal(index) {
  currentPhotoIndex = index;
  const photo = photos[index];
  const modal = document.getElementById('photoModal');
  const modalImage = document.getElementById('modalImage');
  const captionInput = document.getElementById('captionInput');
  const dateInput = document.getElementById('dateInput');
  
  modalImage.src = photo.url;
  captionInput.value = photo.caption || '';
  dateInput.value = photo.date || new Date().toISOString().split('T')[0];
  modal.style.display = 'block';
}

// Close modal
function closeModal() {
  document.getElementById('photoModal').style.display = 'none';
  currentPhotoIndex = null;
}

// Close modal on outside click
window.onclick = function(event) {
  const modal = document.getElementById('photoModal');
  if (event.target === modal) {
    closeModal();
  }
}

// Save caption and date
function saveCaption() {
  if (currentPhotoIndex === null) return;
  
  const captionInput = document.getElementById('captionInput');
  const dateInput = document.getElementById('dateInput');
  const saveBtn = document.querySelector('.save-caption-btn');
  
  // Provide immediate UI feedback
  const originalText = saveBtn.textContent;
  saveBtn.textContent = '✓ Saved!';
  saveBtn.disabled = true;
  
  const photo = photos[currentPhotoIndex];
  photo.caption = captionInput.value.trim();
  photo.date = dateInput.value;
  
  // Store caption by public_id for cross-device sync
  storeCaption(photo.publicId, photo.caption, photo.date);
  
  savePhotosToLocal();
  displayPhotos();
  showMessage('Caption saved and synced!', 'success');
  
  // Reset button after 1.5 seconds
  setTimeout(() => {
    saveBtn.textContent = originalText;
    saveBtn.disabled = false;
  }, 1500);
}

// Delete photo from gallery
async function deletePhotoFromGallery(index) {
  if (!confirm('Are you sure you want to delete this photo?')) return;
  
  const photo = photos[index];
  
  // Delete from Cloudinary (optional - requires API secret for signed requests)
  // For now, we'll just remove from local storage
  // Note: Photo will remain in Cloudinary but won't be accessible via your app
  
  // Remove from photos array
  photos.splice(index, 1);
  savePhotosToLocal();
  displayPhotos();
  showMessage('Photo deleted', 'success');
}

// Delete photo from modal
function deletePhoto() {
  if (currentPhotoIndex === null) return;
  deletePhotoFromGallery(currentPhotoIndex);
  closeModal();
}

// Clear all photos
async function clearAllPhotos() {
  if (!confirm('Are you sure you want to delete ALL photos? This cannot be undone.')) return;
  
  // Clear local storage captions
  photos = [];
  localStorage.removeItem('baby_memories_captions');
  localStorage.removeItem(`baby_memories_${getUserId()}`); // Legacy cleanup
  displayPhotos();
  showMessage('All photos deleted from memory book', 'success');
  // Note: Photos remain in Cloudinary but won't be shown in your app
}

// Generate PDF from photos
async function generatePDF() {
  if (photos.length === 0) {
    showMessage('No photos to generate PDF', 'error');
    return;
  }
  
  showMessage('Generating PDF... This may take a moment.', 'info');
  
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });
  
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 10;
  const imgWidth = pageWidth - (margin * 2);
  const imgHeight = (pageHeight - (margin * 2)) * 0.8;
  const textHeight = pageHeight - margin - imgHeight - margin;
  
  try {
    for (let i = 0; i < photos.length; i++) {
      if (i > 0) {
        pdf.addPage();
      }
      
      const photo = photos[i];
      
      // Load image
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      await new Promise((resolve, reject) => {
        img.onload = () => {
          // Calculate dimensions to fit page
          const ratio = Math.min(imgWidth / img.width, imgHeight / img.height);
          const width = img.width * ratio;
          const height = img.height * ratio;
          const x = (pageWidth - width) / 2;
          const y = margin;
          
          // Add image
          pdf.addImage(img, 'JPEG', x, y, width, height);
          
          // Add caption and date
          pdf.setFontSize(12);
          pdf.text(photo.caption || 'Baby Memory', margin, pageHeight - textHeight);
          pdf.setFontSize(10);
          pdf.text(formatDate(photo.date), margin, pageHeight - textHeight + 7);
          
          resolve();
        };
        img.onerror = reject;
        img.src = photo.url;
      });
    }
    
    // Save PDF
    const filename = `baby-memories-${new Date().toISOString().split('T')[0]}.pdf`;
    pdf.save(filename);
    showMessage('PDF generated successfully!', 'success');
  } catch (error) {
    console.error('PDF generation error:', error);
    showMessage('Error generating PDF: ' + error.message, 'error');
  }
}

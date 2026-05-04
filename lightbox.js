document.addEventListener('DOMContentLoaded', () => {
  // Collect all gallery items
  const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
  
  if (galleryItems.length === 0) return; // No gallery on this page
  
  // Create Lightbox DOM structure
  const overlay = document.createElement('div');
  overlay.className = 'custom-lightbox-overlay';
  
  const content = document.createElement('div');
  content.className = 'custom-lightbox-content';
  
  const img = document.createElement('img');
  img.className = 'custom-lightbox-img';
  img.src = '';
  
  const closeBtn = document.createElement('button');
  closeBtn.className = 'custom-lightbox-close';
  closeBtn.innerHTML = '&times;';
  
  const prevBtn = document.createElement('button');
  prevBtn.className = 'custom-lightbox-btn custom-lightbox-prev';
  prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
  
  const nextBtn = document.createElement('button');
  nextBtn.className = 'custom-lightbox-btn custom-lightbox-next';
  nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
  
  content.appendChild(img);
  content.appendChild(closeBtn);
  content.appendChild(prevBtn);
  content.appendChild(nextBtn);
  overlay.appendChild(content);
  document.body.appendChild(overlay);
  
  let currentIndex = 0;
  
  // Open Lightbox
  function openLightbox(index) {
    currentIndex = index;
    updateImage();
    overlay.classList.add('active');
  }
  
  // Close Lightbox
  function closeLightbox() {
    overlay.classList.remove('active');
  }
  
  // Update Image based on index
  function updateImage() {
    if (currentIndex < 0) {
      currentIndex = galleryItems.length - 1; // Wrap around
    } else if (currentIndex >= galleryItems.length) {
      currentIndex = 0; // Wrap around
    }
    
    const targetImg = galleryItems[currentIndex].querySelector('img');
    if (targetImg) {
      img.src = targetImg.src;
    }
  }
  
  // Event Listeners for Gallery Items
  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      openLightbox(index);
    });
  });
  
  // Event Listeners for Controls
  closeBtn.addEventListener('click', closeLightbox);
  
  prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex--;
    updateImage();
  });
  
  nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex++;
    updateImage();
  });
  
  // Click overlay to close
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      closeLightbox();
    }
  });
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!overlay.classList.contains('active')) return;
    
    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowLeft') {
      currentIndex--;
      updateImage();
    } else if (e.key === 'ArrowRight') {
      currentIndex++;
      updateImage();
    }
  });
});

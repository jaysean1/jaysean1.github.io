/* script.js — Main JavaScript for all interactive features of the resume website */
/* NOT for Tailwind config, Google Analytics, content loading, or page structure */

function initAllFeatures() {
  initScrollAnimations();
  initCapabilityTabs();
  initToastNotifications();
  initHeroHighlight();
  initTestimonialsCarousel();
  initImageModal();
  initCounterAnimations();

  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  setTimeout(showPortfolioToast, 2000);
}

// Scroll animation initialisation
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  // Observe all elements that need animation
  document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
  });
}

// Counter animation initialisation
function initCounterAnimations() {
  const countElements = document.querySelectorAll('[data-count]');
  countElements.forEach(element => {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    const updateCount = () => {
      current += step;
      if (current < target) {
        element.textContent = Math.floor(current).toLocaleString();
        requestAnimationFrame(updateCount);
      } else {
        element.textContent = target.toLocaleString();
      }
    };
    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          updateCount();
          countObserver.unobserve(entry.target);
        }
      });
    });
    countObserver.observe(element);
  });
}

// Capability tabs initialisation
function initCapabilityTabs() {
  const tabs = document.querySelectorAll('.capability-tab');
  const contents = document.querySelectorAll('.capability-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.getAttribute('data-tab');

      // Remove all active states
      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));

      // Add active state
      tab.classList.add('active');
      // Scroll tab into view on mobile if needed
      if (window.innerWidth <= 1024) {
        const tabRect = tab.getBoundingClientRect();
        const containerRect = tab.parentNode.getBoundingClientRect();
        tab.parentNode.scrollLeft += tabRect.left - containerRect.left - (containerRect.width / 2) + (tabRect.width / 2);
      }
      const targetContent = document.getElementById(targetId);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });
}

// Toast notification system
function initToastNotifications() {
  // Create toast container
  if (!document.querySelector('.toast-container')) {
    const toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  // Add close button event listener
  document.addEventListener('click', function(event) {
    if (event.target.classList.contains('toast-close')) {
      const toast = event.target.closest('.toast');
      if (toast) {
        removeToast(toast);
      }
    }
  });
}

function showToast(title, description, actionText, actionCallback) {
  const toastContainer = document.querySelector('.toast-container');
  if (!toastContainer) return;

  const toast = document.createElement('div');
  toast.className = 'toast';

  toast.innerHTML = `
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      <div class="toast-description">${description}</div>
    </div>
    <button class="toast-action">${actionText}</button>
    <button class="toast-close">&times;</button>
  `;

  // Add action button event
  const actionButton = toast.querySelector('.toast-action');
  if (actionButton && actionCallback) {
    actionButton.addEventListener('click', actionCallback);
  }

  toastContainer.appendChild(toast);

  // Trigger show animation
  setTimeout(() => {
    toast.classList.add('show');
  }, 100);

  // Auto remove
  setTimeout(() => {
    removeToast(toast);
  }, 8000);
}

function removeToast(toast) {
  const toastContainer = document.querySelector('.toast-container');
  if (!toastContainer) return;

  toast.classList.remove('show');
  // Remove after fade-out animation completes
  toast.addEventListener('transitionend', () => {
    if (toast.parentNode === toastContainer) {
      toastContainer.removeChild(toast);
    }
  }, { once: true });
}

function showPortfolioToast() {
  showToast(
    'Explore My Work!',
    'Check out my detailed portfolio on Notion for more project insights.',
    'View Portfolio',
    () => {
      window.open('https://www.notion.so/qiansui/Sui-Qian-Portfolio-c6be6c3fe60c420faf915f35f73bb408', '_blank');
    }
  );
}

// Hero section mouse tracking highlight effect
function initHeroHighlight() {
  const heroSection = document.getElementById('home');
  if (heroSection) {
    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      heroSection.style.setProperty('--mouse-x', `${x}px`);
      heroSection.style.setProperty('--mouse-y', `${y}px`);
    });
  }
}

// Testimonials carousel initialisation
function initTestimonialsCarousel() {
  const rows = document.querySelectorAll('.testimonials-row');

  // Image preload function
  function preloadImages(imageElements) {
    return Promise.all(Array.from(imageElements).map(img => {
      if (img.complete) return Promise.resolve();
      return new Promise(resolve => {
        img.onload = resolve;
        img.onerror = resolve; // Continue even if some images fail
      });
    }));
  }

  // Process each row
  rows.forEach((row, index) => {
    // Reset animation
    row.style.animation = 'none';
    row.offsetHeight; // Trigger reflow

    // Get original images
    const originalImages = Array.from(row.querySelectorAll('.testimonial-image'));

    // Clear existing clones to avoid duplication
    row.querySelectorAll('.clone-image').forEach(clone => clone.remove());

    // Clone all images and append to create continuous loop effect
    originalImages.forEach(image => {
      const clone = image.cloneNode(true);
      clone.classList.add('clone-image');
      row.appendChild(clone);
    });

    // Start animation after images preload
    const allImages = row.querySelectorAll('img');
    preloadImages(allImages).then(() => {
      // Reset corresponding animation
      row.style.animation = index === 0
        ? 'scroll-left 30s linear infinite'
        : 'scroll-right 30s linear infinite';

      // Calculate total content width and adjust animation speed
      const totalWidth = row.scrollWidth / 2; // Half because we have duplicated content
      const speed = Math.max(totalWidth / 60, 20); // Minimum 20 seconds
      row.style.animationDuration = `${speed}s`;
    });

    // Add hover pause functionality
    row.addEventListener('mouseenter', () => {
      row.style.animationPlayState = 'paused';
    });

    row.addEventListener('mouseleave', () => {
      row.style.animationPlayState = 'running';
    });
  });
}

// Image modal initialisation
function initImageModal() {
  const modal = document.getElementById('image-modal');
  const modalImg = document.getElementById('modal-img');
  const modalPrev = document.getElementById('modal-prev');
  const modalNext = document.getElementById('modal-next');
  const closeBtn = document.getElementById('modal-close');

  if (!modal || !modalImg || !modalPrev || !modalNext || !closeBtn) {
    return; // Exit if modal elements don't exist
  }

  let currentImgs = [];
  let currentIdx = 0;

  // Click image to open carousel
  document.querySelectorAll('.timeline-item').forEach(item => {
    const imgs = Array.from(item.querySelectorAll('img.cursor-pointer'));
    imgs.forEach((img, idx) => {
      img.addEventListener('click', () => {
        currentImgs = imgs;
        currentIdx = idx;
        modalImg.src = imgs[currentIdx].src;
        modal.classList.remove('hidden');
        updateArrows();
      });
    });
  });

  function updateArrows() {
    if (currentImgs.length <= 1) {
      modalPrev.classList.add('hidden');
      modalNext.classList.add('hidden');
    } else {
      modalPrev.classList.toggle('hidden', currentIdx === 0);
      modalNext.classList.toggle('hidden', currentIdx === currentImgs.length - 1);
    }
  }

  modalPrev.addEventListener('click', e => {
    e.stopPropagation();
    if (currentIdx > 0) {
      currentIdx--;
      modalImg.src = currentImgs[currentIdx].src;
      updateArrows();
    }
  });

  modalNext.addEventListener('click', e => {
    e.stopPropagation();
    if (currentIdx < currentImgs.length - 1) {
      currentIdx++;
      modalImg.src = currentImgs[currentIdx].src;
      updateArrows();
    }
  });

  // Close modal
  closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
  modal.addEventListener('click', e => e.target === modal && modal.classList.add('hidden'));

  // Keyboard navigation
  document.addEventListener('keydown', e => {
    if (modal.classList.contains('hidden')) return;
    if (e.key === 'Escape') modal.classList.add('hidden');
    if (e.key === 'ArrowLeft' && currentIdx > 0) {
      currentIdx--;
      modalImg.src = currentImgs[currentIdx].src;
      updateArrows();
    }
    if (e.key === 'ArrowRight' && currentIdx < currentImgs.length - 1) {
      currentIdx++;
      modalImg.src = currentImgs[currentIdx].src;
      updateArrows();
    }
  });
}

window.addEventListener('load', initTestimonialsCarousel);
window.addEventListener('resize', initTestimonialsCarousel);

/* /Users/qiansui/Desktop/jaysean1.github.io/script.js */
/* 主JavaScript文件 - 包含网站的所有交互功能 */
/* 用于个人简历网站的JavaScript功能，包括动画、交互、组件等 */

// Tailwind CSS配置
tailwind.config = {
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        secondary: '#3b82f6'
      },
      borderRadius: {
        'none': '0px',
        'sm': '2px',
        DEFAULT: '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '20px',
        '3xl': '24px',
        'full': '9999px',
        'button': '4px'
      }
    }
  }
};

// Google Analytics配置
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-J4RKB1D6WY');

// 页面加载完成后执行的初始化函数
document.addEventListener('DOMContentLoaded', function() {
  // 初始化所有功能
  initScrollAnimations();
  initCapabilityTabs();
  initToastNotifications();
  initHeroHighlight();
  initTestimonialsCarousel();
  initImageModal();
  
  // 初始化Lucide图标
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
  
  // 显示欢迎Toast
  setTimeout(showPortfolioToast, 2000);
});

// 滚动动画初始化
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

  // 观察所有需要动画的元素
  document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
  });
}

// 能力标签页初始化
function initCapabilityTabs() {
  const tabs = document.querySelectorAll('.capability-tab');
  const contents = document.querySelectorAll('.capability-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.getAttribute('data-target');
      
      // 移除所有活动状态
      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));
      
      // 添加活动状态
      tab.classList.add('active');
      const targetContent = document.getElementById(targetId);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });
}

// Toast通知系统
function initToastNotifications() {
  // 创建Toast容器
  if (!document.querySelector('.toast-container')) {
    const toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }
  
  // 添加关闭按钮事件监听
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
  
  // 添加动作按钮事件
  const actionButton = toast.querySelector('.toast-action');
  if (actionButton && actionCallback) {
    actionButton.addEventListener('click', actionCallback);
  }
  
  toastContainer.appendChild(toast);
  
  // 触发显示动画
  setTimeout(() => {
    toast.classList.add('show');
  }, 100);
  
  // 自动移除
  setTimeout(() => {
    removeToast(toast);
  }, 8000);
}

function removeToast(toast) {
  const toastContainer = document.querySelector('.toast-container');
  if (!toastContainer) return;
  
  toast.classList.remove('show');
  // 等待淡出动画完成后移除
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

// Hero区域鼠标跟踪高亮效果
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

// 证言轮播图初始化
function initTestimonialsCarousel() {
  const rows = document.querySelectorAll('.testimonials-row');
  
  // 图片预加载函数
  function preloadImages(imageElements) {
    return Promise.all(Array.from(imageElements).map(img => {
      if (img.complete) return Promise.resolve();
      return new Promise(resolve => {
        img.onload = resolve;
        img.onerror = resolve; // 即使某些图片失败也继续
      });
    }));
  }
  
  // 处理每一行
  rows.forEach((row, index) => {
    // 重置动画
    row.style.animation = 'none';
    row.offsetHeight; // 触发重排
    
    // 获取原始图片
    const originalImages = Array.from(row.querySelectorAll('.testimonial-image'));
    
    // 清除现有克隆以避免重复
    row.querySelectorAll('.clone-image').forEach(clone => clone.remove());
    
    // 克隆所有图片并追加以创建连续循环效果
    originalImages.forEach(image => {
      const clone = image.cloneNode(true);
      clone.classList.add('clone-image');
      row.appendChild(clone);
    });
    
    // 预加载图片后开始动画
    const allImages = row.querySelectorAll('img');
    preloadImages(allImages).then(() => {
      // 重置相应的动画
      row.style.animation = index === 0 
        ? 'scroll-left 30s linear infinite'
        : 'scroll-right 30s linear infinite';
      
      // 计算总内容宽度并调整动画速度
      const totalWidth = row.scrollWidth / 2; // 一半因为我们有重复内容
      const speed = Math.max(totalWidth / 60, 20); // 最小20秒，调整除数以改变速度
      row.style.animationDuration = `${speed}s`;
    });
    
    // 添加悬停暂停功能
    row.addEventListener('mouseenter', () => {
      row.style.animationPlayState = 'paused';
    });
    
    row.addEventListener('mouseleave', () => {
      row.style.animationPlayState = 'running';
    });
  });
}

// 图片模态框初始化
function initImageModal() {
  const modal = document.getElementById('image-modal');
  const modalImg = document.getElementById('modal-img');
  const modalPrev = document.getElementById('modal-prev');
  const modalNext = document.getElementById('modal-next');
  const closeBtn = document.getElementById('modal-close');
  
  if (!modal || !modalImg || !modalPrev || !modalNext || !closeBtn) {
    return; // 如果模态框元素不存在则退出
  }
  
  let currentImgs = [];
  let currentIdx = 0;

  // 点击图片弹出轮播
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
  
  // 关闭弹窗
  closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
  modal.addEventListener('click', e => e.target === modal && modal.classList.add('hidden'));
  
  // 键盘导航
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

// 窗口大小改变时重新初始化轮播
window.addEventListener('load', initTestimonialsCarousel);
window.addEventListener('resize', initTestimonialsCarousel);
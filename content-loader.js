/* content-loader.js — Loads JSON content and renders all page sections dynamically */
/* NOT for styles, page structure, navigation, or hero section content */

const CHAPTER_NUMBERS = {
  'work-history': '01',
  'experience': '02',
  'projects': '03',
  'achievements': '04',
  'education': '05',
  'contact': '06',
  'product-videos': '07',
  'about': '08',
  'capabilities': '09',
  'testimonials': '10'
};

function chapterHead(sectionId, title, sub) {
  const num = CHAPTER_NUMBERS[sectionId] || '';
  return `
    <header class="chapter__head" data-reveal>
      <p class="chapter__kicker">${num}</p>
      <h2 class="chapter__title">${title}</h2>
      ${sub ? `<p class="chapter__sub">${sub}</p>` : ''}
    </header>
  `;
}

async function loadContent() {
  try {
    const manifestResp = await fetch('content/manifest.json');
    const manifest = await manifestResp.json();

    const fetches = manifest.sections.map(s =>
      fetch(s.file).then(r => r.json()).then(data => ({ id: s.id, data }))
    );
    const results = await Promise.all(fetches);

    const dataMap = {};
    results.forEach(({ id, data }) => { dataMap[id] = data; });

    renderWorkHistory(dataMap['work-history']);
    renderExperience(dataMap['experience']);
    renderProjects(dataMap['projects']);
    renderAchievements(dataMap['achievements']);
    renderEducation(dataMap['education']);
    renderContact(dataMap['contact']);
    renderVideos(dataMap['product-videos']);
    renderAbout(dataMap['about']);
    renderCapabilities(dataMap['capabilities']);
    renderTestimonials(dataMap['testimonials']);
    renderFooter(dataMap['footer']);
  } catch (err) {
    console.error('Content loading failed:', err);
  }
}

function renderWorkHistory(data) {
  const slot = document.querySelector('[data-section="work-history"]');
  if (!slot || !data) return;
  slot.innerHTML = `
    ${chapterHead('work-history', data.title)}
    <div class="wh-grid">
      ${data.items.map((item, i) => `
        <article class="card card--feature card--lift wh-card" data-reveal data-reveal-delay="${(i % 3) + 1}">
          <div class="wh-card__head">
            <div class="wh-card__logo">
              <img src="${item.logo}" alt="${item.name} logo" loading="lazy" decoding="async">
            </div>
            <h3>${item.name}</h3>
          </div>
          <div class="wh-card__block">
            <p class="wh-card__label"><i class="fas fa-building" aria-hidden="true"></i> Company</p>
            <p>${item.introduction}</p>
          </div>
          <div class="wh-card__block">
            <p class="wh-card__label"><i class="fas fa-tasks" aria-hidden="true"></i> My Responsibilities</p>
            <p>${item.responsibilities}</p>
          </div>
        </article>
      `).join('')}
    </div>
  `;
}

function renderExperience(data) {
  const slot = document.querySelector('[data-section="experience"]');
  if (!slot || !data) return;

  function buildIcon(item) {
    if (item.icon) {
      return `<i class="${item.icon}" aria-hidden="true"></i>`;
    }
    return `<img src="${item.logo}" alt="" loading="lazy" decoding="async">`;
  }

  function buildTitle(item) {
    if (item.companyUrl) {
      return `<a href="${item.companyUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center">${item.company}<i data-lucide="external-link" class="w-4 h-4 ml-2"></i></a>`;
    }
    return item.company;
  }

  function buildImages(images) {
    if (!images || !images.length) return '';
    return `
      <div class="exp-card__gallery">
        ${images.map(img => `
          <div class="shot">
            <img src="${img.src}" alt="${img.alt}" loading="lazy" decoding="async">
          </div>
        `).join('')}
      </div>
    `;
  }

  slot.innerHTML = `
    ${chapterHead('experience', data.title)}
    <div class="timeline">
      ${data.items.map(item => `
        <div class="timeline-entry">
          <article class="card exp-card" data-reveal>
            <div class="exp-card__head">
              <div class="exp-card__icon">${buildIcon(item)}</div>
              <div class="exp-card__meta">
                <h3>${buildTitle(item)}</h3>
                <span class="badge">${item.period}</span>
              </div>
            </div>
            <p class="exp-card__summary">${item.summary}</p>
            <ul>
              ${item.bullets.map(b => `<li>${b}</li>`).join('')}
            </ul>
            ${buildImages(item.images)}
          </article>
        </div>
      `).join('')}
    </div>
  `;
}

function renderProjects(data) {
  const slot = document.querySelector('[data-section="projects"]');
  if (!slot || !data) return;
  slot.innerHTML = `
    ${chapterHead('projects', data.title)}
    <div class="proj-grid">
      ${data.items.map((item, i) => `
        <article class="card card--lift proj-card" data-reveal data-reveal-delay="${(i % 3) + 1}">
          <div class="proj-card__media">
            <img src="${item.image}" alt="${item.title}" loading="lazy" decoding="async">
          </div>
          <div class="proj-card__body">
            <h3>${item.title}</h3>
            <p>${item.description}</p>
            <a href="${item.link}" target="_blank" rel="noopener noreferrer" class="btn btn--brand btn--sm">
              Learn More <i class="fas fa-arrow-right" aria-hidden="true"></i>
            </a>
          </div>
        </article>
      `).join('')}
    </div>
  `;
}

function renderAchievements(data) {
  const slot = document.querySelector('[data-section="achievements"]');
  if (!slot || !data) return;
  slot.innerHTML = `
    ${chapterHead('achievements', data.title)}
    <div class="stats-grid">
      ${data.stats.map((stat, i) => `
        <div class="card card--feature stat-tile" data-reveal data-reveal-delay="${i + 1}">
          <div class="stat-tile__num" data-count="${stat.count}">0</div>
          <p class="stat-tile__label">${stat.label}</p>
        </div>
      `).join('')}
    </div>
    <div class="ach-grid">
      <article class="card" data-reveal>
        <h3>Technical Patents</h3>
        <ul class="ach-list">
          ${data.patents.map(patent => `
            <li>
              <span class="ach-list__icon"><i class="fas fa-certificate" aria-hidden="true"></i></span>
              <div>
                <h4>${patent.title}</h4>
                <p>Patent No.:
                  <a href="${patent.link}" target="_blank" rel="noopener noreferrer" class="font-bold highlight-achievement">${patent.patentNo}</a>
                </p>
              </div>
            </li>
          `).join('')}
        </ul>
      </article>
      <article class="card" data-reveal data-reveal-delay="1">
        <h3>Industry Impact</h3>
        <ul class="ach-list">
          ${data.industryImpact.map(impact => `
            <li>
              <span class="ach-list__icon"><i class="fas fa-trophy" aria-hidden="true"></i></span>
              <div>
                <h4>${impact.title}</h4>
                <p>${impact.description}</p>
              </div>
            </li>
          `).join('')}
        </ul>
      </article>
    </div>
  `;
}

function renderEducation(data) {
  const slot = document.querySelector('[data-section="education"]');
  if (!slot || !data) return;
  slot.innerHTML = `
    ${chapterHead('education', data.title)}
    <div class="edu-grid">
      ${data.items.map((item, i) => `
        <article class="card card--lift edu-card" data-reveal data-reveal-delay="${i + 1}">
          <span class="edu-card__icon"><i class="fas fa-graduation-cap" aria-hidden="true"></i></span>
          <div>
            <h3>${item.school}</h3>
            <p>${item.degree}</p>
            <p class="text-gray-600">${item.period}</p>
          </div>
        </article>
      `).join('')}
    </div>
  `;
}

function renderContact(data) {
  const slot = document.querySelector('[data-section="contact"]');
  if (!slot || !data) return;
  slot.innerHTML = `
    ${chapterHead('contact', data.title)}
    <div class="contact-grid">
      ${data.items.map((item, i) => `
        <div class="card card--feature card--lift contact-card" data-reveal data-reveal-delay="${i + 1}">
          <span class="contact-card__icon"><i class="${item.icon}" aria-hidden="true"></i></span>
          <h3>${item.label}</h3>
          <p>${item.value}</p>
        </div>
      `).join('')}
    </div>
  `;
}

function renderVideos(data) {
  const slot = document.querySelector('[data-section="product-videos"]');
  if (!slot || !data) return;
  slot.innerHTML = `
    ${chapterHead('product-videos', data.title, data.subtitle)}
    <div class="video-grid">
      ${data.items.map((item, i) => `
        <article class="card card--lift video-card" data-reveal data-reveal-delay="${(i % 4) + 1}">
          <a href="${item.youtubeUrl}" target="_blank" rel="noopener noreferrer" class="video-card__thumb" aria-label="Watch: ${item.title}">
            <img src="https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg" alt="${item.title}" loading="lazy" decoding="async">
            <span class="video-card__play"><span><i class="fas fa-play" aria-hidden="true"></i></span></span>
          </a>
          <div class="video-card__body">
            <h3>${item.title}</h3>
            <p>${item.description}</p>
          </div>
        </article>
      `).join('')}
    </div>
  `;
}

function renderAbout(data) {
  const slot = document.querySelector('[data-section="about"]');
  if (!slot || !data) return;
  slot.innerHTML = `
    ${chapterHead('about', data.title)}
    <div class="about-grid">
      <div>
        <p class="about-lead" data-reveal>${data.description}</p>
        <div class="about-skills">
          ${data.skills.map((skill, i) => `
            <div class="card card--lift" data-reveal data-reveal-delay="${i + 1}">
              <h3>${skill.title}</h3>
              <p>${skill.description}</p>
            </div>
          `).join('')}
        </div>
        <a href="#contact" class="btn btn--brand" data-reveal data-reveal-delay="3">
          Contact Me <i class="fas fa-arrow-right" aria-hidden="true"></i>
        </a>
      </div>
      <div class="about-photo" data-reveal="scale-in">
        <img src="${data.image}" alt="Profile photo of Sui Qian" loading="lazy" decoding="async">
      </div>
    </div>
  `;
}

function renderCapabilities(data) {
  const slot = document.querySelector('[data-section="capabilities"]');
  if (!slot || !data) return;
  slot.innerHTML = `
    ${chapterHead('capabilities', data.title)}
    <div class="cap-shell" data-reveal>
      <div class="capability-tabs" role="tablist" aria-label="${data.title}">
        ${data.tabs.map((tab, i) => `
          <button class="capability-tab${i === 0 ? ' active' : ''}" data-tab="${tab.id}" role="tab" aria-selected="${i === 0}">
            <span class="tab-icon"><i data-lucide="${tab.icon}" aria-hidden="true"></i></span>
            <span>${tab.label}</span>
          </button>
        `).join('')}
      </div>
      <div class="cap-panels">
        ${data.tabs.map((tab, i) => `
          <div class="capability-content${i === 0 ? ' active' : ''}" id="${tab.id}" role="tabpanel">
            <h3>${tab.heading}</h3>
            <p>${tab.intro}</p>
            <ul>
              ${tab.bullets.map(bullet => `<li>${bullet}</li>`).join('')}
            </ul>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderTestimonials(data) {
  const slot = document.querySelector('[data-section="testimonials"]');
  if (!slot || !data) return;
  slot.innerHTML = `
    ${chapterHead('testimonials', 'Testimonials')}
    <div class="testimonials-carousel-container" data-reveal="fade-in">
      ${data.rows.map(row => `
        <div class="testimonials-row">
          ${row.map(img => `
            <div class="testimonial-image">
              <img src="${img.src}" alt="${img.alt}" loading="lazy" decoding="async">
            </div>
          `).join('')}
        </div>
      `).join('')}
      <div class="testimonials-shade-left" aria-hidden="true"></div>
      <div class="testimonials-shade-right" aria-hidden="true"></div>
    </div>
  `;
}

function renderFooter(data) {
  const slot = document.querySelector('[data-section="footer"]');
  if (!slot || !data) return;
  slot.innerHTML = `
    <div class="footer-grid">
      <div>
        <span class="footer-brand">${data.name}</span>
        <p>${data.tagline}</p>
      </div>
      <div>
        <h3>Quick Links</h3>
        <ul>
          ${data.quickLinks.map(link => `
            <li><a href="${link.href}">${link.label}</a></li>
          `).join('')}
        </ul>
      </div>
      <div>
        <h3>Contact</h3>
        <ul>
          ${data.contact.map(c => `
            <li><strong class="font-bold text-primary">${c.label}:</strong> ${c.value}</li>
          `).join('')}
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>${data.copyright}</p>
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', async function() {
  await loadContent();
  if (typeof initAllFeatures === 'function') {
    initAllFeatures();
  }
});

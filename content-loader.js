/* content-loader.js — Loads JSON content and renders all page sections dynamically */
/* NOT for styles, page structure, navigation, or hero section content */

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

    renderVideos(dataMap['product-videos']);
    renderProjects(dataMap['projects']);
    renderAbout(dataMap['about']);
    renderCapabilities(dataMap['capabilities']);
    renderWorkHistory(dataMap['work-history']);
    renderExperience(dataMap['experience']);
    renderAchievements(dataMap['achievements']);
    renderEducation(dataMap['education']);
    renderContact(dataMap['contact']);
    renderTestimonials(dataMap['testimonials']);
    renderFooter(dataMap['footer']);
  } catch (err) {
    console.error('Content loading failed:', err);
  }
}

function renderVideos(data) {
  const slot = document.querySelector('[data-section="product-videos"]');
  if (!slot || !data) return;
  slot.innerHTML = `
    <div class="text-center mb-12">
      <h2 class="text-4xl font-bold text-white">${data.title}</h2>
      <p class="mt-2 text-gray-400">${data.subtitle}</p>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      ${data.items.map(item => `
        <div class="group bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
          <a href="${item.youtubeUrl}" target="_blank" class="block relative pb-[56.25%]">
            <img src="https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg" alt="${item.title}" class="absolute inset-0 w-full h-full object-cover" />
          </a>
          <div class="p-5">
            <h3 class="text-xl font-semibold text-white mb-2">${item.title}</h3>
            <p class="text-gray-400 text-sm">${item.description}</p>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function renderProjects(data) {
  const slot = document.querySelector('[data-section="projects"]');
  if (!slot || !data) return;
  slot.innerHTML = `
    <div class="fade-in">
      <h2 class="text-3xl font-bold text-center text-gray-900 mb-12">${data.title}</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        ${data.items.map(item => `
          <div class="group bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
            <img src="${item.image}" alt="${item.title}" class="w-full h-48 object-cover">
            <div class="p-5">
              <h3 class="text-xl font-semibold text-white mb-2">${item.title}</h3>
              <p class="text-gray-400 text-sm">${item.description}</p>
              <a href="${item.link}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center px-4 py-2 !rounded-button bg-primary text-white font-medium hover:bg-primary/90 transition-colors whitespace-nowrap">
                Learn More
                <i class="fas fa-arrow-right ml-2"></i>
              </a>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderAbout(data) {
  const slot = document.querySelector('[data-section="about"]');
  if (!slot || !data) return;
  slot.innerHTML = `
    <div class="fade-in">
      <h2 class="text-3xl font-bold text-center text-gray-900 mb-16">${data.title}</h2>
      <div class="flex flex-wrap items-center">
        <div class="w-full lg:w-3/5 pr-8">
          <p class="text-lg text-gray-700 mb-6">${data.description}</p>
          <div class="grid grid-cols-3 gap-6 mb-8">
            ${data.skills.map(skill => `
              <div class="p-4 bg-white rounded-lg shadow-sm">
                <h3 class="font-semibold text-gray-900 mb-2">${skill.title}</h3>
                <p class="text-gray-600">${skill.description}</p>
              </div>
            `).join('')}
          </div>
          <div class="flex space-x-4">
            <a href="#contact" class="inline-flex items-center px-6 py-3 !rounded-button bg-primary text-white font-medium hover:bg-primary/90 transition-colors whitespace-nowrap">
              Contact Me
              <i class="fas fa-arrow-right ml-2"></i>
            </a>
          </div>
        </div>
        <div class="w-full lg:w-2/5 mt-8 lg:mt-0">
          <img src="${data.image}" alt="Profile Photo" class="w-full h-auto rounded-lg shadow-lg">
        </div>
      </div>
    </div>
  `;
}

function renderCapabilities(data) {
  const slot = document.querySelector('[data-section="capabilities"]');
  if (!slot || !data) return;
  slot.innerHTML = `
    <section id="capabilities" class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="fade-in">
          <h2 class="text-3xl font-bold text-center text-gray-900 mb-16">${data.title}</h2>
          <div class="flex flex-col lg:flex-row bg-gray-50 rounded-lg shadow-sm overflow-hidden">
            <div class="w-full lg:w-1/4 bg-gray-100">
              <div class="capability-tabs">
                ${data.tabs.map((tab, i) => `
                  <button class="capability-tab${i === 0 ? ' active' : ''}" data-tab="${tab.id}">
                    <div class="tab-icon"><i data-lucide="${tab.icon}" class="text-primary"></i></div>
                    <span>${tab.label}</span>
                  </button>
                `).join('')}
              </div>
            </div>
            <div class="w-full lg:w-3/4 p-6 lg:p-8">
              ${data.tabs.map((tab, i) => `
                <div class="capability-content${i === 0 ? ' active' : ''}" id="${tab.id}">
                  <h3 class="text-2xl font-bold text-gray-900 mb-4">${tab.heading}</h3>
                  <p class="text-gray-700 mb-4">${tab.intro}</p>
                  <ul class="space-y-3 text-gray-700">
                    ${tab.bullets.map(bullet => `
                      <li class="flex items-start">
                        <i class="fas fa-check-circle text-primary mr-2 mt-1 flex-shrink-0"></i>
                        <span>${bullet}</span>
                      </li>
                    `).join('')}
                  </ul>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderWorkHistory(data) {
  const slot = document.querySelector('[data-section="work-history"]');
  if (!slot || !data) return;
  slot.innerHTML = `
    <div class="mt-16">
      <h3 class="text-2xl font-bold text-center text-gray-900 mb-8">${data.title}</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        ${data.items.map(item => `
          <div class="bg-white p-6 rounded-lg shadow-sm">
            <div class="flex items-center mb-4">
              <div class="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                <img src="${item.logo}" alt="${item.name} Logo" class="w-15 h-15 object-contain">
              </div>
              <h4 class="text-xl font-bold text-gray-900">${item.name}</h4>
            </div>
            <div class="bg-gray-50 p-4 rounded-lg mb-3">
              <div class="flex items-center mb-2">
                <i class="fas fa-building text-primary mr-2"></i>
                <h5 class="font-medium text-gray-900">Company Introduction</h5>
              </div>
              <p class="text-white">${item.introduction}</p>
            </div>
            <div class="bg-gray-50 p-4 rounded-lg">
              <div class="flex items-center mb-2">
                <i class="fas fa-tasks text-primary mr-2"></i>
                <h5 class="font-medium text-gray-900">My Responsibilities</h5>
              </div>
              <p class="text-white">${item.responsibilities}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderExperience(data) {
  const slot = document.querySelector('[data-section="experience"]');
  if (!slot || !data) return;

  function buildIcon(item) {
    if (item.icon) {
      return `<i class="${item.icon} text-2xl text-primary"></i>`;
    }
    return `<img src="${item.logo}" alt="${item.company} Logo" class="w-6 h-6 object-contain">`;
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
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-10 mt-6">
        ${images.map(img => `
          <div class="group bg-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
            <img src="${img.src}" alt="${img.alt}" class="w-full h-64 object-contain cursor-pointer">
          </div>
        `).join('')}
      </div>
    `;
  }

  slot.innerHTML = `
    <div class="fade-in">
      <h2 class="text-3xl font-bold text-center text-gray-900 mb-16">${data.title}</h2>
      <div class="space-y-12">
        ${data.items.map(item => `
          <div class="timeline-item">
            <div class="bg-white p-6 rounded-lg shadow-sm">
              <div class="flex items-start">
                <div class="mr-4 p-2 bg-primary/10 rounded-full">
                  ${buildIcon(item)}
                </div>
                <div>
                  <h3 class="text-xl font-bold text-gray-900">${buildTitle(item)}</h3>
                  <p class="text-gray-600 mt-1">${item.period}</p>
                </div>
              </div>
              <div class="mt-4">
                <p class="text-gray-700 mb-4">${item.summary}</p>
                <ul class="list-disc list-inside text-gray-700 space-y-2">
                  ${item.bullets.map(b => `<li>${b}</li>`).join('')}
                </ul>
                ${buildImages(item.images)}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderAchievements(data) {
  const slot = document.querySelector('[data-section="achievements"]');
  if (!slot || !data) return;
  slot.innerHTML = `
    <div class="fade-in">
      <h2 class="text-3xl font-bold text-center text-gray-900 mb-16">${data.title}</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        ${data.stats.map(stat => `
          <div class="text-center">
            <div class="text-4xl font-bold text-primary mb-2" data-count="${stat.count}">0</div>
            <p class="text-gray-700">${stat.label}</p>
          </div>
        `).join('')}
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="bg-white p-6 rounded-lg shadow-sm">
          <h3 class="text-xl font-bold text-gray-900 mb-4">Technical Patents</h3>
          <ul class="space-y-4">
            ${data.patents.map(patent => `
              <li class="flex items-start">
                <i class="fas fa-certificate text-primary mt-1 mr-3"></i>
                <div>
                  <h4 class="font-medium text-gray-900">${patent.title}</h4>
                  <p class="text-gray-600 text-sm">
                    Patent No.:
                    <a href="${patent.link}" target="_blank" rel="noopener noreferrer" class="font-bold text-primary highlight-achievement">${patent.patentNo}</a>
                  </p>
                </div>
              </li>
            `).join('')}
          </ul>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-sm">
          <h3 class="text-xl font-bold text-gray-900 mb-4">Industry Impact</h3>
          <ul class="space-y-4">
            ${data.industryImpact.map(impact => `
              <li class="flex items-start">
                <i class="fas fa-trophy text-primary mt-1 mr-3"></i>
                <div>
                  <h4 class="font-medium text-gray-900">${impact.title}</h4>
                  <p class="text-gray-600">${impact.description}</p>
                </div>
              </li>
            `).join('')}
          </ul>
        </div>
      </div>
    </div>
  `;
}

function renderEducation(data) {
  const slot = document.querySelector('[data-section="education"]');
  if (!slot || !data) return;
  slot.innerHTML = `
    <div class="fade-in">
      <h2 class="text-3xl font-bold text-center text-gray-900 mb-16">${data.title}</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        ${data.items.map(item => `
          <div class="bg-white p-6 rounded-lg shadow-sm">
            <div class="flex items-center mb-4">
              <i class="fas fa-graduation-cap text-3xl text-primary mr-4"></i>
              <div>
                <h3 class="text-xl font-bold text-white">${item.school}</h3>
                <p class="text-gray-600">${item.degree}</p>
                <p class="text-gray-500">${item.period}</p>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderContact(data) {
  const slot = document.querySelector('[data-section="contact"]');
  if (!slot || !data) return;
  slot.innerHTML = `
    <div class="fade-in">
      <h2 class="text-3xl font-bold text-center text-gray-900 mb-16">${data.title}</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        ${data.items.map(item => `
          <div class="text-center">
            <div class="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <i class="${item.icon} text-2xl text-primary"></i>
            </div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">${item.label}</h3>
            <p class="text-gray-700">${item.value}</p>
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
    <div class="fade-in">
      <div class="testimonials-carousel-container mb-10">
        ${data.rows.map(row => `
          <div class="testimonials-row">
            ${row.map(img => `
              <div class="testimonial-image">
                <img src="${img.src}" alt="${img.alt}" class="rounded-lg shadow-sm">
              </div>
            `).join('')}
          </div>
        `).join('')}
        <div class="testimonials-shade-left"></div>
        <div class="testimonials-shade-right"></div>
      </div>
    </div>
  `;
}

function renderFooter(data) {
  const slot = document.querySelector('[data-section="footer"]');
  if (!slot || !data) return;
  slot.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div>
        <span class="text-2xl font-['Pacifico'] text-white mb-4 block">${data.name}</span>
        <p class="text-gray-400">${data.tagline}</p>
      </div>
      <div class="text-center">
        <h3 class="text-lg font-medium mb-4">Quick Links</h3>
        <ul class="space-y-2">
          ${data.quickLinks.map(link => `
            <li><a href="${link.href}" class="text-gray-400 hover:text-white">${link.label}</a></li>
          `).join('')}
        </ul>
      </div>
      <div class="text-right">
        <h3 class="text-lg font-medium mb-4">Contact</h3>
        <ul class="space-y-2">
          ${data.contact.map(c => `
            <li class="text-gray-400"><strong class="font-bold text-primary">${c.label}:</strong> ${c.value}</li>
          `).join('')}
        </ul>
      </div>
    </div>
    <div class="mt-8 pt-8 border-t border-gray-800 text-center">
      <p class="text-gray-400">${data.copyright}</p>
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', async function() {
  await loadContent();
  if (typeof initAllFeatures === 'function') {
    initAllFeatures();
  }
});

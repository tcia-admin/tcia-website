
  // Word Cloud Wave Effect
  document.addEventListener('DOMContentLoaded', function() {
      const wordCloudContent = document.getElementById('word-cloud-content');
      const words = [
          'Visionaries', 'Innovators', 'Researchers', 
          'Activists', 'Educators', 'Technologists',
          'Leaders', 'Advocates', 'Pioneers',
          'Scholars', 'Changemakers', 'Experts'
      ];
      
      // Create duplicated word sequence for smooth looping
      const allWords = [...words, ...words, ...words];
      
      // Clear any existing content
      wordCloudContent.innerHTML = '';
      
      // Add words with random float animation values
      allWords.forEach((word, index) => {
          const wordSpan = document.createElement('span');
          wordSpan.classList.add('word-cloud-word');
          wordSpan.textContent = word;
          
          // Set custom properties for animation
          wordSpan.style.setProperty('--delay', (index * 0.4).toFixed(1));
          wordSpan.style.setProperty('--float-y', Math.floor(Math.random() * 10) - 5);
          
          // Add diamond separator
          if (index < allWords.length - 1) {
              const separator = document.createElement('span');
              separator.classList.add('word-cloud-word');
              separator.innerHTML = ' <span>◇</span> ';
              separator.style.setProperty('--delay', ((index * 0.4) + 0.2).toFixed(1));
              separator.style.setProperty('--float-y', Math.floor(Math.random() * 8) - 4);
              
              wordCloudContent.appendChild(wordSpan);
              wordCloudContent.appendChild(separator);
          } else {
              wordCloudContent.appendChild(wordSpan);
          }
      });
  });

  // Speaker Bio Modal Functionality
  window.speakersData = null;

  // Load speaker bio data
  async function loadSpeakerData() {
      try {
          const response = await fetch('https://tcia-admin.github.io/tcia-server-files/d4pg-bios-2025.json');
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          window.speakersData = data.speakers;
      } catch (error) {
          console.error('Error loading speaker data:', error);
          // Fallback: show error message in modal if data fails to load
          window.speakersData = null;
      }
  }

  // Find speaker by ID
  function findSpeakerById(id) {
      if (!window.speakersData) return null;
      return window.speakersData.find(speaker => speaker.id === id);
  }

  // Create social media icon
  function getSocialIcon(type) {
      // Use PNG icons for major platforms with established brand icons,
      // Unicode emojis for newer/smaller platforms or where PNG isn't needed
      const icons = {
          'instagram': '<img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v10.0.0/icons/instagram.svg" alt="Instagram" class="social-icon-png">',
          'twitter': '<img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v10.0.0/icons/x.svg" alt="Twitter/X" class="social-icon-png">',
          'linkedin': '<img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v10.0.0/icons/linkedin.svg" alt="LinkedIn" class="social-icon-png">',
          'github': '<img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v10.0.0/icons/github.svg" alt="GitHub" class="social-icon-png">',
          'youtube': '<img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v10.0.0/icons/youtube.svg" alt="YouTube" class="social-icon-png">',
          'facebook': '<img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v10.0.0/icons/facebook.svg" alt="Facebook" class="social-icon-png">',
          'mastodon': '<img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v10.0.0/icons/mastodon.svg" alt="Mastodon" class="social-icon-png">',
          'bluesky': '🦋', // Keep Unicode for newer platforms
          'tiktok': '<img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v10.0.0/icons/tiktok.svg" alt="TikTok" class="social-icon-png">',
          'website': '🌐' // Keep Unicode for generic website
      };
      return icons[type] || '🔗';
  }

  // Get platform name for accessibility
  function getPlatformName(type) {
      const names = {
          'instagram': 'Instagram',
          'twitter': 'Twitter',
          'linkedin': 'LinkedIn',
          'github': 'GitHub',
          'youtube': 'YouTube',
          'facebook': 'Facebook',
          'mastodon': 'Mastodon',
          'bluesky': 'Bluesky',
          'tiktok': 'TikTok',
          'website': 'Website'
      };
      return names[type] || 'Link';
  }

  // Create social links HTML
  function createSocialLinks(socialData, title) {
      if (!socialData || socialData.length === 0) return '';
      
      let linksHTML = socialData.map(link => {
          const icon = getSocialIcon(link.type);
          const platformName = getPlatformName(link.type);
          const linkClass = link.type === 'website' ? 'speaker-social-link website' : 'speaker-social-link';
          
          // For websites, show the display text or cleaned URL
          // For social media platforms, show only the icon
          let displayContent = '';
          if (link.type === 'website') {
              const displayText = link.display || link.url.replace(/^https?:\/\/(www\.)?/, '');
              displayContent = `${icon} ${displayText}`;
          } else {
              displayContent = `<span class="social-icon-large">${icon}</span>`;
          }
          
          return `<a href="${link.url}" target="_blank" rel="noopener noreferrer" 
                      class="${linkClass}" 
                      title="${platformName}"
                      aria-label="${platformName}">
              ${displayContent}
          </a>`;
      }).join('');
      
      return `
          <div class="speaker-social-card">
              <h4>${title}</h4>
              <div class="speaker-social-links">
                  ${linksHTML}
              </div>
          </div>
      `;
  }

  // Create promotional content HTML
  function createPromotionalContent(promotionalData) {
      if (!promotionalData) return '';
      
      let contentHTML = '';
      
      // Handle books
      if (promotionalData.books && promotionalData.books.length > 0) {
          const booksHTML = promotionalData.books.map(book => {
              return `
                  <div class="promotional-book">
                      <div class="book-cover">
                          <img src="${book.cover_image}" alt="${book.title} book cover" />
                      </div>
                      <div class="book-content">
                          <h4 class="book-title">${book.title}</h4>
                          ${book.description ? `<p class="book-description">${book.description}</p>` : ''}
                          <a href="${book.purchase_url}" target="_blank" rel="noopener noreferrer" class="book-purchase-btn">
                              <span class="book-purchase-text">${book.label}</span>
                              <span class="book-purchase-icon">📚</span>
                          </a>
                      </div>
                  </div>
              `;
          }).join('');
          
          contentHTML += `
              <div class="speaker-promotional-section">
                  <h3 class="promotional-title">Latest Publications</h3>
                  <div class="promotional-books">
                      ${booksHTML}
                  </div>
              </div>
          `;
      }
      
      return contentHTML;
  }

  // Open speaker modal
  function openSpeakerModal(speakerId) {
      const modal = document.getElementById('speakerModal');
      const modalPhoto = document.getElementById('modalPhoto');
      const modalName = document.getElementById('modalName');
      const modalTitle = document.getElementById('modalTitle');
      const modalBio = document.getElementById('modalBio');
      const modalSocial = document.getElementById('modalSocial');
      const modalPromotional = document.getElementById('modalPromotional');

      // Show loading state
      modal.classList.add('active');
      modalBio.innerHTML = '<div class="speaker-modal-loading">Loading speaker information...</div>';
      document.body.style.overflow = 'hidden';

      // If data isn't loaded yet, load it first
      if (!window.speakersData) {
          loadSpeakerData().then(() => {
              populateModal(speakerId);
          }).catch(() => {
              modalBio.innerHTML = '<div class="speaker-modal-loading">Sorry, speaker information could not be loaded at this time.</div>';
          });
      } else {
          populateModal(speakerId);
      }
  }

  // Populate modal with speaker data
  function populateModal(speakerId) {
      const speaker = findSpeakerById(speakerId);
      const modalPhoto = document.getElementById('modalPhoto');
      const modalName = document.getElementById('modalName');
      const modalTitle = document.getElementById('modalTitle');
      const modalBio = document.getElementById('modalBio');
      const modalSocial = document.getElementById('modalSocial');
      const modalPromotional = document.getElementById('modalPromotional');

      if (!speaker) {
          modalBio.innerHTML = '<div class="speaker-modal-loading">Speaker information not found.</div>';
          return;
      }

      // Update photo
      modalPhoto.src = speaker.photo;
      modalPhoto.alt = speaker.name;

              // Update name and title
        modalName.innerHTML = speaker.pronouns ? 
            `<div class="speaker-name-text">${speaker.name}</div><div class="speaker-pronouns">${speaker.pronouns}</div>` : 
            `<div class="speaker-name-text">${speaker.name}</div>`;
        modalTitle.textContent = speaker.title;

      // Update bio
      let bioHTML = '';
      if (speaker.bio && speaker.bio.length > 0) {
          bioHTML = processBioText(speaker.bio);
      } else {
          bioHTML = '<p class="speaker-bio-text">Biography information coming soon.</p>';
      }
      modalBio.innerHTML = bioHTML;

      // Update social links
      let socialHTML = '';
      
      // Personal social links
      if (speaker.social && speaker.social.personal && speaker.social.personal.length > 0) {
          socialHTML += createSocialLinks(speaker.social.personal, 'Personal Links');
      }

      // Organization links
      if (speaker.social && speaker.social.organization) {
          socialHTML += createSocialLinks(speaker.social.organization.links, speaker.social.organization.name);
      }

      // Multiple organizations
      if (speaker.social && speaker.social.organizations) {
          speaker.social.organizations.forEach(org => {
              socialHTML += createSocialLinks(org.links, org.name);
          });
      }

      modalSocial.innerHTML = socialHTML;

      // Populate promotional content
      const promotionalContent = createPromotionalContent(speaker.promotional);
      if (promotionalContent) {
          modalPromotional.innerHTML = promotionalContent;
          modalPromotional.style.display = 'block';
      } else {
          modalPromotional.style.display = 'none';
      }
  }

  // Close speaker modal
  function closeSpeakerModal() {
      const modal = document.getElementById('speakerModal');
      modal.classList.remove('active');
      document.body.style.overflow = '';
  }

  // Initialize speaker interactions
  document.addEventListener('DOMContentLoaded', function() {
      // Load speaker data on page load
      loadSpeakerData();

      // Add click handlers to all speaker cards
      const speakerCards = document.querySelectorAll('.speaker[data-speaker-id]');
      speakerCards.forEach(card => {
          card.addEventListener('click', function() {
              const speakerId = this.dataset.speakerId;
              openSpeakerModal(speakerId);
          });

          // Add keyboard accessibility
          card.setAttribute('tabindex', '0');
          card.setAttribute('role', 'button');
          card.setAttribute('aria-label', `View ${this.querySelector('img').alt} biography`);
          
          card.addEventListener('keydown', function(e) {
              if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  const speakerId = this.dataset.speakerId;
                  openSpeakerModal(speakerId);
              }
          });
      });

      // Close modal handlers
      const closeButton = document.getElementById('closeModal');
      const modal = document.getElementById('speakerModal');

      closeButton.addEventListener('click', closeSpeakerModal);

      // Close on outside click
      modal.addEventListener('click', function(e) {
          if (e.target === modal) {
              closeSpeakerModal();
          }
      });

      // Close on escape key
      document.addEventListener('keydown', function(e) {
          if (e.key === 'Escape' && modal.classList.contains('active')) {
              closeSpeakerModal();
          }
      });
  });

  // Schedule Sidebar Functions
  function openScheduleSidebar() {
      const sidebar = document.getElementById('scheduleSidebar');
      const overlay = document.querySelector('.schedule-sidebar-overlay');
      const iframe = document.querySelector('.schedule-sidebar-iframe');
      
      sidebar.classList.add('open');
      overlay.classList.add('active');
      
      // Ensure iframe is loaded
      if (!iframe.src.includes('/ds-mobile-source')) {
          iframe.src = '/ds-mobile-source';
      }
      
      // Prevent body scrolling when sidebar is open
      document.body.style.overflow = 'hidden';
  }

  function closeScheduleSidebar() {
      const sidebar = document.getElementById('scheduleSidebar');
      const overlay = document.querySelector('.schedule-sidebar-overlay');
      
      sidebar.classList.remove('open');
      overlay.classList.remove('active');
      
      // Restore body scrolling
      document.body.style.overflow = '';
  }

  // Close sidebar with Escape key
  document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape') {
          const modal = document.getElementById('speakerModal');
          if (modal.classList.contains('active')) {
              closeSpeakerModal();
          } else {
              closeScheduleSidebar();
          }
      }
  });

  // Handle window resize for sidebar responsiveness
  window.addEventListener('resize', function() {
      const sidebar = document.getElementById('scheduleSidebar');
      if (sidebar.classList.contains('open') && window.innerWidth <= 480) {
          sidebar.style.width = '100vw';
      } else if (sidebar.classList.contains('open')) {
          sidebar.style.width = '400px';
      }
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('.nav-links a[href^="#"], .nav-links a[href*="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          const href = this.getAttribute('href');
          if (href.includes('#')) {
              e.preventDefault();
              const targetId = href.split('#')[1];
              const targetElement = document.getElementById(targetId);
              if (targetElement) {
                  targetElement.scrollIntoView({ behavior: 'smooth' });
              }
          }
      });
  });

  // Enhanced bio processing with Markdown support
  function processBioText(bioArray) {
      if (!bioArray || bioArray.length === 0) {
          return '<p class="speaker-bio-text">Biography information coming soon.</p>';
      }
      
      return bioArray.map(paragraph => {
          // Process markdown-style formatting
          let processedText = paragraph;
          
          // Convert markdown links [text](url) to HTML links
          processedText = processedText.replace(/\[([^\]]+)\]\(([^)]+)\)/g, function(match, linkText, url) {
              return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="bio-link">${linkText}</a>`;
          });
          
          // Convert **bold** to <strong>
          processedText = processedText.replace(/\*\*([^*]+)\*\*/g, '<strong class="bio-bold">$1</strong>');
          
          // Convert *italic* (but not **bold**)
          processedText = processedText.replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '<em class="bio-italic">$1</em>');
          
          // Convert __underline__ to <u>
          processedText = processedText.replace(/__([^_]+)__/g, '<u class="bio-underline">$1</u>');
          
          return `<p class="speaker-bio-text">${processedText}</p>`;
      }).join('');
  }

  // Speaker Search Functionality
  function normalizeString(str) {
    return (str || '').toLowerCase();
  }

  function speakerMatches(speakerElem, searchTerm, speakersData) {
    if (!searchTerm) return true;
    const id = speakerElem.dataset.speakerId;
    if (!id || !speakersData) return false;
    const speaker = speakersData.find(s => s.id === id);
    if (!speaker) return false;
    const term = normalizeString(searchTerm);
    // Gather all searchable fields
    let fields = [speaker.name, speaker.title];
    if (Array.isArray(speaker.bio)) fields = fields.concat(speaker.bio);
    // Social links (personal, organization, organizations)
    if (speaker.social) {
      if (Array.isArray(speaker.social.personal)) {
        speaker.social.personal.forEach(link => {
          fields.push(link.display, link.url);
        });
      }
      if (speaker.social.organization) {
        if (Array.isArray(speaker.social.organization.links)) {
          speaker.social.organization.links.forEach(link => {
            fields.push(link.display, link.url);
          });
        }
        fields.push(speaker.social.organization.name);
      }
      if (Array.isArray(speaker.social.organizations)) {
        speaker.social.organizations.forEach(org => {
          fields.push(org.name);
          if (Array.isArray(org.links)) {
            org.links.forEach(link => {
              fields.push(link.display, link.url);
            });
          }
        });
      }
    }
    // Join all fields and search
    return fields.some(f => f && normalizeString(f).includes(term));
  }

  function filterSpeakers(searchTerm) {
    // Desktop
    const desktopCards = document.querySelectorAll('.desktop-speaker-section .speaker');
    // Mobile
    const mobileCards = document.querySelectorAll('.mobile-speaker-section .speaker');
    let anyVisible = false;
    desktopCards.forEach(card => {
      if (speakerMatches(card, searchTerm, window.speakersData)) {
        card.style.display = '';
        anyVisible = true;
      } else {
        card.style.display = 'none';
      }
    });
    mobileCards.forEach(card => {
      if (speakerMatches(card, searchTerm, window.speakersData)) {
        card.style.display = '';
        anyVisible = true;
      } else {
        card.style.display = 'none';
      }
    });
    // Show/hide no results message
    document.getElementById('speakerNoResults').style.display = anyVisible ? 'none' : '';
  }

  // Wait for speaker data to load, then enable search
  function enableSpeakerSearch() {
    const input = document.getElementById('speakerSearchInput');
    if (!input) return;
    input.addEventListener('input', function() {
      filterSpeakers(this.value);
    });
  }

  // Patch: wait for speakersData to be loaded
  (function waitForSpeakersData() {
    if (window.speakersData) {
      enableSpeakerSearch();
    } else {
      setTimeout(waitForSpeakersData, 100);
    }
  })();
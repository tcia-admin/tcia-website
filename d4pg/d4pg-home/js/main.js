
    // Handle smooth scrolling for navigation links
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const section = document.querySelector(this.getAttribute('href'));
            section.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Handle active nav link highlighting
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Initialize all functionality on DOM ready
    document.addEventListener('DOMContentLoaded', async function () {
        // ===== Speaker Carousel Initialization =====
        const row = document.getElementById('speaker-row');
        const leftArrow = document.querySelector('.speaker-scroll-left');
        const rightArrow = document.querySelector('.speaker-scroll-right');
        const speakers = row ? row.querySelectorAll('.speaker') : [];
        
        let currentPage = 0;
        let speakersPerPage = 4; // Default for desktop
        let totalPages = 0;
        let autoScrollInterval;

        // Calculate speakers per page based on screen size
        function calculateSpeakersPerPage() {
            const screenWidth = window.innerWidth;
            if (screenWidth <= 480) {
                speakersPerPage = 1;
            } else if (screenWidth <= 768) {
                speakersPerPage = 2;
            } else if (screenWidth <= 1024) {
                speakersPerPage = 3;
            } else {
                speakersPerPage = 4;
            }
            
            totalPages = Math.ceil(speakers.length / speakersPerPage);
        }

        // Update arrow visibility based on current page
        function updateArrowVisibility() {
            if (!leftArrow || !rightArrow || totalPages <= 1) {
                if (leftArrow) leftArrow.classList.add('hidden');
                if (rightArrow) rightArrow.classList.add('hidden');
                return;
            }
            
            leftArrow.classList.toggle('hidden', currentPage === 0);
            rightArrow.classList.toggle('hidden', currentPage === totalPages - 1);
        }

        // Show speakers for current page with smooth transitions
        function showCurrentPage() {
            if (!speakers.length) return;
            
            const speakerPageStart = currentPage * speakersPerPage;
            const speakerPageEnd = speakerPageStart + speakersPerPage;
            
            // First, fade out all currently visible speakers
            speakers.forEach(speaker => {
                if (speaker.style.opacity === '1' || speaker.style.display === 'block') {
                    speaker.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                    speaker.style.opacity = '0';
                    speaker.style.transform = 'translateY(10px)';
                }
            });
            
            // After fade out completes, hide old speakers and show new ones
            setTimeout(() => {
                speakers.forEach((speaker, index) => {
                    if (index >= speakerPageStart && index < speakerPageEnd) {
                        // Show new speakers
                        speaker.style.display = 'block';
                        speaker.style.opacity = '0';
                        speaker.style.transform = 'translateY(20px)';
                        
                        // Fade in with stagger effect
                        setTimeout(() => {
                            speaker.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                            speaker.style.opacity = '1';
                            speaker.style.transform = 'translateY(0)';
                        }, (index - speakerPageStart) * 80 + 50);
                    } else {
                        // Hide old speakers
                        speaker.style.display = 'none';
                        speaker.style.transform = 'translateY(0)';
                    }
                });
            }, 400);
            
            updateArrowVisibility();
        }

        // Navigate to specific page
        function goToPage(pageNumber) {
            if (pageNumber < 0 || pageNumber >= totalPages) return;
            
            currentPage = pageNumber;
            showCurrentPage();
        }

        // Manual navigation function
        window.scrollSpeakers = function(direction) {
            // Stop auto-scroll when user manually navigates
            clearInterval(autoScrollInterval);
            
            if (direction === 'left' && currentPage > 0) {
                goToPage(currentPage - 1);
            } else if (direction === 'right' && currentPage < totalPages - 1) {
                goToPage(currentPage + 1);
            }
            
            // Restart auto-scroll after a delay
            setTimeout(() => {
                startAutoScroll();
            }, 10000);
        };

        // Auto-scroll function
        function startAutoScroll() {
            clearInterval(autoScrollInterval);
            if (totalPages <= 1) return; // Don't auto-scroll if only one page
            
            autoScrollInterval = setInterval(() => {
                if (currentPage < totalPages - 1) {
                    goToPage(currentPage + 1);
                } else {
                    goToPage(0); // Loop back to first page
                }
            }, 10000);
        }

        // Initialize carousel
        function initializeCarousel() {
            if (!speakers.length) return;
            
            calculateSpeakersPerPage();
            currentPage = 0;
            showCurrentPage();
            startAutoScroll();
        }

        // Handle window resize
        window.addEventListener('resize', () => {
            calculateSpeakersPerPage();
            // Adjust current page if needed
            if (currentPage >= totalPages) {
                currentPage = totalPages - 1;
            }
            showCurrentPage();
        });

        // Pause auto-scroll on hover
        if (row) {
            row.addEventListener('mouseenter', () => clearInterval(autoScrollInterval));
            row.addEventListener('mouseleave', () => startAutoScroll());
        }

        // Initialize after a short delay to ensure images are loaded
        setTimeout(initializeCarousel, 100);
        
        // ===== Speaker Modal Initialization =====
        // Load speaker data on page load
        loadSpeakerData();
        
        // Initialize gallery drawer
        initializeGalleryDrawer();

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

        if (closeButton && modal) {
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
        }
        
        // ===== Workshop Initialization =====
        try {
            workshopsByDay = await loadWorkshopData();
            
            // Initialize day tabs
            const dayTabs = document.querySelectorAll('.day-tab');
            dayTabs.forEach((tab, index) => {
                tab.addEventListener('click', () => {
                    currentDay = index;
                    currentWorkshopIndex = 0;
                    updateDayTabs();
                    populateWorkshopCarousel();
                    updateWorkshopDisplay(0);
                    resetProgressBar();
                });
            });
            
            // Initialize carousel navigation
            const prevBtn = document.querySelector('.workshop-carousel-prev');
            const nextBtn = document.querySelector('.workshop-carousel-next');
            
            prevBtn.addEventListener('click', () => {
                navigateCarousel(-1);
            });
            
            nextBtn.addEventListener('click', () => {
                navigateCarousel(1);
            });
            
            // Initial setup
            populateWorkshopCarousel();
            updateWorkshopDisplay(0);
            startProgressBar();
            
        } catch (error) {
            console.error('Error initializing workshops:', error);
        }
    });

    // Mobile Schedule Sidebar Functions
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

    // Sizzle Reel Video Player Function
    function playVideo() {
        const overlay = document.getElementById('sizzleReelOverlay');
        const video = document.getElementById('sizzleReelVideo');
        
        // Hide the gradient overlay with animation
        overlay.classList.add('hidden');
        
        // Show the video after a brief delay
        setTimeout(() => {
            video.classList.add('visible');
        }, 300);
    }

    // Close sidebar with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeScheduleSidebar();
        }
    });

    // Handle window resize for sidebar responsiveness
    window.addEventListener('resize', function() {
        const sidebar = document.getElementById('scheduleSidebar');
        if (sidebar.classList.contains('open') && window.innerWidth <= 480) {
            // Adjust sidebar for very small screens
            sidebar.style.width = '100vw';
        } else if (sidebar.classList.contains('open')) {
            sidebar.style.width = '400px';
        }
    });

    // Image Modal Functions
    function openImageModal(imageSrc, caption) {
        document.getElementById('modalImage').src = imageSrc;
        document.getElementById('modalCaption').textContent = caption;
        document.getElementById('imageModal').classList.add('active');
        // Prevent body scrolling when modal is open
        document.body.style.overflow = 'hidden';
    }

    function closeImageModal() {
        document.getElementById('imageModal').classList.remove('active');
        // Restore body scrolling
        document.body.style.overflow = '';
    }

    // Close modal when clicking outside the image
    document.getElementById('imageModal').addEventListener('click', function(event) {
        if (event.target === this) {
            closeImageModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeImageModal();
        }
    });

    // Mobile Navigation Toggle Function
    function toggleMobileNav() {
        const navLinks = document.getElementById('navLinks');
        navLinks.classList.toggle('mobile-open');
    }

    // Speaker Bio Modal Functionality
    let speakersData = null;

    // Load speaker bio data
    async function loadSpeakerData() {
        try {
            const response = await fetch('https://tcia-admin.github.io/tcia-server-files/d4pg-bios-2025.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            speakersData = data.speakers;
        } catch (error) {
            console.error('Error loading speaker data:', error);
            speakersData = null;
        }
    }

    // Find speaker by ID
    function findSpeakerById(id) {
        if (!speakersData) return null;
        return speakersData.find(speaker => speaker.id === id);
    }

    // Process bio text to handle paragraphs
    function processBioText(bioArray) {
        if (!bioArray || bioArray.length === 0) {
            return '<p class="speaker-bio-text">Biography information coming soon.</p>';
        }
        
        return bioArray.map(paragraph => {
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

        // Show loading state
        modal.classList.add('active');
        modalBio.innerHTML = '<div class="speaker-modal-loading">Loading speaker information...</div>';
        document.body.style.overflow = 'hidden';

        // If data isn't loaded yet, load it first
        if (!speakersData) {
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

        // Add promotional content
        const promotionalContent = createPromotionalContent(speaker.promotional);
        modalPromotional.innerHTML = promotionalContent;
        
        // Show/hide promotional section based on content
        if (promotionalContent) {
            modalPromotional.style.display = 'block';
        } else {
            modalPromotional.style.display = 'none';
        }

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
    }

    // Close speaker modal
    function closeSpeakerModal() {
        const modal = document.getElementById('speakerModal');
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }




    // Workshop variables
    let currentDay = 0;
    let currentWorkshopIndex = 0;
    let workshopsByDay = [];
    const ROTATION_TIME = 30000; // 30 seconds per workshop
    
    function populateWorkshopCarousel() {
        const track = document.getElementById('workshopTitleTrack');
        const currentWorkshops = getCurrentDayWorkshops();
        
        // Clear existing items
        track.innerHTML = '';
        
        // Add workshop title items
        currentWorkshops.forEach((workshop, index) => {
            const item = document.createElement('div');
            item.className = `workshop-title-item ${index === currentWorkshopIndex ? 'active' : ''}`;
            item.innerHTML = `
                <div class="workshop-title-text">${workshop.title}</div>
                <div class="workshop-title-time">${workshop.time}</div>
            `;
            
            item.addEventListener('click', () => {
                currentWorkshopIndex = index;
                updateWorkshopDisplay(index);
                updateCarouselActive();
                resetProgressBar();
            });
            
            track.appendChild(item);
        });
        
        // Position the track to show current workshop
        updateCarouselPosition();
    }
    
    function updateCarouselActive() {
        const items = document.querySelectorAll('.workshop-title-item');
        items.forEach((item, index) => {
            item.classList.toggle('active', index === currentWorkshopIndex);
        });
    }
    
    function updateCarouselPosition() {
        const track = document.getElementById('workshopTitleTrack');
        const items = track.querySelectorAll('.workshop-title-item');
        if (items.length === 0) return;
        
        const itemWidth = items[0].offsetWidth + parseInt(getComputedStyle(items[0]).marginRight);
        const offset = -currentWorkshopIndex * itemWidth;
        track.style.transform = `translateX(${offset}px)`;
    }
    
    function navigateCarousel(direction) {
        const currentWorkshops = getCurrentDayWorkshops();
        currentWorkshopIndex = (currentWorkshopIndex + direction + currentWorkshops.length) % currentWorkshops.length;
        
        updateWorkshopDisplay(currentWorkshopIndex);
        updateCarouselActive();
        updateCarouselPosition();
        resetProgressBar();
    }
    
    // ... existing code ...
    
    function updateWorkshopDisplay(index) {
        const currentWorkshops = getCurrentDayWorkshops();
        const workshop = currentWorkshops[index];
        
        if (!workshop) return;
        
        // Update main panel content
        const tagElement = document.getElementById('mainWorkshopTag');
        const titleElement = document.getElementById('mainWorkshopTitle');
        const presentersElement = document.getElementById('mainWorkshopPresenters');
        const descriptionElement = document.getElementById('mainWorkshopDescription');
        const timeElement = document.getElementById('mainWorkshopTime');
        
        if (tagElement) tagElement.textContent = workshop.tag;
        if (titleElement) titleElement.textContent = workshop.title;
        if (presentersElement) {
            presentersElement.innerHTML = `
                <span class="workshop-main-presenter-icon">👥</span>
                ${workshop.presenter}
            `;
        }
        if (descriptionElement) descriptionElement.textContent = workshop.description;
        if (timeElement) {
            timeElement.innerHTML = `
                <span>⏰</span>
                ${workshop.time}
            `;
        }
        
        // Update carousel active state
        updateCarouselActive();
    }
    
    // ... rest of existing code ...

    // Helper Functions
    function getCurrentDayWorkshops() {
        return workshopsByDay[currentDay] || [];
    }

    function updateDayTabs() {
        document.querySelectorAll('.day-tab').forEach((tab, index) => {
            tab.classList.toggle('active', index === currentDay);
        });
    }

    function startProgressBar() {
        resetProgressBar();
        const progressBar = document.getElementById('workshopProgressBar');
        if (!progressBar) return;
        
        let progress = 0;
        const interval = setInterval(() => {
            progress += 100 / (ROTATION_TIME / 100); // Update every 100ms
            if (progress >= 100) {
                clearInterval(interval);
            } else {
                progressBar.style.width = progress + '%';
            }
        }, 100);
    }

    function resetProgressBar() {
        const progressBar = document.getElementById('workshopProgressBar');
        if (progressBar) {
            progressBar.style.width = '0%';
        }
    }

    // Workshop Data Loading
    async function loadWorkshopData() {
        try {
            const scheduleFiles = [
                'https://tcia-admin.github.io/tcia-server-files/d4pg-schedule-day1.json',
                'https://tcia-admin.github.io/tcia-server-files/d4pg-schedule-day2.json',
                'https://tcia-admin.github.io/tcia-server-files/d4pg-schedule-day3.json'
            ];
            
            const responses = await Promise.all(
                scheduleFiles.map(url => fetch(url))
            );
            
            const scheduleData = await Promise.all(
                responses.map(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
            );
            
            const workshopsByDay = [[], [], []];
            
            scheduleData.forEach((dayData, dayIndex) => {
                const dayName = ['Day 1', 'Day 2', 'Day 3'][dayIndex];
                const dayEvents = dayData.events || [];
                
                const dayWorkshops = dayEvents.filter(event => event.type === 'workshop');
                
                dayWorkshops.forEach(workshop => {
                    workshopsByDay[dayIndex].push({
                        tag: generateWorkshopTag(workshop.title),
                        title: workshop.title,
                        presenter: formatPresenters(workshop.people),
                        description: workshop.description || 'Workshop details coming soon.',
                        time: `${formatTime(workshop.startTime)} - ${formatTime(workshop.endTime)}`,
                        day: dayName
                    });
                });
            });
            
            return workshopsByDay;
            
        } catch (error) {
            console.error('Error loading workshop data:', error);
            return [[{
                tag: 'Loading',
                title: 'Loading Workshop Information...',
                presenter: 'Please wait while we load the latest workshop details',
                description: 'Workshop information is being loaded from our schedule.',
                time: 'Loading...'
            }], [], []];
        }
    }

    function generateWorkshopTag(title) {
        const lowerTitle = title.toLowerCase();
        
        if (lowerTitle.includes('data') || lowerTitle.includes('sovereignty')) {
            return 'Data Justice';
        } else if (lowerTitle.includes('ai') || lowerTitle.includes('algorithm')) {
            return 'AI Ethics';
        } else if (lowerTitle.includes('afrofutur')) {
            return 'Afrofuturism';
        } else if (lowerTitle.includes('education') || lowerTitle.includes('learn')) {
            return 'Education';
        } else if (lowerTitle.includes('privacy') || lowerTitle.includes('surveillance')) {
            return 'Privacy Rights';
        } else if (lowerTitle.includes('organizing') || lowerTitle.includes('democracy')) {
            return 'Digital Organizing';
        } else if (lowerTitle.includes('writing') || lowerTitle.includes('narrative')) {
            return 'Storytelling';
        } else if (lowerTitle.includes('community') || lowerTitle.includes('collaboration')) {
            return 'Community';
        } else {
            return 'Workshop';
        }
    }

    function formatPresenters(people) {
        if (!people || !people.speakers || people.speakers.length === 0) {
            return 'Presenters TBD';
        }
        return people.speakers.map(speaker => speaker.name).join(' & ');
    }

    function formatTime(timeString) {
        if (!timeString) return '';
        
        const [hours, minutes] = timeString.split(':');
        const hour = parseInt(hours);
        const minute = minutes || '00';
        
        if (hour === 0) {
            return `12:${minute} AM`;
        } else if (hour < 12) {
            return `${hour}:${minute} AM`;
        } else if (hour === 12) {
            return `12:${minute} PM`;
        } else {
                        return `${hour - 12}:${minute} PM`;
    }
}

// Gallery data and functionality
function initializeGalleryDrawer() {
    const galleryTriggerBtn = document.getElementById('galleryTriggerBtn');
    const galleryDrawerOverlay = document.getElementById('galleryDrawerOverlay');
    const galleryDrawer = document.getElementById('galleryDrawer');
    const galleryCloseBtn = document.getElementById('galleryCloseBtn');
    const galleryLoading = document.getElementById('galleryLoading');
    const galleryMasonry = document.getElementById('galleryMasonry');
    const galleryImageModal = document.getElementById('galleryImageModal');
    const galleryModalImage = document.getElementById('galleryModalImage');
    const galleryModalClose = document.getElementById('galleryModalClose');
    
    // Gallery data - Dynamic loading from proxy endpoint with caching
    const CACHE_KEY = 'd4pg_gallery_images';
    const CACHE_TIMESTAMP_KEY = 'd4pg_gallery_timestamp';
    const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds
    
    // Fallback images in case of network issues
    const fallbackGalleryImages = [
        'https://images.squarespace-cdn.com/content/5b9081c58ab7224793278e1d/56233c80-0372-478a-ae7b-c665d7e790cb/D4PG_25-27.jpg?content-type=image%2Fjpeg',
        'https://images.squarespace-cdn.com/content/5b9081c58ab7224793278e1d/a1f8513f-d8f8-4349-8a55-e85a9d906291/D4PG_25-26.jpg?content-type=image%2Fjpeg',
        'https://images.squarespace-cdn.com/content/5b9081c58ab7224793278e1d/8c5978df-4ea7-44f9-b04d-4b95ff84fa3d/D4PG_25-39-min.jpg?content-type=image%2Fjpeg',
        'https://images.squarespace-cdn.com/content/5b9081c58ab7224793278e1d/e0e1a38a-fab0-4b8b-96e1-524e100f115f/D4PG_25-37-min.jpg?content-type=image%2Fjpeg',
        'https://images.squarespace-cdn.com/content/5b9081c58ab7224793278e1d/2eeda250-f302-47b5-8903-73a1f0e04ec7/D4PG_25-40-min.jpg?content-type=image%2Fjpeg',
        'https://images.squarespace-cdn.com/content/5b9081c58ab7224793278e1d/acbcc8dd-c111-4411-b502-bb068d46994d/D4PG_25-38-min.jpg?content-type=image%2Fjpeg',
        'https://images.squarespace-cdn.com/content/5b9081c58ab7224793278e1d/3d9ba313-f6b5-4cce-831a-a5b967f54650/D4PG_25-33-min.jpg?content-type=image%2Fjpeg',
        'https://images.squarespace-cdn.com/content/5b9081c58ab7224793278e1d/092cef26-dcd0-4a43-b880-b4728a0b914a/D4PG_25-32-min.jpg?content-type=image%2Fjpeg',
        'https://images.squarespace-cdn.com/content/5b9081c58ab7224793278e1d/38c2505f-5cbf-486f-ba88-93c26ec4b38a/D4PG_25-36-min.jpg?content-type=image%2Fjpeg',
        'https://images.squarespace-cdn.com/content/5b9081c58ab7224793278e1d/9b363de3-7de1-4ab7-b112-a4472096b0ce/D4PG_25-31-min.jpg?content-type=image%2Fjpeg',
        'https://images.squarespace-cdn.com/content/5b9081c58ab7224793278e1d/bbc0952f-f519-42f5-b4b5-545179de93c8/D4PG_25-41-min.jpg?content-type=image%2Fjpeg',
        'https://images.squarespace-cdn.com/content/5b9081c58ab7224793278e1d/f78616f8-2e60-4389-9897-b6e685a25476/D4PG_25-34-min.jpg?content-type=image%2Fjpeg',
        'https://images.squarespace-cdn.com/content/5b9081c58ab7224793278e1d/b4d8e230-a843-4c7a-9a74-9f807107a896/D4PG_25-30-min.jpg?content-type=image%2Fjpeg',
        'https://images.squarespace-cdn.com/content/5b9081c58ab7224793278e1d/6af5ee5f-1758-484c-86a2-16a26ad34dff/D4PG_25-35-min.jpg?content-type=image%2Fjpeg',
        'https://images.squarespace-cdn.com/content/5b9081c58ab7224793278e1d/8a6f601f-8463-4f04-9750-b71f8dd6c4ea/D4PG_25-23-min.jpg?content-type=image%2Fjpeg',
        'https://images.squarespace-cdn.com/content/5b9081c58ab7224793278e1d/e469743a-45ff-42c5-a36c-cea3655c7f66/D4PG_25-22-min.jpg?content-type=image%2Fjpeg',
        'https://images.squarespace-cdn.com/content/5b9081c58ab7224793278e1d/56682c1c-3dd2-46af-9800-aa4267608bc6/D4PG_25-24-min.jpg?content-type=image%2Fjpeg'
    ];
    
    // Function to fetch images from the proxy endpoint
    async function fetchGalleryImages() {
        try {
            // Check cache first
            const cachedImages = getCachedImages();
            if (cachedImages) return cachedImages;
            
            const response = await fetch('/d4pg-2025-image-proxy');
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const html = await response.text();
            const images = parseImagesFromHTML(html);
            
            if (images.length > 0) {
                setCachedImages(images);
                return images;
            } else {
                throw new Error('No images found in proxy response');
            }
            
        } catch (error) {
            console.error('Error fetching gallery images:', error);
            return fallbackGalleryImages;
        }
    }
    
    // Function to parse images from HTML
    function parseImagesFromHTML(html) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const galleryElements = doc.querySelectorAll('.gallery img');
        
        const imageUrls = [];
        galleryElements.forEach(img => {
            // Get the highest quality src available
            const src = img.getAttribute('data-src') || img.getAttribute('src');
            if (src && src.startsWith('http')) {
                // Remove any query parameters that might limit quality
                const cleanUrl = src.split('?')[0];
                imageUrls.push(cleanUrl);
            }
        });
        
        return imageUrls;
    }
    
    // Cache management functions
    function getCachedImages() {
        try {
            const cachedTimestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);
            const cachedImages = localStorage.getItem(CACHE_KEY);
            
            if (!cachedTimestamp || !cachedImages) {
                return null;
            }
            
            const timestamp = parseInt(cachedTimestamp);
            const now = Date.now();
            
            // Check if cache is still valid
            if (now - timestamp < CACHE_DURATION) {
                return JSON.parse(cachedImages);
            } else {
                // Cache expired, clear it
                localStorage.removeItem(CACHE_KEY);
                localStorage.removeItem(CACHE_TIMESTAMP_KEY);
                return null;
            }
        } catch (error) {
            console.error('Error reading cache:', error);
            return null;
        }
    }
    
    function setCachedImages(images) {
        try {
            localStorage.setItem(CACHE_KEY, JSON.stringify(images));
            localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());
        } catch (error) {
            console.error('Error setting cache:', error);
        }
    }
    
    let galleryLoaded = false;
    let observer = null;
    
    // Show gallery trigger button and arrow pointer on scroll
    const galleryArrowPointer = document.getElementById('galleryArrowPointer');
    let arrowHideTimeout;
    let hasInteractedWithGallery = false;
    
    // Auto-hide arrow after 15 seconds of being visible
    function startArrowAutoHide() {
        clearTimeout(arrowHideTimeout);
        arrowHideTimeout = setTimeout(() => {
            galleryArrowPointer.classList.remove('visible');
        }, 15000); // Hide after 15 seconds
    }
    
    // Hide arrow permanently after user interaction
    function hideArrowPermanently() {
        hasInteractedWithGallery = true;
        galleryArrowPointer.classList.remove('visible');
        clearTimeout(arrowHideTimeout);
    }
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            galleryTriggerBtn.classList.add('visible');
            
            // Only show arrow if user hasn't interacted with gallery yet
            if (!hasInteractedWithGallery) {
                galleryArrowPointer.classList.add('visible');
                startArrowAutoHide();
            }
        } else {
            galleryTriggerBtn.classList.remove('visible');
            galleryArrowPointer.classList.remove('visible');
            clearTimeout(arrowHideTimeout);
        }
    });
    
    // Open gallery
    function openGallery() {
        galleryTriggerBtn.classList.add('active');
        galleryDrawerOverlay.classList.add('active');
        galleryDrawer.classList.add('active');
        hideArrowPermanently(); // Hide arrow permanently when gallery opens
        document.body.style.overflow = 'hidden';
        
        if (!galleryLoaded) {
            loadGalleryImages();
        }
    }
    
    // Close gallery
    function closeGallery() {
        galleryTriggerBtn.classList.remove('active');
        galleryDrawerOverlay.classList.remove('active');
        galleryDrawer.classList.remove('active');
        document.body.style.overflow = '';
        
        // Don't show arrow again after closing since user has already interacted
    }
    
    // Load gallery images with lazy loading
    async function loadGalleryImages() {
        galleryLoading.style.display = 'flex';
        
        try {
            // Fetch images dynamically
            const galleryImages = await fetchGalleryImages();
            
            observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.1
            });
            
            galleryImages.forEach((imageUrl, index) => {
                const galleryItem = document.createElement('div');
                galleryItem.className = 'gallery-item';
                galleryItem.innerHTML = `
                    <img 
                        class="gallery-item-image" 
                        data-src="${imageUrl}" 
                        alt="D4PG Gallery Image ${index + 1}"
                        loading="lazy"
                    >
                    <div class="gallery-item-overlay">
                        <i class="gallery-item-icon fas fa-expand-alt"></i>
                    </div>
                `;
                
                const img = galleryItem.querySelector('.gallery-item-image');
                observer.observe(img);
                
                galleryItem.addEventListener('click', () => {
                    openImageModal(imageUrl);
                });
                
                galleryMasonry.appendChild(galleryItem);
            });
            
            setTimeout(() => {
                galleryLoading.style.display = 'none';
                galleryLoaded = true;
            }, 800);
            
        } catch (error) {
            console.error('Error loading gallery images:', error);
            galleryLoading.style.display = 'none';
            
            // Show error message to user
            const errorElement = document.createElement('div');
            errorElement.className = 'gallery-error';
            errorElement.innerHTML = `
                <p>Unable to load gallery images. Please try again later.</p>
                <button onclick="location.reload()">Refresh Page</button>
            `;
            galleryMasonry.appendChild(errorElement);
        }
    }
    
    function openImageModal(imageUrl) {
        galleryModalImage.src = imageUrl;
        galleryImageModal.classList.add('active');
    }
    
    function closeImageModal() {
        galleryImageModal.classList.remove('active');
        setTimeout(() => {
            galleryModalImage.src = '';
        }, 400);
    }
    
    // Event listeners
    galleryTriggerBtn.addEventListener('click', openGallery);
    galleryCloseBtn.addEventListener('click', closeGallery);
    galleryDrawerOverlay.addEventListener('click', closeGallery);
    galleryModalClose.addEventListener('click', closeImageModal);
    galleryImageModal.addEventListener('click', (e) => {
        if (e.target === galleryImageModal) {
            closeImageModal();
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (galleryImageModal.classList.contains('active')) {
                closeImageModal();
            } else if (galleryDrawer.classList.contains('active')) {
                closeGallery();
            }
        }
    });
    
    // Wire up secondary gallery trigger buttons
    const secondaryGalleryButtons = document.querySelectorAll('.gallery-trigger-secondary');
    secondaryGalleryButtons.forEach(button => {
        button.addEventListener('click', () => {
            hideArrowPermanently(); // Hide arrow when any gallery button is clicked
            openGallery();
        });
    });
}
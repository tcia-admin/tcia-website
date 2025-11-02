
    const urlPrefix = 'https://tcia-admin.github.io/tcia-website/d4pg/d4pg-schedule/js/';
    const schedulefile = 'd4pg-schedule.json';
    const biosfile = 'd4pg-bios-2025.json';
    
    // Global variables
    let conferenceData = null;
    let speakerBiosData = null;

    document.addEventListener('DOMContentLoaded', function() {
        // Load both the schedule and speaker bios files
        Promise.all([
            fetch(urlPrefix + schedulefile).then(response => response.json()),
            fetch(urlPrefix + biosfile).then(response => response.json())
        ])
        .then(([scheduleData, biosData]) => {
            conferenceData = scheduleData;
            speakerBiosData = biosData;
            
            // Initialize with day 1
            loadDaySchedule('day1');
            
            // Initialize the time trackers
            updateCurrentTime();
            updateCurrentEvents();
            
            // Initialize other UI features
            setupFilters();
            setupSidebar();
        })
        .catch(error => {
            // Fallback: try to load just the schedule if bios fail
            fetch(urlPrefix + schedulefile)
                .then(response => response.json())
                .then(data => {
                    conferenceData = data;
                    loadDaySchedule('day1');
                    updateCurrentTime();
                    updateCurrentEvents();
                    setupFilters();
                    setupSidebar();
                });
        });
        
        // Initialize mobile embed handling
        handleMobileEmbed();
        
        // Initialize word cloud
        initializeWordCloud();
        
        // Initialize draggable hero tagline
        initializeDraggableHero();
        
        // Add swipe gesture support for mobile
        if ('ontouchstart' in window) {
            setupSwipeGestures();
        }
        
        // Check if we're on mobile and set initial margin
        const isMobile = window.innerWidth <= 768;
        const scheduleContent = document.querySelector('.schedule-content');
        if (scheduleContent && !isMobile) {
            scheduleContent.style.marginLeft = '60px';
        }
    });

    // Create a cache object to store loaded schedules
    let scheduleCache = {};

    // Modify the loadDaySchedule function to use the cache
    function loadDaySchedule(day) {
        // First, update the day button active state
        document.querySelectorAll('.day-button').forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-day') === day) {
                btn.classList.add('active');
            }
        });
        
        // Show the correct day schedule container
        document.querySelectorAll('.day-schedule').forEach(schedule => {
            schedule.classList.remove('active');
            if (schedule.id === day) {
                schedule.classList.add('active');
            }
        });
        
        // Find the specific day schedule container to load into
        const dayScheduleContainer = document.getElementById(day);
        if (!dayScheduleContainer) return;
        
        // Get the timeline element
        const timeline = dayScheduleContainer.querySelector('.timeline');
        if (!timeline) return;
        
        // Check if we already have events loaded in the timeline
        if (timeline.children.length > 0 && !timeline.querySelector('.loading-indicator') && !timeline.querySelector('.error-indicator')) {
            // Events are already loaded, no need to reload
            // Just update current events highlighting
            updateCurrentEvents();
            return;
        }
        
        // Show loading indicator
        timeline.innerHTML = '<div class="loading-indicator">Loading schedule...</div>';

        // Check if we have cached data for this day
        if (scheduleCache[day]) {
            renderSchedule(scheduleCache[day], day);
            return;
        }

        // If not cached, load from server
        fetch(`${urlPrefix}d4pg-schedule-${day}.json`)
            .then(response => response.json())
            .then(data => {
                // Cache the data
                scheduleCache[day] = data;
                // Render schedule
                renderSchedule(data, day);
            })
            .catch(error => {
                console.error(`Error loading ${day} schedule:`, error);
                if (timeline) {
                    timeline.innerHTML = '<div class="error-indicator">Error loading schedule</div>';
                }
            });
    }

    // Render schedule from JSON data
    function renderSchedule(data, day) {
        const dayScheduleContainer = document.getElementById(day);
        if (!dayScheduleContainer) return;
        
        // Only clear the timeline, preserve the title
        const timeline = dayScheduleContainer.querySelector('.timeline');
        if (!timeline) return;
        
        timeline.innerHTML = '';
        
        // Group events by time blocks to handle concurrent events
        const timeBlocks = groupEventsByTime(data.events);
        
        // Render each time block
        timeBlocks.forEach(timeBlock => {
            if (timeBlock.events.length === 1) {
                // Single event - render normally
                const eventElement = createEventElement(timeBlock.events[0]);
                timeline.appendChild(eventElement);
            } else {
                // Multiple concurrent events - render as grouped
                const groupElement = createConcurrentEventsGroup(timeBlock);
                timeline.appendChild(groupElement);
            }
        });
        
        // Update event details toggle functionality
        setupEventToggles();
        
        // Update current events
        updateCurrentEvents();
        
        // Apply current filters to newly loaded events
        if (window.updateEventVisibility) {
            window.updateEventVisibility();
        }
    }

    // Group events by time blocks to identify concurrent events
    function groupEventsByTime(events) {
        const timeBlocks = [];
        
        events.forEach(event => {
            const timeKey = `${event.startTime}-${event.endTime}`;
            
            // Find existing time block
            let existingBlock = timeBlocks.find(block => 
                block.startTime === event.startTime && 
                block.endTime === event.endTime
            );
            
            if (existingBlock) {
                // Add to existing time block
                existingBlock.events.push(event);
            } else {
                // Create new time block
                timeBlocks.push({
                    startTime: event.startTime,
                    endTime: event.endTime,
                    events: [event]
                });
            }
        });
        
        return timeBlocks;
    }

    // Create concurrent events group element
    function createConcurrentEventsGroup(timeBlock) {
        const groupElement = document.createElement('div');
        groupElement.className = 'event-block concurrent-events';
        groupElement.setAttribute('data-start', timeBlock.startTime);
        groupElement.setAttribute('data-end', timeBlock.endTime);
        
        // Determine if this is a workshop block or mixed event block
        const allWorkshops = timeBlock.events.every(event => event.type === 'workshop');
        const eventTypes = [...new Set(timeBlock.events.map(event => event.type))];
        
        // Set data attributes for filtering
        groupElement.setAttribute('data-type', eventTypes.join(','));
        const locations = timeBlock.events.map(event => event.location.toLowerCase().replace(/ /g, '-'));
        groupElement.setAttribute('data-location', locations.join(','));
        
        // Event time - use formatted time display
        const eventTime = createFormattedTimeDisplay(timeBlock.startTime, timeBlock.endTime);
        groupElement.appendChild(eventTime);
        
        // Event content container
        const eventContent = document.createElement('div');
        eventContent.className = 'event-content';
        
        // Header for concurrent events
        const header = document.createElement('div');
        header.className = 'concurrent-events-header';
        
        if (allWorkshops && timeBlock.events.length > 1) {
            header.textContent = 'Concurrent Workshops';
        } else {
            header.textContent = 'Concurrent Events';
        }
        
        eventContent.appendChild(header);
        
        if (allWorkshops && timeBlock.events.length > 1) {
            // Create workshop carousel
            const workshopCarousel = createWorkshopCarousel(timeBlock.events);
            eventContent.appendChild(workshopCarousel);
        } else {
            // Create regular concurrent events container
            const container = document.createElement('div');
            container.className = 'concurrent-events-container';
            
            timeBlock.events.forEach(event => {
                const eventElement = createSimpleEventElement(event);
                container.appendChild(eventElement);
            });
            
            eventContent.appendChild(container);
        }
        
        groupElement.appendChild(eventContent);
        return groupElement;
    }

    // Create workshop carousel for concurrent workshops
    function createWorkshopCarousel(workshops) {
        const carouselContainer = document.createElement('div');
        carouselContainer.className = 'workshop-carousel-container';
        
        // Create carousel wrapper
        const carousel = document.createElement('div');
        carousel.className = 'workshop-carousel';
        
        // Create slides container
        const slidesContainer = document.createElement('div');
        slidesContainer.className = 'workshop-slides';
        
        // Create slides
        workshops.forEach((workshop, index) => {
            const slide = document.createElement('div');
            slide.className = 'workshop-slide';
            
            const workshopCard = createWorkshopCard(workshop);
            slide.appendChild(workshopCard);
            slidesContainer.appendChild(slide);
        });
        
        carousel.appendChild(slidesContainer);
        carouselContainer.appendChild(carousel);
        
        // Create navigation
        const nav = document.createElement('div');
        nav.className = 'workshop-nav';
        
        // Previous button
        const prevBtn = document.createElement('button');
        prevBtn.className = 'workshop-nav-btn prev-btn';
        prevBtn.innerHTML = '‹';
        prevBtn.setAttribute('aria-label', 'Previous workshop');
        
        // Next button
        const nextBtn = document.createElement('button');
        nextBtn.className = 'workshop-nav-btn next-btn';
        nextBtn.innerHTML = '›';
        nextBtn.setAttribute('aria-label', 'Next workshop');
        
        // Indicators
        const indicators = document.createElement('div');
        indicators.className = 'workshop-indicators';
        
        for (let i = 0; i < workshops.length; i++) {
            const indicator = document.createElement('div');
            indicator.className = `workshop-indicator ${i === 0 ? 'active' : ''}`;
            indicator.setAttribute('data-slide', i);
            indicators.appendChild(indicator);
        }
        
        // Counter
        const counter = document.createElement('div');
        counter.className = 'workshop-counter';
        counter.textContent = `1 / ${workshops.length}`;
        
        nav.appendChild(prevBtn);
        nav.appendChild(indicators);
        nav.appendChild(counter);
        nav.appendChild(nextBtn);
        
        carouselContainer.appendChild(nav);
        
        // Initialize carousel functionality
        initializeCarousel(carouselContainer, workshops.length);
        
        return carouselContainer;
    }

    // Create workshop card for concurrent workshops
    function createWorkshopCard(workshop) {
        const card = document.createElement('div');
        card.className = 'workshop-card';
        card.setAttribute('data-type', workshop.type);
        card.setAttribute('data-location', workshop.location.toLowerCase().replace(/ /g, '-'));
        
        // Workshop title
        const title = document.createElement('h4');
        title.className = 'event-title';
        title.textContent = workshop.title;
        card.appendChild(title);
        
        // Workshop location
        const location = document.createElement('div');
        location.className = 'event-location';
        location.textContent = workshop.location;
        card.appendChild(location);
        
        // Workshop description
        const description = document.createElement('div');
        description.className = 'event-description';
        description.innerHTML = workshop.description;
        card.appendChild(description);
        
        // Workshop facilitator(s)
        if (workshop.people && workshop.people.speakers) {
            workshop.people.speakers.forEach(speaker => {
                const facilitator = document.createElement('div');
                facilitator.className = 'workshop-facilitator';
                
                // Check if this speaker has info in the bios data
                const speakerInfo = findSpeakerInfo(speaker.name);
                
                if (speakerInfo && speakerInfo.photo) {
                    // Add special class for speakers with photos
                    facilitator.classList.add('speaker-name-with-photo');
                    facilitator.textContent = speaker.name;
                    if (speaker.title) {
                        facilitator.textContent += ` (${speaker.title})`;
                    }
                    
                    // Create and append the photo modal
                    const photoModal = createSpeakerPhotoModal(speakerInfo);
                    facilitator.appendChild(photoModal);
                } else {
                    // Regular facilitator name without photo
                    facilitator.textContent = speaker.name;
                    if (speaker.title) {
                        facilitator.textContent += ` (${speaker.title})`;
                    }
                }
                
                card.appendChild(facilitator);
            });
        }
        
        // Workshop tags
        if (workshop.tags && workshop.tags.length > 0) {
            const tagsContainer = document.createElement('div');
            tagsContainer.className = 'tags';
            
            workshop.tags.forEach(tag => {
                const tagElement = document.createElement('span');
                tagElement.className = 'tag';
                tagElement.textContent = tag;
                tagsContainer.appendChild(tagElement);
            });
            
            card.appendChild(tagsContainer);
        }
        
        return card;
    }

    // Initialize carousel functionality
    function initializeCarousel(carouselContainer, totalSlides) {
        let currentSlide = 0;
        const slidesContainer = carouselContainer.querySelector('.workshop-slides');
        const prevBtn = carouselContainer.querySelector('.prev-btn');
        const nextBtn = carouselContainer.querySelector('.next-btn');
        const indicators = carouselContainer.querySelectorAll('.workshop-indicator');
        const counter = carouselContainer.querySelector('.workshop-counter');
        
        function updateCarousel() {
            // Update slides position
            const translateX = -currentSlide * 100;
            slidesContainer.style.transform = `translateX(${translateX}%)`;
            
            // Update indicators
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentSlide);
            });
            
            // Update counter
            counter.textContent = `${currentSlide + 1} / ${totalSlides}`;
            
            // Update button states
            prevBtn.disabled = currentSlide === 0;
            nextBtn.disabled = currentSlide === totalSlides - 1;
        }
        
        function goToSlide(slideIndex) {
            currentSlide = Math.max(0, Math.min(slideIndex, totalSlides - 1));
            updateCarousel();
        }
        
        // Previous button
        prevBtn.addEventListener('click', () => {
            if (currentSlide > 0) {
                goToSlide(currentSlide - 1);
            }
        });
        
        // Next button
        nextBtn.addEventListener('click', () => {
            if (currentSlide < totalSlides - 1) {
                goToSlide(currentSlide + 1);
            }
        });
        
        // Indicator clicks
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                goToSlide(index);
            });
        });
        
        // Keyboard navigation
        carouselContainer.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                prevBtn.click();
            } else if (e.key === 'ArrowRight') {
                nextBtn.click();
            }
        });
        
        // Initialize
        updateCarousel();
        
        // Auto-advance carousel every 15 seconds (slower for better UX)
        let autoAdvanceInterval;
        let isPaused = false;
        
        function startAutoAdvance() {
            if (isPaused) return; // Don't start if paused
            stopAutoAdvance(); // Clear any existing interval
            autoAdvanceInterval = setInterval(() => {
                if (isPaused) return; // Double-check pause state
                if (currentSlide < totalSlides - 1) {
                    goToSlide(currentSlide + 1);
                } else {
                    goToSlide(0); // Loop back to start
                }
            }, 15000); // Increased from 8000 to 15000 (15 seconds)
        }
        
        function stopAutoAdvance() {
            if (autoAdvanceInterval) {
                clearInterval(autoAdvanceInterval);
                autoAdvanceInterval = null;
            }
        }
        
        function pauseAutoAdvance() {
            isPaused = true;
            stopAutoAdvance();
        }
        
        function resumeAutoAdvance() {
            isPaused = false;
            startAutoAdvance();
        }
        
        // Start auto-advance
        startAutoAdvance();
        
        // Pause auto-advance on hover with improved detection
        carouselContainer.addEventListener('mouseenter', pauseAutoAdvance);
        carouselContainer.addEventListener('mouseleave', resumeAutoAdvance);
        
        // Pause auto-advance on focus
        carouselContainer.addEventListener('focusin', pauseAutoAdvance);
        carouselContainer.addEventListener('focusout', resumeAutoAdvance);
        
        // Also pause when user interacts with navigation
        prevBtn.addEventListener('click', () => {
            pauseAutoAdvance();
            // Resume after a longer delay when user manually navigates
            setTimeout(resumeAutoAdvance, 20000); // 20 second delay after manual navigation
        });
        
        nextBtn.addEventListener('click', () => {
            pauseAutoAdvance();
            // Resume after a longer delay when user manually navigates
            setTimeout(resumeAutoAdvance, 20000); // 20 second delay after manual navigation
        });
        
        // Pause when clicking indicators
        indicators.forEach(indicator => {
            indicator.addEventListener('click', () => {
                pauseAutoAdvance();
                setTimeout(resumeAutoAdvance, 20000); // 20 second delay after manual navigation
            });
        });
    }

    // Create simplified event element for concurrent non-workshop events
    function createSimpleEventElement(event) {
        const eventElement = document.createElement('div');
        eventElement.className = `event-block ${event.type}`;
        eventElement.setAttribute('data-type', event.type);
        eventElement.setAttribute('data-location', event.location.toLowerCase().replace(/ /g, '-'));
        
        // Event title
        const title = document.createElement('h4');
        title.className = 'event-title';
        title.textContent = event.title;
        eventElement.appendChild(title);
        
        // Event location
        const location = document.createElement('div');
        location.className = 'event-location';
        location.textContent = event.location;
        eventElement.appendChild(location);
        
        // Event description
        const description = document.createElement('div');
        description.className = 'event-description';
        description.innerHTML = event.description;
        eventElement.appendChild(description);
        
        // Event speakers/people - add this to simple events too
        addEventPeople(eventElement, event);
        
        return eventElement;
    }

    // Helper function to convert 24-hour time to 12-hour format
    function formatTimeTo12Hour(time24) {
        if (!time24) return time24;
        
        // Handle different time formats (HH:MM, H:MM, etc.)
        const timeRegex = /^(\d{1,2}):(\d{2})$/;
        const match = time24.match(timeRegex);
        
        if (!match) return time24; // Return original if format doesn't match
        
        let hours = parseInt(match[1], 10);
        const minutes = match[2];
        const ampm = hours >= 12 ? 'PM' : 'AM';
        
        // Convert to 12-hour format
        if (hours === 0) {
            hours = 12; // Midnight
        } else if (hours > 12) {
            hours = hours - 12;
        }
        
        return `${hours}:${minutes} ${ampm}`;
    }

    // Helper function to create formatted time display
    function createFormattedTimeDisplay(startTime, endTime) {
        const startFormatted = formatTimeTo12Hour(startTime);
        const endFormatted = formatTimeTo12Hour(endTime);
        
        const timeContainer = document.createElement('div');
        timeContainer.className = 'event-time';
        
        const startSpan = document.createElement('div');
        startSpan.className = 'time-start';
        startSpan.textContent = startFormatted;
        
        const separator = document.createElement('div');
        separator.className = 'time-separator';
        separator.textContent = '—';
        
        const endSpan = document.createElement('div');
        endSpan.className = 'time-end';
        endSpan.textContent = endFormatted;
        
        timeContainer.appendChild(startSpan);
        timeContainer.appendChild(separator);
        timeContainer.appendChild(endSpan);
        
        return timeContainer;
    }

    // Helper function to find speaker info from bios data
    function findSpeakerInfo(speakerName) {
        if (!speakerBiosData || !speakerBiosData.speakers) {
            return null;
        }
        
        // Clean up the speaker name for matching
        const cleanName = speakerName.trim().toLowerCase();
        
        // Find matching speaker in bios data
        const speaker = speakerBiosData.speakers.find(s => {
            const bioName = s.name.toLowerCase();
            // Try exact match first
            if (bioName === cleanName) return true;
            
            // Try partial matches (handles titles, middle names, etc.)
            const nameWords = cleanName.split(/\s+/);
            const bioWords = bioName.split(/\s+/);
            
            // Check if all significant words from speaker name appear in bio name
            const significantWords = nameWords.filter(word => 
                word.length > 2 && 
                !['dr.', 'dr', 'prof.', 'prof', 'ms.', 'ms', 'mr.', 'mr', 'phd', 'ph.d.'].includes(word)
            );
            
            return significantWords.every(word => 
                bioWords.some(bioWord => bioWord.includes(word) || word.includes(bioWord))
            );
        });
        
        return speaker ? {
            photo: speaker.photo,
            title: speaker.title,
            name: speaker.name
        } : null;
    }

    // Helper function to create speaker photo modal
    function createSpeakerPhotoModal(speakerInfo) {
        const modal = document.createElement('div');
        modal.className = 'speaker-photo-modal';
        
        // Create photo container
        const photoContainer = document.createElement('div');
        photoContainer.className = 'speaker-photo-container';
        
        const img = document.createElement('img');
        img.src = speakerInfo.photo;
        img.alt = `Photo of ${speakerInfo.name}`;
        img.loading = 'lazy'; // Lazy load for performance
        
        // Handle image load errors
        img.onerror = function() {
            modal.style.display = 'none';
        };
        
        photoContainer.appendChild(img);
        modal.appendChild(photoContainer);
        
        // Create speaker info section
        const speakerInfoDiv = document.createElement('div');
        speakerInfoDiv.className = 'speaker-info';
        
        // Speaker name
        const nameDiv = document.createElement('div');
        nameDiv.className = 'speaker-modal-name';
        nameDiv.textContent = speakerInfo.name;
        speakerInfoDiv.appendChild(nameDiv);
        
        // Speaker title
        if (speakerInfo.title) {
            const titleDiv = document.createElement('div');
            titleDiv.className = 'speaker-modal-title';
            titleDiv.textContent = speakerInfo.title;
            speakerInfoDiv.appendChild(titleDiv);
        }
        
        modal.appendChild(speakerInfoDiv);
        return modal;
    }

    // Helper function to add speakers/people to any event element
    function addEventPeople(eventElement, event) {
        // Handle different people data structures
        let peopleArray = [];
        
        if (event.people) {
            if (Array.isArray(event.people)) {
                // Direct array of people
                peopleArray = event.people;
            } else if (event.people.speakers) {
                // Nested speakers array (like workshops)
                peopleArray = event.people.speakers.map(speaker => ({
                    name: speaker.name,
                    role: speaker.title || speaker.role || 'Speaker'
                }));
            } else if (event.people.moderator) {
                // Has moderator
                peopleArray.push({
                    name: event.people.moderator.name,
                    role: event.people.moderator.title || event.people.moderator.role || 'Moderator'
                });
            }
            
            // Add panelists if they exist
            if (event.people.panelists && Array.isArray(event.people.panelists)) {
                event.people.panelists.forEach(panelist => {
                    peopleArray.push({
                        name: panelist.name,
                        role: panelist.title || panelist.role || 'Panelist'
                    });
                });
            }
        }
        
        // Handle speakers property directly (alternative structure)
        if (event.speakers && Array.isArray(event.speakers)) {
            event.speakers.forEach(speaker => {
                peopleArray.push({
                    name: speaker.name,
                    role: speaker.title || speaker.role || 'Speaker'
                });
            });
        }
        
        // Handle moderator property directly
        if (event.moderator) {
            peopleArray.push({
                name: event.moderator.name,
                role: event.moderator.title || event.moderator.role || 'Moderator'
            });
        }
        
        // Add panelists property directly
        if (event.panelists && Array.isArray(event.panelists)) {
            event.panelists.forEach(panelist => {
                peopleArray.push({
                    name: panelist.name,
                    role: panelist.title || panelist.role || 'Panelist'
                });
            });
        }
        
        // Create the people section if we have people to display
        if (peopleArray.length > 0) {
            const eventPeople = document.createElement('div');
            eventPeople.className = 'event-people';
            
            // Check if this is a panel with multiple speakers
            const isPanel = event.type === 'panel' && peopleArray.length > 1;
            
            if (isPanel) {
                // For panels, treat first person as moderator and rest as panelists
                const moderator = peopleArray[0];
                const panelists = peopleArray.slice(1);
                
                // Create moderator section
                const moderatorSection = document.createElement('div');
                moderatorSection.className = 'panel-moderator-section';
                
                const moderatorLabel = document.createElement('div');
                moderatorLabel.className = 'panel-moderator-label';
                moderatorLabel.textContent = 'Moderator';
                moderatorSection.appendChild(moderatorLabel);
                
                const moderatorName = createPersonNameElement(moderator);
                moderatorName.classList.add('panel-moderator-name');
                moderatorSection.appendChild(moderatorName);
                
                eventPeople.appendChild(moderatorSection);
                
                // Create panelists section
                if (panelists.length > 0) {
                    const panelistsSection = document.createElement('div');
                    panelistsSection.className = 'panel-panelists-section';
                    
                    const panelistsLabel = document.createElement('div');
                    panelistsLabel.className = 'panel-panelists-label';
                    panelistsLabel.textContent = `Panelists (${panelists.length})`;
                    panelistsSection.appendChild(panelistsLabel);
                    
                    const panelistsList = document.createElement('div');
                    panelistsList.className = 'panel-panelists-list';
                    
                    panelists.forEach(panelist => {
                        const panelistName = createPersonNameElement(panelist);
                        panelistName.classList.add('panel-panelist-name');
                        panelistsList.appendChild(panelistName);
                    });
                    
                    panelistsSection.appendChild(panelistsList);
                    eventPeople.appendChild(panelistsSection);
                }
            } else {
                // Regular event - use existing layout
                peopleArray.forEach(person => {
                    const personElement = document.createElement('div');
                    personElement.className = 'event-person';
                    
                    const personName = createPersonNameElement(person);
                    personElement.appendChild(personName);
                    
                    if (person.role) {
                        const personRole = document.createElement('div');
                        personRole.className = 'event-person-role';
                        personRole.textContent = person.role;
                        personElement.appendChild(personRole);
                    }
                    
                    eventPeople.appendChild(personElement);
                });
            }
            
            eventElement.appendChild(eventPeople);
        }
    }

    // Helper function to create person name element with photo modal
    function createPersonNameElement(person) {
        const personName = document.createElement('div');
        personName.className = 'event-person-name';
        
        // Check if this speaker has info in the bios data
        const speakerInfo = findSpeakerInfo(person.name);
        
        if (speakerInfo && speakerInfo.photo) {
            // Add special class for speakers with photos
            personName.classList.add('speaker-name-with-photo');
            personName.textContent = person.name;
            
            // Create and append the photo modal
            const photoModal = createSpeakerPhotoModal(speakerInfo);
            personName.appendChild(photoModal);
        } else {
            // Regular speaker name without photo
            personName.textContent = person.name;
        }
        
        return personName;
    }

    // Create event element from JSON data
    function createEventElement(event) {
        const eventElement = document.createElement('div');
        eventElement.className = `event-block ${event.type}`;
        eventElement.setAttribute('data-type', event.type);
        eventElement.setAttribute('data-start', event.startTime);
        eventElement.setAttribute('data-end', event.endTime);
        
        // Add location data attribute
        const locationKey = event.location.toLowerCase().replace(/ /g, '-');
        eventElement.setAttribute('data-location', locationKey);
        
        // Create event content
        const eventContent = document.createElement('div');
        eventContent.className = 'event-content';
        
        // Event title
        const eventTitle = document.createElement('h3');
        eventTitle.className = 'event-title';
        eventTitle.textContent = event.title;
        eventContent.appendChild(eventTitle);
        
        // Event time - use formatted time display
        const eventTime = createFormattedTimeDisplay(event.startTime, event.endTime);
        eventElement.appendChild(eventTime);
        
        // Event location
        const eventLocation = document.createElement('div');
        eventLocation.className = 'event-location';
        eventLocation.textContent = event.location;
        eventContent.appendChild(eventLocation);
        
        // Event description
        const eventDescription = document.createElement('div');
        eventDescription.className = 'event-description';
        eventDescription.innerHTML = event.description;
        eventContent.appendChild(eventDescription);
        
        // Event people - use the helper function for consistent speaker display
        addEventPeople(eventContent, event);
        
        // Event tags
        if (event.tags && event.tags.length > 0) {
            const eventTags = document.createElement('div');
            eventTags.className = 'event-tags';
            
            event.tags.forEach(tag => {
                const tagElement = document.createElement('span');
                tagElement.className = 'event-tag';
                tagElement.textContent = tag;
                eventTags.appendChild(tagElement);
            });
            
            eventContent.appendChild(eventTags);
        }
        
        // Event details toggle - only show if there are details
        if (event.details && event.details.trim() !== '') {
            const eventDetailsToggle = document.createElement('button');
            eventDetailsToggle.className = 'event-details-toggle';
            eventDetailsToggle.textContent = 'Show Details';
            eventContent.appendChild(eventDetailsToggle);
            
            // Event details
            const eventDetails = document.createElement('div');
            eventDetails.className = 'event-details';
            eventDetails.innerHTML = event.details;
            eventContent.appendChild(eventDetails);
        }
        
        eventElement.appendChild(eventContent);
        
        return eventElement;
    }

    // Setup filters
    function setupFilters() {
        let activeTypeFilters = ['all'];
        let activeLocationFilters = ['all'];
        
        // Function to update visibility based on both filters
        function updateEventVisibility() {
            // Get current events - must do this every time to ensure we get all current events
            const eventBlocks = document.querySelectorAll('.event-block');
            let visibleCount = 0;
            
            // Get the active day timeline to add "no events" message if needed
            const activeTimeline = document.querySelector('.day-schedule.active .timeline');
            
            // Remove any existing "no events" message
            const existingMessage = document.querySelector('.no-events-message');
            if (existingMessage) {
                existingMessage.remove();
            }
            
            eventBlocks.forEach(event => {
                const eventType = event.getAttribute('data-type');
                const eventLocation = event.getAttribute('data-location');
                
                // Handle multiple types/locations for concurrent events
                const eventTypes = eventType ? eventType.split(',') : [];
                const eventLocations = eventLocation ? eventLocation.split(',') : [];
                
                // Check if any type matches any of the active type filters
                const typeMatches = activeTypeFilters.includes('all') || 
                    eventTypes.some(type => activeTypeFilters.includes(type));
                
                // Check if any location matches any of the active location filters
                const locationMatches = activeLocationFilters.includes('all') || 
                    eventLocations.some(location => activeLocationFilters.includes(location));
                
                // Special handling for concurrent events
                if (event.classList.contains('concurrent-events')) {
                    // For concurrent events, also check individual workshop cards
                    const workshopCards = event.querySelectorAll('.workshop-card');
                    let hasVisibleWorkshops = false;
                    
                    workshopCards.forEach(card => {
                        const cardType = card.getAttribute('data-type');
                        const cardLocation = card.getAttribute('data-location');
                        
                        const cardTypeMatches = activeTypeFilters.includes('all') || activeTypeFilters.includes(cardType);
                        const cardLocationMatches = activeLocationFilters.includes('all') || activeLocationFilters.includes(cardLocation);
                        
                        if (cardTypeMatches && cardLocationMatches) {
                            card.style.display = 'block';
                            hasVisibleWorkshops = true;
                        } else {
                            card.style.display = 'none';
                        }
                    });
                    
                    // Show the concurrent events container if any workshops are visible or if it matches filters
                    if (hasVisibleWorkshops || (typeMatches && locationMatches)) {
                        event.style.display = 'block';
                        visibleCount++;
                    } else {
                        event.style.display = 'none';
                    }
                } else {
                    // Regular single events
                    if (typeMatches && locationMatches) {
                        event.style.display = 'block';
                        visibleCount++;
                    } else {
                        event.style.display = 'none';
                    }
                }
            });
            
            // If no events are visible, show message
            if (visibleCount === 0 && activeTimeline) {
                const noEventsMessage = document.createElement('div');
                noEventsMessage.className = 'no-events-message';
                noEventsMessage.textContent = 'No events found matching your filters';
                noEventsMessage.style.textAlign = 'center';
                noEventsMessage.style.padding = 'var(--spacing-xl)';
                noEventsMessage.style.color = 'var(--d4pg-navy)';
                noEventsMessage.style.fontWeight = 'bold';
                activeTimeline.appendChild(noEventsMessage);
            }
        }
        
        // Handle sidebar checkboxes for event types
        const sidebarTypeCheckboxes = document.querySelectorAll('.sidebar-filter-checkbox[data-filter]');
        sidebarTypeCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const filter = this.getAttribute('data-filter');
                
                if (filter === 'all') {
                    // If "All Events" is checked, uncheck all others
                    if (this.checked) {
                        sidebarTypeCheckboxes.forEach(cb => {
                            if (cb.getAttribute('data-filter') !== 'all') {
                                cb.checked = false;
                            }
                        });
                        activeTypeFilters = ['all'];
                    } else {
                        // If "All Events" is unchecked with nothing else checked, re-check it
                        let anyChecked = false;
                        sidebarTypeCheckboxes.forEach(cb => {
                            if (cb.checked) anyChecked = true;
                        });
                        
                        if (!anyChecked) {
                            this.checked = true;
                            activeTypeFilters = ['all'];
                        }
                    }
                } else {
                    // If a specific type is checked
                    if (this.checked) {
                        // Uncheck "All Events"
                        const allCheckbox = document.querySelector('#sidebar-all');
                        if (allCheckbox) allCheckbox.checked = false;
                        
                        // Remove 'all' from filters if it exists
                        activeTypeFilters = activeTypeFilters.filter(f => f !== 'all');
                        
                        // Add this filter if not already included
                        if (!activeTypeFilters.includes(filter)) {
                            activeTypeFilters.push(filter);
                        }
                    } else {
                        // Remove this filter
                        activeTypeFilters = activeTypeFilters.filter(f => f !== filter);
                        
                        // If no specific types are checked, revert to "All Events"
                        if (activeTypeFilters.length === 0) {
                            const allCheckbox = document.querySelector('#sidebar-all');
                            if (allCheckbox) {
                                allCheckbox.checked = true;
                                activeTypeFilters = ['all'];
                            }
                        }
                    }
                }
                
                // Update event visibility based on new filter settings
                updateEventVisibility();
                // Update the filter pills
                updateActiveFilterPills();
            });
        });
        
        // Handle sidebar checkboxes for locations (similar logic)
        const sidebarLocationCheckboxes = document.querySelectorAll('.sidebar-filter-checkbox[data-filter-location]');
        sidebarLocationCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const filter = this.getAttribute('data-filter-location');
                
                if (filter === 'all') {
                    // If "All Locations" is checked, uncheck all others
                    if (this.checked) {
                        sidebarLocationCheckboxes.forEach(cb => {
                            if (cb.getAttribute('data-filter-location') !== 'all') {
                                cb.checked = false;
                            }
                        });
                        activeLocationFilters = ['all'];
                    } else {
                        // If "All Locations" is unchecked with nothing else checked, re-check it
                        let anyChecked = false;
                        sidebarLocationCheckboxes.forEach(cb => {
                            if (cb.checked) anyChecked = true;
                        });
                        
                        if (!anyChecked) {
                            this.checked = true;
                            activeLocationFilters = ['all'];
                        }
                    }
                } else {
                    // If a specific location is checked
                    if (this.checked) {
                        // Uncheck "All Locations"
                        const allCheckbox = document.querySelector('#sidebar-loc-all');
                        if (allCheckbox) allCheckbox.checked = false;
                        
                        // Remove 'all' from filters if it exists
                        activeLocationFilters = activeLocationFilters.filter(f => f !== 'all');
                        
                        // Add this filter if not already included
                        if (!activeLocationFilters.includes(filter)) {
                            activeLocationFilters.push(filter);
                        }
                    } else {
                        // Remove this filter
                        activeLocationFilters = activeLocationFilters.filter(f => f !== filter);
                        
                        // If no specific locations are checked, revert to "All Locations"
                        if (activeLocationFilters.length === 0) {
                            const allCheckbox = document.querySelector('#sidebar-loc-all');
                            if (allCheckbox) {
                                allCheckbox.checked = true;
                                activeLocationFilters = ['all'];
                            }
                        }
                    }
                }
                
                // Update event visibility based on new filter settings
                updateEventVisibility();
                // Update the filter pills
                updateActiveFilterPills();
            });
        });
        
        // Ensure "All Events" and "All Locations" are checked by default
        const allEventsCheckbox = document.querySelector('#sidebar-all');
        const allLocationsCheckbox = document.querySelector('#sidebar-loc-all');
        
        if (allEventsCheckbox) allEventsCheckbox.checked = true;
        if (allLocationsCheckbox) allLocationsCheckbox.checked = true;
        
        // Make global update function available
        window.updateEventVisibility = updateEventVisibility;
    }

    // Update sidebar functionality for better mobile experience
    function setupSidebar() {
        const filterSidebar = document.querySelector('.filter-sidebar');
        const mainContent = document.querySelector('.main-content');
        const sidebarCloseBtn = document.querySelector('.sidebar-close');
        
        // Remove existing close button if it exists
        if (sidebarCloseBtn) {
            sidebarCloseBtn.remove();
        }
        
        // Create mobile overlay for when sidebar is open
        const mobileOverlay = document.createElement('div');
        mobileOverlay.className = 'mobile-overlay';
        document.body.appendChild(mobileOverlay);
        
        // Create mini sidebar
        const miniSidebar = document.createElement('div');
        miniSidebar.className = 'mini-sidebar';
        
        // Create toggle button for mini sidebar with hamburger icon
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'mini-sidebar-toggle';
        toggleBtn.innerHTML = '<i class="fa-solid fa-bars"></i>'; // Initial hamburger icon
        toggleBtn.setAttribute('aria-label', 'Toggle filters');
        
        // Add toggle button to mini sidebar
        miniSidebar.appendChild(toggleBtn);
        
        // Add mini sidebar to document
        document.body.appendChild(miniSidebar);
        
        // Check if this is a mobile device
        const isMobile = window.innerWidth <= 768;
        
        // Toggle button click handler
        toggleBtn.addEventListener('click', function() {
            if (filterSidebar.classList.contains('open')) {
                // Close the sidebar
                closeSidebar();
            } else {
                // Open the sidebar
                openSidebar();
            }
        });

        // Function to open sidebar
        function openSidebar() {
            filterSidebar.classList.add('open');
            
            // Only add margin on desktop
            if (!isMobile) {
                const scheduleContent = document.querySelector('.schedule-content');
                if (scheduleContent) {
                    scheduleContent.style.marginLeft = '340px'; // Account for both sidebars
                }
                mainContent.classList.add('sidebar-open');
            } else {
                // On mobile, show the overlay
                mobileOverlay.classList.add('active');
            }
            
            // Change icon to X mark
            toggleBtn.innerHTML = '<i class="fa-solid fa-circle-xmark"></i>';
        }
        
        // Function to close sidebar
        function closeSidebar() {
            filterSidebar.classList.remove('open');
            mainContent.classList.remove('sidebar-open');
            
            const scheduleContent = document.querySelector('.schedule-content');
            if (scheduleContent) {
                // Don't override the !important CSS rule on mobile
                if (!isMobile) {
                    scheduleContent.style.marginLeft = '60px';
                }
            }
            
            // Hide overlay
            mobileOverlay.classList.remove('active');
            
            // Change icon back to hamburger bars
            toggleBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
        }
        
        // Click on overlay should close the sidebar
        mobileOverlay.addEventListener('click', closeSidebar);
        
        // Handle window resize
        window.addEventListener('resize', function() {
            const newIsMobile = window.innerWidth <= 768;
            
            // If switching between mobile and desktop, close the sidebar to avoid layout issues
            if (newIsMobile !== isMobile && filterSidebar.classList.contains('open')) {
                closeSidebar();
            }
            
            // Update mobile status
            isMobile = newIsMobile;
        });

        // Update active filter pills in sidebar
        updateActiveFilterPills();

        // Add scroll handling for dynamic sidebar positioning
        window.addEventListener('scroll', handleScroll);
        
        // Call the scroll handler once on page load to set initial positions
        window.dispatchEvent(new Event('scroll'));
    }

    // Update handleScroll to handle mobile devices better
    function handleScroll() {
        const timeTracker = document.querySelector('.time-tracker');
        const filterSidebar = document.querySelector('.filter-sidebar');
        const miniSidebar = document.querySelector('.mini-sidebar');
        
        if (!timeTracker) return;
        
        // Get time tracker position info
        const timeTrackerRect = timeTracker.getBoundingClientRect();
        const trackerHeight = timeTrackerRect.height;
        
        // Set the custom property for sidebar positioning
        document.documentElement.style.setProperty('--tracker-height', trackerHeight + 'px');
        
        // Position sidebars relative to time tracker
        if (timeTrackerRect.bottom <= 0) {
            // Time tracker is scrolled off the top
            if (filterSidebar) filterSidebar.style.top = '0';
            if (miniSidebar) miniSidebar.style.top = '0';
        } else {
            // Position sidebars just below time tracker
            if (filterSidebar) filterSidebar.style.top = timeTrackerRect.bottom + 'px';
            if (miniSidebar) miniSidebar.style.top = timeTrackerRect.bottom + 'px';
        }
    }


    // Add swipe gestures for mobile
    function setupSwipeGestures() {
        const content = document.querySelector('.main-content');
        const filterSidebar = document.querySelector('.filter-sidebar');
        let touchStartX = 0;
        let touchEndX = 0;
        
        content.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, false);
        
        content.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, false);
        
        function handleSwipe() {
            const swipeDistance = touchEndX - touchStartX;
            
            // If it's a significant swipe from left to right when sidebar is closed
            if (swipeDistance > 70 && !filterSidebar.classList.contains('open')) {
                // Find the toggle button and trigger a click
                const toggleBtn = document.querySelector('.mini-sidebar-toggle');
                if (toggleBtn) toggleBtn.click();
            }
            
            // If it's a significant swipe from right to left when sidebar is open
            if (swipeDistance < -70 && filterSidebar.classList.contains('open')) {
                // Find the toggle button and trigger a click
                const toggleBtn = document.querySelector('.mini-sidebar-toggle');
                if (toggleBtn) toggleBtn.click();
            }
        }
    }


    // Update active filter pills in sidebar
    function updateActiveFilterPills() {
        const pillsContainer = document.querySelector('.active-filter-pills');
        if (!pillsContainer) return;
        
        pillsContainer.innerHTML = '';
        
        // Add type filters
        const sidebarTypeCheckboxes = document.querySelectorAll('.sidebar-filter-checkbox[data-filter]');
        sidebarTypeCheckboxes.forEach(checkbox => {
            if (checkbox.checked && checkbox.getAttribute('data-filter') !== 'all') {
                const label = checkbox.nextElementSibling.textContent;
                
                addFilterPill(label, function() {
                    // Clear this filter
                    checkbox.checked = false;
                    document.querySelector('#sidebar-all').checked = true;
                    document.querySelector('[data-filter="all"]').click();
                    updateActiveFilterPills();
                });
            }
        });
        
        // Add location filters
        const sidebarLocationCheckboxes = document.querySelectorAll('.sidebar-filter-checkbox[data-filter-location]');
        sidebarLocationCheckboxes.forEach(checkbox => {
            if (checkbox.checked && checkbox.getAttribute('data-filter-location') !== 'all') {
                const label = checkbox.nextElementSibling.textContent;
                
                addFilterPill(label, function() {
                    // Clear this filter
                    checkbox.checked = false;
                    document.querySelector('#sidebar-loc-all').checked = true;
                    document.querySelector('[data-filter-location="all"]').click();
                    updateActiveFilterPills();
                });
            }
        });
    }

    // Add filter pill to sidebar
    function addFilterPill(label, removeCallback) {
        const pillsContainer = document.querySelector('.active-filter-pills');
        if (!pillsContainer) return;
        
        const pill = document.createElement('div');
        pill.className = 'active-filter-pill';
        pill.innerHTML = `
            ${label}
            <button class="remove-filter" aria-label="Remove filter">×</button>
        `;
        
        pill.querySelector('.remove-filter').addEventListener('click', removeCallback);
        
        pillsContainer.appendChild(pill);
    }



    // Update current time
    function updateCurrentTime() {
        const now = new Date();
        const timeDisplay = document.getElementById('current-time-display');
        
        // Format the time as HH:MM AM/PM
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12; // Convert 0 to 12 for 12 AM
        const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
        
        timeDisplay.textContent = `${formattedHours}:${formattedMinutes} ${ampm}`;
        
        // Call again in 1 minute
        setTimeout(updateCurrentTime, 60000);
    }

    // Update current events
    function updateCurrentEvents() {
        const now = new Date();
        const currentHours = now.getHours();
        const currentMinutes = now.getMinutes();
        const currentTimeInMinutes = currentHours * 60 + currentMinutes;
        
        // For demonstration purposes
        let foundCurrentEvent = false;
        let currentEventTitle = 'No events currently happening';
        let upcomingEventTitle = 'No upcoming events';
        
        // Only check events in the active day
        const activeDay = document.querySelector('.day-schedule.active');
        const events = activeDay.querySelectorAll('.event-block');
        
        // First pass: find current event
        events.forEach(event => {
            // Remove current class from all events
            event.classList.remove('current');
            
            // Parse event times
            const startTime = event.getAttribute('data-start');
            const endTime = event.getAttribute('data-end');
            
            // Convert to minutes for comparison (simple parsing for demo)
            const [startHours, startMinutes] = startTime.split(':').map(num => parseInt(num));
            let startTimeInMinutes = startHours * 60 + startMinutes;
            
            const [endHours, endMinutes] = endTime.split(':').map(num => parseInt(num));
            let endTimeInMinutes = endHours * 60 + endMinutes;
            
            // Handle 24-hour to 12-hour conversion logic for comparison
            // Keep the original 24-hour values for comparison, but we need to handle AM/PM properly
            // For conference times, assume anything before 6 AM is actually PM the day before
            if (startHours < 6) startTimeInMinutes += 12 * 60; 
            if (endHours < 6 || endTimeInMinutes < startTimeInMinutes) endTimeInMinutes += 12 * 60;
            
            // Check if current time is within event time
            if (currentTimeInMinutes >= startTimeInMinutes && currentTimeInMinutes < endTimeInMinutes) {
                event.classList.add('current');
                foundCurrentEvent = true;
                currentEventTitle = event.querySelector('.event-title').textContent;
            }
        });
        
        // Second pass: find upcoming event
        let nextEventStart = Infinity;
        
        events.forEach(event => {
            // Parse event times
            const startTime = event.getAttribute('data-start');
            
            // Convert to minutes for comparison
            const [startHours, startMinutes] = startTime.split(':').map(num => parseInt(num));
            let startTimeInMinutes = startHours * 60 + startMinutes;
            
            // Handle 24-hour format for comparison  
            if (startHours < 6) startTimeInMinutes += 12 * 60;
            
            // Find the next event (closest start time in the future)
            if (startTimeInMinutes > currentTimeInMinutes && startTimeInMinutes < nextEventStart) {
                nextEventStart = startTimeInMinutes;
                upcomingEventTitle = event.querySelector('.event-title').textContent;
            }
        });
        
        // Update happening now text
        document.getElementById('happening-now').textContent = currentEventTitle;
        
        // Update upcoming event text
        document.getElementById('upcoming-event').textContent = upcomingEventTitle;
        
        // Call again in 5 minutes
        setTimeout(updateCurrentEvents, 300000);
    }

    // Add smooth scrolling to anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add event details toggle functionality
    function setupEventToggles() {
        document.querySelectorAll('.event-details-toggle').forEach(toggle => {
            toggle.addEventListener('click', function() {
                this.classList.toggle('active');
                const details = this.nextElementSibling;
                
                if (this.classList.contains('active')) {
                    details.classList.add('active');
                    this.textContent = 'Hide Details';
                } else {
                    details.classList.remove('active');
                    this.textContent = 'Show Details';
                }
            });
        });
    }

    // Day navigation functionality
    const dayButtons = document.querySelectorAll('.day-button');
        
        dayButtons.forEach(button => {
            button.addEventListener('click', function() {
                const targetDay = this.getAttribute('data-day');
                loadDaySchedule(targetDay);
            });
        });

    // Add this to the existing script section, preferably near the end

    // Handle mobile embed on resize
    function handleMobileEmbed() {
        const isMobile = window.innerWidth <= 768;
        const mobileContainer = document.querySelector('.mobile-embed-container');
        const iframe = document.querySelector('.mobile-embed-iframe');
        
        if (isMobile) {
            // Ensure the iframe is properly loaded
            if (iframe && !iframe.src.includes('/ds-mobile-source')) {
                iframe.src = '/ds-mobile-source';
            }
            
            // Hide scrollbars on body
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
        } else {
            // Restore scrollbars on desktop
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        }
    }

    // Run on window resize
    window.addEventListener('resize', function() {
        // Debounce the resize handler
        clearTimeout(window.resizeTimeout);
        window.resizeTimeout = setTimeout(handleMobileEmbed, 100);
    });

    // Word Cloud Wave Effect with slower auto-scroll
    function initializeWordCloud() {
        const wordCloudContent = document.getElementById('word-cloud-content');
        const words = [
            'Artists', 'Problem Solvers', 'Entrepreneurs', 
            'Gamers', 'Educators', 'Technologists',
            'Creators', 'Innovators', 'Designers',
            'Developers', 'Advocates', 'Visionaries'
        ];
        
        // Create duplicated word sequence for smooth looping
        const allWords = [...words, ...words, ...words]; // Triple the words for smooth looping
        
        // Clear any existing content
        wordCloudContent.innerHTML = '';
        
        // Add words with random float animation values but slower speeds
        allWords.forEach((word, index) => {
            const wordSpan = document.createElement('span');
            wordSpan.classList.add('word-cloud-word');
            wordSpan.textContent = word;
            
            // Set custom properties for animation with slower timing
            wordSpan.style.setProperty('--delay', (index * 0.4).toFixed(1)); // Doubled delay for slower movement
            wordSpan.style.setProperty('--float-y', Math.floor(Math.random() * 10) - 5);
            
            // Add diamond separator
            if (index < allWords.length - 1) {
                const separator = document.createElement('span');
                separator.classList.add('word-cloud-word');
                separator.innerHTML = ' <span>◇</span> ';
                separator.style.setProperty('--delay', ((index * 0.4) + 0.2).toFixed(1)); // Doubled delay
                separator.style.setProperty('--float-y', Math.floor(Math.random() * 8) - 4);
                
                wordCloudContent.appendChild(wordSpan);
                wordCloudContent.appendChild(separator);
            } else {
                wordCloudContent.appendChild(wordSpan);
            }
        });
    }

    // Draggable physics for hero tagline (secret interactive element)
    function initializeDraggableHero() {
        const tagline = document.querySelector('.hero-tagline');
        if (!tagline) return;
        
        // Only enable on desktop
        if (window.innerWidth < 768) return;
        
        // Add hint cursor
        tagline.style.cursor = 'grab';
        
        // Physics variables
        let isDragging = false;
        let position = { x: 0, y: 0 };
        let velocity = { x: 0, y: 0 };
        let lastPosition = { x: 0, y: 0 };
        let animationFrame;
        
        // Set up the initial position
        tagline.style.position = 'relative';
        tagline.style.userSelect = 'none'; // Prevent text selection during dragging
        tagline.style.transition = 'transform 0.1s ease'; // Smooth rotation
        
        // Start dragging
        tagline.addEventListener('mousedown', function(e) {
            isDragging = true;
            tagline.style.cursor = 'grabbing';
            position.x = e.clientX;
            position.y = e.clientY;
            lastPosition.x = position.x;
            lastPosition.y = position.y;
            
            // Add a slight "picked up" effect
            tagline.style.transform = 'scale(1.05) rotate(2deg)';
            tagline.style.zIndex = '100';
            
            // Stop any animation
            cancelAnimationFrame(animationFrame);
            
            e.preventDefault();
        });
        
        // Track mouse movement for dragging
        document.addEventListener('mousemove', function(e) {
            if (!isDragging) return;
            
            // Calculate new position
            const dx = e.clientX - position.x;
            const dy = e.clientY - position.y;
            
            // Calculate velocity for "throw" effect
            velocity.x = e.clientX - lastPosition.x;
            velocity.y = e.clientY - lastPosition.y;
            
            // Update positions
            lastPosition.x = e.clientX;
            lastPosition.y = e.clientY;
            position.x = e.clientX;
            position.y = e.clientY;
            
            // Move the element
            const currentX = parseInt(tagline.style.left || '0');
            const currentY = parseInt(tagline.style.top || '0');
            tagline.style.left = (currentX + dx) + 'px';
            tagline.style.top = (currentY + dy) + 'px';
            
            // Rotate slightly based on movement direction
            const rotation = velocity.x * 0.2;
            tagline.style.transform = `scale(1.05) rotate(${rotation}deg)`;
        });
        
        // Release drag and apply physics
        document.addEventListener('mouseup', function() {
            if (!isDragging) return;
            
            tagline.style.cursor = 'grab';
            isDragging = false;
            
            // Apply "throw" physics
            applyPhysics();
        });
        
        // Physics animation loop
        function applyPhysics() {
            // Apply momentum with decay
            const friction = 0.95;
            velocity.x *= friction;
            velocity.y *= friction;
            
            // Stop if velocity is very small
            if (Math.abs(velocity.x) < 0.5 && Math.abs(velocity.y) < 0.5) {
                tagline.style.transform = 'scale(1) rotate(0deg)';
                return;
            }
            
            // Update position
            const currentX = parseInt(tagline.style.left || '0');
            const currentY = parseInt(tagline.style.top || '0');
            let newX = currentX + velocity.x;
            let newY = currentY + velocity.y;
            
            // Boundary checking with different values for X and Y
            const boundsX = Math.min(window.innerWidth / 2.5, 600); // Wider bounds for horizontal
            const boundsY = Math.min(window.innerHeight / 2, 400); // Shorter bounds for vertical
            
            if (Math.abs(newX) > boundsX) {
                velocity.x *= -0.7; // Bounce with energy loss
                newX = newX > 0 ? boundsX : -boundsX;
            }
            
            if (Math.abs(newY) > boundsY) {
                velocity.y *= -0.7; // Bounce with energy loss
                newY = newY > 0 ? boundsY : -boundsY;
            }
            
            // Apply position
            tagline.style.left = newX + 'px';
            tagline.style.top = newY + 'px';
            
            // Rotate based on movement
            const rotation = velocity.x * 0.2;
            tagline.style.transform = `scale(${1 + Math.abs(velocity.x + velocity.y) * 0.01}) rotate(${rotation}deg)`;
            
            // Continue animation
            animationFrame = requestAnimationFrame(applyPhysics);
        }
        
        // Double-click to reset position
        tagline.addEventListener('dblclick', function() {
            cancelAnimationFrame(animationFrame);
            velocity = { x: 0, y: 0 };
            
            // Animate back to original position
            tagline.style.transition = 'all 0.5s cubic-bezier(0.18, 0.89, 0.32, 1.28)';
            tagline.style.left = '0px';
            tagline.style.top = '0px';
            tagline.style.transform = 'scale(1) rotate(0deg)';
            
            // Reset transition after animation
            setTimeout(() => {
                tagline.style.transition = 'transform 0.1s ease';
            }, 500);
        });
    }

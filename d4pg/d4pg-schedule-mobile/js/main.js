
        // Configuration
        const CONFIG = {
            urlPrefix: 'https://tcia-admin.github.io/tcia-server-files/',
            scheduleFile: 'd4pg-schedule.json',
            dayFiles: {
                day1: 'd4pg-schedule-day1.json',
                day2: 'd4pg-schedule-day2.json', 
                day3: 'd4pg-schedule-day3.json'
            }
        };

        // Global data storage
        let scheduleData = {};
        let currentDay = 'day1';
        let testMode = false;
        let simulatedDate = null;

        // Check for test mode from URL parameters
        function initializeTestMode() {
            const urlParams = new URLSearchParams(window.location.search);
            testMode = urlParams.has('test-mode');
            
            if (urlParams.has('simulate-date')) {
                const dateParam = urlParams.get('simulate-date');
                simulatedDate = new Date(dateParam);
                testMode = true;
            } else if (testMode) {
                // Default to July 16, 2025 at 10:15 AM if just test-mode=true
                simulatedDate = new Date(2025, 6, 16, 10, 15, 0);
            }
            
            if (testMode) {
                // Add visual indicator
                const testIndicator = document.createElement('div');
                testIndicator.style.cssText = `
                    position: fixed; 
                    top: 10px; 
                    left: 10px; 
                    background: var(--d4pg-coral); 
                    color: white; 
                    padding: 5px 10px; 
                    border-radius: 5px; 
                    font-size: 0.8rem; 
                    z-index: 1001;
                    font-weight: bold;
                `;
                testIndicator.textContent = `TEST MODE: ${simulatedDate.toLocaleString()}`;
                document.body.appendChild(testIndicator);
            }
        }

        // Get current time (real or simulated)
        function getCurrentTime() {
            return testMode && simulatedDate ? new Date(simulatedDate) : new Date();
        }

        // Check if we're currently during the conference dates
        function isDuringConference() {
            if (testMode) return true;
            
            const now = new Date();
            const conferenceStart = new Date(2025, 6, 16); // July 16, 2025
            const conferenceEnd = new Date(2025, 6, 19); // July 19, 2025 (day after)
            
            return now >= conferenceStart && now < conferenceEnd;
        }

        // Convert time string to minutes since midnight for comparison
        function timeToMinutes(timeStr) {
            const [hours, minutes] = timeStr.split(':').map(Number);
            return hours * 60 + minutes;
        }

        // Get the conference day for a given date
        function getConferenceDay(date) {
            const july16 = new Date(2025, 6, 16);
            const july17 = new Date(2025, 6, 17);
            const july18 = new Date(2025, 6, 18);
            
            const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            const july16Only = new Date(july16.getFullYear(), july16.getMonth(), july16.getDate());
            const july17Only = new Date(july17.getFullYear(), july17.getMonth(), july17.getDate());
            const july18Only = new Date(july18.getFullYear(), july18.getMonth(), july18.getDate());
            
            if (dateOnly.getTime() === july16Only.getTime()) return 'day1';
            if (dateOnly.getTime() === july17Only.getTime()) return 'day2';
            if (dateOnly.getTime() === july18Only.getTime()) return 'day3';
            return null;
        }

        function updateCurrentEvent() {
            // Clear all current markers first
            document.querySelectorAll('.event-card.current').forEach(card => {
                card.classList.remove('current');
            });

            // Only mark events as current if we're during the conference
            if (!isDuringConference()) {
                return;
            }

            const now = getCurrentTime();
            const currentMinutes = now.getHours() * 60 + now.getMinutes();
            const conferenceDay = getConferenceDay(now);
            
            if (!conferenceDay || !scheduleData.days || !scheduleData.days[conferenceDay]) {
                return;
            }

            // Find the current event for this day
            const dayEvents = scheduleData.days[conferenceDay].events;
            let currentEvent = null;

            for (const event of dayEvents) {
                const startMinutes = timeToMinutes(event.startTime);
                const endMinutes = timeToMinutes(event.endTime);
                
                if (currentMinutes >= startMinutes && currentMinutes < endMinutes) {
                    currentEvent = event;
                    break;
                }
            }

            if (currentEvent) {
                // Mark the corresponding card as current
                const eventCard = document.querySelector(`[data-event-id="${currentEvent.id}"]`);
                if (eventCard) {
                    eventCard.classList.add('current');
                }
            }
        }

        // Utility functions
        function formatTime(timeStr) {
            // Convert "14:00" to "2:00 PM" format
            const [hours, minutes] = timeStr.split(':');
            const hour24 = parseInt(hours);
            const hour12 = hour24 > 12 ? hour24 - 12 : (hour24 === 0 ? 12 : hour24);
            const ampm = hour24 >= 12 ? 'PM' : 'AM';
            return `${hour12}:${minutes} ${ampm}`;
        }

        function getLocationDisplayName(locationKey) {
            const locationMap = {
                'main-auditorium': 'Main Auditorium',
                'dining-hall': 'Dining Hall',
                'workshop-a': 'Workshop Room A',
                'workshop-b': 'Workshop Room B',
                'main-hall': 'Main Hall',
                'campus-garden': 'Campus Garden',
                'great-hall': 'Great Hall',
                'various-rooms': 'Various Rooms'
            };
            return locationMap[locationKey] || locationKey;
        }

        // Group events by time blocks to identify concurrent workshops
        function groupEventsByTime(events) {
            const timeBlocks = [];
            
            events.forEach(event => {
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

        function createEventCard(event) {
            const startTime = formatTime(event.startTime);
            const endTime = formatTime(event.endTime);
            const location = getLocationDisplayName(event.location);
            
            const eventCard = document.createElement('div');
            eventCard.className = `event-card ${event.type}`;
            eventCard.dataset.eventId = event.id;
            eventCard.dataset.eventType = event.type;
            eventCard.dataset.location = event.location;

            // Create speakers section
            let speakersHtml = '';
            if (event.people) {
                const speakers = [];
                
                if (event.people.speakers) {
                    speakers.push(...event.people.speakers);
                }
                if (event.people.moderator) {
                    speakers.push(event.people.moderator);
                }
                
                if (speakers.length > 0) {
                    speakersHtml = '<div class="event-speakers">';
                    // Show only the first speaker on the card
                    speakersHtml += `<div class="speaker-name">${speakers[0].name}</div>`;
                    // Add indicator if there are more speakers
                    if (speakers.length > 1) {
                        speakersHtml += `<div class="speaker-name">+${speakers.length - 1} more</div>`;
                    }
                    speakersHtml += '</div>';
                }
            }

            eventCard.innerHTML = `
                <div class="expand-icon"><span></span></div>
                <div class="event-time">
                    <span>${startTime} - ${endTime}</span>
                    <span>${location}</span>
                </div>
                <div class="event-content">
                    <h3 class="event-title">${event.title}</h3>
                    ${speakersHtml}
                    <div class="event-description" style="display: none;">${event.description || ''}</div>
                </div>
            `;

            return eventCard;
        }

        function createConcurrentWorkshopsCarousel(timeBlock) {
            const workshops = timeBlock.events.filter(event => event.type === 'workshop');
            if (workshops.length <= 1) return null;

            const startTime = formatTime(timeBlock.startTime);
            const endTime = formatTime(timeBlock.endTime);

            const container = document.createElement('div');
            container.className = 'concurrent-workshops-container';
            container.dataset.eventType = 'workshop';
            container.dataset.location = workshops.map(w => w.location).join(',');

            // Header
            const header = document.createElement('div');
            header.className = 'workshops-header';
            header.innerHTML = `
                <span class="workshops-time">${startTime} - ${endTime}</span>
                <span class="workshops-title">Concurrent Workshops</span>
            `;
            container.appendChild(header);

            // Carousel
            const carousel = document.createElement('div');
            carousel.className = 'workshops-carousel';

            const slidesContainer = document.createElement('div');
            slidesContainer.className = 'workshops-slides';

            // Create slides
            workshops.forEach((workshop, index) => {
                const slide = document.createElement('div');
                slide.className = 'workshop-slide';

                const workshopCard = document.createElement('div');
                workshopCard.className = 'workshop-card-mobile';
                workshopCard.dataset.eventId = workshop.id;

                // Get facilitator name (show only first one)
                let facilitatorName = '';
                let facilitatorCount = 0;
                if (workshop.people && workshop.people.speakers && workshop.people.speakers.length > 0) {
                    facilitatorName = workshop.people.speakers[0].name;
                    facilitatorCount = workshop.people.speakers.length;
                    // Add indicator if there are more facilitators
                    if (facilitatorCount > 1) {
                        facilitatorName += ` (+${facilitatorCount - 1} more)`;
                    }
                }

                                 workshopCard.innerHTML = `
                     <div class="expand-icon"><span></span></div>
                     <div class="workshop-title">${workshop.title}</div>
                     <div class="workshop-location">${getLocationDisplayName(workshop.location)}</div>
                     ${facilitatorName ? `<div class="workshop-facilitator">${facilitatorName}</div>` : ''}
                 `;

                slide.appendChild(workshopCard);
                slidesContainer.appendChild(slide);
            });

            carousel.appendChild(slidesContainer);
            container.appendChild(carousel);

            // Navigation
            const navigation = document.createElement('div');
            navigation.className = 'workshops-navigation';

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
            indicators.className = 'workshops-indicators';

            for (let i = 0; i < workshops.length; i++) {
                const indicator = document.createElement('div');
                indicator.className = `workshop-indicator ${i === 0 ? 'active' : ''}`;
                indicator.dataset.slide = i;
                indicators.appendChild(indicator);
            }

            // Counter
            const counter = document.createElement('div');
            counter.className = 'workshop-counter';
            counter.textContent = `1 / ${workshops.length}`;

            navigation.appendChild(prevBtn);
            navigation.appendChild(indicators);
            navigation.appendChild(counter);
            navigation.appendChild(nextBtn);

            container.appendChild(navigation);

            // Initialize carousel functionality
            initializeMobileWorkshopCarousel(container, workshops.length);

            return container;
        }

        function renderDayEvents(dayKey, events) {
            const container = document.getElementById(dayKey);
            if (!container) return;

            // Preserve youth summit banner for Day 3, clear other content
            if (dayKey === 'day3') {
                // Remove only event content, preserve the youth summit banner
                const eventElements = container.querySelectorAll('.event-card, .concurrent-workshops-container, .loading-message, .no-events, .error-message');
                eventElements.forEach(element => element.remove());
            } else {
                // Clear all content for other days
                container.innerHTML = '';
            }

            if (!events || events.length === 0) {
                const noEventsMsg = document.createElement('div');
                noEventsMsg.className = 'no-events';
                noEventsMsg.textContent = 'No events scheduled for this day.';
                container.appendChild(noEventsMsg);
                return;
            }

            // Group events by time blocks to handle concurrent workshops
            const timeBlocks = groupEventsByTime(events);

            timeBlocks.forEach(timeBlock => {
                // Check if this time block has multiple workshops
                const workshops = timeBlock.events.filter(event => event.type === 'workshop');
                
                if (workshops.length > 1) {
                    // Create concurrent workshops carousel
                    const workshopCarousel = createConcurrentWorkshopsCarousel(timeBlock);
                    if (workshopCarousel) {
                        container.appendChild(workshopCarousel);
                    }
                    
                    // Add any non-workshop events from this time block as regular cards
                    const nonWorkshopEvents = timeBlock.events.filter(event => event.type !== 'workshop');
                    nonWorkshopEvents.forEach(event => {
                        const eventCard = createEventCard(event);
                        container.appendChild(eventCard);
                    });
                } else {
                    // Single events or non-concurrent events - render normally
                    timeBlock.events.forEach(event => {
                        const eventCard = createEventCard(event);
                        container.appendChild(eventCard);
                    });
                }
            });
        }

        function switchDay(dayKey) {
            // Hide all day containers
            document.querySelectorAll('.events-container').forEach(container => {
                container.style.display = 'none';
            });

            // Show selected day
            const dayContainer = document.getElementById(dayKey);
            if (dayContainer) {
                dayContainer.style.display = 'block';
            }

            currentDay = dayKey;
            updateCurrentEvent();
            
            // Apply current filters to the newly shown day
            filterEvents();
        }

        // Data loading functions
        async function loadScheduleData() {
            try {
                // Load main schedule info
                const scheduleResponse = await fetch(CONFIG.urlPrefix + CONFIG.scheduleFile);
                const scheduleInfo = await scheduleResponse.json();
                
                // Load all day data
                const dayPromises = Object.keys(CONFIG.dayFiles).map(async (dayKey) => {
                    const response = await fetch(CONFIG.urlPrefix + CONFIG.dayFiles[dayKey]);
                    const dayData = await response.json();
                    return { dayKey, data: dayData };
                });

                const dayResults = await Promise.all(dayPromises);
                
                // Store data
                scheduleData.info = scheduleInfo;
                scheduleData.days = {};
                
                dayResults.forEach(({ dayKey, data }) => {
                    scheduleData.days[dayKey] = data;
                });

                return scheduleData;

            } catch (error) {
                console.error('Error loading schedule data:', error);
                throw error;
            }
        }

        function renderSchedule() {
            if (!scheduleData.days) {
                console.error('No schedule data available');
                return;
            }

            // Render events for each day
            Object.keys(scheduleData.days).forEach(dayKey => {
                const dayData = scheduleData.days[dayKey];
                renderDayEvents(dayKey, dayData.events);
            });

            // Update current event and time tracker
            updateCurrentEvent();
            updateTimeTracker();

            // Remove loading message
            document.querySelectorAll('.loading-message').forEach(msg => msg.remove());
        }

        function initializeFiltering() {
            // Get unique event types and locations from loaded data
            const eventTypes = new Set(['All']);
            const locations = new Set(['All']);

            Object.values(scheduleData.days).forEach(dayData => {
                dayData.events.forEach(event => {
                    eventTypes.add(event.type);
                    locations.add(getLocationDisplayName(event.location));
                });
            });

            // Update type filter pills
            const typeFiltersContainer = document.querySelector('.type-filters');
            if (typeFiltersContainer) {
                typeFiltersContainer.innerHTML = '';
                eventTypes.forEach(type => {
                    const pill = document.createElement('button');
                    pill.className = `type-pill ${type === 'All' ? 'active' : ''}`;
                    pill.textContent = type === 'All' ? 'All' : type.charAt(0).toUpperCase() + type.slice(1);
                    pill.addEventListener('click', function() {
                        // Remove active from siblings
                        this.parentElement.querySelectorAll('.type-pill').forEach(p => p.classList.remove('active'));
                        this.classList.add('active');
                        filterEvents();
                    });
                    typeFiltersContainer.appendChild(pill);
                });
            }

            // Update location filter pills (second type-filters container)
            const filterContainers = document.querySelectorAll('.type-filters');
            const locationFiltersContainer = filterContainers[1];
            if (locationFiltersContainer) {
                locationFiltersContainer.innerHTML = '';
                locations.forEach(location => {
                    const pill = document.createElement('button');
                    pill.className = `type-pill ${location === 'All' ? 'active' : ''}`;
                    pill.textContent = location;
                    pill.addEventListener('click', function() {
                        this.parentElement.querySelectorAll('.type-pill').forEach(p => p.classList.remove('active'));
                        this.classList.add('active');
                        filterEvents();
                    });
                    locationFiltersContainer.appendChild(pill);
                });
            }
        }

        function filterEvents() {
            const activeTypeFilter = document.querySelector('.type-filters .type-pill.active')?.textContent?.toLowerCase();
            const activeLocationFilter = document.querySelectorAll('.type-filters')[1]?.querySelector('.type-pill.active')?.textContent;

            // Filter regular event cards
            document.querySelectorAll('.event-card').forEach(card => {
                let show = true;

                // Type filter
                if (activeTypeFilter && activeTypeFilter !== 'all') {
                    const cardType = card.dataset.eventType;
                    if (cardType !== activeTypeFilter) {
                        show = false;
                    }
                }

                // Location filter
                if (activeLocationFilter && activeLocationFilter !== 'All') {
                    const cardLocation = getLocationDisplayName(card.dataset.location);
                    if (cardLocation !== activeLocationFilter) {
                        show = false;
                    }
                }

                card.style.display = show ? 'block' : 'none';
            });

            // Filter concurrent workshops containers
            document.querySelectorAll('.concurrent-workshops-container').forEach(container => {
                let show = true;

                // Type filter - workshops container should show if "all" or "workshop" is selected
                if (activeTypeFilter && activeTypeFilter !== 'all' && activeTypeFilter !== 'workshop') {
                    show = false;
                }

                // Location filter - check if any workshop in the container matches
                if (activeLocationFilter && activeLocationFilter !== 'All') {
                    const containerLocations = container.dataset.location.split(',');
                    const locationMatches = containerLocations.some(location => 
                        getLocationDisplayName(location) === activeLocationFilter
                    );
                    if (!locationMatches) {
                        show = false;
                    }
                }

                container.style.display = show ? 'block' : 'none';

                // If showing the container but filtering by location, 
                // we should also filter individual workshop cards within
                if (show && activeLocationFilter && activeLocationFilter !== 'All') {
                    const workshopCards = container.querySelectorAll('.workshop-card-mobile');
                    let visibleWorkshops = 0;
                    
                    workshopCards.forEach(workshopCard => {
                        // Get the event ID and find the corresponding workshop data
                        const eventId = workshopCard.dataset.eventId;
                        let workshopLocation = '';
                        
                        // Find the workshop data to get its location
                        Object.values(scheduleData.days || {}).forEach(dayData => {
                            const workshop = dayData.events.find(event => event.id === eventId);
                            if (workshop) {
                                workshopLocation = getLocationDisplayName(workshop.location);
                            }
                        });
                        
                        if (workshopLocation === activeLocationFilter) {
                            workshopCard.parentElement.style.display = 'block'; // Show the slide
                            visibleWorkshops++;
                        } else {
                            workshopCard.parentElement.style.display = 'none'; // Hide the slide
                        }
                    });
                    
                    // If no workshops match the location filter, hide the entire container
                    if (visibleWorkshops === 0) {
                        container.style.display = 'none';
                    }
                }
            });
        }

        // Initialize mobile workshop carousel functionality
        function initializeMobileWorkshopCarousel(container, totalSlides) {
            let currentSlide = 0;
            const slidesContainer = container.querySelector('.workshops-slides');
            const prevBtn = container.querySelector('.prev-btn');
            const nextBtn = container.querySelector('.next-btn');
            const indicators = container.querySelectorAll('.workshop-indicator');
            const counter = container.querySelector('.workshop-counter');
            const carousel = container.querySelector('.workshops-carousel');

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

            // Touch/swipe support
            let touchStartX = 0;
            let touchStartY = 0;
            let touchEndX = 0;
            let touchEndY = 0;
            let isSwiping = false;

            carousel.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
                touchStartY = e.changedTouches[0].screenY;
                isSwiping = true;
                
                // Prevent carousel from transitioning during touch
                slidesContainer.style.transition = 'none';
            }, { passive: true });

            carousel.addEventListener('touchmove', (e) => {
                if (!isSwiping) return;
                
                touchEndX = e.changedTouches[0].screenX;
                touchEndY = e.changedTouches[0].screenY;
                
                // Check if this is more of a horizontal swipe than vertical scroll
                const deltaX = Math.abs(touchEndX - touchStartX);
                const deltaY = Math.abs(touchEndY - touchStartY);
                
                if (deltaX > deltaY && deltaX > 20) {
                    // Prevent vertical scrolling when swiping horizontally
                    e.preventDefault();
                    
                    // Show visual feedback during swipe
                    const swipeDistance = touchEndX - touchStartX;
                    const currentTranslate = -currentSlide * 100;
                    const swipePercent = (swipeDistance / carousel.offsetWidth) * 100;
                    const newTranslate = currentTranslate + swipePercent;
                    
                    // Limit the swipe distance
                    const limitedTranslate = Math.max(-(totalSlides - 1) * 100, Math.min(0, newTranslate));
                    slidesContainer.style.transform = `translateX(${limitedTranslate}%)`;
                }
            }, { passive: false });

            carousel.addEventListener('touchend', (e) => {
                if (!isSwiping) return;
                isSwiping = false;
                
                // Restore transition
                slidesContainer.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)';
                
                const deltaX = touchEndX - touchStartX;
                const deltaY = Math.abs(touchEndY - touchStartY);
                const threshold = carousel.offsetWidth * 0.3; // 30% of carousel width
                
                // Only trigger slide change if horizontal swipe was significant
                if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > threshold) {
                    if (deltaX > 0 && currentSlide > 0) {
                        // Swipe right - go to previous
                        goToSlide(currentSlide - 1);
                    } else if (deltaX < 0 && currentSlide < totalSlides - 1) {
                        // Swipe left - go to next
                        goToSlide(currentSlide + 1);
                    } else {
                        // Snap back to current slide
                        updateCarousel();
                    }
                } else {
                    // Snap back to current slide
                    updateCarousel();
                }
            }, { passive: true });

            // Initialize
            updateCarousel();

            // Auto-advance carousel (slower on mobile)
            let autoAdvanceInterval;
            let isPaused = false;

            function startAutoAdvance() {
                if (isPaused) return;
                stopAutoAdvance();
                autoAdvanceInterval = setInterval(() => {
                    if (isPaused) return;
                    if (currentSlide < totalSlides - 1) {
                        goToSlide(currentSlide + 1);
                    } else {
                        goToSlide(0); // Loop back to start
                    }
                }, 12000); // 12 seconds on mobile
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
                setTimeout(startAutoAdvance, 1000); // Brief delay before resuming
            }

            // Start auto-advance
            startAutoAdvance();

            // Pause on user interaction
            [prevBtn, nextBtn].forEach(btn => {
                btn.addEventListener('click', () => {
                    pauseAutoAdvance();
                    setTimeout(resumeAutoAdvance, 15000); // Resume after 15 seconds
                });
            });

            indicators.forEach(indicator => {
                indicator.addEventListener('click', () => {
                    pauseAutoAdvance();
                    setTimeout(resumeAutoAdvance, 15000);
                });
            });

            // Pause when user touches the carousel
            carousel.addEventListener('touchstart', pauseAutoAdvance);
            carousel.addEventListener('touchend', () => {
                setTimeout(resumeAutoAdvance, 10000); // Resume after 10 seconds
            });
        }

        // Initialize the application
        async function initializeApp() {
            try {
                // Initialize test mode first
                initializeTestMode();
                
                await loadScheduleData();
                renderSchedule();
                initializeFiltering();
                
            } catch (error) {
                console.error('Failed to initialize schedule app:', error);
                // Show error message to user
                document.querySelectorAll('.events-container').forEach(container => {
                    container.innerHTML = '<div class="error-message">Failed to load schedule. Please try again later.</div>';
                });
            }
        }

        // Basic interaction for the prototype
        document.addEventListener('DOMContentLoaded', function() {
            // Initialize the app with data loading
            initializeApp();

            // Day navigation
            const dayButtons = document.querySelectorAll('.day-button');
            dayButtons.forEach(button => {
                button.addEventListener('click', function() {
                    dayButtons.forEach(btn => btn.classList.remove('active'));
                    this.classList.add('active');
                    
                    const dayKey = this.dataset.day;
                    switchDay(dayKey);
                });
            });
            
            // Filter drawer toggle - updated with console logging for debugging
            const filterButton = document.querySelector('.filter-button');
            const filterDrawer = document.querySelector('.filter-drawer');
            
            if (filterButton && filterDrawer) {
                filterButton.addEventListener('click', function(e) {
                    e.stopPropagation(); // Prevent event bubbling
                    filterDrawer.classList.toggle('open');
                });
                
                // Close drawer when clicking outside
                document.addEventListener('click', function(event) {
                    if (filterDrawer.classList.contains('open') && 
                        !filterDrawer.contains(event.target) && 
                        event.target !== filterButton) {
                        filterDrawer.classList.remove('open');
                    }
                });
            }
            
            // Update time tracker every minute
            setInterval(updateTimeTracker, 60000);
        });

        // Setup canvas background
        document.addEventListener('DOMContentLoaded', function() {
            const canvas = document.getElementById('background-canvas');
            const ctx = canvas.getContext('2d');
            
            // Set canvas dimensions
            function resizeCanvas() {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                drawCanvas();
            }
            
            // Draw background pattern
            function drawCanvas() {
                // Light gray background
                ctx.fillStyle = '#f2f2f7';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                
                // Draw subtle pattern (small dots)
                ctx.fillStyle = 'rgba(138, 145, 199, 0.9)'; // Light blue dots
                for (let i = 0; i < 150; i++) {
                    const x = Math.random() * canvas.width;
                    const y = Math.random() * canvas.height;
                    const radius = Math.random() * 1.5;
                    
                    ctx.beginPath();
                    ctx.arc(x, y, radius, 0, Math.PI * 2);
                    ctx.fill();
                }
                
                // Add a subtle gradient overlay
                const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
                gradient.addColorStop(0, 'rgba(255, 255, 255, 0.7)');
                gradient.addColorStop(1, 'rgba(138, 145, 199, 0.1)');
                
                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }
            
            // Initialize and handle resize
            resizeCanvas();
            window.addEventListener('resize', resizeCanvas);
        });

        // Add event expand/collapse functionality
        document.addEventListener('DOMContentLoaded', function() {
            const eventModal = document.querySelector('.event-modal');
            const modalContent = document.querySelector('.modal-content');
            const modalClose = document.querySelector('.modal-close');
            const modalTitle = document.querySelector('.modal-title');
            const modalTime = document.querySelector('.modal-time');
            const modalLocation = document.querySelector('.modal-location');
            const modalDescription = document.querySelector('.modal-description');
            
            // Handle expand icon clicks
            document.addEventListener('click', function(e) {
                if (e.target.closest('.expand-icon')) {
                    const card = e.target.closest('.event-card') || e.target.closest('.workshop-card-mobile');
                    const eventId = card.dataset.eventId;
                    
                    // Find the event data
                    let eventData = null;
                    Object.values(scheduleData.days || {}).forEach(dayData => {
                        const foundEvent = dayData.events.find(event => event.id === eventId);
                        if (foundEvent) {
                            eventData = foundEvent;
                        }
                    });

                    if (!eventData) {
                        return;
                    }
                    
                    // Get event type for styling
                    const eventType = eventData.type;
                    
                    // Update modal content
                    modalTitle.textContent = eventData.title;
                    modalTime.textContent = `${formatTime(eventData.startTime)} - ${formatTime(eventData.endTime)}`;
                    modalLocation.textContent = getLocationDisplayName(eventData.location);
                    modalDescription.textContent = eventData.description || 'No description available.';
                    
                    // Set appropriate class for color coding
                    modalContent.className = 'modal-content';
                    if (eventType) {
                        modalContent.classList.add(eventType);
                        
                        // Set event type text
                        const modalEventType = document.querySelector('.modal-event-type');
                        if (modalEventType) {
                            modalEventType.textContent = eventType.charAt(0).toUpperCase() + eventType.slice(1);
                        }
                    }
                    
                    // Populate speakers based on data in the event
                    const speakersSection = document.querySelector('.modal-speakers-section');
                    if (speakersSection) {
                        // Clear existing speakers
                        speakersSection.innerHTML = '';
                        
                        // Create appropriate heading based on event type
                        let speakersTitle = 'Speakers';
                        if (eventType === 'panel') {
                            speakersTitle = 'Panel';
                        } else if (eventType === 'workshop') {
                            speakersTitle = 'Workshop Leaders';
                        } else if (eventType === 'break' || eventType === 'social') {
                            speakersTitle = 'Organizers';
                        }
                        
                        const speakersTitleEl = document.createElement('h3');
                        speakersTitleEl.className = 'modal-speakers-title';
                        speakersTitleEl.textContent = speakersTitle;
                        speakersSection.appendChild(speakersTitleEl);
                        
                        // Create container for speakers
                        const speakersContainer = document.createElement('div');
                        speakersContainer.className = 'modal-speakers-container';
                        speakersSection.appendChild(speakersContainer);
                        
                        // Handle different event types
                        if (eventData.people) {
                            if (eventType === 'panel' && eventData.people.moderator) {
                                // Add moderator
                                const moderator = eventData.people.moderator;
                                const moderatorDiv = document.createElement('div');
                                moderatorDiv.className = 'modal-speaker moderator';
                                
                                moderatorDiv.innerHTML = `
                                    <div class="modal-speaker-info">
                                        <div class="modal-speaker-name">${moderator.name}</div>
                                        <div class="modal-speaker-role">${moderator.title || 'Moderator'}</div>
                                        <div class="speaker-type">Moderator</div>
                                    </div>
                                `;
                                speakersContainer.appendChild(moderatorDiv);
                                
                                // Add panelists
                                if (eventData.people.panelists) {
                                    eventData.people.panelists.forEach(panelist => {
                                        const panelistDiv = document.createElement('div');
                                        panelistDiv.className = 'modal-speaker panelist';
                                        
                                        panelistDiv.innerHTML = `
                                            <div class="modal-speaker-info">
                                                <div class="modal-speaker-name">${panelist.name}</div>
                                                <div class="modal-speaker-role">${panelist.title || 'Panelist'}</div>
                                                <div class="speaker-type">Panelist</div>
                                            </div>
                                        `;
                                        speakersContainer.appendChild(panelistDiv);
                                    });
                                }
                            } else if (eventData.people.speakers) {
                                // Regular speakers for non-panel events
                                eventData.people.speakers.forEach(speaker => {
                                    const speakerDiv = document.createElement('div');
                                    speakerDiv.className = 'modal-speaker';
                                    
                                    speakerDiv.innerHTML = `
                                        <div class="modal-speaker-info">
                                            <div class="modal-speaker-name">${speaker.name}</div>
                                            <div class="modal-speaker-role">${speaker.title || ''}</div>
                                        </div>
                                    `;
                                    speakersContainer.appendChild(speakerDiv);
                                });
                            }
                        } else {
                            // No speaker data available
                            speakersSection.style.display = 'none';
                        }
                    }
                    
                    // Show modal
                    eventModal.classList.add('active');
                    document.body.style.overflow = 'hidden'; // Prevent background scrolling
                }
            });
            
            // Close modal on X button click
            modalClose.addEventListener('click', function() {
                eventModal.classList.remove('active');
                document.body.style.overflow = ''; // Restore scrolling
            });
            
            // Close modal on outside click
            eventModal.addEventListener('click', function(e) {
                if (e.target === eventModal) {
                    eventModal.classList.remove('active');
                    document.body.style.overflow = ''; // Restore scrolling
                }
            });
        });

        // Add theme toggle functionality
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', function() {
                document.body.classList.toggle('light-mode');
                
                // Update canvas background for light mode
                if (document.body.classList.contains('light-mode')) {
                    // Redraw canvas with light background
                    const canvas = document.getElementById('background-canvas');
                    const ctx = canvas.getContext('2d');
                    
                    // Light background
                    ctx.fillStyle = '#ffffff';
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    
                    // Light pattern
                    ctx.fillStyle = 'rgba(24, 38, 84, 0.1)';
                    // Redraw dots for light mode
                    // (Pattern code similar to the existing drawCanvas function)
                } else {
                    // Redraw for dark mode (call original function)
                    drawCanvas();
                }
            });
        }

        // Countdown Timer functionality
        function initializeCountdown() {
            const countdownContainer = document.querySelector('.countdown-container');
            const countdownDays = document.getElementById('countdown-days');
            const countdownHours = document.getElementById('countdown-hours');
            const countdownMinutes = document.getElementById('countdown-minutes');
            const countdownSeconds = document.getElementById('countdown-seconds');
            const countdownLive = document.getElementById('countdown-live');
            const countdownDigits = document.querySelector('.countdown-digits');
            const countdownTitle = document.querySelector('.countdown-title');
            
            // Set the conference start date (July 16, 2025 at 8:00 AM)
            const conferenceDate = new Date(2025, 6, 16, 8, 0, 0);
            
            function updateCountdown() {
                const now = new Date();
                const diff = conferenceDate - now;
                
                if (diff <= 0) {
                    // Conference has started
                    countdownDigits.style.display = 'none';
                    countdownTitle.style.display = 'none';
                    countdownLive.style.display = 'inline-block';
                    return;
                }
                
                // Calculate time units
                const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((diff % (1000 * 60)) / 1000);
                
                // Update the display
                countdownDays.textContent = days.toString().padStart(2, '0');
                countdownHours.textContent = hours.toString().padStart(2, '0');
                countdownMinutes.textContent = minutes.toString().padStart(2, '0');
                countdownSeconds.textContent = seconds.toString().padStart(2, '0');
            }
            
            // Initial update
            updateCountdown();
            
            // Update every second
            setInterval(updateCountdown, 1000);
        }

        initializeCountdown();

        // Get the next upcoming event
        function getUpcomingEvent() {
            if (!isDuringConference()) return null;

            const now = getCurrentTime();
            const currentMinutes = now.getHours() * 60 + now.getMinutes();
            const conferenceDay = getConferenceDay(now);
            
            if (!conferenceDay || !scheduleData.days || !scheduleData.days[conferenceDay]) {
                return null;
            }

            // Find the next event that starts after the current time
            const dayEvents = scheduleData.days[conferenceDay].events;
            
            for (const event of dayEvents) {
                const startMinutes = timeToMinutes(event.startTime);
                if (startMinutes > currentMinutes) {
                    return event;
                }
            }

            // If no more events today, check the next day
            const nextDay = conferenceDay === 'day1' ? 'day2' : (conferenceDay === 'day2' ? 'day3' : null);
            if (nextDay && scheduleData.days[nextDay]) {
                const nextDayEvents = scheduleData.days[nextDay].events;
                return nextDayEvents.length > 0 ? nextDayEvents[0] : null;
            }

            return null;
        }

        // Enable scrolling for text that overflows
        function enableScrollingIfNeeded(element, content) {
            const contentElement = element.querySelector('.now-event-content');
            if (!contentElement) return;

            // Update content
            contentElement.textContent = content;
            
            // Reset animation
            element.classList.remove('scrolling');
            element.style.setProperty('--scroll-duration', '10s');
            
            // Force reflow
            element.offsetHeight;
            
            // Check if content overflows
            const containerWidth = element.offsetWidth - 20; // Account for padding
            const contentWidth = contentElement.scrollWidth;
            
            if (contentWidth > containerWidth) {
                // Calculate duration based on content length (roughly 50px per second)
                const scrollDistance = contentWidth + containerWidth;
                const duration = Math.max(8, scrollDistance / 50); // Minimum 8 seconds
                
                element.style.setProperty('--scroll-duration', `${duration}s`);
                element.classList.add('scrolling');
            }
        }

        function updateTimeTracker() {
            const currentTimeEl = document.querySelector('.current-time span:last-child');
            const nowEventEl = document.querySelector('.now-event');
            
            if (currentTimeEl) {
                const now = getCurrentTime();
                const timeStr = now.toLocaleTimeString('en-US', { 
                    hour: 'numeric', 
                    minute: '2-digit',
                    hour12: true 
                });
                currentTimeEl.textContent = timeStr;
            }

            if (nowEventEl) {
                let displayText = '';
                
                const currentEvent = document.querySelector('.event-card.current');
                if (currentEvent) {
                    // We have a current event
                    const currentTitle = currentEvent.querySelector('.event-title').textContent;
                    displayText = `NOW: ${currentTitle}`;
                    
                    // Add upcoming event if available
                    const upcomingEvent = getUpcomingEvent();
                    if (upcomingEvent) {
                        const upcomingTime = formatTime(upcomingEvent.startTime);
                        displayText += ` • NEXT: ${upcomingEvent.title} (${upcomingTime})`;
                    }
                } else if (isDuringConference()) {
                    // During conference but between sessions
                    const upcomingEvent = getUpcomingEvent();
                    if (upcomingEvent) {
                        const upcomingTime = formatTime(upcomingEvent.startTime);
                        displayText = `NEXT: ${upcomingEvent.title} (${upcomingTime})`;
                    } else {
                        displayText = 'Between sessions';
                    }
                } else {
                    // Before conference starts
                    displayText = 'Conference begins July 16, 2025';
                }

                enableScrollingIfNeeded(nowEventEl, displayText);
            }
        }
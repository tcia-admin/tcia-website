
    // Filter options data structure
    const filterOptions = {
        department: [
            { value: 'tcia', label: 'TCIA' },
            { value: 'notice coalition', label: 'NOTICE COALITION' }
        ],
        type: [
            { value: 'intern', label: 'Intern' },
            { value: 'regular', label: 'Regular' }
        ]
    };

    const positions = [
        {
            id: 1,
            title: "Web Development Intern",
            department: "TCIA",
            type: "intern",
            description: `<p>The TCIA Internship program seeks undergraduate/graduate students for a part-time paid opportunity that will run during the Spring – Summer of 2025. Interns will work up to 15 hours a week and will be paid $15-20 per hour. Start and end dates are flexible. An internship at TCIA will provide an opportunity to work with a fast-paced, growing company in Minneapolis's vibrant technology scene, although all work can be completed remotely. The purpose of the internship is to give the students professional skills and competencies as well as organizational and personal knowledge regarding the field in which they are studying.</p>

            <p>Mission of the Twin Cities Innovation Alliance (TCIA): To build and develop a problem-solving ecosystem for public interest technology, fueled by a critical mass of diverse, highly-engaged residents, policymakers, educators, visionaries, business owners, and problem-solvers made up of Black, Indigenous, and People of Color communities and coalitions.</p>

            <ul>
                <li>Design, edit, manage, and add content to the TCIA website</li>
                <li>Use media queries to adjust the layout of your site based on device type</li>
                <li>Work with content management systems like WordPress, Squarespace, Drip</li>
                <li>Plan, organize, and implement your web design projects</li>
                <li>Help determine needs around web pages and content for intranet site housed in SharePoint/Teams and help create those webpages</li>
                <li>Work with MIS and other departments around analyzing web analytics data to determine changes around content and structure of web sites</li>
                <li>Help conduct troubleshooting for technical problems that may arise, including debugging code and reinstalling software</li>
                <li>Execute handle change requests around websites and web development</li>
                <li>Optimizes user experience and site content for ranking in search engines including HTML, site structure, page layout, and navigation</li>
                <li>Performs ongoing maintenance of Squarespace website</li>
                <li>Is a self-starter with the ability to be productive independently while hand multiple projects</li>
                <li>Other duties not yet defined, but related to UX/UI this work</li>
            </ul>`,
            requirements: `<ul>
                <li>Competent Front and back-end development experience</li>
                <li>Competent in UI/UX design</li>
                <li>Experience in configuring digital meeting platforms i.e. Zoom, LinkedIn live, and Teams</li>
                <li>Support social media integrations for BlueSky, LinkedIn page</li>
                <li>Experience in WordPress, Squarespace, CMS</li>
            </ul>`,
            applicationNote: `<p>Please attach a resume/CV and a work sample OR cover letter to apply.</p>`,
            url: "/positions/web-dev-intern"
        },
        {
            id: 2,
            title: "Video Production Intern",
            department: "TCIA",
            type: "intern",
            description: `<p>The TCIA Summer Internship program seeks undergraduate/graduate students for a part-time paid opportunity that will run during the Spring - Summer of 2025. Interns will work up to 15 hours a week and will be paid $15-20 per hour. Start and end dates are flexible. An internship at TCIA will provide an opportunity to work with a fast-paced, growing company in Minneapolis's vibrant technology scene, although all work can be completed remotely. The purpose of the internship is to give the students professional skills and competencies as well as organizational and personal knowledge regarding the field in which they are studying. For this position, we are hiring one fully remote intern, and one that will work mostly remotely, but will occasionally need to be on site in the Twin Cities.</p>
            
            <p>Mission of the Twin Cities Innovation Alliance (TCIA): To build and develop a problem-solving ecosystem for public interest technology, fueled by a critical mass of diverse, highly engaged residents, policymakers, educators, visionaries, business owners, and problem-solvers made up of Black, Indigenous, and People of Color communities and coalitions.</p>
            
            <ul>
                <li>Execute logistics of all video productions for in-person events, webinars, and podcasts</li>
                <li>Can collaborate with other team members to ensure digital marketing efforts are aligned</li>
                <li>Lead all components of production, including sound, lighting, cameras, computers, editing, and postproduction</li>
                <li>Attend the team meetings, Daily Stand-ups, Iteration and program planning</li>
                <li>Publish, organize, and optimize media on TCIA website and social media platforms including YouTube, Vimeo, Squarespace, WordPress, and LinkedIn</li>
                <li>Research and utilize platforms (in alignment with TCIA's work) to use for uploading and sharing videos, webinars, podcasts, and other media materials</li>
                <li>Research and report on best technology to record webinars, podcasts, and live events (in alignment with TCIA's work)</li>
                <li>Video editing: edit recorded raw footage into the finished product</li>
                <li>Ensure equipment is charged and properly stored before and after events</li>
                <li>Help arrange and coordinate video production</li>
                <li>Create thumbnails from video selects</li>
                <li>Administrative and editorial duties associated with video releases may be assigned</li>
                <li>Work with content manager to suggest and develop new media content</li>
            </ul>`,
            requirements: `<ul>
                <li>Demonstrates a commitment to social and racial justice</li>
                <li>Is interested in working in the fields of public interest technology or digital justice</li>
                <li>Has experience filming and producing live events</li>
                <li>Has experience with podcasting and/or webinar series</li>
                <li>Is a self-starter with the ability to be productive independently while hand multiple projects</li>
            </ul>`,
            applicationNote: `<p>Please attach a resume/CV and a work sample OR cover letter to apply.</p>`,
            url: "/positions/video-production-intern"
        },
        {
            id: 3,
            title: "Marketing Data Analyst Intern",
            department: "TCIA",
            type: "intern",
            description: `<p>The TCIA Summer Internship program seeks undergraduate/graduate students for a part-time paid opportunity that will run during the Spring – Summer of 2025. Interns will work up to 15 hours a week and will be paid $15-20 per hour. Start and end dates are flexible. An internship at TCIA will provide an opportunity to work with a fast-paced, growing company in Minneapolis's vibrant technology scene, although all work can be completed remotely. The purpose of the internship is to give the students professional skills and competencies as well as organizational and personal knowledge regarding the field in which they are studying. For this position, we are hiring one fully remote intern, and one that will work mostly remotely, but will occasionally need to be on site in the Twin Cities.</p>

            <p>Mission of the Twin Cities Innovation Alliance (TCIA): To build and develop a problem-solving ecosystem for public interest technology, fueled by a critical mass of diverse, highly engaged residents, policymakers, educators, visionaries, business owners, and problem-solvers made up of Black, Indigenous, and People of Color communities and coalitions.</p>

            <ul>
                <li>Acquire, clean, and maintain data from various sources, structuring it for databases and systems.</li>
                <li>Utilize programming languages like Python and R for data analysis and algorithm development.</li>
                <li>Analyze data trends and patterns, applying statistical techniques to provide insights, reports, and simplified content for various audiences.</li>
                <li>Develop, prototype, and test predictive algorithms to enhance decision-making.</li>
                <li>Implement data collection systems to improve statistical efficiency and ensure data quality.</li>
                <li>Solve problems using data science tools, analyzing large datasets (Excel, SPSS, SAS) for actionable insights.</li>
                <li>Apply expertise in data models, mining, and segmentation to inform organizational strategies.</li>
                <li>Synthesize and present findings with attention to detail and accuracy, including queries for digital platforms and marketing tools.</li>
                <li>Collaborate with the team to refine real-time digital marketing and content strategies.</li>
                <li>Conduct audience segmentation and develop marketing personas, with a focus on college students.</li>
                <li>Provide organization-wide insights through open communication and real-time data sharing.</li>
                <li>Lead D4PG 2025 conference speaker identification, recruitment, and engagement.</li>
                <li>Apply marketing analytics skills (Google Analytics, Google Ads) and SEO techniques to enhance digital engagement and accessibility.</li>
                <li>Research social media algorithms (BlueSky, LinkedIn, Squarespace) and alternatives to Twitter, developing reports with actionable insights.</li>
                <li>Create data visualization models using Power BI and Tableau for improved storytelling.</li>
                <li>Draft participant feedback survey templates for events like D4PG.</li>
                <li>Collaborate with the Full Stack Developer Intern to integrate student association data for engagement strategies.</li>
                <li>Act as a TCIA student ambassador, promoting the organization's work at your university.</li>
                <li>Is a self-starter with the ability to be productive independently while hand multiple projects</li>
                <li>Perform other duties as assigned to support organizational objectives.</li>
            </ul>`,
            requirements: `<ul>
                <li>Experience in data analysis, statistical modeling, or digital marketing, with internships or projects demonstrating relevant skills.</li>
                <li>Ability to work independently, adapt to feedback, and meet deadlines.</li>
                <li>Strong analytical skills to identify trends, interpret data, and provide actionable insights.</li>
                <li>Experience with audience segmentation and marketing persona development.</li>
                <li>Ability to conduct research on algorithms, social media platforms, and market trends.</li>
                <li>Proficiency in programming languages such as Python and R.</li>
                <li>Familiarity with data visualization tools like Power BI and Tableau.</li>
                <li>Experience with statistical tools and software (e.g., Excel, SPSS, SAS).</li>
                <li>Knowledge of digital marketing platforms and tools (e.g., Google Analytics, Google Ads).</li>
                <li>Understanding of SEO principles, keyword research, and algorithm analysis.</li>
                <li>Ability to develop predictive algorithms and perform data mining.</li>
                <li>Interest in digital marketing, data science, and analytics.</li>
                <li>Demonstrated problem-solving abilities and creativity in developing solutions.</li>
                <li>Enthusiasm for collaborating on initiatives such as D4PG conference planning and university engagement.</li>
            </ul>`,
            applicationNote: `<p>Please attach a resume/CV and a work sample OR cover letter to apply.</p>`,
            url: "/positions/marketing-data-analyst-intern"
        },
        {
            id: 4,
            title: "Content/Copywriting Intern",
            department: "TCIA",
            type: "intern",
            description: `<p>The TCIA Summer Internship program seeks undergraduate/graduate students for a part-time paid opportunity that will run during the Spring - Summer of 2025. Interns will work up to 15 hours a week and will be paid $15-20 per hour. Start and end dates are flexible. An internship at TCIA will provide an opportunity to work with a fast-paced, growing company in Minneapolis's vibrant technology scene, although all work can be completed remotely. The purpose of the internship is to give the students professional skills and competencies as well as organizational and personal knowledge regarding the field in which they are studying.</p>

            <p>Mission of the Twin Cities Innovation Alliance (TCIA): To build and develop a problem-solving ecosystem for public interest technology, fueled by a critical mass of diverse, highly-engaged residents, policymakers, educators, visionaries, business owners, and problem-solvers made up of Black, Indigenous, and People of Color communities and coalitions.</p>

            <p>Content Writers are responsible for style and format consistency across all projects and communicating with other team members to create the best content possible. Other duties and responsibilities include:</p>

            <ul>
                <li>Completing writing projects, meeting deadlines, and following content requirements in terms of style and project specifications</li>
                <li>Revising content whenever changes are requested</li>
                <li>Help create style guides to ensure content is consistent and clear</li>
                <li>Working with internal team to define content needs</li>
                <li>Conducting research on organizational- & industry-related topics (combining online sources, interviews, and studies)</li>
                <li>Optimizing articles for SEO and accessibility</li>
                <li>Writing clear, engaging content for blogs, case studies, video scripts, infographics and other assets to promote our programs, events, and broader work</li>
                <li>Identifying gaps in content and recommending new topics</li>
                <li>Writing and editing content to ensure voice, grammar and style is on point; Prepare well-structured drafts using Content Management Systems</li>
                <li>Promote content on social media platforms</li>
                <li>Staying up to date on related topics to support content development</li>
                <li>Distilling complex concepts and language into content that is easily understood</li>
                <li>Working closely with internal stakeholders to ensure alignment and consistency in messaging, branding, and style</li>
                <li>Managing and completing work on time for multiple content writing projects</li>
                <li>Create editorial calendars</li>
                <li>Proofread and edit blog posts before publication</li>
                <li>Submit work to editors for input and approval</li>
                <li>Coordinate with marketing and design teams to have written content turned into illustrated articles</li>
                <li>Conduct keyword research, apply SEO guidelines to boost web traffic, maintain consistency in style, fonts, images, and tone, and update website content as needed</li>
            </ul>`,
            requirements: ``,
            applicationNote: `<p>Please attach a resume/CV and a work sample OR cover letter to apply.</p>`,
            url: "/positions/content-intern"
        },
        {
            id: 5,
            title: "Digital Marketing & Graphic Design Intern",
            department: "TCIA",
            type: "intern",
            description: `<p>The TCIA Summer Internship program seeks undergraduate/graduate students for a part-time paid opportunity that will run during the Spring - Summer of 2025. Interns will work up to 15 hours a week and will be paid $15-20 per hour. Start and end dates are flexible. An internship at TCIA will provide an opportunity to work with a fast-paced, growing company in Minneapolis's vibrant technology scene, although all work can be completed remotely. The purpose of the internship is to give the students professional skills and competencies as well as organizational and personal knowledge regarding the field in which they are studying.</p>

            <p>Mission of the Twin Cities Innovation Alliance (TCIA): To build and develop a problem-solving ecosystem for public interest technology, fueled by a critical mass of diverse, highly engaged residents, policymakers, educators, visionaries, business owners, and problem-solvers made up of Black, Indigenous, and People of Color communities and coalitions.</p>

            <ul>
                <li>Develop and implement engaging graphics and marketing content, including visual designs for reports, articles, and events.</li>
                <li>Attend team meetings, iteration and Program Planning</li>
                <li>Manage projects effectively to meet deadlines, adapting quickly to feedback.</li>
                <li>Collaborate within the team to achieve desired outcomes and proactively suggest solutions to improve marketing results.</li>
                <li>Lead the creation of a brand and style guide in collaboration with team members.</li>
                <li>Conduct social media and email marketing for TCIA programs and events, including drafting, editing, and recommending content.</li>
                <li>Support email marketing through audience segmentation, calendar maintenance, and strategic recommendations.</li>
                <li>Contribute to campaign strategies by researching competitors, identifying target audiences, and recommending best practices.</li>
                <li>Analyze and report on marketing performance, engagement rates, and campaign outcomes.</li>
                <li>Assist with the implementation of additional related projects and tasks.</li>
            </ul>`,
            requirements: `<ul>
                <li>Competence graphic design software such as Adobe, Affinity, Canva, etc.</li>
                <li>Competence working knowledge of social media platforms, including and not limited to Google, LinkedIn, BlueSky, Twitter, and CMS, like Squarespace and WordPress</li>
                <li>Competence, Google Workspace and working knowledge of Office 365</li>
                <li>Strong attention to detail, excellent communication skills (written, oral, interpersonal) and a knack for grammar</li>
                <li>Perform market analysis using Google Analytics, Hootsuite Analytics, Squarespace analytics and research on the competitive landscape including evaluation of competitor marketing, positioning, and digital content</li>
                <li>Contribute to the creation of mock-ups, email campaigns, and social media content</li>
                <li>Help design and present new social media campaign ideas and monitor all social media platforms for trending news, ideas, and feedback</li>
                <li>A self-starter with the ability to be productive independently while hand multiple projects</li>
            </ul>`,
            applicationNote: `<p>Please attach a resume and a brief sample of your graphic design work in Adobe, Affinity, Canva, or similar software to apply.</p>`,
            url: "/positions/strategy-intern"
        }
    ];

    // Add active filters tracking
    const activeFilters = {
        department: new Set(),
        type: new Set()
    };

    function filterPositions(searchTerm = '') {
        return positions.filter(position => {
            // Check if position matches search term
            const matchesSearch = position.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                position.department.toLowerCase().includes(searchTerm.toLowerCase());

            // Check if position matches department filters
            const matchesDepartment = activeFilters.department.size === 0 || 
                                    activeFilters.department.has(position.department.toLowerCase());

            // Check if position matches type filters
            const matchesType = activeFilters.type.size === 0 ||
                              activeFilters.type.has(position.type);

            return matchesSearch && matchesDepartment && matchesType;
        });
    }

    function renderPositions(positionsToRender = positions) {
        const container = document.getElementById('positions-container');
        if (!container) return;
        
        container.innerHTML = '';

        positionsToRender.forEach(position => {
            const positionElement = document.createElement('a');
            positionElement.href = 'javascript:void(0)'; // Prevent default link behavior
            positionElement.className = 'position-row';
            positionElement.innerHTML = `
                <div class="position-cell position-title">${position.title}</div>
                <div class="position-cell">
                    ${position.department}
                    <svg class="arrow-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M12 4L20 12L12 20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
            `;
            positionElement.addEventListener('click', () => showRoleDescription(position));
            container.appendChild(positionElement);
        });
    }
    
    document.addEventListener('DOMContentLoaded', function() {
        // Generate dropdown content from data structure
        function populateDropdowns() {
            Object.keys(filterOptions).forEach(filterType => {
                const dropdown = document.getElementById(`${filterType}-dropdown`);
                const options = filterOptions[filterType];
                
                options.forEach(option => {
                    const label = document.createElement('label');
                    label.className = 'dropdown-item';
                    label.innerHTML = `
                        <input type="checkbox" name="${filterType}" value="${option.value}">
                        <span>${option.label}</span>
                    `;
                    dropdown.appendChild(label);
                });
            });
        }
    
        // Initialize dropdowns
        populateDropdowns();
        
        // Initialize positions list
        renderPositions();

        // Update checkbox change handler
        document.addEventListener('change', function(event) {
            if (event.target.matches('.dropdown-item input[type="checkbox"]')) {
                const filterType = event.target.name;
                const filterValue = event.target.value;
                
                if (event.target.checked) {
                    activeFilters[filterType].add(filterValue);
                } else {
                    activeFilters[filterType].delete(filterValue);
                }

                // Get current search term
                const searchTerm = document.querySelector('.search-input')?.value || '';
                
                // Apply both filters and search
                const filteredPositions = filterPositions(searchTerm);
                renderPositions(filteredPositions);
            }
        });

        // Update search input handler to include filters
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
            searchInput.addEventListener('input', function(e) {
                const searchTerm = e.target.value;
                const filteredPositions = filterPositions(searchTerm);
                renderPositions(filteredPositions);
            });
        }

        // Close dropdowns when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.filter-dropdown')) {
                closeAllDropdowns();
            }
        });
        // Toggle dropdown when clicking filter button
        const filterButtons = document.querySelectorAll('.filter-button');
        filterButtons.forEach(button => {
            button.addEventListener('click', function(event) {
                event.stopPropagation();
                const dropdown = this.parentElement.querySelector('.dropdown-content');
                const isOpen = dropdown.classList.contains('show');
                
                // Close all dropdowns first
                closeAllDropdowns();
                
                if (!isOpen) {
                    dropdown.classList.add('show');
                    this.classList.add('active');
                }
            });
        });

        // Update the apply button click handler
        document.querySelector('.apply-button').addEventListener('click', () => {
            const formWrapper = document.querySelector('.form-wrapper');
            const mainSection = document.querySelector('.intern-search-main');
            
            // Move form to the bottom of the main section if it's not already there
            mainSection.appendChild(formWrapper);
            
            // Show form
            formWrapper.classList.add('show');
            
            // Scroll to form with some padding at the top
            formWrapper.scrollIntoView({ behavior: 'smooth', block: 'start' });
            
            // Add some padding to ensure proper spacing
            mainSection.style.paddingBottom = '4rem';
        });

        // Modify the back button handler
        document.querySelector('.back-button').addEventListener('click', () => {
            const positionsList = document.querySelector('.positions-list');
            const roleDescription = document.querySelector('.role-description');
            const formWrapper = document.querySelector('.form-wrapper');
            const mainSection = document.querySelector('.intern-search-main');
            
            // Show positions list and hide role description and form
            positionsList.style.display = 'block';
            roleDescription.style.display = 'none';
            formWrapper.classList.remove('show');
            
            // Reset padding
            mainSection.style.paddingBottom = 'var(--spacing-4xl)';
        });

        // Listen for clicks on the Squarespace submit button
        document.addEventListener('click', function(event) {
            // Check if the clicked element is the form submit button or one of its children
            const submitButton = event.target.closest('.form-submit-button');
            if (submitButton) {
                // Get current position ID
                const currentPositionTitle = document.querySelector('.role-title').textContent;
                const currentPosition = positions.find(p => p.title === currentPositionTitle);
                
                if (!currentPosition) return;
                
                // Check if user has already applied
                const appliedPositions = JSON.parse(localStorage.getItem('appliedPositions') || '[]');
                
                if (appliedPositions.includes(currentPosition.id)) {
                    // Prevent form submission
                    event.preventDefault();
                    event.stopPropagation();
                    
                    // Show message
                    showApplicationMessage('You have already applied for this position. Thank you for your interest!');
                } else {
                    // Allow form submission but record that they've applied
                    // We'll do this by listening for the form's submit event
                    const form = submitButton.closest('form');
                    if (form) {
                        form.addEventListener('submit', function() {
                            // Save to localStorage that user has applied
                            appliedPositions.push(currentPosition.id);
                            localStorage.setItem('appliedPositions', JSON.stringify(appliedPositions));
                            
                            // Set a timeout to remove extra space after successful submission
                            setTimeout(function() {
                                const mainSection = document.querySelector('.intern-search-main');
                                const formWrapper = document.querySelector('.form-wrapper');
                                
                                if (mainSection && formWrapper) {
                                    // Reset padding
                                    mainSection.style.paddingBottom = 'var(--spacing-4xl)';
                                    // Hide form wrapper
                                    formWrapper.classList.remove('show');
                                }
                            }, 5000); // Check after 2 seconds - adjust as needed
                        });
                    }
                }
            }
        });
        
        // Function to show application message
        function showApplicationMessage(message) {
            // Remove any existing message
            const existingMessage = document.querySelector('.application-message');
            if (existingMessage) {
                existingMessage.remove();
            }
            
            // Create message element
            const messageElement = document.createElement('div');
            messageElement.className = 'application-message';
            messageElement.innerHTML = `
                <div class="message-content">
                    <button class="message-close">&times;</button>
                    <p>${message}</p>
                </div>
            `;
            
            // Add to page
            document.body.appendChild(messageElement);
            
            // Add event listener to close button
            messageElement.querySelector('.message-close').addEventListener('click', () => {
                messageElement.remove();
            });
            
            // Auto-remove after 5 seconds
            setTimeout(() => {
                if (document.body.contains(messageElement)) {
                    messageElement.remove();
                }
            }, 5000);
        }
    });

    function closeAllDropdowns() {
        document.querySelectorAll('.dropdown-content').forEach(dropdown => {
            dropdown.classList.remove('show');
        });
        document.querySelectorAll('.filter-button').forEach(button => {
            button.classList.remove('active');
        });
    }

    // Update the showRoleDescription function to check if user already applied
    function showRoleDescription(position) {
        const positionsList = document.querySelector('.positions-list');
        const roleDescription = document.querySelector('.role-description');
        
        // Update role title
        roleDescription.querySelector('.role-title').textContent = position.title;
        
        // Update description section
        const descriptionText = roleDescription.querySelector('.role-description-text');
        const descriptionSection = descriptionText.closest('.role-section');
        if (position.description && position.description.trim()) {
            descriptionSection.style.display = 'block';
            descriptionText.innerHTML = position.description;
        } else {
            descriptionSection.style.display = 'none';
        }
        
        // Update requirements section
        const requirementsText = roleDescription.querySelector('.role-requirements');
        const requirementsSection = requirementsText.closest('.role-section');
        if (position.requirements && position.requirements.trim()) {
            requirementsSection.style.display = 'block';
            requirementsText.innerHTML = position.requirements;
        } else {
            requirementsSection.style.display = 'none';
        }
        
        // Check if user has already applied for this position
        const appliedPositions = JSON.parse(localStorage.getItem('appliedPositions') || '[]');
        const applyButton = roleDescription.querySelector('.apply-button');
        
        if (appliedPositions.includes(position.id)) {
            // User has already applied - disable button and change text
            applyButton.disabled = true;
            applyButton.textContent = 'Application Submitted';
            applyButton.style.backgroundColor = '#888'; // Gray out the button
            applyButton.style.cursor = 'not-allowed';
            
            // Add a note about the previous application
            const existingNote = roleDescription.querySelector('.application-submitted-note');
            if (!existingNote) {
                const noteElement = document.createElement('div');
                noteElement.className = 'application-submitted-note';
                noteElement.innerHTML = '<p>You have already submitted an application for this position.</p>';
                noteElement.style.color = 'var(--tcia-yellow)';
                noteElement.style.marginTop = 'var(--spacing-md)';
                noteElement.style.fontStyle = 'italic';
                applyButton.insertAdjacentElement('afterend', noteElement);
            }
        } else {
            // Reset button if user hasn't applied
            applyButton.disabled = false;
            applyButton.textContent = 'Apply Now';
            applyButton.style.backgroundColor = ''; // Reset to default
            applyButton.style.cursor = '';
            
            // Remove any existing note
            const existingNote = roleDescription.querySelector('.application-submitted-note');
            if (existingNote) {
                existingNote.remove();
            }
        }
        
        // Remove any existing application note
        const existingAppNote = roleDescription.querySelector('.application-note');
        if (existingAppNote) {
            existingAppNote.remove();
        }
        
        // Add new application note after the last visible section
        if (position.applicationNote) {
            const lastVisibleSection = [...roleDescription.querySelectorAll('.role-section')]
                .filter(section => section.style.display !== 'none')
                .pop();
            
            if (lastVisibleSection) {
                const noteWrapper = document.createElement('div');
                noteWrapper.className = 'application-note';
                noteWrapper.innerHTML = position.applicationNote;
                lastVisibleSection.insertAdjacentElement('afterend', noteWrapper);
            }
        }
        
        // Hide positions list and show role description
        positionsList.style.display = 'none';
        roleDescription.style.display = 'block';
    }

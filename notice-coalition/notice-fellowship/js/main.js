document.addEventListener('DOMContentLoaded', function() {
    // ===== Navigation Smooth Scroll =====
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Handle URL hash on page load
    if (window.location.hash) {
        const targetId = window.location.hash.substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            setTimeout(function() {
                const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }, 300);
        }
    }

    // ===== Fellow Modal Functionality =====
    const fellowCards = document.querySelectorAll('.fellow-card');
    const fellowModal = document.getElementById('fellowModal');
    const fellowModalClose = fellowModal.querySelector('.modal-close');
    const bioImage = fellowModal.querySelector('.fellow-bio-image');
    const bioName = fellowModal.querySelector('.fellow-bio-name');
    const bioLocation = fellowModal.querySelector('.fellow-bio-location');
    const bioText = fellowModal.querySelector('.fellow-bio-text');

    const fellowData = {
        'Tammie Lang': {
            location: 'Houston, TX',
            bio: [
                'Tammie Lang Campbell is a nationally recognized, award-winning civil rights leader and founder of the Honey Brown Hope Foundation, a non-profit organization that provides resources and support connected to its causes civil rights and environmental stewardship. She has nearly three decades of experience advocating for criminal justice policy reform; addressing disparaging disciplinary policies fueling the school-to-prison pipeline; promoting environmental stewardship; and sharing the untold history of the civil rights era with youth and their families. Campbell is also an author and sought- after speaker who has received numerous national, state and local awards for her work. She is a graduate of Alcorn State University and considers her two adult children, Shar-day and Dennis Jr., as her greatest blessings.'
            ]
        },
        'Christianna Thomas': {
            location: 'Houston, TX',
            bio: [
                'Christianna Thomas (she/her) is a junior at Heights High School in Houston Texas. She has galvanized protest against the HISD takeover as well as helped to organize local and state action across Texas, via educational boot camps and seminars for students.'
            ]
        },
        'Chinelo': {
            location: 'Houston, TX',
            bio: [
                'Hello! My name is Chinelo, I use she/her pronouns and I\'m excited to be a fellow!! I\'m a recent graduate of the University of Houston and also based in Houston. Fun fact about me, I played the clarinet middle school through college!'
            ]
        },
        'Shayna': {
            location: 'Minneapolis, MN',
            bio: [
                'A first-generation Asian American woman, Shayna is the daughter of social worker Pooi Seong Koong and doctor Philip Karuman. She is a middle sister to Zara and Avisha karuman two incredibly smart and strong women. She has also been shaped by several incredible educators including Cathy Weber Schwartz, Rashonda Ross, and Hollie Mackey, learning additionally from numerous community leaders, storytellers, aunties, uncles, and especially friends. other communities she has been a part of include Boston, Pittsburgh, Carmel, Minot and Singapore and Ipoh, Malaysia. Moving frequently has played a large part in how Shayna connects with others as well as recognizing the opportunity to translate emotion and otherness into art and opportunity.',
                'Inspired and Enraged by the rise in police brutality and asian american hate during and following Covid 19, during her bachelor\'s and master\'s degrees at North Dakota State University, shayna began to organize with other wonderful Asian American students and BIPOC youth to process and translate their shared realities into opportunities with the greater AAPI community. Co-Founder of the Asian Night Market alongside Hannah Flohr and Sacred Mauricio, Shayna enjoys furthering opportunities for AAPI entrepreneurs and organizations to connect with the Fargo Moorhead community. In the third year of its existence, the Asian night market has hosted about 30 different AAPI vendors across several industries growing from 500 to 1,400 attendees and is building an online community and database for AAPI entrepreneurship.',
                'Themes such as identity and love are Shayna\'s main inspiration and story behind her art and community organizing. Studying architecture, shayna is encouraged by the application of design principles and processes throughout racial justice and civic engagement. In Shayna\'s free time, she enjoys volunteering with organizations aiding in food security,playing rugby and experimenting with photography, textile dyeing and portraiture. Participation in her community helps ground her beliefs and understanding of the way others navigate their goals and identity. Recently relocating from the Fargo, Moorhead Area Shayna is honored to continue organizing in both communities in an effort to connect and grow intersection context around the histories of AAPI Racial Justice and activism amongst the legacy of Hmong, Vietnamese, and Laotian organizing.'
            ]
        },
        'Jeremy': {
            location: 'Houston, TX',
            bio: [
                'Hi y\'all! I\'m Jeremy, I use he/they pronouns, and I\'m a teacher, union organizer, writer, and education activist. I\'m of Trinidadian heritage and I\'ve lived in Houston for 14 years.'
            ]
        },
        'Vanessa Dominguez': {
            location: 'Chicago, IL',
            bio: [
                'Hi! My name is Vanessa Dominguez (she/her/ella) and I am a Chicago-based youth organizer with the Brighton Park Neighborhood Council. My organizing focuses on empowering young people on the southwest side, cultivating their leadership and organizing skills, and amplifying their voices in city-wide, abolitionist campaigns. I am also a Masters student in the Cultural and Educational Policy Studies program at Loyola University Chicago. In my free time, I love spending time with loved ones, reading, or painting and drawing :)'
            ]
        },
        'Jonathan Rodriguez': {
            location: 'Houston, TX',
            bio: [
                'Jonathan Rodriguez is a proud Houstonian born in Fifth Ward and raised in Cloverleaf. He is eager to serve and give back to his community. He is motivated to help youth live above the odds by using his lived experience to help advocate for change in our communities. Jonathan has had to overcome adversity, and his Christian faith and education have helped him see how to change and empower others. He is particularly passionate about giving youth second chances and promoting alternatives to incarceration. Jonathan encouraged his brother, now an employee at NASA, to find himself and push for more. He hopes to do the same with the youth he serves. In his free time, he enjoys drawing portraits to uplift others. Jonathan lives by the motto, "Know yourself, and then you will be the best at what YOU can be!".'
            ]
        },
        'Joy': {
            location: 'Houston, TX',
            bio: [
                'Kill Joy\'s work is an interpretation of world mythology and a study of ancient symbols. Her practice centers around relief printmaking, painting, and puppet making. This work involves printing posters for people-led campaigns, youth workshops, painting community murals and constructing fantastical puppet theater. Mediums with a bold, graphic quality speak to the sort of narratives she enjoys exploring. Her work sits at the intersection where jungle meets desert.',
                'She was raised in Texas, but her family is from the archipelago known as the Philippines. Joy devotes time to thinking about and working with different cultural groups managing challenges and issues of the diaspora and also of the struggles faced by communities rooted in their homeland. Because community is intrinsically linked to the land, her work also incorporates themes and elements from the natural world. Stories are often told in imaginative settings: singing about Earth magic that is available to everyone, but often forgotten or hidden.'
            ]
        }
    };

    fellowCards.forEach(card => {
        card.addEventListener('click', function() {
            const img = card.querySelector('img');
            const name = img.alt.replace('NDAUWU Fellow ', '');
            const fellow = fellowData[name];

            if (fellow) {
                bioImage.src = img.src;
                bioImage.alt = img.alt;
                bioName.textContent = name;
                bioLocation.textContent = fellow.location;
                
                bioText.innerHTML = '';
                
                fellow.bio.forEach(paragraph => {
                    const p = document.createElement('p');
                    p.textContent = paragraph;
                    p.style.marginBottom = 'var(--spacing-md)';
                    bioText.appendChild(p);
                });
                
                fellowModal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });

    fellowModalClose.addEventListener('click', function() {
        fellowModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    window.addEventListener('click', function(event) {
        if (event.target === fellowModal) {
            fellowModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // ===== Essays Carousel Functionality =====
    const carousel = document.getElementById('essaysCarousel');
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');
    const indicators = document.getElementById('carouselIndicators');
    
    let currentIndex = 0;
    let essays = [];
    let cardsPerView = 3;
    
    const authorImages = {
        'Marika': 'https://images.squarespace-cdn.com/content/5b9081c58ab7224793278e1d/5540b7ab-5b4b-489f-bbe7-77e3dbf2f131/Marika-2.jpeg?content-type=image%2Fjpeg',
        'Clarence Okoh': 'https://images.squarespace-cdn.com/content/5b9081c58ab7224793278e1d/c2883652-abc2-4304-80e7-8196134100fe/Clarence+Okoh.png?content-type=image%2Fpng',
        'Chelsea Barabas': 'https://images.squarespace-cdn.com/content/5b9081c58ab7224793278e1d/1cb385a7-00fb-4d21-b3b1-ca9e91113403/DN-Chelsea-Barabas--removebg-preview.png?content-type=image%2Fpng',
        'Chelsea': 'https://images.squarespace-cdn.com/content/5b9081c58ab7224793278e1d/1cb385a7-00fb-4d21-b3b1-ca9e91113403/DN-Chelsea-Barabas--removebg-preview.png?content-type=image%2Fpng',
        'Tammie Lang Campbell': 'https://images.squarespace-cdn.com/content/5b9081c58ab7224793278e1d/0424f978-c6c8-437a-b310-bf03f110d3cc/Notice+Logo+Design+F-02.png?content-type=image%2Fpng',
        'Christianna Thomas': 'https://images.squarespace-cdn.com/content/5b9081c58ab7224793278e1d/0424f978-c6c8-437a-b310-bf03f110d3cc/Notice+Logo+Design+F-02.png?content-type=image%2Fpng',
        'Vanessa Dominguez': 'https://images.squarespace-cdn.com/content/5b9081c58ab7224793278e1d/0424f978-c6c8-437a-b310-bf03f110d3cc/Notice+Logo+Design+F-02.png?content-type=image%2Fpng',
        'Joy (Kill Joy)': 'https://images.squarespace-cdn.com/content/5b9081c58ab7224793278e1d/0424f978-c6c8-437a-b310-bf03f110d3cc/Notice+Logo+Design+F-02.png?content-type=image%2Fpng',
        'Shayna Karuman': 'https://images.squarespace-cdn.com/content/5b9081c58ab7224793278e1d/0424f978-c6c8-437a-b310-bf03f110d3cc/Notice+Logo+Design+F-02.png?content-type=image%2Fpng',
        'Jeremy Rodriguez': 'https://images.squarespace-cdn.com/content/5b9081c58ab7224793278e1d/0424f978-c6c8-437a-b310-bf03f110d3cc/Notice+Logo+Design+F-02.png?content-type=image%2Fpng',
        'Jonathan Rodriguez': 'https://images.squarespace-cdn.com/content/5b9081c58ab7224793278e1d/0424f978-c6c8-437a-b310-bf03f110d3cc/Notice+Logo+Design+F-02.png?content-type=image%2Fpng'
    };
    
    const defaultAuthorImage = 'https://images.squarespace-cdn.com/content/5b9081c58ab7224793278e1d/0424f978-c6c8-437a-b310-bf03f110d3cc/Notice+Logo+Design+F-02.png?content-type=image%2Fpng';
    
    function createEssayCard(essay, index) {
        const isLatest = index === 0;
        return `
            <div class="essay-card ${isLatest ? 'latest-essay' : ''}" data-essay-id="${essay.id || 'default'}">
                <div class="essay-card-image" style="background-image: url('${essay.image_url || 'https://images.squarespace-cdn.com/content/5b9081c58ab7224793278e1d/1f54c545-b44e-4bb5-b1c5-02ac5efee0a9/F6.png?content-type=image%2Fpng'}')">
                </div>
                <div class="essay-card-content">
                    <div class="essay-card-source">${essay.source || 'NOTICE Coalition'}</div>
                    <h3 class="essay-card-title">${essay.title}</h3>
                    <p class="essay-card-excerpt">${essay.excerpt || 'Afrofuturist reflections on building grassroots infrastructures for digital liberation.'}</p>
                    <div class="essay-card-date">${essay.date || 'Coming Soon'}</div>
                </div>
            </div>
        `;
    }
    
    function updateCarousel() {
        if (essays.length === 1) {
            carousel.style.transform = 'translateX(0)';
            carousel.style.justifyContent = 'center';
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
            indicators.style.display = 'none';
        } else {
            carousel.style.justifyContent = 'flex-start';
            const translateX = -(currentIndex * (550 + 32));
            carousel.style.transform = `translateX(${translateX}px)`;
            prevBtn.style.display = 'flex';
            nextBtn.style.display = 'flex';
            indicators.style.display = 'flex';
            prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
            nextBtn.style.opacity = currentIndex >= essays.length - cardsPerView ? '0.5' : '1';
        }
        
        updateIndicators();
    }
    
    function updateIndicators() {
        indicators.innerHTML = '';
        const totalIndicators = Math.max(1, essays.length - cardsPerView + 1);
        
        for (let i = 0; i < totalIndicators; i++) {
            const indicator = document.createElement('button');
            indicator.className = `carousel-indicator ${i === currentIndex ? 'active' : ''}`;
            indicator.addEventListener('click', () => {
                currentIndex = i;
                updateCarousel();
            });
            indicators.appendChild(indicator);
        }
    }
    
    function initCarousel() {
        essays = [
            {
                id: 'seeds-of-kinship-essay',
                title: 'Seeds of Kinship: Building Intergenerational Advocacy for Digital Liberation',
                authors: 'Chelsea Barabas & Clarence Okoh',
                caption: 'STORYTELLING PROJECT',
                excerpt: 'What does it mean for children to learn on land where Black life has long been punished rather than protected? Two fellows bridge generations in Fort Bend County, Texas.',
                source: 'NOTICE Coalition',
                date: 'October 20, 2025',
                image_url: 'https://images.squarespace-cdn.com/content/5b9081c58ab7224793278e1d/2035deab-4abf-4479-a235-280b79acd173/1cH2yx8iGqe9uZud1bW3NXw.jpg?content-type=image%2Fjpeg',
                substack_url: '',
                medium_url: 'https://medium.com/@TwinCitiesInnovationAlliance/seeds-of-kinship-building-intergenerational-advocacy-for-digital-liberation-df8cf3514a2a',
                content: [
                    { type: 'text', content: '<em>This essay draws on the <a href="https://www.tciamn.org/noticecoalition/fellowship" target="_blank" rel="noopener noreferrer">No Data About Us Without Us Fellowship</a>, a program led by the <a href="https://www.tciamn.org/noticecoalition" target="_blank" rel="noopener noreferrer">NOTICE Coalition: No Tech Criminalization in Education</a> and the Edgelands Institute.</em>' },
                    { type: 'text', content: '...' },
                    { type: 'text', content: 'What does it mean for children to learn on land where Black life has long been punished rather than protected?' },
                    { type: 'text', content: '<strong>What does it mean for children to learn on land where Black life has long been punished rather than protected?</strong>' },
                    { type: 'text', content: 'This question has shaped the work of two fellows in the No Data About Us Without Us fellowship — Tammie Lang Campbell and Chinelo Dike — who came to their work on youth surveillance from different generations but the same place: Fort Bend County, Texas.' },
                    { type: 'image', url: 'https://images.squarespace-cdn.com/content/5b9081c58ab7224793278e1d/2035deab-4abf-4479-a235-280b79acd173/1cH2yx8iGqe9uZud1bW3NXw.jpg?content-type=image%2Fjpeg', credit: 'Image by <a href="https://www.linkedin.com/in/hawwa-youngmark-114a361a4/" target="_blank" rel="noopener noreferrer">Hawwa Youngmark</a>' },
                    { type: 'text', content: 'Ms. Tammie and Chinelo\'s paths first crossed in 2020 when Chinelo reached out to her for guidance and support concerning her efforts to organize a peer advocacy group to confront discriminatory policies in Fort Bend School District. As a longtime parent advocate, Ms. Tammie had spent decades defending children from punitive school discipline in Fort Bend. Chinelo, then a high school student and co-founder of the <strong><a href="https://www.instagram.com/fbisdequity/" target="_blank" rel="noopener noreferrer">Fort Bend ISD Equity Coalition</a></strong>, was busy <a href="https://docs.google.com/document/d/11md_ejgk3kvTc8tgj0f6818KGImI2wOWO-LFMmL43Kw/edit?tab=t.0#heading=h.qjvsu6vuahyp" target="_blank" rel="noopener noreferrer">formulating a set of demands for the district</a> — clear, specific changes that might make their schools places of care rather than control.' },
                    { type: 'text', content: 'Ms. Tammie served as a mentor and sounding board, helping Chinelo think through how to make her demands heard.' },
                    { type: 'text', content: 'Over time, their bond of mentorship evolved into mutual learning, and in their fellowship, they worked together to link Fort Bend\'s long legacy of racialized discipline with the wider fight for digital liberation.' }
                ]
            },
            {
                id: 'digital-liberation-essay',
                title: '"No Data About Us Without Us": An Afrofuturist Reflection on Building Grassroots Infrastructures for Digital Liberation',
                authors: 'Clarence Okoh & Chelsea Barabas',
                caption: 'STORYTELLING PROJECT',
                excerpt: 'Who do you call when AI labels your child a criminal? An investigation into how racialized patterns of school policing are rearticulated through digital technologies.',
                source: 'NOTICE Coalition',
                date: 'January 2025',
                image_url: 'https://images.squarespace-cdn.com/content/5b9081c58ab7224793278e1d/01c5cfd5-78ec-4882-a0fe-dd443f0f4616/fellows-img-1.png?content-type=image%2Fpng',
                substack_url: 'https://thenoticecoalition.substack.com/p/no-data-about-us-without-us',
                medium_url: 'https://medium.com/@noticecoalition/dummy-link-1',
                content: [
                    { type: 'text', content: 'Who do you call when AI labels your child a criminal?' },
                    { type: 'text', content: 'By the time Tammie Lang Campbell <a href="https://sacobserver.com/2024/11/digital-missteps-leave-long-lasting-criminal-scars-for-black-students/" target="_blank" rel="noopener noreferrer">answered her phone</a> to speak with the distraught family, their 14-year-old child had been locked in a central Texas juvenile detention facility for three days. He\'d been arrested during his first-period class—handcuffed at school, taken without his parents\' knowledge, and sent to a prison for children.' },
                    { type: 'text', content: 'His charge? Making a joke on social media that authorities deemed a "terroristic threat."' },
                    { type: 'text', content: 'For Tammie, a <a href="https://www.honeybrownhope.org/" target="_blank" rel="noopener noreferrer">longtime advocate</a> for Black families navigating the harsh terrain of school discipline through the Honey Brown Hope Foundation, much of this story was disturbingly familiar. For years, she had stood at the frontlines with families, helping them protect their children from the school-to-prison pipeline.' },
                    { type: 'text', content: 'But this time felt different. This case wasn\'t just another example of racialized discipline—it was a warning sign. A new frontier.' },
                    { type: 'text', content: 'And for Tammie Campbell, it was confirmation that the systems she\'d been fighting for decades were evolving in insidious ways through digitized surveillance.' },
                    { type: 'text', content: '"The surveillance, the monitoring of students, that\'s not new," Tammie explained in a recent interview, "What is new is the data-driven technology that\'s being used to advance the school to prison pipeline and how it\'s being used under the guise of school safety and technology advancement for students to be able to compete in a global society."' }
                ]
            }
        ];
        
        carousel.innerHTML = essays.map((essay, index) => createEssayCard(essay, index)).join('');
        
        updateCardsPerView();
        updateIndicators();
        
        const essayCards = carousel.querySelectorAll('.essay-card');
        essayCards.forEach(card => {
            card.addEventListener('click', function() {
                const essayId = this.dataset.essayId;
                const essay = essays.find(e => e.id === essayId);
                if (essay) {
                    openEssayModal(essay);
                }
            });
        });
    }
    
    function updateCardsPerView() {
        if (window.innerWidth <= 768) {
            cardsPerView = 1;
        } else if (window.innerWidth <= 1024) {
            cardsPerView = 2;
        } else {
            cardsPerView = 3;
        }
        
        if (currentIndex > essays.length - cardsPerView) {
            currentIndex = Math.max(0, essays.length - cardsPerView);
        }
        
        updateCarousel();
    }
    
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });
    
    nextBtn.addEventListener('click', () => {
        if (currentIndex < essays.length - cardsPerView) {
            currentIndex++;
            updateCarousel();
        }
    });
    
    window.addEventListener('resize', updateCardsPerView);
    
    function openEssayModal(essay) {
        const modal = document.getElementById('essayModal');
        const modalImage = modal.querySelector('.essay-header-image');
        const modalCaption = modal.querySelector('.essay-caption');
        const modalTitle = modal.querySelector('.essay-title');
        const modalAuthors = modal.querySelector('.essay-authors');
        const modalContent = modal.querySelector('.essay-content');
        const modalContainer = modal.querySelector('.essay-modal-content');
        
        const existingAuthorImages = modalContainer.querySelectorAll('.essay-author-images');
        existingAuthorImages.forEach(img => img.remove());
        
        modalImage.src = essay.image_url;
        modalImage.alt = essay.title;
        modalCaption.textContent = essay.caption;
        modalTitle.textContent = essay.title;
        modalAuthors.textContent = `By ${essay.authors}`;
        
        const authors = essay.authors.split(' & ').map(author => author.trim());
        authors.forEach((author, index) => {
            const authorImageContainer = document.createElement('div');
            authorImageContainer.className = `essay-author-images ${index % 2 === 0 ? 'essay-author-left' : 'essay-author-right'}`;
            
            const authorImage = document.createElement('div');
            authorImage.className = 'essay-author-image';
            
            const authorImg = document.createElement('img');
            authorImg.src = authorImages[author] || defaultAuthorImage;
            authorImg.alt = author;
            
            authorImage.appendChild(authorImg);
            authorImageContainer.appendChild(authorImage);
            document.body.appendChild(authorImageContainer);
        });
        
        function updateAuthorImagePositions() {
            const authorImages = document.querySelectorAll('.essay-author-images');
            const modal = document.getElementById('essayModal');
            const modalContent = modal.querySelector('.essay-modal-content');
            
            if (!modal.style.display || modal.style.display === 'none') {
                return;
            }
            
            const modalRect = modalContent.getBoundingClientRect();
            const modalTop = modalRect.top;
            const modalBottom = modalRect.bottom;
            
            const viewportHeight = window.innerHeight;
            const imageHeight = 150;
            
            let targetTop = Math.max(modalTop + 100, Math.min(modalBottom - imageHeight - 100, (viewportHeight - imageHeight) / 2));
            
            authorImages.forEach(img => {
                img.style.top = `${targetTop}px`;
            });
        }
        
        const scrollHandler = () => updateAuthorImagePositions();
        window.addEventListener('scroll', scrollHandler);
        window.addEventListener('resize', scrollHandler);
        
        modal.scrollHandler = scrollHandler;
        
        setTimeout(() => {
            updateAuthorImagePositions();
        }, 100);
        
        modalContent.innerHTML = '';
        essay.content.forEach(item => {
            if (item.type === 'text') {
                const p = document.createElement('p');
                p.innerHTML = item.content;
                modalContent.appendChild(p);
            } else if (item.type === 'image') {
                const imageContainer = document.createElement('div');
                imageContainer.style.margin = 'var(--spacing-2xl) 0';
                imageContainer.style.textAlign = 'center';
                
                const img = document.createElement('img');
                img.src = item.url;
                img.alt = 'Essay image';
                img.style.maxWidth = '100%';
                img.style.height = 'auto';
                img.style.borderRadius = '8px';
                img.style.marginBottom = 'var(--spacing-md)';
                
                imageContainer.appendChild(img);
                
                if (item.credit) {
                    const credit = document.createElement('p');
                    credit.innerHTML = item.credit;
                    credit.style.fontSize = 'var(--font-size-sm)';
                    credit.style.color = 'var(--notice-text-secondary)';
                    credit.style.fontStyle = 'italic';
                    credit.style.marginTop = 'var(--spacing-sm)';
                    imageContainer.appendChild(credit);
                }
                
                modalContent.appendChild(imageContainer);
            }
        });
        
        const ellipsesDiv = document.createElement('div');
        ellipsesDiv.className = 'essay-ellipses';
        ellipsesDiv.textContent = '...';
        modalContent.appendChild(ellipsesDiv);
        
        const readMoreDiv = document.createElement('div');
        readMoreDiv.className = 'essay-read-more';
        
        const readMoreText = document.createElement('p');
        readMoreText.className = 'essay-read-more-text';
        readMoreText.textContent = 'Continue reading the full essay';
        
        const linksContainer = document.createElement('div');
        linksContainer.className = 'essay-external-links';
        
        if (essay.substack_url && essay.substack_url.trim() !== '') {
            const substackLink = document.createElement('a');
            substackLink.href = essay.substack_url;
            substackLink.target = '_blank';
            substackLink.rel = 'noopener noreferrer';
            substackLink.className = 'essay-external-link essay-substack-link';
            substackLink.innerHTML = `
                <img src="https://images.squarespace-cdn.com/content/5b9081c58ab7224793278e1d/211166a9-1777-4257-9e9e-4d912133cc4b/substack-icon.png?content-type=image%2Fpng" alt="Substack" class="substack-icon">
                Read on Substack
            `;
            linksContainer.appendChild(substackLink);
        }
        
        if (essay.medium_url && essay.medium_url.trim() !== '') {
            const mediumLink = document.createElement('a');
            mediumLink.href = essay.medium_url;
            mediumLink.target = '_blank';
            mediumLink.rel = 'noopener noreferrer';
            mediumLink.className = 'essay-external-link essay-medium-link';
            mediumLink.innerHTML = `
                <i class="fa-brands fa-medium medium-icon"></i>
                Read on Medium
            `;
            linksContainer.appendChild(mediumLink);
        }
        
        readMoreDiv.appendChild(readMoreText);
        readMoreDiv.appendChild(linksContainer);
        modalContent.appendChild(readMoreDiv);
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    
    function closeEssayModal() {
        const essayModal = document.getElementById('essayModal');
        essayModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        const authorImages = document.querySelectorAll('.essay-author-images');
        authorImages.forEach(img => img.remove());
        
        if (essayModal.scrollHandler) {
            window.removeEventListener('scroll', essayModal.scrollHandler);
            window.removeEventListener('resize', essayModal.scrollHandler);
            essayModal.scrollHandler = null;
        }
    }
    
    const essayModal = document.getElementById('essayModal');
    const essayModalClose = essayModal.querySelector('.essay-modal-close');
    
    essayModalClose.addEventListener('click', closeEssayModal);
    
    window.addEventListener('click', function(event) {
        if (event.target === essayModal) {
            closeEssayModal();
        }
    });
    
    initCarousel();

    // ===== Scroll Progress Indicator =====
    function updateScrollProgress() {
        const scrollProgress = document.getElementById('scrollProgress');
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        scrollProgress.style.height = Math.min(scrollPercent, 100) + '%';
    }

    window.addEventListener('scroll', updateScrollProgress);
    window.addEventListener('resize', updateScrollProgress);
    
    updateScrollProgress();
});


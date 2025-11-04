document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    
    // Add click event listener to each link
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only prevent default and do smooth scroll for hash links (within the same page)
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                // Get the target section id from the href
                const targetId = this.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    // Get the height of the fixed navigation bar
                    const navHeight = document.querySelector('.notice-nav').offsetHeight;
                    
                    // Calculate the target position accounting for the nav bar
                    const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - navHeight;
                    
                    // Smooth scroll to the target
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});

async function fetchFeedData() {
    try {
        const response = await fetch('https://tcia-website.s3.us-west-2.amazonaws.com/processed_feeds.json');
        const data = await response.json();
        return data.items; // Get all items for accurate counting
    } catch (error) {
        console.error('Error fetching feed data:', error);
        return [];
    }
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

async function displayFeedItems() {
    const feedContainer = document.getElementById('feed-items');
    const allItems = await fetchFeedData();
    
    // First pass: assign essay numbers to all Storytelling Project items
    let essayCount = 0;
    const itemsWithMetadata = allItems.map(item => {
        const isStorytellingProject = item.description && item.description.includes('Storytelling Project');
        
        if (isStorytellingProject) {
            essayCount++;
            return {
                ...item,
                essayNumber: essayCount,
                isStorytellingProject: true
            };
        }
        
        return {
            ...item,
            isStorytellingProject: false
        };
    });
    
    // Get only the latest 9 items for display
    const displayItems = itemsWithMetadata.slice(0, 9);

    feedContainer.innerHTML = displayItems.map(item => {
        // Determine feed name and title based on whether it's a storytelling project
        let feedName = item.feed_name;
        let title = item.title;
        
        if (item.isStorytellingProject) {
            feedName = 'NOTICE Storytelling Project';
            title = `ESSAY #${item.essayNumber}: ${item.title}`;
        }
        
        return `
            <article class="feed-item">
                <a href="${item.link}" class="feed-item-link" target="_blank" rel="noopener noreferrer">
                    <img src="${item.image_url}" alt="${title}" class="feed-item-image">
                    <div class="feed-item-content">
                        <div class="feed-item-source">${feedName}</div>
                        <h3 class="feed-item-title">${title}</h3>
                        <p class="feed-item-description">${item.description}</p>
                        <div class="feed-item-date">${formatDate(item.pubDate)}</div>
                    </div>
                </a>
            </article>
        `;
    }).join('');
}

// Call displayFeedItems when the page loads
document.addEventListener('DOMContentLoaded', () => {
    displayFeedItems();
});
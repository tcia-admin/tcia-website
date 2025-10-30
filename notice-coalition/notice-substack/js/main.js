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
        return data.items.slice(0, 6); // Get only the latest 6 items
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
    const items = await fetchFeedData();

    feedContainer.innerHTML = items.map(item => `
        <article class="feed-item">
            <a href="${item.link}" class="feed-item-link" target="_blank" rel="noopener noreferrer">
                <img src="${item.image_url}" alt="${item.title}" class="feed-item-image">
                <div class="feed-item-content">
                    <div class="feed-item-source">${item.feed_name}</div>
                    <h3 class="feed-item-title">${item.title}</h3>
                    <p class="feed-item-description">${item.description}</p>
                    <div class="feed-item-date">${formatDate(item.pubDate)}</div>
                </div>
            </a>
        </article>
    `).join('');
}

// Call displayFeedItems when the page loads
document.addEventListener('DOMContentLoaded', () => {
    displayFeedItems();
});
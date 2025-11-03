
        // Basic Navigation System
        function turnToPage(targetChapter) {
            // Remove active state from all tabs
            document.querySelectorAll('.chapter-tabs li').forEach(tab => {
                tab.classList.remove('active');
            });
            
            // Add active state to target tab
            document.querySelector(`[data-chapter="${targetChapter}"]`).classList.add('active');
            
            // Hide all pages
            document.querySelectorAll('.page').forEach(page => {
                page.classList.add('hidden');
                page.classList.remove('current-page');
            });
            
            // Show target page
            const targetPage = document.querySelector(`[data-page="${targetChapter}"]`);
            targetPage.classList.remove('hidden');
            targetPage.classList.add('current-page');
        }

        // Add click handlers to navigation tabs (for home and library)
        document.querySelectorAll('.chapter-tabs li[data-chapter]').forEach(tab => {
            tab.addEventListener('click', function() {
                // Skip if tab is disabled
                if (this.classList.contains('disabled')) {
                    return;
                }
                
                const chapter = this.getAttribute('data-chapter');
                turnToPage(chapter);
            });
        });

        document.addEventListener('DOMContentLoaded', function() {
    const topicBoxes = document.querySelectorAll('.topic-box');
    const menuItems = document.querySelectorAll('.menu-item');
    const resourceRows = document.querySelectorAll('.resource-row');
    const resourcesTitle = document.getElementById('resources-title');
    const searchInput = document.getElementById('search-input');
    const showAllButton = document.getElementById('show-all');
    const navItems = document.querySelectorAll('.nav-item');
    const resourcesSection = document.getElementById('resources-section');
    const materialsSection = document.getElementById('materials-section');
    const searchControls = document.getElementById('search-controls');
    const topicsSection = document.getElementById('topics-section');
    const overlay = document.getElementById('popup-overlay');
    const popupContent = document.getElementById('popup-content');
    const closePopupButton = document.getElementById('close-popup');
    const popupMaterialInfo = document.getElementById('popup-material-info');
    const popupReferencesTable = document.getElementById('popup-references-table').querySelector('tbody');
    const popupReferencesSection = document.getElementById('popup-references-section');

    function filterItems(topic) {
        resourceRows.forEach(row => {
            row.style.display = row.getAttribute('data-topic') === topic || topic === 'all' ? '' : 'none';
        });
        resourcesTitle.textContent = topic === 'all' ? 'All Resources' : topic.charAt(0).toUpperCase() + topic.slice(1) + ' Resources';
        menuItems.forEach(item => item.classList.remove('selected'));
        if (topic !== 'all') {
            document.querySelector(`.menu-item[data-topic="${topic}"]`).classList.add('selected');
        }
    }

    function searchResources() {
        const searchTerm = searchInput.value.toLowerCase();
        resourceRows.forEach(row => {
            const title = row.querySelector('td').textContent.toLowerCase();
            if (title.includes(searchTerm)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }

    function showAllResources() {
        resourceRows.forEach(row => row.style.display = '');
        resourcesTitle.textContent = 'All Resources';
        topicBoxes.forEach(box => box.classList.remove('selected'));
    }

    function openPopup(materialInfoHtml, references) {
        popupMaterialInfo.innerHTML = materialInfoHtml;

        // Only show the references table if there are references
        if (references.length > 0) {
            popupReferencesTable.innerHTML = references.map(ref => `
                <tr>
                    <td><a href="${ref.href}" target="_blank">${ref.title}</a></td>
                    <td>${ref.source}</td>
                </tr>
            `).join('');
            popupReferencesSection.classList.remove('hidden');
        } else {
            popupReferencesSection.classList.add('hidden');
        }

        overlay.style.display = 'flex';
        document.body.classList.add('popup-open'); /* Prevent background scrolling */
        document.querySelector('.sqs-block-content').classList.add('blur-background'); /* Blur the background */
        popupContent.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    function closePopup() {
        overlay.style.display = 'none';
        document.body.classList.remove('popup-open'); /* Allow background scrolling */
        document.querySelector('.sqs-block-content').classList.remove('blur-background'); /* Remove blur from the background */
    }

    topicBoxes.forEach(box => {
        box.addEventListener('click', () => {
            const topic = box.getAttribute('data-topic');
            filterItems(topic);
        });
    });

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const topic = item.getAttribute('data-topic');
            filterItems(topic);
        });
    });

    searchInput.addEventListener('input', searchResources);
    showAllButton.addEventListener('click', showAllResources);

    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navItems.forEach(nav => nav.classList.remove('selected'));
            this.classList.add('selected');
            if (this.id === 'resource-list') {
                resourcesSection.classList.remove('hidden');
                searchControls.classList.remove('hidden');
                topicsSection.classList.remove('hidden');
                materialsSection.classList.add('hidden');
            } else if (this.id === 'materials') {
                materialsSection.classList.remove('hidden');
                searchControls.classList.add('hidden');
                resourcesSection.classList.add('hidden');
                topicsSection.classList.add('hidden');
            }
        });
    });

    materialsSection.addEventListener('click', function(event) {
        if (event.target.closest('.materials-item')) {
            const item = event.target.closest('.materials-item');
            const materialInfo = item.querySelector('.materials-info').cloneNode(true);

            // Remove the materials-description
            const description = materialInfo.querySelector('.materials-description');
            if (description) description.remove();

            // Only show the learn-more-buttons in the popup
            const learnMoreButtons = materialInfo.querySelectorAll('.learn-more-button');
            learnMoreButtons.forEach(button => button.style.display = 'block');

            const materialInfoHtml = materialInfo.innerHTML;
            const topic = item.getAttribute('data-topic');
            const references = Array.from(document.querySelectorAll('.reference-row'))
                .filter(row => row.getAttribute('data-topic') === topic)
                .map(row => ({
                    href: row.querySelector('a').href,
                    title: row.querySelector('a').textContent,
                    source: row.querySelector('td:nth-child(2)').textContent
                }));
            openPopup(materialInfoHtml, references);
        }
    });

    closePopupButton.addEventListener('click', closePopup);

    // Set Resource List as the default selected view
    document.getElementById('resource-list').click();
});

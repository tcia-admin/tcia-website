// Helper function to load HTML into a target element
function loadHTML(url, targetId, successMessage, errorMessage) {
  fetch(url)
    .then(response => response.text())
    .then(data => {
      document.getElementById(targetId).innerHTML = data;
      console.log(successMessage);
    })
    .catch(error => console.error(errorMessage, error));
}

// When document content is loaded, inject header and footer
document.addEventListener("DOMContentLoaded", () => {
  loadHTML(
    "https://tcia-admin.github.io/tcia-website/notice-coalition/notice-header/notice-header.html",
    "header",
    "Header loaded successfully",
    "Header load error:"
  );

  loadHTML(
    "https://tcia-admin.github.io/tcia-website/notice-coalition/notice-header/notice-footer.html",
    "footer",
    "Footer loaded successfully",
    "Footer load error:"
  );

    // Initialize hamburger menu after header loads
  setTimeout(initializeHamburgerMenu, 100);
});

// Hamburger Menu Functionality
function initializeHamburgerMenu() {
  const hamburger = document.getElementById("hamburgerMenu");
  const mobileMenu = document.getElementById("mobileMenu");

  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      mobileMenu.classList.toggle("active");
      //debugging
      console.log("menu clicked!");
    });

    // Close menu when a link is clicked
    const mobileLinks = mobileMenu.querySelectorAll("a");
    mobileLinks.forEach(link => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        mobileMenu.classList.remove("active");
      });
    });
  }
};
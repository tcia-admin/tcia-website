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
});
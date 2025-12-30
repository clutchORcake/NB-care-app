document.addEventListener("DOMContentLoaded", () => {
  const pages = document.querySelectorAll("section");
  let current = 0;

  function showPage(index) {
    pages.forEach((page, i) => {
      page.style.transform = i === index ? "rotateY(0deg)" : "rotateY(-180deg)";
      page.style.zIndex = i === index ? pages.length : pages.length - i;
    });
  }

  showPage(current);

  // Add buttons dynamically
  pages.forEach(page => {
    const nav = document.createElement("div");
    nav.className = "page-nav";

    const prevBtn = document.createElement("button");
    prevBtn.textContent = "⬅ Previous";
    prevBtn.onclick = () => {
      current = (current - 1 + pages.length) % pages.length;
      showPage(current);
    };

    const nextBtn = document.createElement("button");
    nextBtn.textContent = "Next ➡";
    nextBtn.onclick = () => {
      current = (current + 1) % pages.length;
      showPage(current);
    };

    nav.appendChild(prevBtn);
    nav.appendChild(nextBtn);
    page.appendChild(nav);
  });
});

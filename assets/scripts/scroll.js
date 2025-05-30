function checkScroll() {
  const paragraphs = document.querySelectorAll("p");
  const hasVerticalScrollbar = document.documentElement.scrollHeight > document.documentElement.clientHeight;

  paragraphs.forEach((p) => {
    // Détecter débordement vertical du contenu dans <p>
    const isOverflowingVertically = p.scrollHeight > p.clientHeight;

    if (hasVerticalScrollbar && isOverflowingVertically) {
      p.style.paddingRight = "10px";
      p.classList.add("scroll-active");
    } else {
      p.style.paddingRight = "";
      p.classList.remove("scroll-active");
    }
  });
}

document.addEventListener("DOMContentLoaded", checkScroll);
window.addEventListener("resize", checkScroll);

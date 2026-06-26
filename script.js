const menuToggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");
const header = document.querySelector("[data-header]");
const accordion = document.querySelector("[data-accordion]");
const testimonialCarousel = document.querySelector("[data-testimonial-carousel]");

const closeMenu = () => {
  document.body.classList.remove("menu-open");
  menuToggle?.setAttribute("aria-expanded", "false");
};

menuToggle?.addEventListener("click", () => {
  const isOpen = document.body.classList.toggle("menu-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

window.addEventListener("scroll", () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 12);
});

accordion?.querySelectorAll(".accordion-item").forEach((item) => {
  const button = item.querySelector("button");
  const content = item.querySelector(".accordion-content");

  button?.addEventListener("click", () => {
    const isOpen = item.classList.contains("is-open");

    accordion.querySelectorAll(".accordion-item").forEach((currentItem) => {
      currentItem.classList.remove("is-open");
      currentItem.querySelector("button")?.setAttribute("aria-expanded", "false");
      const currentContent = currentItem.querySelector(".accordion-content");
      if (currentContent) currentContent.style.maxHeight = null;
    });

    if (!isOpen && content) {
      item.classList.add("is-open");
      button.setAttribute("aria-expanded", "true");
      content.style.maxHeight = `${content.scrollHeight}px`;
    }
  });
});

if (testimonialCarousel) {
  const track = testimonialCarousel.querySelector("[data-testimonial-track]");
  const slides = Array.from(testimonialCarousel.querySelectorAll(".testimonial-slide"));
  const previousButton = testimonialCarousel.querySelector("[data-testimonial-prev]");
  const nextButton = testimonialCarousel.querySelector("[data-testimonial-next]");
  const dotsContainer = testimonialCarousel.querySelector("[data-testimonial-dots]");
  let currentSlide = 0;

  const dots = slides.map((_, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", `Ver depoimentos ${index + 1}`);
    dot.addEventListener("click", () => goToSlide(index));
    dotsContainer?.appendChild(dot);
    return dot;
  });

  const updateCarousel = () => {
    if (!track) return;

    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    dots.forEach((dot, index) => {
      dot.classList.toggle("is-active", index === currentSlide);
    });
  };

  const goToSlide = (index) => {
    currentSlide = (index + slides.length) % slides.length;
    updateCarousel();
  };

  previousButton?.addEventListener("click", () => goToSlide(currentSlide - 1));
  nextButton?.addEventListener("click", () => goToSlide(currentSlide + 1));

  updateCarousel();
}

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

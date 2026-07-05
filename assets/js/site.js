(function () {
  "use strict";

  function prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function initRandomFavicon() {
    var link = document.getElementById("site-favicon");
    if (!link) return;

    var raw = link.getAttribute("data-flags");
    if (!raw) return;

    var flags = raw.split("|").filter(Boolean);
    if (!flags.length) return;

    link.href = flags[Math.floor(Math.random() * flags.length)];
  }

  function initPageAnimations() {
    if (prefersReducedMotion()) return;

    document.body.classList.add("is-loaded");

    var cards = document.querySelectorAll(".lesson-card");
    cards.forEach(function (card, index) {
      card.style.animationDelay = Math.min(index * 0.05, 0.6) + "s";
    });

    var sections = document.querySelectorAll(".lesson-group");
    sections.forEach(function (section, index) {
      section.style.animationDelay = index * 0.12 + "s";
    });
  }

  function initScrollReveal() {
    if (prefersReducedMotion()) return;

    var targets = document.querySelectorAll(
      ".lesson-content h2, .lesson-content table, .lesson-content .dialogue, .lesson-content .question, .lesson-content .example-pair, .lesson-content .context-block"
    );

    if (!("IntersectionObserver" in window)) {
      targets.forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    targets.forEach(function (el, index) {
      el.classList.add("reveal-on-scroll");
      el.style.transitionDelay = Math.min(index * 0.04, 0.4) + "s";
      observer.observe(el);
    });
  }

  function initHeroParallax() {
    if (prefersReducedMotion()) return;

    var hero = document.querySelector(".lesson-hero");
    if (!hero) return;

    window.addEventListener(
      "scroll",
      function () {
        var offset = Math.min(window.scrollY * 0.15, 24);
        hero.style.transform = "translateY(" + offset + "px)";
      },
      { passive: true }
    );
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      initRandomFavicon();
      initPageAnimations();
      initScrollReveal();
      initHeroParallax();
    });
  } else {
    initRandomFavicon();
    initPageAnimations();
    initScrollReveal();
    initHeroParallax();
  }
})();

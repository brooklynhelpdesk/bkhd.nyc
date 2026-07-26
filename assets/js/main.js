/* BKHD — minimal vanilla JS. No dependencies. */
(function () {
  "use strict";

  // Mobile nav toggle
  var toggle = document.getElementById("navToggle");
  var links = document.getElementById("navLinks");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Current year in footer
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // UniFi card media: fall back to the SVG illustration when the photo is absent
  document.querySelectorAll("img[data-fallback]").forEach(function (img) {
    img.addEventListener("error", function handler() {
      img.removeEventListener("error", handler);
      img.src = img.getAttribute("data-fallback");
    });
  });

  // Hero: show the photo carousel only if hero-1 exists; otherwise keep the panel.
  var carousel = document.getElementById("heroCarousel");
  var dotsBox = document.getElementById("heroDots");
  if (carousel && dotsBox) {
    var slides = Array.prototype.slice.call(carousel.querySelectorAll("img"));
    var probe = new Image();
    probe.onload = function () {
      var panel = document.querySelector(".hero-panel");
      if (panel) panel.style.display = "none";
      carousel.hidden = false;
      // Drop any placeholder slots without a photo (fewer than 6 provided).
      slides.forEach(function (s) {
        s.addEventListener("error", function () {
          slides = slides.filter(function (x) { return x !== s; });
          s.remove(); render();
        });
      });
      render();
    };
    probe.src = slides[0].getAttribute("src");

    var i = 0, timer = null;
    function render() {
      dotsBox.innerHTML = "";
      slides.forEach(function (s, n) {
        s.classList.toggle("active", n === (i % slides.length));
        var d = document.createElement("button");
        d.type = "button";
        d.setAttribute("aria-label", "Show slide " + (n + 1));
        if (n === (i % slides.length)) d.classList.add("active");
        d.addEventListener("click", function () { i = n; render(); reset(); });
        dotsBox.appendChild(d);
      });
    }
    function reset() { if (timer) { clearInterval(timer); start(); } }
    function start() {
      if (slides.length < 2) return;
      timer = setInterval(function () { i = (i + 1) % slides.length; render(); }, 5000);
    }
    carousel.addEventListener("mouseenter", function () { clearInterval(timer); });
    carousel.addEventListener("mouseleave", start);
    start();
  }

  // Scroll reveal + active nav link via IntersectionObserver
  if ("IntersectionObserver" in window) {
    var revealer = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          revealer.unobserve(en.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach(function (el) { revealer.observe(el); });

    var navItems = Array.prototype.slice.call(document.querySelectorAll(".nav-links a[href^='#']"));
    var sections = navItems
      .map(function (a) { return document.querySelector(a.getAttribute("href") === "#top" ? "#top" : a.getAttribute("href")); })
      .filter(Boolean);
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var id = en.target.id;
        navItems.forEach(function (a) {
          var href = a.getAttribute("href");
          a.classList.toggle("active", href === "#" + id || (id === "top" && href === "#top"));
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { spy.observe(s); });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("in"); });
  }
})();

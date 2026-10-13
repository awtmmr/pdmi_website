document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector(".header");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener("click", event => {
            const targetId = link.hash.slice(1);
            const targetElement = document.getElementById(targetId);

            if (!targetElement) {
                return;
            }

            event.preventDefault();
            const headerHeight = header?.offsetHeight ?? 0;
            const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight - 20;

            window.scrollTo({
                top: targetPosition,
                behavior: reduceMotion ? "auto" : "smooth"
            });
        });
    });

    const fadeElements = document.querySelectorAll('.fade-in');
    if (reduceMotion || !("IntersectionObserver" in window)) {
        fadeElements.forEach(element => element.classList.add("visible"));
        return;
    }

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, currentObserver) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                currentObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(element => {
        observer.observe(element);
    });
});
/**
 * High Fidelity Luxury Lightbox & Lazy Loader
 */

function initializeGalleryAndLightbox() {
    const items = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('gallery-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox-close');

    // Hover sound profile trigger context (optional configuration)
    items.forEach(item => {
        item.addEventListener('click', () => {
            const highResSrc = item.getAttribute('data-src');
            lightboxImg.src = highResSrc;
            
            // Smooth fade-in
            lightbox.style.display = 'flex';
            gsap.fromTo(lightbox, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "power2.out" });
            gsap.fromTo(lightboxImg, { scale: 0.9 }, { scale: 1, duration: 0.6, ease: "back.out(1.2)" });
        });
    });

    closeBtn.addEventListener('click', () => {
        gsap.to(lightbox, {
            opacity: 0,
            duration: 0.4,
            ease: "power2.in",
            onComplete: () => {
                lightbox.style.display = 'none';
                lightboxImg.src = ''; // Flush heavy visual memory space
            }
        });
    });

    // Close lightbox on clicking outside content area
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeBtn.click();
        }
    });

    // Progressive Lazy Loading implementation
    const lazyImages = document.querySelectorAll('.lazy-image');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.addEventListener('load', () => {
                    img.style.opacity = 1;
                });
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(image => {
        image.style.opacity = 0;
        image.style.transition = "opacity 1.5s ease";
        imageObserver.observe(image);
    });
}
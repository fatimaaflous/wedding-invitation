function setupCinematicTimelines(onOpenComplete, onUnfoldComplete) {
    const select = s => document.querySelector(s);

    // Initial Envelope entrance on page load
    gsap.fromTo(".envelope-wrapper, .scene-header, .click-instruction", 
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, ease: "power2.out", delay: 0.3 }
    );

    // 1. Envelope opening animation
    // 1. Envelope opening animation
window.executeEnvelopeOpening = function() {
    const tlOpen = gsap.timeline({
        onComplete: () => {
            const modal = document.querySelector('#card-modal');
            modal.classList.remove('hidden');
            setTimeout(() => {
                modal.classList.add('show');
            }, 40);
        }
    });

    // Break wax seal, fade ribbon, and open envelope flap
    tlOpen.to("#wax-seal-btn", {
        scale: 0,
        opacity: 0,
        duration: 0.4,
        ease: "power2.in"
    })
    .to(".silk-ribbon", {
        opacity: 0,
        scaleY: 0.8,
        duration: 0.5,
        ease: "power2.in"
    }, "-=0.3")
    .to("#envelope-flap", {
        rotationX: 180,
        duration: 0.9,
        ease: "power2.inOut"
    }, "-=0.2");

    // Trigger flower rain & romantic soundtrack
    onOpenComplete();
};

    // 2. Unfold Card/Begin Journey transition
    window.executeInvitationUnfold = function() {
        const tlUnfold = gsap.timeline({
            onComplete: () => {
                select('#envelope-scene').classList.add('hidden');
                select('#card-modal').classList.add('hidden');
                onUnfoldComplete();
            }
        });

        tlUnfold.to("#card-modal", {
            opacity: 0,
            duration: 0.7,
            ease: "power3.in"
        });
    };

    // 3. Reveal Content sections on scroll
    window.initializeScrollAnimations = function() {
        gsap.to(".hero-content", {
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: "power3.out"
        });

        gsap.fromTo(".gallery-item", 
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 1.0,
                stagger: 0.15,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".gallery-grid",
                    start: "top 80%"
                }
            }
        );
    };
}
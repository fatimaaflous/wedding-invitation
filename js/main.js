document.addEventListener("DOMContentLoaded", () => {
    // 1. Setup floral canvas engine
    const rainEngine = initLuxuryRainEngine();
    
    const music = document.getElementById('bg-music');
    const audioToggle = document.getElementById('audio-toggle');
    let isPlaying = false;

    // Manual Sound Toggle Button
    audioToggle.addEventListener('click', () => {
        if (isPlaying) {
            music.pause();
            audioToggle.innerHTML = '<span class="audio-icon">🔇</span>';
        } else {
            music.play().catch(err => console.log("Audio waiting for user gesture..."));
            audioToggle.innerHTML = '<span class="audio-icon">♫</span>';
        }
        isPlaying = !isPlaying;
    });

    // Configure main sequence
    setupCinematicTimelines(
        // Envelope Opened: Ignite music and beautiful botanical petal rain
        () => {
            rainEngine.ignitePetalRain();
            
            // Auto play back music safely upon clicking the envelope
            music.play().then(() => {
                isPlaying = true;
                audioToggle.innerHTML = '<span class="audio-icon">♫</span>';
            }).catch(err => {
                console.log("Audio failed to auto-play due to browser gesture policy:", err);
            });
        },
        // Unfold clicked: Initialize Scroll trigger & smooth-scroll
        () => {
            const experience = document.getElementById('scroll-experience');
            experience.classList.remove('hidden-experience');
            
            // Initialize premium smooth-scroll
            const lenis = new Lenis({
                duration: 1.2,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                smooth: true
            });

            function raf(time) {
                lenis.raf(time);
                requestAnimationFrame(raf);
            }
            requestAnimationFrame(raf);

            lenis.on('scroll', ScrollTrigger.update);
            gsap.ticker.add((time) => {
                lenis.raf(time * 1000);
            });

            // Start showing sections
            initializeScrollAnimations();
        }
    );

    // Event listeners
    document.getElementById('envelope-interactive').addEventListener('click', () => {
        executeEnvelopeOpening();
    }, { once: true });

    document.getElementById('unfold-trigger').addEventListener('click', () => {
        executeInvitationUnfold();
    });

    function createGoldDust() {
    const container = document.getElementById('sparkle-container');
    if (!container) return;

    // Create a CSS style block for the drifting animation
    const style = document.createElement('style');
    style.textContent = `
        .sparkle-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
            overflow: hidden;
        }
        .dust-particle {
            position: absolute;
            background: radial-gradient(circle, rgba(212,175,55,0.6) 0%, rgba(212,175,55,0) 70%);
            border-radius: 50%;
            pointer-events: none;
            animation: floatUp linear infinite;
        }
        @keyframes floatUp {
            0% {
                transform: translateY(105vh) translateX(0) scale(0.5);
                opacity: 0;
            }
            10% {
                opacity: 0.8;
            }
            90% {
                opacity: 0.8;
            }
            100% {
                transform: translateY(-5vh) translateX(100px) scale(1.2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Spawn 15 subtle particles
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'dust-particle';
        
        // Random sizes, starting positions, and speeds
        const size = Math.random() * 6 + 3; // 3px to 9px
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        
        const duration = Math.random() * 15 + 15; // 15s to 30s for slow drift
        const delay = Math.random() * -20; // Pre-warm the animation timeline
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        
        container.appendChild(particle);
    }
}

// Run the function when the page loads
document.addEventListener('DOMContentLoaded', createGoldDust);



document.addEventListener("DOMContentLoaded", () => {
    initSparkleAtmosphere();
});

function initSparkleAtmosphere() {
    const container = document.getElementById('sparkle-container');
    if (!container) return;

    const maxSparkles = 40; // Keeps performance ultra-smooth
    
    for (let i = 0; i < maxSparkles; i++) {
        createSparkle(container);
    }
}

function createSparkle(container) {
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle-particle');

    // Randomize initial positions & timings so they don't spawn together
    const leftPos = Math.random() * 100; // Left-to-right percentage
    const animDelay = Math.random() * -12; // Negative delay starts the animation mid-way
    const animDuration = 8 + Math.random() * 8; // Random drifting speed
    const size = 1.5 + Math.random() * 2.5; // Dust variation

    sparkle.style.left = `${leftPos}%`;
    sparkle.style.top = `-5%`;
    sparkle.style.width = `${size}px`;
    sparkle.style.height = `${size}px`;
    sparkle.style.animationDelay = `${animDelay}s`;
    sparkle.style.animationDuration = `${animDuration}s`;

    container.appendChild(sparkle);
}
});
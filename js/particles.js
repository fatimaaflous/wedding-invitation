class LuxuryRosePetal {
    constructor(canvasWidth, canvasHeight, spawnEverywhere = false) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.reset(spawnEverywhere);
    }

    reset(spawnEverywhere) {
        this.x = Math.random() * this.canvasWidth;
        // If spawning instantly on open, spread them out; otherwise, stream from the top
        this.y = spawnEverywhere ? Math.random() * this.canvasHeight : -20 - Math.random() * 80;
        this.size = Math.random() * 10 + 8; // Ideal visible petal sizing
        this.speedY = Math.random() * 1.5 + 1.0; // Falling movement rate
        this.speedX = Math.random() * 0.8 - 0.4; // Soft horizontal breeze drift
        this.angle = Math.random() * 360;
        this.spinSpeed = Math.random() * 2.0 - 1.0;
        this.oscillationSpeed = Math.random() * 0.03 + 0.01;
        this.oscillationRange = Math.random() * 1.5 + 0.5;
        
        // Exquisite color scheme (deep burgundy, soft blush rose, rich ivory, and gold leaf dust)
        const colors = ['#E4C988', '#6A1B29', '#FAF8F5', '#EAA7B5'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.alpha = Math.random() * 0.4 + 0.5; // High translucent visibility
    }

    update() {
        this.y += this.speedY;
        this.x += Math.sin(this.y * this.oscillationSpeed) * this.oscillationRange;
        this.angle += this.spinSpeed;

        // Recirculate back to top once they exit view
        if (this.y > this.canvasHeight + 20) {
            this.reset(false);
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.angle * Math.PI) / 180);
        ctx.beginPath();
        // Draw natural leaf-like curves
        ctx.ellipse(0, 0, this.size, this.size / 1.5, 0, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.alpha;
        ctx.fill();
        ctx.restore();
    }
}

function initLuxuryRainEngine() {
    const canvas = document.getElementById('petals-canvas');
    const ctx = canvas.getContext('2d');
    let petals = [];
    let isActive = false;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    function animationLoop() {
        if (isActive) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            petals.forEach(p => {
                p.update();
                p.draw(ctx);
            });
        }
        requestAnimationFrame(animationLoop);
    }
    animationLoop();

    return {
        ignitePetalRain: function() {
            isActive = true;
            petals = [];
            // Spawn 70 rich floating floral units instantly covering the screen
            for (let i = 0; i < 70; i++) {
                petals.push(new LuxuryRosePetal(canvas.width, canvas.height, true));
            }
        }
    };
}
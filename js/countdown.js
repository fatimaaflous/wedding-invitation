/**
 * High-End Luxury Event Countdown
 */

function initializeCountdown() {
    const countdownContainer = document.getElementById('wedding-countdown');
    if (!countdownContainer) return;

    const targetDateStr = countdownContainer.getAttribute('data-date');
    const targetDate = new Date(targetDateStr).getTime();

    const daysVal = document.getElementById('days');
    const hoursVal = document.getElementById('hours');
    const minutesVal = document.getElementById('minutes');
    const secondsVal = document.getElementById('seconds');

    function updateCounter() {
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference < 0) {
            // Event active state (E.g. "We are celebrating today")
            clearInterval(timerInterval);
            countdownContainer.innerHTML = "<h3>The Celebration Has Begun</h3>";
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        // Format and update text nodes gracefully with zero padding
        daysVal.textContent = days.toString().padStart(2, '0');
        hoursVal.textContent = hours.toString().padStart(2, '0');
        minutesVal.textContent = minutes.toString().padStart(2, '0');
        secondsVal.textContent = seconds.toString().padStart(2, '0');
    }

    // Initial pass-through
    updateCounter();
    const timerInterval = setInterval(updateCounter, 1000);
}
// Improved Studio Website Script (with Fixes for Form Input Blocking and Audio Clip Limiting)

// 1. Mobile Navigation Toggle
const dashboardToggle = document.getElementById('dashboardToggle');
const dashboard = document.getElementById('dashboard');
const closeBtn = document.getElementById('closeBtn');
const overlay = document.getElementById('overlay');

function toggleDashboard() {
    const isOpen = dashboard.classList.toggle('open');
    overlay.style.display = isOpen ? 'block' : 'none';
    document.body.style.overflow = isOpen ? 'hidden' : '';
}

dashboardToggle?.addEventListener('click', toggleDashboard);
closeBtn?.addEventListener('click', toggleDashboard);
overlay?.addEventListener('click', toggleDashboard);

// 2. Count-up Animation and Audio Clip Limiter
window.addEventListener('DOMContentLoaded', () => {
    // Count-up animation
    document.querySelectorAll('.stat-number').forEach(counter => {
        const target = Number(counter.dataset.count);
        const duration = 5000;
        const increment = target / (duration / 50);
        let count = 0;

        function updateCounter() {
            count += increment;
            if (count < target) {
                counter.textContent = Math.floor(count);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        }

        updateCounter();
    });

    // Audio clip limiter (100s max)
    document.querySelectorAll('.demo-track').forEach(track => {
        const audio = track.querySelector('audio');
        const playBtn = track.querySelector('.play-btn');
        const progressBar = track.querySelector('.progress-bar');
        const timeDisplay = track.querySelector('.current-time');
        const MAX_DURATION = 100;

        playBtn.addEventListener('click', () => {
            document.querySelectorAll('audio').forEach(other => {
                if (other !== audio) {
                    other.pause();
                    other.currentTime = 0;
                    other.closest('.demo-track').querySelector('.play-btn i').className = 'fas fa-play';
                }
            });

            if (audio.paused) {
                audio.play();
                playBtn.querySelector('i').className = 'fas fa-pause';
            } else {
                audio.pause();
                playBtn.querySelector('i').className = 'fas fa-play';
            }
        });

        audio.addEventListener('timeupdate', () => {
            const current = Math.min(audio.currentTime, MAX_DURATION);
            const percent = (current / MAX_DURATION) * 100;
            progressBar.value = percent;
            timeDisplay.textContent = `${Math.floor(current / 60)}:${('0' + Math.floor(current % 60)).slice(-2)}`;

            if (audio.currentTime >= MAX_DURATION) {
                audio.pause();
                audio.currentTime = 0;
                playBtn.querySelector('i').className = 'fas fa-play';
            }
        });
    });
});

// 3. Testimonial Slider
const testimonials = document.querySelectorAll('.testimonial');
let currentTestimonial = 0;

function showTestimonial(index) {
    testimonials.forEach((el, i) => el.classList.toggle('active', i === index));
}

document.querySelector('.testimonial-prev')?.addEventListener('click', () => {
    currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    showTestimonial(currentTestimonial);
});

document.querySelector('.testimonial-next')?.addEventListener('click', () => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
});

setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}, 5000);

showTestimonial(currentTestimonial);

// 4. Services Carousel
window.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.services-carousel');
    const cards = document.querySelectorAll('.service-card');
    const leftBtn = document.querySelector('.scroll-btn.left');
    const rightBtn = document.querySelector('.scroll-btn.right');
    if (!carousel || !cards.length) return;

    const cardWidth = cards[0].offsetWidth + 25;
    let currentIndex = 0;
    let autoScrollInterval;
    let isScrolling = false;

    function scrollToCard(index) {
        if (isScrolling) return;
        isScrolling = true;
        index = index < 0 ? cards.length - 1 : index % cards.length;
        carousel.scrollTo({ left: index * cardWidth, behavior: 'smooth' });
        currentIndex = index;
        resetAutoScroll();
        setTimeout(() => isScrolling = false, 500);
    }

    leftBtn?.addEventListener('click', () => scrollToCard(currentIndex - 1));
    rightBtn?.addEventListener('click', () => scrollToCard(currentIndex + 1));
    carousel.addEventListener('mouseenter', () => clearInterval(autoScrollInterval));
    carousel.addEventListener('mouseleave', startAutoScroll);

    let touchStartX = 0;
    carousel.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
        clearInterval(autoScrollInterval);
    });
    carousel.addEventListener('touchend', e => {
        const touchEndX = e.changedTouches[0].screenX;
        if (touchStartX - touchEndX > 50) scrollToCard(currentIndex + 1);
        else if (touchEndX - touchStartX > 50) scrollToCard(currentIndex - 1);
        startAutoScroll();
    });

    function startAutoScroll() {
        autoScrollInterval = setInterval(() => scrollToCard(currentIndex + 1), 5000);
    }

    startAutoScroll();
});

// 5. Contact Form + Fix for Spinner Blocking Input
window.addEventListener('DOMContentLoaded', () => {
    const formContainer = document.querySelector('.contact-form');
    if (!formContainer) return;

    formContainer.innerHTML = `
        <form id="studioContactForm" novalidate>
            <div class="form-group">
                <input type="text" name="name" placeholder="Your Name" required pattern="[A-Za-z ]{3,50}">
            </div>
            <div class="form-group">
                <input type="email" name="email" placeholder="Email" required>
            </div>
            <div class="form-group">
                <input type="tel" name="phone" placeholder="Phone (optional)" pattern="[0-9+ ]{10,15}">
            </div>
            <div class="form-group">
                <select name="service" required>
                    <option value="" disabled selected>Select Service</option>
                    <option value="Recording">Recording Session</option>
                    <option value="Mixing">Mixing</option>
                    <option value="Mastering">Mastering</option>
                    <option value="Studio Rental">Studio Rental</option>
                </select>
            </div>
            <div class="form-group">
                <textarea name="message" rows="5" placeholder="Your Message" required></textarea>
            </div>
            <div class="g-recaptcha" data-sitekey="6Le8K1krAAAAAPLrzLSYALpY_Trh-IZK0av0vZKp"></div>
            <button type="submit">Send Message</button>
            <div id="formFeedback" class="form-feedback" style="display:none;">
                <p class="success-text">Message sent! 🎉</p>
            </div>
        </form>
    `;

    document.body.insertAdjacentHTML('beforeend', `
        <div id="spinnerOverlay" class="spinner-overlay" style="display:none;">
            <div class="spinner"></div>
        </div>
    `);

    const form = document.getElementById('studioContactForm');
    const spinner = document.getElementById('spinnerOverlay');
    const feedback = document.getElementById('formFeedback');

    form.addEventListener('submit', async e => {
        e.preventDefault();
        if (!form.checkValidity()) return form.reportValidity();

        const token = grecaptcha.getResponse();
        if (!token) return alert('Please complete the CAPTCHA 😊');

        spinner.style.display = 'flex';
        feedback.style.display = 'none';

        const formData = Object.fromEntries(new FormData(form).entries());
        formData.token = token;

        try {
            const res = await fetch('https://script.google.com/macros/s/AKfycbxQ8RMwQzkV4qicDXkQpLy1WK23QlNMRa63w7JbEAOiXYNbnLFHhm8Wjm0FZ0u9vVdP/exec', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const result = await res.json();
            spinner.style.display = 'none';

            if (result.success) {
                feedback.style.display = 'block';
                form.reset();
                grecaptcha.reset();
                setTimeout(() => feedback.style.display = 'none', 4000);
            } else {
                alert('Captcha failed or unknown error.');
                grecaptcha.reset();
            }
        } catch (err) {
            console.error(err);
            alert('Network error. Try later.');
            spinner.style.display = 'none';
            grecaptcha.reset();
        }
    });

    form.querySelectorAll('input, select, textarea').forEach(el => {
        el.addEventListener('input', () => {
            el.classList.toggle('invalid', !el.checkValidity());
            el.classList.toggle('valid', el.checkValidity());
        });
    });

    // Ensure overlays don't block input after load
    document.querySelectorAll('.overlay, .spinner-overlay').forEach(el => {
        el.classList.remove('active');
        el.style.display = 'none';
    });
    document.body.style.overflow = '';
});

// 6. Team Modal
window.addEventListener('DOMContentLoaded', () => {
    const teamCards = document.querySelectorAll('.team-card');
    const modal = document.querySelector('.preview-modal');
    const overlay = document.querySelector('.overlay');
    const closeBtn = document.querySelector('.modal-close-btn');

    if (!modal || !overlay || !closeBtn) return;

    function openModal(card) {
        modal.style.backgroundImage = `url('${card.dataset.image}')`;
        modal.querySelector('.modal-name').textContent = card.dataset.name;
        modal.querySelector('.modal-title').textContent = card.dataset.title;
        modal.querySelector('.modal-bio').textContent = card.dataset.bio;
        modal.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    teamCards.forEach(card => card.addEventListener('click', () => openModal(card)));
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
    });
});

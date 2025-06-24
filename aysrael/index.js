(() => {
  const dashboardToggle = document.getElementById('dashboardToggle');
  const dashboard = document.getElementById('dashboard');
  const closeBtn = document.getElementById('closeBtn');
  const overlay = document.getElementById('overlay');
  const navLinks = document.querySelectorAll('.nav-link');

  function toggleDashboard() {
    const isOpen = dashboard.classList.toggle('open');
    overlay.style.display = isOpen ? 'block' : 'none';
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  if (dashboardToggle && dashboard && overlay && closeBtn) {
    dashboardToggle.addEventListener('click', toggleDashboard);
    closeBtn.addEventListener('click', toggleDashboard);
    overlay.addEventListener('click', toggleDashboard);
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) toggleDashboard();
      });
    });
  }
})();


/* ===== 2. HERO PARALLAX ===== */
(() => {
  const heroSection = document.querySelector('.hero');
  if (heroSection) {
    window.addEventListener('scroll', () => {
      heroSection.style.backgroundPositionY = `${window.scrollY * 0.5}px`;
    });
  }
})();


/* ===== 3. SCROLL TO SECTION ===== */
(() => {
  const scrollIndicator = document.querySelector('.scroll-indicator');
  const servicesPreview = document.querySelector('.services-preview');

  if (scrollIndicator && servicesPreview) {
    scrollIndicator.addEventListener('click', () => {
      servicesPreview.scrollIntoView({ behavior: 'smooth' });
    });
  }
})();


/* ===== 4. CTA BUTTON PRESS EFFECT ===== */
(() => {
  const ctaButtons = document.querySelectorAll('.cta-button');

  ctaButtons.forEach(button => {
    button.addEventListener('mousedown', () => button.style.transform = 'translateY(2px)');
    button.addEventListener('mouseup', () => button.style.transform = 'translateY(-3px)');
    button.addEventListener('mouseleave', () => button.style.transform = 'translateY(0)');
  });
})();


/* ===== 5. SERVICES CAROUSEL ===== */
(() => {
  const carousel = document.querySelector('.services-carousel');
  const leftBtn = document.querySelector('.scroll-btn.left');
  const rightBtn = document.querySelector('.scroll-btn.right');

  function scrollCarousel(direction) {
    if (!carousel) return;
    const scrollAmount = 300;
    carousel.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });

    setTimeout(() => {
      const cards = carousel.querySelectorAll('.service-card');
      if (direction > 0) carousel.appendChild(cards[0]);
      else carousel.insertBefore(cards[cards.length - 1], cards[0]);
      carousel.scrollTo({ left: 0 });
    }, 300);
  }

  if (carousel && leftBtn && rightBtn) {
    leftBtn.addEventListener('click', () => scrollCarousel(-1));
    rightBtn.addEventListener('click', () => scrollCarousel(1));
    setInterval(() => scrollCarousel(1), 5000);
  }
})();


/* ===== 6. SCROLL-IN ANIMATIONS ===== */
(() => {
  document.addEventListener('DOMContentLoaded', () => {
    const animatedItems = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    animatedItems.forEach(item => observer.observe(item));
  });
})();


/* ===== 7. TESTIMONIAL SLIDER ===== */
(() => {
  const testimonials = document.querySelectorAll('.testimonial');
  const prev = document.querySelector('.testimonial-prev');
  const next = document.querySelector('.testimonial-next');
  let current = 0;

  function updateTestimonials(index) {
    testimonials.forEach((t, i) => t.classList.toggle('active', i === index));
  }

  if (testimonials.length && prev && next) {
    prev.addEventListener('click', () => {
      current = (current - 1 + testimonials.length) % testimonials.length;
      updateTestimonials(current);
    });

    next.addEventListener('click', () => {
      current = (current + 1) % testimonials.length;
      updateTestimonials(current);
    });
  }
})();


/* ===== 8. TOUR TABS ===== */
(() => {
  const tourBtns = document.querySelectorAll('.tour-nav-btn');
  const tourCards = document.querySelectorAll('.tour-card');

  tourBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.target;
      tourBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      tourCards.forEach(card => {
        card.classList.toggle('active', card.dataset.tab === target);
      });
    });
  });
})();


/* ===== 9. CONTACT FORM SUBMISSION ===== */
(() => {
  const form = document.getElementById('studioContactForm');
  const formMessage = document.getElementById('formMessage');

  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();

      const spinner = form.querySelector('.button-spinner');
      const buttonText = form.querySelector('.button-text');

      spinner.style.display = 'inline-block';
      buttonText.style.display = 'none';

      setTimeout(() => {
        formMessage.innerText = 'Your message has been sent!';
        form.reset();
        spinner.style.display = 'none';
        buttonText.style.display = 'inline-block';
      }, 2000);
    });
  }
})();


/* ===== 10. WHATSAPP FLOAT TOOLTIP ===== */
(() => {
  const whatsapp = document.querySelector('.whatsapp-float');
  const tooltip = whatsapp?.querySelector('.tooltip');

  if (whatsapp && tooltip) {
    whatsapp.addEventListener('mouseenter', () => tooltip.style.opacity = '1');
    whatsapp.addEventListener('mouseleave', () => tooltip.style.opacity = '0');
  }
})();

/* ===== 9. CONTACT FORM RENDER & SUBMIT ===== */
(() => {
  const contactFormContainer = document.querySelector('.contact-form');

  if (!contactFormContainer) return;

  // Form HTML structure
  const formHTML = `
    <h2 class="section-title">SEND US A MESSAGE</h2>
    <form id="studioContactForm">
      <input type="hidden" name="secret" value="AYSRAEL2023!">
      
      <div class="form-group">
        <input type="text" name="name" placeholder="Your Name" required pattern="[A-Za-z ]{3,50}" title="3-50 characters">
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
        </select>
      </div>
      
      <div class="form-group">
        <textarea name="message" placeholder="Your message..." required minlength="20"></textarea>
      </div>
      
      <button type="submit" class="cta-button">
        <span class="button-text">Send Message</span>
        <span class="button-spinner" style="display:none;">
          <i class="fas fa-spinner fa-spin"></i>
        </span>
      </button>
      
      <div id="formMessage" class="form-message"></div>
    </form>
  `;

  // Render the form
  contactFormContainer.innerHTML = formHTML;

  // Form submission handler
  const form = document.getElementById('studioContactForm');
  const formMessage = document.getElementById('formMessage');

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const spinner = form.querySelector('.button-spinner');
    const buttonText = form.querySelector('.button-text');

    // Show loading spinner
    spinner.style.display = 'inline-block';
    buttonText.style.display = 'none';

    // Gather form data
    const formData = new FormData(form);
    const formObject = Object.fromEntries(formData.entries());

    // TODO: Replace with your actual Google Apps Script URL
    const scriptURL = "https://script.google.com/macros/s/your-script-id/exec";

    try {
      const response = await fetch(scriptURL, {
        method: "POST",
        body: new URLSearchParams(formObject),
      });

      const result = await response.text();
      formMessage.innerText = "Your message has been sent!";
      form.reset();
    } catch (error) {
      formMessage.innerText = "Failed to send. Please try again.";
    }

    // Hide spinner
    spinner.style.display = 'none';
    buttonText.style.display = 'inline-block';
  });
})();

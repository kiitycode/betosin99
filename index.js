// DOM Elements
const dashboardToggle = document.getElementById('dashboardToggle');
const dashboard = document.getElementById('dashboard');
const closeBtn = document.getElementById('closeBtn');
const overlay = document.getElementById('overlay');
const navLinks = document.querySelectorAll('.nav-link');
const scrollIndicator = document.querySelector('.scroll-indicator');
const serviceCards = document.querySelectorAll('.service-card');
const ctaButtons = document.querySelectorAll('.cta-button');

// Dashboard Functionality
function toggleDashboard() {
    dashboard.classList.toggle('open');
    overlay.style.display = dashboard.classList.contains('open') ? 'block' : 'none';
    
    // Toggle body scroll when dashboard is open
    document.body.style.overflow = dashboard.classList.contains('open') ? 'hidden' : '';
}

// Close dashboard when clicking on nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) { // Only auto-close on mobile
            toggleDashboard();
        }
    });
});

// Event Listeners
dashboardToggle.addEventListener('click', toggleDashboard);
closeBtn.addEventListener('click', toggleDashboard);
overlay.addEventListener('click', toggleDashboard);

// Scroll to next section when clicking scroll indicator
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        const servicesSection = document.querySelector('.services-preview');
        servicesSection.scrollIntoView({ behavior: 'smooth' });
    });
}

// Service Card Animation
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        const icon = card.querySelector('i');
        icon.style.transform = 'rotate(10deg) scale(1.1)';
    });
    
    card.addEventListener('mouseleave', () => {
        const icon = card.querySelector('i');
        icon.style.transform = 'rotate(0) scale(1)';
    });
});

// CTA Button Animation
ctaButtons.forEach(button => {
    button.addEventListener('mousedown', () => {
        button.style.transform = 'translateY(1px)';
    });
    
    button.addEventListener('mouseup', () => {
        button.style.transform = 'translateY(-3px)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0)';
    });
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const hero = document.querySelector('.hero');
    
    if (hero) {
        hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
    }
});

// Animate elements when they come into view
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.service-card, .section-title, .showcase-content');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Set initial state for animated elements
window.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.service-card, .section-title, .showcase-content');
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Trigger animation for elements already in view
    setTimeout(animateOnScroll, 100);
});

window.addEventListener('scroll', animateOnScroll);

// Audio Player Simulation (for demo purposes)
const audioElements = document.querySelectorAll('audio');
const playButtons = document.querySelectorAll('.play-demo');

if (playButtons.length > 0) {
    playButtons.forEach(button => {
        button.addEventListener('click', function() {
            const audioId = this.getAttribute('data-audio');
            const audio = document.getElementById(audioId);
            const icon = this.querySelector('i');
            
            if (audio.paused) {
                // Pause all other audio elements
                audioElements.forEach(a => {
                    if (a !== audio) {
                        a.pause();
                        a.currentTime = 0;
                        const otherIcons = document.querySelectorAll(`.play-demo[data-audio="${a.id}"] i`);
                        otherIcons.forEach(i => {
                            i.classList.remove('fa-pause');
                            i.classList.add('fa-play');
                        });
                    }
                });
                
                audio.play();
                icon.classList.remove('fa-play');
                icon.classList.add('fa-pause');
            } else {
                audio.pause();
                audio.currentTime = 0;
                icon.classList.remove('fa-pause');
                icon.classList.add('fa-play');
            }
        });
    });
}

// Mobile menu toggle for footer links on small screens
const footerLinks = document.querySelector('.footer-links');
const footerLinksTitle = document.createElement('div');

if (footerLinks && window.innerWidth <= 768) {
    footerLinksTitle.textContent = 'Quick Links';
    footerLinksTitle.classList.add('footer-links-title');
    footerLinksTitle.addEventListener('click', () => {
        footerLinks.classList.toggle('expanded');
    });
    
    footerLinks.insertBefore(footerLinksTitle, footerLinks.firstChild);
    footerLinks.classList.add('collapsible');
}

// Counter Animation for Stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-count');
        const count = +counter.innerText;
        const increment = target / speed;
        
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(animateCounters, 1);
        } else {
            counter.innerText = target;
        }
    });
}

// Studio Tour Navigation
function setupTour() {
    const tourButtons = document.querySelectorAll('.tour-nav-btn');
    const tourCards = document.querySelectorAll('.tour-card');
    
    tourButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and cards
            tourButtons.forEach(btn => btn.classList.remove('active'));
            tourCards.forEach(card => card.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Show corresponding card
            const target = button.getAttribute('data-target');
            document.querySelector(`.tour-card[data-tab="${target}"]`).classList.add('active');
        });
    });
}

// Testimonial Slider
function setupTestimonials() {
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    let current = 0;
    
    function showTestimonial(index) {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        testimonials[index].classList.add('active');
    }
    
    prevBtn.addEventListener('click', () => {
        current = (current > 0) ? current - 1 : testimonials.length - 1;
        showTestimonial(current);
    });
    
    nextBtn.addEventListener('click', () => {
        current = (current < testimonials.length - 1) ? current + 1 : 0;
        showTestimonial(current);
    });
    
    // Auto-rotate testimonials
    setInterval(() => {
        current = (current < testimonials.length - 1) ? current + 1 : 0;
        showTestimonial(current);
    }, 5000);
}

// Initialize all functions when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    // Start counter animation when stats come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const statsSection = document.querySelector('.stats-grid');
    if (statsSection) {
        observer.observe(statsSection);
    }
    
    setupTour();
    setupTestimonials();
});

document.getElementById("studioContactForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.target;
    const button = form.querySelector("button[type='submit']");
    const messageDiv = document.getElementById("formMessage");
    
    if (!button || !messageDiv) {
        console.error("Form elements not found");
        return;
    }

    // Show loading state
    const buttonText = button.querySelector(".button-text");
    const buttonSpinner = button.querySelector(".button-spinner");
    button.disabled = true;
    buttonText.style.display = "none";
    buttonSpinner.style.display = "inline-block";
    messageDiv.textContent = "";
    messageDiv.className = "form-message";
    
    try {
        // Prepare data
        const formData = {
            secret: form.secret.value,
            name: form.name.value.trim(),
            email: form.email.value.trim(),
            phone: form.phone.value.trim(),
            service: form.service.value,
            message: form.message.value.trim()
        };

        // Basic validation
        if (!formData.name || !formData.email || !formData.message) {
            throw new Error("Please fill in all required fields");
        }

        // Send to Google Script
        const response = await fetch("https://script.google.com/macros/s/AKfycbwH86Sp3LwIZll87hnz2NQCAyPtCPX0SuprwDDSdSlkBdWZ-kKyvq5KvF71mtVQ35jOhQ/exec", {
            method: "POST",
            mode: "cors", // Explicitly enable CORS
            body: JSON.stringify(formData),
            headers: { 
              "Content-Type": "application/json"
            }
          });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const result = await response.json();
        
        if (!result.success) {
            throw new Error(result.message || "Form submission failed");
        }

        // Success!
        form.reset();
        messageDiv.textContent = "✓ Message sent successfully!";
        messageDiv.classList.add("success");
    } catch (error) {
        console.error("Form error:", error);
        messageDiv.textContent = `✗ ${error.message}`;
        messageDiv.classList.add("error");
    } finally {
        // Reset button
        button.disabled = false;
        buttonText.style.display = "inline-block";
        buttonSpinner.style.display = "none";
    }
});
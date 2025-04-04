// Dark Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

function setTheme(isDark) {
    document.documentElement.classList.toggle('dark-mode', isDark);
    themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    localStorage.setItem('darkMode', isDark);
}

// Initialize theme
const currentTheme = localStorage.getItem('darkMode');
if (currentTheme === 'true' || (currentTheme === null && prefersDark.matches)) {
    setTheme(true);
}

themeToggle.addEventListener('click', () => {
    const isDark = !document.documentElement.classList.contains('dark-mode');
    setTheme(isDark);
});

// Back to Top Button
const backToTopBtn = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    backToTopBtn.classList.toggle('visible', window.scrollY > 300);
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    try {
        // Simulate API call (replace with actual fetch)
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Show success
        alert("Message sent successfully! I'll get back to you soon.");
        contactForm.reset();
        
    } catch (error) {
        alert("Oops! Something went wrong. Please try again later.");
    } finally {
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
    }
});

// Initialize animations
document.querySelectorAll('.fade-in').forEach(el => {
    el.style.opacity = 0;
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 1s ease forwards';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Initialize VanillaTilt for project cards
document.addEventListener('DOMContentLoaded', () => {
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll(".project-card"), {
            max: 15,
            speed: 400,
            glare: true,
            "max-glare": 0.2
        });
    }
    
    // Animate skill bars on scroll
    const skillBars = document.querySelectorAll('.bar');
    skillBars.forEach(bar => {
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = bar.parentElement.previousElementSibling.lastChild.textContent;
        }, 500);
    });
});

// Debounce scroll events
let scrollTimeout;
window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        backToTopBtn.classList.toggle('visible', window.scrollY > 300);
    }, 100);
});

// Lazy load VanillaTilt
if (document.querySelector('.project-card')) {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/vanilla-tilt/1.7.0/vanilla-tilt.min.js';
    script.onload = () => {
        VanillaTilt.init(document.querySelectorAll(".project-card"), {
            max: 15,
            speed: 400,
            glare: true,
            "max-glare": 0.2
        });
    };
    document.body.appendChild(script);
}
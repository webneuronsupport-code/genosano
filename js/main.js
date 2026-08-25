// scripts for Genosano web

document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');
    const menuIcon = mobileMenuBtn.querySelector('i');

    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        document.body.classList.toggle('nav-active');
        
        // Toggle icon and body scroll
        if (navLinks.classList.contains('active')) {
            menuIcon.classList.remove('bx-menu');
            menuIcon.classList.add('bx-x');
            document.body.style.overflow = 'hidden';
        } else {
            menuIcon.classList.remove('bx-x');
            menuIcon.classList.add('bx-menu');
            document.body.style.overflow = '';
        }
    });

    // Close mobile menu on link click
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            document.body.classList.remove('nav-active');
            menuIcon.classList.remove('bx-x');
            menuIcon.classList.add('bx-menu');
            document.body.style.overflow = '';
        });
    });

    // Smooth scroll for anchor links (fallback/enhancement)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerOffset = 80; // Height of fixed navbar
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Hero Carousel
    const slides = document.querySelectorAll('.carousel-slide');
    if (slides.length > 0) {
        let currentSlide = 0;
        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 5000); // Change image every 5 seconds
    }

    // GSAP Animations
    if (typeof gsap !== 'undefined') {
        // Hero elements entrance animation
        gsap.from(".gsap-hero-el", {
            y: 40,
            opacity: 0,
            duration: 1.2,
            stagger: 0.15,
            ease: "power3.out",
            delay: 0.2
        });

        // Counters animation
        const counters = document.querySelectorAll('.counter');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            gsap.to(counter, {
                innerHTML: target,
                duration: 2.5,
                ease: "power2.out",
                snap: { innerHTML: 1 },
                delay: 0.8
            });
        });

    }

    // Setup treatment accordion listeners
    const hCards = document.querySelectorAll('.h-card');
    if (hCards.length > 0) {
        hCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                // Remove active class from all
                hCards.forEach(c => c.classList.remove('active'));
                // Add active class to hovered
                this.classList.add('active');
            });
        });
    }

});

// Map switching function for Contacto section
window.changeMap = function(query, element) {
    const mapFrame = document.getElementById('branch-map');
    if (mapFrame) {
        mapFrame.src = `https://maps.google.com/maps?q=${query}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
    }
    
    // Remove active class from all loc-list-item
    document.querySelectorAll('.loc-list-item').forEach(el => el.classList.remove('active'));
    
    // Add active to clicked item
    if (element) {
        element.classList.add('active');
    }
};

/**
 * KE Barbearia - Main JavaScript
 * Entry point and global utilities
 */

(function() {
    'use strict';

    /**
     * Smooth scroll for all internal links
     */
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');

                // Skip if it's just "#"
                if (href === '#') {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    return;
                }

                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const navbar = document.getElementById('navbar');
                    const navbarHeight = navbar ? navbar.offsetHeight : 0;
                    const targetPosition = target.getBoundingClientRect().top + window.scrollY - navbarHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    /**
     * Lazy loading for images
     */
    function initLazyLoading() {
        if ('loading' in HTMLImageElement.prototype) {
            // Browser supports native lazy loading
            const images = document.querySelectorAll('img[loading="lazy"]');
            images.forEach(img => {
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                }
            });
        } else {
            // Fallback for browsers without native support
            const lazyImages = document.querySelectorAll('img[loading="lazy"]');

            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                        }
                        imageObserver.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px 0px'
            });

            lazyImages.forEach(img => imageObserver.observe(img));
        }
    }

    /**
     * Preload critical images
     */
    function preloadImages() {
        const criticalImages = [
            'assets/images/fotoke.jpeg',
            'assets/images/logoke.jpg'
        ];

        criticalImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }

    /**
     * Handle external links
     */
    function initExternalLinks() {
        document.querySelectorAll('a[target="_blank"]').forEach(link => {
            // Ensure rel="noopener noreferrer" is set
            const rel = link.getAttribute('rel') || '';
            if (!rel.includes('noopener')) {
                link.setAttribute('rel', rel + ' noopener noreferrer');
            }
        });
    }

    /**
     * Add active state to navbar links based on scroll position
     */
    function initScrollSpy() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.navbar__link');

        function updateActiveLink() {
            const scrollY = window.scrollY;
            const navbar = document.getElementById('navbar');
            const navbarHeight = navbar ? navbar.offsetHeight : 0;

            sections.forEach(section => {
                const sectionTop = section.offsetTop - navbarHeight - 100;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');

                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        link.classList.remove('navbar__link--active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('navbar__link--active');
                        }
                    });
                }
            });
        }

        window.addEventListener('scroll', updateActiveLink, { passive: true });
        updateActiveLink();
    }

    /**
     * Performance optimization: Debounce function
     */
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    /**
     * Handle window resize
     */
    function initResizeHandler() {
        const handleResize = debounce(() => {
            // Refresh ScrollTrigger on resize
            if (typeof ScrollTrigger !== 'undefined') {
                ScrollTrigger.refresh();
            }
        }, 250);

        window.addEventListener('resize', handleResize, { passive: true });
    }

    /**
     * Analytics helper (placeholder for future implementation)
     */
    function trackEvent(category, action, label) {
        // Future: implement analytics tracking
        console.log('Event:', { category, action, label });
    }

    /**
     * Track CTA clicks
     */
    function initCTATracking() {
        const ctaButtons = document.querySelectorAll('.hero__cta, .navbar__cta, .location__cta, .team__cta');

        ctaButtons.forEach(button => {
            button.addEventListener('click', () => {
                trackEvent('CTA', 'click', button.textContent.trim());
            });
        });
    }

    /**
     * Service Worker registration (for future PWA support)
     */
    function initServiceWorker() {
        if ('serviceWorker' in navigator) {
            // Future: register service worker for offline support
            // navigator.serviceWorker.register('/sw.js');
        }
    }

    /**
     * Initialize all modules
     */
    function init() {
        // Preload critical images
        preloadImages();

        // Initialize features
        initSmoothScroll();
        initLazyLoading();
        initExternalLinks();
        initScrollSpy();
        initResizeHandler();
        initCTATracking();
        initServiceWorker();

        // Log ready state
        console.log('KE Barbearia - Site loaded successfully');
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Expose utility functions globally if needed
    window.KEBarbearia = {
        trackEvent,
        debounce
    };
})();

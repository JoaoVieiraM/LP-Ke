/**
 * KE Barbearia - Navbar JavaScript
 * Handles scroll behavior and mobile menu
 */

(function() {
    'use strict';

    // Elements
    const navbar = document.getElementById('navbar');
    const navbarToggle = document.getElementById('navbar-toggle');
    const navbarMenu = document.getElementById('navbar-menu');
    const navbarOverlay = document.getElementById('navbar-overlay');
    const navbarLinks = document.querySelectorAll('.navbar__link');

    // State
    let isMenuOpen = false;
    let lastScrollY = 0;
    const scrollThreshold = 50;

    /**
     * Handle scroll behavior
     */
    function handleScroll() {
        const currentScrollY = window.scrollY;

        // Add/remove scrolled class based on scroll position
        if (currentScrollY > scrollThreshold) {
            navbar.classList.add('navbar--scrolled');
        } else {
            navbar.classList.remove('navbar--scrolled');
        }

        // Optional: Hide/show navbar on scroll direction
        // Uncomment if you want this behavior
        /*
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        */

        lastScrollY = currentScrollY;
    }

    /**
     * Toggle mobile menu
     */
    function toggleMenu() {
        isMenuOpen = !isMenuOpen;

        navbarToggle.classList.toggle('navbar__toggle--active', isMenuOpen);
        navbarMenu.classList.toggle('navbar__menu--open', isMenuOpen);
        navbarOverlay.classList.toggle('navbar__overlay--visible', isMenuOpen);

        // Prevent body scroll when menu is open
        document.body.style.overflow = isMenuOpen ? 'hidden' : '';

        // Update aria attributes
        navbarToggle.setAttribute('aria-expanded', isMenuOpen);
    }

    /**
     * Close mobile menu
     */
    function closeMenu() {
        if (isMenuOpen) {
            isMenuOpen = false;
            navbarToggle.classList.remove('navbar__toggle--active');
            navbarMenu.classList.remove('navbar__menu--open');
            navbarOverlay.classList.remove('navbar__overlay--visible');
            document.body.style.overflow = '';
            navbarToggle.setAttribute('aria-expanded', 'false');
        }
    }

    /**
     * Smooth scroll to section
     */
    function smoothScrollTo(target) {
        const element = document.querySelector(target);
        if (element) {
            const navbarHeight = navbar.offsetHeight;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - navbarHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }

    /**
     * Handle navigation link clicks
     */
    function handleLinkClick(e) {
        const href = e.currentTarget.getAttribute('href');

        if (href.startsWith('#')) {
            e.preventDefault();
            closeMenu();
            smoothScrollTo(href);
        }
    }

    /**
     * Initialize navbar
     */
    function init() {
        // Set initial aria attribute
        navbarToggle.setAttribute('aria-expanded', 'false');

        // Event listeners
        window.addEventListener('scroll', handleScroll, { passive: true });

        navbarToggle.addEventListener('click', toggleMenu);
        navbarOverlay.addEventListener('click', closeMenu);

        // Handle navigation link clicks
        navbarLinks.forEach(link => {
            link.addEventListener('click', handleLinkClick);
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && isMenuOpen) {
                closeMenu();
            }
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && isMenuOpen) {
                closeMenu();
            }
        });

        // Run initial check
        handleScroll();
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

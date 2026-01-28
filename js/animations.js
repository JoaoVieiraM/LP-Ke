/**
 * KE Barbearia - Animations JavaScript
 * GSAP + ScrollTrigger animations
 */

(function() {
    'use strict';

    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    /**
     * Hero animations
     */
    function initHeroAnimations() {
        const heroContent = document.querySelector('.hero__content');
        if (!heroContent) return;

        const tl = gsap.timeline({
            defaults: {
                ease: 'power3.out',
                duration: 1
            }
        });

        // Hero title SVG
        tl.to('.hero__title-svg', {
            opacity: 1,
            scale: 1,
            duration: 1.2
        })
        // Subtitle
        .to('.hero__subtitle', {
            opacity: 1,
            y: 0
        }, '-=0.6')
        // CTA button
        .to('.hero__cta', {
            opacity: 1,
            scale: 1
        }, '-=0.4')
        // Scroll indicator
        .to('.hero__scroll', {
            opacity: 1,
            y: 0
        }, '-=0.2');
    }

    /**
     * Fade in up animations for sections
     */
    function initFadeInAnimations() {
        // Select all elements with animation classes
        const fadeElements = document.querySelectorAll('.fade-in-up:not(.hero__subtitle):not(.hero__cta)');

        fadeElements.forEach(element => {
            gsap.to(element, {
                scrollTrigger: {
                    trigger: element,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out'
            });
        });
    }

    /**
     * Services cards stagger animation
     */
    function initServicesAnimation() {
        const serviceCards = document.querySelectorAll('.service-card');
        if (!serviceCards.length) return;

        gsap.to(serviceCards, {
            scrollTrigger: {
                trigger: '.services__grid',
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 1,
            y: 0,
            stagger: 0.15,
            duration: 0.8,
            ease: 'power3.out'
        });
    }

    /**
     * Differentials stagger animation
     */
    function initDifferentialsAnimation() {
        const differentials = document.querySelectorAll('.differential');
        if (!differentials.length) return;

        gsap.to(differentials, {
            scrollTrigger: {
                trigger: '.differentials__grid',
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.6,
            ease: 'power3.out'
        });
    }

    /**
     * SVG path draw animation
     */
    function initPathAnimation() {
        const paths = document.querySelectorAll('.draw-path');

        paths.forEach(path => {
            const length = path.getTotalLength ? path.getTotalLength() : 1000;

            gsap.set(path, {
                strokeDasharray: length,
                strokeDashoffset: length
            });

            gsap.to(path, {
                scrollTrigger: {
                    trigger: path,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                },
                strokeDashoffset: 0,
                duration: 2,
                ease: 'power2.inOut'
            });
        });
    }

    /**
     * Parallax effect for team section
     */
    function initParallax() {
        const parallaxElement = document.querySelector('.team__background');
        if (!parallaxElement) return;

        gsap.to(parallaxElement, {
            scrollTrigger: {
                trigger: '.team',
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
            },
            y: '30%',
            ease: 'none'
        });
    }

    /**
     * Counter animation
     */
    function initCounterAnimation() {
        const counters = document.querySelectorAll('.counter');

        counters.forEach(counter => {
            const target = parseInt(counter.dataset.target, 10);

            gsap.to(counter, {
                scrollTrigger: {
                    trigger: counter,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                innerText: target,
                duration: 2,
                ease: 'power2.out',
                snap: { innerText: 1 },
                onUpdate: function() {
                    counter.innerText = Math.round(this.targets()[0].innerText).toLocaleString('pt-BR');
                    if (target >= 1000) {
                        counter.innerText = counter.innerText.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
                    }
                }
            });
        });
    }

    /**
     * Back to top button visibility
     */
    function initBackToTop() {
        const backToTop = document.getElementById('back-to-top');
        if (!backToTop) return;

        ScrollTrigger.create({
            start: 500,
            onUpdate: (self) => {
                if (self.scroll() > 500) {
                    backToTop.classList.add('footer__back-to-top--visible');
                } else {
                    backToTop.classList.remove('footer__back-to-top--visible');
                }
            }
        });

        // Smooth scroll to top
        backToTop.addEventListener('click', (e) => {
            e.preventDefault();
            gsap.to(window, {
                duration: 1,
                scrollTo: { y: 0 },
                ease: 'power3.inOut'
            });
        });
    }

    /**
     * Location section animations
     */
    function initLocationAnimation() {
        const locationItems = document.querySelectorAll('.location__item');
        if (!locationItems.length) return;

        gsap.to(locationItems, {
            scrollTrigger: {
                trigger: '.location__items',
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 1,
            x: 0,
            stagger: 0.15,
            duration: 0.6,
            ease: 'power3.out'
        });
    }

    /**
     * Initialize all animations
     */
    function init() {
        // Wait for fonts to load
        document.fonts.ready.then(() => {
            initHeroAnimations();
            initFadeInAnimations();
            initServicesAnimation();
            initDifferentialsAnimation();
            initPathAnimation();
            initParallax();
            initCounterAnimation();
            initBackToTop();
            initLocationAnimation();

            // Refresh ScrollTrigger after all animations are set up
            ScrollTrigger.refresh();
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

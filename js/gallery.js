/**
 * KE Barbearia - Gallery JavaScript
 * Swiper.js initialization and configuration
 */

(function() {
    'use strict';

    /**
     * Initialize Swiper gallery
     */
    function initGallery() {
        const galleryElement = document.querySelector('.gallery__slider');
        if (!galleryElement) return;

        const swiper = new Swiper('.gallery__slider', {
            // Slides configuration
            slidesPerView: 'auto',
            spaceBetween: 20,
            centeredSlides: true,
            loop: true,
            loopAdditionalSlides: 3,

            // Speed and effects
            speed: 600,
            grabCursor: true,

            // Autoplay
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
            },

            // Navigation arrows
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },

            // Pagination dots
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                dynamicBullets: true
            },

            // Keyboard control
            keyboard: {
                enabled: true,
                onlyInViewport: true
            },

            // Responsive breakpoints
            breakpoints: {
                // Mobile
                320: {
                    slidesPerView: 1.2,
                    spaceBetween: 15,
                    centeredSlides: true
                },
                // Tablet
                480: {
                    slidesPerView: 1.5,
                    spaceBetween: 20,
                    centeredSlides: true
                },
                // Small desktop
                768: {
                    slidesPerView: 2,
                    spaceBetween: 25,
                    centeredSlides: true
                },
                // Desktop
                1024: {
                    slidesPerView: 2.5,
                    spaceBetween: 30,
                    centeredSlides: true
                },
                // Large desktop
                1280: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                    centeredSlides: true
                }
            },

            // Events
            on: {
                init: function() {
                    // Add loaded class for animations
                    galleryElement.classList.add('gallery__slider--loaded');
                },
                slideChange: function() {
                    // Optional: trigger analytics or other actions
                }
            }
        });

        // Pause autoplay when gallery is not visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    swiper.autoplay.start();
                } else {
                    swiper.autoplay.stop();
                }
            });
        }, { threshold: 0.3 });

        observer.observe(galleryElement);

        return swiper;
    }

    /**
     * Initialize lightbox (optional enhancement)
     * Can be extended to add full-screen image viewing
     */
    function initLightbox() {
        const slides = document.querySelectorAll('.gallery__slide');

        slides.forEach(slide => {
            slide.addEventListener('click', (e) => {
                // Optional: implement lightbox functionality
                // For now, just log the clicked image
                const img = slide.querySelector('img');
                if (img) {
                    console.log('Clicked image:', img.src);
                    // Future: open lightbox with full-size image
                }
            });
        });
    }

    /**
     * Initialize gallery module
     */
    function init() {
        initGallery();
        initLightbox();
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

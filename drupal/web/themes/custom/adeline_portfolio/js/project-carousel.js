(function (Drupal, once) {
  Drupal.behaviors.projectCarousel = {
    attach(context) {
      once('project-carousel', '[data-carousel]', context).forEach((carousel) => {
        const slides = Array.from(carousel.querySelectorAll('[data-carousel-slide]'));
        const dots = Array.from(carousel.querySelectorAll('[data-carousel-dot]'));
        const prevButton = carousel.querySelector('[data-carousel-prev]');
        const nextButton = carousel.querySelector('[data-carousel-next]');
        const openButtons = Array.from(carousel.querySelectorAll('[data-carousel-open]'));
        const lightbox = carousel.querySelector('[data-lightbox]');
        const lightboxImage = carousel.querySelector('[data-lightbox-image]');
        const lightboxCloseButtons = Array.from(carousel.querySelectorAll('[data-lightbox-close]'));

        if (!slides.length) {
          return;
        }

        let currentIndex = 0;

        const openLightbox = (index) => {
          if (!lightbox || !lightboxImage || !openButtons[index]) {
            return;
          }

          const source = openButtons[index].getAttribute('data-image-src') || '';
          const alt = openButtons[index].getAttribute('data-image-alt') || '';

          lightboxImage.setAttribute('src', source);
          lightboxImage.setAttribute('alt', alt);
          lightbox.hidden = false;
          document.body.classList.add('has-lightbox-open');
        };

        const closeLightbox = () => {
          if (!lightbox || !lightboxImage) {
            return;
          }

          lightbox.hidden = true;
          lightboxImage.setAttribute('src', '');
          lightboxImage.setAttribute('alt', '');
          document.body.classList.remove('has-lightbox-open');
        };

        const render = (index) => {
          currentIndex = index;

          slides.forEach((slide, slideIndex) => {
            slide.classList.toggle('is-active', slideIndex === currentIndex);
          });

          dots.forEach((dot, dotIndex) => {
            dot.classList.toggle('is-active', dotIndex === currentIndex);
          });

          if (prevButton) {
            prevButton.disabled = slides.length <= 1;
          }

          if (nextButton) {
            nextButton.disabled = slides.length <= 1;
          }
        };

        if (prevButton) {
          prevButton.addEventListener('click', () => {
            const nextIndex = (currentIndex - 1 + slides.length) % slides.length;
            render(nextIndex);
          });
        }

        if (nextButton) {
          nextButton.addEventListener('click', () => {
            const nextIndex = (currentIndex + 1) % slides.length;
            render(nextIndex);
          });
        }

        dots.forEach((dot) => {
          dot.addEventListener('click', () => {
            const index = Number(dot.getAttribute('data-carousel-dot'));
            if (!Number.isNaN(index)) {
              render(index);
            }
          });
        });

        openButtons.forEach((button, index) => {
          button.addEventListener('click', () => {
            openLightbox(index);
          });
        });

        lightboxCloseButtons.forEach((button) => {
          button.addEventListener('click', closeLightbox);
        });

        document.addEventListener('keydown', (event) => {
          if (event.key === 'Escape' && lightbox && !lightbox.hidden) {
            closeLightbox();
          }
        });

        render(0);
      });
    },
  };
})(Drupal, once);

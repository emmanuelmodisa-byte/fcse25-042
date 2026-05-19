document.addEventListener("DOMContentLoaded", () => {
  // 1. Mobile Nav
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  if(hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open');
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });
    
    window.closeNav = function() {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  // 2. Cursor
  document.body.style.cursor="default";

  // 3. Scroll Reveal Animations
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Stop observing once revealed
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
  
  reveals.forEach(reveal => revealObserver.observe(reveal));

  // 4. Lightbox for Gallery
  const galleryImages = document.querySelectorAll('.gallery-item img');
  if (galleryImages.length > 0) {
    const lightbox = document.createElement('div');
    lightbox.classList.add('lightbox');
    lightbox.innerHTML = `<span class="lightbox-close">&times;</span><img src="" alt="Fullscreen Image">`;
    document.body.appendChild(lightbox);

    const lightboxImg = lightbox.querySelector('img');
    const closeBtn = lightbox.querySelector('.lightbox-close');

    galleryImages.forEach(img => {
      img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // prevent background scrolling
        document.body.style.cursor = "default";
      });
    });

    const closeLightbox = () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
      document.body.style.cursor = "default";
    };

    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target !== lightboxImg) closeLightbox();
    });
  }

  // 5. Parallax Images
  const parallaxImages = document.querySelectorAll('.about-teaser-visual img, .gallery-item img, .product-image img');
  if (parallaxImages.length > 0 && !isTouchDevice) {
    window.addEventListener('scroll', () => {
      requestAnimationFrame(() => {
        parallaxImages.forEach(img => {
          const rect = img.parentElement.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            const centerDist = (rect.top + rect.height / 2) - (window.innerHeight / 2);
            const yPos = centerDist * 0.1; 
            img.style.setProperty('--parallax', `${yPos}px`);
          }
        });
      });
    });
  }
});

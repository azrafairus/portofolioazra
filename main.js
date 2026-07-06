/* ============================================================
   1. NAVBAR — tambah class "scrolled" saat di-scroll
============================================================ */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

/* ============================================================
   2. HAMBURGER MENU — toggle mobile nav
============================================================ */
const hamburger   = document.getElementById('hamburger');
const navMobile   = document.getElementById('navMobile');
const mobileLinks = document.querySelectorAll('.nav-link-mobile');

hamburger.addEventListener('click', () => {
  const isOpen = navMobile.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', String(isOpen));
});

// Tutup mobile nav saat salah satu link diklik
mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMobile.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

/* ============================================================
   3. ACTIVE NAV LINK — highlight menu sesuai section aktif
============================================================ */
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');

      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + id);
      });

      mobileLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + id);
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(section => sectionObserver.observe(section));

/* ============================================================
   4. ANIMATE ON SCROLL — fade-in + slide-up via IntersectionObserver
============================================================ */
const animateEls = document.querySelectorAll('.animate');

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target); // trigger sekali saja
    }
  });
}, { threshold: 0.12 });

animateEls.forEach(el => fadeObserver.observe(el));

/* ============================================================
   5. CONTACT FORM — submit handler tanpa backend
============================================================ */
const form        = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const submitBtn   = document.getElementById('submitBtn');

const SEND_ICON_SVG =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
  'stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' +
  '<line x1="22" y1="2" x2="11" y2="13"/>' +
  '<polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>';

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const nameVal    = form.querySelector('#name').value.trim();
  const emailVal   = form.querySelector('#email').value.trim();
  const messageVal = form.querySelector('#message').value.trim();

  // Highlight field yang kosong (warna merah 2 detik)
  let hasError = false;
  [['#name', nameVal], ['#email', emailVal], ['#message', messageVal]].forEach(([sel, val]) => {
    const field = form.querySelector(sel);
    if (!val) {
      field.style.borderColor = '#f87171';
      setTimeout(() => { field.style.borderColor = ''; }, 2000);
      hasError = true;
    }
  });
  if (hasError) return;

  // Simulasi pengiriman async
  submitBtn.disabled    = true;
  submitBtn.textContent = 'Mengirim...';

  setTimeout(() => {
    form.reset();
    formSuccess.classList.add('show');

    submitBtn.disabled = false;
    submitBtn.innerHTML = SEND_ICON_SVG + ' Kirim Pesan';

    // Sembunyikan pesan sukses setelah 5 detik
    setTimeout(() => formSuccess.classList.remove('show'), 5000);
  }, 1200);
});

/* ============================================================
   6. SMOOTH SCROLL — fallback untuk browser tanpa CSS scroll-behavior
============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

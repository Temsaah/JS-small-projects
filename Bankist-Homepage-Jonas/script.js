'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// =====================

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  section1.scrollIntoView({ behavior: 'smooth' });
});

document.querySelector('.nav__links').addEventListener('click', e => {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

const nav = document.querySelector('.nav');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const tabContents = document.querySelectorAll(`.operations__content`);

tabsContainer.addEventListener('click', function (e) {
  let clicked = e.target.closest('.operations__tab');

  if (!clicked) return;

  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  tabContents.forEach(content =>
    content.classList.remove('operations__content--active')
  );

  clicked.classList.add('operations__tab--active');

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

const handleHover = function (opacity, e) {
  if (e.target.classList.contains('nav__link')) {
    const targetLink = e.target;
    const logo = nav.querySelector('.nav__logo');

    document.querySelectorAll('.nav__link').forEach(link => {
      if (link != targetLink) {
        link.style.opacity = opacity;
      }
    });
    logo.style.opacity = opacity;
  }
};

nav.addEventListener('mouseover', handleHover.bind(null, 0.5));

nav.addEventListener('mouseout', handleHover.bind(null, 1));

const initialCoords = document
  .querySelector('#section--1')
  .getBoundingClientRect();

const header = document.querySelector('.header');

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${nav.getBoundingClientRect().height}px`,
});
headerObserver.observe(header);

const sections = document.querySelectorAll('section');

const showSection = function (entries, observe) {
  const [entry] = entries;

  if (entry.isIntersecting) {
    entry.target.classList.remove('section--hidden');
    observe.unobserve(entry.target);
  }
};

const sectionObserver = new IntersectionObserver(showSection, {
  root: null,
  threshold: 0.2,
});

sections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// Lazy loading images

const imgs = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observe) {
  const [entry] = entries;
  if (entry.isIntersecting) {
    entry.target.src = entry.target.dataset.src;
    entry.target.addEventListener('load', () =>
      entry.target.classList.remove('lazy-img')
    );
    observe.unobserve(entry.target);
  }
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0.1,
  rootMargin: '200px',
});
imgs.forEach(img => imgObserver.observe(img));

const slides = document.querySelectorAll('.slide');
const dotsContainer = document.querySelector('.dots');
const rightBtn = document.querySelector('.slider__btn--right');
const leftBtn = document.querySelector('.slider__btn--left');
let currSlide = 0;

const createDots = function () {
  slides.forEach(function (_, i) {
    dotsContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide='${i}'></button>`
    );
  });
};

createDots();

const activateDot = function (slide) {
  document.querySelectorAll('.dots__dot').forEach(dot => {
    dot.classList.remove('dots__dot--active');
  });

  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};

const goToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
  activateDot(slide);
};

const nextSlide = function () {
  if (currSlide === slides.length - 1) {
    currSlide = 0;
  } else currSlide++;

  goToSlide(currSlide);
};

const prevSlide = function () {
  if (currSlide === 0) currSlide = slides.length - 1;
  else currSlide--;

  goToSlide(currSlide);
};

goToSlide(0);

rightBtn.addEventListener('click', nextSlide);
leftBtn.addEventListener('click', prevSlide);

document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowLeft') prevSlide();
  if (e.key === 'ArrowRight') nextSlide();
});

dotsContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const slide = e.target.dataset.slide;

    goToSlide(slide);
  }
});

'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.contact__modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('.header');
const logo = document.querySelector('.nav__logo');
const h1 = document.querySelector('h1');
const allSections = document.querySelectorAll('.section');
const allButtons = document.getElementsByTagName('button');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const sec1 = document.querySelector('#section--1');
const links = document.querySelector('.nav__links');
const tabs = document.querySelectorAll('.projects__tab');
const tabsContainer = document.querySelector('.projects__tab-container');
const tabsContent = document.querySelectorAll('.projects__content');
const nav = document.querySelector('.nav');
const imageTargets = document.querySelectorAll('img[data-src]');

// visa message
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

const message = document.createElement('div');
message.classList.add('visa-message');

message.innerHTML = ` ALERT:  I require visa sponsorship to work in the UK ❕</p> <button class='btn btn--close-cookie'>Got it!</button>`;

header.prepend(message);

document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
  });

message.style.backgroundColor = '#37383d';
message.style.width = '120%';

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 40 + 'px';

// Page navigation
links.addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});
// btn scroll

btnScrollTo.addEventListener('click', function (e) {
  const s1Coords = sec1.getBoundingClientRect();
  console.log(s1Coords);
  console.log(e.target.getBoundingClientRect());

  sec1.scrollIntoView({ behavior: 'smooth' });
});

// Projects tabs

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.projects__tab');
  // Guard clause
  if (!clicked) return;
  // Toggle tab position
  tabs.forEach(tab => tab.classList.remove('projects__tab--active'));
  clicked.classList.add('projects__tab--active');
  // Display tab content
  tabsContent.forEach(tab =>
    tab.classList.remove('projects__content--active')
  );
  document
    .querySelector(`.projects__content--${clicked.dataset.tab}`)
    .classList.add('projects__content--active');
});

// Navigation display

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

// sticky navigation
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObs = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObs.observe(header);

// reveal sections
const revealSec = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};
const secObserver = new IntersectionObserver(revealSec, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(section => {
  secObserver.observe(section);
  section.classList.add('section--hidden');
});

// Lazy loading images
const loadImage = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
    observer.unobserve(entry.target);
  });
};
const imageObserver = new IntersectionObserver(loadImage, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});
imageTargets.forEach(image => imageObserver.observe(image));




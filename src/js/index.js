import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';


import { DotLottie } from '@lottiefiles/dotlottie-web';

const $navButton = document.querySelector('.nav__button');
const $navList = document.querySelector('.nav__list');
const $iconLink = document.querySelector('#iconlink');

$navButton.classList.remove('hidden');
$navList.classList.add("hidden");
// CANVAS RESIZE
const canvas = document.querySelector('.canvas'); 
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 50/100 * window.innerHeight;


// MOTION
const player = new DotLottie({
  autoplay: true,
  loop: true,
  canvas: document.querySelector("#anim"),
  src: "assets/motion/main0.json",
  marker: "box"
});



// NAV
const openNavigation = () => {
  $navButton.setAttribute("aria-expanded", "true");
  $iconLink.setAttribute("xlink:href", "#close");
  $navList.classList.remove("hidden");
}

const closeNavigation = () => {
  $navButton.setAttribute("aria-expanded", "false");
  $iconLink.setAttribute("xlink:href", "#navicon");
  $navList.classList.add("hidden");
}

const toggleNavigation = () => {
  const open = $navButton.getAttribute("aria-expanded");
  open === "false" ? openNavigation() : closeNavigation();
}

// DEMO MOUSEMOVE
// window.addEventListener('mousemove', handleGlobalUserInteraction);
// window.addEventListener('touchmove', handleGlobalUserInteraction);
// window.addEventListener('scroll', handleGlobalUserInteraction);
// requestAnimationFrame(interactionChecker);

// let lastInteractionTime = 0;
// const handleGlobalUserInteraction = () => {
//   lastInteractionTime = performance.now();
// };

// const interactionChecker = () => {
//   const timeSinceLastInteraction = performance.now() - lastInteractionTime;
//   const isInteracting = lastInteractionTime > 0 && timeSinceLastInteraction < 100;
//   requestAnimationFrame(interactionChecker);
// };

const init = () => {
  gsap.registerPlugin(ScrollTrigger, TextPlugin);
  ScrollTrigger.defaults({ markers: false });
  $navButton.addEventListener("click", toggleNavigation);
}

init();
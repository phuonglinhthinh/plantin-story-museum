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
canvas.height = window.innerHeight - 50 / 100 * window.innerHeight;

//RESPONSIVE
// let currentSrc = "";

// const loadMotion = () => {
//   const isMobile = window.matchMedia("(max-width: 425px)").matches;
//   const motionSrc = isMobile
//     ? "assets/motion/main0.json"
//     : "assets/motion/main.json";

//   if (currentSrc !== motionSrc) {
//     currentSrc = motionSrc;

//     const player = new DotLottie({
//       autoplay: true,
//       loop: true,
//       canvas: document.querySelector("#anim"),
//       src: motionSrc,
//       marker: "box",
//     });
//   }
// }
// loadMotion();

//MOTION
const player = new DotLottie({
  autoplay: true,
  loop: true,
  canvas: document.querySelector("#anim"),
  src: "assets/motion/main0.json",
  marker: "box",
});

const printingProcess = new DotLottie({
  autoplay: true,
  loop: true,
  canvas: document.querySelector("#printing-process"),
  src: "assets/motion/printing-process.json",
  marker: "step1",
});

const plantin = new DotLottie({
  autoplay: true,
  loop: true,
  canvas: document.querySelector("#plantin"),
  src: "assets/motion/christopherplantin.json",
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


const init = () => {
  gsap.registerPlugin(ScrollTrigger, TextPlugin);
  ScrollTrigger.defaults({ markers: false });

  $navButton.addEventListener("click", toggleNavigation);

  // window.addEventListener("resize", () => {
  //   loadMotion();
  // });
}

init();
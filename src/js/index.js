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
const resizeCanvas = () => {
  const canvases = document.querySelectorAll('.canvas');
  canvases.forEach((canvas) => {
    canvas.width = 0.7 * window.innerWidth;
    canvas.height = window.innerHeight - 0.5 * window.innerHeight;
  });
};
resizeCanvas();

// Function to control motion based on mouse activity
let motionTimeout;

const handleMouseMove = () => {
  clearTimeout(motionTimeout);

  // Start the motions if stopped
  if (player1.state !== "playing") player1.play();
  if (player2.state !== "playing") player2.play();

  // Set a timeout to pause the motions after 2 seconds of no movement
  motionTimeout = setTimeout(() => {
    player1.pause();
    player2.pause();
  }, 1000);
};

// Event listeners for mouse and touch movement
window.addEventListener("mousemove", handleMouseMove);
window.addEventListener("touchmove", handleMouseMove);

//MOTION
const player1 = new DotLottie({
  autoplay: true,
  loop: true,
  canvas: document.querySelector("#anim"),
  src: "assets/motion/main.json",
});

const player2 = new DotLottie({
  autoplay: true,
  loop: true,
  canvas: document.querySelector("#anim2"),
  src: "assets/motion/main0.json",
});

//PRINTING PRESS
const steps = [
  { marker: "step3", completed: false },
  { marker: "step4", completed: false },
  { marker: "step6", completed: false },
  { marker: "result1", completed: false },
  { marker: "result2", completed: false },
  { marker: "result3", completed: false },
];

const player = new DotLottie({
  autoplay: false,
  loop: false,
  canvas: document.querySelector("#printing-process"),
  src: "assets/motion/printing-process.json",
});

// Handle button clicks
const handleStepClick = (e) => {
  const stepIndex = parseInt(e.target.getAttribute("data-step"), 10) - 1;

  if (stepIndex > 0 && !steps[stepIndex - 1].completed) {
    alert("Please complete the previous step first.");
    return;
  }

  player.setMarker(steps[stepIndex].marker);
  player.play();

  // When the step finishes playing, mark it as completed
  player.addEventListener("complete", () => {
    steps[stepIndex].completed = true;
    // alert(`Step ${stepIndex + 1} completed!`);
  });
};

document.querySelectorAll("button[data-step]").forEach((button) => {
  button.addEventListener("click", handleStepClick);
});


//PLANTIN ONLY
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

  // window.addEventListener('resize', resizeCanvas);
}

init();
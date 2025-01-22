import { DotLottie } from '@lottiefiles/dotlottie-web';

const $navButton = document.querySelector('.nav__button');
const $navList = document.querySelector('.nav__list');
const $iconLink = document.querySelector('#iconlink');
const listItems = $navList.querySelectorAll("li a");

$navButton.classList.remove('hidden');
$navList.classList.add("hidden");

const player = new DotLottie({
  autoplay: true,
  loop: true,
  canvas: document.querySelector("#anim"),
  src: "assets/motion/main.json",
  marker: "box"
});

const openNavigation = () => {
  $navButton.setAttribute("aria-expanded", "true");
  $iconLink.setAttribute("xlink:href", "#close");
  $navList.classList.remove("hidden");
  console.log("working");
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


const handleBlur = () => {
  // if (!e.relatedTarget || !$navList.contains(e.relatedTarget)) {
  closeNavigation();
}
// }

$navButton.addEventListener("click", toggleNavigation);

// add event to the last item in the nav list to trigger the disclosure to close if the user tabs out of the disclosure
listItems[listItems.length - 1].addEventListener("blur", handleBlur);

// Close the disclosure if a user presses the escape key
window.addEventListener("keyup", (e) => {
  if (e.key === "Escape") {
    $navButton.focus();
    closeNavigation();
  }
});

window.addEventListener('mousemove', handleGlobalUserInteraction);
window.addEventListener('touchmove', handleGlobalUserInteraction);
window.addEventListener('scroll', handleGlobalUserInteraction);
requestAnimationFrame(interactionChecker);


let lastInteractionTime = 0;

const handleGlobalUserInteraction = () => {
  lastInteractionTime = performance.now();
};

const interactionChecker = () => {
  const timeSinceLastInteraction = performance.now() - lastInteractionTime;
  const isInteracting = lastInteractionTime > 0 && timeSinceLastInteraction < 100;
  console.log(isInteracting);
  requestAnimationFrame(interactionChecker);
};



const init = () => {
  gsap.registerPlugin(ScrollTrigger, TextPlugin);
  ScrollTrigger.defaults({ markers: false });
  openNavigation();
  closeNavigation();
  toggleNavigation();
  $navButton.addEventListener("click", toggleNavigation);
}
init();
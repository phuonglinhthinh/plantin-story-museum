import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DotLottie } from '@lottiefiles/dotlottie-web';

const $navButton = document.querySelector('.nav__button');
const $navList = document.querySelector('.nav__list');
const $iconLink = document.querySelector('#iconlink');

$navButton.classList.remove('hidden');
$navList.classList.add("hidden");

let heroPlayer = null;
const createHeroPlayer = () => {
  if (heroPlayer) {
    heroPlayer.destroy();
    heroPlayer = null;
  }

  const existingCanvas = document.querySelector('#hero__canvas');
  if (existingCanvas) {
    existingCanvas.classList.remove();
    existingCanvas.classList.add('canvas')
  }

  const isDesktop = window.matchMedia('(min-width: 62em)').matches;
  const jsonName = isDesktop
    ? "assets/motion/main.json"
    : "assets/motion/main.json";

  const canvas = document.querySelector('#hero__canvas')
  isDesktop ? canvas.classList.add('desktop-motion') : canvas.classList.add('mobile-motion');

  heroPlayer = new DotLottie({
    autoplay: true,
    loop: true,
    canvas: canvas,
    src: jsonName,
  });
};

// Function to control motion based on mouse activity
let motionTimeout = 0;
const handleMouseMove = (e) => {
  clearTimeout(motionTimeout);

  if (heroPlayer.isPaused) heroPlayer.play();

  motionTimeout = setTimeout(() => {
    heroPlayer.pause();
  }, 500);
};

document.addEventListener("pointermove", handleMouseMove);
document.addEventListener("touchmove", handleMouseMove);

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

const handleStepClick = (e) => {
  const stepIndex = parseInt(e.target.getAttribute("data-step"), 10) - 1;

  if (stepIndex > 0 && !steps[stepIndex - 1].completed) {
    alert("Please complete the previous step first.");
    return;
  }

  player.setMarker(steps[stepIndex].marker);
  player.play();

  player.addEventListener("complete", () => {
    steps[stepIndex].completed = true;
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

// CANVAS RESIZE
const resizeCanvas = () => {
  plantin.resize();
  player.resize();
  createHeroPlayer();
};
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// GSAP 
//navigation
const heroAnimation = () => {
  gsap.from('.nav', {
    y: -100,
    ease: "power3.out",
    stagger: 0.5,
    duration: 1
  })
  gsap.from('.hero__title', {
    y: 100,
    ease: "power3.out",
    stagger: 0.5,
    duration: 1
  })

}
//Split text
// const splitText = (selector) => {
//   const elements = document.querySelectorAll(selector);
//   elements.forEach((el) => {
//     const text = el.textContent;
//     el.innerHTML = text
//       .split('')
//       .map((char) => (char.trim() ? `<span>${char}</span>` : char))
//       .join('');
//   });
// };
// const animateTitles = () => {
//   splitText('.slogan');
//   gsap.from(
//     '.slogan span',
//     {
//       y: 100,
//       opacity: 0,
//       stagger: 0.05,
//       ease: 'back.out(1.7)',
//       duration: 0.5,
//     }
//   );
// }

const animateAvatarOnScroll = () => {
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.journey',
      start: 'top 70%',
      end: 'bottom 40%',
      scrub: true,
      markers: false,
    }
  });

  tl.to('#plantin', {
    x: 700,
    y: 0,
    scale: 0.5,
  });

  tl.to('#plantin', {
    x: 900,
    y: -300,
    scale: 0,
  });
};

const animateWorkshop = () => {
  gsap.from('.workshop__img', {
    scale: 1.5,
    ease: 'none',
    scrollTrigger: {
      trigger: '.workshop',
      start: 'top 50%',
      end: 'bottom 50%',
      scrub: true,
      marker: false,
    },
  })
}

//Roller printing
const animateRoller = () => {
  let tl = gsap.timeline();

  tl.to('.printing__rubber', {
    x: -100,
    y: 450,
    rotate: 90,
  });

  tl.to('.printing__rubber', {
    x: -400,
    y: 450,
    rotate: 50,
  });
};


document.querySelector("#roller__button").addEventListener("click", animateRoller)

//bio
const bioImage = () => {
  gsap.to('.bio__img', {
    x: 0,
    y: 50,
    scrollTrigger: {
      trigger: '.bio',
      start: 'top 40%',
      end: 'bottom 95%',
      scrub: true,
      marker: false,
    },
  })
}

//COMPASS
const compass = new DotLottie({
  canvas: document.querySelector("#compass"),
  src: "assets/motion/compass.json",
});
const compassAnimation = () => {
  gsap.to(compass.canvas, {
    scrollTrigger: {
      trigger: '.data',
      start: 'top 0%',
      end: '+=500',
      pin: true,
      scrub: true,
      onUpdate: (self) => {
        compass.setFrame(self.progress * (compass.totalFrames - 1));
      }
    },
  })
};
//STACKING DATA
const stackingData = () => {
  gsap.set('.data__card', { position: 'absolute' });
  gsap.to('.data__card', {
    yPercent: -100,
    stagger: 0.5,
    scrollTrigger: {
      trigger: '.data',
      start: 'top 10%',
      end: '+=500',
      pin: true,
      scrub: true,
    },
  })
};

const init = () => {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.defaults({ markers: false });

  $navButton.addEventListener("click", toggleNavigation);
  // animateTitles();
  heroAnimation();
  animateAvatarOnScroll();
  // animateAvatarTravel();
  animateWorkshop();
  animateRoller();
  // animateRollerContinue();
  bioImage();
  compassAnimation();
  stackingData();
}

init();
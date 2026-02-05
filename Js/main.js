gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Observer);



const slides = gsap.utils.toArray(".slide");
const duration = 1;
const pause = 4;

const counterEl = document.querySelector(".counter");
const bar = document.querySelector(".bar");

gsap.set(slides, { xPercent: 100, position: "absolute" });
gsap.set(slides[0], { xPercent: 0 });

const tl = gsap.timeline({ repeat: -1 });


slides.forEach((slide, i) => {
  const next = slides[(i + 1) % slides.length];

  tl.add("slide-" + i)
    .add(() => {
      if (counterEl) {
        counterEl.textContent = `${i + 1} / ${slides.length}`;
      }
    })

    // fill (right edge moves)
    .to(bar, {
      scaleX: 1,
      duration: pause,
      ease: "none"
    })

    // chase (left edge follows fast)
    .to(bar, {
      scaleX: 0,
      transformOrigin: "right",
      duration: 0.25,   // fast chase
      ease: "power2.out"
    })

    // reset origin for next loop
    .set(bar, { transformOrigin: "left" })
    .add("change")

    .to(slide, {
      xPercent: -100,
      duration: duration,
      ease: "power2.inOut"
    }, "change")
    .to(next, {
      xPercent: 0,
      duration: duration,
      ease: "power2.inOut"
    }, "change")

    .set(slide, { xPercent: 100 });

});


ScrollTrigger.clearScrollMemory();
window.history.scrollRestoration = "manual";

const scaletl = gsap.timeline({
  scrollTrigger: {
    trigger: ".hero-wrapper",
    start: "top top",
    end: "+=800",
    scrub: 0.2,
    pin: true,
    pinSpacing: true,
    onUpdate: (self) => {
      // Improved logic: Use self.progress for more reliability than self.scroll()
      if (self.progress < 0.01) {
        if (tl.paused()) tl.play();
      } else {
        if (!tl.paused()) tl.pause();
      }
    }
  }
})
  .to(".img-container", {
    scale: 0.9,
    ease: "none"
  });

// Refresh after images load
Promise.all(
  Array.from(document.images)
    .filter(img => !img.complete)
    .map(img => new Promise(resolve => {
      img.onload = img.onerror = resolve;
    }))
).then(() => {
  ScrollTrigger.refresh();
});




const heading = document.querySelector(".heading");
const progress = document.querySelector(".progress");
const counter = document.querySelector(".counter");
const logo = document.querySelector(".logo");
const items = [heading, progress, counter]

gsap.set(items, {
  opacity: window.scrollY > 50 ? 0 : 1
});

ScrollTrigger.create({
  start: 200,
  onEnter: () => {
    gsap.to(items, { opacity: 0, duration: 0.3, overwrite: "auto" });
    gsap.to(heading, { x: -20, opacity: 0, duration: 0.3, overwrite: "auto" });
    gsap.to(logo, { x: 80, scale: 0.8, duration: 0.5, overwrite: "auto" });
  },
  onLeaveBack: () => {
    gsap.to(items, { opacity: 1, duration: 0.3, overwrite: "auto" });
    gsap.to(heading, { x: 0, opacity: 1, duration: 0.3, overwrite: "auto" });
    gsap.to(logo, { x: 0, scale: 1, duration: 0.5, overwrite: "auto" });
  }
});

const header = document.querySelector("header")
let hidden = false;

Observer.create({
  target: window,
  type: "wheel, touch",
  tolerance: 0,
  onDown: () => {
    if (!hidden) {
      hidden = true;
      gsap.to(header, { y: "-100%", duration: 0.3, ease: "power2.out" });
    }
  },

  onUp: () => {
    if (hidden) {
      hidden = false;
      gsap.to(header, { y: "0%", duration: 0.3, ease: "power2.out" })
    }
  }
})


gsap.fromTo(".tagline",
  {
    scale: 1,
    y: 70,
  },
  {
    scale: 1,
    y: -40,   // Moves up into position as you scroll
    opacity: 1,
    ease: "none",
    scrollTrigger: {
      trigger: ".tagline",
      // Start when the top of the element hits the bottom of the viewport
      start: "top bottom",
      // End when the bottom of the element reaches the top of the viewport
      end: "bottom top",
      scrub: true // Ties the animation progress to the scrollbar
    }
  }
);
const halltl = gsap.timeline({
  scrollTrigger: {
    trigger: ".hall-container",
    start: "top bottom",
    end: "bottom top",
    scrub: true,
  }
});

halltl.fromTo(".hall-img", { y: -150 }, { y: 100, ease: "none", force3D: true }, 0)
  .fromTo(".hall-area", { x: -90 }, { x: 100, ease: "power2.out", force3D: true }, 0);



const designText = document.querySelector(".office-text");
const letters = designText.textContent.split("");

designText.innerHTML = letters
  .map(char =>
    char === " "
      ? `<span class="char space"> </span>`
      : `<span class="char">${char}</span>`
  )
  .join("");


gsap.to(".char", {
  color: "white",
  opacity: 1,
  stagger: 0.6,
  duration: 1,
  scrollTrigger: {
    trigger: ".office-text",
    start: "top 100%",
    end: "top 5%",
    scrub: true
  }
});

const kbTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: ".kb-section",
    start: "top 90%",
    toggleActions: "play none none none"
  }
});

gsap.set([".bathroom-container", ".kitchen-container"], {
  y: 200,
  autoAlpha: 0,
  force3D: true
});

kbTimeline
  .to(".bathroom-container", {
    y: 0,
    autoAlpha: 1,
    duration: 1,
    ease: "power2.out"
  }, 0)
  .to(".kitchen-container", {
    y: 0,
    autoAlpha: 1,
    duration: 1,
    ease: "power2.out"
  }, 0);



const bedroomtl = gsap.timeline({
  scrollTrigger: {
    trigger: ".bedroom-container",
    start: "top bottom",
    end: "bottom top",
    scrub: true,
  }
});

bedroomtl.fromTo(".bedroom-img", { y: -150 }, { y: 100, ease: "none" }, 0)
  .fromTo(".bedroom-area", { x: 310 }, { x: 90, ease: "power2.out" }, 0);


const text = document.querySelector(".wave-text");
const words = text.innerText.split(" ");

text.innerHTML = words
  .map(word => `<span class="inline-block overflow-hidden"><span class="word inline-block">${word}&nbsp;</span></span>`)
  .join("");

gsap.from(".word", {
  y: 30,
  opacity: 0,
  ease: "power3.out",
  duration: 0.8,
  stagger: 0.08,
  scrollTrigger: {
    trigger: text,
    start: "top 80%",
  }
});

const pinRevealTL = gsap.timeline({
  scrollTrigger: {
    trigger: ".pin-section",
    start: "top top",
    end: "+=1200", // pin duration + animation
    scrub: 1,
    pin: true,
    anticipatePin: 1,
    invalidateOnRefresh: true
  },
  defaults: { ease: "none" }
});

pinRevealTL.to({}, { duration: 0.7 });

pinRevealTL.to(".white-panel", {
  yPercent: -95,
  duration: 1.2
}, 0.1);



// Lenis
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
});

lenis.on("scroll", ScrollTrigger.update);


gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

ScrollTrigger.scrollerProxy(document.documentElement, {
  scrollTop(value) {
    return arguments.length
      ? lenis.scrollTo(value, { immediate: true })
      : lenis.scroll;
  },
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight
    };
  }
});


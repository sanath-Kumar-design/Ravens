const slides = gsap.utils.toArray(".slide");
let index = 0;

gsap.set(slides[0], { x: "0%" });

setInterval(() => {
  const current = slides[index];
  index = (index + 1) % slides.length;
  const next = slides[index];
  document.querySelector(".counter").textContent =
  `${index + 1} / ${slides.length}`;

  gsap.set(next, { x: "100%" });

  gsap.to(current, { x: "-100%", duration: 1, ease: "power2.inOut" });
  gsap.to(next, { x: "0%", duration: 1, ease: "power2.inOut" });

}, 4000);
const slider = document.querySelector(".slider");
const images = document.querySelectorAll(".slider img");
const dots = document.querySelectorAll(".dot");
const totalImages = images.length;
let index = 0;

function updateDots() {
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index % (totalImages - 1));
  });
}

function nextSlide() {
  index++;
  slider.style.transition = "transform 1s ease-in-out";
  slider.style.transform = `translateX(-${index * 100}%)`;
  updateDots();

  if (index === totalImages - 1) {
    setTimeout(() => {
      slider.style.transition = "none";
      slider.style.transform = "translateX(0)";
      index = 0;
      updateDots();
    }, 1000);
  }
}

setInterval(nextSlide, 3500);

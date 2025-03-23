const slider = document.querySelector(".slider");
const images = document.querySelectorAll(".slider img");
const dots = document.querySelectorAll(".dot");
const totalImages = images.length;
let index = 0;
let interval;
let touchStartX = 0;
let touchEndX = 0;

function updateDots() {
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index % (totalImages - 1));
  });
}

function goToSlide(newIndex) {
  index = newIndex;
  slider.style.transition = "transform 1s ease-in-out";
  slider.style.transform = `translateX(-${index * 100}%)`;
  updateDots();

  clearInterval(interval);
  interval = setInterval(nextSlide, 3000);
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

function prevSlide() {
  index--;
  if (index < 0) {
    index = totalImages - 2; 
  }
  slider.style.transition = "transform 1s ease-in-out";
  slider.style.transform = `translateX(-${index * 100}%)`;
  updateDots();

  clearInterval(interval);
  interval = setInterval(nextSlide, 3000);
}

dots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    goToSlide(i);
  });
});

slider.addEventListener("touchstart", (e) => {
  touchStartX = e.touches[0].clientX;
});

slider.addEventListener("touchmove", (e) => {
  touchEndX = e.touches[0].clientX;
});

slider.addEventListener("touchend", () => {
  const swipeThreshold = 50;
  const swipeDistance = touchEndX - touchStartX;

  if (swipeDistance > swipeThreshold) {
    prevSlide();
  } else if (swipeDistance < -swipeThreshold) {
    nextSlide();
  }
});

interval = setInterval(nextSlide, 3000);
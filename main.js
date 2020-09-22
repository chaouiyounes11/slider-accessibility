const slides = document.querySelectorAll(".slide");
const sliderContainer = document.querySelector(".slider");
const sliderBox = document.querySelector(".container-slider");
const sliderWidth = sliderBox.offsetWidth - 2;
const leftBtn = document.querySelector(".left");
const rightBtn = document.querySelector(".right");
const bulletActive = document.querySelector(".active");
const bullets = document.querySelectorAll(".bullet");
const imgs = document.getElementsByTagName("img");
const spanSrOnlyBullets = document.querySelectorAll(".bullet .sr-only");
const spanSrOnlyArrows = document.querySelectorAll(".navigation .sr-only");
let slideNumber = document.querySelector(".slide-number");
const total = document.querySelector(".total");
let index = 0;
let trackBullets = 0;
let sizeSlides;
let units;
let i = 0;

if (window.innerWidth < 768) {
  sizeSlides = sliderWidth;
  units = "px";
} else {
  sizeSlides = 700;
  units = "px";
}

total.innerText = slides.length;

spanSrOnlyArrows[0].innerText = imgs[slides.length - 1].alt;
spanSrOnlyArrows[1].innerText = imgs[index + 1].alt;

const counterSlides = () => {
  slideNumber.innerText = index + 1;
};

const SR = () => {
  if (index === 0) {
    spanSrOnlyArrows[0].innerText = imgs[slides.length - 1].alt;
    spanSrOnlyArrows[1].innerText = imgs[index + 1].alt;
  } else if (index === slides.length - 1) {
    spanSrOnlyArrows[0].innerText = imgs[slides.length - 2].alt;
    spanSrOnlyArrows[1].innerText = imgs[0].alt;
  } else {
    spanSrOnlyArrows[0].innerText = imgs[index - 1].alt;
    spanSrOnlyArrows[1].innerText = imgs[index + 1].alt;
  }
};
const nextSlides = () => {
  if (index === 0) {
    sliderContainer.style.transform = `translateX(-${
      (slides.length - 1) * sizeSlides + units
    })`;
    bulletActive.classList.remove("active");
    index = slides.length - 1;
    bullets[index].classList.add("active");
  } else {
    index--;
    sliderContainer.style.transform = `translateX(-${
      index * sizeSlides + units
    })`;
    bullets[index + 1].classList.remove("active");
  }
  bullets[index].classList.add("active");
  SR();
  counterSlides();
};

const prevSlides = () => {
  index++;
  if (index === slides.length) {
    sliderContainer.style.transform = "translateX(0vw)";
    bullets[index - 1].classList.remove("active");
    index = 0;
    bullets[index].classList.add("active");
  } else {
    sliderContainer.style.transform = `translateX(-${
      index * sizeSlides + units
    })`;
    bullets[index].classList.add("active");
    bullets[index - 1].classList.remove("active");
  }
  SR();
  counterSlides();
};

sliderContainer.style.width = `${slides.length * sizeSlides + units}`;

for (let i = 0; i < slides.length; i++) {
  spanSrOnlyBullets[i].innerText = imgs[i].alt;
  slides[i].style.width = `${sliderWidth}px`;

  bullets[i].onclick = function () {
    sliderContainer.style.transform = `translateX(-${i * sizeSlides + units})`;
    bullets[index].classList.remove("active");
    this.classList.add("active");
    index = i;
    SR();
    counterSlides();
  };
}

leftBtn.addEventListener("click", nextSlides);
rightBtn.addEventListener("click", prevSlides);

document.addEventListener("keydown", keyPressed);

function keyPressed(e) {
  if (e.keyCode === 37) {
    nextSlides();
  } else if (e.keyCode === 39) {
    prevSlides();
  }
}

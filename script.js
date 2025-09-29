const galleryImages = document.querySelectorAll('.gallery img');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.querySelector('.lightbox-image');
const closeBtn = document.querySelector('.close');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let currentIndex = 0;

function showImage(index) {
  lightboxImage.src = galleryImages[index].src;
  currentIndex = index;
  lightbox.style.display = 'flex';
}

galleryImages.forEach((img, index) => {
  img.addEventListener('click', () => showImage(index));
});

closeBtn.addEventListener('click', () => {
  lightbox.style.display = 'none';
});

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
  showImage(currentIndex);
});

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % galleryImages.length;
  showImage(currentIndex);
});

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = 'none';
  }
});

const slidesContainer = document.querySelector('.hero-slides');
let slides = Array.from(document.querySelectorAll('.hero-slides .slide'));

// Shuffle slides once at start
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

slides = shuffle(slides);
slides.forEach(slide => slidesContainer.appendChild(slide));

let current = 0;

// Initialize slides: first slide active, rest default off-screen right
slides.forEach((slide, index) => {
  slide.classList.remove('active', 'prev');
  if (index === 0) slide.classList.add('active');
});

// Slide function
function nextSlide() {
  const prev = current;
  current = (current + 1) % slides.length;

  slides[prev].classList.remove('active');
  slides[prev].classList.add('prev');

  slides[current].classList.add('active');

  setTimeout(() => {
    slides[prev].classList.remove('prev');
  }, 1000); // matches CSS transition
}

// Carousel control
let carouselInterval;

function startCarousel() {
  carouselInterval = setInterval(nextSlide, 5000);
}

function stopCarousel() {
  clearInterval(carouselInterval);
}

// Pause carousel when tab is hidden
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    stopCarousel();
  } else {
    startCarousel();
  }
});

// Start initially
startCarousel();
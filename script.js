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
const slidesNodeList = document.querySelectorAll('.hero-slides .slide');
let slides = Array.from(slidesNodeList);

// Shuffle slides
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Apply shuffle
slides = shuffle(slides);

// Re-append shuffled slides
slides.forEach(slide => slidesContainer.appendChild(slide));

let current = 0;

// Initialize first slide
slides.forEach((slide, index) => {
  slide.classList.remove('active', 'prev');
  if (index === 0) slide.classList.add('active');
});

// Slide function
function nextSlide() {
  const prevSlide = current;
  current = (current + 1) % slides.length;

  slides[prevSlide].classList.remove('active');
  slides[prevSlide].classList.add('prev'); // move left
  slides[current].classList.add('active'); // move in from right

  // Reset prev class after transition
  setTimeout(() => {
    slides[prevSlide].classList.remove('prev');
  }, 1000); // matches CSS transition
}

// Start automatic carousel
setInterval(nextSlide, 5000);


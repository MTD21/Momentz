// === Cloudinary Image URLs ===
const imageUrls = [
  "https://res.cloudinary.com/djy9cvfmo/image/upload/v1759110831/image0_ntnwmd.png",
  "https://res.cloudinary.com/djy9cvfmo/image/upload/v1759110831/image1_bk2qrz.png",
  "https://res.cloudinary.com/djy9cvfmo/image/upload/v1759110831/image2_iobluf.png",
  "https://res.cloudinary.com/djy9cvfmo/image/upload/v1759110832/image3_xilb4l.png",
  "https://res.cloudinary.com/djy9cvfmo/image/upload/v1759110831/image4_beo4hf.png",
  "https://res.cloudinary.com/djy9cvfmo/image/upload/v1759110832/image5_sa70oj.png",
  "https://res.cloudinary.com/djy9cvfmo/image/upload/v1759110832/image6_w5rzod.png",
  "https://res.cloudinary.com/djy9cvfmo/image/upload/v1759110832/image7_nmhv0k.png",
  "https://res.cloudinary.com/djy9cvfmo/image/upload/v1759110832/image8_dc1mha.png",
  "https://res.cloudinary.com/djy9cvfmo/image/upload/v1759110832/image9_hjoihc.png",
  "https://res.cloudinary.com/djy9cvfmo/image/upload/v1759110832/image10_n13fa9.png",
  "https://res.cloudinary.com/djy9cvfmo/image/upload/v1759110832/image11_mgpijw.png",
  "https://res.cloudinary.com/djy9cvfmo/image/upload/v1759110833/image12_adlbfe.png",
  "https://res.cloudinary.com/djy9cvfmo/image/upload/v1759110833/image13_qle34a.png",
  "https://res.cloudinary.com/djy9cvfmo/image/upload/v1759110833/image14_ecimpl.png",
  "https://res.cloudinary.com/djy9cvfmo/image/upload/v1759110833/image15_zt1vct.png"
];

// === Generate Hero Slides ===
const slidesContainer = document.querySelector(".hero-slides");
imageUrls.forEach((url, index) => {
  const img = document.createElement("img");
  img.src = url;
  img.alt = `Slide ${index}`;
  img.className = "slide";
  if (index === 0) img.classList.add("active");
  slidesContainer.appendChild(img);
});

// === Generate Portfolio Gallery ===
const gallery = document.querySelector(".gallery");
imageUrls.forEach((url, index) => {
  const card = document.createElement("div");
  card.className = "card";

  const img = document.createElement("img");
  img.src = url;
  img.alt = `Project Render ${index}`;

  const caption = document.createElement("p");

  card.appendChild(img);
  card.appendChild(caption);
  gallery.appendChild(card);
});

// === Hero Slideshow Logic ===
let slides = Array.from(document.querySelectorAll(".hero-slides .slide"));
let current = 0;

// Shuffle slides once
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

slides = shuffle(slides);
slides.forEach(slide => slidesContainer.appendChild(slide));

function nextSlide() {
  const prev = current;
  current = (current + 1) % slides.length;

  slides[prev].classList.remove("active");
  slides[prev].classList.add("prev");

  slides[current].classList.add("active");

  setTimeout(() => {
    slides[prev].classList.remove("prev");
  }, 1000); // must match CSS transition
}

let carouselInterval;
function startCarousel() {
  carouselInterval = setInterval(nextSlide, 5000);
}
function stopCarousel() {
  clearInterval(carouselInterval);
}

// Pause slideshow on tab change
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    stopCarousel();
  } else {
    startCarousel();
  }
});
startCarousel();

// === Lightbox Logic ===
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.querySelector(".lightbox-image");
const closeBtn = document.querySelector(".close");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let currentLightboxIndex = 0;

// Open lightbox
function openLightbox(index) {
  currentLightboxIndex = index;
  lightbox.style.display = "flex";
  lightboxImg.src = imageUrls[currentLightboxIndex];
}

// Close lightbox
function closeLightbox() {
  lightbox.style.display = "none";
}

// Navigate lightbox
function showPrev() {
  currentLightboxIndex =
    (currentLightboxIndex - 1 + imageUrls.length) % imageUrls.length;
  lightboxImg.src = imageUrls[currentLightboxIndex];
}

function showNext() {
  currentLightboxIndex = (currentLightboxIndex + 1) % imageUrls.length;
  lightboxImg.src = imageUrls[currentLightboxIndex];
}

// Event Listeners
closeBtn.addEventListener("click", closeLightbox);
prevBtn.addEventListener("click", showPrev);
nextBtn.addEventListener("click", showNext);

// Open lightbox when clicking on portfolio images
document.querySelectorAll(".gallery img").forEach((img, index) => {
  img.addEventListener("click", () => openLightbox(index));
});

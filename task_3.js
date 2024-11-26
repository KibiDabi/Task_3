class SwiperController {
  constructor(selector) {
    this.selector = selector;
    this.swiperInstance = null;
  }

  initialize() {
    if (this.swiperInstance) return; // Prevent reinitializing if already active

    this.swiperInstance = new Swiper(this.selector, {
      loop: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      slidesPerView: 3, // Show 3 slides at once for larger screens
      spaceBetween: 20, // Add spacing between slides
      breakpoints: {
        375: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        1440: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
      },
      on: {
        slideChange: () => {
          if (this.swiperInstance) {
            console.log("Active slide index:", this.swiperInstance.activeIndex);
          }
        },
      },
    });

    console.log("Swiper initalized.");
  }

  destroy() {
    if (this.swiperInstance) {
      this.swiperInstance.destroy(true, true);
      this.swiperInstance = null;
      console.log("Swiper destroyed.");
    }
  }
}

const swiperController = new SwiperController(".swiper-container");

// Initialize Swiper immediately on page load
swiperController.initialize();

let isSwiperActive = true;

const toggleButton = document.getElementById("toggle-swiper");

toggleButton.addEventListener("click", () => {
  if (isSwiperActive) {
    swiperController.destroy();
    toggleButton.textContent = "Activate Swiper";
  } else {
    swiperController.initialize();
    toggleButton.textContent = "Deactivate Swiper";
  }
  isSwiperActive = !isSwiperActive;
});

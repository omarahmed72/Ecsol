// دالة تغيير خلفية شريط التنقل وتفعيل حركات Parallax عند التمرير للأسفل
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".main-navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  // ==========================================
  // تأثير التباعد (Parallax Effect) لصور At a Glance
  // ==========================================
  const atAGlanceSection = document.querySelector(".at-a-glance");
  if (atAGlanceSection) {
    const rect = atAGlanceSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // التحقق من أن القسم مرئي في الشاشة لتقليل استهلاك الموارد
    if (rect.top < windowHeight && rect.bottom > 0) {
      const imgMain = document.querySelector(".img-main");
      const imgOverlay = document.querySelector(".img-overlay");

      // حساب مقدار التمرير الخاص بالقسم
      const scrolled = windowHeight - rect.top;

      // تحريك الصورة الرئيسية ببطء للأسفل قليلاً
      imgMain.style.transform = `translateY(${scrolled * 0.03}px)`;
      // تحريك الصورة المتراكبة بشكل أسرع للأعلى لعمل تأثير العمق
      imgOverlay.style.transform = `translateY(${scrolled * -0.09}px)`;
    }
  }
});

// ==========================================
// تأثير الظهور التدريجي (Scroll Reveal) للعناصر
// ==========================================
document.addEventListener("DOMContentLoaded", function () {
  const revealElements = document.querySelectorAll(".reveal-element");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // عندما يظهر العنصر في الشاشة نعطيه كلاس active
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        } else {
          // عند الخروج من الشاشة (سواء لأعلى أو لأسفل) نزيل الكلاس لتعود الحركة عند الدخول مجدداً
          entry.target.classList.remove("active");
        }
      });
    },
    {
      root: null,
      threshold: 0.15, // تشغيل الحركة عندما يظهر 15% من العنصر
    },
  );

  revealElements.forEach((el) => revealObserver.observe(el));
});

// ==========================================
// إعدادات الـ Hero Slider الرئيسي
// ==========================================
const heroSlides = document.querySelectorAll(".hero-slide");
const btnPrevSlide = document.getElementById("btnPrevSlide");
const btnNextSlide = document.getElementById("btnNextSlide");
const currentSlideNum = document.getElementById("currentSlideNum");
const totalSlidesNum = document.getElementById("totalSlidesNum");
let currentHeroIndex = 0;
const totalHeroSlides = heroSlides.length;

totalSlidesNum.innerText = totalHeroSlides.toString().padStart(2, "0");

function updateHeroSlider() {
  heroSlides.forEach((slide) => slide.classList.remove("active"));
  btnPrevSlide.classList.remove("active");
  btnNextSlide.classList.remove("active");

  heroSlides[currentHeroIndex].classList.add("active");
  currentSlideNum.innerText = (currentHeroIndex + 1)
    .toString()
    .padStart(2, "0");
}

btnNextSlide.addEventListener("click", () => {
  currentHeroIndex = (currentHeroIndex + 1) % totalHeroSlides;
  updateHeroSlider();
  btnNextSlide.classList.add("active");
});

btnPrevSlide.addEventListener("click", () => {
  currentHeroIndex = (currentHeroIndex - 1 + totalHeroSlides) % totalHeroSlides;
  updateHeroSlider();
  btnPrevSlide.classList.add("active");
});

setInterval(() => {
  currentHeroIndex = (currentHeroIndex + 1) % totalHeroSlides;
  updateHeroSlider();
  btnPrevSlide.classList.remove("active");
  btnNextSlide.classList.add("active");
}, 6000);

// ==========================================
// دالة مخصصة لتحريك شرائط التمرير (الأخبار والمشاريع) يميناً ويساراً
// ==========================================
function scrollContainer(containerId, direction) {
  const container = document.getElementById(containerId);
  const scrollAmount = 350;

  if (direction === "right") {
    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  } else {
    container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  }

  if (containerId === "projectsCarousel") {
    const btns = document.querySelectorAll(".nav-btn-line");
    btns.forEach((btn) => btn.classList.remove("active"));
    if (direction === "left") btns[0].classList.add("active");
    if (direction === "right") btns[1].classList.add("active");
  }
}

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

// about Page

// تغيير خلفية النافبار عند التمرير
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".main-navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// أنيميشن الظهور عند التمرير (Scroll Reveal)
document.addEventListener("DOMContentLoaded", function () {
  const revealElements = document.querySelectorAll(".reveal-element");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    },
    { threshold: 0.15 },
  );
  revealElements.forEach((el) => revealObserver.observe(el));
});

// ==========================================
// منطق قسم التاريخ (History Logic)
// ==========================================
const historyData = [
  {
    year: "1950",
    text: "Onsi Sawiris establishes a construction company in Upper Egypt.",
    img: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
  },
  {
    year: "1976",
    text: "Orascom Onsi Sawiris & Co. (OOSC) is founded as a general contractor and trading company.",
    img: "https://images.unsplash.com/photo-1541888081640-14dd8a3eb258?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
  },
  {
    year: "1985",
    text: "OOSC establishes its first overseas company, Contrack International LLC (Contrack) in Virginia, US.",
    img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
  },
  {
    year: "1998",
    text: "OOSC is converted from a limited partnership into a joint-stock company and renamed.",
    img: "https://images.unsplash.com/photo-1518349619113-03114f06ac3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
  },
];

let currentHistoryIdx = 0;
const historyListEl = document.getElementById("historyList");
const historyYearEl = document.getElementById("historyYear");
const historyTextEl = document.getElementById("historyText");
const historyBgImg = document.getElementById("historyBgImg");

// بناء قائمة السنوات
historyData.forEach((item, index) => {
  const li = document.createElement("li");
  li.innerText = item.year;
  li.onclick = () => setHistory(index);
  historyListEl.appendChild(li);
});

function setHistory(index) {
  currentHistoryIdx = index;
  Array.from(historyListEl.children).forEach((li, i) => {
    li.classList.toggle("active", i === index);
  });

  // تأثير الاختفاء والظهور (Fade Transition)
  historyYearEl.style.opacity = 0;
  historyTextEl.style.opacity = 0;

  setTimeout(() => {
    historyYearEl.innerText = historyData[index].year;
    historyTextEl.innerText = historyData[index].text;
    historyBgImg.style.backgroundImage = `url('${historyData[index].img}')`;

    historyYearEl.style.opacity = 1;
    historyTextEl.style.opacity = 1;
  }, 400);
}

function changeHistory(step) {
  let newIdx = currentHistoryIdx + step;
  if (newIdx < 0) newIdx = historyData.length - 1;
  if (newIdx >= historyData.length) newIdx = 0;
  setHistory(newIdx);
}

setHistory(0);

// ==========================================
// منطق قسم الاستراتيجية (Strategy Logic)
// ==========================================
const strategyData = [
  {
    title: "Strengthen Construction Market Leadership",
    text: "Expand market presence as an EPC contractor across our core markets in the Middle East, Africa and USA and strengthen capabilities across new and existing sectors. We focus on pursuing well-funded projects where we hold a competitive edge.",
    img: "https://images.unsplash.com/photo-1508450859948-4e04fabaa4ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Develop Concessions & Investments",
    text: "Focus on creating long-term value and generating recurring income through investments in infrastructure, industrial, and commercial projects across key strategic markets.",
    img: "https://images.unsplash.com/photo-1628100140700-11100f983693?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Grow O&M Capabilities",
    text: "Expand our Operations and Maintenance portfolio to ensure lifecycle support for large scale projects, providing sustainable and efficient facilities management.",
    img: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Enhance Building Materials",
    text: "Optimize and expand our building materials portfolio to secure supply chain efficiency and maintain cost leadership across all major construction operations.",
    img: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
];

let currentStrategyIdx = 0;
const strategyTabsEl = document.getElementById("strategyTabs");
const strategyTitleEl = document.getElementById("strategyTitle");
const strategyTextEl = document.getElementById("strategyText");
const strategyImgEl = document.getElementById("strategyImage");

strategyData.forEach((_, index) => {
  const btn = document.createElement("button");
  btn.className = "tab";
  btn.innerText = `0${index + 1}`;
  btn.onclick = () => setStrategy(index);
  strategyTabsEl.appendChild(btn);
});

function setStrategy(index) {
  currentStrategyIdx = index;
  Array.from(strategyTabsEl.children).forEach((btn, i) => {
    btn.classList.toggle("active", i === index);
  });

  strategyTitleEl.style.opacity = 0;
  strategyTextEl.style.opacity = 0;
  strategyImgEl.style.transform = "scale(0.95)";
  strategyImgEl.style.opacity = 0.5;

  setTimeout(() => {
    strategyTitleEl.innerText = strategyData[index].title;
    strategyTextEl.innerText = strategyData[index].text;
    strategyImgEl.src = strategyData[index].img;

    strategyTitleEl.style.opacity = 1;
    strategyTextEl.style.opacity = 1;
    strategyImgEl.style.transform = "scale(1)";
    strategyImgEl.style.opacity = 1;
  }, 400);
}

setStrategy(0);

// projects page

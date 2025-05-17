// Get all necessary elements
const sections = document.querySelectorAll(".section");
const navItems = document.querySelectorAll(".sidebar-item");
const bullets = document.querySelectorAll(".bullet");
const scrollContainer = document.querySelector(".scroll-container");

// Function to update active states and URL
function updateActiveStates(currentSection) {
  console.log('version: 1.0.9');
  // Update URL
  history.pushState(null, null, `#${currentSection}`);

  // Add transitioning class to all sections
  sections.forEach((section) => {
    section.classList.add("transitioning");
  });

  // Update sections
  sections.forEach((section) => {
    section.classList.remove("active");
    if (section.id === currentSection) {
      section.classList.add("active");
    }
  });

  // Update sidebar items
  navItems.forEach((item) => {
    item.classList.remove("active");
    if (
      item.getAttribute("href").slice(1) === currentSection ||
      item.getAttribute("data-sub") === currentSection
    ) {
      item.classList.add("active");
    }
  });

  // Update bullets
  bullets.forEach((bullet) => {
    bullet.classList.remove("active");
    if (bullet.getAttribute("data-section") === currentSection) {
      bullet.classList.add("active");
    }
  });

  // Remove transitioning class after animation completes
  setTimeout(() => {
    sections.forEach((section) => {
      section.classList.remove("transitioning");
    });
  }, 800); // Match this with the CSS transition duration
}

// Intersection Observer for section detection
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const currentSection = entry.target.id;
        updateActiveStates(currentSection);
      }
    });
  },
  {
    threshold: 0.5,
  }
);

// Observe all sections
sections.forEach((section) => {
  observer.observe(section);
});

// Handle click events for navigation
navItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    const targetSection = item.getAttribute("href").slice(1);
    const section = document.getElementById(targetSection);
    if (section) {
      // Add transitioning class to all sections
      sections.forEach((s) => s.classList.add("transitioning"));
      // Remove active class from all sections first
      sections.forEach((s) => s.classList.remove("active"));
      // Add active class to target section
      section.classList.add("active");
      section.scrollIntoView({ behavior: "smooth" });
    }
  });
});

bullets.forEach((bullet) => {
  bullet.addEventListener("click", (e) => {
    e.preventDefault();
    const targetSection = bullet.getAttribute("data-section");
    const section = document.getElementById(targetSection);
    if (section) {
      // Add transitioning class to all sections
      sections.forEach((s) => s.classList.add("transitioning"));
      // Remove active class from all sections first
      sections.forEach((s) => s.classList.remove("active"));
      // Add active class to target section
      section.classList.add("active");
      section.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Set initial active state based on URL hash
document.addEventListener("DOMContentLoaded", () => {
  const hash = window.location.hash.slice(1);

  if (hash) {
    const section = document.getElementById(hash);

    if (section) {
      // Add transitioning class to all sections
      sections.forEach((s) => s.classList.add("transitioning"));
      // Remove active class from all sections first
      sections.forEach((s) => s.classList.remove("active"));
      // Add active class to target section
      section.classList.add("active");
      section.scrollIntoView();
    }
  } else {
    // Default to first section if no hash
    sections.forEach((s) => s.classList.remove("active"));
    sections[0].classList.add("active");
    if (window.innerWidth <= 860) {
      updateActiveStates("section1-table-1");
    } else {
      updateActiveStates("section1");
    }
  }
});

// Hamburger menu open/close logic
const hamburger = document.getElementById("hamburger-menu");
const hamburger_mobile = document.getElementById("hamburger_mobile");

const sidebar = document.getElementById("sidebar-nav");
const closeBtn = document.getElementById("close-sidebar");
const sidebarMobile = document.getElementById("sidebar-nav-mobile");
const closeBtnMobile = document.getElementById("close-sidebar-mobile");

if ((hamburger || hamburger_mobile) && sidebar && closeBtn) {
  // Open sidebar
  hamburger.addEventListener("click", () => {
    sidebar.classList.add("open");
    sidebarMobile.classList.add("open");
  });

  hamburger_mobile.addEventListener("click", () => {
    sidebar.classList.add("open");
    sidebarMobile.classList.add("open");
  });

  // Close sidebar
  closeBtn.addEventListener("click", () => {
    sidebar.classList.remove("open");
  });

  // Close sidebar when a menu item is clicked
  sidebar.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      sidebar.classList.remove("open");
    });
  });
  // Close sidebar
  closeBtnMobile.addEventListener("click", () => {
    sidebarMobile.classList.remove("open");
  });

  // Close sidebar when a menu item is clicked
  sidebarMobile.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      sidebarMobile.classList.remove("open");
    });
  });
}

// Table-step bullet navigation for Section 1 (responsive, 768px and below)
// document.addEventListener("DOMContentLoaded", function () {
//   // Find all sections with tables-container
//   sections.forEach((section) => {
//     const container = section.querySelector(".tables-container");
//     const tableSteps = section.querySelectorAll(".table-step");
//     const tableBullets = section.querySelectorAll(".table-bullet");

//     // Only activate on small screens
//     function isMobile() {
//       return window.innerWidth <= 860;
//     }

//     function updateTableBullets() {
//       if (!isMobile()) return;
//       let activeIndex = 0;
//       tableSteps.forEach((step, idx) => {
//         const rect = step.getBoundingClientRect();
//         const containerRect = container.getBoundingClientRect();
//         if (rect.top < containerRect.top + containerRect.height / 2) {
//           activeIndex = idx;
//         }
//       });
//       tableBullets.forEach((b, i) =>
//         b.classList.toggle("active", i === activeIndex)
//       );
//     }

//     if (container && tableSteps.length && tableBullets.length) {
//       container.addEventListener("scroll", updateTableBullets);
//       window.addEventListener("resize", updateTableBullets);
//       // Bullet click scrolls to table-step
//       tableBullets.forEach((bullet, idx) => {
//         bullet.addEventListener("click", () => {
//           if (!isMobile()) return;
//           tableSteps[idx].scrollIntoView({
//             behavior: "smooth",
//             block: "start",
//           });
//         });
//       });
//       // Initial state
//       updateTableBullets();
//     }
//   });
// });

// Add keyboard navigation
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp" || e.key === "ArrowDown") {
    e.preventDefault(); // Prevent default scrolling behavior

    const currentActiveSection = document.querySelector(".section.active");
    if (!currentActiveSection) return;

    const currentIndex = Array.from(sections).indexOf(currentActiveSection);
    let targetIndex;

    if (e.key === "ArrowUp") {
      targetIndex = Math.max(0, currentIndex - 1);
    } else {
      targetIndex = Math.min(sections.length - 1, currentIndex + 1);
    }

    const targetSection = sections[targetIndex];
    if (targetSection) {
      updateActiveStates(targetSection.id);
      targetSection.scrollIntoView({ behavior: "smooth" });
    }
  }
});

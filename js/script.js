/*================================================================================================================================
            NAVBAR SCRIPT
================================================================================================================================*/

document.addEventListener("DOMContentLoaded", () => {
    const header = document.getElementById("header");
    const hamburger = document.getElementById("hamburger");
    const closeMenu = document.getElementById("closeMenu");
    const mobileNav = document.getElementById("mobileNav");
    const overlay = document.getElementById("menuOverlay");

    const mobileLinks = document.querySelectorAll(".mobile-link");
    const navLinks = document.querySelectorAll(".nav-link");

    /*================================================================================================================================
            Sticky Header
        ================================================================================================================================*/

    const handleScroll = () => {
        if (window.scrollY > 30) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

        highlightActiveSection();
    };

    window.addEventListener("scroll", handleScroll);

    /*================================================================================================================================
            Mobile Menu
        ================================================================================================================================*/

    function openMenu() {
        mobileNav.classList.add("active");
        overlay.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function closeMobileMenu() {
        mobileNav.classList.remove("active");
        overlay.classList.remove("active");
        document.body.style.overflow = "";
    }

    hamburger.addEventListener("click", openMenu);

    closeMenu.addEventListener("click", closeMobileMenu);

    overlay.addEventListener("click", closeMobileMenu);

    /*================================================================================================================================
            Mobile Dropdown
        ================================================================================================================================*/

    const dropdownButtons = document.querySelectorAll(".mobile-dropdown-btn");

    dropdownButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const submenu = btn.nextElementSibling;

            const icon = btn.querySelector("i");

            if (submenu.style.display === "block") {
                submenu.style.display = "none";
                icon.style.transform = "rotate(0deg)";
            } else {
                submenu.style.display = "block";
                icon.style.transform = "rotate(180deg)";
            }
        });
    });

    /*================================================================================================================================
            Close Menu After Click
        ================================================================================================================================*/

    mobileLinks.forEach((link) => {
        link.addEventListener("click", () => {
            closeMobileMenu();
        });
    });

    /*================================================================================================================================
            Smooth Scroll
        ================================================================================================================================*/

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            const targetID = this.getAttribute("href");

            if (targetID === "#") return;

            const target = document.querySelector(targetID);

            if (!target) return;

            e.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        });
    });

    /*================================================================================================================================
            Active Menu Highlight
        ================================================================================================================================*/

    function highlightActiveSection() {
        const sections = document.querySelectorAll("section[id]");

        let currentSection = "";

        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {
                currentSection = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + currentSection) {
                link.classList.add("active");
            }
        });
    }

    highlightActiveSection();

    /*================================================================================================================================
            Escape Key Close
        ================================================================================================================================*/

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeMobileMenu();
        }
    });
});

/*================================================================================================================================
                HERO SECTION
================================================================================================================================*/

document.addEventListener("DOMContentLoaded", () => {
    /*================================================================================================================================
                    Animated Counter
        ================================================================================================================================*/

    const counters = document.querySelectorAll(".counter");

    const counterObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                const counter = entry.target;

                const target = +counter.dataset.target;

                let current = 0;

                const increment = Math.ceil(target / 100);

                const updateCounter = () => {
                    current += increment;

                    if (current >= target) {
                        counter.innerText = target;
                    } else {
                        counter.innerText = current;

                        requestAnimationFrame(updateCounter);
                    }
                };

                updateCounter();

                observer.unobserve(counter);
            });
        },
        {
            threshold: 0.5,
        },
    );

    counters.forEach((counter) => {
        counterObserver.observe(counter);
    });

    /*================================================================================================================================
                    Hero Image Parallax
        ================================================================================================================================*/

    const heroImage = document.querySelector(".hero-image");

    if (heroImage) {
        heroImage.addEventListener("mousemove", (e) => {
            const rect = heroImage.getBoundingClientRect();

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const moveX = (x - rect.width / 2) / 35;
            const moveY = (y - rect.height / 2) / 35;

            heroImage.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });

        heroImage.addEventListener("mouseleave", () => {
            heroImage.style.transform = "translate(0,0)";
        });
    }

    /*================================================================================================================================
                Floating Card Hover Effect
        ================================================================================================================================*/

    const cards = document.querySelectorAll(".floating-card");

    cards.forEach((card) => {
        card.addEventListener("mouseenter", () => {
            card.style.transform = "translateY(-10px) scale(1.05)";
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "";
        });
    });

    /*================================================================================================================================
                Ripple Effect Buttons
        ================================================================================================================================*/

    const buttons = document.querySelectorAll(".btn-primary,.btn-secondary");

    buttons.forEach((button) => {
        button.addEventListener("click", function (e) {
            const ripple = document.createElement("span");

            const rect = this.getBoundingClientRect();

            ripple.className = "ripple";

            ripple.style.left = `${e.clientX - rect.left}px`;
            ripple.style.top = `${e.clientY - rect.top}px`;

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    /*================================================================================================================================
                Scroll Down Button
        ================================================================================================================================*/

    const scrollBtn = document.querySelector(".scroll-down");

    if (scrollBtn) {
        scrollBtn.addEventListener("click", function (e) {
            e.preventDefault();

            const about = document.querySelector("#about");

            if (about) {
                about.scrollIntoView({
                    behavior: "smooth",
                });
            }
        });
    }
});

// /*==================================================
//             TESTIMONIAL SLIDER
// ==================================================*/

// document.addEventListener("DOMContentLoaded", () => {
//     const track = document.querySelector(".testimonial-track");
//     const cards = document.querySelectorAll(".testimonial-card");

//     const prevBtn = document.querySelector(".testimonial-prev");
//     const nextBtn = document.querySelector(".testimonial-next");

//     const dots = document.querySelectorAll(".testimonial-dots .dot");

//     if (!track || cards.length === 0) return;

//     let currentIndex = 0;

//     const totalSlides = cards.length;

//     /*====================================
//               Update Slider
//       ====================================*/

//     function updateSlider() {
//         track.style.transform = `translateX(-${currentIndex * 100}%)`;

//         cards.forEach((card, index) => {
//             card.classList.toggle("active", index === currentIndex);
//         });

//         dots.forEach((dot, index) => {
//             dot.classList.toggle("active", index === currentIndex);
//         });
//     }

//     /*====================================
//               Next Slide
//       ====================================*/

//     function nextSlide() {
//         currentIndex++;

//         if (currentIndex >= totalSlides) {
//             currentIndex = 0;
//         }

//         updateSlider();
//     }

//     /*====================================
//               Previous Slide
//       ====================================*/

//     function prevSlide() {
//         currentIndex--;

//         if (currentIndex < 0) {
//             currentIndex = totalSlides - 1;
//         }

//         updateSlider();
//     }

//     /*====================================
//               Button Events
//       ====================================*/

//     if (nextBtn) {
//         nextBtn.addEventListener("click", nextSlide);
//     }

//     if (prevBtn) {
//         prevBtn.addEventListener("click", prevSlide);
//     }

//     /*====================================
//               Dot Navigation
//       ====================================*/

//     dots.forEach((dot, index) => {
//         dot.addEventListener("click", () => {
//             currentIndex = index;

//             updateSlider();
//         });
//     });

//     /*====================================
//               Auto Slide
//       ====================================*/

//     let autoSlide = setInterval(nextSlide, 5000);

//     /*====================================
//               Pause on Hover
//       ====================================*/

//     const slider = document.querySelector(".testimonial-slider");

//     if (slider) {
//         slider.addEventListener("mouseenter", () => {
//             clearInterval(autoSlide);
//         });

//         slider.addEventListener("mouseleave", () => {
//             autoSlide = setInterval(nextSlide, 5000);
//         });
//     }

//     /*====================================
//               Touch Swipe (Mobile)
//       ====================================*/

//     let startX = 0;

//     let endX = 0;

//     track.addEventListener("touchstart", (e) => {
//         startX = e.touches[0].clientX;
//     });

//     track.addEventListener("touchend", (e) => {
//         endX = e.changedTouches[0].clientX;

//         if (startX - endX > 50) {
//             nextSlide();
//         }

//         if (endX - startX > 50) {
//             prevSlide();
//         }
//     });

//     /*====================================
//               Initialize
//       ====================================*/

//     updateSlider();
// });

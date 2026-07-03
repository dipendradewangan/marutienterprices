/*==================================================
                THEME MANAGER
==================================================*/

document.addEventListener("DOMContentLoaded", () => {
    const html = document.documentElement;
    const themeToggle = document.getElementById("themeToggle");

    const STORAGE_KEY = "solar-theme";

    /*==============================================
                      Icons
      ==============================================*/

    const moonIcon = document.querySelector(".moon-icon");
    const sunIcon = document.querySelector(".sun-icon");

    /*==============================================
                      Set Theme
      ==============================================*/

    function setTheme(theme) {
        html.setAttribute("data-theme", theme);

        localStorage.setItem(STORAGE_KEY, theme);

        updateIcons(theme);
    }

    /*==============================================
                      Update Icons
      ==============================================*/

    function updateIcons(theme) {
        if (!moonIcon || !sunIcon) return;

        if (theme === "dark") {
            moonIcon.style.display = "none";
            sunIcon.style.display = "inline-block";
        } else {
            moonIcon.style.display = "inline-block";
            sunIcon.style.display = "none";
        }
    }

    /*==============================================
              Get Saved Theme
      ==============================================*/

    function getSavedTheme() {
        return localStorage.getItem(STORAGE_KEY);
    }

    /*==============================================
              System Theme
      ==============================================*/

    function getSystemTheme() {
        return window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
    }

    /*==============================================
              Initialize Theme
      ==============================================*/

    function initializeTheme() {
        const savedTheme = getSavedTheme();

        if (savedTheme) {
            setTheme(savedTheme);
        } else {
            setTheme(getSystemTheme());
        }
    }

    /*==============================================
              Toggle Theme
      ==============================================*/

    function toggleTheme() {
        const currentTheme = html.getAttribute("data-theme");

        const nextTheme = currentTheme === "dark" ? "light" : "dark";

        setTheme(nextTheme);
    }

    /*==============================================
              Button Click
      ==============================================*/

    if (themeToggle) {
        themeToggle.addEventListener("click", toggleTheme);
    }

    /*==============================================
          System Theme Changed
      ==============================================*/

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    mediaQuery.addEventListener("change", (event) => {
        const savedTheme = getSavedTheme();

        /* User ne manually theme choose ki hai
               to system change ignore karenge */

        if (savedTheme) return;

        setTheme(event.matches ? "dark" : "light");
    });

    /*==============================================
              Initialize
      ==============================================*/

    initializeTheme();
});

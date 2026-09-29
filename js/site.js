/**
 * Past11 Productions — theme toggle
 * Craft: VKHGC craft theme toggle (past11-theme)
 * - Dark theme is DEFAULT (no class on <html>)
 * - Light theme: html.theme-light
 * - Preference stored in localStorage only (key: past11-theme)
 */
(function () {
  var STORAGE_KEY = "past11-theme";

  function getStored() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function setStored(value) {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch (e) {
      /* private mode / blocked storage — ignore */
    }
  }

  function applyTheme(theme) {
    var root = document.documentElement;
    if (theme === "light") {
      root.classList.add("theme-light");
    } else {
      root.classList.remove("theme-light");
      theme = "dark";
    }
    var btn = document.getElementById("theme-toggle");
    if (btn) {
      var isLight = theme === "light";
      btn.setAttribute("aria-pressed", isLight ? "true" : "false");
      var label = btn.querySelector(".theme-label");
      if (label) {
        label.textContent = isLight ? "Dark theme" : "Light theme";
      }
      btn.title = isLight ? "Switch to dark theme" : "Switch to light theme";
    }
  }

  function currentTheme() {
    return document.documentElement.classList.contains("theme-light")
      ? "light"
      : "dark";
  }

  function initTheme() {
    var stored = getStored();
    if (stored === "light" || stored === "dark") {
      applyTheme(stored);
    } else {
      applyTheme("dark");
    }
  }

  function initToggle() {
    var btn = document.getElementById("theme-toggle");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var next = currentTheme() === "dark" ? "light" : "dark";
      applyTheme(next);
      setStored(next);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      initTheme();
      initToggle();
    });
  } else {
    initTheme();
    initToggle();
  }
})();

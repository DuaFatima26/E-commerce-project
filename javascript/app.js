document.addEventListener("DOMContentLoaded", () => {
  // ======= Mobile Nav =======
  const menuToggle = document.querySelector(".mobile-menu-toggle");
  const nav = document.querySelector(".main-nav");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      nav.classList.toggle("active");
    });
  }

  // ======= Search Toggle =======
  const searchToggle = document.querySelector(".search-toggle");
  const searchBox = document.querySelector(".search-box");
  const overlay = document.querySelector(".overlay");

  if (searchToggle && searchBox && overlay) {
    searchToggle.addEventListener("click", () => {
      searchBox.classList.toggle("active");
      overlay.classList.toggle("active");
    });

    overlay.addEventListener("click", () => {
      searchBox.classList.remove("active");
      overlay.classList.remove("active");
      cartModal.classList.remove("active");
    });
  }

  // ======= Cart Modal =======
  const cartToggle = document.querySelector(".cart-toggle");
  const cartModal = document.querySelector(".cart-modal");
  const closeCart = document.querySelector(".close-cart");

  if (cartToggle && cartModal && closeCart) {
    cartToggle.addEventListener("click", () => {
      cartModal.classList.add("active");
      overlay.classList.add("active");
    });

    closeCart.addEventListener("click", () => {
      cartModal.classList.remove("active");
      overlay.classList.remove("active");
    });
  }


  const userIcon = document.getElementById("userIcon");
  const authModal = document.getElementById("authModal");
  const closeModal = document.getElementById("closeModal");
  const modalOverlay = document.getElementById("modalOverlay");

  if (userIcon && authModal && closeModal && modalOverlay) {
    userIcon.addEventListener("click", () => {
      authModal.classList.add("active");
    });

    closeModal.addEventListener("click", () => {
      authModal.classList.remove("active");
    });

    modalOverlay.addEventListener("click", () => {
      authModal.classList.remove("active");
    });
  }

  const tabs = document.querySelectorAll(".tab");
  const forms = document.querySelectorAll(".auth-form");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      const target = tab.getAttribute("data-tab");
      forms.forEach((form) => {
        form.classList.remove("active");
      });

      document.getElementById(`${target}Form`).classList.add("active");
    });
  });

  const showLogin = document.getElementById("showLogin");
  if (showLogin) {
    showLogin.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(".tab[data-tab='login']").click();
    });
  }
});

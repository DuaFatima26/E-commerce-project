document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu Toggle
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const overlay = document.querySelector('.overlay');
  
  if (mobileMenuToggle && mobileNav && overlay) {
      mobileMenuToggle.addEventListener('click', function() {
          this.classList.toggle('active');
          mobileNav.classList.toggle('open');
          overlay.classList.toggle('active');
          
          // Close cart if open
          if (document.querySelector('.cart-modal').classList.contains('active')) {
              document.querySelector('.cart-modal').classList.remove('active');
          }
      });
  }

  // Search Toggle
  const searchToggle = document.querySelector('.search-toggle');
  const searchBox = document.querySelector('.search-box');
  
  if (searchToggle && searchBox) {
      searchToggle.addEventListener('click', function(e) {
          e.stopPropagation();
          searchBox.classList.toggle('active');
          overlay.classList.toggle('active');
          
          // Close other open elements
          if (mobileNav.classList.contains('open')) {
              mobileNav.classList.remove('open');
              mobileMenuToggle.classList.remove('active');
          }
          if (document.querySelector('.cart-modal').classList.contains('active')) {
              document.querySelector('.cart-modal').classList.remove('active');
          }
      });
  }

  // Cart Toggle
  const cartToggle = document.querySelector('.cart-toggle');
  const cartModal = document.querySelector('.cart-modal');
  const closeCart = document.querySelector('.close-cart');
  
  if (cartToggle && cartModal) {
      cartToggle.addEventListener('click', function(e) {
          e.stopPropagation();
          cartModal.classList.toggle('active');
          overlay.classList.toggle('active');
          
          // Close other open elements
          if (mobileNav.classList.contains('open')) {
              mobileNav.classList.remove('open');
              mobileMenuToggle.classList.remove('active');
          }
          if (searchBox.classList.contains('active')) {
              searchBox.classList.remove('active');
          }
      });
  }

  if (closeCart && cartModal && overlay) {
      closeCart.addEventListener('click', function() {
          cartModal.classList.remove('active');
          overlay.classList.remove('active');
      });
  }

  // Close when clicking outside
  document.addEventListener('click', function(e) {
      if (!e.target.closest('.search-box') && !e.target.closest('.search-toggle')) {
          searchBox.classList.remove('active');
      }
      
      if (!e.target.closest('.cart-modal') && !e.target.closest('.cart-toggle')) {
          cartModal.classList.remove('active');
      }
      
      if (!e.target.closest('.mobile-nav') && !e.target.closest('.mobile-menu-toggle')) {
          mobileNav.classList.remove('open');
          mobileMenuToggle.classList.remove('active');
      }
      
      // Hide overlay if nothing is open
      if (!searchBox.classList.contains('active') && 
          !cartModal.classList.contains('active') && 
          !mobileNav.classList.contains('open')) {
          overlay.classList.remove('active');
      }
  });

  // Search functionality
  const searchInput = document.querySelector('.search-box input');
  const searchResults = document.querySelector('.search-results');
  
  if (searchInput && searchResults) {
      searchInput.addEventListener('input', function() {
          const query = this.value.trim();
          
          if (query.length < 2) {
              searchResults.innerHTML = '';
              return;
          }
          
          // Mock search results
          const mockResults = [
              'Analog Numeral',
              'Classical Numeral',
              'Golden Classical',
              'Dial Numeral',
              'Classic Roman'
          ].filter(item => item.toLowerCase().includes(query.toLowerCase()));
          
          displayResults(mockResults);
      });
  }
  
  function displayResults(results) {
      if (!searchResults) return;
      
      if (results.length === 0) {
          searchResults.innerHTML = '<div class="no-results">No results found</div>';
          return;
      }
      
      searchResults.innerHTML = results.map(item => `
          <div class="search-item">
              <img src="https://via.placeholder.com/50" alt="${item}">
              <div>
                  <h4>${item}</h4>
                  <p>₹${Math.floor(Math.random() * 5000) + 1000}</p>
              </div>
          </div>
      `).join('');
  }

  // Close mobile menu when clicking on links
  document.querySelectorAll('.mobile-nav a').forEach(link => {
      link.addEventListener('click', () => {
          mobileNav.classList.remove('open');
          mobileMenuToggle.classList.remove('active');
          overlay.classList.remove('active');
      });
  });
});
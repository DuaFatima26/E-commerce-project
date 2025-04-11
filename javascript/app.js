document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu Toggle
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const mainNav = document.querySelector('.main-nav');

  mobileToggle.addEventListener('click', function() {
    mainNav.classList.toggle('active');
    mobileToggle.classList.toggle('active');
    document.querySelector('.overlay').classList.toggle('active');
  });

  // Dropdowns
  const dropdowns = document.querySelectorAll('.dropdown');
  dropdowns.forEach(dropdown => {
    const link = dropdown.querySelector('a');
    
    link.addEventListener('click', function(e) {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        dropdown.classList.toggle('active');
      }
    });
  });

  // Search Toggle
  const searchToggle = document.querySelector('.search-toggle');
  const searchBox = document.querySelector('.search-box');
  
  if (searchToggle) {
    searchToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      searchBox.classList.toggle('active');
      document.querySelector('.overlay').classList.toggle('active');
      document.querySelector('.cart-modal').classList.remove('active');
    });
  }

  // Cart Toggle
  const cartToggle = document.querySelector('.cart-toggle');
  const cartModal = document.querySelector('.cart-modal');
  const closeCart = document.querySelector('.close-cart');
  
  if (cartToggle) {
    cartToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      cartModal.classList.toggle('active');
      document.querySelector('.overlay').classList.toggle('active');
      searchBox.classList.remove('active');
    });
  }

  if (closeCart) {
    closeCart.addEventListener('click', function() {
      cartModal.classList.remove('active');
      document.querySelector('.overlay').classList.remove('active');
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
    
    if (!e.target.closest('.main-nav') && !e.target.closest('.mobile-menu-toggle')) {
      mainNav.classList.remove('active');
      mobileToggle.classList.remove('active');
    }
    
    if (!searchBox.classList.contains('active') && 
        !cartModal.classList.contains('active') && 
        !mainNav.classList.contains('active')) {
      document.querySelector('.overlay').classList.remove('active');
    }
  });

  // Search Functionality (Mock)
  const searchInput = document.querySelector('.search-box input');
  const searchResults = document.querySelector('.search-results');
  
  if (searchInput) {
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
    if (results.length === 0) {
      searchResults.innerHTML = '<p>No results found</p>';
      return;
    }
    
    searchResults.innerHTML = results.map(item => 
      `<a href="#" class="search-result">${item}</a>`
    ).join('');
  }

  // Cart Functionality (Mock)
  const cartItems = document.querySelector('.cart-items');
  
  // Example: Add to cart functionality
  function addToCart(product) {
    // In a real app, you would update this from your product pages
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.innerHTML = `
      <img src="https://via.placeholder.com/60" alt="${product}">
      <div>
        <h4>${product}</h4>
        <p>1 × $19.99</p>
      </div>
      <button class="remove-item">&times;</button>
    `;
    
    document.querySelector('.empty-cart').style.display = 'none';
    cartItems.insertBefore(cartItem, cartItems.firstChild);
    
    // Update cart count
    const count = document.querySelectorAll('.cart-item').length;
    document.querySelector('.cart-count').textContent = count;
  }
  
  // Example usage:
  // addToCart('Blue T-Shirt');
});



//   sliderrrrrrrrrrrrrrrrrrrrrrrr

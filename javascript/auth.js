document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const overlay = document.querySelector('.overlay');
    
    if (mobileMenuToggle && mainNav && overlay) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            this.classList.toggle('active');
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
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
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
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
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
        
        if (!e.target.closest('.main-nav') && !e.target.closest('.mobile-menu-toggle')) {
            mainNav.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        }
        
        // Hide overlay if nothing is open
        if (!searchBox.classList.contains('active') && 
            !cartModal.classList.contains('active') && 
            !mainNav.classList.contains('active')) {
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
    document.querySelectorAll('.main-nav a').forEach(link => {
        link.addEventListener('click', () => {
            mainNav.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            overlay.classList.remove('active');
        });
    });

    // Auth Modal Toggle
    const userIcon = document.getElementById('userIcon');
    const authModal = document.getElementById('authModal');
    const closeModal = document.getElementById('closeModal');
    
    if (userIcon && authModal) {
        userIcon.addEventListener('click', function(e) {
            e.stopPropagation();
            authModal.classList.toggle('active');
            overlay.classList.toggle('active');
        });
    }
    
    if (closeModal && authModal && overlay) {
        closeModal.addEventListener('click', function() {
            authModal.classList.remove('active');
            overlay.classList.remove('active');
        });
    }
    
    // Tab Switching in Auth Modal
    const tabs = document.querySelectorAll('.auth-tabs .tab');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs and forms
            tabs.forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.auth-form').forEach(form => {
                form.classList.remove('active');
            });
            
            // Add active class to clicked tab and corresponding form
            this.classList.add('active');
            const tabName = this.getAttribute('data-tab');
            document.getElementById(tabName + 'Form').classList.add('active');
        });
    });
    
    // Show login form when clicking "Already have an account"
    const showLogin = document.getElementById('showLogin');
    if (showLogin) {
        showLogin.addEventListener('click', function(e) {
            e.preventDefault();
            tabs.forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.auth-form').forEach(form => {
                form.classList.remove('active');
            });
            
            document.querySelector('.tab[data-tab="login"]').classList.add('active');
            document.getElementById('loginForm').classList.add('active');
        });
    }
});
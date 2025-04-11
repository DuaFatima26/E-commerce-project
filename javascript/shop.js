class Cart {
    constructor() {
      this.items = [];
      this.loadCart();
      this.setupEventListeners();
      this.updateUI();
    }
  
    addItem(id, name, price, image) {
      const existingItem = this.items.find(item => item.id === id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        this.items.push({
          id,
          name,
          price: Number(price),
          image,
          quantity: 1
        });
      }
      
      this.saveCart();
      this.updateUI();
      this.openCart();
    }
  
    removeItem(id) {
      this.items = this.items.filter(item => item.id !== id);
      this.saveCart();
      this.updateUI();
    }
  
    updateQuantity(id, newQuantity) {
      const item = this.items.find(item => item.id === id);
      if (item) {
        item.quantity = newQuantity;
        if (newQuantity <= 0) this.removeItem(id);
        this.saveCart();
        this.updateUI();
      }
    }
  
    updateUI() {
      const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
      document.getElementById('nav-cart-count').textContent = totalItems;
      document.getElementById('floating-cart-count').textContent = totalItems;
  
      const container = document.getElementById('cart-items');
      container.innerHTML = '';
      
      if (this.items.length === 0) {
        container.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
        document.getElementById('cart-total').textContent = 'Total: ₹0';
        document.getElementById('checkout-btn').style.display = 'none';
        return;
      }
  
      this.items.forEach(item => {
        const itemEl = document.createElement('div');
        itemEl.className = 'cart-item';
        itemEl.innerHTML = `
          <img src="${item.image}" alt="${item.name}">
          <div class="item-details">
            <h4>${item.name}</h4>
            <p>₹${item.price.toLocaleString()} × ${item.quantity}</p>
            <div class="quantity-controls">
              <button class="quantity-btn minus" data-id="${item.id}">-</button>
              <span>${item.quantity}</span>
              <button class="quantity-btn plus" data-id="${item.id}">+</button>
            </div>
          </div>
          <button class="remove-btn" data-id="${item.id}">×</button>
        `;
        container.appendChild(itemEl);
      });
  
      const total = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      document.getElementById('cart-total').textContent = `Total: ₹${total.toLocaleString()}`;
      document.getElementById('checkout-btn').style.display = 'block';
  
      this.addItemEventListeners();
    }
  
    addItemEventListeners() {
      document.querySelectorAll('.minus').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = e.target.dataset.id;
          const item = this.items.find(item => item.id === id);
          if (item) this.updateQuantity(id, item.quantity - 1);
        });
      });
  
      document.querySelectorAll('.plus').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = e.target.dataset.id;
          const item = this.items.find(item => item.id === id);
          if (item) this.updateQuantity(id, item.quantity + 1);
        });
      });
  
      document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', (e) => this.removeItem(e.target.dataset.id));
      });
    }
  
    openCart() {
      document.getElementById('cart-sidebar').classList.add('open');
    }
  
    closeCart() {
      document.getElementById('cart-sidebar').classList.remove('open');
    }
  
    saveCart() {
      localStorage.setItem('cart', JSON.stringify(this.items));
    }
  
    loadCart() {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) this.items = JSON.parse(savedCart);
    }
  
    checkout() {
      if (this.items.length === 0) {
        alert('Your cart is empty!');
        return;
      }
  
      this.showPaymentModal();
    }
  
    showPaymentModal() {
      const total = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
      const modalHTML = `
        <div class="modal-overlay" id="payment-modal">
          <div class="modal-content">
            <h3>Enter Payment Details</h3>
            <p>Total Amount: ₹${total.toLocaleString()}</p>
            
            <form id="payment-form">
              <div class="form-group">
                <label for="card-name">Name on Card</label>
                <input type="text" id="card-name" required>
              </div>
              
              <div class="form-group">
                <label for="card-number">Card Number</label>
                <input type="text" id="card-number" placeholder="1234 5678 9012 3456" required>
              </div>
              
              <div class="form-row">
                <div class="form-group">
                  <label for="card-expiry">Expiry Date</label>
                  <input type="text" id="card-expiry" placeholder="MM/YY" required>
                </div>
                
                <div class="form-group">
                  <label for="card-cvv">CVV</label>
                  <input type="text" id="card-cvv" placeholder="123" required>
                </div>
              </div>
              
              <div class="modal-actions">
                <button type="button" class="cancel-btn">Cancel</button>
                <button type="submit" class="submit-btn">Pay Now</button>
              </div>
            </form>
          </div>
        </div>
      `;
  
      document.body.insertAdjacentHTML('beforeend', modalHTML);
      
      document.getElementById('payment-form').addEventListener('submit', (e) => {
        e.preventDefault();
        this.processPayment();
      });
  
      document.querySelector('#payment-modal .cancel-btn').addEventListener('click', () => {
        this.closePaymentModal();
      });
    }
  
    processPayment() {
      const cardName = document.getElementById('card-name').value;
      const cardNumber = document.getElementById('card-number').value;
      const cardExpiry = document.getElementById('card-expiry').value;
      const cardCvv = document.getElementById('card-cvv').value;
  
      if (!cardName || !cardNumber || !cardExpiry || !cardCvv) {
        alert('Please fill all payment details');
        return;
      }
  
      if (cardNumber.replace(/\s/g, '').length !== 16) {
        alert('Please enter a valid 16-digit card number');
        return;
      }
  
      if (!cardExpiry.match(/^\d{2}\/\d{2}$/)) {
        alert('Please enter expiry date in MM/YY format');
        return;
      }
  
      if (!cardCvv.match(/^\d{3,4}$/)) {
        alert('Please enter a valid CVV (3 or 4 digits)');
        return;
      }
  
      this.closePaymentModal();
      this.showOrderConfirmation();
    }
  
    showOrderConfirmation() {
      const total = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const orderId = 'ORD-' + Math.floor(Math.random() * 1000000);
      
      const modalHTML = `
        <div class="modal-overlay" id="confirmation-modal">
          <div class="modal-content confirmation-content">
            <div class="confirmation-icon">✓</div>
            <h3>Order Confirmed!</h3>
            <p>Your order <strong>${orderId}</strong> has been placed successfully.</p>
            <p>Total Paid: <strong>₹${total.toLocaleString()}</strong></p>
            <button class="confirm-btn">Continue Shopping</button>
          </div>
        </div>
      `;
  
      document.body.insertAdjacentHTML('beforeend', modalHTML);
      
      document.querySelector('#confirmation-modal .confirm-btn').addEventListener('click', () => {
        this.items = [];
        this.saveCart();
        this.updateUI();
        this.closeCart();
        this.closeConfirmationModal();
      });
    }
  
    closePaymentModal() {
      const modal = document.getElementById('payment-modal');
      if (modal) modal.remove();
    }
  
    closeConfirmationModal() {
      const modal = document.getElementById('confirmation-modal');
      if (modal) modal.remove();
    }
  
    setupEventListeners() {
      document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', () => {
          const { id, name, price, image } = btn.dataset;
          this.addItem(id, name, price, image);
        });
      });
  
      document.getElementById('nav-cart').addEventListener('click', () => this.openCart());
      document.getElementById('floating-cart').addEventListener('click', () => this.openCart());
      document.getElementById('close-cart').addEventListener('click', () => this.closeCart());
      document.getElementById('checkout-btn').addEventListener('click', () => this.checkout());
  
      document.addEventListener('click', (e) => {
        if (!e.target.closest('#cart-sidebar') && 
            !e.target.closest('#nav-cart') &&
            !e.target.closest('#floating-cart') &&
            document.getElementById('cart-sidebar').classList.contains('open')) {
          this.closeCart();
        }
      });
    }
  }
  
  // Initialize Cart
  const cart = new Cart();
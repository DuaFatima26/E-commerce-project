 document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('saleModal');
    
   
    setTimeout(() => {
        modal.classList.add('active');
        document.querySelector('.modal-content1').style.transform = 'scale(1)';
        startTimer(6, 10, 50); // 6 days, 10 hours, 50 minutes
        createConfetti();
    }, 1000);
    
    // Close modal
    document.getElementById('closesaleModal').addEventListener('click', function() {
        modal.classList.remove('active');
        document.querySelector('.modal-content1').style.transform = 'scale(0.9)';
    });
    
    // Shop now button
    document.getElementById('shopNow').addEventListener('click', function() {
        alert('Redirecting to sale page!');
        window.location.href = './html/shop.html';
    });
});


function startTimer(days, hours, minutes) {
    const timerDays = document.getElementById('days');
    const timerHours = document.getElementById('hours');
    const timerMinutes = document.getElementById('minutes');
    const timerSeconds = document.getElementById('seconds');
    
    let totalSeconds = days * 86400 + hours * 3600 + minutes * 60;
    
    const timer = setInterval(() => {
        if(totalSeconds <= 0) {
            clearInterval(timer);
            return;
        }
        
        totalSeconds--;
        
        const daysRemaining = Math.floor(totalSeconds / 86400);
        const hrs = Math.floor((totalSeconds % 86400) / 3600);
        const mins = Math.floor((totalSeconds % 3600) / 60);
        const secs = totalSeconds % 60;
        
        timerDays.textContent = daysRemaining.toString().padStart(2, '0');
        timerHours.textContent = hrs.toString().padStart(2, '0');
        timerMinutes.textContent = mins.toString().padStart(2, '0');
        timerSeconds.textContent = secs.toString().padStart(2, '0');
    }, 1000);
}


function createConfetti() {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
    const modal = document.getElementById('saleModal');
    
    for(let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = Math.random() * 100 + 'vh';
        confetti.style.width = Math.random() * 10 + 5 + 'px';
        confetti.style.height = Math.random() * 10 + 5 + 'px';
        confetti.style.opacity = Math.random();
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        modal.appendChild(confetti);
        
        animateConfetti(confetti);
    }
}

function animateConfetti(element) {
    let pos = -10;
    let opacity = 1;
    let rotation = 0;
    
    const fall = setInterval(() => {
        pos += 2;
        opacity -= 0.01;
        rotation += 5;
        
        element.style.top = pos + 'vh';
        element.style.opacity = opacity;
        element.style.transform = `rotate(${rotation}deg)`;
        
        if(pos > 100 || opacity <= 0) {
            clearInterval(fall);
            element.remove();
        }
    }, 50);
}


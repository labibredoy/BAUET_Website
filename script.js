// Slider functionality
let index = 0;
const slides = document.querySelectorAll(".slide");

// Initialize the slider
function initSlider() {
    if (slides.length > 0) {
        slides[0].style.opacity = 1;
    }
}

// Next slide function
function nextSlide() {
    const nextIndex = (index + 1) % slides.length;
    changeSlide(nextIndex);
}

// Previous slide function
function prevSlide() {
    const prevIndex = (index - 1 + slides.length) % slides.length;
    changeSlide(prevIndex);
}

// Change slide function
function changeSlide(newIndex) {
    slides[index].style.opacity = 0;
    slides[newIndex].style.opacity = 1;
    index = newIndex;
}

// Auto slide
function autoSlide() {
    nextSlide();
}

// Redirect function for navigation
function redirect(url) {
    if (url.startsWith('http')) {
        window.open(url, '_blank');
    } else {
        window.location.href = url;
    }
}

// Initialize the slider and other functionality
document.addEventListener("DOMContentLoaded", function() {
    // Initialize slider if it exists
    if (slides.length > 0) {
        initSlider();
        setInterval(autoSlide, 5000);
    }

    // Mobile menu functionality
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const dropdowns = document.querySelectorAll('.dropdown');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
    
    // Mobile dropdown toggle
    dropdowns.forEach(dropdown => {
        const dropdownToggle = dropdown.querySelector('.dropdown-toggle');
        
        dropdownToggle.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('active');
                
                // Close other dropdowns
                dropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.classList.remove('active');
                    }
                });
            }
        });
    });
    
    // Animation on scroll
    const featureCards = document.querySelectorAll('.feature-card');
    const newsCards = document.querySelectorAll('.news-card');
    const statItems = document.querySelectorAll('.stat-item');
    const gridItems = document.querySelectorAll('.grid-item');
    
    // Add animation classes on scroll
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY + window.innerHeight;
        
        featureCards.forEach((card, index) => {
            const cardTop = card.offsetTop;
            if (scrollPosition > cardTop + 100) {
                setTimeout(() => {
                    card.style.opacity = 1;
                    card.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
        
        newsCards.forEach((card, index) => {
            const cardTop = card.offsetTop;
            if (scrollPosition > cardTop + 100) {
                setTimeout(() => {
                    card.style.opacity = 1;
                    card.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
        
        statItems.forEach((item, index) => {
            const itemTop = item.offsetTop;
            if (scrollPosition > itemTop) {
                setTimeout(() => {
                    item.style.opacity = 1;
                    item.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
        
        gridItems.forEach((item, index) => {
            const itemTop = item.offsetTop;
            if (scrollPosition > itemTop) {
                setTimeout(() => {
                    item.style.opacity = 1;
                    item.style.transform = 'translateY(0)';
                }, index * 50);
            }
        });
    });
    
    // Set initial styles
    featureCards.forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    newsCards.forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    statItems.forEach(item => {
        item.style.opacity = 0;
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    gridItems.forEach(item => {
        item.style.opacity = 0;
        item.style.transform = 'translateY(10px)';
        item.style.transition = 'opacity 0.4s ease, transform 0.4s ease, background 0.3s ease, color 0.3s ease';
    });
    
    // Trigger scroll event to check initial visibility
    window.dispatchEvent(new Event('scroll'));

    // Toggle password visibility
    const passwordToggles = document.querySelectorAll('.password-toggle-icon');
    
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            
            // Toggle icon
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    });

    // Add hover effect to grid items
    gridItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
});



//from video

const signUpButton=document.getElementById('signUpButton');
const signInButton=document.getElementById('signInButton');
const signInForm=document.getElementById('signIn');
const signUpForm=document.getElementById('signup');

signUpButton.addEventListener('click',function(){
    signInForm.style.display="none";
    signUpForm.style.display="block";
})
signInButton.addEventListener('click', function(){
    signInForm.style.display="block";
    signUpForm.style.display="none";
})
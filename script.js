// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add active class to nav links on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    const scrollPosition = window.pageYOffset;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Navbar background change on scroll
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Typing animation for profession titles
const professionElements = document.querySelectorAll('.profession');
let currentIndex = 0;

function updateProfession() {
    professionElements.forEach((el, index) => {
        if (index === currentIndex) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        } else {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
        }
    });
    currentIndex = (currentIndex + 1) % professionElements.length;
}

setInterval(updateProfession, 3000);
updateProfession(); // Initial call

// Typing effect
const typingText = document.querySelector('.typing-text');
const words = ['UI Developer', 'Web Designer', 'Frontend Developer'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isWaiting = false;

function type() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentWord.length) {
        isWaiting = true;
        setTimeout(() => {
            isDeleting = true;
            isWaiting = false;
        }, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
    }

    const typingSpeed = isDeleting ? 100 : isWaiting ? 3000 : 200;
    setTimeout(type, typingSpeed);
}

// Start the typing effect
setTimeout(type, 1000);

// Add animation on scroll with staggered delay
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // Add staggered delay for project cards and social icons
            if (entry.target.classList.contains('projects-grid')) {
                const projectCards = entry.target.querySelectorAll('.project-card');
                projectCards.forEach((card, cardIndex) => {
                    card.style.setProperty('--delay', cardIndex);
                });
            }
            
            if (entry.target.classList.contains('social-icons')) {
                const socialBoxes = entry.target.querySelectorAll('.social-box');
                socialBoxes.forEach((box, boxIndex) => {
                    box.style.setProperty('--delay', boxIndex);
                });
            }
        }
    });
}, observerOptions);

// Observe sections and social icons
document.querySelectorAll('.section, .social-icons').forEach(section => {
    observer.observe(section);
});

// Animate skill progress bars when they come into view
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBar = entry.target.querySelector('.progress');
            const width = progressBar.style.width;
            progressBar.style.width = '0';
            setTimeout(() => {
                progressBar.style.width = width;
            }, 100);
        }
    });
}, {
    threshold: 0.5
});

document.querySelectorAll('.skill-card').forEach(card => {
    skillObserver.observe(card);
});

// Add hover effects to skill cards
document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02) rotateX(10deg)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1) rotateX(0)';
    });
});

// Contact section interactions
const socialBoxes = document.querySelectorAll('.social-box');
const contactDetails = document.querySelector('.contact-details');
const detailItems = document.querySelectorAll('.detail-item');

socialBoxes.forEach(box => {
    box.addEventListener('mouseenter', () => {
        contactDetails.classList.add('show');
        // Hide all detail items first
        detailItems.forEach(item => item.style.display = 'none');
        
        // Show the corresponding detail item
        const href = box.getAttribute('href');
        let type = 'location';
        
        if (href.includes('tel:')) type = 'phone';
        else if (href.includes('mailto:')) type = 'email';
        else if (href.includes('github.com')) type = 'github';
        else if (href.includes('linkedin.com')) type = 'linkedin';
        else if (href.includes('t.me')) type = 'telegram';
        else if (href.includes('instagram.com')) type = 'instagram';
        
        const detailItem = document.getElementById(`${type}-detail`);
        if (detailItem) {
            detailItem.style.display = 'block';
        }
    });
});

// Hide details when mouse leaves the contact section
document.getElementById('contact').addEventListener('mouseleave', () => {
    contactDetails.classList.remove('show');
    // Show all detail items again
    detailItems.forEach(item => item.style.display = 'block');
});
// ==================== Image Carousel Auto-Scroll ==================== //
const carousels = document.querySelectorAll('.carousel');

carousels.forEach(carousel => {
    const images = carousel.querySelectorAll('.carousel-image');
    let currentIndex = 0;

    setInterval(() => {
        // Remove active class from current image
        images[currentIndex].classList.remove('active');

        // Move to next image
        currentIndex = (currentIndex + 1) % images.length;

        // Add active class to new image
        images[currentIndex].classList.add('active');
    }, 3000); // 3 seconds
});

// ==================== Mobile Menu Toggle ==================== //
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
});

// ==================== Smooth Scroll & Active Link ==================== //
const sections = document.querySelectorAll('section');
const navLinks2 = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks2.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ==================== Contact Form Handler ==================== //
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Simple validation
        if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
            alert('Please fill in all fields');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Here you would typically send this to a server
        console.log('Form submitted:', { name, email, message });
        
        // Show success message
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}

// ==================== Scroll Animations ==================== //
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideInUp 0.8s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe project cards and skill categories
document.querySelectorAll('.project-card, .skill-category, .about-content').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ==================== Navbar Background on Scroll ==================== //
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.05)';
    }
});

// ==================== Add smooth transitions to nav links ==================== //
navLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.opacity = '0.7';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.opacity = '1';
    });
});

// ==================== Utility: Generate project links ==================== //
// This function can be used to dynamically generate project cards
function createProjectCard(projectData) {
    const card = document.createElement('div');
    card.className = 'project-card';
    
    const tagsHTML = projectData.tags
        .map(tag => `<span class="tag">${tag}</span>`)
        .join('');
    
    const linksHTML = projectData.links
        .map(link => `<a href="${link.url}" class="project-link"><i class="fas fa-${link.icon}"></i> ${link.text}</a>`)
        .join('');
    
    card.innerHTML = `
        <div class="project-image">
            <div class="placeholder">
                <i class="fas ${projectData.icon}"></i>
            </div>
        </div>
        <div class="project-content">
            <h3>${projectData.title}</h3>
            <p>${projectData.description}</p>
            <div class="project-tags">
                ${tagsHTML}
            </div>
            <div class="project-links">
                ${linksHTML}
            </div>
        </div>
    `;
    
    return card;
}

// ==================== Example: Adding a project dynamically ==================== //
// Uncomment to use:
/*
const projectsGrid = document.querySelector('.projects-grid');
const newProject = createProjectCard({
    title: 'New Project',
    description: 'Project description goes here',
    icon: 'fa-rocket',
    tags: ['Tag1', 'Tag2', 'Tag3'],
    links: [
        { text: 'Live Demo', url: '#', icon: 'link' },
        { text: 'Source Code', url: '#', icon: 'code' }
    ]
});
projectsGrid.appendChild(newProject);
*/

// ==================== Type Writer Effect for Hero (Optional) ==================== //
function typeWriter(element, text, speed = 50) {
    let index = 0;
    element.textContent = '';
    
    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Uncomment to enable typewriter effect on hero title:
// const heroTitle = document.querySelector('.hero-title');
// typeWriter(heroTitle, heroTitle.textContent);

// ==================== Settings Dropdown ==================== //
document.addEventListener('DOMContentLoaded', () => {
    const settingsLink = document.querySelector('[href="#"]');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    
    if (settingsLink && dropdownMenu) {
        // Find the settings link specifically
        const allLinks = document.querySelectorAll('.nav-link');
        let settingsNav = null;
        
        allLinks.forEach(link => {
            if (link.innerHTML.includes('fa-cog')) {
                settingsNav = link;
            }
        });
        
        if (settingsNav) {
            settingsNav.addEventListener('click', (e) => {
                e.preventDefault();
                dropdownMenu.classList.toggle('active');
            });
        }
    }
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        const dropdown = document.querySelector('.nav-dropdown');
        if (dropdown && !dropdown.contains(e.target)) {
            dropdownMenu.classList.remove('active');
        }
    });
    
    // Handle Accessibility option
    const accessibilityLink = document.querySelector('[data-accessibility]');
    if (accessibilityLink) {
        accessibilityLink.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Accessibility options would be displayed here. Features may include: font size, high contrast mode, screen reader support, etc.');
            dropdownMenu.classList.remove('active');
        });
    }
    
    // Handle Theme option
    const themeLink = document.querySelector('[data-theme]');
    if (themeLink) {
        themeLink.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Theme options would be displayed here. Options may include: dark mode, light mode, custom colors, etc.');
            dropdownMenu.classList.remove('active');
        });
    }
});

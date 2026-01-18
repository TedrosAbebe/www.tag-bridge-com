// Language switching functionality
let currentLanguage = 'am'; // Default to Amharic

function switchLanguage(lang) {
    currentLanguage = lang;
    
    // Update all elements with data attributes
    const elements = document.querySelectorAll('[data-am][data-en]');
    elements.forEach(element => {
        const text = element.getAttribute(`data-${lang}`);
        if (text) {
            element.textContent = text;
        }
    });
    
    // Update language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });
    
    // Update typing animation text if needed
    if (lang === 'en') {
        // Re-run typing animation with English text
        setTimeout(() => {
            const heroTitle = document.querySelector('.hero-title');
            if (heroTitle) {
                restartTypingAnimation(['Welcome to Tag Bridge']);
            }
        }, 100);
    } else {
        // Re-run typing animation with Amharic text
        setTimeout(() => {
            const heroTitle = document.querySelector('.hero-title');
            if (heroTitle) {
                restartTypingAnimation(['እንኳን ወደ ታግ ብሪጅ በደህና መጡ']);
            }
        }, 100);
    }
    
    // Save language preference
    localStorage.setItem('tagbridge-language', lang);
}

// Mobile Menu Functions
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const navToggle = document.querySelector('.nav-toggle');
    
    mobileMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const navToggle = document.querySelector('.nav-toggle');
    
    mobileMenu.classList.remove('active');
    navToggle.classList.remove('active');
}

function restartTypingAnimation(texts) {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    const titleLines = heroTitle.querySelectorAll('.title-line');
    
    // Clear and hide all lines
    titleLines.forEach((line, index) => {
        line.style.opacity = '0';
        line.innerHTML = '';
        line.style.setProperty('--show-cursor', 'none');
    });
    
    // Typing animation function
    function typeText(lineIndex, charIndex = 0) {
        if (lineIndex >= titleLines.length) {
            titleLines[titleLines.length - 1].style.setProperty('--show-cursor', 'inline');
            return;
        }
        
        const currentLine = titleLines[lineIndex];
        const currentText = texts[lineIndex];
        
        currentLine.style.opacity = '1';
        currentLine.style.setProperty('--show-cursor', 'inline');
        
        if (charIndex < currentText.length) {
            currentLine.innerHTML = currentText.substring(0, charIndex + 1);
            setTimeout(() => typeText(lineIndex, charIndex + 1), 100);
        } else {
            currentLine.style.setProperty('--show-cursor', 'none');
            setTimeout(() => typeText(lineIndex + 1), 500);
        }
    }
    
    // Start typing
    setTimeout(() => typeText(0), 300);
}

// Smooth scrolling function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Handle product ordering - Direct WhatsApp redirect
function orderProduct(productType) {
    let productName, price, whatsappMessage;
    
    switch (productType) {
        case 'crypto':
            productName = 'ክሪፕቶ ከረንሲ በአማረኛ';
            price = '500 ብር';
            whatsappMessage = 'ሰላም! በአማረኛ የተዘጋጀ ሙሉ የክሪፕቶ ከረንሲ መማሪያ መጽሃፍን (500 ብር) መዘዝ እፈልጋለሁ።';
            break;
        case 'forex':
            productName = 'ፎሬክስ ትሬዲንግ በአማረኛ';
            price = '450 ብር';
            whatsappMessage = 'ሰላም! በአማረኛ የተዘጋጀ ሙሉ የፎሬክስ ትሬዲንግ መማሪያ መጽሃፍን (450 ብር) መዘዝ እፈልጋለሁ።';
            break;
        case 'youtube-guide':
            productName = 'የዩቲዩብ ይዘት ፈጣሪዎች መመሪያ';
            price = '350 ብር';
            whatsappMessage = 'ሰላም! በአማረኛ የተዘጋጀ ሙሉ የዩቲዩብ ይዘት ፈጠራ መማሪያ መጽሃፍን (350 ብር) መዘዝ እፈልጋለሁ።';
            break;
        case 'digital-business':
            productName = 'የዲጂታል እና ኦንላይን ቢዝነስ መመሪያ';
            price = '400 ብር';
            whatsappMessage = 'ሰላም! በአማረኛ የተዘጋጀ ሙሉ የዲጂታል እና ኦንላይን ቢዝነስ መማሪያ መጽሃፍን (400 ብር) መዘዝ እፈልጋለሁ።';
            break;
        case 'digital-tools':
            productName = 'የዲጂታል መሳሪያዎች መመሪያ';
            price = '300 ብር';
            whatsappMessage = 'ሰላም! በአማረኛ የተዘጋጀ ሙሉ የዲጂታል መሳሪያዎች መማሪያ መጽሃፍን (300 ብር) መዘዝ እፈልጋለሁ።';
            break;
        case 'bundle':
            productName = 'ክሪፕቶ እና ፎሬክስ ጥቅል';
            price = '700 ብር';
            whatsappMessage = 'ሰላም! 🔥 ክሪፕቶ እና ፎሬክስ ጥቅል (2 መጽሃፍቶች በ700 ብር - 250 ብር ቅናሽ!) መዘዝ እፈልጋለሁ። የገንዘብ ማግኛ ሚስጥሮች በአንድ ጥቅል!';
            break;
        default:
            alert('የተመረጠው ምርት አልተገኘም። እባክዎ እንደገና ይሞክሩ።');
            return;
    }
    
    // Create WhatsApp link and redirect directly
    const whatsappUrl = `https://wa.me/251991856292?text=${encodeURIComponent(whatsappMessage)}`;
    
    // Direct redirect to WhatsApp
    window.open(whatsappUrl, '_blank');
}

// Handle quick contact form submission
function handleQuickContact(event) {
    event.preventDefault();
    // This function is called when form is submitted, but actual sending is handled by the method buttons
    return false;
}

// Simple send message function (opens WhatsApp)
function sendMessage() {
    const messageInput = document.getElementById('message');
    
    if (!messageInput) {
        alert('የቅጹ ችግር አለ። እባክዎ ገጹን እንደገና ይጫኑ።');
        return;
    }
    
    const message = messageInput.value.trim();
    
    if (!message) {
        alert('እባክዎ መልእክትዎን ይጻፉ');
        messageInput.focus();
        return;
    }
    
    // Create WhatsApp URL with the message
    const whatsappUrl = `https://wa.me/251991856292?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Clear the message field and show success message
    messageInput.value = '';
    
    // Show success feedback
    const button = document.querySelector('.contact-form .btn');
    const originalText = button.innerHTML;
    
    button.innerHTML = '<span>✅ ተልኳል!</span>';
    button.style.background = 'linear-gradient(135deg, #10b981, #059669)';
    
    setTimeout(() => {
        button.innerHTML = originalText;
        button.style.background = '';
    }, 2000);
}

// Simple Email send function
function sendToEmail() {
    const name = document.getElementById('name').value.trim();
    const message = document.getElementById('message').value.trim();
    
    if (!message) {
        alert('እባክዎ መልእክትዎን ይጻፉ');
        return;
    }
    
    const subject = name ? `መልእክት ከ ${name}` : 'መልእክት';
    let emailBody = '';
    if (name) {
        emailBody = `ሰላም!\n\nስሜ ${name} ነው.\n\n${message}\n\nእናመሰግናለን!`;
    } else {
        emailBody = `ሰላም!\n\n${message}\n\nእናመሰግናለን!`;
    }
    
    const emailUrl = `mailto:tedayeerasu@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
    window.location.href = emailUrl;
    
    // Clear form
    document.getElementById('name').value = '';
    document.getElementById('message').value = '';
}

// Send message via Email - Enhanced version  
function sendViaEmail() {
    console.log('Email function called');
    
    const nameInput = document.getElementById('name');
    const messageInput = document.getElementById('message');
    
    if (!nameInput || !messageInput) {
        alert('የቅጹ ችግር አለ። እባክዎ ገጹን እንደገና ይጫኑ።');
        return;
    }
    
    const name = nameInput.value.trim();
    const message = messageInput.value.trim();
    
    if (!name) {
        alert('እባክዎ ስምዎን ይሙሉ');
        nameInput.focus();
        return;
    }
    
    if (!message) {
        alert('እባክዎ መልእክትዎን ይሙሉ');
        messageInput.focus();
        return;
    }
    
    const subject = `መልእክት ከ ${name}`;
    const body = `ሰላም!

ስሜ ${name} ነው።

${message}

እናመሰግናለን!`;
    
    const emailUrl = `mailto:tedayeerasu@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    console.log('Opening email with URL:', emailUrl);
    
    try {
        window.location.href = emailUrl;
        
        // Clear form after 1 second
        setTimeout(() => {
            nameInput.value = '';
            messageInput.value = '';
        }, 1000);
        
    } catch (error) {
        console.error('Error opening email:', error);
        alert('ኢሜይል መክፈት አልተቻለም። እባክዎ በቀጥታ ኢሜይል ይላኩ።');
    }
}

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Load saved language preference
    const savedLanguage = localStorage.getItem('tagbridge-language') || 'am';
    if (savedLanguage !== 'am') {
        switchLanguage(savedLanguage);
    }
    
    // Language switcher event listeners
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            switchLanguage(lang);
        });
    });
    
    // Mobile navigation links
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
            closeMobileMenu();
        });
    });
    
    // Desktop navigation links
    document.querySelectorAll('.desktop-nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
    
    // Navbar scroll effect and progress indicator
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        const scrollProgress = document.getElementById('scrollProgress');
        
        // Navbar background effect - Dark Mode
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(15, 23, 42, 0.98)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.4)';
        } else {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        }
        
        // Scroll progress indicator
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / scrollHeight) * 100;
        
        if (scrollProgress) {
            scrollProgress.style.width = scrollPercent + '%';
        }
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.about-card, .service-card, .product-card, .contact-card, .contact-form-wrapper'
    );
    
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // Add typing effect to hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const titleLines = heroTitle.querySelectorAll('.title-line');
        
        // Hide all lines initially and remove cursor
        titleLines.forEach((line, index) => {
            line.style.opacity = '0';
            line.innerHTML = '';
            line.style.setProperty('--show-cursor', 'none');
        });
        
        // Get text based on current language
        const getTexts = () => {
            if (currentLanguage === 'en') {
                return ['Welcome to Tag Bridge'];
            } else {
                return ['እንኳን ወደ ታግ ብሪጅ በደህና መጡ'];
            }
        };
        
        // Typing animation function
        function typeText(lineIndex, charIndex = 0) {
            const texts = getTexts();
            if (lineIndex >= titleLines.length) {
                titleLines[titleLines.length - 1].style.setProperty('--show-cursor', 'inline');
                return;
            }
            
            const currentLine = titleLines[lineIndex];
            const currentText = texts[lineIndex];
            
            currentLine.style.opacity = '1';
            currentLine.style.setProperty('--show-cursor', 'inline');
            
            if (charIndex < currentText.length) {
                currentLine.innerHTML = currentText.substring(0, charIndex + 1);
                setTimeout(() => typeText(lineIndex, charIndex + 1), 100);
            } else {
                currentLine.style.setProperty('--show-cursor', 'none');
                setTimeout(() => typeText(lineIndex + 1), 500);
            }
        }
        
        // Start typing animation after a delay
        setTimeout(() => typeText(0), 1000);
    }
    
    // Add parallax effect to hero shapes
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const shapes = document.querySelectorAll('.shape');
        
        shapes.forEach((shape, index) => {
            const speed = 0.5 + (index * 0.1);
            shape.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
    
    // Add smooth reveal animation for sections
    const sections = document.querySelectorAll('section');
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s ease';
        sectionObserver.observe(section);
    });
});

// Utility functions
const utils = {
    // Debounce function for performance
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Check if element is in viewport
    isInViewport: function(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },
    
    // Smooth scroll to top
    scrollToTop: function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
};

// Add scroll to top functionality
window.addEventListener('scroll', utils.debounce(function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Show/hide scroll to top button (if you add one)
    const scrollTopBtn = document.querySelector('.scroll-top');
    if (scrollTopBtn) {
        if (scrollTop > 300) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.visibility = 'visible';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.visibility = 'hidden';
        }
    }
}, 100));

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Remove any loading screens
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
});

// Add error handling for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
        });
    });
});

// Performance optimization: Lazy loading for images (if needed)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}
// Enhanced Theme Management
class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('themeToggle');
        this.body = document.body;
        this.currentTheme = this.getStoredTheme() || this.getPreferredTheme();
        
        this.init();
    }
    
    init() {
        this.setTheme(this.currentTheme);
        this.bindEvents();
    }
    
    getStoredTheme() {
        return localStorage.getItem('theme');
    }
    
    getPreferredTheme() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    
    setTheme(theme) {
        this.body.setAttribute('data-theme', theme);
        this.updateThemeIcon(theme);
        localStorage.setItem('theme', theme);
        this.currentTheme = theme;
        
        // Update meta theme color
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            metaThemeColor.setAttribute('content', theme === 'dark' ? '#0f0f0f' : '#ffffff');
        }
    }
    
    updateThemeIcon(theme) {
        const icon = this.themeToggle.querySelector('i');
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
    
    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
        
        // Add a subtle animation feedback
        this.themeToggle.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.themeToggle.style.transform = 'scale(1)';
        }, 150);
    }
    
    bindEvents() {
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
        
        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!this.getStoredTheme()) {
                this.setTheme(e.matches ? 'dark' : 'light');
            }
        });
    }
}

// Enhanced Smooth Scrolling
class SmoothScroll {
    constructor() {
        this.init();
    }
    
    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 100; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Update URL without jumping
                    history.pushState(null, null, anchor.getAttribute('href'));
                }
            });
        });
    }
}

// Enhanced Intersection Observer for Animations
class AnimationObserver {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        this.init();
    }
    
    init() {
        if ('IntersectionObserver' in window) {
            this.observer = new IntersectionObserver(this.handleIntersection.bind(this), this.observerOptions);
            this.observeElements();
        }
    }
    
    observeElements() {
        const elements = document.querySelectorAll(`
            .overview-card, 
            .curriculum-phase, 
            .roadmap-item, 
            .project-card,
            .resource-card,
            .career-stat,
            .path-card
        `);
        elements.forEach(el => this.observer.observe(el));
    }
    
    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                entry.target.classList.add('animate-in');
                this.observer.unobserve(entry.target);
            }
        });
    }
}

// Enhanced Navbar Scroll Effect
class NavbarScroll {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.lastScrollY = window.scrollY;
        this.ticking = false;
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', this.requestTick.bind(this));
    }
    
    requestTick() {
        if (!this.ticking) {
            requestAnimationFrame(this.handleScroll.bind(this));
            this.ticking = true;
        }
    }
    
    handleScroll() {
        const currentScrollY = window.scrollY;
        
        // Add/remove scrolled class for styling
        if (currentScrollY > 50) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar based on scroll direction
        if (currentScrollY > 100) {
            if (currentScrollY > this.lastScrollY) {
                this.navbar.style.transform = 'translateY(-100%)';
            } else {
                this.navbar.style.transform = 'translateY(0)';
            }
        } else {
            this.navbar.style.transform = 'translateY(0)';
        }
        
        this.lastScrollY = currentScrollY;
        this.ticking = false;
    }
}

// Enhanced Parallax Effect
class ParallaxEffect {
    constructor() {
        this.hero = document.querySelector('.hero');
        this.heroContent = document.querySelector('.hero-content');
        this.neuralNodes = document.querySelectorAll('.node');
        this.ticking = false;
        this.init();
    }
    
    init() {
        if (window.innerWidth > 768) { // Only on desktop
            window.addEventListener('scroll', this.requestTick.bind(this));
        }
    }
    
    requestTick() {
        if (!this.ticking) {
            requestAnimationFrame(this.handleScroll.bind(this));
            this.ticking = true;
        }
    }
    
    handleScroll() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        
        if (this.heroContent) {
            this.heroContent.style.transform = `translateY(${rate}px)`;
        }
        
        // Animate neural network nodes
        this.neuralNodes.forEach((node, index) => {
            const speed = 0.1 + (index * 0.05);
            const yPos = scrolled * speed;
            node.style.transform = `translateY(${yPos}px)`;
        });
        
        this.ticking = false;
    }
}

// Enhanced Typing Animation
class TypingAnimation {
    constructor() {
        this.titleElement = document.querySelector('.hero-title');
        this.originalText = this.titleElement.innerHTML;
        this.init();
    }
    
    init() {
        // Only run animation on first load
        if (!sessionStorage.getItem('heroAnimationPlayed')) {
            this.startTypingAnimation();
            sessionStorage.setItem('heroAnimationPlayed', 'true');
        }
    }
    
    startTypingAnimation() {
        this.titleElement.innerHTML = '';
        let i = 0;
        const speed = 30;
        
        const typeWriter = () => {
            if (i < this.originalText.length) {
                this.titleElement.innerHTML += this.originalText.charAt(i);
                i++;
                setTimeout(typeWriter, speed);
            } else {
                // Add cursor blink effect
                this.addCursorBlink();
            }
        };
        
        setTimeout(typeWriter, 1000); // Delay before starting
    }
    
    addCursorBlink() {
        const cursor = document.createElement('span');
        cursor.className = 'typing-cursor';
        cursor.textContent = '|';
        this.titleElement.appendChild(cursor);
        
        // Remove cursor after animation
        setTimeout(() => {
            if (cursor.parentNode) {
                cursor.parentNode.removeChild(cursor);
            }
        }, 3000);
    }
}

// Enhanced Progress Indicator
class ProgressIndicator {
    constructor() {
        this.createProgressBar();
        this.init();
    }
    
    createProgressBar() {
        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        progressBar.innerHTML = '<div class="progress-fill"></div>';
        document.body.appendChild(progressBar);
        
        this.progressFill = document.querySelector('.progress-fill');
    }
    
    init() {
        window.addEventListener('scroll', this.updateProgress.bind(this));
    }
    
    updateProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = Math.min((scrollTop / docHeight) * 100, 100);
        
        this.progressFill.style.width = scrollPercent + '%';
    }
}

// Enhanced Statistics Counter Animation
class StatsCounter {
    constructor() {
        this.stats = document.querySelectorAll('.stat-number');
        this.init();
    }
    
    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    this.animateCounter(entry.target);
                    entry.target.classList.add('counted');
                }
            });
        }, { threshold: 0.5 });
        
        this.stats.forEach(stat => observer.observe(stat));
    }
    
    animateCounter(element) {
        const text = element.textContent;
        const hasPlus = text.includes('+');
        const hasK = text.includes('K');
        const target = parseInt(text.replace(/[^\d]/g, ''));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                let finalText = target.toString();
                if (hasK) finalText += 'K';
                if (hasPlus) finalText += '+';
                element.textContent = finalText;
                clearInterval(timer);
            } else {
                let currentText = Math.floor(current).toString();
                if (hasK) currentText += 'K';
                if (hasPlus) currentText += '+';
                element.textContent = currentText;
            }
        }, 16);
    }
}

// Roadmap Timeline Animation
class RoadmapAnimation {
    constructor() {
        this.roadmapItems = document.querySelectorAll('.roadmap-item');
        this.init();
    }
    
    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    this.animateMarker(entry.target.querySelector('.roadmap-marker'));
                }
            });
        }, { threshold: 0.3 });
        
        this.roadmapItems.forEach(item => observer.observe(item));
    }
    
    animateMarker(marker) {
        marker.style.transform = 'translateX(-50%) scale(0)';
        marker.style.opacity = '0';
        
        setTimeout(() => {
            marker.style.transition = 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            marker.style.transform = 'translateX(-50%) scale(1)';
            marker.style.opacity = '1';
        }, 200);
    }
}

// Enhanced Project Cards Interaction
class ProjectInteraction {
    constructor() {
        this.projectCards = document.querySelectorAll('.project-card');
        this.init();
    }
    
    init() {
        this.projectCards.forEach(card => {
            card.addEventListener('mouseenter', this.handleMouseEnter.bind(this));
            card.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
        });
    }
    
    handleMouseEnter(e) {
        const card = e.currentTarget;
        const icon = card.querySelector('.project-image i');
        
        if (icon) {
            icon.style.transform = 'scale(1.2) rotate(10deg)';
            icon.style.transition = 'transform 0.3s ease';
        }
        
        // Add subtle glow effect
        card.style.boxShadow = '0 20px 40px rgba(0, 212, 170, 0.2)';
    }
    
    handleMouseLeave(e) {
        const card = e.currentTarget;
        const icon = card.querySelector('.project-image i');
        
        if (icon) {
            icon.style.transform = 'scale(1) rotate(0deg)';
        }
        
        card.style.boxShadow = '';
    }
}

// CTA Button Effects
class CTAEffects {
    constructor() {
        this.ctaButtons = document.querySelectorAll('.cta-button');
        this.init();
    }
    
    init() {
        this.ctaButtons.forEach(button => {
            button.addEventListener('click', this.handleClick.bind(this));
            button.addEventListener('mouseenter', this.handleMouseEnter.bind(this));
        });
    }
    
    handleClick(e) {
        const button = e.currentTarget;
        
        // Create ripple effect
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    handleMouseEnter(e) {
        const button = e.currentTarget;
        const icon = button.querySelector('i');
        
        if (icon) {
            icon.style.transform = 'translateX(5px)';
            icon.style.transition = 'transform 0.3s ease';
        }
    }
}

// Lazy Loading for Images
class LazyLoader {
    constructor() {
        this.images = document.querySelectorAll('img[data-src]');
        this.init();
    }
    
    init() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.loadImage(entry.target);
                        imageObserver.unobserve(entry.target);
                    }
                });
            });
            
            this.images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for older browsers
            this.images.forEach(img => this.loadImage(img));
        }
    }
    
    loadImage(img) {
        img.src = img.dataset.src;
        img.classList.add('loaded');
    }
}

// Performance Monitor
class PerformanceMonitor {
    constructor() {
        this.init();
    }
    
    init() {
        // Monitor page load performance
        window.addEventListener('load', () => {
            if ('performance' in window) {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('Page Load Time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
            }
        });
        
        // Monitor scroll performance
        let scrollCount = 0;
        window.addEventListener('scroll', () => {
            scrollCount++;
            if (scrollCount % 100 === 0) {
                console.log('Scroll events processed:', scrollCount);
            }
        });
    }
}

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Core functionality
    new ThemeManager();
    new SmoothScroll();
    new AnimationObserver();
    new NavbarScroll();
    new ProgressIndicator();
    new StatsCounter();
    
    // Enhanced features
    new ParallaxEffect();
    new TypingAnimation();
    new RoadmapAnimation();
    new ProjectInteraction();
    new CTAEffects();
    new LazyLoader();
    new PerformanceMonitor();
    
    // Add loading animation
    document.body.classList.add('loaded');
    
    // Add smooth reveal animation for sections
    const sections = document.querySelectorAll('section');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => sectionObserver.observe(section));
});

// Add CSS for additional animations
const additionalStyles = `
    .typing-cursor {
        animation: blink 1s infinite;
        color: var(--accent-mint);
        font-weight: normal;
    }
    
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .navbar.scrolled {
        background: rgba(255, 255, 255, 0.98);
        box-shadow: var(--shadow-md);
    }
    
    [data-theme="dark"] .navbar.scrolled {
        background: rgba(15, 15, 15, 0.98);
    }
    
    .animate-in {
        animation-play-state: running !important;
    }
    
    .section-visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    section {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.6s ease;
    }
    
    .project-card:hover .project-image {
        background: linear-gradient(135deg, var(--accent-mint) 0%, var(--accent-mint-light) 100%);
    }
    
    .cta-button {
        position: relative;
        overflow: hidden;
    }
    
    .cta-button:hover i {
        transform: translateX(5px);
    }
    
    .roadmap-item.animate-in .roadmap-content {
        animation: slideInFromSide 0.8s ease forwards;
    }
    
    .roadmap-item:nth-child(even).animate-in .roadmap-content {
        animation: slideInFromSideReverse 0.8s ease forwards;
    }
    
    @keyframes slideInFromSide {
        from {
            opacity: 0;
            transform: translateX(-50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideInFromSideReverse {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);
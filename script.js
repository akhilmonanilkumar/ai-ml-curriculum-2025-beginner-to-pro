// Theme Management
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
    }
    
    updateThemeIcon(theme) {
        const icon = this.themeToggle.querySelector('i');
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
    
    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
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

// Smooth Scrolling for Navigation Links
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
                    const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Intersection Observer for Animations
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
        const elements = document.querySelectorAll('.overview-card, .curriculum-phase, .timeline-item, .project-card');
        elements.forEach(el => this.observer.observe(el));
    }
    
    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                this.observer.unobserve(entry.target);
            }
        });
    }
}

// Navbar Scroll Effect
class NavbarScroll {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.lastScrollY = window.scrollY;
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', this.handleScroll.bind(this));
    }
    
    handleScroll() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            this.navbar.style.transform = currentScrollY > this.lastScrollY ? 'translateY(-100%)' : 'translateY(0)';
        } else {
            this.navbar.style.transform = 'translateY(0)';
        }
        
        this.lastScrollY = currentScrollY;
    }
}

// Parallax Effect for Hero Section
class ParallaxEffect {
    constructor() {
        this.hero = document.querySelector('.hero');
        this.heroContent = document.querySelector('.hero-content');
        this.init();
    }
    
    init() {
        if (window.innerWidth > 768) { // Only on desktop
            window.addEventListener('scroll', this.handleScroll.bind(this));
        }
    }
    
    handleScroll() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (this.heroContent) {
            this.heroContent.style.transform = `translateY(${rate}px)`;
        }
    }
}

// Typing Animation for Hero Title
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
        const speed = 50;
        
        const typeWriter = () => {
            if (i < this.originalText.length) {
                this.titleElement.innerHTML += this.originalText.charAt(i);
                i++;
                setTimeout(typeWriter, speed);
            }
        };
        
        setTimeout(typeWriter, 1000); // Delay before starting
    }
}

// Progress Indicator
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
        
        const styles = `
            .progress-bar {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 3px;
                background: rgba(0, 212, 170, 0.2);
                z-index: 9999;
            }
            .progress-fill {
                height: 100%;
                background: linear-gradient(90deg, #00d4aa, #4de6c7);
                width: 0%;
                transition: width 0.1s ease;
            }
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
        
        this.progressFill = document.querySelector('.progress-fill');
    }
    
    init() {
        window.addEventListener('scroll', this.updateProgress.bind(this));
    }
    
    updateProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        this.progressFill.style.width = scrollPercent + '%';
    }
}

// Mobile Menu (for future enhancement)
class MobileMenu {
    constructor() {
        this.createMobileMenu();
        this.init();
    }
    
    createMobileMenu() {
        // This would be implemented for mobile navigation
        // For now, we'll keep the desktop navigation
    }
    
    init() {
        // Mobile menu functionality would go here
    }
}

// Statistics Counter Animation
class StatsCounter {
    constructor() {
        this.stats = document.querySelectorAll('.stat-number');
        this.init();
    }
    
    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        });
        
        this.stats.forEach(stat => observer.observe(stat));
    }
    
    animateCounter(element) {
        const target = parseInt(element.textContent);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                element.textContent = target + (element.textContent.includes('+') ? '+' : '');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '');
            }
        }, 16);
    }
}

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
    new SmoothScroll();
    new AnimationObserver();
    new NavbarScroll();
    new ParallaxEffect();
    new TypingAnimation();
    new ProgressIndicator();
    new StatsCounter();
    
    // Add loading animation
    document.body.classList.add('loaded');
});

// Add some additional CSS for loading state
const additionalStyles = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
    
    .overview-card,
    .curriculum-phase,
    .timeline-item,
    .project-card {
        animation-play-state: paused;
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);
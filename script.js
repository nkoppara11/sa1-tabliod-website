// Modern JavaScript Enhancements
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    updateDate();
    initMobileNav();
    initSmoothScrolling();
    initActiveNavigation();
    initScrollAnimations();
    initParallaxEffects();
    initHoverEffects();
    initWeather();
    initGames();
    initHeroModal();
});

// Smooth scroll behavior and modern animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all cards and sections
    document.querySelectorAll('.news-card, .game-card, .company-ad-section').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Modern parallax effects
function initParallaxEffects() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const header = document.querySelector('.header-main');
        
        if (header) {
            header.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
        
        // Parallax for card images
        document.querySelectorAll('.card-image img').forEach(img => {
            const rect = img.getBoundingClientRect();
            const speed = 0.1;
            
            if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
                const yPos = -(scrolled - img.offsetTop) * speed;
                img.style.transform = `translateY(${yPos}px)`;
            }
        });
    });
}

// Modern hover effects
function initHoverEffects() {
    document.querySelectorAll('.news-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Current date display
function updateDate() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    document.getElementById('current-date').textContent = now.toLocaleDateString('en-US', options);
}

// Mobile navigation toggle
function initMobileNav() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Active navigation highlight
function initActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function updateActiveNav() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
}

// Image lazy loading fallback
function initImageLoading() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        img.addEventListener('error', function() {
            this.src = 'https://via.placeholder.com/400x200/cccccc/666666?text=Image+Not+Available';
            this.style.opacity = '1';
        });
    });
}

// Reading time estimator
function addReadingTime() {
    const articles = document.querySelectorAll('.news-card, .featured-article');
    
    articles.forEach(article => {
        const text = article.textContent || article.innerText;
        const wordsPerMinute = 200;
        const words = text.trim().split(/\s+/).length;
        const readingTime = Math.ceil(words / wordsPerMinute);
        
        const meta = article.querySelector('.article-meta, .card-meta');
        if (meta && readingTime > 0) {
            const readingTimeElement = document.createElement('span');
            readingTimeElement.className = 'reading-time';
            readingTimeElement.innerHTML = `<i class="fas fa-clock"></i> ${readingTime} min read`;
            meta.appendChild(readingTimeElement);
        }
    });
}

// Search functionality removed

// Hero article click handler
function initHeroArticleClick() {
    const heroArticleLink = document.getElementById('hero-article-link');
    if (heroArticleLink) {
        heroArticleLink.addEventListener('click', function(e) {
            e.preventDefault();
            showHeroArticle();
        });
    }
}

// Show complete hero article in modal
function showHeroArticle() {
    const modal = document.getElementById('articleModal');
    const modalTitle = document.getElementById('modal-title');
    const modalAuthor = document.getElementById('modal-author');
    const modalDate = document.getElementById('modal-date');
    const modalImage = document.getElementById('modal-image');
    const modalContent = document.getElementById('modal-content');
    
    // Set article data
    modalTitle.textContent = 'How a Solar Grid Brought Light to Dharnai Village';
    modalAuthor.textContent = 'By Nirvan';
    modalDate.textContent = 'September 28, 2025';
    modalImage.src = 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80';
    modalImage.alt = 'Solar panels in Dharnai village';
    
    // Set complete article content
    modalContent.innerHTML = `
        <p>In the village of Dharnai, located in the heart of rural Bihar, the villagers had no reliable electric network for decades. The absence of electricity meant that families relied on kerosene lamps for lighting and diesel generators for occasional power needs, which were both expensive and unreliable.</p>
        
        <p>The situation was particularly challenging for students who struggled to study after sunset, and women who felt unsafe venturing outside in the dark. The lack of consistent power also hindered local businesses and healthcare facilities from operating effectively.</p>
        
        <h3>A Revolutionary Change</h3>
        <p>One morning, the village woke up to a reliable electric network that would transform their lives forever. This remarkable change came through the collaborative efforts of Greenspace India, teaming up with BASIX (Bharatiya Samruddhi Finance Limited) and CEED (Centre for Environment and Energy Development).</p>
        
        <p>Together, these organizations built a solar-powered micro-grid with an impressive 100 kW capacity. This innovative solution was designed specifically to meet the energy needs of the rural community while ensuring environmental sustainability.</p>
        
        <h3>The Impact on Daily Life</h3>
        <p>With lights available in the evening to ensure continuous power, the transformation was immediate and profound. Students were finally able to study after dark, extending their learning hours and improving their academic prospects. The reliable lighting also meant that women felt safe moving around outside during evening hours, enhancing their freedom and security.</p>
        
        <p>Local businesses began operating for longer hours, healthcare services improved with consistent power for medical equipment, and the overall quality of life in Dharnai village experienced a remarkable uplift.</p>
        
        <h3>A Model for Rural Electrification</h3>
        <p>The Dharnai solar grid project has become a beacon of hope and a replicable model for rural electrification across India. It demonstrates how renewable energy solutions can be effectively implemented in remote areas, providing sustainable and reliable power while reducing dependence on fossil fuels.</p>
        
        <p>This initiative not only brought light to Dharnai but also illuminated a path forward for sustainable development in rural communities across the nation. The success of this project continues to inspire similar renewable energy initiatives in other villages, spreading the benefits of clean, reliable electricity to more communities in need.</p>
    `;
    
    // Show modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

// Initialize modal functionality
function initModal() {
    const modal = document.getElementById('articleModal');
    const closeBtn = document.querySelector('.close-modal');
    
    // Close modal when clicking the X button
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            closeModal();
        });
    }
    
    // Close modal when clicking outside the content
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
}

// Close modal function
function closeModal() {
    const modal = document.getElementById('articleModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore background scrolling
}

// Get user's location and fetch weather data
function initWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                fetchWeatherData(lat, lon);
            },
            function(error) {
                console.log('Geolocation error:', error);
                // Fallback with simulated weather for user's general area
                fetchWeatherData(28.6139, 77.2090); // Delhi coordinates as fallback
            }
        );
    } else {
        console.log('Geolocation is not supported');
        // Fallback with simulated weather
        fetchWeatherData(28.6139, 77.2090); // Delhi coordinates as fallback
    }
}

// Fetch weather data using a free weather service
async function fetchWeatherData(lat, lon) {
    try {
        // Using wttr.in API - a free weather service that doesn't require API key
        const response = await fetch(`https://wttr.in/${lat},${lon}?format=j1`);
        
        if (response.ok) {
            const data = await response.json();
            const current = data.current_condition[0];
            const location = data.nearest_area[0];
            
            const weatherData = {
                temp: Math.round(current.temp_C),
                condition: current.weatherDesc[0].value.toLowerCase(),
                icon: getWeatherIcon(current.weatherCode),
                desc: current.weatherDesc[0].value,
                city: location.areaName[0].value || 'Your Location'
            };
            
            updateWeatherDisplay(weatherData);
        } else {
            throw new Error('Weather API failed');
        }
    } catch (error) {
        console.log('Weather API error:', error);
        // Fallback to simulated weather data
        simulateWeatherData(lat, lon);
    }
}

// Get appropriate weather icon based on weather code
function getWeatherIcon(weatherCode) {
    const code = parseInt(weatherCode);
    
    if (code === 113) return 'fas fa-sun'; // Sunny
    if (code >= 116 && code <= 119) return 'fas fa-cloud-sun'; // Partly cloudy
    if (code >= 122 && code <= 143) return 'fas fa-cloud'; // Cloudy/Overcast
    if (code >= 176 && code <= 200) return 'fas fa-cloud-rain'; // Light rain
    if (code >= 227 && code <= 284) return 'fas fa-cloud-rain'; // Rain
    if (code >= 293 && code <= 299) return 'fas fa-cloud-rain'; // Heavy rain
    if (code >= 302 && code <= 359) return 'fas fa-cloud-showers-heavy'; // Heavy rain
    if (code >= 362 && code <= 374) return 'fas fa-snowflake'; // Snow
    if (code >= 377 && code <= 395) return 'fas fa-snowflake'; // Heavy snow
    
    return 'fas fa-sun'; // Default to sunny
}

// Update weather display elements
function updateWeatherDisplay(weatherData) {
    // Update header weather
    const headerWeatherIcon = document.getElementById('weather-icon');
    const headerWeatherTemp = document.getElementById('weather-temp');
    
    if (headerWeatherIcon && headerWeatherTemp) {
        headerWeatherIcon.className = weatherData.icon;
        headerWeatherTemp.textContent = `${weatherData.temp}°C`;
    }
}

// Simulate weather data (fallback when API fails)
function simulateWeatherData(lat, lon) {
    const weatherConditions = [
        { 
            temp: Math.floor(Math.random() * 15) + 15, // 15-30°C (more realistic for India)
            condition: 'sunny',
            icon: 'fas fa-sun',
            desc: 'Sunny',
            city: 'Your Location'
        },
        { 
            temp: Math.floor(Math.random() * 10) + 18, // 18-28°C
            condition: 'partly cloudy',
            icon: 'fas fa-cloud-sun',
            desc: 'Partly Cloudy',
            city: 'Your Location'
        },
        { 
            temp: Math.floor(Math.random() * 8) + 16, // 16-24°C
            condition: 'cloudy',
            icon: 'fas fa-cloud',
            desc: 'Cloudy',
            city: 'Your Location'
        },
        { 
            temp: Math.floor(Math.random() * 12) + 14, // 14-26°C
            condition: 'rainy',
            icon: 'fas fa-cloud-rain',
            desc: 'Light Rain',
            city: 'Your Location'
        }
    ];
    
    const currentWeather = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
    updateWeatherDisplay(currentWeather);
}

// Generate weather forecast
function generateForecast() {
    const forecastContainer = document.getElementById('weather-forecast');
    if (!forecastContainer) return;
    
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
    const icons = ['fas fa-sun', 'fas fa-cloud-sun', 'fas fa-cloud', 'fas fa-cloud-rain', 'fas fa-sun'];
    
    forecastContainer.innerHTML = '';
    
    days.forEach((day, index) => {
        const temp = Math.floor(Math.random() * 10) + 10; // 10-20°C
        const forecastDay = document.createElement('div');
        forecastDay.className = 'forecast-day';
        forecastDay.innerHTML = `
            <span>${day}</span>
            <i class="${icons[index]}"></i>
            <span>${temp}°</span>
        `;
        forecastContainer.appendChild(forecastDay);
    });
}

// Function to change background color based on section in view
function initSectionBackgroundChanger() {
    const sections = [
        { element: document.querySelector('.news-section'), class: 'news-active' },
        { element: document.querySelector('.sports-section'), class: 'sports-active' },
        { element: document.querySelector('.features-section'), class: 'features-active' }
    ];
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove all section classes
                document.body.classList.remove('news-active', 'sports-active', 'features-active');
                
                // Find which section is in view and add appropriate class
                const section = sections.find(s => s.element === entry.target);
                if (section) {
                    document.body.classList.add(section.class);
                }
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        if (section.element) {
            sectionObserver.observe(section.element);
        }
    });
}

// Article hover effects
function initArticleHoverEffects() {
    const articles = document.querySelectorAll('.news-card, .feature-card');
    
    articles.forEach(article => {
        article.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 15px 30px rgba(0,0,0,0.15)';
        });
        
        article.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        });
    });
}

// Newsletter signup modal
function initNewsletterSignup() {
    // Create modal HTML
    const modalHTML = `
        <div id="newsletter-modal" class="modal" style="display: none;">
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h3>Subscribe to School Herald</h3>
                <p>Get the latest school news delivered to your inbox!</p>
                <form id="newsletter-form">
                    <input type="email" placeholder="Enter your email" required>
                    <button type="submit">Subscribe</button>
                </form>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Add modal styles
    const modalStyles = `
        .modal {
            position: fixed;
            z-index: 2000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.5);
            display: flex;
            justify-content: center;
            align-items: center;
        }
        
        .modal-content {
            background: white;
            padding: 30px;
            border-radius: 12px;
            text-align: center;
            max-width: 400px;
            width: 90%;
            position: relative;
        }
        
        .close-modal {
            position: absolute;
            right: 15px;
            top: 15px;
            font-size: 24px;
            cursor: pointer;
            color: #aaa;
        }
        
        .close-modal:hover {
            color: #000;
        }
        
        #newsletter-form {
            margin-top: 20px;
        }
        
        #newsletter-form input {
            width: 100%;
            padding: 12px;
            margin-bottom: 15px;
            border: 1px solid #ddd;
            border-radius: 6px;
            font-size: 16px;
        }
        
        #newsletter-form button {
            background: #3f51b5;
            color: white;
            padding: 12px 30px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 16px;
            transition: background 0.3s ease;
        }
        
        #newsletter-form button:hover {
            background: #1a237e;
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = modalStyles;
    document.head.appendChild(styleSheet);
    
    // Show modal after 10 seconds
    setTimeout(() => {
        if (!localStorage.getItem('newsletterShown')) {
            document.getElementById('newsletter-modal').style.display = 'flex';
            localStorage.setItem('newsletterShown', 'true');
        }
    }, 10000);
    
    // Close modal functionality
    document.querySelector('.close-modal').addEventListener('click', () => {
        document.getElementById('newsletter-modal').style.display = 'none';
    });
    
    // Form submission
    document.getElementById('newsletter-form').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for subscribing to School Herald!');
        document.getElementById('newsletter-modal').style.display = 'none';
    });
}

// Accessibility improvements
function initAccessibility() {
    // Add keyboard navigation support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            // Close any open modals
            const modal = document.getElementById('newsletter-modal');
            if (modal && modal.style.display === 'flex') {
                modal.style.display = 'none';
            }
        }
    });
    
    // Add skip to content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #3f51b5;
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 0 0 6px 6px;
        z-index: 1000;
        transition: top 0.3s ease;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '0';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main content ID
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        mainContent.id = 'main-content';
    }
}

// Performance monitoring
function initPerformanceMonitoring() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
            }, 0);
        });
    }
}

// Removed animation functions to improve performance and reduce distractions

// Add theme-specific CSS animations
function addThemeAnimations() {
    const themeStyles = `
        @keyframes raceStripe {
            0% { left: -100%; }
            100% { left: 100%; }
        }
        
        @keyframes f1Shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-2px) rotate(-0.5deg); }
            75% { transform: translateX(2px) rotate(0.5deg); }
        }
        
        @keyframes techGlitch {
            0%, 100% { transform: translateX(0); }
            20% { transform: translateX(-2px); }
            40% { transform: translateX(2px); }
            60% { transform: translateX(-1px); }
            80% { transform: translateX(1px); }
        }
        
        @keyframes colorPulse {
            0%, 100% { filter: hue-rotate(0deg) brightness(1); }
            50% { filter: hue-rotate(30deg) brightness(1.2); }
        }
        
        .racing-stripe {
            position: absolute !important;
            top: 0 !important;
            left: -100% !important;
            width: 100% !important;
            height: 100% !important;
            background: linear-gradient(90deg, transparent, rgba(251, 191, 36, 0.3), transparent) !important;
            animation: raceStripe 3s infinite !important;
            pointer-events: none !important;
            z-index: 0 !important;
        }
        
        /* F1 Speed indicators */
        .sports-section .news-card::after {
            content: "🏁";
            position: absolute;
            top: 10px;
            right: 10px;
            font-size: 20px;
            opacity: 0.7;
            animation: speedBlink 2s infinite;
        }
        
        @keyframes speedBlink {
            0%, 50% { opacity: 0.7; }
            51%, 100% { opacity: 0.3; }
        }
        
        /* Tech circuit pattern for news */
        .news-section .news-card::before {
            content: "";
            position: absolute;
            top: 5px;
            left: 5px;
            right: 5px;
            bottom: 5px;
            border: 1px solid rgba(6, 182, 212, 0.2);
            border-radius: 8px;
            pointer-events: none;
        }
        
        /* Creative brush stroke for features */
        .features-section .feature-card::before {
            content: "🎨";
            position: absolute;
            top: 10px;
            right: 10px;
            font-size: 18px;
            opacity: 0.6;
            filter: hue-rotate(45deg);
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = themeStyles;
    document.head.appendChild(styleSheet);
}

// Section visibility animations
function initSectionObserver() {
    const sections = document.querySelectorAll('.news-section, .sports-section, .features-section');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add theme-specific entrance effects
                if (entry.target.classList.contains('sports-section')) {
                    entry.target.style.animation = 'slideInF1 1s ease forwards';
                } else if (entry.target.classList.contains('news-section')) {
                    entry.target.style.animation = 'techFadeIn 1s ease forwards';
                } else if (entry.target.classList.contains('features-section')) {
                    entry.target.style.animation = 'creativeFloat 1s ease forwards';
                }
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}

// Add more F1-specific animations
function addF1Effects() {
    const f1Styles = `
        @keyframes slideInF1 {
            0% {
                opacity: 0;
                transform: translateX(-100px) skewX(10deg);
            }
            100% {
                opacity: 1;
                transform: translateX(0) skewX(0deg);
            }
        }
        
        @keyframes techFadeIn {
            0% {
                opacity: 0;
                transform: scale(0.8) rotateX(20deg);
            }
            100% {
                opacity: 1;
                transform: scale(1) rotateX(0deg);
            }
        }
        
        @keyframes creativeFloat {
            0% {
                opacity: 0;
                transform: translateY(50px) rotate(-5deg);
            }
            100% {
                opacity: 1;
                transform: translateY(0) rotate(0deg);
            }
        }
        
        /* F1 tire track pattern */
        .sports-section::after {
            content: "";
            position: absolute;
            bottom: 10px;
            left: 0;
            right: 0;
            height: 4px;
            background: repeating-linear-gradient(
                90deg,
                #fbbf24 0px,
                #fbbf24 10px,
                transparent 10px,
                transparent 20px
            );
            opacity: 0.5;
        }
    `;
    
    const f1StyleSheet = document.createElement('style');
    f1StyleSheet.textContent = f1Styles;
    document.head.appendChild(f1StyleSheet);
}

// ===== GAMES FUNCTIONALITY =====

// Enhanced Math Quiz functionality
function initMathQuiz() {
    const mathInputs = document.querySelectorAll('.math-input-cell');
    
    mathInputs.forEach((input, index) => {
        input.addEventListener('input', function() {
            // Only allow numbers
            this.value = this.value.replace(/[^0-9]/g, '');
            
            // Auto-move to next input
            if (this.value && index < mathInputs.length - 1) {
                mathInputs[index + 1].focus();
            }
            
            // Reset styling when typing
            this.classList.remove('correct', 'wrong');
        });
        
        input.addEventListener('keydown', function(e) {
            // Handle backspace to move to previous input
            if (e.key === 'Backspace' && this.value === '' && index > 0) {
                mathInputs[index - 1].focus();
            }
            
            // Handle Enter to check answer
            if (e.key === 'Enter') {
                checkMathAnswer();
            }
        });
    });
}

// Enhanced Math Answer Checking
function checkMathAnswer() {
    const mathInputs = document.querySelectorAll('.math-input-cell');
    const resultDiv = document.getElementById('math-result');
    const correctAnswer = '2000';
    
    // Get the entered answer
    let enteredAnswer = '';
    mathInputs.forEach(input => {
        enteredAnswer += input.value;
    });
    
    // Remove leading zeros for comparison
    enteredAnswer = enteredAnswer.replace(/^0+/, '') || '0';
    
    if (enteredAnswer === correctAnswer) {
        // Correct answer
        mathInputs.forEach(input => {
            input.classList.add('correct');
            input.classList.remove('wrong');
        });
        resultDiv.innerHTML = '<span style="color: #4caf50; background: #e8f5e8; padding: 10px; border-radius: 5px; display: inline-block;">✓ Excellent! 100,000W ÷ 50 homes = 2,000W per home</span>';
        
        // Add celebration effect
        celebrateMathSuccess();
        
    } else if (enteredAnswer.length === 4) {
        // Wrong answer with 4 digits
        mathInputs.forEach(input => {
            input.classList.add('wrong');
            input.classList.remove('correct');
        });
        resultDiv.innerHTML = '<span style="color: #f44336; background: #ffeaea; padding: 10px; border-radius: 5px; display: inline-block;">✗ Not quite right. Try again! Remember: 100,000 ÷ 50 = ?</span>';
        
        // Clear after 2 seconds
        setTimeout(() => {
            mathInputs.forEach(input => {
                input.value = '';
                input.classList.remove('wrong');
            });
            mathInputs[0].focus();
        }, 2000);
        
    } else {
        // Incomplete answer
        resultDiv.innerHTML = '<span style="color: #ff9800; background: #fff3e0; padding: 10px; border-radius: 5px; display: inline-block;">⚠ Please fill in all 4 digits</span>';
    }
}

function celebrateMathSuccess() {
    const mathInputs = document.querySelectorAll('.math-input-cell');
    mathInputs.forEach((input, index) => {
        setTimeout(() => {
            input.style.transform = 'scale(1.2) rotate(360deg)';
            setTimeout(() => {
                input.style.transform = 'scale(1)';
            }, 500);
        }, index * 100);
    });
}

// Make checkMathAnswer function global
window.checkMathAnswer = checkMathAnswer;

// Trivia functionality
function checkTrivia() {
    const selectedAnswer = document.querySelector('input[name="trivia"]:checked');
    const resultDiv = document.getElementById('trivia-result');
    
    if (!selectedAnswer) {
        resultDiv.innerHTML = '<span style="color: #ff9800;">Please select an answer!</span>';
        return;
    }
    
    if (selectedAnswer.value === 'correct') {
        resultDiv.innerHTML = '<span style="color: #4caf50;">✓ Correct! Greenspace India, BASIX and CEED collaborated on this project.</span>';
        resultDiv.style.background = '#e8f5e8';
    } else {
        resultDiv.innerHTML = '<span style="color: #f44336;">✗ Incorrect. The correct answer is Greenspace India, BASIX and CEED.</span>';
        resultDiv.style.background = '#ffeaea';
    }
}

// Fixed Word Search functionality
function initWordSearch() {
    const gridCells = document.querySelectorAll('#word-search-grid .grid-row span');
    const words = ['SOLAR', 'ENERGY', 'LIGHT', 'VILLAGE', 'GRID', 'SCIENCE'];
    let firstClick = null;
    let foundWords = [];
    
    // Create grid data structure for easier word finding
    const grid = [
        ['S', 'O', 'L', 'A', 'R', 'X', 'M', 'Q'],
        ['C', 'E', 'N', 'E', 'R', 'G', 'Y', 'W'],
        ['I', 'L', 'I', 'G', 'H', 'T', 'Z', 'E'],
        ['E', 'E', 'V', 'I', 'L', 'L', 'A', 'R'],
        ['N', 'C', 'T', 'R', 'O', 'W', 'G', 'T'],
        ['C', 'T', 'R', 'I', 'C', 'I', 'E', 'Y'],
        ['E', 'R', 'I', 'D', 'S', 'T', 'U', 'D']
    ];
    
    gridCells.forEach((cell) => {
        const row = parseInt(cell.getAttribute('data-row'));
        const col = parseInt(cell.getAttribute('data-col'));
        
        cell.addEventListener('click', function() {
            if (!firstClick) {
                // First click
                firstClick = { cell: this, row: row, col: col };
                this.style.background = '#2196f3';
                this.style.color = 'white';
                this.style.border = '3px solid #1976d2';
                showWordFeedback('Click the last letter of the word...', 'info');
            } else {
                // Second click
                const secondClick = { cell: this, row: row, col: col };
                
                // Find word between first and second click
                const foundWord = findWordBetweenClicks(firstClick, secondClick, grid);
                
                if (foundWord && words.includes(foundWord.word) && !foundWords.includes(foundWord.word)) {
                    // Correct word found
                    highlightCorrectWord(foundWord.cells, '#4caf50');
                    markWordAsFound(foundWord.word);
                    foundWords.push(foundWord.word);
                    showWordFeedback(`Great! Found "${foundWord.word}"`, 'success');
                } else if (foundWord && words.includes(foundWord.reverseWord) && !foundWords.includes(foundWord.reverseWord)) {
                    // Correct word found in reverse
                    highlightCorrectWord(foundWord.cells, '#4caf50');
                    markWordAsFound(foundWord.reverseWord);
                    foundWords.push(foundWord.reverseWord);
                    showWordFeedback(`Great! Found "${foundWord.reverseWord}"`, 'success');
                } else {
                    // Wrong selection
                    highlightCorrectWord([firstClick.cell, this], '#f44336');
                    showWordFeedback('Try again! Look for words in the word bank', 'error');
                    setTimeout(() => {
                        resetCellHighlight(firstClick.cell);
                        resetCellHighlight(this);
                    }, 1000);
                }
                
                firstClick = null;
            }
        });
    });
}

function findWordBetweenClicks(first, second, grid) {
    const rowDiff = second.row - first.row;
    const colDiff = second.col - first.col;
    const steps = Math.max(Math.abs(rowDiff), Math.abs(colDiff));
    
    if (steps === 0) return null;
    
    const rowStep = rowDiff === 0 ? 0 : rowDiff / Math.abs(rowDiff);
    const colStep = colDiff === 0 ? 0 : colDiff / Math.abs(colDiff);
    
    let word = '';
    let cells = [];
    
    for (let i = 0; i <= steps; i++) {
        const currentRow = first.row + (i * rowStep);
        const currentCol = first.col + (i * colStep);
        
        if (currentRow >= 0 && currentRow < 7 && currentCol >= 0 && currentCol < 8) {
            word += grid[currentRow][currentCol];
            const cellSelector = `[data-row="${currentRow}"][data-col="${currentCol}"]`;
            const cell = document.querySelector(cellSelector);
            if (cell) cells.push(cell);
        }
    }
    
    // Check both forward and backward
    const reverseWord = word.split('').reverse().join('');
    return { 
        word: word, 
        reverseWord: reverseWord, 
        cells: cells
    };
}

function highlightCorrectWord(cells, color) {
    cells.forEach(cell => {
        cell.style.background = color;
        cell.style.color = 'white';
        cell.style.border = `3px solid ${color}`;
        cell.style.transform = 'scale(1.1)';
        setTimeout(() => {
            cell.style.transform = 'scale(1)';
        }, 200);
    });
}

function resetCellHighlight(cell) {
    cell.style.background = '#f8f9fa';
    cell.style.color = '#333';
    cell.style.border = '1px solid #dee2e6';
    cell.style.transform = 'scale(1)';
}

function markWordAsFound(word) {
    const wordElement = document.querySelector(`[data-word="${word}"]`);
    if (wordElement) {
        wordElement.style.textDecoration = 'line-through';
        wordElement.style.background = '#4caf50';
        wordElement.style.color = 'white';
    }
}

function showWordFeedback(message, type) {
    const feedbackDiv = document.getElementById('word-search-feedback');
    let color = '#333';
    let background = '#f8f9fa';
    
    if (type === 'success') {
        color = '#4caf50';
        background = '#e8f5e8';
    } else if (type === 'error') {
        color = '#f44336';
        background = '#ffeaea';
    } else if (type === 'info') {
        color = '#2196f3';
        background = '#e3f2fd';
    }
    
    feedbackDiv.innerHTML = `<span style="color: ${color}; background: ${background}; padding: 8px; border-radius: 5px; display: inline-block;">${message}</span>`;
    
    if (type === 'info') {
        setTimeout(() => {
            feedbackDiv.innerHTML = '';
        }, 3000);
    } else {
        setTimeout(() => {
            feedbackDiv.innerHTML = '';
        }, 2000);
    }
}

// Fixed Crossword functionality
function initCrossword() {
    const cells = document.querySelectorAll('#crossword-grid .crossword-cell');
    const answers = {
        'across1': 'SOLAR',
        'down1': 'GRID',
        'down2': 'STUDY'
    };
    
    cells.forEach(cell => {
        cell.addEventListener('input', function() {
            this.value = this.value.toUpperCase();
            
            // Auto-move to next cell in same clue
            const clue = this.getAttribute('data-clue');
            const position = parseInt(this.getAttribute('data-position'));
            const nextCell = document.querySelector(`[data-clue="${clue}"][data-position="${position + 1}"]`);
            
            if (this.value && nextCell) {
                nextCell.focus();
            }
            
            // Check completion
            checkCrosswordCompletion();
        });
        
        cell.addEventListener('keydown', function(e) {
            const clue = this.getAttribute('data-clue');
            const position = parseInt(this.getAttribute('data-position'));
            
            if (e.key === 'Backspace' && this.value === '') {
                // Move to previous cell in same clue
                const prevCell = document.querySelector(`[data-clue="${clue}"][data-position="${position - 1}"]`);
                if (prevCell) {
                    prevCell.focus();
                }
            } else if (e.key === 'ArrowRight') {
                const nextCell = document.querySelector(`[data-clue="${clue}"][data-position="${position + 1}"]`);
                if (nextCell) nextCell.focus();
            } else if (e.key === 'ArrowLeft') {
                const prevCell = document.querySelector(`[data-clue="${clue}"][data-position="${position - 1}"]`);
                if (prevCell) prevCell.focus();
            }
        });
    });
}

function checkCrosswordCompletion() {
    const answers = {
        'across1': 'SOLAR',
        'down1': 'GRID',
        'down2': 'STUDY'
    };
    
    const feedbackDiv = document.getElementById('crossword-feedback');
    let allCorrect = true;
    let completedClues = 0;
    
    // Check each clue
    Object.keys(answers).forEach(clue => {
        const cells = document.querySelectorAll(`[data-clue="${clue}"]`);
        let currentWord = '';
        
        cells.forEach(cell => {
            currentWord += cell.value;
        });
        
        if (currentWord === answers[clue]) {
            // Correct word
            cells.forEach(cell => {
                cell.style.background = '#4caf50';
                cell.style.color = 'white';
                cell.style.border = '3px solid #4caf50';
            });
            completedClues++;
        } else if (currentWord.length === answers[clue].length) {
            // Wrong word (complete but incorrect)
            cells.forEach(cell => {
                cell.style.background = '#f44336';
                cell.style.color = 'white';
                cell.style.border = '3px solid #f44336';
            });
            allCorrect = false;
        } else {
            // Incomplete word
            cells.forEach(cell => {
                cell.style.background = 'white';
                cell.style.color = '#333';
                cell.style.border = '2px solid #333';
            });
            if (currentWord.length > 0) allCorrect = false;
        }
    });
    
    // Show feedback
    if (completedClues === 3) {
        feedbackDiv.innerHTML = '<span style="color: #4caf50; background: #e8f5e8; padding: 10px; border-radius: 5px; display: inline-block;">🎉 Congratulations! You completed the crossword!</span>';
    } else if (completedClues > 0) {
        feedbackDiv.innerHTML = `<span style="color: #2196f3; background: #e3f2fd; padding: 8px; border-radius: 5px; display: inline-block;">Great! ${completedClues} out of 3 words correct!</span>`;
    } else {
        feedbackDiv.innerHTML = '';
    }
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    updateDate();
    initMobileNav();
    initSmoothScrolling();
    initActiveNavigation();
    initImageLoading();
    addReadingTime();
    initNewsletterSignup();
    initAccessibility();
    initPerformanceMonitoring();
    initHeroArticleClick();
    initModal();
    initGames();
    
    // Initialize weather and background color changes
    initWeather();
    initSectionBackgroundChanger();
    
    // Initialize games
    initGames();
    
    // Update date every minute
    setInterval(updateDate, 60000);
    
    // Update weather every 30 minutes
    setInterval(initWeather, 1800000);
});

// Handle window resize
window.addEventListener('resize', function() {
    // Close mobile menu on resize
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    
    if (window.innerWidth > 768) {
        if (navMenu) navMenu.classList.remove('active');
        if (hamburger) hamburger.classList.remove('active');
    }
});

// Service Worker registration for offline support (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

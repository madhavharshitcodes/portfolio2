document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking a nav link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Sticky Header
    window.addEventListener('scroll', function() {
        const header = document.getElementById('header');
        if (window.scrollY > 100) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // Back to top button
    const backToTopButton = document.createElement('a');
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopButton.className = 'back-to-top';
    document.body.appendChild(backToTopButton);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 700) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Stats Counter Animation
    function startCounter() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000; // 2 seconds
            const step = target / (duration / 16); // 60fps
            let current = 0;
            
            const updateCount = () => {
                current += step;
                if (current < target) {
                    stat.textContent = Math.floor(current);
                    requestAnimationFrame(updateCount);
                } else {
                    stat.textContent = target;
                }
            };
            
            updateCount();
        });
    }

    // Use Intersection Observer to trigger the counter when the section is visible
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startCounter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(aboutSection);
    }

    // Projects Slider
    const projectsSlider = document.getElementById('projects-slider');
    const sliderDots = document.querySelector('.slider-dots');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (projectsSlider) {
        const slides = projectsSlider.querySelectorAll('.project-slide');
        let currentIndex = 0;
        
        // Create dots based on number of slides
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = 'dot';
            if (index === 0) dot.classList.add('active');
            
            dot.addEventListener('click', () => {
                goToSlide(index);
            });
            
            sliderDots.appendChild(dot);
        });
        
        // Initialize slider
        function initSlider() {
            slides.forEach((slide, index) => {
                if (index === 0) {
                    slide.classList.add('active');
                } else {
                    slide.classList.remove('active');
                }
            });
        }
        
        // Go to specific slide
        function goToSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            slides[index].classList.add('active');
            
            const dots = sliderDots.querySelectorAll('.dot');
            dots.forEach(dot => dot.classList.remove('active'));
            dots[index].classList.add('active');
            
            currentIndex = index;
        }
        
        // Next slide
        function nextSlide() {
            currentIndex = (currentIndex + 1) % slides.length;
            goToSlide(currentIndex);
        }
        
        // Previous slide
        function prevSlide() {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            goToSlide(currentIndex);
        }
        
        // Event listeners for controls
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);
        
        // Auto slide
        let slideInterval = setInterval(nextSlide, 5000);
        
        // Pause auto slide on hover
        projectsSlider.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        projectsSlider.addEventListener('mouseleave', () => {
            slideInterval = setInterval(nextSlide, 5000);
        });
        
        // Initialize slider
        initSlider();
    }

    // Publications Filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const publicationCards = document.querySelectorAll('.publication-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Toggle active class
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter publications
            publicationCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category').includes(filter)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Form Submission Handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const formValues = Object.fromEntries(formData.entries());
            
            // Here you would typically send the data to a server
            // For now, let's simulate a submission with a timeout
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            
            setTimeout(() => {
                // Display success message
                const successMessage = document.createElement('div');
                successMessage.className = 'form-success-message';
                successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Your message has been sent successfully!';
                successMessage.style.cssText = `
                    background-color: #27ae60;
                    color: white;
                    padding: 15px;
                    border-radius: 4px;
                    margin-top: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    font-weight: 500;
                `;
                
                contactForm.appendChild(successMessage);
                
                // Reset form
                contactForm.reset();
                submitButton.disabled = false;
                submitButton.textContent = originalText;
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            }, 1500);
        });
    }

    // Newsletter Form
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const submitButton = newsletterForm.querySelector('button');
            const originalText = submitButton.textContent;
            
            submitButton.disabled = true;
            submitButton.textContent = 'Subscribing...';
            
            setTimeout(() => {
                const successMessage = document.createElement('div');
                successMessage.className = 'newsletter-success';
                successMessage.innerHTML = 'Thank you for subscribing!';
                successMessage.style.cssText = `
                    color: #2ecc71;
                    margin-top: 10px;
                    font-weight: 500;
                `;
                
                newsletterForm.appendChild(successMessage);
                
                newsletterForm.reset();
                submitButton.disabled = false;
                submitButton.textContent = originalText;
                
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            }, 1000);
        });
    }

    // Add animation classes to elements
    function addAnimations() {
        const animatedElements = document.querySelectorAll('.research-card, .stat-item, .publication-card, .team-member');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    entry.target.classList.add(`fade-in-delay-${index % 3 + 1}`);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }
    
    addAnimations();

    // Hero SVG Animation
    function createHeroAnimation() {
        const heroAnimation = document.getElementById('hero-animation');
        if (!heroAnimation) return;
        
        // Create SVG elements programmatically for solar/renewable energy theme
        const svgNS = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(svgNS, "svg");
        svg.setAttribute("width", "100%");
        svg.setAttribute("height", "100%");
        svg.setAttribute("viewBox", "0 0 1000 500");
        
        // Add solar panels, wind turbines, etc.
        for (let i = 0; i < 10; i++) {
            // Solar panels
            const solarPanel = document.createElementNS(svgNS, "rect");
            const x = Math.random() * 900 + 50;
            const y = Math.random() * 400 + 50;
            
            solarPanel.setAttribute("x", x);
            solarPanel.setAttribute("y", y);
            solarPanel.setAttribute("width", "40");
            solarPanel.setAttribute("height", "40");
            solarPanel.setAttribute("fill", "none");
            solarPanel.setAttribute("stroke", "#27ae60");
            solarPanel.setAttribute("stroke-width", "2");
            solarPanel.setAttribute("opacity", "0.5");
            
            svg.appendChild(solarPanel);
            
            // Grid lines
            const gridLine = document.createElementNS(svgNS, "line");
            gridLine.setAttribute("x1", x + 20);
            gridLine.setAttribute("y1", y + 40);
            gridLine.setAttribute("x2", x + 20);
            gridLine.setAttribute("y2", y + 60);
            gridLine.setAttribute("stroke", "#1a6e9c");
            gridLine.setAttribute("stroke-width", "1");
            gridLine.setAttribute("opacity", "0.3");
            
            svg.appendChild(gridLine);
            
            // Energy dots
            for (let j = 0; j < 3; j++) {
                const dot = document.createElementNS(svgNS, "circle");
                dot.setAttribute("cx", x + 20);
                dot.setAttribute("cy", y + 60 + j * 10);
                dot.setAttribute("r", "2");
                dot.setAttribute("fill", "#f39c12");
                dot.setAttribute("class", "energy-dot");
                
                svg.appendChild(dot);
                
                // Animate the energy dots
                const animate = document.createElementNS(svgNS, "animate");
                animate.setAttribute("attributeName", "opacity");
                animate.setAttribute("values", "0;1;0");
                animate.setAttribute("dur", "2s");
                animate.setAttribute("begin", `${j * 0.5 + Math.random()}s`);
                animate.setAttribute("repeatCount", "indefinite");
                
                dot.appendChild(animate);
            }
        }
        
        heroAnimation.appendChild(svg);
    }
    
    createHeroAnimation();
});
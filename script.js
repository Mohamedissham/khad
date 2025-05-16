   document.addEventListener('DOMContentLoaded', function() {
            // Initialize AOS animation library
            AOS.init({
                duration: 800,
                easing: 'ease-in-out',
                once: false,
                mirror: true
            });

            // Mobile menu toggle functionality
            const mobileMenuBtn = document.getElementById('mobileMenuBtn');
            const navLinks = document.getElementById('navLinks');
            const header = document.getElementById('header');
            const body = document.body;

            mobileMenuBtn.addEventListener('click', function() {
                navLinks.classList.toggle('active');
                body.classList.toggle('menu-open');
                const icon = this.querySelector('i');
                
                // Toggle between bars and times icons
                if (icon.classList.contains('fa-bars')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });

            // Close mobile menu when clicking a link
            document.querySelectorAll('#navLinks a').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                    body.classList.remove('menu-open');
                    mobileMenuBtn.querySelector('i').classList.remove('fa-times');
                    mobileMenuBtn.querySelector('i').classList.add('fa-bars');
                });
            });

            // Header scroll effect
            window.addEventListener('scroll', function() {
                if (window.scrollY > 100) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            });

            // Smooth scrolling for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    const target = document.querySelector(targetId);
                    if (target) {
                        const headerHeight = header.offsetHeight;
                        const targetPosition = target.offsetTop - headerHeight;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                });
            });

            // Counter animation
            const counters = document.querySelectorAll('.counter');
            
            const animateCounter = (counter) => {
                const target = +counter.getAttribute('data-target');
                const speed = 200; // lower is faster
                const increment = target / speed;

                const updateCount = () => {
                    const current = +counter.innerText;
                    if (current < target) {
                        counter.innerText = Math.ceil(current + increment);
                        requestAnimationFrame(updateCount);
                    } else {
                        counter.innerText = target;
                    }
                };

                updateCount();
            };

            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateCounter(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.7 });

            counters.forEach(counter => {
                observer.observe(counter);
            });

            // Responsive navigation on window resize
            function handleResize() {
                if (window.innerWidth > 768) {
                    navLinks.classList.remove('active');
                    body.classList.remove('menu-open');
                    mobileMenuBtn.querySelector('i').classList.remove('fa-times');
                    mobileMenuBtn.querySelector('i').classList.add('fa-bars');
                }
            }

            window.addEventListener('resize', handleResize);

            // Add hover effects to circle images
            document.querySelectorAll('.circle-img').forEach(img => {
                img.addEventListener('mouseenter', () => {
                    img.style.transform = `${img.style.transform || ''} scale(1.1) rotate(5deg)`;
                    img.style.zIndex = '3';
                });
                
                img.addEventListener('mouseleave', () => {
                    // Reset to original transform from CSS
                    const index = Array.from(img.parentNode.children).indexOf(img) + 1;
                    const transforms = [
                        'translateY(-20px)',
                        'translateY(30px)',
                        'translateY(-10px)',
                        'translateY(40px)',
                        'translateY(-30px)',
                        'translateY(20px)',
                        'translateY(-15px)',
                        'translateY(25px)',
                        'translateY(-25px)',
                        'translateY(15px)'
                    ];
                    img.style.transform = transforms[index - 1] || '';
                    img.style.zIndex = '1';
                });
            });

            // Prevent zooming on mobile devices
            document.addEventListener('gesturestart', function(e) {
                e.preventDefault();
            });

            // iOS specific fixes
            if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
                document.addEventListener('touchmove', function(e) {
                    if (e.scale !== 1) {
                        e.preventDefault();
                    }
                }, { passive: false });

                // Fix for iOS viewport height
                function setVh() {
                    let vh = window.innerHeight * 0.01;
                    document.documentElement.style.setProperty('--vh', `${vh}px`);
                }

                setVh();
                window.addEventListener('resize', setVh);
            }
        });
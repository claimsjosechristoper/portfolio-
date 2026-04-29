document.addEventListener('DOMContentLoaded', () => {
    // 1. Mouse Parallax for Background
    const bgEffects = document.getElementById('bg-effects');
    const bgLines = document.querySelector('.bg-lines');
    
    if (bgEffects && bgLines) {
        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 20; // Max 20px movement
            const y = (e.clientY / window.innerHeight - 0.5) * 20;
            
            // Translate the background lines opposite to mouse movement
            bgLines.style.transform = `translate(${-x}px, ${-y}px)`;
        });
    }

    // 2. 3D Tilt Effect for Hero Mockup Window
    const heroVisual = document.querySelector('.hero-visual');
    const mockupWindow = document.querySelector('.mockup-window');
    
    if (heroVisual && mockupWindow) {
        mockupWindow.style.transition = 'transform 0.1s ease-out, box-shadow 0.1s ease-out';
        
        heroVisual.addEventListener('mousemove', (e) => {
            const rect = heroVisual.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const mouseX = e.clientX - centerX;
            const mouseY = e.clientY - centerY;
            
            const rotateX = -(mouseY / (rect.height / 2)) * 6;
            const rotateY = (mouseX / (rect.width / 2)) * 6;
            
            mockupWindow.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            mockupWindow.style.boxShadow = `${-rotateY * 2}px ${rotateX * 2 + 30}px 60px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255,255,255,0.05)`;
        });

        heroVisual.addEventListener('mouseleave', () => {
            mockupWindow.style.transition = 'transform 0.5s ease-out, box-shadow 0.5s ease-out';
            mockupWindow.style.transform = `rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            mockupWindow.style.boxShadow = `0 30px 60px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255,255,255,0.05)`;
            
            setTimeout(() => {
                mockupWindow.style.transition = 'transform 0.1s ease-out, box-shadow 0.1s ease-out';
            }, 500);
        });
    }

    // 3. Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: Stop observing once revealed if you don't want it to repeat
                // observer.unobserve(entry.target); 
            } else {
                // Remove class when scrolling up to allow animation to replay
                entry.target.classList.remove('active');
            }
        });
    };

    const revealOptions = {
        threshold: 0.15, // Trigger when 15% of the element is visible
        rootMargin: "0px 0px -50px 0px" // Offset so it triggers a bit earlier
    };

    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);
    
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // 4. Interactive Sidebar Menu Hover
    const menuItems = document.querySelectorAll('.menu-group li');
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            menuItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            
            // Move the 'You' cursor to the active item
            const greenCursor = document.querySelector('.cursor-pointer.green');
            if (greenCursor) {
                item.appendChild(greenCursor);
            }
        });
    });

    // Smooth scrolling for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 5. Typewriter Effect
    const phrases = ["Cybersecurity Enthusiast", "SOC Analyst", "Ethical Hacker", "Threat Hunter"];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typewriterElement = document.getElementById('typewriter');
    
    function typeEffect() {
        if (!typewriterElement) return;
        
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentPhrase.length) {
            typeSpeed = 2000; // Pause at the end of word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500; // Pause before typing next word
        }
        
        setTimeout(typeEffect, typeSpeed);
    }
    
    if (typewriterElement) {
        setTimeout(typeEffect, 1000);
    }

    // 6. Magnetic Element Hover Effect
    const magneticElements = document.querySelectorAll('.magnetic-element');
    
    document.addEventListener('mousemove', (e) => {
        magneticElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            // Calculate center ignoring current transform
            const centerX = rect.left - (parseFloat(el.style.transform.split('translate(')[1]) || 0) + rect.width / 2;
            const centerY = rect.top - (parseFloat(el.style.transform.split(', ')[1]) || 0) + rect.height / 2;
            
            const distanceX = e.clientX - centerX;
            const distanceY = e.clientY - centerY;
            const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
            
            if (distance < 250) { // Trigger distance
                const pullFactor = Math.pow((250 - distance) / 250, 1.5); // Smoother ease
                const maxMove = 25; 
                
                const moveX = (distanceX / distance) * pullFactor * maxMove;
                const moveY = (distanceY / distance) * pullFactor * maxMove;
                
                el.style.transform = `translate(${moveX}px, ${moveY}px)`;
            } else {
                el.style.transform = `translate(0px, 0px)`;
            }
        });
    });

    // 7. Mouse Glow Blur Animation
    const mouseGlow = document.querySelector('.mouse-glow');
    if (mouseGlow) {
        document.addEventListener('mousemove', (e) => {
            // Use requestAnimationFrame for smoother performance
            requestAnimationFrame(() => {
                mouseGlow.style.left = `${e.clientX}px`;
                mouseGlow.style.top = `${e.clientY}px`;
            });
        });
    }
});

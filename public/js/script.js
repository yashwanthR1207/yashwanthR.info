// ============================================
// CUSTOM CURSOR (desktop only)
// ============================================
const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

let cursor, cursorDot;

if (!isTouchDevice) {
    cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);

    cursorDot = document.createElement('div');
    cursorDot.classList.add('custom-cursor-dot');
    document.body.appendChild(cursorDot);

    document.addEventListener('mousemove', (e) => {
        requestAnimationFrame(() => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
            cursorDot.style.left = `${e.clientX}px`;
            cursorDot.style.top = `${e.clientY}px`;
        });
    });

    const interactives = document.querySelectorAll('a, button, input, textarea');
    interactives.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });

    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        cursorDot.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        cursorDot.style.opacity = '1';
    });
}


// ============================================
// HOME PAGE — Hero Animation Sequence
// ============================================
const heroGreeting = document.getElementById('hero-greeting');
const heroName = document.getElementById('hero-name');
const heroDivider = document.getElementById('hero-divider');
const heroRoles = document.getElementById('hero-roles');
const heroDesc = document.getElementById('hero-desc');
const heroActions = document.getElementById('hero-actions');
const heroStats = document.getElementById('hero-stats');
const heroStatus = document.getElementById('hero-status');
const heroCoords = document.getElementById('hero-coords');
const scrollIndicator = document.getElementById('scroll-indicator');

if (heroGreeting && heroName) {
    
    // Typewriter with cursor
    const typeWriter = (element, text, speed = 40) => {
        return new Promise(resolve => {
            let i = 0;
            element.innerHTML = '';
            const interval = setInterval(() => {
                if (i < text.length) {
                    element.innerHTML = text.substring(0, i + 1) + '<span class="blink-cursor"></span>';
                    i++;
                } else {
                    clearInterval(interval);
                    element.innerHTML = text + '<span class="blink-cursor"></span>'; // keep cursor after typing
                    resolve();
                }
            }, speed);
        });
    };


    // Animate element in
    const animateIn = (el, delay = 0) => {
        return new Promise(resolve => {
            setTimeout(() => {
                el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
                resolve();
            }, delay);
        });
    };

    // Counter animation
    const animateCounter = (el, target, duration = 1200) => {
        const start = 0;
        const startTime = performance.now();
        const step = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(start + (target - start) * eased) + '+';
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };
        requestAnimationFrame(step);
    };

    
    // Main sequence
    const runHeroAnimation = async () => {
        // Step 1: Type greeting (400ms after page load)
        await new Promise(r => setTimeout(r, 400));
        await typeWriter(heroGreeting, '> System initialized... Hello, I\'m', 35);

        // Step 2: Reveal name with perfect typing animation
        await new Promise(r => setTimeout(r, 100));
        const nameEl = heroName;
        nameEl.style.transition = 'opacity 0.8s cubic-bezier(0.25, 0.8, 0.25, 1), transform 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)';
        nameEl.style.opacity = '1';
        nameEl.style.transform = 'translateY(0)';

        // Type out the name perfectly to match the aesthetic
        await new Promise(resolve => {
            let text1 = 'YASHWANTH';
            let text2 = 'R.';
            let i = 0;
            nameEl.innerHTML = '';
            const interval = setInterval(() => {
                if (i < text1.length) {
                    nameEl.innerHTML = text1.substring(0, i + 1) + '<br><span class="accent"></span>';
                } else if (i < text1.length + text2.length) {
                    nameEl.innerHTML = text1 + '<br><span class="accent">' + text2.substring(0, i - text1.length + 1) + '</span>';
                } else {
                    clearInterval(interval);
                    resolve();
                }
                i++;
            }, 70); // perfect typing speed
        });

        // Step 3: Divider scale in
        await new Promise(r => setTimeout(r, 100));
        heroDivider.style.transition = 'opacity 0.6s cubic-bezier(0.25, 0.8, 0.25, 1), transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)';
        heroDivider.style.opacity = '1';
        heroDivider.style.transform = 'scaleX(1)';

        // Step 4: Role tags — stagger each tag
        await new Promise(r => setTimeout(r, 100));
        heroRoles.style.transition = 'opacity 0.1s';
        heroRoles.style.opacity = '1';
        heroRoles.style.transform = 'translateY(0)';
        
        // Stagger individual tags
        const tags = heroRoles.querySelectorAll('.role-tag');
        tags.forEach((tag, i) => {
            tag.style.opacity = '0';
            tag.style.transform = 'translateY(10px)';
            setTimeout(() => {
                tag.style.transition = 'opacity 0.5s cubic-bezier(0.25, 0.8, 0.25, 1), transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1), background 0.3s, color 0.3s';
                tag.style.opacity = '1';
                tag.style.transform = 'translateY(0)';
            }, i * 100); // Perfect stagger timing
        });

        // Step 5: Description
        await new Promise(r => setTimeout(r, 200 + tags.length * 100));
        heroDesc.style.transition = 'opacity 0.8s cubic-bezier(0.25, 0.8, 0.25, 1), transform 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)';
        heroDesc.style.opacity = '1';
        heroDesc.style.transform = 'translateY(0)';

        // Step 6: Action buttons
        await new Promise(r => setTimeout(r, 200));
        heroActions.style.transition = 'opacity 0.8s cubic-bezier(0.25, 0.8, 0.25, 1), transform 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)';
        heroActions.style.opacity = '1';
        heroActions.style.transform = 'translateY(0)';

        // Step 7: Stats with counters
        await new Promise(r => setTimeout(r, 200));
        heroStats.style.transition = 'opacity 0.8s cubic-bezier(0.25, 0.8, 0.25, 1), transform 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)';
        heroStats.style.opacity = '1';
        heroStats.style.transform = 'translateY(0)';
        
        // Animate counter values
        const statProjects = document.getElementById('stat-projects');
        const statCerts = document.getElementById('stat-certs');
        const statTech = document.getElementById('stat-tech');
        if (statProjects) animateCounter(statProjects, 10, 1500);
        if (statCerts) setTimeout(() => animateCounter(statCerts, 5, 1200), 200);
        if (statTech) setTimeout(() => animateCounter(statTech, 15, 1400), 400);

        // Step 8: Status bar & decorative elements
        await new Promise(r => setTimeout(r, 300));
        if (heroStatus) {
            heroStatus.style.transition = 'opacity 0.8s ease';
            heroStatus.style.opacity = '1';
        }
        if (heroCoords) {
            heroCoords.style.transition = 'opacity 1.5s ease';
            heroCoords.style.opacity = '1';
        }
        if (scrollIndicator) {
            scrollIndicator.style.transition = 'opacity 1s ease';
            scrollIndicator.style.opacity = '0.5';
        }
        
        // Step 9: Hero image / ID card
        const heroImg = document.getElementById('hero-image');
        if (heroImg) {
            heroImg.style.transition = 'opacity 1s ease';
            heroImg.style.opacity = '1';
        }
    };

    runHeroAnimation();
}


// ============================================
// OLD INDEX PAGE SUPPORT (backward compat)
// ============================================
const sysInit = document.getElementById('sys-init');
const sysHello = document.getElementById('sys-hello');
const sysName = document.getElementById('sys-name');
const sysFades = document.querySelectorAll('.sys-fade');

if (sysInit && sysHello && sysName) {
    const initText = "System initialized...";
    const helloText = "Hello, I'm";
    const nameText = "YASHWANTH R.";
    
    const typeWriterLegacy = (element, text, speed, callback) => {
        let i = 0;
        element.innerHTML = "";
        const interval = setInterval(() => {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
            } else {
                clearInterval(interval);
                if (callback) callback();
            }
        }, speed);
    };

    setTimeout(() => {
        typeWriterLegacy(sysInit, initText, 50, () => {
            sysInit.innerHTML = initText + '<span class="blink-cursor">_</span>';
            setTimeout(() => {
                sysInit.innerHTML = initText;
                typeWriterLegacy(sysHello, helloText, 50, () => {
                    setTimeout(() => {
                        sysName.style.opacity = 1;
                        const finalHtml = `YASHWANTH <span style="color: var(--accent-color)">R.</span>`;
                        typeWriterLegacy(sysName, nameText, 50, () => {
                            sysName.innerHTML = finalHtml;
                            sysFades.forEach((el, index) => {
                                setTimeout(() => {
                                    el.style.transition = "opacity 0.8s ease";
                                    el.style.opacity = 1;
                                }, index * 150);
                            });
                        });
                    }, 300);
                });
            }, 2000);
        });
    }, 500);
}


// ============================================
// SINGLE PAGE SCROLL & ANIMATION LOGIC
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Intersection Observer for fading in sections
    const sections = document.querySelectorAll('.page-section');
    
    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: stop observing once it's visible if we only want it to animate once
                // observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.15, // Trigger when 15% of the section is visible
        rootMargin: "-50px 0px"
    });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // 2. Scroll Spy for Navigation Links
    const navLinks = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // 3. Scroll to Top Button
    const scrollTopBtn = document.getElementById('scroll-top-btn');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 500) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        });
        
        // Ensure cursor interacts properly with the new button
        if (cursor) {
            scrollTopBtn.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            scrollTopBtn.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        }
    }

    // 4. Hamburger Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinksContainer = document.getElementById('nav-links');

    if (hamburger && navLinksContainer) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinksContainer.classList.toggle('mobile-open');
            // Prevent body scroll when menu is open
            document.body.style.overflow = navLinksContainer.classList.contains('mobile-open') ? 'hidden' : '';
        });

        // Close menu when a nav link is clicked
        navLinksContainer.addEventListener('click', (e) => {
            if (e.target.tagName === 'A' || e.target.closest('a')) {
                hamburger.classList.remove('active');
                navLinksContainer.classList.remove('mobile-open');
                document.body.style.overflow = '';
            }
        });
    }
});

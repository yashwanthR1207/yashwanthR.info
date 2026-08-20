// ============================================
// CUSTOM CURSOR
// ============================================
const cursor = document.createElement('div');
cursor.classList.add('custom-cursor');
document.body.appendChild(cursor);

const cursorDot = document.createElement('div');
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
                    element.innerHTML = text.substring(0, i + 1) + '<span class="blink-cursor">_</span>';
                    i++;
                } else {
                    clearInterval(interval);
                    element.innerHTML = text;
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

        // Step 2: Reveal name with scramble
        await new Promise(r => setTimeout(r, 200));
        const nameEl = heroName;
        nameEl.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        nameEl.style.opacity = '1';
        nameEl.style.transform = 'translateY(0)';

        // Scramble effect on name
        const nameRaw = 'YASHWANTH';
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%';
        let iterations = 0;
        const nameSpan = nameEl.querySelector('.accent') ? null : nameEl;
        
        await new Promise(resolve => {
            const interval = setInterval(() => {
                const scrambled = nameRaw.split('').map((letter, index) => {
                    if (index < iterations) return nameRaw[index];
                    return letters[Math.floor(Math.random() * letters.length)];
                }).join('');
                
                nameEl.innerHTML = scrambled + '<br><span class="accent">R.</span>';
                
                if (iterations >= nameRaw.length) {
                    clearInterval(interval);
                    nameEl.innerHTML = 'Yashwanth<br><span class="accent">R.</span>';
                    resolve();
                }
                iterations += 1 / 2;
            }, 30);
        });

        // Step 3: Divider scale in
        await new Promise(r => setTimeout(r, 150));
        heroDivider.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        heroDivider.style.opacity = '1';
        heroDivider.style.transform = 'scaleX(1)';

        // Step 4: Role tags — stagger each tag
        await new Promise(r => setTimeout(r, 200));
        heroRoles.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        heroRoles.style.opacity = '1';
        heroRoles.style.transform = 'translateY(0)';
        
        // Stagger individual tags
        const tags = heroRoles.querySelectorAll('.role-tag');
        tags.forEach((tag, i) => {
            tag.style.opacity = '0';
            tag.style.transform = 'translateY(8px)';
            setTimeout(() => {
                tag.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                tag.style.opacity = '1';
                tag.style.transform = 'translateY(0)';
            }, i * 80);
        });

        // Step 5: Description
        await new Promise(r => setTimeout(r, 300));
        await animateIn(heroDesc);

        // Step 6: Action buttons
        await new Promise(r => setTimeout(r, 200));
        await animateIn(heroActions);

        // Step 7: Stats with counters
        await new Promise(r => setTimeout(r, 300));
        heroStats.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
        heroStats.style.opacity = '1';
        heroStats.style.transform = 'translateY(0)';
        
        // Animate counter values
        const statProjects = document.getElementById('stat-projects');
        const statCerts = document.getElementById('stat-certs');
        const statTech = document.getElementById('stat-tech');
        if (statProjects) animateCounter(statProjects, 10, 1500);
        if (statCerts) animateCounter(statCerts, 6, 1200);
        if (statTech) animateCounter(statTech, 15, 1400);

        // Step 8: Status bar & decorative elements
        await new Promise(r => setTimeout(r, 200));
        if (heroStatus) {
            heroStatus.style.transition = 'opacity 0.6s ease';
            heroStatus.style.opacity = '1';
        }
        if (heroCoords) {
            heroCoords.style.transition = 'opacity 1s ease';
            heroCoords.style.opacity = '1';
        }
        if (scrollIndicator) {
            scrollIndicator.style.transition = 'opacity 1s ease';
            scrollIndicator.style.opacity = '0.5';
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

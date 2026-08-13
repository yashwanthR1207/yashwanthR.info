const cursor = document.createElement('div');
cursor.classList.add('custom-cursor');
document.body.appendChild(cursor);

const cursorDot = document.createElement('div');
cursorDot.classList.add('custom-cursor-dot');
document.body.appendChild(cursorDot);

document.addEventListener('mousemove', (e) => {
    // Request animation frame for smoother animation
    requestAnimationFrame(() => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
        
        cursorDot.style.left = `${e.clientX}px`;
        cursorDot.style.top = `${e.clientY}px`;
    });
});

// Add hover effect to interactive elements
const interactives = document.querySelectorAll('a, button, input, textarea');
interactives.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

// Optional: Hide cursor when mouse leaves the window
document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    cursorDot.style.opacity = '0';
});

document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
    cursorDot.style.opacity = '1';
});

// End of script

// Typing and Scramble Effect for Index Page
const sysInit = document.getElementById('sys-init');
const sysHello = document.getElementById('sys-hello');
const sysName = document.getElementById('sys-name');
const sysFades = document.querySelectorAll('.sys-fade');

if (sysInit && sysHello && sysName) {
    const initText = "System initialized...";
    const helloText = "Hello, I'm";
    const nameText = "YASHWANTH R.";
    
    // Typewriter effect function
    const typeWriter = (element, text, speed, callback) => {
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

    // Hacker Scramble effect function
    const scrambleText = (element, finalHtml, rawText, speed, callback) => {
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()";
        let iterations = 0;
        element.style.opacity = 1;
        
        const interval = setInterval(() => {
            element.innerText = rawText.split("").map((letter, index) => {
                if(index < iterations) {
                    return rawText[index];
                }
                return letters[Math.floor(Math.random() * 36)];
            }).join("");
            
            if(iterations >= rawText.length){
                clearInterval(interval);
                element.innerHTML = finalHtml;
                if (callback) callback();
            }
            
            iterations += 1/3;
        }, speed);
    };

    // Animation Sequence
    setTimeout(() => {
        // Step 1: Type system initialized
        typeWriter(sysInit, initText, 50, () => {
            
            // Add blinking cursor effect during the 2s delay
            sysInit.innerHTML = initText + '<span class="blink-cursor">_</span>';
            const style = document.createElement('style');
            style.innerHTML = `
                @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
                .blink-cursor { animation: blink 0.8s infinite; }
            `;
            document.head.appendChild(style);

            // Step 2: Wait 2 seconds
            setTimeout(() => {
                // Remove blinking cursor
                sysInit.innerHTML = initText;

                // Step 3: Type Hello
                typeWriter(sysHello, helloText, 50, () => {
                    
                    // Step 4: Type Name instead of Scramble
                    setTimeout(() => {
                        sysName.style.opacity = 1;
                        const finalHtml = `YASHWANTH <span style="color: var(--accent-color)">R.</span>`;
                        typeWriter(sysName, nameText, 50, () => {
                            sysName.innerHTML = finalHtml;
                            // Step 5: Fade in everything else
                            sysFades.forEach((el, index) => {
                                setTimeout(() => {
                                    el.style.transition = "opacity 0.8s ease";
                                    el.style.opacity = 1;
                                }, index * 150);
                            });
                            
                        });
                    }, 300); // brief pause before name typing
                });
            }, 2000); // 2 second delay
        });
    }, 500); // Initial start delay
}

import re

with open('public/index.html', 'r') as f:
    content = f.read()

# Add Devicon
devicon_link = '<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />'
if 'devicon.min.css' not in content:
    content = content.replace('<link rel="stylesheet" href="css/style.css?v=1.1">', f'{devicon_link}\n    <link rel="stylesheet" href="css/style.css?v=1.1">')

# New skills grid HTML
new_skills_grid = """<div class="skills-grid">
                
                <div class="bp-card skill-card">
                    <i class="devicon-c-plain colored animated-logo" style="font-size: 3rem;"></i>
                    <span>Embedded C</span>
                </div>
                
                <div class="bp-card skill-card">
                    <i class="devicon-arduino-plain colored animated-logo" style="font-size: 3rem;"></i>
                    <span>Arduino & ESP32</span>
                </div>
                
                <div class="bp-card skill-card">
                    <!-- Custom IoT SVG if no devicon -->
                    <svg class="animated-logo" style="width: 3rem; height: 3rem; color: #00d8ff;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"></path><path d="M1.42 9a16 16 0 0 1 21.16 0"></path><path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path><line x1="12" y1="20" x2="12.01" y2="20"></line></svg>
                    <span>Internet of Things (IoT)</span>
                </div>
                
                <div class="bp-card skill-card">
                    <i class="devicon-raspberrypi-plain colored animated-logo" style="font-size: 3rem;"></i>
                    <span>Hardware Design</span>
                </div>
                
                <div class="bp-card skill-card">
                    <svg class="animated-logo" style="width: 3rem; height: 3rem; color: #ff9900;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
                    <span>Sensors & Actuators</span>
                </div>
                
                <div class="bp-card skill-card">
                    <i class="devicon-cplusplus-plain colored animated-logo" style="font-size: 3rem;"></i>
                    <span>C / C++</span>
                </div>
                
                <div class="bp-card skill-card">
                    <i class="devicon-ubuntu-plain colored animated-logo" style="font-size: 3rem;"></i>
                    <span>Robotics OS</span>
                </div>
                
                <div class="bp-card skill-card">
                    <i class="devicon-figma-plain colored animated-logo" style="font-size: 3rem;"></i>
                    <span>UI / UX Design</span>
                </div>

                <div class="bp-card skill-card">
                    <i class="devicon-matlab-plain colored animated-logo" style="font-size: 3rem;"></i>
                    <span>MATLAB</span>
                </div>
                
                <div class="bp-card skill-card">
                    <i class="devicon-matlab-plain colored animated-logo" style="font-size: 3rem;"></i>
                    <span>Simulink</span>
                </div>
                
            </div>"""

# Replace old skills grid
pattern = re.compile(r'<div class="skills-grid">.*?</section>', re.DOTALL)
content = pattern.sub(new_skills_grid + '\n        </section>', content)

with open('public/index.html', 'w') as f:
    f.write(content)
print("Skills updated!")

import re

with open('public/index.html', 'r') as f:
    content = f.read()

# 1. Remove the wrapping <section id="about" class="page-section"> and its closing tag
content = content.replace('<section id="about" class="page-section">\n<section class="about-section" style="display: flex; flex-direction: column; justify-content: center; padding-top: 2rem;">', '<section id="about" class="page-section" data-nav="about" style="display: flex; flex-direction: column; justify-content: center;">')

content = content.replace('</section>\n\n\n<!-- Projects Section -->', '\n<!-- Projects Section -->')

# 2. Change all <section class="about-section"...> to <section class="page-section" data-nav="about"...>
content = content.replace('<section class="about-section" id="vision-section" style="padding-top: 4rem;">', '<section class="page-section" id="vision-section" data-nav="about">')
content = content.replace('<section class="about-section" id="skills-section" style="padding-top: 4rem;">', '<section class="page-section" id="skills-section" data-nav="about">')
content = content.replace('<section class="about-section" id="certificates-section" style="padding-top: 4rem;">', '<section class="page-section" id="certificates-section" data-nav="about">')

# Add data-nav to the others
content = content.replace('<section class="hero-redesign page-section" id="home">', '<section class="hero-redesign page-section" id="home" data-nav="home">')
content = content.replace('<section id="projects" class="page-section">', '<section id="projects" class="page-section" data-nav="projects">')
content = content.replace('<section id="contact" class="page-section">', '<section id="contact" class="page-section" data-nav="contact">')

with open('public/index.html', 'w') as f:
    f.write(content)

print("Updated index.html sections for full-page snap")

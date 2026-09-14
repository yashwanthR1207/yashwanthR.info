import re

def get_content(filename):
    with open(filename, 'r') as f:
        content = f.read()
    # Extract everything inside <main>...</main>
    match = re.search(r'<main>(.*?)</main>', content, re.DOTALL)
    if match:
        return match.group(1).strip()
    return ""

about = get_content('public/about.html')
# We need to change the headers to have the section-title class and new format.
about = about.replace('<h2>> _About_Me</h2>', '<h2 class="section-title"><span>>_</span>ABOUT_ME</h2>')
about = about.replace('<h2>> _Vision</h2>', '<h2 class="section-title"><span>>_</span>VISION</h2>')
about = about.replace('<h2>> _Core_Skills</h2>', '<h2 class="section-title"><span>>_</span>CORE_SKILLS</h2>')
about = about.replace('<h2>> _Certificates</h2>', '<h2 class="section-title"><span>>_</span>CERTIFICATES</h2>')
about = f'\n\n<!-- About Section -->\n<section id="about" class="page-section">\n{about}\n</section>\n'

projects = get_content('public/projects.html')
projects = projects.replace('<h2>> _Project_Schematics</h2>', '<h2 class="section-title"><span>>_</span>PROJECT_SCHEMATICS</h2>')
projects = f'\n\n<!-- Projects Section -->\n<section id="projects" class="page-section">\n{projects}\n</section>\n'

contact = get_content('public/contact.html')
contact = contact.replace('<h2>> _Initialize_Connection</h2>', '<h2 class="section-title"><span>>_</span>INITIALIZE_CONNECTION</h2>')
contact = f'\n\n<!-- Contact Section -->\n<section id="contact" class="page-section">\n{contact}\n</section>\n'

with open('public/index.html', 'r') as f:
    index = f.read()

index = index.replace('</main>', f'{about}{projects}{contact}\n    </main>')

with open('public/index.html', 'w') as f:
    f.write(index)

print("Merged successfully!")

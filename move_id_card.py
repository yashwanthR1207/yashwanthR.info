import re

with open('public/index.html', 'r') as f:
    content = f.read()

# The exact ID card HTML snippet
id_card_html = """                <div class="id-card-wrapper" style="flex: 1; min-width: 300px; display: flex; justify-content: center; position: relative;">
                    <div class="lanyard-strap"></div>
                    <div class="id-card black-edition">
                        <div class="lanyard-clip">
                            <svg viewBox="0 0 40 60" width="40" height="60" style="filter: drop-shadow(0 4px 6px rgba(0,0,0,0.4));">
                                <!-- Fabric Loop -->
                                <path d="M8,0 L32,0 L32,15 L8,15 Z" fill="#111" />
                                <!-- D-Ring -->
                                <path d="M12,15 C4,15 4,30 20,30 C36,30 36,15 28,15" fill="none" stroke="#b0b0b0" stroke-width="3" />
                                <!-- Hook base -->
                                <rect x="16" y="30" width="8" height="12" fill="#999" rx="2" />
                                <!-- Hook -->
                                <path d="M20,42 C10,42 12,55 20,58 C25,58 27,55 25,52 C22,53 18,52 18,48 C18,45 20,42 20,42 Z" fill="#b0b0b0" />
                                <!-- Spring -->
                                <rect x="20" y="44" width="2" height="10" fill="#666" />
                            </svg>
                        </div>
                        <div class="id-hole"></div>
                        <div class="id-photo-container">
                            <img src="https://yashprofile07.vercel.app/avatar_new.png" alt="Yashwanth R" class="id-photo">
                        </div>
                        <div class="id-info">
                            <h3 class="id-name">Yashwanth R</h3>
                            <p class="id-title">Embedded Engineer</p>
                            <p class="id-id">ID: 1207-R</p>
                        </div>
                        <div class="id-barcode"></div>
                    </div>
                </div>"""

# Remove the ID card from the about section
content = content.replace(id_card_html, '')

# We need to wrap the existing hero content in <div class="hero-content">
# The hero content starts at <!-- Terminal greeting --> and ends at </div> right before <!-- Decorative coordinates -->
# Let's find those markers.
greeting_idx = content.find('<!-- Terminal greeting -->')
coords_idx = content.find('<!-- Decorative coordinates -->')

if greeting_idx != -1 and coords_idx != -1:
    hero_content_part = content[greeting_idx:coords_idx]
    
    new_hero_content = f"""<div class="hero-content">
            {hero_content_part.strip()}
        </div>
        
        <div class="hero-image" id="hero-image">
{id_card_html}
        </div>
        
        """
    
    content = content[:greeting_idx] + new_hero_content + content[coords_idx:]

with open('public/index.html', 'w') as f:
    f.write(content)

print("ID card moved successfully!")

const toggleButton = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const themeText = document.getElementById('theme-text');
const body = document.body;

// 1. Vérifier le thème sauvegardé au chargement de la page
const savedTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

// Si l'utilisateur a déjà choisi, on applique. Sinon, on suit la préférence système.
if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    enableDarkMode();
}

// 2. Fonction pour activer le mode sombre
function enableDarkMode() {
    body.classList.add('dark-mode');
    themeIcon.textContent = '☀️';
    localStorage.setItem('theme', 'dark');
}

// 3. Fonction pour activer le mode clair
function disableDarkMode() {
    body.classList.remove('dark-mode');
    themeIcon.textContent = '🌙';
    localStorage.setItem('theme', 'light');
}

// 4. Écouter le clic sur le bouton
toggleButton.addEventListener('click', () => {
    if (body.classList.contains('dark-mode')) {
        disableDarkMode();
    } else {
        enableDarkMode();
    }
});

// --- Fonctionnalité "Voir plus / Voir moins" pour les projets ---
document.addEventListener('DOMContentLoaded', () => {
    // 1. On sélectionne TOUS les textes de description
    const descriptions = document.querySelectorAll('.project-description');

    descriptions.forEach(desc => {
        // 2. On vérifie si le texte est vraiment plus long que la hauteur visible (3 lignes)
        // scrollHeight = hauteur totale du contenu
        // clientHeight = hauteur visible (limitée par le CSS)
        if (desc.scrollHeight > desc.clientHeight) {
            
            // On trouve le conteneur parent
            const container = desc.parentElement;
            
            // On trouve le bouton QUI EST DANS CE CONTENEUR SPÉCIFIQUE
            const button = container.querySelector('.toggle-btn');
            
            // Si le bouton existe, on l'affiche et on ajoute l'événement
            if (button) {
                button.style.display = 'block'; // Rend le bouton visible
                
                // 3. On ajoute l'écouteur de clic
                button.addEventListener('click', function() {
                    // IMPORTANT : 'this' fait référence au bouton précis qu'on vient de cliquer
                    // On ne touche pas aux autres boutons
                    
                    const isExpanded = desc.classList.contains('expanded');
                    
                    if (isExpanded) {
                        // Action : RÉDUIRE
                        desc.classList.remove('expanded');
                        this.textContent = 'Voir plus'; // Change le texte de CE bouton
                    } else {
                        // Action : ÉTENDRE
                        desc.classList.add('expanded');
                        this.textContent = 'Voir moins'; // Change le texte de CE bouton
                    }
                });
            }
        }
    });
});

// --- Mise en surbrillance du menu au scroll ---
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-list a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        // Si on a scrollé jusqu'à la section (avec un décalage de 100px pour le header)
        if (pageYOffset >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});
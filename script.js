// Variables globales
let isPlaying = false;
let isDarkMode = false;
let gameScore = 0;
let gameActive = false;
let gameHearts = [];
//let startDate = new Date('2025-06-01'); // Cambiar por su fecha real

// Preloader romántico
window.addEventListener('load', () => {
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }
    }, 2000);
});

// Inicializar AOS con configuración mejorada
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        AOS.init({
            duration: 800,
            easing: 'ease-out',
            once: true,
            offset: 50,
            delay: 0,
            disable: function() {
                return window.innerWidth < 768;
            }
        });
    }, 100);
});







// ====== TEMA DÍA/NOCHE CORREGIDO ======
// ====== TEMA DÍA/NOCHE - SOLUCIÓN COMPLETA ======
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    
    // Cargar tema guardado
    let savedTheme = sessionStorage.getItem('theme') || 'light';
    
    // Aplicar tema inicial
    if (savedTheme === 'dark') {
        enableDarkMode();
    } else {
        disableDarkMode();
    }

    // Event listener para el toggle
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            console.log('Toggle clicked, current mode:', isDarkMode);
            if (isDarkMode) {
                disableDarkMode();
            } else {
                enableDarkMode();
            }
        });
    }

    // Función para activar modo oscuro
    function enableDarkMode() {
        // Cambiar atributo del body
        document.body.setAttribute('data-theme', 'dark');
        
        // Cambiar icono
        if (themeIcon) {
            themeIcon.className = 'fas fa-sun';
        }
        
        // Actualizar variable global
        isDarkMode = true;
        
        // Guardar en storage
        sessionStorage.setItem('theme', 'dark');
        
        // FORZAR aplicación de estilos CSS
        applyThemeStyles('dark');
        
        console.log('Modo oscuro activado');
        console.log('Body data-theme:', document.body.getAttribute('data-theme'));
    }

    // Función para activar modo claro
    function disableDarkMode() {
        // Remover atributo del body
        document.body.removeAttribute('data-theme');
        
        // Cambiar icono
        if (themeIcon) {
            themeIcon.className = 'fas fa-moon';
        }
        
        // Actualizar variable global
        isDarkMode = false;
        
        // Guardar en storage
        sessionStorage.setItem('theme', 'light');
        
        // FORZAR aplicación de estilos CSS
        applyThemeStyles('light');
        
        console.log('Modo claro activado');
        console.log('Body data-theme:', document.body.getAttribute('data-theme'));
    }
    
    // Función para forzar aplicación de estilos
    function applyThemeStyles(theme) {
        const root = document.documentElement;
        
        if (theme === 'dark') {
            // Aplicar variables del tema oscuro directamente
            root.style.setProperty('--primary-color', '#ff69b4');
            root.style.setProperty('--secondary-color', '#87ceeb');
            root.style.setProperty('--accent-color', '#ffd700');
            root.style.setProperty('--bg-primary', '#1a1a2e');
            root.style.setProperty('--bg-secondary', '#16213e');
            root.style.setProperty('--bg-tertiary', '#0f3460');
            root.style.setProperty('--text-primary', '#eee');
            root.style.setProperty('--text-secondary', '#ccc');
            root.style.setProperty('--text-tertiary', '#aaa');
            root.style.setProperty('--card-bg', 'rgba(255, 255, 255, 0.05)');
            root.style.setProperty('--border-color', 'rgba(255, 105, 180, 0.2)');
            root.style.setProperty('--shadow-light', '0 4px 15px rgba(0, 0, 0, 0.3)');
            root.style.setProperty('--shadow-medium', '0 6px 20px rgba(255, 105, 180, 0.4)');
            root.style.setProperty('--shadow-heavy', '0 10px 30px rgba(0, 0, 0, 0.3)');
            
            // Aplicar estilos directamente al body
            document.body.style.backgroundColor = '#1a1a2e';
            document.body.style.color = '#eee';
            
        } else {
            // Aplicar variables del tema claro directamente
            root.style.setProperty('--primary-color', '#ff69b4');
            root.style.setProperty('--secondary-color', '#87ceeb');
            root.style.setProperty('--accent-color', '#ffd700');
            root.style.setProperty('--bg-primary', '#ffffff');
            root.style.setProperty('--bg-secondary', '#f8f9fa');
            root.style.setProperty('--bg-tertiary', '#e9ecef');
            root.style.setProperty('--text-primary', '#333333');
            root.style.setProperty('--text-secondary', '#666666');
            root.style.setProperty('--text-tertiary', '#999999');
            root.style.setProperty('--card-bg', 'rgba(255, 255, 255, 0.9)');
            root.style.setProperty('--border-color', 'rgba(255, 105, 180, 0.3)');
            root.style.setProperty('--shadow-light', '0 2px 10px rgba(0, 0, 0, 0.1)');
            root.style.setProperty('--shadow-medium', '0 4px 15px rgba(255, 105, 180, 0.2)');
            root.style.setProperty('--shadow-heavy', '0 8px 25px rgba(0, 0, 0, 0.15)');
            
            // Aplicar estilos directamente al body
            document.body.style.backgroundColor = '#ffffff';
            document.body.style.color = '#333333';
        }
        
        // Forzar reflow
        document.body.offsetHeight;
        
        // Aplicar estilos a elementos específicos
        updateElementStyles(theme);
    }
    
    // Función para actualizar estilos de elementos específicos
    function updateElementStyles(theme) {
        // Actualizar todas las tarjetas/cards
        const cards = document.querySelectorAll('.card, .memory-card, .section');
        cards.forEach(card => {
            if (theme === 'dark') {
                card.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                card.style.color = '#eee';
                card.style.borderColor = 'rgba(255, 105, 180, 0.2)';
            } else {
                card.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
                card.style.color = '#333333';
                card.style.borderColor = 'rgba(255, 105, 180, 0.3)';
            }
        });
        
        // Actualizar títulos
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        headings.forEach(heading => {
            heading.style.color = theme === 'dark' ? '#rgba(255, 255, 255, 0.05)' : '#rgba(255, 13, 13, 0.99)';
        });
        
        // Actualizar párrafos
        const paragraphs = document.querySelectorAll('p, span');
        paragraphs.forEach(p => {
            p.style.color = theme === 'dark' ? '#ccc' : '#666666';
        });
        
        // Actualizar inputs
        const inputs = document.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            if (theme === 'dark') {
                input.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                input.style.color = '#eee';
                input.style.borderColor = 'rgba(255, 105, 180, 0.2)';
            } else {
                input.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
                input.style.color = '#333333';
                input.style.borderColor = 'rgba(255, 105, 180, 0.3)';
            }
        });
        
        console.log(`Estilos aplicados para tema: ${theme}`);
    }
});

// Función de debugging mejorada
function debugTheme() {
    console.log('=== DEBUG TEMA DETALLADO ===');
    console.log('isDarkMode:', isDarkMode);
    console.log('data-theme attribute:', document.body.getAttribute('data-theme'));
    console.log('Tema guardado:', sessionStorage.getItem('theme'));
    console.log('Icono actual:', document.getElementById('themeIcon')?.className);
    
    // Verificar estilos computed
    const bodyStyles = getComputedStyle(document.body);
    console.log('Body background:', bodyStyles.backgroundColor);
    console.log('Body color:', bodyStyles.color);
    
    // Verificar variables CSS
    const rootStyles = getComputedStyle(document.documentElement);
    console.log('--bg-primary:', rootStyles.getPropertyValue('--bg-primary'));
    console.log('--text-primary:', rootStyles.getPropertyValue('--text-primary'));
    
    // Verificar elementos específicos
    const firstCard = document.querySelector('.card, .memory-card, .section');
    if (firstCard) {
        const cardStyles = getComputedStyle(firstCard);
        console.log('Primera tarjeta background:', cardStyles.backgroundColor);
        console.log('Primera tarjeta color:', cardStyles.color);
    }
}

// Hacer la función disponible globalmente
window.debugTheme = debugTheme;

// Auto-debug después de cada cambio (remover en producción)
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        console.log('Auto-debug inicial:');
        debugTheme();
    }, 1000);
});


// Control de música mejorado
const music = document.getElementById('backgroundMusic');
const musicControl = document.getElementById('musicControl');
const musicIcon = document.getElementById('musicIcon');

const music2       = document.getElementById('backgroundMusic2');
const musicControl2 = document.getElementById('musicControl2');
const musicIcon2   = document.getElementById('musicIcon2');
let isPlaying2     = false;


// Configuración de audio mejorada
if (music) {
    music.volume = 0.3;
    music.preload = 'auto';
    
    music.addEventListener('error', (e) => {
        console.log('Error al cargar el audio:', e);
        if (musicControl) musicControl.style.display = 'none';
    });
    
    window.addEventListener('load', () => {
        const playPromise = music.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                isPlaying = true;
                if (musicIcon) musicIcon.className = 'fas fa-pause';
                fadeInAudio(music, 0.3, 1000);
            }).catch(error => {
                console.log('Reproducción automática bloqueada:', error);
                if (musicControl) musicControl.classList.add('pulse');
            });
        }
    });
    
    if (musicControl) {
        musicControl.addEventListener('click', () => {
            if (isPlaying) {
                fadeOutAudio(music, 500, () => {
                    music.pause();
                    if (musicIcon) musicIcon.className = 'fas fa-play';
                });
            } else {
                music.play().then(() => {
                    fadeInAudio(music, 0.3, 500);
                    if (musicIcon) musicIcon.className = 'fas fa-pause';
                }).catch(error => {
                    console.log('Error al reproducir:', error);
                });
            }
            isPlaying = !isPlaying;
            musicControl.classList.remove('pulse');
        });
    }
}


// Control del segundo botón
if (music2) {
    music2.volume = 0.3;
    music2.preload = 'auto';
}

if (musicControl2) {
    musicControl2.addEventListener('click', () => {
        if (isPlaying2) {
            fadeOutAudio(music2, 500, () => {
                music2.pause();
                if (musicIcon2) musicIcon2.className = 'fas fa-play';
            });
        } else {
            music2.play().then(() => {
                fadeInAudio(music2, 0.3, 500);
                if (musicIcon2) musicIcon2.className = 'fas fa-pause';
            }).catch(error => {
                console.log('Error al reproducir segundo audio:', error);
            });
        }
        isPlaying2 = !isPlaying2;
        musicControl2.classList.remove('pulse');
    });
}

// Funciones de fade para audio
function fadeInAudio(audio, targetVolume, duration) {
    audio.volume = 0;
    const step = targetVolume / (duration / 50);
    const fadeInterval = setInterval(() => {
        if (audio.volume < targetVolume) {
            audio.volume = Math.min(audio.volume + step, targetVolume);
        } else {
            clearInterval(fadeInterval);
        }
    }, 50);
}

function fadeOutAudio(audio, duration, callback) {
    const initialVolume = audio.volume;
    const step = initialVolume / (duration / 50);
    const fadeInterval = setInterval(() => {
        if (audio.volume > 0) {
            audio.volume = Math.max(audio.volume - step, 0);
        } else {
            clearInterval(fadeInterval);
            if (callback) callback();
        }
    }, 50);
}

// Contador de días juntos
function updateDaysCounter() {
    const daysNumber = document.getElementById('daysNumber');
    if (daysNumber) {
        const today = new Date();
        const timeDiff = today.getTime() - startDate.getTime();
        const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
        
        animateCounter(daysNumber, 0, daysDiff, 2000);
    }
}

function animateCounter(element, start, end, duration) {
    const range = end - start;
    const increment = end > start ? 1 : -1;
    const stepTime = Math.abs(Math.floor(duration / range));
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        element.textContent = current;
        if (current === end) {
            clearInterval(timer);
        }
    }, stepTime);
}

window.addEventListener('load', updateDaysCounter);

// Corazones flotantes mejorados
function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = Math.random() > 0.5 ? '❤️' : '💖';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDelay = Math.random() * 2 + 's';
    heart.style.animationDuration = (Math.random() * 3 + 3) + 's';
    heart.style.fontSize = (Math.random() * 10 + 15) + 'px';

    const floatingHeartsContainer = document.getElementById('floating-hearts');
    if (floatingHeartsContainer) {
        floatingHeartsContainer.appendChild(heart);
        
        setTimeout(() => {
            if (heart.parentNode) {
                heart.remove();
            }
        }, 6000);
    }
}

let heartInterval = 2000;
function startHeartAnimation() {
    createFloatingHeart();
    heartInterval = Math.random() * 2000 + 1500;
    setTimeout(startHeartAnimation, heartInterval);
}

startHeartAnimation();

// Galería de fotos deslizante
function initializeGallery() {
    const galleries = document.querySelectorAll('.image-gallery');
    
    galleries.forEach(gallery => {
        const slides = gallery.querySelectorAll('.gallery-slide');
        const prevBtn = gallery.querySelector('.prev-btn');
        const nextBtn = gallery.querySelector('.next-btn');
        let currentSlide = 0;
        
        if (slides.length <= 1) {
            const navigation = gallery.querySelector('.gallery-navigation');
            if (navigation) navigation.style.display = 'none';
            return;
        }
        
        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            slides[index].classList.add('active');
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentSlide = (currentSlide - 1 + slides.length) % slides.length;
                showSlide(currentSlide);
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentSlide = (currentSlide + 1) % slides.length;
                showSlide(currentSlide);
            });
        }
        
        setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }, 5000);
    });
}

// Mini juego: Encuentra los corazones
const gameContainer = document.getElementById('gameContainer');
const gameArea = document.getElementById('gameArea');
const gameScoreElement = document.getElementById('gameScore');
const startGameBtn = document.getElementById('startGameBtn');

if (startGameBtn) {
    startGameBtn.addEventListener('click', startGame);
}

function startGame() {
    gameActive = true;
    gameScore = 0;
    if (gameScoreElement) gameScoreElement.textContent = gameScore;
    if (startGameBtn) startGameBtn.style.display = 'none';
    
    const gameTimer = setInterval(() => {
        if (gameActive) {
            createGameHeart();
        }
    }, 1500);
    
    setTimeout(() => {
        endGame();
        clearInterval(gameTimer);
    }, 30000);
}

function createGameHeart() {
    if (!gameArea) return;
    
    const gameIcon = document.createElement('div');
    gameIcon.className = 'game-heart';
    
    const gameIcons = [
        { icon: '💖', points: 15, type: 'good' },
        { icon: '❤️', points: 10, type: 'good' },
        { icon: '🎉', points: 12, type: 'good' },
        { icon: '🫶', points: 12, type: 'good' },
        { icon: '🍻', points: 12, type: 'good' },
        { icon: '🎂', points: 12, type: 'good' },
        { icon: '🖤', points: -5, type: 'bad' },
        { icon: '💔', points: -8, type: 'bad' },
        { icon: '💀', points: -15, type: 'bad' },
        { icon: '😒', points: -20, type: 'bad' },
        { icon: '😔', points: -15, type: 'bad' },
        { icon: '🤷‍♂️', points: -10, type: 'bad' }
    ];
    
    const isGoodIcon = Math.random() < 0.6;
    const availableIcons = gameIcons.filter(item => 
        isGoodIcon ? item.type === 'good' : item.type === 'bad'
    );
    const selectedIcon = availableIcons[Math.floor(Math.random() * availableIcons.length)];
    
    gameIcon.innerHTML = selectedIcon.icon;
    gameIcon.dataset.points = selectedIcon.points;
    gameIcon.dataset.type = selectedIcon.type;
    gameIcon.style.left = Math.random() * (gameArea.offsetWidth - 50) + 'px';
    gameIcon.style.top = Math.random() * (gameArea.offsetHeight - 50) + 'px';
    
    if (selectedIcon.type === 'bad') {
        gameIcon.classList.add('bad-icon');
    }
    
    gameIcon.addEventListener('click', () => {
        const points = parseInt(selectedIcon.points);
        gameScore += points;
        gameScore = Math.max(0, gameScore);
        if (gameScoreElement) gameScoreElement.textContent = gameScore;
        
        if (selectedIcon.type === 'good') {
            createFirework(
                gameArea.offsetLeft + parseInt(gameIcon.style.left) + 25,
                gameArea.offsetTop + parseInt(gameIcon.style.top) + 25
            );
        } else {
            createNegativeEffect(
                gameArea.offsetLeft + parseInt(gameIcon.style.left) + 25,
                gameArea.offsetTop + parseInt(gameIcon.style.top) + 25
            );
        }
        
        gameIcon.remove();
    });
    
    gameArea.appendChild(gameIcon);
    gameHearts.push(gameIcon);
    
    setTimeout(() => {
        if (gameIcon.parentNode) {
            gameIcon.remove();
        }
    }, 3000);
}

function createNegativeEffect(x, y) {
    const negativeEffect = document.createElement('div');
    negativeEffect.className = 'negative-effect';
    negativeEffect.style.left = x + 'px';
    negativeEffect.style.top = y + 'px';

    const negativeColors = ['#ff4757', '#ff3742', '#ff1e2d', '#e84118'];

    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.className = 'negative-particle';
        particle.style.backgroundColor = negativeColors[Math.floor(Math.random() * negativeColors.length)];

        const angle = (i * 45) * Math.PI / 180;
        const distance = Math.random() * 60 + 30;
        const dx = Math.cos(angle) * distance;
        const dy = Math.sin(angle) * distance;

        particle.style.setProperty('--dx', dx + 'px');
        particle.style.setProperty('--dy', dy + 'px');

        negativeEffect.appendChild(particle);
    }

    document.body.appendChild(negativeEffect);

    const gameArea = document.getElementById('gameArea');
    if (gameArea) {
        gameArea.classList.add('negative-shake');
        setTimeout(() => {
            gameArea.classList.remove('negative-shake');
        }, 500);
    }

    setTimeout(() => {
        if (negativeEffect.parentNode) {
            negativeEffect.remove();
        }
    }, 800);
}

function endGame() {
    gameActive = false;
    gameHearts.forEach(heart => {
        if (heart.parentNode) {
            heart.remove();
        }
    });
    gameHearts = [];
    
    if (startGameBtn) {
        startGameBtn.style.display = 'block';
        startGameBtn.textContent = `¡Puntuación: ${gameScore}! Jugar de nuevo`;
    }
    
    if (gameScore > 100) {
        createCelebrationMessage('¡Increíble! ¡Eres muy rápida! 🎉');
    } else if (gameScore > 50) {
        createCelebrationMessage('¡Muy bien! ¡Buen trabajo! 👏');
    } else {
        createCelebrationMessage('¡Buen intento! ¡Inténtalo de nuevo! 💪');
    }
}

function createCelebrationMessage(message) {
    const celebrationDiv = document.createElement('div');
    celebrationDiv.textContent = message;
    celebrationDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(45deg, #ff69b4, #87ceeb);
        color: white;
        padding: 20px 30px;
        border-radius: 15px;
        font-size: 1.2rem;
        font-weight: 600;
        z-index: 10000;
        animation: celebrationPop 3s ease-out forwards;
    `;
    
    document.body.appendChild(celebrationDiv);
    
    setTimeout(() => {
        if (celebrationDiv.parentNode) {
            celebrationDiv.remove();
        }
    }, 3000);
}

// Mensaje sorpresa con contraseña
const secretPassword = document.getElementById('secretPassword');
const unlockBtn = document.getElementById('unlockBtn');
const secretMessage = document.getElementById('secretMessage');

if (unlockBtn) {
    unlockBtn.addEventListener('click', checkPassword);
}

if (secretPassword) {
    secretPassword.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            checkPassword();
        }
    });
}

function checkPassword() {
    if (!secretPassword) return;
    
    const password = secretPassword.value.toLowerCase().trim();
    const correctPasswords = ['cerveza', 'playa', 'vino', 'salsa', 'viajar', 'viajes', 'cielo'];  
    if (correctPasswords.includes(password)) {
        if (secretMessage) secretMessage.classList.remove('hidden');
        secretPassword.disabled = true;
        if (unlockBtn) {
            unlockBtn.disabled = true;
            unlockBtn.textContent = '¡Desbloqueado! ✅';
        }
        
        createFirework(window.innerWidth / 2, window.innerHeight / 2);
        setTimeout(() => createFirework(window.innerWidth / 2, window.innerHeight / 2), 200);
        setTimeout(() => createFirework(window.innerWidth / 2, window.innerHeight / 2), 400);
    } else {
        secretPassword.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            secretPassword.style.animation = '';
        }, 500);
    }
}

// Efecto de fuegos artificiales mejorado
document.addEventListener('click', (e) => {
    if (!e.target.closest('button, input, .game-heart, a')) {
        createFirework(e.clientX, e.clientY);
    }
});

function createFirework(x, y) {
    const firework = document.createElement('div');
    firework.className = 'firework';
    firework.style.left = x + 'px';
    firework.style.top = y + 'px';

    const colors = ['#ff69b4', '#87ceeb', '#ffd700', '#ff6b6b', '#4ecdc4', '#45b7d1', '#ff1493', '#00ced1'];

    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'firework-particle';
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

        const angle = (i * 24) * Math.PI / 180;
        const distance = Math.random() * 120 + 60;
        const dx = Math.cos(angle) * distance;
        const dy = Math.sin(angle) * distance;

        particle.style.setProperty('--dx', dx + 'px');
        particle.style.setProperty('--dy', dy + 'px');

        firework.appendChild(particle);
    }

    document.body.appendChild(firework);

    setTimeout(() => {
        if (firework.parentNode) {
            firework.remove();
        }
    }, 1000);
}

// Crear chispas aleatorias mejoradas
function createRandomSparkles() {
    if (window.innerWidth < 768 && Math.random() < 0.5) return;
    
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = Math.random() * window.innerWidth + 'px';
    sparkle.style.top = Math.random() * window.innerHeight + 'px';

    document.body.appendChild(sparkle);

    setTimeout(() => {
        if (sparkle.parentNode) {
            sparkle.remove();
        }
    }, 1000);
}

setInterval(createRandomSparkles, 4000);

// Efecto de cursor personalizado mejorado
let lastMouseMove = 0;
document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastMouseMove < 100) return;
    lastMouseMove = now;
    
    if (Math.random() < 0.08) {
        const trail = document.createElement('div');
        trail.style.cssText = `
            position: absolute;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            width: 6px;
            height: 6px;
            background: #ff69b4;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            opacity: 0.7;
            animation: fadeOut 0.5s ease-out forwards;
        `;

        document.body.appendChild(trail);

        setTimeout(() => {
            if (trail.parentNode) {
                trail.remove();
            }
        }, 500);
    }
});

// Añadir keyframes dinámicamente
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        0% { opacity: 0.7; transform: scale(1); }
        100% { opacity: 0; transform: scale(0); }
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    @keyframes celebrationPop {
        0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
        20% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
        30% { transform: translate(-50%, -50%) scale(1); }
        90% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
    }
    
    .pulse {
        animation: pulse 2s infinite;
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);

// Inicializar galería cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    initializeGallery();
});

// Lazy loading para imágenes
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('lazy-loading');
                    
                    img.addEventListener('load', () => {
                        img.classList.remove('lazy-loading');
                    });
                    
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

window.addEventListener('load', initializeLazyLoading);

// Efectos de parallax mejorados para desktop
function initializeParallax() {
    if (window.innerWidth < 768) return;
    
    const parallaxElements = document.querySelectorAll('.parallax-section');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top + window.pageYOffset;
            const distance = scrolled - elementTop;
            const rate = distance * 0.05;
            const limitedRate = Math.max(-20, Math.min(20, rate));
            
            if (element.getBoundingClientRect().top < window.innerHeight && 
                element.getBoundingClientRect().bottom > 0) {
                element.style.transform = `translateY(${limitedRate}px)`;
            }
        });
    }, { passive: true });
}

window.addEventListener('load', () => {
    if (window.innerWidth >= 768) {
        setTimeout(initializeParallax, 500);
    }
});

// Optimización de rendimiento
let ticking = false;

function updateAnimations() {
    ticking = false;
}

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateAnimations);
        ticking = true;
    }
}

// Manejo de errores globales
window.addEventListener('error', (e) => {
    console.log('Error capturado:', e.error);
});

// Cleanup al salir de la página
window.addEventListener('beforeunload', () => {
    gameActive = false;
});
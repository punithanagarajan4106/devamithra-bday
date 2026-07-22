let currentSlide = 1;
const totalSlides = 8;
const music = document.getElementById('bgMusic');
const loadingScreen = document.getElementById('loadingScreen');
const mainContainer = document.getElementById('mainContainer');
let buttonsDisabled = false;

// Enhanced Animation & Performance Settings
const animationConfig = {
    slideTransitionDuration: 1000,
    photoDisplayDuration: 2500,
    textTypeSpeed: 30,
    soundFadeOutDuration: 0.3,
    enableGPUAcceleration: true
};

// Initialize audio context for sound generation
let audioContext = null;

function initAudioContext() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioContext;
}

// Generate smooth sound effect using Web Audio API
function playTone(frequency, duration, type = 'sine', volume = 0.3, attack = 0.01, release = 0.1) {
    try {
        const ctx = initAudioContext();
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        oscillator.frequency.value = frequency;
        oscillator.type = type;
        
        gainNode.gain.setValueAtTime(0, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(volume, ctx.currentTime + attack);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration - release);
        
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + duration);
    } catch (e) {
        console.log('Audio playback error:', e);
    }
}

// Enhanced sound effects
function soundButtonClick() {
    playTone(850, 0.15, 'sine', 0.25, 0.01, 0.05);
    setTimeout(() => {
        playTone(1050, 0.15, 'sine', 0.25, 0.01, 0.05);
    }, 60);
}

function soundSlideTransition() {
    playTone(420, 0.25, 'sine', 0.2, 0.02, 0.1);
    setTimeout(() => {
        playTone(530, 0.2, 'sine', 0.2, 0.02, 0.08);
    }, 120);
}

function soundPhotoAppear() {
    playTone(650, 0.2, 'sine', 0.25, 0.01, 0.08);
}

function soundCelebration() {
    const notes = [523, 659, 784, 1047];
    notes.forEach((freq, index) => {
        setTimeout(() => {
            playTone(freq, 0.3, 'sine', 0.3, 0.02, 0.12);
        }, index * 120);
    });
}

function soundSparkle() {
    playTone(1300, 0.1, 'sine', 0.25, 0.005, 0.05);
    setTimeout(() => {
        playTone(1500, 0.1, 'sine', 0.25, 0.005, 0.05);
    }, 100);
}

function soundHeartbeat() {
    playTone(160, 0.18, 'sine', 0.3, 0.02, 0.08);
    setTimeout(() => {
        playTone(160, 0.18, 'sine', 0.3, 0.02, 0.08);
    }, 180);
}

function soundGiftOpen() {
    playTone(850, 0.12, 'sine', 0.25, 0.01, 0.06);
    setTimeout(() => {
        playTone(1050, 0.18, 'sine', 0.3, 0.02, 0.08);
    }, 120);
    setTimeout(() => {
        playTone(1300, 0.25, 'sine', 0.35, 0.03, 0.12);
    }, 300);
}

function soundPanda() {
    playTone(750, 0.12, 'sine', 0.25, 0.01, 0.06);
    setTimeout(() => {
        playTone(850, 0.12, 'sine', 0.25, 0.01, 0.06);
    }, 120);
}

function soundError() {
    playTone(200, 0.2, 'sine', 0.3, 0.02, 0.1);
    setTimeout(() => {
        playTone(150, 0.2, 'sine', 0.3, 0.02, 0.1);
    }, 150);
}

function playSound(type) {
    switch(type) {
        case 'buttonClick':
            soundButtonClick();
            break;
        case 'slideTransition':
            soundSlideTransition();
            break;
        case 'photoAppear':
            soundPhotoAppear();
            break;
        case 'celebration':
            soundCelebration();
            break;
        case 'sparkle':
            soundSparkle();
            break;
        case 'heartbeat':
            soundHeartbeat();
            break;
        case 'gift':
            soundGiftOpen();
            break;
        case 'panda':
            soundPanda();
            break;
        case 'error':
            soundError();
            break;
    }
}

// Photo texts for Slide 2
const slide2Texts = [
    "Before we celebrate today...",
    "There's someone I'd love to introduce...",
    "Someone whose smile can brighten even ordinary days.",
    "Someone who doesn't even try to be beautiful..."
];

// Slide 5 texts
const slide5Texts = [
    "Strength looks beautiful on you...",
    "You don't need to try to shine...",
    "Never forget how amazing you are..."
];

// Initialize
window.addEventListener('load', () => {
    preloadImages();
    setTimeout(() => {
        startExperience();
    }, 4000);
});

function preloadImages() {
    const slides = ['slide2', 'slide5', 'slide6', 'slide7'];
    slides.forEach(slide => {
        if (slide === 'slide2') {
            for (let i = 1; i <= 4; i++) {
                const img = new Image();
                img.src = `assets/images/slide2/photo${i}.jpg`;
            }
        } else if (slide === 'slide5') {
            for (let i = 1; i <= 3; i++) {
                const img = new Image();
                img.src = `assets/images/slide5/photo${i}.jpg`;
            }
        } else if (slide === 'slide6') {
            const img = new Image();
            img.src = 'assets/images/slide6/father.jpg';
        } else if (slide === 'slide7') {
            const img = new Image();
            img.src = 'assets/images/slide7/selfie.jpg';
            const img2 = new Image();
            img2.src = 'assets/images/slide7/walking.jpg';
        }
    });
}

function startExperience() {
    loadingScreen.classList.add('hidden');
    mainContainer.classList.remove('hidden');
    
    music.volume = 0;
    music.play().catch(e => console.log('Audio play failed:', e));
    
    let currentVol = 0;
    const fadeInInterval = setInterval(() => {
        currentVol += 0.05;
        music.volume = Math.min(currentVol, 0.5);
        if (currentVol >= 0.5) clearInterval(fadeInInterval);
    }, 50);
    
    showSlide(1);
}

function showSlide(slideNum) {
    buttonsDisabled = false;
    
    document.querySelectorAll('.slide:not(.hidden)').forEach(slide => {
        slide.style.animation = 'fadeOut 0.5s ease-in-out forwards';
    });
    
    setTimeout(() => {
        document.querySelectorAll('.slide').forEach(slide => {
            slide.classList.add('hidden');
            slide.style.animation = '';
        });
        
        const slide = document.getElementById(`slide${slideNum}`);
        if (slide) {
            slide.classList.remove('hidden');
            slide.style.animation = 'fadeIn 0.8s ease-in-out';
        }

        currentSlide = slideNum;
        playSound('slideTransition');

        switch(slideNum) {
            case 2:
                initSlide2();
                break;
            case 3:
                initSlide3();
                break;
            case 5:
                initSlide5();
                break;
            case 6:
                initSlide6();
                break;
            case 7:
                initSlide7();
                break;
            case 8:
                initSlide8();
                break;
        }
    }, 500);
}

// Custom notification (replaces alert)
function showNotification(text, duration = 2500) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(255, 255, 255, 0.95);
        padding: 2rem 3rem;
        border-radius: 20px;
        font-size: 1.3rem;
        font-weight: bold;
        color: #FF69B4;
        text-align: center;
        z-index: 10000;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        max-width: 80%;
        line-height: 1.5;
        animation: slideInUp 0.5s ease-out;
        backdrop-filter: blur(10px);
    `;
    
    notification.textContent = text;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.5s ease-in-out forwards';
        setTimeout(() => notification.remove(), 500);
    }, duration);
}

// Slide 1: Friendship Test
function handleYes() {
    if (buttonsDisabled) return;
    buttonsDisabled = true;
    
    playSound('buttonClick');
    const panda = document.getElementById('pandaSlide1');
    panda.style.animation = 'jump 0.6s ease-in-out';
    
    document.querySelectorAll('.btn-yes, .btn-no').forEach(btn => {
        btn.disabled = true;
        btn.style.opacity = '0.6';
        btn.style.cursor = 'not-allowed';
    });
    
    setTimeout(() => {
        playSound('celebration');
    }, 150);
    setTimeout(() => {
        playSound('sparkle');
    }, 300);
    
    createConfetti();
    showNotification('YAY!! I knew it!! 🐼💖', 1500);
    
    setTimeout(() => {
        nextSlide();
    }, 2000);
}

function handleNo() {
    if (buttonsDisabled) return;
    buttonsDisabled = true;
    
    playSound('error');
    playSound('panda');
    
    const noBtn = event.target;
    const pandaElm = document.getElementById('pandaSlide1');
    
    // Create vibration effect with shake animation
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            noBtn.style.animation = 'shake 0.15s ease-in-out';
            pandaElm.style.animation = 'shake 0.15s ease-in-out';
        }, i * 150);
    }
    
    showNotification('HOW DARE YOU!! 😤\n\nI KNEW WE WERE BEST FRIENDS!!\n\nTry that again... 😒👉', 3000);
    
    setTimeout(() => {
        buttonsDisabled = false;
        noBtn.style.animation = '';
        pandaElm.style.animation = '';
    }, 500);
}

// Slide 2: Someone Truly Special
function initSlide2() {
    const photoContainer = document.getElementById('photoContainer');
    const photoText = document.getElementById('photoText');
    photoContainer.innerHTML = '';
    
    let photoIndex = 0;
    
    const showNextPhoto = () => {
        if (photoIndex < 4) {
            const existingImg = photoContainer.querySelector('img');
            if (existingImg) {
                existingImg.style.animation = 'fadeOut 0.5s ease-in-out forwards';
                setTimeout(() => existingImg.remove(), 500);
            }

            setTimeout(() => {
                const img = document.createElement('img');
                img.src = `assets/images/slide2/photo${photoIndex + 1}.jpg`;
                img.className = 'photo-frame';
                img.alt = `Devamithra photo ${photoIndex + 1}`;
                img.style.animation = 'fadeInScale 1s ease-in-out';
                photoContainer.appendChild(img);
                
                photoText.style.animation = 'fadeIn 0.8s ease-in-out';
                photoText.textContent = slide2Texts[photoIndex];
                playSound('photoAppear');
                
                photoIndex++;
                setTimeout(showNextPhoto, animationConfig.photoDisplayDuration);
            }, 500);
        } else {
            photoText.style.animation = 'fadeOut 0.5s ease-in-out forwards';
            setTimeout(() => {
                photoText.innerHTML = "<br><br>Tiny panda whispers: <br>\"I think she's really special...\" 🐼";
                photoText.style.animation = 'fadeIn 0.8s ease-in-out';
                playSound('heartbeat');
                
                setTimeout(() => {
                    document.getElementById('slide2Continue').classList.remove('hidden');
                    document.getElementById('slide2Continue').style.animation = 'fadeIn 0.8s ease-in-out';
                }, 800);
            }, 500);
        }
    };
    
    showNextPhoto();
}

// Slide 3: Giant Birthday Letter
function initSlide3() {
    playSound('gift');
    const letterContent = document.getElementById('letterContent');
    const letter = `
        <h3 style="color: var(--gold); margin-bottom: 1rem;">Dear Devamithra,</h3>
        <p>As I write this, I find myself reflecting on how fortunate I am to call you my friend.</p>
        <p>Today is a celebration of YOU – of your kindness, your strength, and the light you bring to everyone around you.</p>
        <p>I wish for you happiness in every moment, strength in every challenge, and love in every connection you make.</p>
        <p>May this year be filled with laughter, unforgettable memories, and dreams coming true.</p>
        <p>Thank you for being such an incredible friend. Thank you for being you.</p>
        <p style="margin-top: 2rem;">With heartfelt wishes,<br><br>Your Friend 💖</p>
    `;
    
    typeWriter(letterContent, letter, animationConfig.textTypeSpeed);
    
    setTimeout(() => {
        document.getElementById('slide3Continue').style.display = 'block';
        document.getElementById('slide3Continue').style.animation = 'fadeIn 0.8s ease-in-out';
    }, 5500);
}

// Slide 4: Birthday Celebration
function cutCake() {
    playSound('buttonClick');
    const celebrationDiv = document.getElementById('celebration');
    celebrationDiv.classList.remove('hidden');
    celebrationDiv.style.animation = 'fadeIn 0.8s ease-in-out';
    
    createConfetti();
    createFireworks();
    
    playSound('celebration');
    setTimeout(() => {
        playSound('sparkle');
    }, 400);
    setTimeout(() => {
        playSound('celebration');
    }, 800);
}

// Slide 5: A World That Smiles Because of You
function initSlide5() {
    const galleryPhotos = document.getElementById('galleryPhotos');
    const galleryText = document.getElementById('galleryText');
    galleryPhotos.innerHTML = '';
    
    let photoIndex = 0;
    const photos = ['photo1', 'photo2', 'photo3'];
    
    const showNextGalleryPhoto = () => {
        if (photoIndex < 3) {
            const img = document.createElement('img');
            img.src = `assets/images/slide5/${photos[photoIndex]}.jpg`;
            img.className = 'gallery-photo';
            img.alt = `Devamithra photo ${photoIndex + 1}`;
            img.style.animation = 'fadeInScale 1s ease-in-out';
            galleryPhotos.appendChild(img);
            
            galleryText.style.animation = 'fadeIn 0.8s ease-in-out';
            galleryText.textContent = slide5Texts[photoIndex];
            playSound('photoAppear');
            
            photoIndex++;
            setTimeout(showNextGalleryPhoto, animationConfig.photoDisplayDuration);
        } else {
            galleryText.style.animation = 'fadeOut 0.5s ease-in-out forwards';
            setTimeout(() => {
                galleryText.innerHTML = "Every picture tells a story...<br><br>But none of them can fully capture the wonderful person you are.";
                galleryText.style.animation = 'fadeIn 0.8s ease-in-out';
                playSound('heartbeat');
                
                setTimeout(() => {
                    document.getElementById('slide5Continue').style.display = 'block';
                    document.getElementById('slide5Continue').style.animation = 'fadeIn 0.8s ease-in-out';
                }, 800);
            }, 500);
        }
    };
    
    showNextGalleryPhoto();
}

// Slide 6: Someone Watching Over You
function initSlide6() {
    playSound('heartbeat');
    const fatherPhoto = document.getElementById('fatherPhoto');
    const tributeText = document.getElementById('tributeText');
    
    fatherPhoto.innerHTML = '';
    const img = document.createElement('img');
    img.src = 'assets/images/slide6/father.jpg';
    img.alt = 'Father photo';
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.borderRadius = '15px';
    img.style.animation = 'fadeInScale 1.2s ease-in-out';
    fatherPhoto.appendChild(img);
    
    tributeText.style.animation = 'fadeIn 1s ease-in-out 0.5s both';
    tributeText.innerHTML = `
        Some bonds never fade.<br><br>
        Some love never leaves.<br><br>
        Even though your dad isn't here today...<br>
        His love will always stay with you.<br><br>
        I hope birthdays remind you not only of what you've lost...<br>
        But also of all the love that continues to surround you.<br><br>
        Whenever life feels heavy...<br>
        Remember you don't have to face it alone.<br><br>
        I'll always be here as a friend...<br>
        Supporting you. Cheering for you.<br>
        Hoping to see you smile.<br><br>
        <br>Some people may be out of sight...<br>
        But never out of love.
    `;
    
    setTimeout(() => {
        playSound('sparkle');
        document.getElementById('slide6Continue').style.display = 'block';
        document.getElementById('slide6Continue').style.animation = 'fadeIn 0.8s ease-in-out';
    }, 3500);
}

// Slide 7: One Last Gift
function initSlide7() {
    const giftText = document.getElementById('giftText');
    const giftContent = document.getElementById('giftContent');
    
    giftText.textContent = 'Should we open it? 🎁';
    giftText.style.animation = 'fadeIn 0.8s ease-in-out';
    playSound('gift');
    
    setTimeout(() => {
        giftContent.classList.remove('hidden');
        giftContent.style.animation = 'fadeIn 1s ease-in-out';
        playSound('celebration');
        
        giftContent.innerHTML = `
            <img src="assets/images/slide7/selfie.jpg" class="gift-photo" alt="Selfie together" style="animation: fadeInScale 1s ease-in-out;">
            <p style="color: var(--dark-pink); font-size: 1.1rem; animation: fadeIn 0.8s ease-in-out 0.3s both;">
                No matter where life takes us...<br>
                I hope we always find our way back to the friendship that made so many moments special.
            </p>
            <img src="assets/images/slide7/walking.jpg" class="gift-photo" alt="Walking feet" style="animation: fadeInScale 1s ease-in-out 0.5s both;">
            <p style="color: var(--dark-pink); font-size: 1.1rem; animation: fadeIn 0.8s ease-in-out 0.8s both;">
                No matter what happens to you...<br>
                No matter what you do...<br>
                I'll always be here for you. 🐼
            </p>
            <p style="color: var(--gold); font-size: 1.1rem; margin-top: 2rem; animation: fadeIn 0.8s ease-in-out 1.1s both;">
                Some gifts aren't wrapped with ribbons...<br>
                They're wrapped with memories.
            </p>
        `;
        
        setTimeout(() => {
            document.getElementById('slide7Continue').style.display = 'block';
            document.getElementById('slide7Continue').style.animation = 'fadeIn 0.8s ease-in-out';
        }, 2500);
    }, 1800);
}

// Slide 8: Goodbye
function initSlide8() {
    playSound('celebration');
    const finalText = document.getElementById('finalText');
    
    finalText.style.animation = 'fadeIn 1s ease-in-out';
    finalText.innerHTML = `
        <h2 style="font-size: 2rem; margin-bottom: 1.5rem;">Happy Birthday Devamithra ❤️</h2>
        <p>Thank you for being such a wonderful friend.</p>
        <p>I hope this little adventure made you smile.</p>
        <p style="margin-top: 2rem;">May this year bring you happiness, good health, peace, and countless beautiful memories.</p>
        <p style="margin-top: 2rem;">Some birthdays are celebrated with gifts...<br>
        Some are celebrated with memories...<br>
        This one was celebrated with both.</p>
    `;
    
    setTimeout(() => {
        const peekPanda = document.querySelector('.peek-panda');
        peekPanda.textContent = '👀';
        peekPanda.style.animation = 'peek 2s ease-in-out infinite';
        playSound('panda');
        
        setTimeout(() => {
            finalText.style.animation = 'fadeOut 0.5s ease-in-out forwards';
            setTimeout(() => {
                finalText.innerHTML += `<br><br><br>Psst...<br>Don't forget to smile today...<br>Happy Birthday!! 🐼🎂`;
                finalText.style.animation = 'fadeIn 1s ease-in-out';
                playSound('sparkle');
                
                setTimeout(() => {
                    peekPanda.textContent = '🐼';
                    peekPanda.style.animation = 'none';
                }, 1000);
            }, 500);
        }, 1800);
    }, 2500);
}

// Utility Functions
function nextSlide() {
    playSound('buttonClick');
    if (currentSlide < totalSlides) {
        showSlide(currentSlide + 1);
    } else {
        showNotification('🎉 Thank you for celebrating! 🎉', 2000);
        setTimeout(() => {
            location.reload();
        }, 2500);
    }
}

function typeWriter(element, text, speed) {
    element.innerHTML = '';
    let i = 0;
    let htmlBuffer = '';
    let inTag = false;
    let lastTime = Date.now();
    
    function type() {
        const currentTime = Date.now();
        const delta = currentTime - lastTime;
        
        if (delta >= speed) {
            if (i < text.length) {
                const char = text.charAt(i);
                
                // Check if we're entering or exiting an HTML tag
                if (char === '<') {
                    inTag = true;
                }
                if (char === '>') {
                    inTag = false;
                }
                
                // If we're in a tag, add the character directly
                // Otherwise, add it normally
                if (inTag || char === '<' || char === '>') {
                    htmlBuffer += char;
                } else if (char === '\n' || char === '\r') {
                    // Skip newlines/carriage returns
                    htmlBuffer += '';
                } else {
                    htmlBuffer += char;
                }
                
                element.innerHTML = htmlBuffer;
                i++;
                lastTime = currentTime;
            }
        }
        
        if (i < text.length) {
            requestAnimationFrame(type);
        }
    }
    
    type();
}

function createConfetti() {
    const colors = ['🎉', '🎊', '❤️', '💖', '✨', '🌸'];
    
    for (let i = 0; i < 40; i++) {
        const confetti = document.createElement('div');
        confetti.textContent = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.position = 'fixed';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.fontSize = '1.5rem';
        confetti.style.zIndex = '999';
        confetti.style.pointerEvents = 'none';
        
        const duration = 2 + Math.random() * 2;
        confetti.style.animation = `fall ${duration}s linear forwards`;
        document.body.appendChild(confetti);
        
        if (Math.random() > 0.6) {
            setTimeout(() => {
                playSound('sparkle');
            }, i * 40);
        }
        
        setTimeout(() => {
            confetti.style.animation = 'fadeOut 0.5s ease-in-out forwards';
            setTimeout(() => confetti.remove(), 500);
        }, (duration - 0.5) * 1000);
    }
}

function createFireworks() {
    const fireworks = ['🎆', '✨', '💥', '⭐'];
    
    for (let i = 0; i < 25; i++) {
        const fw = document.createElement('div');
        fw.textContent = fireworks[Math.floor(Math.random() * fireworks.length)];
        fw.style.position = 'fixed';
        fw.style.left = Math.random() * 100 + '%';
        fw.style.top = Math.random() * 50 + '%';
        fw.style.fontSize = '2rem';
        fw.style.zIndex = '999';
        fw.style.pointerEvents = 'none';
        fw.style.animation = `zoomIn 1.2s ease-out forwards`;
        document.body.appendChild(fw);
        
        setTimeout(() => {
            fw.style.animation = 'fadeOut 0.6s ease-out forwards';
            setTimeout(() => fw.remove(), 600);
        }, 1200);
    }
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
        nextSlide();
    } else if (e.key === 'ArrowLeft') {
        if (currentSlide > 1) {
            playSound('buttonClick');
            showSlide(currentSlide - 1);
        }
    }
});

// Performance optimization
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('*').forEach(el => {
        el.style.animationDuration = '0.01ms !important';
    });
}

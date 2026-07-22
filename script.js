let currentSlide = 1;
const totalSlides = 8;
const music = document.getElementById('bgMusic');
const loadingScreen = document.getElementById('loadingScreen');
const mainContainer = document.getElementById('mainContainer');

// Sound Effects System
const soundEffects = {
    slideTransition: null,
    buttonClick: null,
    photoAppear: null,
    celebration: null,
    sparkle: null,
    heartbeat: null,
    gift: null,
    panda: null
};

// Initialize audio context for sound generation
let audioContext = null;

function initAudioContext() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioContext;
}

// Generate sound effect using Web Audio API
function playTone(frequency, duration, type = 'sine', volume = 0.3) {
    try {
        const ctx = initAudioContext();
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        oscillator.frequency.value = frequency;
        oscillator.type = type;
        
        gainNode.gain.setValueAtTime(volume, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
        
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + duration);
    } catch (e) {
        console.log('Audio playback error:', e);
    }
}

// Sound effect: Button Click
function soundButtonClick() {
    playTone(800, 0.1, 'sine', 0.2);
    setTimeout(() => {
        playTone(1000, 0.1, 'sine', 0.2);
    }, 50);
}

// Sound effect: Slide Transition
function soundSlideTransition() {
    playTone(400, 0.2, 'sine', 0.15);
    setTimeout(() => {
        playTone(500, 0.15, 'sine', 0.15);
    }, 100);
}

// Sound effect: Photo Appear
function soundPhotoAppear() {
    playTone(600, 0.15, 'sine', 0.2);
}

// Sound effect: Celebration/Sparkle
function soundCelebration() {
    const notes = [523, 659, 784, 1047]; // C, E, G, C (High)
    notes.forEach((freq, index) => {
        setTimeout(() => {
            playTone(freq, 0.2, 'sine', 0.25);
        }, index * 100);
    });
}

// Sound effect: Sparkle/Twinkle
function soundSparkle() {
    playTone(1200, 0.08, 'sine', 0.2);
    setTimeout(() => {
        playTone(1400, 0.08, 'sine', 0.2);
    }, 80);
}

// Sound effect: Heartbeat
function soundHeartbeat() {
    playTone(150, 0.15, 'sine', 0.25);
    setTimeout(() => {
        playTone(150, 0.15, 'sine', 0.25);
    }, 150);
}

// Sound effect: Gift Open
function soundGiftOpen() {
    playTone(800, 0.1, 'sine', 0.2);
    setTimeout(() => {
        playTone(1000, 0.15, 'sine', 0.2);
    }, 100);
    setTimeout(() => {
        playTone(1200, 0.2, 'sine', 0.25);
    }, 250);
}

// Sound effect: Happy Panda
function soundPanda() {
    playTone(700, 0.1, 'sine', 0.2);
    setTimeout(() => {
        playTone(800, 0.1, 'sine', 0.2);
    }, 100);
}

// Main playSound function
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
        default:
            console.log(`Sound type not found: ${type}`);
    }
}

// Photo texts for Slide 2
const slide2Texts = [
    "Before we celebrate today...",
    "There's someone I'd love to introduce...",
    "Someone whose smile can brighten even ordinary days.",
    "Someone who doesn't even try to be beautiful..."
];

const slide2TextsCont = [
    "Yet somehow always is.",
    "Some people don't just walk into your life...",
    "They quietly become a part of it.",
    "Out of everyone I could've met...\nI'm grateful life introduced me to you."
];

// Slide 5 texts
const slide5Texts = [
    "Strength looks beautiful on you...",
    "You don't need to try to shine...",
    "Never forget how amazing you are..."
];

// Initialize
window.addEventListener('load', () => {
    setTimeout(() => {
        startExperience();
    }, 4000);
});

function startExperience() {
    loadingScreen.classList.add('hidden');
    mainContainer.classList.remove('hidden');
    music.play().catch(e => console.log('Audio play failed:', e));
    showSlide(1);
    playSound('slideTransition');
}

function showSlide(slideNum) {
    // Hide all slides
    document.querySelectorAll('.slide').forEach(slide => {
        slide.classList.add('hidden');
    });
    
    // Show current slide
    const slide = document.getElementById(`slide${slideNum}`);
    if (slide) {
        slide.classList.remove('hidden');
    }

    currentSlide = slideNum;
    playSound('slideTransition');

    // Slide-specific logic
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
}

// Slide 1: Friendship Test
function handleYes() {
    playSound('buttonClick');
    const panda = document.getElementById('pandaSlide1');
    panda.classList.add('happy');
    
    // Play celebration sounds
    setTimeout(() => {
        playSound('celebration');
        playSound('sparkle');
    }, 100);
    
    // Confetti and celebration
    createConfetti();
    
    setTimeout(() => {
        alert('YAY!! I knew it!! 🐼💖');
        nextSlide();
    }, 1000);
}

function handleNo() {
    playSound('panda');
    alert('HOW DARE YOU!! 😤\n\nTry that again... 😒👉');
}

// Slide 2: Someone Truly Special
function initSlide2() {
    const photoContainer = document.getElementById('photoContainer');
    const photoText = document.getElementById('photoText');
    photoContainer.innerHTML = '';
    
    let photoIndex = 0;
    const showNextPhoto = () => {
        if (photoIndex < 4) {
            const img = document.createElement('img');
            img.src = `assets/images/slide2/photo${photoIndex + 1}.jpg`;
            img.className = 'photo-frame';
            img.alt = `Devamithra photo ${photoIndex + 1}`;
            photoContainer.appendChild(img);
            
            photoText.textContent = slide2Texts[photoIndex];
            playSound('photoAppear');
            
            photoIndex++;
            setTimeout(showNextPhoto, 2000);
        } else {
            photoText.innerHTML = "<br><br>Tiny panda whispers: <br>\"I think she's really special...\" 🐼";
            playSound('heartbeat');
            setTimeout(() => {
                document.getElementById('slide2Continue').classList.remove('hidden');
            }, 1500);
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
    
    typeWriter(letterContent, letter, 50);
    
    setTimeout(() => {
        document.getElementById('slide3Continue').style.display = 'block';
    }, 5000);
}

// Slide 4: Birthday Celebration
function cutCake() {
    playSound('buttonClick');
    const celebrationDiv = document.getElementById('celebration');
    celebrationDiv.classList.remove('hidden');
    
    // Create confetti
    createConfetti();
    createFireworks();
    
    // Play celebration sounds sequentially
    playSound('celebration');
    setTimeout(() => {
        playSound('sparkle');
    }, 300);
    setTimeout(() => {
        playSound('celebration');
    }, 600);
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
            galleryPhotos.appendChild(img);
            
            galleryText.textContent = slide5Texts[photoIndex];
            playSound('photoAppear');
            
            photoIndex++;
            setTimeout(showNextGalleryPhoto, 2000);
        } else {
            galleryText.innerHTML = "Every picture tells a story...\n<br>But none of them can fully capture the wonderful person you are.";
            playSound('heartbeat');
            setTimeout(() => {
                document.getElementById('slide5Continue').style.display = 'block';
            }, 1500);
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
    fatherPhoto.appendChild(img);
    
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
    }, 3000);
}

// Slide 7: One Last Gift
function initSlide7() {
    const giftText = document.getElementById('giftText');
    const giftContent = document.getElementById('giftContent');
    
    giftText.textContent = 'Should we open it? 🎁';
    playSound('gift');
    
    setTimeout(() => {
        // Show gift photos and message
        giftContent.classList.remove('hidden');
        playSound('celebration');
        
        giftContent.innerHTML = `
            <img src="assets/images/slide7/selfie.jpg" class="gift-photo" alt="Selfie together">
            <p style="color: var(--dark-pink); font-size: 1.1rem;">
                No matter where life takes us...<br>
                I hope we always find our way back to the friendship that made so many moments special.
            </p>
            <img src="assets/images/slide7/walking.jpg" class="gift-photo" alt="Walking feet">
            <p style="color: var(--dark-pink); font-size: 1.1rem;">
                No matter what happens to you...<br>
                No matter what you do...<br>
                I'll always be here for you. 🐼
            </p>
            <p style="color: var(--gold); font-size: 1.1rem; margin-top: 2rem;">
                Some gifts aren't wrapped with ribbons...<br>
                They're wrapped with memories.
            </p>
        `;
        
        setTimeout(() => {
            document.getElementById('slide7Continue').style.display = 'block';
        }, 2000);
    }, 1500);
}

// Slide 8: Goodbye
function initSlide8() {
    playSound('celebration');
    const finalText = document.getElementById('finalText');
    
    finalText.innerHTML = `
        <h2 style="font-size: 2rem; margin-bottom: 1.5rem;">Happy Birthday Devamithra ❤️</h2>
        <p>Thank you for being such a wonderful friend.</p>
        <p>I hope this little adventure made you smile.</p>
        <p style="margin-top: 2rem;">May this year bring you happiness, good health, peace, and countless beautiful memories.</p>
        <p style="margin-top: 2rem;">Some birthdays are celebrated with gifts...<br>
        Some are celebrated with memories...<br>
        This one was celebrated with both.</p>
    `;
    
    // Panda peeks from corner
    setTimeout(() => {
        const peekPanda = document.querySelector('.peek-panda');
        peekPanda.textContent = '👀';
        playSound('panda');
        setTimeout(() => {
            finalText.innerHTML += `<br><br><br>Psst...<br>Don't forget to smile today...<br>Happy Birthday!! 🐼🎂`;
            playSound('sparkle');
            setTimeout(() => {
                peekPanda.textContent = '🐼';
                peekPanda.style.animation = 'none';
            }, 1000);
        }, 1500);
    }, 2000);
}

// Utility Functions
function nextSlide() {
    playSound('buttonClick');
    if (currentSlide < totalSlides) {
        showSlide(currentSlide + 1);
    } else {
        alert('🎉 Thank you for celebrating! 🎉');
        location.reload();
    }
}

function typeWriter(element, text, speed) {
    element.innerHTML = '';
    let i = 0;
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

function createConfetti() {
    const colors = ['🎉', '🎊', '❤️', '💖', '✨', '🌸'];
    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement('div');
        confetti.textContent = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.position = 'fixed';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.fontSize = '1.5rem';
        confetti.style.zIndex = '999';
        confetti.style.animation = `fall ${2 + Math.random() * 2}s linear forwards`;
        document.body.appendChild(confetti);
        
        // Play sparkle sound for some confetti
        if (Math.random() > 0.7) {
            setTimeout(() => {
                playSound('sparkle');
            }, i * 50);
        }
        
        setTimeout(() => confetti.remove(), 4000);
    }
}

function createFireworks() {
    const fireworks = ['🎆', '✨', '💥', '⭐'];
    for (let i = 0; i < 20; i++) {
        const fw = document.createElement('div');
        fw.textContent = fireworks[Math.floor(Math.random() * fireworks.length)];
        fw.style.position = 'fixed';
        fw.style.left = Math.random() * 100 + '%';
        fw.style.top = Math.random() * 50 + '%';
        fw.style.fontSize = '2rem';
        fw.style.zIndex = '999';
        fw.style.animation = `zoomIn 1s ease-out forwards`;
        document.body.appendChild(fw);
        
        setTimeout(() => fw.remove(), 1500);
    }
}

// Allow keyboard navigation
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
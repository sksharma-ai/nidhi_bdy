// Reasons database
const reasons = [
    { 
        text: "Event ke Day 1 pe hi tu mujhse bhadak gayi thi... par somehow wahan se lekar aaj tak best friends ban gaye. Legendary character development. 😂", 
        emoji: "🔥",
        gif: "gif1.gif"
    },
    { 
        text: "Best Discord movie partner—chahe 'Martyrs' ka trauma jhelna ho ya pure brainrot dekhna ho. Bas Mumbai ka Wi-Fi thoda sudhar le taaki 'Hidden Figures' khatam kar sakein! 🎬", 
        emoji: "🍿",
        gif: "gif2.gif"
    },
    { 
        text: "The one person jiske saamne main bina soche apne random aur deep thoughts share kar sakta hoon, jo shayad kisi aur ko kabhi na bataun. 🫂", 
        emoji: "💭",
        gif: "gif1.gif"
    },
    { 
        text: "Full-time bakchod, zero filter, aur sabse chill insaan. Jab bhi saath hote hain, boredom ka koi chance hi nahi hota. Happy Birthday Nidhi! 🥳", 
        emoji: "🎂",
        gif: "gif2.gif"
    }
];

// State management
let currentReasonIndex = 0;
const reasonsContainer = document.getElementById('reasons-container');
const shuffleButton = document.querySelector('.shuffle-button');
const reasonCounter = document.querySelector('.reason-counter');
let isTransitioning = false;
let isStoryMode = false;

// Create reason card with cat hover overlay
function createReasonCard(reason) {
    const card = document.createElement('div');
    card.className = 'reason-card';
    
    const text = document.createElement('div');
    text.className = 'reason-text';
    text.innerHTML = `${reason.emoji} ${reason.text}`;
    
    const gifOverlay = document.createElement('div');
    gifOverlay.className = 'gif-overlay';
    gifOverlay.innerHTML = `<img src="${reason.gif}" alt="Cat Reaction">`;
    
    card.appendChild(text);
    card.appendChild(gifOverlay);
    
    gsap.from(card, {
        opacity: 0,
        y: 50,
        duration: 0.5,
        ease: "back.out"
    });

    return card;
}

// Display new reason
function displayNewReason() {
    if (isTransitioning) return;
    isTransitioning = true;

    if (currentReasonIndex < reasons.length) {
        const card = createReasonCard(reasons[currentReasonIndex]);
        reasonsContainer.appendChild(card);
        
        reasonCounter.textContent = `Reason ${currentReasonIndex + 1} of ${reasons.length}`;
        currentReasonIndex++;

        // Reveal ending photo + transform button on final card
        if (currentReasonIndex === reasons.length) {
            isStoryMode = true;
            
            gsap.to('.teddy-hug', {
                scale: 1,
                duration: 0.8,
                ease: "back.out(1.7)"
            });

            gsap.to('.ending-text', {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: 0.3
            });

            gsap.to(shuffleButton, {
                scale: 1.1,
                duration: 0.5,
                ease: "elastic.out",
                onComplete: () => {
                    shuffleButton.textContent = "Aage Dekh (Memories & Chaos) 💫";
                    shuffleButton.classList.add('story-mode');
                }
            });
        }

        createFloatingElement();
        
        setTimeout(() => {
            isTransitioning = false;
        }, 500);
    }
}

// Single clean click handler
shuffleButton.addEventListener('click', () => {
    if (isStoryMode) {
        gsap.to('body', {
            opacity: 0,
            duration: 1,
            onComplete: () => {
                window.location.href = 'last.html';
            }
        });
        return;
    }

    gsap.to(shuffleButton, {
        scale: 0.9,
        duration: 0.1,
        yoyo: true,
        repeat: 1
    });
    displayNewReason();
});

// Floating elements
function createFloatingElement() {
    const elements = ['🎉', '✨', '🎂', '🍿', '🔥'];
    const element = document.createElement('div');
    element.className = 'floating';
    element.textContent = elements[Math.floor(Math.random() * elements.length)];
    element.style.left = Math.random() * window.innerWidth + 'px';
    element.style.top = Math.random() * window.innerHeight + 'px';
    element.style.fontSize = (Math.random() * 20 + 10) + 'px';
    document.body.appendChild(element);

    gsap.to(element, {
        y: -500,
        duration: Math.random() * 10 + 10,
        opacity: 0,
        onComplete: () => element.remove()
    });
}

// Custom cursor
const cursor = document.querySelector('.custom-cursor');
document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX - 15,
        y: e.clientY - 15,
        duration: 0.2
    });
});

setInterval(createFloatingElement, 2000);
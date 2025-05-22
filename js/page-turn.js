function animatePageTurn(direction) {
    const bookContent = document.querySelector('.book-content');
    const leftPage = document.querySelector('.left-page');
    const rightPage = document.querySelector('.right-page');
    
    // Reset animasi
    bookContent.style.animation = 'none';
    leftPage.style.animation = 'none';
    rightPage.style.animation = 'none';
    void bookContent.offsetWidth; // Trigger reflow
    
    if (direction === 'next') {
        // Animasi untuk halaman berikutnya
        rightPage.style.animation = 'turnPageRight 1s forwards';
        setTimeout(() => {
            leftPage.style.animation = 'fadeInLeft 0.5s forwards';
        }, 500);
    } else {
        // Animasi untuk halaman sebelumnya
        leftPage.style.animation = 'turnPageLeft 1s forwards';
        setTimeout(() => {
            rightPage.style.animation = 'fadeInRight 0.5s forwards';
        }, 500);
    }
}

// Tambahkan keyframe animation ke stylesheet
const style = document.createElement('style');
style.innerHTML = `
    @keyframes turnPageRight {
        0% { transform: rotateY(0deg); z-index: 1; }
        50% { transform: rotateY(-90deg); z-index: 1; }
        51% { z-index: 0; }
        100% { transform: rotateY(-180deg); z-index: 0; }
    }
    
    @keyframes turnPageLeft {
        0% { transform: rotateY(0deg); z-index: 1; }
        50% { transform: rotateY(90deg); z-index: 1; }
        51% { z-index: 0; }
        100% { transform: rotateY(180deg); z-index: 0; }
    }
    
    @keyframes fadeInLeft {
        from { opacity: 0; transform: translateX(-20px); }
        to { opacity: 1; transform: translateX(0); }
    }
    
    @keyframes fadeInRight {
        from { opacity: 0; transform: translateX(20px); }
        to { opacity: 1; transform: translateX(0); }
    }
`;
document.head.appendChild(style);

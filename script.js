class Slideshow {
    constructor() {
        this.slides = document.querySelectorAll('.slide');
        this.dots = document.querySelectorAll('.dot');
        this.currentSlide = 1;
        this.totalSlides = this.slides.length;
        this.isAnimating = false;
        this.init();
    }
    
    init() {
        document.querySelectorAll('.next-btn').forEach(btn => 
            btn.addEventListener('click', () => this.nextSlide())
        );
        
        document.querySelectorAll('.prev-btn').forEach(btn => 
            btn.addEventListener('click', () => this.prevSlide())
        );
        
        this.dots.forEach(dot => 
            dot.addEventListener('click', () => {
                const slideNum = parseInt(dot.dataset.slide);
                this.goToSlide(slideNum);
            })
        );
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                this.nextSlide();
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                this.prevSlide();
            }
        });

        // Mouse wheel navigation — one slide per scroll gesture
        const slideshowEl = document.querySelector('.slideshow');
        let accumulatedDelta = 0;
        let wheelTimeout = null;
        const DELTA_THRESHOLD = 50;
        if (slideshowEl) {
            slideshowEl.addEventListener('wheel', (e) => {
                e.preventDefault();
                if (this.isAnimating) return;

                accumulatedDelta += e.deltaY || e.deltaX;
                clearTimeout(wheelTimeout);
                wheelTimeout = setTimeout(() => { accumulatedDelta = 0; }, 200);

                if (accumulatedDelta > DELTA_THRESHOLD) {
                    accumulatedDelta = 0;
                    this.nextSlide();
                } else if (accumulatedDelta < -DELTA_THRESHOLD) {
                    accumulatedDelta = 0;
                    this.prevSlide();
                }
            }, { passive: false });
        }

        // Touch swipe navigation
        let touchStartX = 0;
        let touchStartY = 0;
        if (slideshowEl) {
            slideshowEl.addEventListener('touchstart', (e) => {
                touchStartX = e.touches[0].clientX;
                touchStartY = e.touches[0].clientY;
            }, { passive: true });

            slideshowEl.addEventListener('touchend', (e) => {
                const deltaX = e.changedTouches[0].clientX - touchStartX;
                const deltaY = e.changedTouches[0].clientY - touchStartY;
                const absDeltaX = Math.abs(deltaX);
                const absDeltaY = Math.abs(deltaY);

                // Require minimum 50px swipe and primarily horizontal
                if (absDeltaX > 50 && absDeltaX > absDeltaY) {
                    if (deltaX < 0) {
                        this.nextSlide();
                    } else {
                        this.prevSlide();
                    }
                }
            }, { passive: true });
        }
    }
    
    goToSlide(slideNum) {
        if (this.isAnimating || slideNum === this.currentSlide) return;
        if (slideNum < 1 || slideNum > this.totalSlides) return;
        
        this.isAnimating = true;
        
        this.slides[this.currentSlide - 1].classList.remove('active');
        this.dots[this.currentSlide - 1].classList.remove('active');
        
        this.currentSlide = slideNum;
        
        this.slides[this.currentSlide - 1].classList.add('active');
        this.dots[this.currentSlide - 1].classList.add('active');
        
        setTimeout(() => { this.isAnimating = false; }, 500);
    }
    
    nextSlide() { 
        if (this.currentSlide < this.totalSlides) {
            this.goToSlide(this.currentSlide + 1); 
        }
    }
    
    prevSlide() { 
        if (this.currentSlide > 1) {
            this.goToSlide(this.currentSlide - 1); 
        }
    }
}

document.addEventListener('DOMContentLoaded', () => { new Slideshow(); });

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

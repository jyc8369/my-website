document.addEventListener('DOMContentLoaded', function() {
    // 네비게이션 링크에 클릭 이벤트 리스너 추가
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    const projectCards = document.querySelectorAll('.project-card');
    
    // 프로젝트 카드가 화면에 나타날 때 페이드인 효과
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });

    projectCards.forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease-out';
        observer.observe(card);
    });

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    animatedElements.forEach(element => {
        scrollObserver.observe(element);
    });

    // 마우스 움직임에 따른 시차 효과
    document.addEventListener('mousemove', (e) => {
        const hero = document.querySelector('.hero');
        const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
        
        hero.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });

    // 커스텀 커서
    const cursor = document.querySelector('.cursor');
    document.addEventListener('mousemove', (e) => {
        cursor.style.transform = `translate(${e.clientX - 10}px, ${e.clientY - 10}px)`;
    });

    // 텍스트 분할 애니메이션
    document.querySelectorAll('.split-text').forEach(text => {
        let splitText = text.textContent.split('');
        text.textContent = '';
        splitText.forEach((char, i) => {
            let span = document.createElement('span');
            span.textContent = char;
            span.style.animationDelay = `${i * 0.05}s`;
            text.appendChild(span);
        });
    });

    // 스크롤 애니메이션
    const textObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('[data-scroll]').forEach(el => textObserver.observe(el));

    const cursorDot = document.querySelector('.cursor-dot');
    const cursorCircle = document.querySelector('.cursor-circle');

    document.addEventListener('mousemove', (e) => {
        cursorDot.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
        cursorCircle.style.transform = `translate(${e.clientX - 20}px, ${e.clientY - 20}px)`;
    });

    document.querySelectorAll('a, button, .project-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorCircle.style.transform = 'scale(1.5)';
            cursorCircle.style.opacity = '0.5';
        });
        el.addEventListener('mouseleave', () => {
            cursorCircle.style.transform = 'scale(1)';
            cursorCircle.style.opacity = '1';
        });
    });

    // Smooth scroll
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    gsap.registerPlugin(ScrollTrigger);
    
    // 초기 로딩 애니메이션
    const tl = gsap.timeline();
    
    tl.to('.loader', {
        opacity: 0,
        duration: 1,
        onComplete: () => document.querySelector('.loader').style.display = 'none'
    })
    .from('.line-mask', {
        yPercent: 100,
        duration: 1.5,
        stagger: 0.2,
        ease: 'power4.out'
    })
    .from('.hero-subtitle', {
        opacity: 0,
        y: 20,
        duration: 1
    }, '-=1');

    // About 섹션 애니메이션
    gsap.from('.about-content', {
        scrollTrigger: {
            trigger: '.about',
            start: 'top center',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 100,
        duration: 1.5
    });

    // 프로젝트 아이템 애니메이션
    gsap.utils.toArray('.work-item').forEach((item, i) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top bottom',
                end: 'center center',
                scrub: 1,
            },
            opacity: 0,
            y: 100,
            duration: 1
        });

        // 이미지 시차 효과
        gsap.to(item.querySelector('img'), {
            scrollTrigger: {
                trigger: item,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            },
            y: -50
        });
    });

    // Contact 섹션 애니메이션
    gsap.from('.contact-links a', {
        scrollTrigger: {
            trigger: '.contact',
            start: 'top center'
        },
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.2
    });

    // 마우스 움직임에 따른 시차 효과
    document.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const xPos = (clientX - window.innerWidth / 2) * 0.02;
        const yPos = (clientY - window.innerHeight / 2) * 0.02;

        gsap.to('.hero-content', {
            x: xPos,
            y: yPos,
            duration: 1
        });
    });

    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        document.documentElement.style.setProperty('--mouse-x', `${x}%`);
        document.documentElement.style.setProperty('--mouse-y', `${y}%`);
    });

    // 모든 페이지의 base-background 애니메이션 처리
    document.addEventListener('DOMContentLoaded', () => {
        const baseBackground = document.querySelector('.base-background');
        if (baseBackground) {
            window.addEventListener('scroll', () => {
                const scrolled = window.scrollY;
                const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
                const scrollPercent = (scrolled / maxScroll) * 100;
                
                baseBackground.style.animationPlayState = 
                    scrolled > 0 ? 'running' : 'paused';
            });
        }
    });

    // 스크롤 애니메이션 처리
    document.addEventListener('DOMContentLoaded', () => {
        const baseBackground = document.querySelector('.base-background');
        let lastScrollY = window.scrollY;
        let animationFrameId = null;
        let lastTime = 0;
        
        const lerp = (start, end, factor) => {
            return start * (1 - factor) + end * factor;
        };

        const updateBackground = (currentTime) => {
            if (!lastTime) lastTime = currentTime;
            const deltaTime = currentTime - lastTime;
            const scrolled = window.scrollY;
            
            // 부드러운 움직임을 위한 보간
            lastScrollY = lerp(lastScrollY, scrolled, 0.1);
            
            const xOffset = lastScrollY * 0.1;
            const yOffset = lastScrollY * 0.1;

            baseBackground.style.backgroundPosition = `
                ${-xOffset}px ${-yOffset}px,
                ${xOffset}px ${-yOffset * 1.2}px,
                ${-xOffset * 1.1}px ${yOffset}px,
                ${xOffset * 0.9}px ${yOffset * 1.1}px,
                center,
                center
            `;

            lastTime = currentTime;
            animationFrameId = requestAnimationFrame(updateBackground);
        };

        window.addEventListener('scroll', () => {
            if (!animationFrameId) {
                animationFrameId = requestAnimationFrame(updateBackground);
            }
        });

        // 스크롤이 멈췄을 때 부드럽게 정지
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                cancelAnimationFrame(animationFrameId);
                animationFrameId = null;
                lastTime = 0;
            }, 150);
        });
    });
});

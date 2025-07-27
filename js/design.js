// File: js/design.js

document.addEventListener('DOMContentLoaded', () => {

    const columns = document.querySelectorAll('.scrolling-column-content');

    columns.forEach(column => {
        // Ambil semua item di dalam kolom
        const items = Array.from(column.children);
        
        // Duplikasi setiap item dan tambahkan ke akhir kolom
        items.forEach(item => {
            const clone = item.cloneNode(true);
            column.appendChild(clone);
        });
    });

});

const swiper = new Swiper('.video-swiper', {
    slidesPerView: 3,
    slidesPerGroup: 1,
    centeredSlides: false,
  
    loop: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: false,
    breakpoints: {
        0: { slidesPerView: 1,  },
        600: { slidesPerView: 2, },
        900: { slidesPerView: 3,}
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    // Semua elemen yang ingin dianimasikan
    document.querySelectorAll('.animate-pop-in').forEach(el => {
        observer.observe(el);
    });
    // Semua elemen yang ingin dianimasikan
    document.querySelectorAll('.animate-pop-ind').forEach(el => {
        observer.observe(el);
    });
});



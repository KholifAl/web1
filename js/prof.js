


document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.querySelector('.winmacstore-horizontal-gallery');
    const prevBtn = document.getElementById('winmacPrev');
    const nextBtn = document.getElementById('winmacNext');
    if (!gallery) return;

    // Infinite loop: clone items at start and end
    const items = Array.from(gallery.children);
    const cloneCount = items.length;
    items.forEach(item => {
        const cloneStart = item.cloneNode(true);
        const cloneEnd = item.cloneNode(true);
        cloneStart.classList.add('clone');
        cloneEnd.classList.add('clone');
        gallery.insertBefore(cloneStart, gallery.firstChild);
        gallery.appendChild(cloneEnd);
    });

    // Set initial scroll to first real item
    function getItemWidth() {
        const item = gallery.querySelector('.gallery-item');
        return item ? item.offsetWidth + 32 : 260 + 32; // 32px gap
    }
    function scrollToRealStart(behavior = 'auto') {
        gallery.scrollTo({ left: getItemWidth() * cloneCount, behavior });
    }
    scrollToRealStart('auto');

    // Arrow navigation: scroll by one page (gallery.clientWidth)
    prevBtn.addEventListener('click', () => {
        gallery.scrollBy({ left: -gallery.clientWidth, behavior: 'smooth' });
    });
    nextBtn.addEventListener('click', () => {
        gallery.scrollBy({ left: gallery.clientWidth, behavior: 'smooth' });
    });

    // Infinite scroll logic
    gallery.addEventListener('scroll', () => {
        const maxScroll = getItemWidth() * (cloneCount * 2);
        if (gallery.scrollLeft < getItemWidth() * 0.5) {
            // Jump to real items at end
            gallery.scrollLeft += getItemWidth() * cloneCount;
        } else if (gallery.scrollLeft > maxScroll - getItemWidth() * 0.5) {
            // Jump to real items at start
            gallery.scrollLeft -= getItemWidth() * cloneCount;
        }
        updateArrowState();
    });

    // Drag to scroll (left mouse only)
    let isLeftDown = false;
    let startX;
    let scrollLeft;
    gallery.addEventListener('mousedown', (e) => {
        if (e.button !== 0) return; // Only left mouse button
        isLeftDown = true;
        startX = e.pageX - gallery.offsetLeft;
        scrollLeft = gallery.scrollLeft;
        document.body.style.userSelect = 'none';
    });
    gallery.addEventListener('mouseleave', () => {
        if (!isLeftDown) return;
        isLeftDown = false;
        document.body.style.userSelect = '';
        snapToNearest();
    });
    gallery.addEventListener('mouseup', (e) => {
        if (!isLeftDown) return;
        isLeftDown = false;
        document.body.style.userSelect = '';
        snapToNearest();
    });
    gallery.addEventListener('mousemove', (e) => {
        if (!isLeftDown) return;
        e.preventDefault();
        const x = e.pageX - gallery.offsetLeft;
        const walk = (x - startX) * 1.2;
        gallery.scrollLeft = scrollLeft - walk;
    });
    // Touch support (drag with one finger)
    let isTouching = false;
    let touchStartX, touchScrollLeft;
    gallery.addEventListener('touchstart', (e) => {
        isTouching = true;
        touchStartX = e.touches[0].pageX - gallery.offsetLeft;
        touchScrollLeft = gallery.scrollLeft;
    });
    gallery.addEventListener('touchend', () => {
        if (!isTouching) return;
        isTouching = false;
        snapToNearest();
    });
    gallery.addEventListener('touchmove', (e) => {
        if (!isTouching) return;
        const x = e.touches[0].pageX - gallery.offsetLeft;
        const walk = (x - touchStartX) * 1.2;
        gallery.scrollLeft = touchScrollLeft - walk;
    });

    // Snap to nearest item after drag
    function snapToNearest() {
        const items = Array.from(gallery.querySelectorAll('.gallery-item')).slice(cloneCount, -cloneCount);
        if (!items.length) return;
        const galleryRect = gallery.getBoundingClientRect();
        const galleryCenter = galleryRect.left + galleryRect.width / 2;
        let minDist = Infinity;
        let targetScroll = gallery.scrollLeft;
        items.forEach(item => {
            const rect = item.getBoundingClientRect();
            const itemCenter = rect.left + rect.width / 2;
            const dist = Math.abs(itemCenter - galleryCenter);
            if (dist < minDist) {
                minDist = dist;
                // Calculate scrollLeft needed to center this item
                targetScroll = gallery.scrollLeft + (itemCenter - galleryCenter);
            }
        });
        gallery.scrollTo({ left: targetScroll, behavior: 'smooth' });
    }

    // Arrow visibility
    function updateArrowState() {
        // Always show arrows in infinite mode
        prevBtn.classList.remove('hidden');
        nextBtn.classList.remove('hidden');
    }
    updateArrowState();
});






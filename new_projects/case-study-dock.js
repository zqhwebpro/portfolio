// Interactive Dock Drag-to-Scroll (Finger Touch + Mouse Drag)
(function () {
    function initDockScroll() {
        const dockScroll = document.querySelector('.dock-cards-scroll');
        if (!dockScroll) return;

        let isDown = false;
        let startX = 0;
        let scrollLeft = 0;
        let hasDragged = false;

        dockScroll.addEventListener('mousedown', (e) => {
            isDown = true;
            hasDragged = false;
            startX = e.pageX - dockScroll.offsetLeft;
            scrollLeft = dockScroll.scrollLeft;
            dockScroll.classList.add('is-dragging');
        });

        window.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            const x = e.pageX - dockScroll.offsetLeft;
            const walk = (x - startX) * 1.5;
            if (Math.abs(x - startX) > 6) {
                hasDragged = true;
            }
            dockScroll.scrollLeft = scrollLeft - walk;
        });

        window.addEventListener('mouseup', () => {
            if (!isDown) return;
            isDown = false;
            dockScroll.classList.remove('is-dragging');
        });

        // Touch event handling for mobile devices to allow finger dragging
        let touchStartX = 0;
        let touchScrollLeft = 0;
        let touchDragged = false;

        dockScroll.addEventListener('touchstart', (e) => {
            if (e.touches.length === 1) {
                touchStartX = e.touches[0].pageX;
                touchScrollLeft = dockScroll.scrollLeft;
                touchDragged = false;
            }
        }, { passive: true });

        dockScroll.addEventListener('touchmove', (e) => {
            if (e.touches.length === 1) {
                const diff = touchStartX - e.touches[0].pageX;
                if (Math.abs(diff) > 6) {
                    touchDragged = true;
                }
            }
        }, { passive: true });

        // Prevent accidental card navigation when dragging
        dockScroll.querySelectorAll('.dock-card').forEach((card) => {
            card.addEventListener('click', (e) => {
                if (hasDragged || touchDragged) {
                    e.preventDefault();
                    e.stopPropagation();
                    hasDragged = false;
                    touchDragged = false;
                }
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initDockScroll);
    } else {
        initDockScroll();
    }
})();

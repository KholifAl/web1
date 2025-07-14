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
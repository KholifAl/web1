document.addEventListener('DOMContentLoaded', function() {
    const projectItems = document.querySelectorAll('.project-item');
    const detailCards = document.querySelectorAll('.project-detail-card');
    const projectList = document.querySelector('.project-list');

    projectItems.forEach(item => {
        item.addEventListener('click', function() {
            // 1. Dapatkan target ID dari atribut data-target
            const targetId = this.dataset.target;

            // 2. Hapus kelas 'active' dari semua item dan card
            projectItems.forEach(i => i.classList.remove('active'));
            detailCards.forEach(c => c.classList.remove('active'));

            // 3. Tambahkan kelas 'active' ke item yang diklik dan card yang sesuai
            this.classList.add('active');
            document.getElementById(targetId).classList.add('active');
            
            // (Scroll otomatis dinonaktifkan agar scroll tetap diam saat klik project)
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    
    // === FUNGSI UNTUK MEMUAT NAVBAR & MENANDAI LINK AKTIF ===
    const loadNavbar = async () => {
        const navbarPlaceholder = document.getElementById('navbar-placeholder');
        if (!navbarPlaceholder) return;

        try {
            // 1. Ambil konten dari navbar.html
            const response = await fetch('navbar.html');
            const navbarHTML = await response.text();
            
            // 2. Masukkan HTML navbar ke dalam wadah
            navbarPlaceholder.innerHTML = navbarHTML;

            // 3. Logika untuk menandai link yang aktif
            // Dapatkan path halaman saat ini (misal: "/profesi.html")
            const currentPagePath = window.location.pathname.split('/').pop();
            
            // Dapatkan semua link di dalam navbar yang baru dimuat
            const navLinks = document.querySelectorAll('#navbar-placeholder nav a');

            navLinks.forEach(link => {
                const linkPath = link.getAttribute('href');
                
                // Jika path link sama dengan path halaman saat ini, beri kelas .active-link
                if (linkPath === currentPagePath || (currentPagePath === '' && linkPath === 'index.html')) {
                    link.classList.add('active-link');
                }
            });

            document.body.style.visibility = 'visible';
            document.body.style.opacity = '1';

        } catch (error) {
            console.error('Error loading the navbar:', error);
            navbarPlaceholder.innerHTML = '<p style="color:red; text-align:center;">Gagal memuat navigasi.</p>';
        }
    };

    // Panggil fungsi utama untuk memuat navbar
    loadNavbar();


    // === LOGIKA UNTUK POPUP TETAP DI SINI ===
    // (Kode popup committee dan sertifikat Anda tetap berada di bawah sini)
    // ...
});
// Tab switching for skills section
document.addEventListener("DOMContentLoaded", function () {
    const tabs = document.querySelectorAll('.skill-tab');
    const panels = document.querySelectorAll('.skill-content-panel');

    function animateProgressBars(panel) {
        // Reset all progress bars in all panels
        document.querySelectorAll('.progress-bar').forEach(bar => {
            bar.style.width = '0%';
        });
        // Animate only progress bars in the active panel
        setTimeout(() => {
            panel.querySelectorAll('.progress-bar').forEach(bar => {
                const progress = bar.getAttribute('data-progress') || '0%';
                bar.style.width = progress;
            });
        }, 100); // Delay to allow DOM update and transition
    }

    // Animate on first load (active panel)
    const firstPanel = document.querySelector('.skill-content-panel.active');
    if (firstPanel) animateProgressBars(firstPanel);

    tabs.forEach(tab => {
        tab.addEventListener('click', function () {
            if (this.classList.contains('active')) {
                return;
            }
            // Remove active from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            // Transition panels
            panels.forEach(panel => {
                if (panel.classList.contains('active')) {
                    panel.classList.remove('active');
                    // Wait for transition, then hide
                    setTimeout(() => {
                        panel.style.display = 'none';
                    }, 400);
                }
            });

            const tabNum = this.getAttribute('data-tab');
            const nextPanel = document.querySelector(`.skill-content-panel[data-content="${tabNum}"]`);
            // Show next panel before adding active for transition
            nextPanel.style.display = 'grid';
            setTimeout(() => {
                nextPanel.classList.add('active');
                animateProgressBars(nextPanel);
            }, 10); // Short delay to trigger transition
        });
    });
});


document.addEventListener('DOMContentLoaded', function() {
    // === LOGIKA UNTUK POPUP COMMITTEE EXPERIENCE ===

    // 1. Pilih elemen yang dibutuhkan
    const openCommitteeBtn = document.querySelector('.committee-card .button-open');
    const committeePopup = document.getElementById('committee-popup');
    
    // 2. Pastikan elemen-elemennya ada di halaman
    if (openCommitteeBtn && committeePopup) {
        const closeCommitteeBtn = committeePopup.querySelector('.popup-close-btn');

        // 3. Fungsi untuk membuka popup
        const openPopup = () => {
            committeePopup.classList.add('active');
        };

        // 4. Fungsi untuk menutup popup
        const closePopup = () => {
            committeePopup.classList.remove('active');
        };

        // 5. Tambahkan event listener ke tombol-tombol
        openCommitteeBtn.addEventListener('click', openPopup);
        closeCommitteeBtn.addEventListener('click', closePopup);

        // 6. Tutup popup saat mengklik area gelap di sekitarnya
        committeePopup.addEventListener('click', (event) => {
            if (event.target === committeePopup) {
                closePopup();
            }
        });
        
        // 7. (Opsional) Tutup popup dengan menekan tombol 'Escape'
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && committeePopup.classList.contains('active')) {
                closePopup();
            }
        });
    }
});



// === LOGIKA UNTUK POPUP GALLERY SERTIFIKAT ===

// 1. Pilih elemen yang dibutuhkan
const openCertificateBtn = document.getElementById('open-certificate-btn');
const certificatePopup = document.getElementById('certificate-popup');

// 2. Pastikan elemen-elemennya ada di halaman
if (openCertificateBtn && certificatePopup) {
    const closeCertificateBtn = certificatePopup.querySelector('.popup-close-btn');

    // 3. Fungsi untuk membuka popup
    const openCertPopup = () => {
        certificatePopup.classList.add('active');
    };

    // 4. Fungsi untuk menutup popup
    const closeCertPopup = () => {
        certificatePopup.classList.remove('active');
    };

    // 5. Tambahkan event listener ke tombol-tombol
    openCertificateBtn.addEventListener('click', openCertPopup);
    closeCertificateBtn.addEventListener('click', closeCertPopup);

    // 6. Tutup popup saat mengklik area gelap di sekitarnya
    certificatePopup.addEventListener('click', (event) => {
        if (event.target === certificatePopup) {
            closeCertPopup();
        }
    });
    
    // 7. (Opsional) Tutup popup dengan menekan tombol 'Escape'
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && certificatePopup.classList.contains('active')) {
            closeCertPopup();
        }
    });
}

// === LOGIKA UNTUK ACTIVE LINK DI NAVBAR (SCROLL SPY) ===

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a');

    if (sections.length === 0 || navLinks.length === 0) return;

    const activateLinkOnScroll = () => {
        let currentActive = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            // Offset 150px untuk memberi ruang bagi header yang fixed
            if (window.scrollY >= sectionTop - 150 && window.scrollY < sectionTop + sectionHeight - 150) {
                currentActive = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active-link');
            // Cek jika href dari link sama dengan ID section yang aktif
            if (link.getAttribute('href').substring(1) === currentActive) {
                link.classList.add('active-link');
            }
        });
        
        // Kasus khusus: Jika scroll di paling atas, aktifkan link Home
        // dan nonaktifkan yang lain jika tidak ada section aktif terdeteksi.
        if (currentActive === '' && window.scrollY < 400) {
        navLinks.forEach(link => link.classList.remove('active-link'));
        document.querySelector('nav a[href="#home"]').classList.add('active-link');
        }
    };

    // Panggil fungsi saat halaman di-scroll
    window.addEventListener('scroll', activateLinkOnScroll);

    // Panggil fungsi sekali saat halaman dimuat untuk set state awal
    activateLinkOnScroll();
});


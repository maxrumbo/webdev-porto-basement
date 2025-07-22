const navToggle = document.querySelector('.nav-toggle');
const allNavLinks = document.querySelectorAll('nav a');
const navLinks = document.querySelectorAll('.nav-links a');
const navLinksContainer = document.querySelector('.nav-links');
const sections = document.querySelectorAll('main section');
const navbar = document.querySelector('nav');
const mainContent = document.querySelector('main');

// Kode untuk mengaktifkan/menonaktifkan menu saat tombol diklik
navToggle.addEventListener('click', function() {
    navLinksContainer.classList.toggle('show-links');

    if (navLinksContainer.classList.contains('show-links')) {
        navbar.classList.remove('collapsed');
        mainContent.classList.remove('content-shifted');
    } else {
        navbar.classList.add('collapsed');
        mainContent.classList.add('content-shifted');
    }
});

// ===============================================
// Kode Utama: Logika scroll yang paling akurat
// ===============================================
window.addEventListener('scroll', () => {
    let currentSectionId = '';
    
    // Logika ini mendeteksi section yang sedang terlihat
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        
        if (rect.top <= 150 && rect.bottom >= 150) {
            currentSectionId = section.id;
        }
    });

    // Periksa kondisi khusus untuk bagian terakhir (paling bawah halaman)
    const lastSection = sections[sections.length - 1];
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 10) {
        currentSectionId = lastSection.id;
    }
    
    // Periksa kondisi khusus untuk welcome page
    if (window.scrollY < window.innerHeight * 0.5) {
        currentSectionId = 'welcome';
    }

    // Hapus kelas 'active-link' dari semua tautan
    allNavLinks.forEach(link => {
        link.classList.remove('active-link');
    });

    // Tambahkan kelas 'active-link' ke tautan yang sesuai
    if (currentSectionId) {
        const currentLink = document.querySelector(`a[href="#${currentSectionId}"]`);
        if (currentLink) {
            currentLink.classList.add('active-link');
        }
    }
});
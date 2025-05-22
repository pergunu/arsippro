document.addEventListener('DOMContentLoaded', function() {
    // Simulasi data halaman
    const bookData = {
        title: "E-PEDIA",
        pages: [
            {
                number: 1,
                title: "Pendahuluan",
                topImage: "images/default-top.jpg",
                content: "Selamat datang di E-PEDIA, buku sejarah digital interaktif...",
                bottomImage: "images/default-bottom.jpg"
            },
            {
                number: 2,
                title: "Sejarah Kuno",
                content: "Peradaban kuno dimulai sekitar...",
                centerImage: "images/default-center.jpg"
            }
            // Halaman lainnya...
        ],
        tableOfContents: [
            { title: "Pendahuluan", page: 1 },
            { title: "Sejarah Kuno", page: 2 }
            // Daftar isi lainnya...
        ]
    };

    // Inisialisasi
    let currentPage = 0;
    const totalPages = bookData.pages.length;
    
    // Elemen DOM
    const openBookBtn = document.getElementById('open-book');
    const bookCover = document.querySelector('.book-cover');
    const bookContent = document.querySelector('.book-content');
    const prevPageBtn = document.getElementById('prev-page');
    const nextPageBtn = document.getElementById('next-page');
    const contentsBtn = document.getElementById('table-contents');
    const adminBtn = document.getElementById('admin-login');
    
    // Buka buku
    openBookBtn.addEventListener('click', function() {
        bookCover.classList.add('hidden');
        bookContent.classList.remove('hidden');
        bookContent.classList.add('book-open');
        loadPage(currentPage);
    });
    
    // Navigasi halaman
    prevPageBtn.addEventListener('click', function() {
        if (currentPage > 0) {
            currentPage--;
            loadPage(currentPage);
            animatePageTurn('prev');
        }
    });
    
    nextPageBtn.addEventListener('click', function() {
        if (currentPage < totalPages - 1) {
            currentPage++;
            loadPage(currentPage);
            animatePageTurn('next');
        }
    });
    
    // Daftar isi
    contentsBtn.addEventListener('click', function() {
        showTableOfContents();
    });
    
    // Panel admin
    adminBtn.addEventListener('click', function() {
        const password = prompt("Masukkan kata sandi admin:");
        if (password === "admin123") { // Password sederhana, bisa diganti
            window.location.href = "admin/index.html";
        } else {
            alert("Kata sandi salah!");
        }
    });
    
    // Fungsi memuat halaman
    function loadPage(pageIndex) {
        const page = bookData.pages[pageIndex];
        const leftPage = document.querySelector('.left-page');
        const rightPage = document.querySelector('.right-page');
        
        // Kosongkan konten
        leftPage.querySelector('.page-content').innerHTML = '';
        rightPage.querySelector('.page-content').innerHTML = '';
        
        // Set nomor halaman
        leftPage.querySelector('.page-number').textContent = page.number;
        rightPage.querySelector('.page-number').textContent = page.number + 1;
        
        // Isi konten halaman kiri
        const leftContent = `
            <h2 class="page-title">${page.title}</h2>
            ${page.topImage ? `<div class="image-container top-image"><img src="${page.topImage}" alt="Gambar Atas"></div>` : ''}
            <div class="text-content"><p>${page.content}</p></div>
            ${page.bottomImage ? `<div class="image-container bottom-image"><img src="${page.bottomImage}" alt="Gambar Bawah"></div>` : ''}
        `;
        leftPage.querySelector('.page-content').innerHTML = leftContent;
        
        // Isi konten halaman kanan (jika ada halaman berikutnya)
        if (pageIndex < totalPages - 1) {
            const nextPage = bookData.pages[pageIndex + 1];
            const rightContent = `
                <h2 class="page-title">${nextPage.title}</h2>
                ${nextPage.centerImage ? `<div class="image-container center-image"><img src="${nextPage.centerImage}" alt="Gambar Tengah"></div>` : ''}
                <div class="text-content"><p>${nextPage.content}</p></div>
            `;
            rightPage.querySelector('.page-content').innerHTML = rightContent;
        }
    }
    
    // Fungsi menampilkan daftar isi
    function showTableOfContents() {
        const leftPage = document.querySelector('.left-page');
        leftPage.querySelector('.page-content').innerHTML = `
            <h2 class="page-title">Daftar Isi</h2>
            <ul class="contents-list">
                ${bookData.tableOfContents.map(item => 
                    `<li><a href="#" data-page="${item.page - 1}">${item.title} - Halaman ${item.page}</a></li>`
                ).join('')}
            </ul>
        `;
        
        // Kosongkan halaman kanan
        document.querySelector('.right-page .page-content').innerHTML = '';
        
        // Tambahkan event listener untuk navigasi daftar isi
        document.querySelectorAll('.contents-list a').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const pageIndex = parseInt(this.getAttribute('data-page'));
                currentPage = pageIndex;
                loadPage(currentPage);
            });
        });
    }
});

// Aplikasi E-pedia - Perpustakaan Digital Interaktif
document.addEventListener('DOMContentLoaded', function() {
    // Inisialisasi variabel global
    let books = [];
    let currentBook = null;
    let currentPage = 1;
    let flipbook = null;
    let adminPassword = "65614222";
    
    // Elemen DOM
    const booksGrid = document.getElementById('booksGrid');
    const bookModal = document.getElementById('bookModal');
    const bookModalTitle = document.getElementById('bookModalTitle');
    const currentPageSpan = document.getElementById('currentPage');
    const totalPagesSpan = document.getElementById('totalPages');
    const markAsReadCheckbox = document.getElementById('markAsRead');
    const prevPageBtn = document.getElementById('prevPage');
    const nextPageBtn = document.getElementById('nextPage');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    const adminLoginModal = document.getElementById('adminLoginModal');
    const floatingAdminBtn = document.getElementById('floatingAdminBtn');
    const adminPasswordInput = document.getElementById('adminPassword');
    const adminLoginBtn = document.getElementById('adminLoginBtn');
    const adminLoginError = document.getElementById('adminLoginError');
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const categoryFilter = document.getElementById('categoryFilter');
    const sortBySelect = document.getElementById('sortBy');
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const bookmarkBtn = document.getElementById('bookmarkBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const ttsBtn = document.getElementById('ttsBtn');
    const shareBtn = document.getElementById('shareBtn');
    
    // Cek tema dari localStorage
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Load data buku
    loadBooks();
    
    // Event Listeners
    floatingAdminBtn.addEventListener('click', openAdminLoginModal);
    adminLoginBtn.addEventListener('click', checkAdminPassword);
    closeModalBtns.forEach(btn => btn.addEventListener('click', closeAllModals));
    searchBtn.addEventListener('click', filterBooks);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') filterBooks();
    });
    categoryFilter.addEventListener('change', filterBooks);
    sortBySelect.addEventListener('change', filterBooks);
    themeToggleBtn.addEventListener('click', toggleTheme);
    bookmarkBtn.addEventListener('click', toggleBookmark);
    downloadBtn.addEventListener('click', downloadAsPDF);
    ttsBtn.addEventListener('click', toggleTextToSpeech);
    shareBtn.addEventListener('click', shareBook);
    
    // Fungsi untuk memuat data buku
    function loadBooks() {
        // Coba muat dari localStorage
        const savedBooks = localStorage.getItem('epedia_books');
        const savedSettings = localStorage.getItem('epedia_settings');
        
        if (savedBooks) {
            books = JSON.parse(savedBooks);
        } else {
            // Data default jika tidak ada di localStorage
            books = [
                {
                    id: 1,
                    title: "Pengantar Pendidikan Karakter",
                    author: "Tim Cendhanu Pergunu",
                    description: "Buku panduan untuk memahami pentingnya pendidikan karakter dalam pembelajaran.",
                    category: "pendidikan",
                    cover: "assets/images/default-book-cover.jpg",
                    pages: [
                        { number: 1, content: "<h1>Pengantar Pendidikan Karakter</h1><p>Pendidikan karakter adalah suatu sistem penanaman nilai-nilai karakter kepada warga sekolah yang meliputi komponen pengetahuan, kesadaran atau kemauan, dan tindakan untuk melaksanakan nilai-nilai tersebut.</p>" },
                        { number: 2, content: "<h2>Manfaat Pendidikan Karakter</h2><p>Pendidikan karakter memiliki banyak manfaat, antara lain: membentuk kepribadian yang kuat, meningkatkan kecerdasan emosional, dan menciptakan lingkungan belajar yang positif.</p>" },
                        { number: 3, content: "<h2>Implementasi di Sekolah</h2><p>Implementasi pendidikan karakter di sekolah dapat dilakukan melalui: integrasi dalam mata pelajaran, pembiasaan sehari-hari, dan keteladanan dari guru.</p>" }
                    ],
                    read: false,
                    lastReadPage: 1,
                    bookmarked: false,
                    views: 0
                },
                {
                    id: 2,
                    title: "Fiqih Ibadah untuk Pemula",
                    author: "Ust. Ahmad Zaini",
                    description: "Panduan lengkap tata cara ibadah sehari-hari sesuai sunnah Nabi Muhammad SAW.",
                    category: "agama",
                    cover: "assets/images/default-book-cover.jpg",
                    pages: [
                        { number: 1, content: "<h1>Fiqih Ibadah untuk Pemula</h1><p>Buku ini membahas tata cara ibadah sehari-hari yang benar sesuai dengan sunnah Nabi Muhammad SAW.</p>" },
                        { number: 2, content: "<h2>Bersuci (Thaharah)</h2><p>Bab ini menjelaskan tentang tata cara wudhu, mandi wajib, dan tayammum dengan lengkap.</p>" },
                        { number: 3, content: "<h2>Shalat Wajib</h2><p>Panduan lengkap tentang syarat, rukun, dan sunnah-sunnah dalam shalat wajib.</p>" },
                        { number: 4, content: "<h2>Shalat Sunnah</h2><p>Penjelasan tentang berbagai macam shalat sunnah dan keutamaannya.</p>" }
                    ],
                    read: false,
                    lastReadPage: 1,
                    bookmarked: false,
                    views: 0
                }
            ];
            localStorage.setItem('epedia_books', JSON.stringify(books));
        }
        
        if (savedSettings) {
            const settings = JSON.parse(savedSettings);
            adminPassword = settings.adminPassword || adminPassword;
        }
        
        displayBooks(books);
    }
    
    // Fungsi untuk menampilkan buku
    function displayBooks(booksToDisplay) {
        booksGrid.innerHTML = '';
        
        booksToDisplay.forEach(book => {
            const bookCard = document.createElement('div');
            bookCard.className = 'book-card';
            bookCard.innerHTML = `
                <div class="book-cover" style="background-image: url('${book.cover}')">
                    ${book.read ? '<div class="book-read-status">SELESAI</div>' : ''}
                </div>
                <div class="book-info">
                    <h3>${book.title}</h3>
                    <p>Oleh: ${book.author}</p>
                    <p>${book.description.substring(0, 60)}...</p>
                    <span class="book-category">${getCategoryName(book.category)}</span>
                </div>
            `;
            
            bookCard.addEventListener('click', () => openBookModal(book));
            booksGrid.appendChild(bookCard);
        });
    }
    
    // Fungsi untuk membuka modal buku
    function openBookModal(book) {
        currentBook = book;
        currentPage = book.lastReadPage || 1;
        
        // Update statistik
        currentBook.views = (currentBook.views || 0) + 1;
        saveBooks();
        
        bookModalTitle.textContent = book.title;
        totalPagesSpan.textContent = book.pages.length;
        currentPageSpan.textContent = currentPage;
        markAsReadCheckbox.checked = book.read || false;
        
        // Inisialisasi flipbook
        initFlipbook();
        
        // Tampilkan modal
        bookModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    
    // Fungsi untuk inisialisasi flipbook
    function initFlipbook() {
        const flipbookContainer = document.getElementById('flipbook');
        flipbookContainer.innerHTML = '';
        
        // Buat halaman flipbook
        currentBook.pages.forEach(page => {
            const pageElement = document.createElement('div');
            pageElement.className = 'page';
            pageElement.innerHTML = page.content;
            flipbookContainer.appendChild(pageElement);
        });
        
        // Inisialisasi turn.js
        flipbook = $('#flipbook').turn({
            width: 800,
            height: 500,
            autoCenter: true,
            page: currentPage,
            when: {
                turning: function(e, page) {
                    currentPage = page;
                    currentPageSpan.textContent = currentPage;
                    
                    // Simpan halaman terakhir dibaca
                    currentBook.lastReadPage = currentPage;
                    saveBooks();
                }
            }
        });
        
        // Update tombol navigasi
        updateNavigationButtons();
    }
    
    // Fungsi untuk memperbarui tombol navigasi
    function updateNavigationButtons() {
        prevPageBtn.disabled = currentPage <= 1;
        nextPageBtn.disabled = currentPage >= currentBook.pages.length;
    }
    
    // Event listeners untuk tombol navigasi
    prevPageBtn.addEventListener('click', () => {
        flipbook.turn('previous');
    });
    
    nextPageBtn.addEventListener('click', () => {
        flipbook.turn('next');
    });
    
    // Event listener untuk menandai sebagai selesai dibaca
    markAsReadCheckbox.addEventListener('change', function() {
        currentBook.read = this.checked;
        saveBooks();
    });
    
    // Fungsi untuk menyimpan data buku
    function saveBooks() {
        localStorage.setItem('epedia_books', JSON.stringify(books));
        
        // Simpan juga pengaturan admin
        const settings = {
            adminPassword: adminPassword
        };
        localStorage.setItem('epedia_settings', JSON.stringify(settings));
    }
    
    // Fungsi untuk membuka modal login admin
    function openAdminLoginModal() {
        adminPasswordInput.value = '';
        adminLoginError.textContent = '';
        adminLoginModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    
    // Fungsi untuk memeriksa password admin
    function checkAdminPassword() {
        const enteredPassword = adminPasswordInput.value.trim();
        
        if (enteredPassword === adminPassword) {
            // Redirect ke panel admin
            window.location.href = 'admin/admin.html';
        } else {
            adminLoginError.textContent = 'Kode sandi salah. Silakan coba lagi.';
        }
    }
    
    // Fungsi untuk menutup semua modal
    function closeAllModals() {
        bookModal.style.display = 'none';
        adminLoginModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // Hentikan text-to-speech jika sedang berjalan
        if (window.speechSynthesis && window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
        }
    }
    
    // Fungsi untuk memfilter buku berdasarkan pencarian dan kategori
    function filterBooks() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategory = categoryFilter.value;
        const sortBy = sortBySelect.value;
        
        let filteredBooks = books.filter(book => {
            const matchesSearch = book.title.toLowerCase().includes(searchTerm) || 
                                book.author.toLowerCase().includes(searchTerm) || 
                                book.description.toLowerCase().includes(searchTerm);
            
            const matchesCategory = selectedCategory === 'all' || book.category === selectedCategory;
            
            return matchesSearch && matchesCategory;
        });
        
        // Urutkan buku
        switch (sortBy) {
            case 'recent':
                filteredBooks.sort((a, b) => b.id - a.id);
                break;
            case 'oldest':
                filteredBooks.sort((a, b) => a.id - b.id);
                break;
            case 'title':
                filteredBooks.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'popular':
                filteredBooks.sort((a, b) => (b.views || 0) - (a.views || 0));
                break;
        }
        
        displayBooks(filteredBooks);
    }
    
    // Fungsi untuk toggle tema gelap/terang
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    }
    
    // Fungsi untuk toggle bookmark
    function toggleBookmark() {
        if (!currentBook) return;
        
        currentBook.bookmarked = !currentBook.bookmarked;
        saveBooks();
        
        bookmarkBtn.innerHTML = currentBook.bookmarked ? 
            `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" fill="currentColor"></path>
            </svg> Bookmark` :
            `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
            </svg> Bookmark`;
    }
    
    // Fungsi untuk mengunduh sebagai PDF
    function downloadAsPDF() {
        if (!currentBook) return;
        
        // Gunakan html2pdf.js untuk mengonversi ke PDF
        const element = document.createElement('div');
        element.innerHTML = `
            <h1 style="text-align: center; margin-bottom: 20px;">${currentBook.title}</h1>
            <p style="text-align: center; margin-bottom: 30px;">Oleh: ${currentBook.author}</p>
            ${currentBook.pages.map(page => page.content).join('<div style="page-break-after: always;"></div>')}
        `;
        
        const opt = {
            margin: 10,
            filename: `${currentBook.title}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };
        
        // html2pdf().from(element).set(opt).save();
        alert(`Fitur unduh PDF akan mengunduh "${currentBook.title}.pdf". Di implementasi nyata, gunakan library html2pdf.js.`);
    }
    
    // Fungsi untuk text-to-speech
    function toggleTextToSpeech() {
        if (!window.speechSynthesis) {
            alert('Text-to-speech tidak didukung di browser Anda.');
            return;
        }
        
        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
            ttsBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                    <line x1="12" y1="19" x2="12" y2="23"></line>
                    <line x1="8" y1="23" x2="16" y2="23"></line>
                </svg>
                Baca Lantang
            `;
            return;
        }
        
        if (!currentBook) return;
        
        const currentPageContent = currentBook.pages[currentPage - 1].content;
        const text = stripHtml(currentPageContent);
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'id-ID';
        utterance.rate = 1;
        utterance.pitch = 1;
        
        utterance.onend = function() {
            ttsBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                    <line x1="12" y1="19" x2="12" y2="23"></line>
                    <line x1="8" y1="23" x2="16" y2="23"></line>
                </svg>
                Baca Lantang
            `;
        };
        
        window.speechSynthesis.speak(utterance);
        ttsBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 6L6 18"></path>
                <path d="M6 6l12 12"></path>
            </svg>
            Berhenti
        `;
    }
    
    // Fungsi untuk berbagi buku
    function shareBook() {
        if (!currentBook) return;
        
        if (navigator.share) {
            navigator.share({
                title: currentBook.title,
                text: currentBook.description,
                url: window.location.href
            }).catch(err => {
                console.log('Error sharing:', err);
            });
        } else {
            // Fallback untuk browser yang tidak mendukung Web Share API
            alert(`Bagikan "${currentBook.title}" melalui: \n\nEmail atau media sosial lainnya.`);
        }
    }
    
    // Fungsi bantu untuk menghapus HTML dari teks
    function stripHtml(html) {
        const tmp = document.createElement('div');
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || '';
    }
    
    // Fungsi bantu untuk mendapatkan nama kategori
    function getCategoryName(category) {
        const categories = {
            'pendidikan': 'Pendidikan',
            'agama': 'Agama',
            'umum': 'Umum',
            'sastra': 'Sastra',
            'teknologi': 'Teknologi'
        };
        return categories[category] || category;
    }

    // Fitur Tambahan untuk E-pedia
class EPediaFeatures {
  constructor() {
    this.speechSynthesis = window.speechSynthesis;
    this.currentUtterance = null;
  }
  
  // Text-to-Speech
  textToSpeech(text, lang = 'id-ID') {
    if (this.speechSynthesis) {
      if (this.currentUtterance) {
        this.speechSynthesis.cancel();
      }
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = 0.9;
      utterance.pitch = 1;
      
      this.currentUtterance = utterance;
      this.speechSynthesis.speak(utterance);
      
      return utterance;
    } else {
      console.error('Text-to-Speech tidak didukung di browser ini');
      return null;
    }
  }
  
  stopSpeech() {
    if (this.speechSynthesis) {
      this.speechSynthesis.cancel();
      this.currentUtterance = null;
    }
  }
  
  // Web Share API
  shareContent(title, text, url) {
    if (navigator.share) {
      return navigator.share({
        title: title,
        text: text,
        url: url
      });
    } else {
      // Fallback untuk browser yang tidak mendukung
      const shareUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(text + '\n\n' + url)}`;
      window.location.href = shareUrl;
      return Promise.resolve();
    }
  }
  
  // Bookmarking
  toggleBookmark(bookId) {
    const books = JSON.parse(localStorage.getItem('epedia_books')) || [];
    const bookIndex = books.findIndex(b => b.id === bookId);
    
    if (bookIndex !== -1) {
      books[bookIndex].bookmarked = !books[bookIndex].bookmarked;
      localStorage.setItem('epedia_books', JSON.stringify(books));
      return books[bookIndex].bookmarked;
    }
    
    return false;
  }
  
  // Theme Management
  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('epedia_theme', newTheme);
    
    return newTheme;
  }
  
  // Book Service untuk mengelola data buku
class BookService {
  constructor() {
    this.storageKey = 'epedia_books';
    this.books = this.loadBooks();
  }
  
  loadBooks() {
    const savedBooks = localStorage.getItem(this.storageKey);
    return savedBooks ? JSON.parse(savedBooks) : [];
  }
  
  saveBooks() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.books));
  }
  
  getAllBooks() {
    return this.books;
  }
  
  getBookById(id) {
    return this.books.find(book => book.id === id);
  }
  
  addBook(bookData) {
    const newBook = {
      id: EPediaUtils.generateBookId(this.books),
      ...bookData,
      read: false,
      lastReadPage: 1,
      bookmarked: false,
      views: 0,
      createdAt: new Date().toISOString()
    };
    
    this.books.push(newBook);
    this.saveBooks();
    return newBook;
  }
  
  updateBook(id, bookData) {
    const bookIndex = this.books.findIndex(book => book.id === id);
    
    if (bookIndex !== -1) {
      this.books[bookIndex] = {
        ...this.books[bookIndex],
        ...bookData
      };
      this.saveBooks();
      return this.books[bookIndex];
    }
    
    return null;
  }
  
  deleteBook(id) {
    this.books = this.books.filter(book => book.id !== id);
    this.saveBooks();
    return true;
  }
  
  incrementViews(id) {
    const book = this.getBookById(id);
    if (book) {
      book.views = (book.views || 0) + 1;
      this.saveBooks();
    }
  }
  
  // ... tambahkan metode lainnya sesuai kebutuhan ...
}

// Ekspor singleton instance
const bookService = new BookService();
}

// Ekspor singleton instance
const ePediaFeatures = new EPediaFeatures();
    
    // Tutup modal ketika klik di luar konten modal
    window.addEventListener('click', function(event) {
        if (event.target === bookModal) {
            closeAllModals();
        }
        if (event.target === adminLoginModal) {
            closeAllModals();
        }
    });
});

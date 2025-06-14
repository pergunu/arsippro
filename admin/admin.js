// Admin Panel untuk Aplikasi E-pedia
document.addEventListener('DOMContentLoaded', function() {
    // Variabel global
    let books = [];
    let adminPassword = "65614222";
    let currentPageId = 1;
    let quillEditor = null;
    
    // Elemen DOM
    const dashboardSection = document.getElementById('dashboardSection');
    const addBookSection = document.getElementById('addBookSection');
    const manageBooksSection = document.getElementById('manageBooksSection');
    const settingsSection = document.getElementById('settingsSection');
    
    const dashboardBtn = document.getElementById('dashboardBtn');
    const addBookBtn = document.getElementById('addBookBtn');
    const manageBooksBtn = document.getElementById('manageBooksBtn');
    const settingsBtn = document.getElementById('settingsBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    
    const totalBooksStat = document.getElementById('totalBooksStat');
    const totalCategoriesStat = document.getElementById('totalCategoriesStat');
    const popularBookStat = document.getElementById('popularBookStat');
    const totalReadersStat = document.getElementById('totalReadersStat');
    const recentBooksList = document.getElementById('recentBooksList');
    
    const addBookForm = document.getElementById('addBookForm');
    const bookTitleInput = document.getElementById('bookTitle');
    const bookAuthorInput = document.getElementById('bookAuthor');
    const bookCategoryInput = document.getElementById('bookCategory');
    const bookDescriptionInput = document.getElementById('bookDescription');
    const bookCoverInput = document.getElementById('bookCover');
    const bookPagesEditor = document.getElementById('bookPagesEditor');
    const addPageBtn = document.getElementById('addPageBtn');
    const previewBookBtn = document.getElementById('previewBookBtn');
    
    const manageBooksSearch = document.getElementById('manageBooksSearch');
    const manageBooksCategoryFilter = document.getElementById('manageBooksCategoryFilter');
    const booksTableBody = document.getElementById('booksTableBody');
    
    const settingsTabs = document.querySelectorAll('.tab-btn');
    const settingsTabContents = document.querySelectorAll('.settings-tab-content');
    
    const generalSettingsForm = document.getElementById('generalSettingsForm');
    const appThemeInput = document.getElementById('appTheme');
    const defaultFontInput = document.getElementById('defaultFont');
    const defaultCoverInput = document.getElementById('defaultCover');
    
    const securitySettingsForm = document.getElementById('securitySettingsForm');
    const currentPasswordInput = document.getElementById('currentPassword');
    const newPasswordInput = document.getElementById('newPassword');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    
    const backupDataBtn = document.getElementById('backupDataBtn');
    const restoreDataBtn = document.getElementById('restoreDataBtn');
    const restoreFileInput = document.getElementById('restoreFileInput');
    const resetDataBtn = document.getElementById('resetDataBtn');
    
    const previewModal = document.getElementById('previewModal');
    const previewContainer = document.getElementById('previewContainer');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    
    const confirmModal = document.getElementById('confirmModal');
    const confirmModalTitle = document.getElementById('confirmModalTitle');
    const confirmModalMessage = document.getElementById('confirmModalMessage');
    const confirmModalCancel = document.getElementById('confirmModalCancel');
    const confirmModalConfirm = document.getElementById('confirmModalConfirm');
    
    // Muat data saat halaman dimuat
    loadData();
    
    // Event Listeners untuk navigasi
    dashboardBtn.addEventListener('click', () => showSection('dashboard'));
    addBookBtn.addEventListener('click', () => showSection('addBook'));
    manageBooksBtn.addEventListener('click', () => showSection('manageBooks'));
    settingsBtn.addEventListener('click', () => showSection('settings'));
    logoutBtn.addEventListener('click', logout);
    
    // Event Listeners untuk form tambah buku
    addBookForm.addEventListener('submit', saveBook);
    addPageBtn.addEventListener('click', addNewPage);
    previewBookBtn.addEventListener('click', previewBook);
    
    // Event Listeners untuk kelola buku
    manageBooksSearch.addEventListener('input', filterManageBooks);
    manageBooksCategoryFilter.addEventListener('change', filterManageBooks);
    
    // Event Listeners untuk pengaturan
    settingsTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.getAttribute('data-tab');
            openSettingsTab(tabId);
        });
    });
    
    generalSettingsForm.addEventListener('submit', saveGeneralSettings);
    securitySettingsForm.addEventListener('submit', changePassword);
    backupDataBtn.addEventListener('click', backupData);
    restoreDataBtn.addEventListener('click', () => restoreFileInput.click());
    restoreFileInput.addEventListener('change', restoreData);
    resetDataBtn.addEventListener('click', confirmResetData);
    
    // Event Listeners untuk modal
    closeModalBtns.forEach(btn => btn.addEventListener('click', closeModal));
    confirmModalCancel.addEventListener('click', () => closeModal('confirmModal'));
    window.addEventListener('click', (e) => {
        if (e.target === previewModal) closeModal('previewModal');
        if (e.target === confirmModal) closeModal('confirmModal');
    });
    
    // Inisialisasi Quill Editor
    initQuillEditor();
    
    // Fungsi untuk memuat data
    function loadData() {
        const savedBooks = localStorage.getItem('epedia_books');
        const savedSettings = localStorage.getItem('epedia_settings');
        
        if (savedBooks) {
            books = JSON.parse(savedBooks);
            updateDashboardStats();
            displayRecentBooks();
            displayBooksTable();
        }
        
        if (savedSettings) {
            const settings = JSON.parse(savedSettings);
            adminPassword = settings.adminPassword || adminPassword;
            
            // Terapkan pengaturan tema
            if (settings.theme) {
                document.documentElement.setAttribute('data-theme', settings.theme);
                appThemeInput.value = settings.theme;
            }
            
            if (settings.defaultFont) {
                defaultFontInput.value = settings.defaultFont;
            }
            
            if (settings.defaultCover) {
                defaultCoverInput.value = settings.defaultCover;
            }
        }
    }
    
    // Fungsi untuk menampilkan section yang dipilih
    function showSection(section) {
        // Sembunyikan semua section
        dashboardSection.classList.remove('active');
        addBookSection.classList.remove('active');
        manageBooksSection.classList.remove('active');
        settingsSection.classList.remove('active');
        
        // Nonaktifkan semua tombol navigasi
        dashboardBtn.classList.remove('active');
        addBookBtn.classList.remove('active');
        manageBooksBtn.classList.remove('active');
        settingsBtn.classList.remove('active');
        
        // Tampilkan section yang dipilih
        switch (section) {
            case 'dashboard':
                dashboardSection.classList.add('active');
                dashboardBtn.classList.add('active');
                updateDashboardStats();
                break;
            case 'addBook':
                addBookSection.classList.add('active');
                addBookBtn.classList.add('active');
                break;
            case 'manageBooks':
                manageBooksSection.classList.add('active');
                manageBooksBtn.classList.add('active');
                displayBooksTable();
                break;
            case 'settings':
                settingsSection.classList.add('active');
                settingsBtn.classList.add('active');
                openSettingsTab('generalSettings');
                break;
        }
    }
    
    // Fungsi untuk memperbarui statistik dashboard
    function updateDashboardStats() {
        totalBooksStat.textContent = books.length;
        
        // Hitung total kategori unik
        const categories = new Set(books.map(book => book.category));
        totalCategoriesStat.textContent = categories.size;
        
        // Temukan buku paling populer
        if (books.length > 0) {
            const popularBook = books.reduce((prev, current) => 
                (prev.views || 0) > (current.views || 0) ? prev : current
            );
            popularBookStat.textContent = `${popularBook.title} (${popularBook.views || 0} views)`;
        } else {
            popularBookStat.textContent = "-";
        }
        
        // Hitung total pembaca (total views semua buku)
        const totalReaders = books.reduce((sum, book) => sum + (book.views || 0), 0);
        totalReadersStat.textContent = totalReaders;
    }
    
    // Fungsi untuk menampilkan buku terbaru
    function displayRecentBooks() {
        recentBooksList.innerHTML = '';
        
        // Ambil 5 buku terbaru (diurutkan berdasarkan ID tertinggi)
        const recentBooks = [...books].sort((a, b) => b.id - a.id).slice(0, 5);
        
        if (recentBooks.length === 0) {
            recentBooksList.innerHTML = '<p>Tidak ada buku tersedia.</p>';
            return;
        }
        
        recentBooks.forEach(book => {
            const bookItem = document.createElement('div');
            bookItem.className = 'book-item';
            bookItem.innerHTML = `
                <h4>${book.title}</h4>
                <p>Oleh: ${book.author}</p>
                <p>Kategori: ${getCategoryName(book.category)}</p>
                <p>Dilihat: ${book.views || 0} kali</p>
            `;
            recentBooksList.appendChild(bookItem);
        });
    }
    
    // Fungsi untuk inisialisasi Quill Editor
    function initQuillEditor() {
        quillEditor = new Quill(bookPagesEditor, {
            theme: 'snow',
            modules: {
                toolbar: [
                    [{ 'header': [1, 2, 3, false] }],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ 'color': [] }, { 'background': [] }],
                    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                    ['link', 'image'],
                    ['clean']
                ]
            },
            placeholder: 'Tulis isi halaman buku di sini...'
        });
    }
    
    // Fungsi untuk menambahkan halaman baru
    function addNewPage() {
        const content = quillEditor.root.innerHTML;
        
        if (!content.trim()) {
            alert('Silakan tulis konten untuk halaman ini terlebih dahulu.');
            return;
        }
        
        const pageNumber = currentPageId++;
        
        // Tambahkan halaman ke preview
        const pagePreview = document.createElement('div');
        pagePreview.className = 'page-preview';
        pagePreview.innerHTML = `
            <h4>Halaman ${pageNumber}</h4>
            <div class="page-content">${content}</div>
            <button class="delete-page-btn" data-page="${pageNumber}">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
            </button>
        `;
        
        // Kosongkan editor
        quillEditor.root.innerHTML = '';
    }
    
    // Fungsi untuk menyimpan buku baru
    function saveBook(e) {
        e.preventDefault();
        
        const title = bookTitleInput.value.trim();
        const author = bookAuthorInput.value.trim();
        const category = bookCategoryInput.value;
        const description = bookDescriptionInput.value.trim();
        const cover = bookCoverInput.value.trim() || 'assets/images/default-book-cover.jpg';
        
        if (!title || !author || !description) {
            alert('Silakan lengkapi semua field yang diperlukan.');
            return;
        }
        
        // Buat objek buku baru
        const newBook = {
            id: generateBookId(),
            title,
            author,
            description,
            category,
            cover,
            pages: [
                { number: 1, content: '<h1>' + title + '</h1><p>' + description + '</p>' }
            ],
            read: false,
            lastReadPage: 1,
            bookmarked: false,
            views: 0,
            createdAt: new Date().toISOString()
        };
        
        // Tambahkan ke array books
        books.push(newBook);
        
        // Simpan ke localStorage
        localStorage.setItem('epedia_books', JSON.stringify(books));
        
        // Reset form
        addBookForm.reset();
        quillEditor.root.innerHTML = '';
        currentPageId = 1;
        
        // Tampilkan pesan sukses
        alert('Buku berhasil disimpan!');
        
        // Perbarui tampilan
        updateDashboardStats();
        displayRecentBooks();
        showSection('dashboard');
    }
    
    // Fungsi untuk menampilkan tabel buku
    function displayBooksTable() {
        booksTableBody.innerHTML = '';
        
        if (books.length === 0) {
            booksTableBody.innerHTML = '<tr><td colspan="6" style="text-align: center;">Tidak ada buku tersedia.</td></tr>';
            return;
        }
        
        books.forEach(book => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${getCategoryName(book.category)}</td>
                <td>${book.pages.length}</td>
                <td>${book.read ? 'Ya' : 'Tidak'}</td>
                <td>
                    <div class="action-btns">
                        <button class="action-btn edit" data-id="${book.id}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                            </svg>
                        </button>
                        <button class="action-btn delete" data-id="${book.id}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                <line x1="10" y1="11" x2="10" y2="17"></line>
                                <line x1="14" y1="11" x2="14" y2="17"></line>
                            </svg>
                        </button>
                    </div>
                </td>
            `;
            booksTableBody.appendChild(row);
        });
        
        // Tambahkan event listeners untuk tombol aksi
        document.querySelectorAll('.action-btn.edit').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const bookId = parseInt(btn.getAttribute('data-id'));
                editBook(bookId);
            });
        });
        
        document.querySelectorAll('.action-btn.delete').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const bookId = parseInt(btn.getAttribute('data-id'));
                confirmDeleteBook(bookId);
            });
        });
    }
    
    // Fungsi untuk memfilter buku di tabel
    function filterManageBooks() {
        const searchTerm = manageBooksSearch.value.toLowerCase();
        const selectedCategory = manageBooksCategoryFilter.value;
        
        const filteredBooks = books.filter(book => {
            const matchesSearch = book.title.toLowerCase().includes(searchTerm) || 
                                book.author.toLowerCase().includes(searchTerm);
            
            const matchesCategory = selectedCategory === 'all' || book.category === selectedCategory;
            
            return matchesSearch && matchesCategory;
        });
        
        // Tampilkan buku yang difilter
        if (filteredBooks.length === 0) {
            booksTableBody.innerHTML = '<tr><td colspan="6" style="text-align: center;">Tidak ada buku yang sesuai dengan kriteria pencarian.</td></tr>';
            return;
        }
        
        booksTableBody.innerHTML = '';
        filteredBooks.forEach(book => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${getCategoryName(book.category)}</td>
                <td>${book.pages.length}</td>
                <td>${book.read ? 'Ya' : 'Tidak'}</td>
                <td>
                    <div class="action-btns">
                        <button class="action-btn edit" data-id="${book.id}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                            </svg>
                        </button>
                        <button class="action-btn delete" data-id="${book.id}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                <line x1="10" y1="11" x2="10" y2="17"></line>
                                <line x1="14" y1="11" x2="14" y2="17"></line>
                            </svg>
                        </button>
                    </div>
                </td>
            `;
            booksTableBody.appendChild(row);
        });
        
        // Tambahkan event listeners untuk tombol aksi
        document.querySelectorAll('.action-btn.edit').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const bookId = parseInt(btn.getAttribute('data-id'));
                editBook(bookId);
            });
        });
        
        document.querySelectorAll('.action-btn.delete').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const bookId = parseInt(btn.getAttribute('data-id'));
                confirmDeleteBook(bookId);
            });
        });
    }
    
    // Fungsi untuk mengedit buku
    function editBook(bookId) {
        const book = books.find(b => b.id === bookId);
        if (!book) return;
        
        // Isi form dengan data buku
        bookTitleInput.value = book.title;
        bookAuthorInput.value = book.author;
        bookCategoryInput.value = book.category;
        bookDescriptionInput.value = book.description;
        bookCoverInput.value = book.cover;
        
        // Tampilkan section tambah buku
        showSection('addBook');
        
        // Scroll ke atas
        window.scrollTo(0, 0);
        
        // Tampilkan pesan bahwa ini adalah mode edit
        alert(`Anda sedang mengedit buku "${book.title}". Setelah selesai, klik "Simpan dan Terbitkan" untuk menyimpan perubahan.`);
    }
    
    // Fungsi untuk mengonfirmasi penghapusan buku
    function confirmDeleteBook(bookId) {
        const book = books.find(b => b.id === bookId);
        if (!book) return;
        
        confirmModalTitle.textContent = 'Konfirmasi Penghapusan';
        confirmModalMessage.textContent = `Anda yakin ingin menghapus buku "${book.title}"? Tindakan ini tidak dapat dibatalkan.`;
        
        // Setel fungsi konfirmasi
        confirmModalConfirm.onclick = function() {
            deleteBook(bookId);
            closeModal('confirmModal');
        };
        
        // Tampilkan modal
        confirmModal.style.display = 'block';
    }
    
    // Fungsi untuk menghapus buku
    function deleteBook(bookId) {
        books = books.filter(book => book.id !== bookId);
        localStorage.setItem('epedia_books', JSON.stringify(books));
        
        // Perbarui tampilan
        displayBooksTable();
        updateDashboardStats();
        displayRecentBooks();
    }
    
    // Fungsi untuk membuka tab pengaturan
    function openSettingsTab(tabId) {
        // Sembunyikan semua konten tab
        settingsTabContents.forEach(content => {
            content.classList.remove('active');
        });
        
        // Nonaktifkan semua tombol tab
        settingsTabs.forEach(tab => {
            tab.classList.remove('active');
        });
        
        // Tampilkan tab yang dipilih
        document.getElementById(tabId).classList.add('active');
        
        // Aktifkan tombol tab yang dipilih
        document.querySelector(`.tab-btn[data-tab="${tabId}"]`).classList.add('active');
    }
    
    // Fungsi untuk menyimpan pengaturan umum
    function saveGeneralSettings(e) {
        e.preventDefault();
        
        const theme = appThemeInput.value;
        const defaultFont = defaultFontInput.value;
        const defaultCover = defaultCoverInput.value.trim();
        
        // Simpan ke localStorage
        const settings = JSON.parse(localStorage.getItem('epedia_settings')) || {};
        settings.theme = theme;
        settings.defaultFont = defaultFont;
        if (defaultCover) settings.defaultCover = defaultCover;
        
        localStorage.setItem('epedia_settings', JSON.stringify(settings));
        
        // Terapkan perubahan tema
        document.documentElement.setAttribute('data-theme', theme);
        
        alert('Pengaturan umum berhasil disimpan!');
    }
    
    // Fungsi untuk mengganti password
    function changePassword(e) {
        e.preventDefault();
        
        const currentPassword = currentPasswordInput.value.trim();
        const newPassword = newPasswordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();
        
        if (currentPassword !== adminPassword) {
            alert('Password saat ini salah.');
            return;
        }
        
        if (newPassword !== confirmPassword) {
            alert('Password baru dan konfirmasi password tidak cocok.');
            return;
        }
        
        if (newPassword.length < 6) {
            alert('Password baru harus terdiri dari minimal 6 karakter.');
            return;
        }
        
        // Simpan password baru
        adminPassword = newPassword;
        
        const settings = JSON.parse(localStorage.getItem('epedia_settings')) || {};
        settings.adminPassword = adminPassword;
        localStorage.setItem('epedia_settings', JSON.stringify(settings));
        
        // Reset form
        securitySettingsForm.reset();
        
        alert('Password berhasil diubah!');
    }
    
    // Fungsi untuk membuat backup data
    function backupData() {
        const data = {
            books: books,
            settings: JSON.parse(localStorage.getItem('epedia_settings')) || {}
        };
        
        const dataStr = JSON.stringify(data, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const dataUrl = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = `epedia-backup-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        alert('Backup data berhasil dibuat!');
    }
    
    // Fungsi untuk memulihkan data dari backup
    function restoreData(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const data = JSON.parse(e.target.result);
                
                if (!data.books || !Array.isArray(data.books)) {
                    throw new Error('Format file backup tidak valid.');
                }
                
                // Konfirmasi sebelum restore
                confirmModalTitle.textContent = 'Konfirmasi Restore Data';
                confirmModalMessage.textContent = 'Anda yakin ingin memulihkan data dari backup? Semua data saat ini akan diganti.';
                
                confirmModalConfirm.onclick = function() {
                    // Simpan data
                    localStorage.setItem('epedia_books', JSON.stringify(data.books));
                    
                    if (data.settings) {
                        localStorage.setItem('epedia_settings', JSON.stringify(data.settings));
                    }
                    
                    // Muat ulang data
                    loadData();
                    
                    // Tutup modal
                    closeModal('confirmModal');
                    
                    alert('Data berhasil dipulihkan dari backup!');
                };
                
                // Tampilkan modal konfirmasi
                confirmModal.style.display = 'block';
                
            } catch (err) {
                alert('Gagal memproses file backup: ' + err.message);
            }
        };
        reader.readAsText(file);
    }
    
    // Fungsi untuk mengonfirmasi reset data
    function confirmResetData() {
        confirmModalTitle.textContent = 'Konfirmasi Reset Data';
        confirmModalMessage.textContent = 'Anda yakin ingin mereset semua data? Semua buku dan pengaturan akan dihapus dan dikembalikan ke keadaan awal. Tindakan ini tidak dapat dibatalkan.';
        
        confirmModalConfirm.onclick = function() {
            resetAllData();
            closeModal('confirmModal');
        };
        
        confirmModal.style.display = 'block';
    }
    
    // Fungsi untuk mereset semua data
    function resetAllData() {
        localStorage.removeItem('epedia_books');
        localStorage.removeItem('epedia_settings');
        
        // Muat ulang data default
        loadData();
        
        alert('Semua data telah direset ke pengaturan awal.');
    }
    
    // Fungsi untuk menampilkan pratinjau buku
    function previewBook() {
        const title = bookTitleInput.value.trim();
        const author = bookAuthorInput.value.trim();
        const description = bookDescriptionInput.value.trim();
        const content = quillEditor.root.innerHTML;
        
        if (!title || !content) {
            alert('Judul dan konten halaman harus diisi untuk melihat pratinjau.');
            return;
        }
        
        previewContainer.innerHTML = `
            <h3>${title}</h3>
            ${author ? `<p><strong>Oleh:</strong> ${author}</p>` : ''}
            ${description ? `<p><strong>Deskripsi:</strong> ${description}</p>` : ''}
            <hr>
            <div class="preview-content">${content}</div>
        `;
        
        previewModal.style.display = 'block';
    }
    
    // Fungsi untuk logout
    function logout() {
        window.location.href = '../index.html';
    }
    
    // Fungsi untuk menutup modal
    function closeModal(modalId) {
        if (modalId) {
            document.getElementById(modalId).style.display = 'none';
        } else {
            previewModal.style.display = 'none';
            confirmModal.style.display = 'none';
        }
    }
    
    // Fungsi bantu untuk menghasilkan ID buku baru
    function generateBookId() {
        return books.length > 0 ? Math.max(...books.map(book => book.id)) + 1 : 1;
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
});

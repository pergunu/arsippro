<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>E-pedia - Perpustakaan Digital Interaktif</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        :root {
            --primary-color: #4a6fa5;
            --secondary-color: #166088;
            --accent-color: #4fc3f7;
            --light-color: #f8f9fa;
            --dark-color: #343a40;
            --success-color: #28a745;
            --warning-color: #ffc107;
            --danger-color: #dc3545;
            --page-bg: #f5f5f5;
            --book-bg: #fff;
            --text-color: #333;
            --shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        [data-theme="dark"] {
            --primary-color: #5d7eb6;
            --secondary-color: #2a7ab0;
            --accent-color: #64b5f6;
            --light-color: #343a40;
            --dark-color: #f8f9fa;
            --page-bg: #121212;
            --book-bg: #1e1e1e;
            --text-color: #e0e0e0;
            --shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            transition: background-color 0.3s, color 0.3s;
        }

        body {
            background-color: var(--page-bg);
            color: var(--text-color);
            min-height: 100vh;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }

        /* Header Styles */
        header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 0;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
            margin-bottom: 30px;
        }

        .logo-container {
            display: flex;
            align-items: center;
        }

        .logo {
            height: 50px;
            margin-right: 15px;
        }

        .app-title h1 {
            font-size: 1.8rem;
            color: var(--primary-color);
            margin-bottom: 5px;
        }

        .app-title p {
            font-size: 0.9rem;
            color: var(--text-color);
            opacity: 0.8;
        }

        .theme-toggle {
            background: none;
            border: none;
            font-size: 1.5rem;
            color: var(--text-color);
            cursor: pointer;
        }

        /* Main Content Styles */
        .main-content {
            display: grid;
            grid-template-columns: 250px 1fr;
            gap: 20px;
        }

        @media (max-width: 768px) {
            .main-content {
                grid-template-columns: 1fr;
            }
        }

        /* Sidebar Styles */
        .sidebar {
            background-color: var(--book-bg);
            border-radius: 8px;
            padding: 20px;
            box-shadow: var(--shadow);
            height: fit-content;
        }

        .sidebar h2 {
            font-size: 1.3rem;
            margin-bottom: 15px;
            color: var(--primary-color);
            padding-bottom: 10px;
            border-bottom: 2px solid var(--accent-color);
        }

        .category-list {
            list-style: none;
        }

        .category-item {
            margin-bottom: 10px;
        }

        .category-link {
            display: block;
            padding: 8px 10px;
            color: var(--text-color);
            text-decoration: none;
            border-radius: 4px;
            transition: all 0.2s;
        }

        .category-link:hover, .category-link.active {
            background-color: var(--primary-color);
            color: white;
        }

        .category-link i {
            margin-right: 8px;
        }

        /* Book List Styles */
        .book-section {
            margin-bottom: 40px;
        }

        .section-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }

        .section-title {
            font-size: 1.5rem;
            color: var(--primary-color);
        }

        .view-all {
            color: var(--primary-color);
            text-decoration: none;
            font-size: 0.9rem;
        }

        .book-list {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 20px;
        }

        @media (max-width: 600px) {
            .book-list {
                grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            }
        }

        .book-card {
            background-color: var(--book-bg);
            border-radius: 8px;
            overflow: hidden;
            box-shadow: var(--shadow);
            transition: transform 0.3s;
            cursor: pointer;
            position: relative;
        }

        .book-card:hover {
            transform: translateY(-5px);
        }

        .book-cover {
            height: 200px;
            background-color: #eee;
            display: flex;
            align-items: center;
            justify-content: center;
            background-size: cover;
            background-position: center;
        }

        .book-cover img {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
        }

        .default-cover {
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            color: white;
            font-size: 2rem;
        }

        .book-info {
            padding: 15px;
        }

        .book-title {
            font-weight: bold;
            margin-bottom: 5px;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }

        .book-author {
            font-size: 0.8rem;
            color: var(--text-color);
            opacity: 0.7;
            margin-bottom: 10px;
        }

        .book-meta {
            display: flex;
            justify-content: space-between;
            font-size: 0.8rem;
            color: var(--text-color);
            opacity: 0.7;
        }

        .read-progress {
            position: absolute;
            top: 10px;
            right: 10px;
            background-color: var(--success-color);
            color: white;
            padding: 3px 8px;
            border-radius: 20px;
            font-size: 0.7rem;
        }

        /* Book Reader Modal */
        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            z-index: 1000;
            overflow-y: auto;
        }

        .modal-content {
            background-color: var(--book-bg);
            margin: 20px auto;
            width: 90%;
            max-width: 900px;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            position: relative;
            padding: 20px;
        }

        .close-modal {
            position: absolute;
            top: 15px;
            right: 15px;
            font-size: 1.5rem;
            color: var(--text-color);
            cursor: pointer;
            z-index: 10;
        }

        .book-reader {
            position: relative;
            width: 100%;
            min-height: 500px;
            background-color: var(--book-bg);
            border-radius: 5px;
            overflow: hidden;
        }

        .book-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 0;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
            margin-bottom: 20px;
        }

        .book-header h2 {
            font-size: 1.3rem;
            color: var(--primary-color);
        }

        .book-controls {
            display: flex;
            gap: 10px;
        }

        .book-controls button {
            background-color: var(--primary-color);
            color: white;
            border: none;
            padding: 5px 10px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 0.9rem;
        }

        .book-controls button:hover {
            background-color: var(--secondary-color);
        }

        .book-pages {
            display: flex;
            flex-direction: column;
            gap: 20px;
        }

        .book-page {
            background-color: var(--book-bg);
            padding: 30px;
            border-radius: 5px;
            box-shadow: var(--shadow);
            position: relative;
            min-height: 400px;
        }

        .page-number {
            position: absolute;
            bottom: 10px;
            right: 20px;
            font-size: 0.9rem;
            color: var(--text-color);
            opacity: 0.7;
        }

        .page-navigation {
            display: flex;
            justify-content: space-between;
            margin-top: 20px;
        }

        .page-navigation button {
            background-color: var(--primary-color);
            color: white;
            border: none;
            padding: 8px 15px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 1rem;
        }

        .page-navigation button:disabled {
            background-color: #ccc;
            cursor: not-allowed;
        }

        .mark-read {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-top: 20px;
        }

        .mark-read input {
            width: 18px;
            height: 18px;
        }

        /* Admin Button */
        .admin-btn {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background-color: var(--primary-color);
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
            cursor: pointer;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
            z-index: 100;
        }

        .admin-btn:hover {
            background-color: var(--secondary-color);
        }

        .tooltip {
            position: absolute;
            right: 60px;
            background-color: var(--dark-color);
            color: white;
            padding: 5px 10px;
            border-radius: 4px;
            font-size: 0.8rem;
            white-space: nowrap;
            opacity: 0;
            transition: opacity 0.3s;
            pointer-events: none;
        }

        .admin-btn:hover .tooltip {
            opacity: 1;
        }

        /* Admin Modal */
        .admin-modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            z-index: 1000;
        }

        .admin-content {
            background-color: var(--book-bg);
            margin: 50px auto;
            width: 90%;
            max-width: 1000px;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            position: relative;
            padding: 20px;
            max-height: 80vh;
            overflow-y: auto;
        }

        .admin-tabs {
            display: flex;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
            margin-bottom: 20px;
        }

        .admin-tab {
            padding: 10px 20px;
            cursor: pointer;
            border-bottom: 3px solid transparent;
        }

        .admin-tab.active {
            border-bottom: 3px solid var(--primary-color);
            font-weight: bold;
        }

        .tab-content {
            display: none;
        }

        .tab-content.active {
            display: block;
        }

        .form-group {
            margin-bottom: 15px;
        }

        .form-group label {
            display: block;
            margin-bottom: 5px;
            font-weight: 500;
        }

        .form-group input, 
        .form-group textarea, 
        .form-group select {
            width: 100%;
            padding: 8px 12px;
            border: 1px solid #ddd;
            border-radius: 4px;
            background-color: var(--book-bg);
            color: var(--text-color);
        }

        .form-group textarea {
            min-height: 100px;
            resize: vertical;
        }

        .btn {
            background-color: var(--primary-color);
            color: white;
            border: none;
            padding: 8px 15px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 1rem;
        }

        .btn:hover {
            background-color: var(--secondary-color);
        }

        .btn-danger {
            background-color: var(--danger-color);
        }

        .btn-danger:hover {
            background-color: #c82333;
        }

        .book-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }

        .book-table th, .book-table td {
            padding: 10px;
            border: 1px solid #ddd;
            text-align: left;
        }

        .book-table th {
            background-color: var(--primary-color);
            color: white;
        }

        .book-table tr:nth-child(even) {
            background-color: rgba(0, 0, 0, 0.05);
        }

        .action-btn {
            padding: 5px 8px;
            margin-right: 5px;
            border: none;
            border-radius: 3px;
            cursor: pointer;
        }

        .edit-btn {
            background-color: var(--warning-color);
            color: #212529;
        }

        .delete-btn {
            background-color: var(--danger-color);
            color: white;
        }

        /* Login Modal */
        .login-modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            z-index: 1000;
        }

        .login-content {
            background-color: var(--book-bg);
            margin: 100px auto;
            width: 90%;
            max-width: 400px;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            position: relative;
            padding: 30px;
        }

        .login-content h2 {
            text-align: center;
            margin-bottom: 20px;
            color: var(--primary-color);
        }

        /* Responsive Adjustments */
        @media (max-width: 480px) {
            header {
                flex-direction: column;
                text-align: center;
            }
            
            .logo-container {
                margin-bottom: 15px;
            }
            
            .book-reader {
                min-height: 300px;
            }
            
            .book-page {
                padding: 15px;
                min-height: 300px;
            }
        }

        /* Animation */
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        .fade-in {
            animation: fadeIn 0.5s ease-in;
        }

        /* Toast Notification */
        .toast {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background-color: var(--success-color);
            color: white;
            padding: 12px 24px;
            border-radius: 4px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 1000;
            display: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <div class="logo-container">
                <img src="https://github.com/pergunu/easypedia/blob/main/assets/images/logo_e-pedia.png?raw=true" alt="E-pedia Logo" class="logo">
                <div class="app-title">
                    <h1>E-pedia (Easy Pedia)</h1>
                    <p>Perpustakaan Digital Interaktif</p>
                </div>
            </div>
            <button class="theme-toggle" id="themeToggle">
                <i class="fas fa-moon"></i>
            </button>
        </header>

        <div class="main-content">
            <aside class="sidebar">
                <h2>Kategori</h2>
                <ul class="category-list">
                    <li class="category-item"><a href="#" class="category-link active"><i class="fas fa-book-open"></i> Semua Buku</a></li>
                    <li class="category-item"><a href="#" class="category-link"><i class="fas fa-graduation-cap"></i> Pendidikan</a></li>
                    <li class="category-item"><a href="#" class="category-link"><i class="fas fa-mosque"></i> Agama</a></li>
                    <li class="category-item"><a href="#" class="category-link"><i class="fas fa-book"></i> Sastra</a></li>
                    <li class="category-item"><a href="#" class="category-link"><i class="fas fa-flask"></i> Sains</a></li>
                    <li class="category-item"><a href="#" class="category-link"><i class="fas fa-history"></i> Sejarah</a></li>
                </ul>
            </aside>

            <main>
                <section class="book-section">
                    <div class="section-header">
                        <h2 class="section-title">Buku Terbaru</h2>
                        <a href="#" class="view-all">Lihat Semua</a>
                    </div>
                    <div class="book-list" id="bookList">
                        <!-- Book cards will be inserted here by JavaScript -->
                    </div>
                </section>

                <section class="book-section">
                    <div class="section-header">
                        <h2 class="section-title">Paling Banyak Dibaca</h2>
                        <a href="#" class="view-all">Lihat Semua</a>
                    </div>
                    <div class="book-list">
                        <!-- Popular books will be inserted here by JavaScript -->
                    </div>
                </section>
            </main>
        </div>
    </div>

    <!-- Book Reader Modal -->
    <div class="modal" id="bookModal">
        <div class="modal-content">
            <span class="close-modal" id="closeModal">&times;</span>
            <div class="book-reader" id="bookReader">
                <!-- Book content will be inserted here by JavaScript -->
            </div>
        </div>
    </div>

    <!-- Admin Button -->
    <div class="admin-btn" id="adminBtn">
        <i class="fas fa-cog"></i>
        <span class="tooltip">Kontrol Panel Admin</span>
    </div>

    <!-- Admin Login Modal -->
    <div class="login-modal" id="loginModal">
        <div class="login-content">
            <h2>Masuk ke Panel Admin</h2>
            <div class="form-group">
                <label for="adminPassword">Kode Sandi Admin</label>
                <input type="password" id="adminPassword" placeholder="Masukkan kode sandi">
            </div>
            <button class="btn" id="loginBtn">Masuk</button>
        </div>
    </div>

    <!-- Admin Panel Modal -->
    <div class="admin-modal" id="adminModal">
        <div class="admin-content">
            <span class="close-modal" id="closeAdminModal">&times;</span>
            <h2>Panel Admin E-pedia</h2>
            
            <div class="admin-tabs">
                <div class="admin-tab active" data-tab="add-book">Tambah Buku</div>
                <div class="admin-tab" data-tab="manage-books">Kelola Buku</div>
                <div class="admin-tab" data-tab="settings">Pengaturan</div>
            </div>
            
            <div class="tab-content active" id="add-book">
                <form id="addBookForm">
                    <div class="form-group">
                        <label for="bookTitle">Judul Buku</label>
                        <input type="text" id="bookTitle" required>
                    </div>
                    <div class="form-group">
                        <label for="bookAuthor">Penulis</label>
                        <input type="text" id="bookAuthor" required>
                    </div>
                    <div class="form-group">
                        <label for="bookCategory">Kategori</label>
                        <select id="bookCategory" required>
                            <option value="pendidikan">Pendidikan</option>
                            <option value="agama">Agama</option>
                            <option value="sastra">Sastra</option>
                            <option value="sains">Sains</option>
                            <option value="sejarah">Sejarah</option>
                            <option value="umum">Umum</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="bookDescription">Deskripsi</label>
                        <textarea id="bookDescription" required></textarea>
                    </div>
                    <div class="form-group">
                        <label for="bookCover">Cover Buku (URL Gambar)</label>
                        <input type="text" id="bookCover">
                    </div>
                    <div class="form-group">
                        <label>Halaman Buku</label>
                        <div id="bookPagesContainer">
                            <div class="form-group page-group">
                                <textarea class="page-content" placeholder="Isi halaman 1"></textarea>
                            </div>
                        </div>
                        <button type="button" class="btn" id="addPageBtn">Tambah Halaman</button>
                    </div>
                    <button type="submit" class="btn">Simpan dan Terbitkan</button>
                </form>
            </div>
            
            <div class="tab-content" id="manage-books">
                <table class="book-table">
                    <thead>
                        <tr>
                            <th>Judul</th>
                            <th>Penulis</th>
                            <th>Kategori</th>
                            <th>Halaman</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody id="bookTableBody">
                        <!-- Books will be inserted here by JavaScript -->
                    </tbody>
                </table>
            </div>
            
            <div class="tab-content" id="settings">
                <div class="form-group">
                    <label for="newPassword">Ganti Kode Sandi Admin</label>
                    <input type="password" id="newPassword" placeholder="Kode sandi baru">
                    <input type="password" id="confirmPassword" placeholder="Konfirmasi kode sandi">
                    <button class="btn" id="changePasswordBtn">Simpan Perubahan</button>
                </div>
                <div class="form-group">
                    <label>Reset Data</label>
                    <button class="btn btn-danger" id="resetDataBtn">Reset Semua Data</button>
                    <p class="warning-text">Peringatan: Aksi ini akan menghapus semua data buku dan tidak dapat dikembalikan!</p>
                </div>
                <div class="form-group">
                    <label>Backup/Restore</label>
                    <button class="btn" id="exportDataBtn">Export Data ke JSON</button>
                    <input type="file" id="importDataInput" accept=".json" style="display: none;">
                    <button class="btn" id="importDataBtn">Import Data dari JSON</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Toast Notification -->
    <div class="toast" id="toast"></div>

    <script>
        // Sample book data
        let books = [
            {
                id: 1,
                title: "Pengantar Pendidikan Karakter",
                author: "Dr. Ahmad Fauzi",
                category: "pendidikan",
                description: "Buku ini membahas konsep dasar pendidikan karakter dan implementasinya di sekolah.",
                cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
                pages: [
                    "Pendidikan karakter merupakan aspek penting dalam pembentukan kepribadian seseorang...",
                    "Pada bab ini akan dibahas tentang teori-teori dasar pendidikan karakter...",
                    "Implementasi pendidikan karakter di sekolah memerlukan pendekatan yang holistik..."
                ],
                readStatus: [false, false, false]
            },
            {
                id: 2,
                title: "Fiqih Ibadah untuk Pemula",
                author: "Ust. Muhammad Ali",
                category: "agama",
                description: "Panduan lengkap tata cara ibadah sehari-hari menurut ajaran Islam.",
                cover: "https://images.unsplash.com/photo-1568219656418-15c329312bf1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
                pages: [
                    "Pengertian ibadah dalam Islam mencakup segala aktivitas yang dilakukan untuk mendekatkan diri kepada Allah...",
                    "Tata cara wudhu yang benar sesuai sunnah Nabi Muhammad SAW...",
                    "Syarat dan rukun shalat beserta penjelasannya..."
                ],
                readStatus: [false, false, false]
            },
            {
                id: 3,
                title: "Dasar-dasar Pemrograman Web",
                author: "Budi Raharjo",
                category: "sains",
                description: "Buku panduan belajar pemrograman web dari dasar untuk pemula.",
                cover: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
                pages: [
                    "Pengenalan tentang HTML dan struktur dasar dokumen web...",
                    "CSS digunakan untuk mengatur tampilan dan layout halaman web...",
                    "JavaScript memberikan interaktivitas pada halaman web..."
                ],
                readStatus: [false, false, false]
            },
            {
                id: 4,
                title: "Sejarah Peradaban Islam",
                author: "Prof. Abdul Karim",
                category: "sejarah",
                description: "Tinjauan komprehensif tentang perkembangan peradaban Islam dari masa ke masa.",
                cover: "https://images.unsplash.com/photo-1579273166152-d725a4e2b755?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
                pages: [
                    "Periode awal perkembangan Islam di Mekkah dan Madinah...",
                    "Ekspansi Islam pada masa Khulafaur Rasyidin...",
                    "Pencapaian ilmu pengetahuan pada masa Dinasti Abbasiyah..."
                ],
                readStatus: [false, false, false]
            },
            {
                id: 5,
                title: "Kumpulan Puisi Modern",
                author: "Siti Aminah",
                category: "sastra",
                description: "Antologi puisi-puisi modern yang menggugah perasaan dan pikiran.",
                cover: "https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
                pages: [
                    "Dalam diam ku temukan suara,\nSuara hati yang tak terucap...",
                    "Langit malam bertabur bintang,\nMenyimpan sejuta cerita yang tak terungkap...",
                    "Hujan turun membasahi bumi,\nSeperti air mata yang tak terbendung..."
                ],
                readStatus: [false, false, false]
            }
        ];

        // Admin password (default: 65614222)
        let adminPassword = "65614222";

        // Current state
        let currentBook = null;
        let currentPage = 0;
        let darkMode = false;

        // DOM Elements
        const bookListEl = document.getElementById('bookList');
        const bookModalEl = document.getElementById('bookModal');
        const bookReaderEl = document.getElementById('bookReader');
        const closeModalEl = document.getElementById('closeModal');
        const adminBtnEl = document.getElementById('adminBtn');
        const loginModalEl = document.getElementById('loginModal');
        const adminModalEl = document.getElementById('adminModal');
        const closeAdminModalEl = document.getElementById('closeAdminModal');
        const adminPasswordEl = document.getElementById('adminPassword');
        const loginBtnEl = document.getElementById('loginBtn');
        const themeToggleEl = document.getElementById('themeToggle');
        const toastEl = document.getElementById('toast');
        const addBookFormEl = document.getElementById('addBookForm');
        const bookPagesContainerEl = document.getElementById('bookPagesContainer');
        const addPageBtnEl = document.getElementById('addPageBtn');
        const bookTableBodyEl = document.getElementById('bookTableBody');
        const newPasswordEl = document.getElementById('newPassword');
        const confirmPasswordEl = document.getElementById('confirmPassword');
        const changePasswordBtnEl = document.getElementById('changePasswordBtn');
        const resetDataBtnEl = document.getElementById('resetDataBtn');
        const exportDataBtnEl = document.getElementById('exportDataBtn');
        const importDataBtnEl = document.getElementById('importDataBtn');
        const importDataInputEl = document.getElementById('importDataInput');

        // Tab switching
        const adminTabs = document.querySelectorAll('.admin-tab');
        const tabContents = document.querySelectorAll('.tab-content');

        adminTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const tabId = tab.getAttribute('data-tab');
                
                // Update active tab
                adminTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                // Show corresponding content
                tabContents.forEach(content => {
                    content.classList.remove('active');
                    if (content.id === tabId) {
                        content.classList.add('active');
                    }
                });

                // If manage books tab is selected, refresh the table
                if (tabId === 'manage-books') {
                    renderBookTable();
                }
            });
        });

        // Initialize the app
        function init() {
            renderBookList();
            loadReadStatus();
            checkDarkModePreference();
            
            // Load books from localStorage if available
            const savedBooks = localStorage.getItem('epedia_books');
            if (savedBooks) {
                books = JSON.parse(savedBooks);
                renderBookList();
            }
            
            // Load admin password from localStorage if available
            const savedPassword = localStorage.getItem('epedia_admin_password');
            if (savedPassword) {
                adminPassword = savedPassword;
            }
        }

        // Render book list
        function renderBookList() {
            bookListEl.innerHTML = '';
            
            books.forEach(book => {
                const readCount = book.readStatus.filter(status => status).length;
                const progress = readCount > 0 ? `${readCount}/${book.pages.length}` : '';
                
                const bookCard = document.createElement('div');
                bookCard.className = 'book-card';
                bookCard.innerHTML = `
                    <div class="book-cover ${!book.cover ? 'default-cover' : ''}" 
                         style="${book.cover ? `background-image: url('${book.cover}')` : ''}">
                        ${!book.cover ? `<i class="fas fa-book"></i>` : ''}
                    </div>
                    <div class="book-info">
                        <div class="book-title">${book.title}</div>
                        <div class="book-author">${book.author}</div>
                        <div class="book-meta">
                            <span>${book.category}</span>
                            <span>${book.pages.length} hlm</span>
                        </div>
                    </div>
                    ${progress ? `<div class="read-progress">${progress}</div>` : ''}
                `;
                
                bookCard.addEventListener('click', () => openBook(book.id));
                bookListEl.appendChild(bookCard);
            });
        }

        // Render book table for admin
        function renderBookTable() {
            bookTableBodyEl.innerHTML = '';
            
            books.forEach(book => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.category}</td>
                    <td>${book.pages.length}</td>
                    <td>
                        <button class="action-btn edit-btn" data-id="${book.id}"><i class="fas fa-edit"></i></button>
                        <button class="action-btn delete-btn" data-id="${book.id}"><i class="fas fa-trash"></i></button>
                    </td>
                `;
                bookTableBodyEl.appendChild(row);
            });
            
            // Add event listeners to edit and delete buttons
            document.querySelectorAll('.edit-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const bookId = parseInt(e.target.closest('button').getAttribute('data-id'));
                    editBook(bookId);
                });
            });
            
            document.querySelectorAll('.delete-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const bookId = parseInt(e.target.closest('button').getAttribute('data-id'));
                    deleteBook(bookId);
                });
            });
        }

        // Open book in reader
        function openBook(bookId) {
            currentBook = books.find(book => book.id === bookId);
            currentPage = 0;
            
            // Check if there's a saved page for this book
            const savedPage = localStorage.getItem(`epedia_book_${bookId}_page`);
            if (savedPage) {
                currentPage = parseInt(savedPage);
            }
            
            renderBookReader();
            bookModalEl.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }

        // Render book reader content
        function renderBookReader() {
            if (!currentBook) return;
            
            bookReaderEl.innerHTML = `
                <div class="book-header">
                    <h2>${currentBook.title}</h2>
                    <div class="book-controls">
                        <button id="prevPageBtn" ${currentPage === 0 ? 'disabled' : ''}>Sebelumnya</button>
                        <button id="nextPageBtn" ${currentPage === currentBook.pages.length - 1 ? 'disabled' : ''}>Selanjutnya</button>
                    </div>
                </div>
                <div class="book-pages">
                    <div class="book-page">
                        ${formatPageContent(currentBook.pages[currentPage])}
                        <div class="page-number">Halaman ${currentPage + 1} dari ${currentBook.pages.length}</div>
                    </div>
                </div>
                <div class="page-navigation">
                    <button id="prevPageBtnBottom" ${currentPage === 0 ? 'disabled' : ''}><i class="fas fa-arrow-left"></i> Sebelumnya</button>
                    <div class="mark-read">
                        <input type="checkbox" id="markReadCheckbox" ${currentBook.readStatus[currentPage] ? 'checked' : ''}>
                        <label for="markReadCheckbox">Tandai sebagai selesai dibaca</label>
                    </div>
                    <button id="nextPageBtnBottom" ${currentPage === currentBook.pages.length - 1 ? 'disabled' : ''}>Selanjutnya <i class="fas fa-arrow-right"></i></button>
                </div>
            `;
            
            // Add event listeners to navigation buttons
            document.getElementById('prevPageBtn').addEventListener('click', goToPreviousPage);
            document.getElementById('nextPageBtn').addEventListener('click', goToNextPage);
            document.getElementById('prevPageBtnBottom').addEventListener('click', goToPreviousPage);
            document.getElementById('nextPageBtnBottom').addEventListener('click', goToNextPage);
            
            // Add event listener to mark as read checkbox
            document.getElementById('markReadCheckbox').addEventListener('change', (e) => {
                currentBook.readStatus[currentPage] = e.target.checked;
                saveReadStatus();
                renderBookList(); // Update progress in book list
            });
            
            // Save current page to localStorage
            localStorage.setItem(`epedia_book_${currentBook.id}_page`, currentPage);
        }

        // Format page content (preserve line breaks)
        function formatPageContent(content) {
            return content.replace(/\n/g, '<br>');
        }

        // Navigation functions
        function goToPreviousPage() {
            if (currentPage > 0) {
                currentPage--;
                renderBookReader();
            }
        }

        function goToNextPage() {
            if (currentPage < currentBook.pages.length - 1) {
                currentPage++;
                renderBookReader();
            }
        }

        // Load read status from localStorage
        function loadReadStatus() {
            books.forEach(book => {
                const savedStatus = localStorage.getItem(`epedia_book_${book.id}_read_status`);
                if (savedStatus) {
                    book.readStatus = JSON.parse(savedStatus);
                }
            });
        }

        // Save read status to localStorage
        function saveReadStatus() {
            if (!currentBook) return;
            
            localStorage.setItem(`epedia_book_${currentBook.id}_read_status`, JSON.stringify(currentBook.readStatus));
        }

        // Admin functions
        function showAdminLogin() {
            loginModalEl.style.display = 'block';
            adminPasswordEl.focus();
        }

        function loginAdmin() {
            const password = adminPasswordEl.value;
            
            if (password === adminPassword) {
                loginModalEl.style.display = 'none';
                adminModalEl.style.display = 'block';
                adminPasswordEl.value = '';
                renderBookTable();
            } else {
                showToast('Kode sandi salah!', 'error');
            }
        }

        function addNewBook(e) {
            e.preventDefault();
            
            const title = document.getElementById('bookTitle').value;
            const author = document.getElementById('bookAuthor').value;
            const category = document.getElementById('bookCategory').value;
            const description = document.getElementById('bookDescription').value;
            const cover = document.getElementById('bookCover').value;
            
            const pageElements = document.querySelectorAll('.page-content');
            const pages = Array.from(pageElements).map(el => el.value).filter(page => page.trim() !== '');
            
            if (pages.length === 0) {
                showToast('Buku harus memiliki setidaknya satu halaman!', 'error');
                return;
            }
            
            const newBook = {
                id: books.length > 0 ? Math.max(...books.map(book => book.id)) + 1 : 1,
                title,
                author,
                category,
                description,
                cover,
                pages,
                readStatus: new Array(pages.length).fill(false)
            };
            
            books.push(newBook);
            saveBooksToLocalStorage();
            
            // Reset form
            addBookFormEl.reset();
            bookPagesContainerEl.innerHTML = `
                <div class="form-group page-group">
                    <textarea class="page-content" placeholder="Isi halaman 1"></textarea>
                </div>
            `;
            
            showToast('Buku berhasil ditambahkan!', 'success');
            renderBookList();
        }

        function addNewPage() {
            const pageCount = document.querySelectorAll('.page-content').length + 1;
            const pageGroup = document.createElement('div');
            pageGroup.className = 'form-group page-group';
            pageGroup.innerHTML = `
                <textarea class="page-content" placeholder="Isi halaman ${pageCount}"></textarea>
            `;
            bookPagesContainerEl.appendChild(pageGroup);
        }

        function editBook(bookId) {
            const book = books.find(b => b.id === bookId);
            if (!book) return;
            
            // Switch to add book tab and populate form
            document.querySelector('.admin-tab[data-tab="add-book"]').click();
            
            // Fill form with book data
            document.getElementById('bookTitle').value = book.title;
            document.getElementById('bookAuthor').value = book.author;
            document.getElementById('bookCategory').value = book.category;
            document.getElementById('bookDescription').value = book.description;
            document.getElementById('bookCover').value = book.cover || '';
            
            // Add pages
            bookPagesContainerEl.innerHTML = '';
            book.pages.forEach((page, index) => {
                const pageGroup = document.createElement('div');
                pageGroup.className = 'form-group page-group';
                pageGroup.innerHTML = `
                    <textarea class="page-content" placeholder="Isi halaman ${index + 1}">${page}</textarea>
                `;
                bookPagesContainerEl.appendChild(pageGroup);
            });
            
            // Scroll to top
            window.scrollTo(0, 0);
            
            // Temporarily store the book ID for updating
            addBookFormEl.dataset.editingId = bookId;
        }

        function deleteBook(bookId) {
            if (confirm('Apakah Anda yakin ingin menghapus buku ini?')) {
                books = books.filter(book => book.id !== bookId);
                saveBooksToLocalStorage();
                renderBookTable();
                renderBookList();
                showToast('Buku berhasil dihapus!', 'success');
            }
        }

        function changePassword() {
            const newPassword = newPasswordEl.value;
            const confirmPassword = confirmPasswordEl.value;
            
            if (newPassword !== confirmPassword) {
                showToast('Kata sandi tidak cocok!', 'error');
                return;
            }
            
            if (newPassword.length < 6) {
                showToast('Kata sandi harus minimal 6 karakter!', 'error');
                return;
            }
            
            adminPassword = newPassword;
            localStorage.setItem('epedia_admin_password', adminPassword);
            
            newPasswordEl.value = '';
            confirmPasswordEl.value = '';
            
            showToast('Kata sandi berhasil diubah!', 'success');
        }

        function resetAllData() {
            if (confirm('Apakah Anda yakin ingin mereset semua data? Aksi ini tidak dapat dibatalkan!')) {
                localStorage.clear();
                books = [];
                saveBooksToLocalStorage();
                renderBookTable();
                renderBookList();
                showToast('Semua data telah direset!', 'success');
            }
        }

        function exportData() {
            const data = {
                books: books,
                adminPassword: adminPassword
            };
            
            const dataStr = JSON.stringify(data, null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });
            const dataUrl = URL.createObjectURL(dataBlob);
            
            const downloadLink = document.createElement('a');
            downloadLink.href = dataUrl;
            downloadLink.download = `epedia-backup-${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
            
            showToast('Data berhasil diexport!', 'success');
        }

        function importData() {
            importDataInputEl.click();
        }

        function handleFileImport(e) {
            const file = e.target.files[0];
            if (!file) return;
            
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const data = JSON.parse(event.target.result);
                    
                    if (data.books && Array.isArray(data.books)) {
                        books = data.books;
                        if (data.adminPassword) {
                            adminPassword = data.adminPassword;
                            localStorage.setItem('epedia_admin_password', adminPassword);
                        }
                        
                        saveBooksToLocalStorage();
                        renderBookTable();
                        renderBookList();
                        showToast('Data berhasil diimport!', 'success');
                    } else {
                        showToast('Format file tidak valid!', 'error');
                    }
                } catch (error) {
                    showToast('Gagal memproses file!', 'error');
                    console.error(error);
                }
            };
            reader.readAsText(file);
            
            // Reset input to allow importing the same file again
            e.target.value = '';
        }

        function saveBooksToLocalStorage() {
            localStorage.setItem('epedia_books', JSON.stringify(books));
        }

        // Theme functions
        function checkDarkModePreference() {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            const savedTheme = localStorage.getItem('epedia_theme');
            
            if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
                enableDarkMode();
            }
        }

        function toggleDarkMode() {
            if (darkMode) {
                disableDarkMode();
            } else {
                enableDarkMode();
            }
        }

        function enableDarkMode() {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeToggleEl.innerHTML = '<i class="fas fa-sun"></i>';
            darkMode = true;
            localStorage.setItem('epedia_theme', 'dark');
        }

        function disableDarkMode() {
            document.documentElement.removeAttribute('data-theme');
            themeToggleEl.innerHTML = '<i class="fas fa-moon"></i>';
            darkMode = false;
            localStorage.setItem('epedia_theme', 'light');
        }

        // Toast notification
        function showToast(message, type = 'success') {
            toastEl.textContent = message;
            toastEl.style.display = 'block';
            toastEl.style.backgroundColor = type === 'error' ? 'var(--danger-color)' : 'var(--success-color)';
            
            setTimeout(() => {
                toastEl.style.display = 'none';
            }, 3000);
        }

        // Event listeners
        closeModalEl.addEventListener('click', () => {
            bookModalEl.style.display = 'none';
            document.body.style.overflow = 'auto';
        });

        window.addEventListener('click', (e) => {
            if (e.target === bookModalEl) {
                bookModalEl.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
            
            if (e.target === loginModalEl) {
                loginModalEl.style.display = 'none';
            }
            
            if (e.target === adminModalEl) {
                adminModalEl.style.display = 'none';
            }
        });

        adminBtnEl.addEventListener('click', showAdminLogin);
        loginBtnEl.addEventListener('click', loginAdmin);
        themeToggleEl.addEventListener('click', toggleDarkMode);
        addBookFormEl.addEventListener('submit', addNewBook);
        addPageBtnEl.addEventListener('click', addNewPage);
        changePasswordBtnEl.addEventListener('click', changePassword);
        resetDataBtnEl.addEventListener('click', resetAllData);
        exportDataBtnEl.addEventListener('click', exportData);
        importDataBtnEl.addEventListener('click', importData);
        importDataInputEl.addEventListener('change', handleFileImport);

        // Keyboard navigation in book reader
        document.addEventListener('keydown', (e) => {
            if (bookModalEl.style.display === 'block') {
                if (e.key === 'ArrowLeft') {
                    goToPreviousPage();
                } else if (e.key === 'ArrowRight') {
                    goToNextPage();
                } else if (e.key === 'Escape') {
                    bookModalEl.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            }
        });

        // Close admin modal with escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && adminModalEl.style.display === 'block') {
                adminModalEl.style.display = 'none';
            }
        });

        // Initialize the app
        document.addEventListener('DOMContentLoaded', init);
    </script>
</body>
</html>

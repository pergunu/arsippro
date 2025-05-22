// Main Application Script
document.addEventListener('DOMContentLoaded', function() {
    // Simulate loading
    setTimeout(function() {
        document.getElementById('loading-screen').style.opacity = '0';
        setTimeout(function() {
            document.getElementById('loading-screen').style.display = 'none';
            // Show user registration modal if not registered
            if (!localStorage.getItem('epedia_user')) {
                document.getElementById('user-modal').style.display = 'block';
            } else {
                const user = JSON.parse(localStorage.getItem('epedia_user'));
                document.getElementById('user-greeting').textContent = `Welcome, ${user.name}`;
            }
        }, 500);
    }, 2000);

    // Close modals
    document.querySelectorAll('.close-modal, .close-book, .close-admin').forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });

    // Close notification
    document.querySelector('.close-notification').addEventListener('click', function() {
        document.getElementById('notification-bar').style.display = 'none';
    });

    // User registration form
    document.getElementById('user-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const address = document.getElementById('address').value;
        const whatsapp = document.getElementById('whatsapp').value;
        
        // Generate unique ID
        const uniqueId = generateUniqueId();
        const userId = `E-PEDIA/PERGUNUSITUBONDO/${name.toUpperCase().replace(/\s/g, '')}/${uniqueId}`;
        
        const userData = {
            name,
            address,
            whatsapp,
            userId,
            bookmarks: {}
        };
        
        localStorage.setItem('epedia_user', JSON.stringify(userData));
        document.getElementById('user-greeting').textContent = `Welcome, ${name}`;
        document.getElementById('user-modal').style.display = 'none';
        
        // Show welcome notification
        showNotification(`Welcome to E-PEDIA, ${name}! Your user ID is ${userId}`);
    });

    // Admin login button
    document.getElementById('admin-login').addEventListener('click', function() {
        document.getElementById('admin-modal').style.display = 'block';
    });

    // Admin login form
    document.getElementById('admin-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const password = document.getElementById('admin-password').value;
        const defaultPassword = '65614222';
        const storedPassword = localStorage.getItem('epedia_admin_password') || defaultPassword;
        
        if (password === storedPassword) {
            window.location.href = 'admin.html';
        } else {
            alert('Incorrect password. Please try again.');
        }
    });

    // Load sample books (in a real app, this would come from an API)
    loadSampleBooks();

    // Initialize book reader functionality
    initBookReader();
});

function generateUniqueId() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let id = '';
    for (let i = 0; i < 12; i++) {
        if (i > 0 && i % 4 === 0) id += '-';
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
}

function showNotification(message) {
    const notification = document.getElementById('notification-bar');
    document.getElementById('notification-text').textContent = message;
    notification.style.display = 'flex';
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        notification.style.display = 'none';
    }, 5000);
}

function loadSampleBooks() {
    const booksGrid = document.querySelector('.books-grid');
    
    // Sample books data
    const books = [
        {
            id: 'history',
            title: 'History Encyclopedia',
            description: 'Explore ancient civilizations and their impact on modern society',
            cover: 'assets/images/gambar-cover.png'
        },
        {
            id: 'science',
            title: 'Science Compendium',
            description: 'Comprehensive guide to modern scientific discoveries',
            cover: 'assets/images/gambar-cover.png'
        },
        {
            id: 'literature',
            title: 'World Literature',
            description: 'Masterpieces from around the world through the ages',
            cover: 'assets/images/gambar-cover.png'
        },
        {
            id: 'technology',
            title: 'Technology Today',
            description: 'Latest advancements in technology and innovation',
            cover: 'assets/images/gambar-cover.png'
        }
    ];
    
    // Clear existing books
    booksGrid.innerHTML = '';
    
    // Add books to grid
    books.forEach(book => {
        const bookItem = document.createElement('div');
        bookItem.className = 'book-item';
        bookItem.innerHTML = `
            <div class="book-cover" onclick="loadBook('${book.id}')">
                <img src="${book.cover}" alt="${book.title}">
                <div class="book-overlay">
                    <h3>${book.title}</h3>
                    <p>${book.description}</p>
                </div>
            </div>
        `;
        booksGrid.appendChild(bookItem);
    });
}

function initBookReader() {
    // This would be more complex in a real implementation
    // For demo purposes, we'll just set up event listeners
    
    // Next page button
    document.getElementById('next-page').addEventListener('click', function() {
        // In a real app, this would navigate to the next page
        console.log('Next page');
    });
    
    // Previous page button
    document.getElementById('prev-page').addEventListener('click', function() {
        // In a real app, this would navigate to the previous page
        console.log('Previous page');
    });
    
    // Zoom in
    document.getElementById('zoom-in').addEventListener('click', function() {
        // In a real app, this would zoom in the content
        console.log('Zoom in');
    });
    
    // Zoom out
    document.getElementById('zoom-out').addEventListener('click', function() {
        // In a real app, this would zoom out the content
        console.log('Zoom out');
    });
    
    // Toggle TOC
    document.getElementById('toc-toggle').addEventListener('click', function() {
        document.getElementById('toc-sidebar').classList.toggle('active');
    });
    
    // Add bookmark
    document.getElementById('add-bookmark').addEventListener('click', function() {
        // In a real app, this would save the current page as a bookmark
        showNotification('Bookmark added to your collection');
    });
    
    // Go to page
    document.getElementById('go-btn').addEventListener('click', function() {
        const pageNum = document.getElementById('go-to-page').value;
        if (pageNum) {
            // In a real app, this would navigate to the specified page
            console.log(`Go to page ${pageNum}`);
        }
    });
}

// Global function to load a book
function loadBook(bookId) {
    // In a real app, this would fetch the book content from a database or API
    console.log(`Loading book: ${bookId}`);
    
    // For demo, we'll just show the book modal with sample content
    const bookModal = document.getElementById('book-modal');
    const bookContainer = document.getElementById('book-container');
    
    // Sample book content
    bookContainer.innerHTML = `
        <div class="book-page">
            <div class="page-header">
                <span class="page-title">Sample Book Title</span>
                <span class="page-number">Page 1</span>
            </div>
            <div class="page-content">
                <p>This is a sample page from the ${bookId} book. In a real implementation, this content would come from a database or API.</p>
                <div class="page-image">
                    <img src="assets/images/gambar-cover.png" alt="Sample Image">
                </div>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula.</p>
            </div>
            <div class="page-footer">
                <p>E-PEDIA Digital Library</p>
            </div>
        </div>
    `;
    
    // Update TOC (in a real app, this would come from the book data)
    const tocList = document.getElementById('toc-list');
    tocList.innerHTML = `
        <li class="active">Introduction</li>
        <li>Chapter 1: The Beginning</li>
        <li>Chapter 2: The Middle</li>
        <li>Chapter 3: The End</li>
    `;
    
    // Add click handlers to TOC items
    document.querySelectorAll('#toc-list li').forEach(item => {
        item.addEventListener('click', function() {
            document.querySelectorAll('#toc-list li').forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            // In a real app, this would navigate to the selected chapter
            console.log(`Navigating to: ${this.textContent}`);
        });
    });
    
    // Show the modal
    bookModal.style.display = 'block';
}

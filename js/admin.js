// Admin Panel Script
document.addEventListener('DOMContentLoaded', function() {
    // Toggle sidebar on mobile
    document.querySelector('.sidebar-toggle').addEventListener('click', function() {
        document.querySelector('.admin-sidebar').classList.toggle('active');
    });
    
    // Switch between content sections
    document.querySelectorAll('.sidebar-menu li a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href').substring(1);
            
            // Update active menu item
            document.querySelectorAll('.sidebar-menu li').forEach(item => {
                item.classList.remove('active');
            });
            this.parentElement.classList.add('active');
            
            // Show target section
            document.querySelectorAll('.content-section').forEach(section => {
                section.classList.remove('active');
            });
            document.getElementById(target).classList.add('active');
            
            // Update header title
            document.querySelector('.admin-header h3').textContent = this.textContent;
            
            // Close sidebar on mobile
            if (window.innerWidth < 768) {
                document.querySelector('.admin-sidebar').classList.remove('active');
            }
        });
    });
    
    // Add Book button
    document.getElementById('add-book-btn').addEventListener('click', function() {
        document.getElementById('add-book-modal').style.display = 'block';
    });
    
    // Close modals
    document.querySelectorAll('.close-admin-modal').forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.admin-modal').style.display = 'none';
        });
    });
    
    // Page list navigation
    document.querySelectorAll('.page-list li').forEach(item => {
        item.addEventListener('click', function() {
            document.querySelectorAll('.page-list li').forEach(i => {
                i.classList.remove('active');
            });
            this.classList.add('active');
        });
    });
    
    // TOC list navigation
    document.querySelectorAll('.toc-list li').forEach(item => {
        item.addEventListener('click', function(e) {
            if (e.target.tagName !== 'BUTTON') {
                document.querySelectorAll('.toc-list li').forEach(i => {
                    i.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
    
    // Change password button
    document.querySelector('.change-password-btn').addEventListener('click', function() {
        const passwordInput = document.getElementById('admin-password');
        passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
        this.textContent = passwordInput.type === 'password' ? 'Change Password' : 'Hide Password';
    });
    
    // Initialize with dashboard active
    document.querySelector('.sidebar-menu li.active a').click();
});

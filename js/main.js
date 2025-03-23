// Rhoda Traders Employment Portal JavaScript

// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Form Validation
    const forms = document.querySelectorAll('.needs-validation');
    
    if (forms.length > 0) {
        Array.from(forms).forEach(form => {
            form.addEventListener('submit', event => {
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                
                form.classList.add('was-validated');
            }, false);
        });
    }
    
    // Modal Functionality
    const modalTriggers = document.querySelectorAll('[data-modal-target]');
    const modalCloses = document.querySelectorAll('[data-modal-close]');
    
    if (modalTriggers.length > 0) {
        modalTriggers.forEach(trigger => {
            trigger.addEventListener('click', () => {
                const modalId = trigger.getAttribute('data-modal-target');
                const modal = document.getElementById(modalId);
                if (modal) {
                    modal.classList.add('active');
                }
            });
        });
    }
    
    if (modalCloses.length > 0) {
        modalCloses.forEach(close => {
            close.addEventListener('click', () => {
                const modal = close.closest('.modal-overlay');
                if (modal) {
                    modal.classList.remove('active');
                }
            });
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', e => {
        if (e.target.classList.contains('modal-overlay')) {
            e.target.classList.remove('active');
        }
    });
    
    // File Upload Preview
    const fileInputs = document.querySelectorAll('.file-input');
    
    if (fileInputs.length > 0) {
        fileInputs.forEach(input => {
            input.addEventListener('change', function() {
                const fileNameDisplay = this.nextElementSibling;
                if (fileNameDisplay && this.files.length > 0) {
                    fileNameDisplay.textContent = this.files[0].name;
                }
            });
        });
    }
    
    // Password Toggle
    const passwordToggles = document.querySelectorAll('.password-toggle');
    
    if (passwordToggles.length > 0) {
        passwordToggles.forEach(toggle => {
            toggle.addEventListener('click', function() {
                const passwordField = this.previousElementSibling;
                const type = passwordField.getAttribute('type');
                
                if (type === 'password') {
                    passwordField.setAttribute('type', 'text');
                    this.innerHTML = '<i class="fas fa-eye-slash"></i>';
                } else {
                    passwordField.setAttribute('type', 'password');
                    this.innerHTML = '<i class="fas fa-eye"></i>';
                }
            });
        });
    }
    
    // Tooltips
    const tooltips = document.querySelectorAll('[data-tooltip]');
    
    if (tooltips.length > 0) {
        tooltips.forEach(tooltip => {
            tooltip.addEventListener('mouseenter', function() {
                const tooltipText = this.getAttribute('data-tooltip');
                const tooltipElement = document.createElement('div');
                tooltipElement.className = 'tooltip';
                tooltipElement.textContent = tooltipText;
                document.body.appendChild(tooltipElement);
                
                const rect = this.getBoundingClientRect();
                tooltipElement.style.top = rect.top - tooltipElement.offsetHeight - 10 + 'px';
                tooltipElement.style.left = rect.left + (rect.width / 2) - (tooltipElement.offsetWidth / 2) + 'px';
                tooltipElement.style.opacity = '1';
            });
            
            tooltip.addEventListener('mouseleave', function() {
                const tooltipElement = document.querySelector('.tooltip');
                if (tooltipElement) {
                    tooltipElement.remove();
                }
            });
        });
    }
});

// Firebase Configuration
// This will be implemented when we set up Firebase
function initializeFirebase() {
    // Firebase configuration will go here
    // For authentication, database, and storage
}

// User Registration
function registerUser(email, password, userData) {
    // This function will handle user registration with Firebase
    // It will create a user account and store additional user data
}

// User Login
function loginUser(email, password) {
    // This function will handle user login with Firebase
    // It will authenticate the user and redirect to the dashboard
}

// Admin Functions
const adminFunctions = {
    // View all applications
    getApplications: function() {
        // Fetch all applications from the database
    },
    
    // Approve or reject an application
    updateApplicationStatus: function(applicationId, status) {
        // Update the status of an application
    },
    
    // Get statistics for the dashboard
    getDashboardStats: function() {
        // Calculate and return statistics for the admin dashboard
    }
};

// User Dashboard Functions
const userFunctions = {
    // Get user profile data
    getUserProfile: function(userId) {
        // Fetch user profile data from the database
    },
    
    // Update user profile
    updateUserProfile: function(userId, userData) {
        // Update user profile data in the database
    },
    
    // Submit a report for Wall Fittings count
    submitReport: function(userId, reportData) {
        // Submit a report to the database
    },
    
    // Get application status
    getApplicationStatus: function(userId) {
        // Fetch the status of the user's application
    }
};

// Helper Functions
function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}
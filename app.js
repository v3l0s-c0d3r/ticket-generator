document.addEventListener("DOMContentLoaded", () => {
    displayForm();
    setupFormListeners();
});

// Storage for form data
let formData = {
    avatar: null,
    fullName: '',
    email: '',
    github: '',
    regNumber: generateRegNumber()
};

// Generate random registration number
function generateRegNumber() {
    return '#' + Math.floor(10000 + Math.random() * 90000);
}

function displayForm() {
    const display = document.getElementById("display");

    let formHTML = `
    <div class="logo">
        <img src="./assets/images/logo-full.svg" alt="logo-xl">
    </div>

    <div class="heading form-heading">
        <h1>Your Journey to Coding Conf 2025 Starts Here!</h1>
        <h2>Secure your spot at next year's biggest coding conference.</h2>
    </div>

    <div class="form-content">
        <form id="ticketForm">
            <div class="upload-image">
                <h3>Upload Avatar</h3>
                <div class="upload-div" id="uploadImage">
                    <label for="avatarInput" tabindex="0">
                        <img class="icon" src="./assets/images/icon-upload.svg" height="40" alt="Upload Image">
                        <p>Drag and drop or click to upload</p>
                    </label>
                    <input type="file" id="avatarInput" accept="image/jpeg, image/png" style="display: none;" required>
                </div>
                <i class="display-msg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M2 8a6 6 0 1 0 12 0A6 6 0 0 0 2 8Z"/>
                        <path fill="currentColor" d="M8.004 10.462V7.596ZM8 5.57v-.042Z"/>
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M8.004 10.462V7.596M8 5.569v-.042"/>
                    </svg> 
                    <p>Upload your photo (JPG or PNG, max size: 500KB).</p>
                </i>
                <i class="error-msg" style="display: none;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M2 8a6 6 0 1 0 12 0A6 6 0 0 0 2 8Z"/>
                        <path fill="currentColor" d="M8.004 10.462V7.596ZM8 5.57v-.042Z"/>
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M8.004 10.462V7.596M8 5.569v-.042"/>
                    </svg> 
                    <p>File too large. Please upload a photo less than 500KB.</p>
                </i>
            </div>

            <div class="upload-info">
                <h3>Full Name</h3>
                <input type="text" id="fullName" required>
            </div>

            <div class="upload-info">
                <h3>Email Address</h3>
                <input type="email" id="email" placeholder="example@email.com" autocomplete="email" required>
                <i class="error-msg" style="display: none;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M2 8a6 6 0 1 0 12 0A6 6 0 0 0 2 8Z"/>
                        <path fill="currentColor" d="M8.004 10.462V7.596ZM8 5.57v-.042Z"/>
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M8.004 10.462V7.596M8 5.569v-.042"/>
                    </svg> 
                    <p>Please enter a valid email address.</p>
                </i>
            </div>

            <div class="upload-info">
                <h3>GitHub Username</h3>
                <input type="text" id="github" placeholder="@yourusername" required>
                <i class="error-msg" style="display: none;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M2 8a6 6 0 1 0 12 0A6 6 0 0 0 2 8Z"/>
                        <path fill="currentColor" d="M8.004 10.462V7.596ZM8 5.57v-.042Z"/>
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M8.004 10.462V7.596M8 5.569v-.042"/>
                    </svg> 
                    <p>Please enter a valid GitHub username.</p>
                </i>
            </div>

            <input type="submit" class="ticket-btn" value="Generate My Ticket">
        </form>
    </div>
    `;

    display.innerHTML = formHTML;
}

function setupFormListeners() {
    document.addEventListener('click', function(e) {
        if (e.target && e.target.id === 'removeImage') {
            handleRemoveImage();
        } else if (e.target && e.target.id === 'changeImage') {
            document.getElementById('avatarInput').click();
        }
    });

    // Avatar upload handling
    const avatarInput = document.getElementById('avatarInput');
    if (avatarInput) {
        avatarInput.addEventListener('change', handleAvatarUpload);
        
        // Drag and drop functionality
        const uploadLabel = document.querySelector('#uploadImage label');
        if (uploadLabel) {
            uploadLabel.addEventListener('dragover', (e) => {
                e.preventDefault();
                uploadLabel.classList.add('dragover');
            });

            uploadLabel.addEventListener('dragleave', () => {
                uploadLabel.classList.remove('dragover');
            });

            uploadLabel.addEventListener('drop', (e) => {
                e.preventDefault();
                uploadLabel.classList.remove('dragover');
                if (e.dataTransfer.files.length) {
                    avatarInput.files = e.dataTransfer.files;
                    handleAvatarUpload({ target: avatarInput });
                }
            });
        }
    }

    // Form submission
    const ticketForm = document.getElementById('ticketForm');
    if (ticketForm) {
        ticketForm.addEventListener('submit', handleFormSubmit);
    }

    // Input validation
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('blur', validateEmail);
    }

    const githubInput = document.getElementById('github');
    if (githubInput) {
        githubInput.addEventListener('blur', validateGitHub);
    }
}

function handleAvatarUpload(event) {
    const file = event.target.files[0];
    const uploadLabel = document.querySelector('#uploadImage label');
    const displayMsg = document.querySelector('.upload-image .display-msg');
    const errorMsg = document.querySelector('.upload-image .error-msg');

    // Reset states
    uploadLabel.classList.remove('error');
    displayMsg.style.display = 'flex';
    errorMsg.style.display = 'none';

    if (!file) return;

    // Check file type
    if (!['image/jpeg', 'image/png'].includes(file.type)) {
        alert('Please upload only JPG or PNG images.');
        return;
    }

    // Check file size (500KB)
    if (file.size > 500 * 1024) {
        uploadLabel.classList.add('error');
        displayMsg.style.display = 'none';
        errorMsg.style.display = 'flex';
        return;
    }

    // File is valid, update UI
    formData.avatar = file;
    const reader = new FileReader();
    reader.onload = function(e) {
        uploadLabel.innerHTML = `
            <img class="avatar preview" src="${e.target.result}" height="40" alt="Uploaded Image">
            <div class="img-action">
                <input type="button" id="removeImage" value="Remove image">
                <input type="button" id="changeImage" value="Change image">
            </div>
        `;
    };
    reader.readAsDataURL(file);
}

function handleRemoveImage() {
    const uploadLabel = document.querySelector('#uploadImage label');
    const displayMsg = document.querySelector('.upload-image .display-msg');
    const errorMsg = document.querySelector('.upload-image .error-msg');
    const avatarInput = document.getElementById('avatarInput');

    // Reset everything
    uploadLabel.innerHTML = `
        <img class="icon" src="./assets/images/icon-upload.svg" height="40" alt="Upload Image">
        <p>Drag and drop or click to upload</p>
    `;
    uploadLabel.classList.remove('error');
    displayMsg.style.display = 'flex';
    errorMsg.style.display = 'none';
    avatarInput.value = '';
    formData.avatar = null;
}

async function handleFormSubmit(event) {
    event.preventDefault();

    // Get form values
    formData.fullName = document.getElementById('fullName').value.trim();
    formData.email = document.getElementById('email').value.trim();
    formData.github = document.getElementById('github').value.trim();

    // Validate inputs
    const isEmailValid = validateEmail();
    const isGithubValid = await validateGitHub();
    
    if (!formData.avatar || !formData.fullName || !isEmailValid || !isGithubValid) {
        alert('Please fill all fields correctly.');
        return;
    }

    // Display ticket
    displayTicket();
}

function validateEmail() {
    const email = document.getElementById('email').value.trim();
    const emailError = document.querySelector('#email + .error-msg');
    const emailInput = document.getElementById('email');
    
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    
    if (email && !isValid) {
        emailInput.classList.add('error');
        emailError.style.display = 'flex';
        return false;
    } else {
        emailInput.classList.remove('error');
        emailError.style.display = 'none';
        return true;
    }
}

async function validateGitHub() {
    const github = document.getElementById('github').value.trim();
    const githubError = document.querySelector('#github + .error-msg');
    const githubInput = document.getElementById('github');
    
    if (!github) {
        githubInput.classList.add('error');
        githubError.style.display = 'flex';
        return false;
    }
    
    // Remove @ if present at start
    const username = github.startsWith('@') ? github.substring(1) : github;
    
    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        if (response.ok) {
            githubInput.classList.remove('error');
            githubError.style.display = 'none';
            return true;
        } else {
            githubInput.classList.add('error');
            githubError.style.display = 'flex';
            return false;
        }
    } catch (error) {
        console.error('Error validating GitHub username:', error);
        githubInput.classList.add('error');
        githubError.style.display = 'flex';
        return false;
    }
}

function displayTicket() {
    const display = document.getElementById("display");

    // Create avatar URL if available
    const avatarUrl = formData.avatar ? URL.createObjectURL(formData.avatar) : '../images/image-avatar.jpg';

    let ticketHTML = `
        <div class="logo">
            <img src="./assets/images/logo-full.svg" alt="logo-xl">
        </div>

        <div class="heading ticket-heading">
            <h1>
                Congrats, <span>${formData.fullName}!</span>
                <br>
                Your ticket is ready.
            </h1>
            <h2>
                We've emailed your ticket to
                <br>
                <span>${formData.email}</span> and will send updates in
                <br>
                the run up to the event.
            </h2>
        </div>

        <div class="ticket-content" id="ticketToDownload">
            <div class="main">
                <div class="event details">
                    <img src="./assets/images/logo-mark.svg" height="30" alt="logo-xl">
                    <div class="info">
                        <p>Coding Conf</p>
                        <span>Jan 31, 2025 / Austin, TX</span>
                    </div>
                </div>

                <div class="attendee details">
                    <img class="avatar" src="${avatarUrl}" height="58" alt="avatar">
                    <div class="info">
                        <p>${formData.fullName}</p>
                        <span>
                            <img src="./assets/images/icon-github.svg" alt="github"> 
                            ${formData.github.startsWith('@') ? formData.github : '@' + formData.github}
                        </span>
                    </div>
                </div>
            </div>

            <div class="reg-number">
                <span>${formData.regNumber}</span>
            </div>
        </div>
    `;

    display.innerHTML = ticketHTML;
}
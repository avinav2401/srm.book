// ===== Outing Pass Management - Script =====
document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('darkModeToggle');
    const googleBtn = document.getElementById('googleSignIn');
    const logoutBtn = document.getElementById('logoutBtn');
    const navbarLogin = document.getElementById('navbarLogin');
    const navbarDashboard = document.getElementById('navbarDashboard');
    const loginSection = document.getElementById('loginSection');
    const dashboardSection = document.getElementById('dashboardSection');
    const sendRequestBtn = document.getElementById('sendRequestBtn');

    const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 008.002-4.148 9.718 9.718 0 01.998-1.85z"/></svg>`;
    const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.636l-1.591 1.591M21 12h-2.25m-.636 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"/></svg>`;

    // ===== Dark Mode =====
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        toggleBtn.innerHTML = savedTheme === 'dark' ? sunIcon : moonIcon;
    }

    toggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        toggleBtn.innerHTML = newTheme === 'dark' ? sunIcon : moonIcon;
    });

    // ===== Google Sign-In → Show Dashboard =====
    googleBtn.addEventListener('click', () => {
        // Switch to dashboard view
        navbarLogin.style.display = 'none';
        navbarDashboard.style.display = 'flex';
        loginSection.style.display = 'none';
        dashboardSection.style.display = 'block';
        window.scrollTo(0, 0);
    });

    // ===== Logout → Show Login =====
    logoutBtn.addEventListener('click', () => {
        navbarDashboard.style.display = 'none';
        navbarLogin.style.display = 'flex';
        dashboardSection.style.display = 'none';
        loginSection.style.display = 'flex';
        window.scrollTo(0, 0);
    });

    // ===== Send Request Button =====
    sendRequestBtn.addEventListener('click', () => {
        const room = document.getElementById('roomNumber');
        const outDate = document.getElementById('outDate');
        const outTime = document.getElementById('outTime');
        const inDate = document.getElementById('inDate');
        const inTime = document.getElementById('inTime');
        const reason = document.getElementById('reason');

        const fields = [room, outDate, outTime, inDate, inTime, reason];
        let valid = true;

        // Reset borders
        fields.forEach(f => f.style.borderColor = '');

        // Validate
        fields.forEach(f => {
            if (!f.value.trim()) {
                f.style.borderColor = '#d32f2f';
                valid = false;
            }
        });

        if (!valid) {
            alert('Please fill in all required fields.');
            return;
        }

        // Populate Current Request card
        const details = document.getElementById('requestDetails');
        details.innerHTML = `
            <p><strong>Out Date:</strong> ${outDate.value}</p>
            <p><strong>Out Time:</strong> ${outTime.value}</p>
            <p><strong>In Date:</strong> ${inDate.value}</p>
            <p><strong>In Time:</strong> ${inTime.value}</p>
            <p><strong>Reason:</strong> ${reason.value}</p>
            <p><strong>Status:</strong> still_out</p>
        `;

        // Set handled time
        const now = new Date();
        const handledStr = now.toLocaleDateString('en-GB') + ', ' + now.toLocaleTimeString('en-GB');
        document.getElementById('handledOn').innerHTML = '<strong>Handled on:</strong> ' + handledStr;

        // Set OTP dates
        document.getElementById('otpDate').textContent =
            'Out Date: ' + outDate.value + ' | In Date: ' + inDate.value;

        // Generate random 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000);
        document.getElementById('otpCode').textContent = otp;

        // Show output below form (same page)
        const outputSection = document.getElementById('outputSection');
        outputSection.style.display = 'block';
        outputSection.scrollIntoView({ behavior: 'smooth' });
    });
});

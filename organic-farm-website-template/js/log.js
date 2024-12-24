// Register form submission
document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const userName = document.getElementById('registerUsername').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    const formData = { email, password, userName };

    // Send POST request to register endpoint
    fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'registered sucessfull') {
            // Display success message in an alert box
            alert("Registration successful!");
            document.getElementById('message').innerText = "Registration successful!";
        } else {
            document.getElementById('message').innerText = `Error: ${data.message}`;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('message').innerText = "Something went wrong during registration.";
    });
});

// Login form submission
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    alert(`Welcome`);
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const formData = { email, password };
    
    // Send POST request to login endpoint
    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'login successfull') {
            // Display success message in an alert box
            alert(`Welcome, ${data.userName}!`);
            document.getElementById('message').innerText = `Welcome, ${data.userName}!`;
            // Store the token or user data in localStorage or sessionStorage if needed
            localStorage.setItem('token', data.token);
        } else {
            document.getElementById('message').innerText = `Error: ${data.message}`;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('message').innerText = "Something went wrong during login.";
    });
});

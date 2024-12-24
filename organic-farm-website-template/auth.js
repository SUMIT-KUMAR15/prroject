// Switch to Login Form
document.getElementById("switchToLogin").addEventListener("click", function() {
    document.getElementById("registerForm").style.display = "none";
    document.getElementById("loginForm").style.display = "block";
});

// Switch to Register Form
document.getElementById("switchToRegister").addEventListener("click", function() {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("registerForm").style.display = "block";
});

// Register form submission
document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const userName = document.getElementById('registerUserName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    const formData = { userName, email, password };

    fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Register response:', data);
        if (data.message === 'registered sucessfull') {
            alert(`Registration Successful! Welcome, ${data.userName}`);
            document.getElementById('message').innerText = `Welcome, ${data.userName}!`;
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

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const formData = { email, password };

    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'login successfull') {
            alert(`Welcome back, ${data.userName}!`);
            document.getElementById('message').innerText = `Welcome back, ${data.userName}!`;
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

let vCart = [];

function addToCart(productId, productName, productPrice) {
    console.log("p1")
    const product = {
        id: productId,
        name: productName,
        price: productPrice,
        quantity: 1
    };
    console.log("p2")
    try {
        console.log("p3")

        console.log("Type of cart before adding:", Array.isArray(vCart)); // Check if cart is an array
 console.log("p11")
        // Find the existing product in the cart
        const existingProductIndex = vCart.findIndex(item => item.id === productId);
        console.log("p4")
        if (existingProductIndex >= 0) {
            console.log("p5")
            vCart[existingProductIndex].quantity += 1;
            alert(`${productName} quantity updated! New quantity: ${vCartart[existingProductIndex].quantity}`);
        } else {
            // Add the new product to the cart
            vCart.push(product);
            alert(`${productName} added to the cart!`);
        }

        // Alert with the updated cart length
        alert(`${vCart.length} items in cart!`);
        
    } catch (error) {
        console.error("Error details:", error); // Log the error details to the console
        alert(error);
    }
}

    // Function to view the cart contents (for debugging or UI purposes)
    function viewCart() {
        console.log(vCart);
        alert(JSON.stringify(vCart, null, 2)); // Display cart as a string
    }

    // Function to checkout and send the cart to an API
    function checkout() {
        if (vCart.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        // Make an API request to send cart data
        fetch('https://your-api-endpoint.com/checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ cart: vCart }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Checkout successful:', data);
            alert('Checkout successful!');
            // Clear the cart after checkout
            vCart = [];
        })
        .catch(error => {
            console.error('Error during checkout:', error);
            alert('Checkout failed. Please try again.');
        });
    }


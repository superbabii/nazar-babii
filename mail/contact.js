document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get form values
    var name = document.getElementById('name').value.trim();
    var email = document.getElementById('email').value.trim();
    var subject = document.getElementById('subject').value.trim();
    var message = document.getElementById('message').value.trim();

    // Basic validation
    if (name === "" || email === "" || subject === "" || message === "") {
        alert("Please fill in all fields.");
        return;
    }

    // Create an object to hold the form data
    var formData = {
        name: name,
        email: email,
        subject: subject,
        message: message
    };

    // Show loading state
    showLoading(true);

    // Send form data using fetch API
    fetch('https://mail-server-omega-one.vercel.app/submit-form', { // Change to your backend URL
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        showLoading(false); // Hide loading state
        return response.json().then(data => ({ status: response.status, body: data }));
    })
    .then(data => {
        if (data.status === 200) {
            alert(data.body.message);
            document.getElementById('contactForm').reset(); // Reset the form
        } else {
            throw new Error(data.body.error || 'Unknown error');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('There was a problem with the request: ' + error.message);
    });
});

function showLoading(isVisible) {
    var loadingElement = document.getElementById('spinner');
    loadingElement.className = isVisible ? 'loading visible' : 'loading';
}
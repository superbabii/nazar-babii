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

    // Send form data using fetch API
    fetch('/submit-form', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(data.error);
        } else {
            alert(data.message);
            document.getElementById('contactForm').reset(); // Reset the form
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('There was a problem with the request.');
    });
});

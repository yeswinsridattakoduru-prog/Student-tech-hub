const loadEventsBtn = document.getElementById('load-events-btn');
const eventsList = document.getElementById('events-list');
const registrationForm = document.getElementById('registration-form');
const registrationMessage = document.getElementById('registration-message');

const API_BASE_URL = 'http://localhost:8000/api'; // Backend URL

// Load Events
loadEventsBtn.addEventListener('click', async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/events`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const events = await response.json();
        displayEvents(events);
    } catch (error) {
        eventsList.innerHTML = `<p class="error">Failed to load events. Is the backend running?</p>`;
        console.error('Error fetching events:', error);
    }
});

function displayEvents(events) {
    eventsList.innerHTML = ''; // Clear previous events
    
    if (events.length === 0) {
        eventsList.innerHTML = '<p>No upcoming events found.</p>';
        return;
    }

    events.forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.className = 'event-card';
        eventCard.innerHTML = `
            <h3>${event.title}</h3>
            <p><strong>Date:</strong> ${event.date}</p>
            <p><strong>Location:</strong> ${event.location}</p>
            <p>${event.description}</p>
        `;
        eventsList.appendChild(eventCard);
    });
}

// Register
registrationForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent page refresh on form submit

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    const registrationData = {
        name: name,
        email: email
    };

    try {
        const response = await fetch(`${API_BASE_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registrationData)
        });

        if (response.ok) {
            const result = await response.json();
            registrationMessage.textContent = result.message;
            registrationMessage.className = 'success';
            registrationForm.reset(); // Clear the form
        } else {
            throw new Error('Registration failed');
        }
    } catch (error) {
        registrationMessage.textContent = 'Registration failed. Please make sure the backend is running.';
        registrationMessage.className = 'error';
        console.error('Error during registration:', error);
    }
});

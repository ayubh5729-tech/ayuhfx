// 1. Your unique project configuration from the Firebase console
const firebaseConfig = {
  apiKey: "AIzaSyC1XmH6KNne8r8XF6X3oMgyv-IQOTL0Sbo",
  authDomain: "coffee-orders-ca320.firebaseapp.com",
  projectId: "coffee-orders-ca320",
  storageBucket: "coffee-orders-ca320.firebasestorage.app",
  messagingSenderId: "727492290475",
  appId: "1:727492290475:web:4f019a5ebb0eaf220bd4ee"
};

// 2. Turn on the Firebase tools
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// 3. Find your form in the HTML
const contactForm = document.querySelector('.contact-form');

// 4. Set up the "Submit" action
contactForm.addEventListener('submit', (e) => {
    e.preventDefault(); // This stops the page from reloading

    // Grabbing what the user typed in the boxes
    // We use the 'placeholder' text to find the right box
    const nameValue = contactForm.querySelector('input[placeholder="your name"]').value;
    const emailValue = contactForm.querySelector('input[placeholder="your email"]').value;
    const messageValue = contactForm.querySelector('textarea[placeholder="your message"]').value;

    // 5. Save the data to a folder called 'messages' in Firebase
    db.collection("messages").add({
        customerName: nameValue,
        customerEmail: emailValue,
        customerMessage: messageValue,
        timestamp: new Date()
    })
    .then(() => {
        // Success!
        alert("Thank you! Your message has been saved in our database.");
        contactForm.reset(); // Clear the form
    })
    .catch((error) => {
        // Something went wrong (usually Database Rules)
        console.error("Firebase Error: ", error);
        alert("Error: " + error.message);
    });
});
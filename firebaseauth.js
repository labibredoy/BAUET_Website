// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAlwzFpnEp9LIdd_l7rPXnzglDoM6jcIIg",
  authDomain: "login-form-6e9ee.firebaseapp.com",
  projectId: "login-form-6e9ee",
  storageBucket: "login-form-6e9ee.appspot.com",
  messagingSenderId: "932029152336",
  appId: "1:932029152336:web:bab8763a328b964bede555"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Show message function
function showMessage(message, divId) {
  console.log(`Message for ${divId}:`, message); // Debug log
  var messageDiv = document.getElementById(divId);
  messageDiv.style.display = "block";
  messageDiv.innerHTML = message;
  messageDiv.style.opacity = 1;
  setTimeout(function() {
    messageDiv.style.opacity = 0;
  }, 5000);
}

// SIGN UP Logic
const signUpButton = document.getElementById('submitSignUp');
if (signUpButton) {
  console.log('Sign up button found'); // Debug log
  signUpButton.addEventListener('click', async (event) => {
    event.preventDefault();
    console.log('Sign up button clicked'); // Debug log

    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const studentId = document.getElementById('studentId').value;
    const department = document.getElementById('department').value;
    
    console.log('Form data collected:', { fullName, email, studentId, department }); // Debug log
    
    if (password !== confirmPassword) {
      showMessage('Passwords do not match!', 'signUpMessage');
      return;
    }

    try {
      console.log('Attempting to create user...'); // Debug log
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('User created successfully:', user.uid); // Debug log

      const userData = {
        fullName: fullName,
        email: email,
        studentId: studentId,
        department: department,
        createdAt: new Date().toISOString()
      };

      console.log('Attempting to store user data...'); // Debug log
      await setDoc(doc(db, "users", user.uid), userData);
      console.log('User data stored successfully'); // Debug log

      showMessage('Account Created Successfully!', 'signUpMessage');
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 2000);
    } catch (error) {
      console.error('Error during signup:', error); // Debug log
      const errorCode = error.code;
      if (errorCode === 'auth/email-already-in-use') {
        showMessage('Email Address Already Exists !!!', 'signUpMessage');
      } else {
        showMessage('Unable to create User: ' + error.message, 'signUpMessage');
      }
    }
  });
} else {
  console.log('Sign up button not found'); // Debug log
}

// SIGN IN Logic
const signInButton = document.getElementById('submitSignIn');
if (signInButton) {
  signInButton.addEventListener('click', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      localStorage.setItem('loggedInUserId', user.uid);
      showMessage('Login is successful', 'signInMessage');
      setTimeout(() => {
        window.location.href = 'Home_Page.html';
      }, 2000);
    } catch (error) {
      const errorCode = error.code;
      if (errorCode === 'auth/invalid-credential') {
        showMessage('Incorrect Email or Password', 'signInMessage');
      } else {
        showMessage('Account does not Exist', 'signInMessage');
      }
    }
  });
}

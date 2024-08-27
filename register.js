// //Import the functions you need from the SDKs you need
// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
// import {
//   getAuth,
//   createUserWithEmailAndPassword,
// } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCk-ILy4a3B6f0bVpMGUDT-Ad4bK7RDcXQ",
//   authDomain: "login-c102a.firebaseapp.com",
//   projectId: "login-c102a",
//   storageBucket: "login-c102a.appspot.com",
//   messagingSenderId: "761789754250",
//   appId: "1:761789754250:web:ac3ae41c5e67c1c53df673",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

// const submit = document.getElementById("register");
// submit.addEventListener("click", function (event) {
//   event.preventDefault();
//   const email = document.getElementById("email").value;
//   const password = document.getElementById("password").value;
//   createUserWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//       // Signed up
//       const user = userCredential.user;
//       alert("creating ");
//       window.location.href = "register.html";
//       // ...
//     })
//     .catch((error) => {
//       //   const errorCode = error.code;
//       const errorMessage = error.message;
//       alert(errorMessage);
//       // ..
//     });
// });
// Import Firebase SDKs (remember to load this script as type="module" in your HTML)
// Import Firebase SDKs (make sure to load this script with type="module" in your HTML)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCk-ILy4a3B6f0bVpMGUDT-Ad4bK7RDcXQ",
  authDomain: "login-c102a.firebaseapp.com",
  projectId: "login-c102a",
  storageBucket: "login-c102a.appspot.com",
  messagingSenderId: "761789754250",
  appId: "1:761789754250:web:ac3ae41c5e67c1c53df673",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Register button event listener
const registerButton = document.getElementById("register");
registerButton.addEventListener("click", function (event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const phoneNumber = document.getElementById("phoneNumber").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  // Check if passwords match
  if (password !== confirmPassword) {
    document.getElementById("errorMessage").style.display = "block";
    document.getElementById("errorMessage").textContent =
      "Passwords do not match.";
    return;
  }

  if (email) {
    // Register with email and password
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        alert("Account created successfully!");
        // Redirect or perform other actions after registration
        window.location.href = "register.html";
      })
      .catch((error) => {
        const errorMessage = error.message;
        document.getElementById("errorMessage").style.display = "block";
        document.getElementById("errorMessage").textContent = errorMessage;
      });
  } else if (phoneNumber) {
    // Register with phone number
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
      },
      auth
    );

    const appVerifier = window.recaptchaVerifier;

    // Format the phone number
    let formattedPhoneNumber = phoneNumber;
    if (!formattedPhoneNumber.startsWith("+")) {
      formattedPhoneNumber = `+995${formattedPhoneNumber}`;
    }

    signInWithPhoneNumber(auth, formattedPhoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        alert("Verification code sent!");

        // Prompt the user to enter the verification code
        const verificationCode = prompt(
          "Enter the verification code you received:"
        );
        return confirmationResult.confirm(verificationCode);
      })
      .then((result) => {
        const user = result.user;
        alert("Phone number verified and account created successfully!");
        // Redirect or perform other actions after registration
        window.location.href = "register.html";
      })
      .catch((error) => {
        const errorMessage = error.message;
        document.getElementById("errorMessage").style.display = "block";
        document.getElementById("errorMessage").textContent = errorMessage;
      });
  } else {
    document.getElementById("errorMessage").style.display = "block";
    document.getElementById("errorMessage").textContent =
      "Please provide either an email or phone number.";
  }
});

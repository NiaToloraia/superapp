// Import necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import {
  getAuth,
  fetchSignInMethodsForEmail,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPhoneNumber,
  RecaptchaVerifier,
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

const submit = document.getElementById("submit");

submit.addEventListener("click", function (event) {
  event.preventDefault();
  const loginInput = document.getElementById("loginInput").value;
  const password = document.getElementById("loginPassword").value;

  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginInput);
  const isPhoneNumber = /^\+?[0-9]{10,14}$/.test(loginInput);

  if (isEmail) {
    // Email login
    signInWithEmailAndPassword(auth, loginInput, password)
      .then((userCredential) => {
        const user = userCredential.user;

        // Check if email is verified
        if (user.emailVerified) {
          alert("Login successful!");
          // Redirect or perform other actions
        } else {
          alert("Please verify your email before logging in.");
          sendEmailVerification(user)
            .then(() => {
              alert("Verification email sent!");
            })
            .catch((error) => {
              console.error("Error sending verification email:", error.message);
            });
        }
      })
      .catch((error) => {
        document.getElementById("errorMessage").style.display = "block";
        document.getElementById("errorMessage").textContent = error.message;
        document.getElementById("loginInput").style.border = "2px solid red";
        document.getElementById("passwordInput").style.border = "2px solid red";
      });
  } else if (isPhoneNumber) {
    // Prepend the country code if not included
    if (!loginInput.startsWith("+")) {
      loginInput = `+995${loginInput}`;
    }

    // Phone number login
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {},
      auth
    );
    const appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, loginInput, appVerifier)
      .then((confirmationResult) => {
        // SMS sent
        window.confirmationResult = confirmationResult;
        alert("Verification code sent!");

        // Prompt for verification code
        const verificationCode = prompt(
          "შეიყვანეთ კოდი, რომელიც თქვენ მიიღეთ SMS-ით:"
        );
        return confirmationResult.confirm(verificationCode);
      })
      .then((result) => {
        // User signed in successfully
        alert("Phone number verified and login successful!");
        // Redirect or perform other actions
      })
      .catch((error) => {
        document.getElementById("errorMessage").style.display = "block";
        document.getElementById("errorMessage").textContent = error.message;
      });
  } else {
    document.getElementById("errorMessage").style.display = "block";
    document.getElementById("errorMessage").textContent =
      "გთხოვთ, შეიყვანეთ ვალიდური მეილი ან ტელეფონის ნომერი.";
  }
});

const facebookButton = document.getElementById("facebook");

facebookButton.addEventListener("click", function (event) {
  event.preventDefault();

  // Create an instance of the Facebook provider object
  const provider = new FacebookAuthProvider();

  // Sign in with a popup
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const accessToken = credential.accessToken;

      console.log("User signed in:", user);
      console.log("Facebook Access Token:", accessToken);

      alert("Successfully signed in with Facebook!");
      window.location.href = "signIn.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData?.email;
      const credential = FacebookAuthProvider.credentialFromError(error);

      console.error("Error signing in with Facebook:", errorMessage);
      alert("Error: " + errorMessage);
    });
});

const googleButton = document.getElementById("google");
googleButton.addEventListener("click", function (event) {
  event.preventDefault();

  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      // The signed-in user info.
      const user = result.user;

      alert(`Welcome, ${user.displayName}!`);
      // Redirect to a new page or perform any desired action
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      // Handle errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(`Error: ${errorMessage}`);
    });
});

document
  .getElementById("forgot-password")
  .addEventListener("click", function (e) {
    e.preventDefault();
    // Display the popup for entering the email
    document.getElementById("forgot-password-popup").style.display = "flex";
  });

// Event listener for submitting the email for password reset
document
  .getElementById("verification-submit")
  .addEventListener("click", function (e) {
    e.preventDefault();

    const emailInput = document
      .getElementById("verification-input")
      .value.trim();
    const auth = getAuth(); // Ensure `getAuth` is called correctly

    fetchSignInMethodsForEmail(auth, emailInput)
      .then((signInMethods) => {
        if (signInMethods.length === 0) {
          throw new Error("Email not registered.");
        }

        // Fetch user by email logic here
        // Example: Get user from your database or authentication system
        // For Firebase, this might involve a custom solution if not using Firebase auth directly
        return auth.currentUser; // Placeholder for actual user fetching logic
      })
      .then((user) => {
        return sendEmailVerification(user);
      })
      .then(() => {
        document.getElementById("errorMessage").style.display = "none";
        document.getElementById("errorMessage").textContent = "";
        alert("Verification email sent!");
      })
      .catch((error) => {
        console.error("Error sending verification email:", error.message);

        const errorMessageElement = document.getElementById("errorMessage");
        let message;

        if (error.message === "Email not registered.") {
          message = "Email not registered. Please check the email address.";
        } else if (error.message.includes("Invalid email")) {
          message = "Invalid email address. Please enter a valid email.";
        } else {
          message = "An error occurred. Please try again.";
        }

        errorMessageElement.style.display = "block";
        errorMessageElement.textContent = message;
      });
  });

// Check if the email is registered

// // Event listener for showing the phone number verification popup
// document
//   .getElementById("forgot-password")
//   .addEventListener("click", function (e) {
//     e.preventDefault();
//     // Display the popup for phone number verification
//     document.getElementById("forgot-password-popup").style.display = "flex";
//   });

// // Event listener for sending the verification code to the phone number
// document
//   .getElementById("verification-submit")
//   .addEventListener("click", function (e) {
//     e.preventDefault();

//     // Get the phone number input value
//     let phoneNumber = document.getElementById("verification-input").value;

//     // Basic validation for phone number format (you can adjust this regex for your needs)
//     const isPhoneNumber = /^\+?[0-9]{10,14}$/.test(phoneNumber);

//     if (isPhoneNumber) {
//       // Prepend country code if it's not included
//       if (!phoneNumber.startsWith("+")) {
//         phoneNumber = `+995${phoneNumber}`;
//       }

//       // Setup Recaptcha verifier to prevent abuse of the verification process
//       window.recaptchaVerifier = new RecaptchaVerifier(
//         "recaptcha-container",
//         {},
//         auth
//       );
//       const appVerifier = window.recaptchaVerifier;

//       // Send the verification code to the phone number
//       signInWithPhoneNumber(auth, phoneNumber, appVerifier)
//         .then((confirmationResult) => {
//           // Store the confirmation result to use for verifying the code later
//           window.confirmationResult = confirmationResult;
//           alert("Verification code sent to your phone.");

//           // Hide the phone number popup and show the verification code popup
//           document.getElementById("forgot-password-popup").style.display =
//             "none";
//           document.getElementById("verification-popup").style.display = "flex";
//         })
//         .catch((error) => {
//           // Show error message if there's an issue with sending the code
//           document.getElementById("verification-error").style.display = "block";
//           document.getElementById("verification-error").textContent =
//             error.message;
//         });
//     } else {
//       // Show error message if the phone number is not valid
//       document.getElementById("verification-error").style.display = "block";
//       document.getElementById("verification-error").textContent =
//         "Please enter a valid phone number.";
//     }
//   });

// // Event listener for submitting the verification code
// document
//   .getElementById("verification-submit")
//   .addEventListener("click", function (e) {
//     e.preventDefault();

//     // Get the verification code input value
//     const code = document.getElementById("verification-input").value;

//     // Use the confirmation result to confirm the verification code
//     window.confirmationResult
//       .confirm(code)
//       .then((result) => {
//         // If the verification is successful, the user is signed in
//         const user = result.user;
//         alert("Phone number verified successfully!");

//         // Hide the verification code popup
//         document.getElementById("verification-popup").style.display = "none";

//         // Here you can redirect the user or perform other actions after successful verification
//       })
//       .catch((error) => {
//         // Show error message if the verification code is incorrect
//         document.getElementById("verification-error").style.display = "block";
//         document.getElementById("verification-error").textContent =
//           error.message;
//       });
//   });

// Handle new password submission
document
  .getElementById("new-password-submit")
  .addEventListener("click", function (e) {
    e.preventDefault();
    const newPassword = document.getElementById("new-password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if (newPassword === confirmPassword) {
      // Assume `resetCode` is available from previous steps
      confirmPasswordReset(auth, window.resetCode, newPassword)
        .then(() => {
          alert("Password has been changed successfully!");
          document.getElementById("new-password-popup").style.display = "none";
        })
        .catch((error) => {
          document.getElementById("new-password-error").style.display = "block";
          document.getElementById("new-password-error").textContent =
            error.message;
        });
    } else {
      document.getElementById("new-password-error").style.display = "block";
      document.getElementById("new-password-error").textContent =
        "Passwords do not match.";
    }
  });

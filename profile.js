let username = "";

const firebaseConfig = {
    apiKey: "AIzaSyDBemf5ElpxdI3Ubb13ZdA5vNqDwZttKqA",
    authDomain: "hackathon-7623b.firebaseapp.com",
    projectId: "hackathon-7623b",
    storageBucket: "hackathon-7623b.appspot.com",
    messagingSenderId: "1007317168422",
    appId: "1:1007317168422:web:d9f7342129527a3cf851e7",
    measurementId: "G-Q474JGRKJJ"
  };

firebase.initializeApp(firebaseConfig);
var auth = firebase.auth();
var db = firebase.firestore();

document.addEventListener("DOMContentLoaded", function() {
    const resetButton = document.getElementById("rbtn");
    
    resetButton.addEventListener("click", async () => {
        const oldPassword = document.getElementById("oldPass").value;
        const newPassword = document.getElementById("newPass").value;
        const confirmPassword = document.getElementById("repPass").value;
        const user = auth.currentUser;

        if (user) {
            if (newPassword === confirmPassword) {
                const credentials = firebase.auth.EmailAuthProvider.credential(user.email, oldPassword);

                try {
                    await user.reauthenticateWithCredential(credentials);
                    await user.updatePassword(newPassword);
                    swal.fire("Success", "Password updated successfully.", "success");
                    clearPasswordFields();
                } catch (error) {
                    swal.fire("Error", "Incorrect Password.", "error");
                    console.error("Error updating password:", error);
                }
            } else {
                swal.fire("Error", "Passwords do not match.", "error");
            }
        }
    });
});

function clearPasswordFields() {
    document.getElementById("oldPass").value = "";
    document.getElementById("newPass").value = "";
    document.getElementById("repPass").value = "";
}

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        username = user.email.slice(0, -10); // Store the username
        document.getElementById("headerName").innerText = username;
        document.getElementById("name").innerText = username;
    } else {
        window.location.href = "./login.html";
        document.getElementById("headerName").innerText = 'null';
    }
});

function logOut() {
    firebase
        .auth()
        .signOut()
        .then(() => {
            // console.log("Sign out successful");
            // Redirect to the sign-in page or any other desired destination
            window.location.href = "./login.html";
        })
        .catch((error) => {
            console.log("Sign out error:", error);
        });
}
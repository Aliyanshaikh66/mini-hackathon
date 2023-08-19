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
var db = firebase.firestore();

let username = "";

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // console.log(localStorage.getItem("userMail"))
        document.getElementById("mail").innerText = localStorage.getItem("userMail");
        document.getElementById("pname").innerText = localStorage.getItem("userMail").slice(0, -10);
        document.getElementById("User").innerText = localStorage.getItem("userMail").slice(0, -10);
    } else {
        window.location.href = "./login.html";
        document.getElementById("headerName").innerText = 'null';
    }
});

function renderUserPosts(userEmail) {
    let container = document.querySelector(".user-posts-container");
    container.innerHTML = "";
    db.collection("posts")
        .orderBy("timestamp", "desc")
        .get()
        .then((querySnapshot) => {
            if (querySnapshot.empty) {
                container.innerHTML = "<h1 class='font'>No Posts Found</h1>";
                // console.log("me")
            } else {

                querySnapshot.forEach(function (doc) {
                    var data = doc.data();

                    var timestamp = data.timestamp ? data.timestamp.toDate() : new Date();
                    let post = document.createElement("div");
                    post.className += " column renderPost full";

                    let row = document.createElement("div");
                    row.className += " row";
                    post.appendChild(row);

                    let image = document.createElement("img");
                    image.className += "userImg"
                    image.src = "pic.jpeg"
                    row.appendChild(image);

                    let div = document.createElement("div")
                    div.className += " col"
                    div.style.marginLeft = "1em"
                    row.appendChild(div);

                    let title = document.createElement("p");
                    title.className += " title";
                    title.style.fontSize = "1.5em";
                    title.style.fontWeight = "bold";
                    title.innerText = data.title; // Render the title
                    div.appendChild(title);

                    let text = document.createElement("p");
                    text.className += " text";
                    text.style.fontSize = "1em"
                    text.style.fontWeight = "bolder"
                    text.innerText = data.post;
                    post.appendChild(text);

                    let tim = document.createElement("div")
                    tim.className += " row gap"
                    div.appendChild(tim)

                    let name = document.createElement("p");
                    name.innerText = `${data.user.slice(0, -10)}`;
                    tim.appendChild(name);

                    let time = document.createElement("p");
                    time.className += " postTime";
                    time.innerText = ` ${moment(timestamp).fromNow()}`;
                    tim.appendChild(time);

                    // console.log(data.user == localStorage.getItem('userMail'))

                    if (data.user == localStorage.getItem('userMail')) {
                        // console.log("Matched user:", data.user);
                        // console.log(post)
                        container.appendChild(post);
                    } else {
                        // console.log("Not matched user:", data.user);
                    }
                });
            }
        })
        .catch((error) => {
            console.error("Error getting user's posts:", error);
        });
}

document.addEventListener("DOMContentLoaded", function () {
    renderUserPosts();
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
import React, { useState } from 'react';
import './SignUp.css';
import Swal from 'sweetalert2';

function SignUp() {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPass, setUserPass] = useState("");
  const [userCPass, setUserCPass] = useState("");

  function empyt() {
    setUserName("");
    setUserEmail("");
    setUserPass("");
    setUserCPass("");
  }

  function signIn(e) {
    e.preventDefault();

    if (userEmail.includes('@')) {
      if (userPass === userCPass) {
        const creds = { userName, userEmail, userPass };

       

        // Send data to the server
        fetch('http://localhost:5000/credentials', {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(creds)
        })
          .then(resp => resp.json())
          .then((response) => {
            console.log(response, "response");
             // Show success alert
        Swal.fire({
          icon: "success",
          title: "Sign Up Successful",
          text: "You have successfully signed up!",
        });
            empyt();
            window.location="./Login";
          });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Passwords do not match!",
          footer: '<a href="#">Why do I have this issue?</a>'
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Invalid Email",
        text: "Please enter a valid email address.",
      });
    }
  }

  return (
    <div className='body-container-signUp'>
      <h1 className='SignUp'>Sign Up</h1>
      <div className='sig-container'>
        <form className="SignUp-container" onSubmit={signIn}>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder='Username*'
            required
          />
          <input
            type="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            placeholder='Email*'
            required
          />
          <input
            type="password"
            value={userPass}
            onChange={(e) => setUserPass(e.target.value)}
            placeholder='Password*'
            required
          />
          <input
            type="password"
            value={userCPass}
            onChange={(e) => setUserCPass(e.target.value)}
            placeholder='Confirm Password*'
            required
          />
          <button type="submit" className='SignUp-btn'>Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;

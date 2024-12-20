import React, { useEffect, useState } from 'react'
import './Login.css';
import Swal from 'sweetalert2';
function Login() {

    const[Creds,setCreds]=useState([]);
    const[emailCreds,setemailCreds]=useState("");
    const[passCreds,setpassCreds]=useState("");
    useEffect(()=>{
        fetch('http://localhost:5000/credentials')
        .then(resp=> resp.json())
        .then((response)=>{setCreds(response)});
    },[])
    console.log(Creds,"Creds")

    // function preventRef(e){
    // }
    function credsvalidation(e){
        e.preventDefault();
        console.log(emailCreds,passCreds,"credsdetails")
            Creds.map((credentials)=>{
                if(credentials.userEmail == emailCreds){
                    console.log("valid email");
                    if(credentials.userPass == passCreds){
                        Swal.fire({
                            icon: "success",
                            title: "Login Successful",
                            text: "You have successfully signed up!",
                        });
                        
                          setTimeout(()=>{window.location="./";},1000);
                    }else{
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "Pass doesn't match!",
                            footer: '<a href="#">Why do I have this issue?</a>'
                          });

                    }

                }else{
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Email doesn't match!",
                        footer: '<a href="#">Why do I have this issue?</a>'
                      });
                }
            })

    }
    return (

        <>
            <div className='body-container'>
                <h1 className='login'>Login*</h1>
                <div className="login-container">
                    
                <form onSubmit={credsvalidation}>
                    
                    <input type="text"  onChange={(e)=>{setemailCreds(e.target.value)}} placeholder='Email*' required />
                    <input type="password" onChange={(e)=>{setpassCreds(e.target.value)}} placeholder='Password*' required />

                        <button type="submit">Login</button>

                </form>
                </div>
            </div>

        </>
    )
}

export default Login

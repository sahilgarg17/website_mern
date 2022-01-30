import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async (e) => {
      e.preventDefault();
      const res = await fetch('/signin', {
          method:"POST",
          headers: {
            "Content-Type" : "application/json"
          },
          body: JSON.stringify({
            email,
            password
          })
      });
      const data = await res.json();
      if (res.status === 422 || !data) {
        window.alert("Invalid Credentials");
        console.log("Invalid Credentials");
      } else {
        window.alert("Login Successful");
        console.log("Login successful");
        navigate('/', { replace: true })
      }
  }

  return (
    <div>
      <h1 className="text-center mt-4">Log in</h1>

      <div className="container">
        <form method = "POST">
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value = {email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
            />
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              value = {password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>

          <div className="text-center">
            <button type="submit" class="btn btn-primary m-4" onClick={loginUser}>
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
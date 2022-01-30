import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function About() {

  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const callAboutPage = async () => {
        try {
          const res = await fetch("/about", {
              method: "GET",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
              },
              credentials: "include"
          })
          const data = await res.json();
          console.log(data);
          setUserData(data);
          if(!res.status === 200) {
            throw new Error(res.error);
          }
        } catch(e) {
          console.log(e);
          navigate('/login');
        }
  }
  
  useEffect(() => {
      callAboutPage(); 
  }, []);

  return (
    <div className="container mt-4">
      <div className="jumbotron">
        <h1 className="display-4">Sahil Garg</h1>

        <h3>Web Developer</h3>
        <p>Work links</p>
        <p className="lead">
          <a href="http://">Youtube</a>
          <br />
          <a href="http://">Instagram</a>
          <br />
          <a href="http://">FaceBook</a>
        </p>
        <hr className="my-4" />
        <p>
          It uses utility classes for typography and spacing to space content
          out within the larger container.
        </p>

        <p>{userData.name}</p>
        <p>email : {userData.email}</p>
        <p>phone : {userData.phone}</p>
        <p>Profession : {userData.work}</p>
        <p className="lead">
          <a className="btn btn-primary btn-lg" href="#" role="button">
            Learn more
          </a>
        </p>
      </div>
    </div>
  );
}

export default About;
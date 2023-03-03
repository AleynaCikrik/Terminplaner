import { useEffect, useState } from "react";
import { getAllUsers } from "./functions/Firebase";
import {useNavigate} from 'react-router-dom';

function calcRights(userData, navigate) {
  let nameInput = document.getElementById("nameInput").value;
  let passwordInput = document.getElementById("passwordInput").value;
  let match = false;
  let isAdmin = false;
  userData.forEach(element => {
    if(element.Name === nameInput && element.Password === passwordInput) {
      match = true;
      isAdmin = element.isAdmin;
    }
  });

  if(match) {
    sessionStorage.setItem("login", "true");
    sessionStorage.setItem("name", nameInput);
    sessionStorage.setItem("isAdmin", isAdmin);
    navigate('/')
  }
}

function Login() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    getAllUsers().then(data => setUserData(data))
  }, []);

  return (
    <div>
      Benutzername:
      <input id='nameInput' type={'text'}></input>
      Passwort:
      <input id='passwordInput' type={'text'}></input>
      <button onClick={()=>calcRights(userData, navigate)}>Login</button>
    </div>
  );
}

export default Login;

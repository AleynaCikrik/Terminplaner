import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function calcRights(userData, navigate) {
  let nameInput = document.getElementById("nameInput").value;
  let passwordInput = document.getElementById("passwordInput").value;
  let match = false;
  let isAdmin = false;
  userData.forEach(element => {
    console.log(element)
    if (element.name === nameInput && element.pw === passwordInput) {
      match = true;
      isAdmin = element.ia;
    }
  });

  if (match) {
    sessionStorage.setItem("login", "true");
    sessionStorage.setItem("name", nameInput);
    sessionStorage.setItem("isAdmin", isAdmin);
    navigate('/search')
  } else {
    toast.error('Benutzername/Passwort falsch!', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "colored",
    });
  }
}

function Login(props) {
  const navigate = useNavigate();

  return (
    <div>
      <input className='niceInput' placeholder="Benutzername" id='nameInput' type={'text'}></input>
      <input className='niceInput' placeholder="Passwort" id='passwordInput' type={'text'}></input>
      <button className='niceInput' onClick={() => calcRights(props.userData, navigate)}>Login</button>
    </div>
  );
}

export default Login;

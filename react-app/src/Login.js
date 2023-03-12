import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function handleKeyDown(key, userData, navigate, setIsAdmin) {
  if(key === 'Enter') {
    calcRights(userData, navigate, setIsAdmin)
}
}

function calcRights(userData, navigate, setIsAdmin) {
  let nameInput = document.getElementById("nameInput").value;
  let passwordInput = document.getElementById("passwordInput").value;
  let match = false;
  let isAdmin = false;
  userData.forEach(element => {
    if (element.name === nameInput && element.pw === passwordInput) {
      match = true;
      isAdmin = element.ia;
    }
  });

  if (match) {
    sessionStorage.setItem("login", "true");
    sessionStorage.setItem("name", nameInput);
    sessionStorage.setItem("isAdmin", isAdmin);
    setIsAdmin(isAdmin)
    navigate('/home')
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
      <div className='containerDivExtra2'>
        <input className='niceInput' placeholder="Benutzername" id='nameInput' type={'text'}></input>
      </div>
      <div className='containerDivExtra2'>
        <input onKeyDown={(e)=>handleKeyDown(e.key, props.userData, navigate, props.setIsAdmin)} className='niceInput' placeholder="Passwort" id='passwordInput' type={'password'}></input>
      </div>
      <div className='containerDiv'>
        <button className='niceInput' onClick={() => calcRights(props.userData, navigate, props.setIsAdmin)}>Login</button>
      </div>
    </div>
  );
}

export default Login;

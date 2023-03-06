import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addNewUser } from './functions/Firebase';

function handleNewUser(userData, setUserData) {
  let nameInput = document.getElementById("nameInput").value;
  let pwInput = document.getElementById("pwInput").value;
  let adminInput = document.getElementById("adminInput").checked;

  if (nameInput !== undefined && pwInput !== undefined && adminInput !== undefined && nameInput.trim() !== '' && pwInput.trim() !== '') {
    let max = 0
    userData.forEach((usr) => {if(usr.id>max) {max=usr.id}})
    max++
    addNewUser(max, adminInput, nameInput, pwInput)
    setUserData([...userData, { id: max, ia: adminInput, name: nameInput, pw: pwInput}])
    toast.success('Erfolgreich gespeichert', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "colored",
    });
  } else {
    toast.error('Bitte alle Felder füllen', {
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


function AddUser(props) {
  const navigate = useNavigate();

  useEffect(() => {
    let loginState = sessionStorage.getItem("login");
    if (loginState !== 'true') {
      navigate('/login')
    }
    let adminState = sessionStorage.getItem("isAdmin");
    if (adminState !== 'true') {
      navigate('/search')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className='containerDivExtra1'>
        <input className='niceInput' placeholder='Benutzername' id='nameInput' type={'text'}></input>
      </div>
      <div className='containerDivExtra1'>
        <input className='niceInput' placeholder='Passwort' id='pwInput' type={'text'}></input>
      </div>
      <div className='containerDivExtra1'>
        <label className='niceCheck'>Admin:</label>
        <input className='niceCheck' id='adminInput' type={'checkbox'}></input>
      </div>
      <div className='containerDiv'>
        <button className='niceInput' onClick={() => handleNewUser(props.userData, props.setUserData)}>Nutzer anlegen</button>
      </div>
    </div>

  );
}

export default AddUser;

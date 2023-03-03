import './App.css';
import { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { addAppointment, getAllAppointments } from './functions/Firebase';

function handleLogout(navigate) {
  sessionStorage.clear();
  navigate('/login')
}

function handleNewAppointment(appointments, setAppointments) {
  let kundeInput = document.getElementById("kundeInput").value;
  let frisurInput = document.getElementById("frisurInput").value;
  let friseurInput = document.getElementById("friseurInput").value;
  let vonInput = document.getElementById("vonInput").value;
  let bisInput = document.getElementById("bisInput").value;
  addAppointment(friseurInput, frisurInput, kundeInput, new Date(vonInput), new Date(bisInput))
  setAppointments([...appointments, {Kunde: kundeInput, Frisur: frisurInput, Friseur: friseurInput, from: new Date(vonInput), to: new Date(bisInput)}])
}

function App() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);


  useEffect(() => {
    let loginState = sessionStorage.getItem("login");
    if(loginState !== 'true') {
      navigate('/login')
    } else {
      getAllAppointments().then(data => setAppointments(data))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div className="App">
     <button onClick={()=>handleLogout(navigate)}>Logout</button>
     <hr />
     <table border='1'>
    <thead><tr><th>Kunde</th><th>Frisur</th><th>Friseur</th><th>von</th><th>bis</th></tr></thead>
      
      <tbody>
     {appointments.map((data, idx) => {console.log(data);return <tr key={idx}><td key={idx+'Kunde'}>{data.Kunde}</td><td key={idx+'Frisur'}>{data.Frisur}</td><td key={idx+'Friseur'}>{data.Friseur}</td><td key={idx+'von'}>{new Date(data.from.seconds*1000).toLocaleString()}</td><td key={idx+'bis'}>{new Date(data.to.seconds*1000).toLocaleString()}</td></tr>})}
     </tbody></table>
     <hr />

     Kunde:
      <input id='kundeInput' type={'text'}></input>
      Frisur:
      <input id='frisurInput' type={'text'}></input>
      Friseur:
      <input id='friseurInput' type={'text'}></input>
      von:
      <input id='vonInput' type={'datetime-local'}></input>
      bis:
      <input id='bisInput' type={'datetime-local'}></input>
     <button onClick={()=>handleNewAppointment(appointments, setAppointments)}>Neuer Termin</button>
    </div>
  );
}

export default App;

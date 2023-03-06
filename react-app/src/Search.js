import './App.css';
import { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';

function getFriseur(userData, friseurID) {
  let friseurName = ''
  userData.forEach((usr) => {if(usr.id+''===friseurID+'') {friseurName=usr.name}})
  return friseurName
}

function handleSearch(appointments, setAppointmentsWork) {
  const newAppointments = []
  let friseurInput = document.getElementById("friseurInput").value;
  let kundeInput = document.getElementById("kundeInput").value;
  let dateInput = document.getElementById("dateInput").value;
  console.log(dateInput)
  appointments.forEach((app) => {
    const dateObj = new Date(app.date.seconds*1000).toISOString().split('T')[0]
    if((app.fid===friseurInput || friseurInput==='xxx') && (app.knd===kundeInput || kundeInput===undefined || kundeInput==='') && (dateObj===dateInput || dateInput===undefined || dateInput==='')) {
      newAppointments.push(app)
    }
  })
  setAppointmentsWork(newAppointments)
}

function Search(props) {
  const navigate = useNavigate();
  const [appointmentsWork, setAppointmentsWork] = useState();

  useEffect(() => {
    let loginState = sessionStorage.getItem("login");
    if(loginState !== 'true') {
      navigate('/login')
    }
    document.getElementById('dateInput').valueAsDate = new Date();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handleSearch(props.appointments, setAppointmentsWork)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.appointments]);


  return (
    <div className="App">
      <div className='containerDiv'>
        <select defaultValue={'xxx'} className='niceInput' id='friseurInput'>
          <option value="xxx">Friseur</option>
          {props.userData.map((data, idx) => { return <option key={idx} value={data.id}>{data.name}</option> })}
        </select>
      </div>
      <div className='containerDivExtra1'>
        <input className='niceInput' placeholder='Kunde' id='kundeInput' type={'text'}></input>
      </div>
      <div className='containerDivExtra2'>
        <input className='inputDate' id='dateInput' type={'date'}></input>
      </div>
      <div className='containerDiv'>
        <button className='niceInput' onClick={() => handleSearch(props.appointments, setAppointmentsWork)}>Suche</button>
      </div>
<hr />



<table id="customers">
    <thead><tr><th>Kunde</th><th>Friseur</th><th>Datum</th><th>Uhrzeit</th><th>Dauer (min)</th></tr></thead>
      
      <tbody>
        {appointmentsWork!==undefined?appointmentsWork.map((data, idx) => {return <tr key={idx}><td key={idx+'Kunde'}>{data.knd}</td><td key={idx+'Friseur'}>{getFriseur(props.userData, data.fid)}</td><td key={idx+'date'}>{new Date(data.date.seconds*1000).toLocaleString().split(',')[0].trim()}</td><td key={idx+'time'}>{new Date(data.date.seconds*1000).toLocaleString().split(',')[1].trim()}</td><td key={idx+'duration'}>{data.dur}</td></tr>}):<tr />}
     </tbody></table>
    
    </div>
  );
}

export default Search;

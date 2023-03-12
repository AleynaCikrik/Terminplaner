import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addAppointment } from './functions/Firebase';

function handleNewAppointment(usr, timedata, appointments, setAppointments) {
  let person = prompt("Bitte Kunde Eingeben");
  console.log(usr, timedata, person)
  addAppointment(usr, person, timedata, '30')
  setAppointments([...appointments, { knd: person, fid: usr, date: { seconds: timedata / 1000, nanoseconds: 0 }, dur: '30' }])
}

function handleDateChange(appointments, setAppointmentsWork, setSelectedDate) {
  let dateInput = document.getElementById('dateInput').valueAsDate
  if(dateInput===null) {
    document.getElementById('dateInput').valueAsDate = new Date()
    dateInput = document.getElementById('dateInput').valueAsDate
  }

  const newAppointments = []
  setSelectedDate(dateInput)

  appointments.forEach((app) => {
    if(dateInput.toDateString()===new Date(app.date.seconds*1000).toDateString()) {
      newAppointments.push(app)
    }
  })
  setAppointmentsWork(newAppointments)
}

function Home(props) {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [appointmentsWork, setAppointmentsWork] = useState();


  useEffect(() => {
    let loginState = sessionStorage.getItem("login");
    if (loginState !== 'true') {
      navigate('/login')
    }
    document.getElementById('dateInput').valueAsDate = new Date();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handleDateChange(props.appointments, setAppointmentsWork, setSelectedDate)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.appointments]);

    const startTime = new Date(selectedDate.getTime());
    startTime.setHours(10, 0, 0, 0); // 10:00:00 PM
    const endTime = new Date(selectedDate.getTime());
    endTime.setHours(20, 0, 0, 0); // 8:00:00 PM
    const times = []
    
    // Schleife durch alle halben Stunden zwischen Start- und Endzeit
    let currentTime = startTime;
    while (currentTime <= endTime) {
      if (currentTime.getMinutes() === 0 || currentTime.getMinutes() === 30) {
        times.push(new Date(currentTime.getTime()))
      }
      currentTime.setTime(currentTime.getTime() + 30 * 60 * 1000); // Erhöhe die Zeit um 30 Minuten
    }

  return (
    <div className="App">
    <div className='containerDivExtra2'>
      <input required onChange={()=> handleDateChange(props.appointments, setAppointmentsWork, setSelectedDate)} className='inputDate' id='dateInput' type={'date'}></input>
    </div>
<hr />
<div className='tableContainer'>
  {appointmentsWork ? 
<table id="customers">
    <thead><tr><th>{selectedDate.getDate() + '.' + ("0" +(selectedDate.getMonth()+1)).slice(-2)}</th>{props.userData.map((data, idx) => { return <th key={idx}>{data.name}</th> })}</tr></thead>
      { <tbody>
        {times.map((timedata, idx) => {return <tr key={idx}>
          <td key={idx+'Kunde'}>{timedata.toLocaleTimeString().substring(0,5)}</td>
          {props.userData.map((usr, idx) => { 
             var found = appointmentsWork.find(function (appoint) {
              return parseInt(appoint.fid) === usr.id && (appoint.date.seconds*1000 === timedata.getTime());
             });
             if(found===undefined) {
              return <td key={idx}>{<button onClick={()=>handleNewAppointment(usr.id, timedata, props.appointments, props.setAppointments)} className='niceTableElem'>➕</button>}</td> 
             } else {
              return <td key={idx}>{found.knd}</td> 
             }
            })}
          </tr>})}
     </tbody> }
     </table> : <div /> }
     </div>
    </div>
  );
}

export default Home;

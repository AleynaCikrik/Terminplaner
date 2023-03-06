import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addAppointment } from './functions/Firebase';
import { toast } from 'react-toastify';

function handleNewAppointment(appointments, setAppointments) {
  let kundeInput = document.getElementById("kundeInput").value;
  let dateInput = document.getElementById("dateInput").value;
  let dauerInput = document.getElementById("dauerInput").value;
  let friseurInput = document.getElementById("friseurInput").value;
  console.log(appointments)

  if (kundeInput !== undefined && dateInput !== undefined && dauerInput !== undefined && friseurInput !== 'xxx' && kundeInput.trim() !== '' && dateInput.trim() !== '' && dauerInput.trim() !== '') {
    addAppointment(friseurInput, kundeInput, new Date(dateInput), dauerInput)
    console.log(appointments)
    console.log(dateInput)
    setAppointments([...appointments, { knd: kundeInput, fid: friseurInput, date: { seconds: Date.parse(dateInput) / 1000, nanoseconds: 0 }, dur: dauerInput }])
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

    document.getElementById("friseurInput").value = 'xxx'
    document.getElementById("dateInput").value = ''
    document.getElementById("dauerInput").value = ''
    document.getElementById("kundeInput").value = ''
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

function Planner(props) {
  const navigate = useNavigate();
  useEffect(() => {
    let loginState = sessionStorage.getItem("login");
    if (loginState !== 'true') {
      navigate('/login')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="App">
      <div className='containerDiv'>
        <select defaultValue={'xxx'} className='niceInput' id='friseurInput'>
          <option value="xxx" disabled hidden>Friseur</option>
          {props.userData.map((data, idx) => { return <option key={idx} value={data.id}>{data.name}</option> })}
        </select>
      </div>

      <div className='containerDivExtra1'>
        <input className='niceInput' placeholder='Kunde' id='kundeInput' type={'text'}></input>
      </div>

      <div className='containerDivExtra2'>
        <input className='niceInput' id='dateInput' type={'datetime-local'}></input>
      </div>

      <div className='containerDivExtra1'>
        <input className='niceInput' step={5} placeholder='Dauer (Minuten)' id='dauerInput' type={'number'}></input>
      </div>

      <div className='containerDiv'>
        <button type="submit" className='niceInput' onClick={() => handleNewAppointment(props.appointments, props.setAppointments)}>Termin Anlegen</button>
      </div>
    </div>
  );
}

export default Planner;

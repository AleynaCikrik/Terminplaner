import { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { addAppointment } from './functions/Firebase';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from 'react-datepicker';
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import de from 'date-fns/locale/de';
registerLocale('de', de)

function handleNewAppointment(appointments, setAppointments) {
  let kundeInput = document.getElementById("kundeInput").value;
  let frisurInput = document.getElementById("frisurInput").value;
  let friseurInput = document.getElementById("friseurInput").value;
  let vonInput = document.getElementById("vonInput").value;
  let bisInput = document.getElementById("bisInput").value;
  addAppointment(friseurInput, frisurInput, kundeInput, new Date(vonInput), new Date(bisInput))
  setAppointments([...appointments, {Kunde: kundeInput, Frisur: frisurInput, Friseur: friseurInput, from: new Date(vonInput), to: new Date(bisInput)}])
}

function Planner(props) {
  const navigate = useNavigate();
  const options = props.userData.map((usr)=>({value:usr.Name, label:usr.Name}))


  useEffect(() => {
    let loginState = sessionStorage.getItem("login");
    if(loginState !== 'true') {
      navigate('/login')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  

  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [startDate1, setStartDate1] = useState(new Date());
  const [endDate1, setEndDate1] = useState(new Date());
  return (
    <div className="App">
      <Dropdown className='niceDropdown' options={options} placeholder='Friseur'/>
      <input className='niceInput' placeholder='Kunde' id='kundeInput' type={'text'}></input>
      <input className='niceInput' id='vonInput' type={'datetime-local'}></input>
      <input className='niceInput' step={5} placeholder='Dauer (Minuten)' id='bisInput' type={'number'}></input>
      <button className='niceInput' onClick={()=>handleNewAppointment(props.appointments, props.setAppointments)}>Termin Anlegen</button>
      <DatePicker
      selectsRange={true}
      startDate={startDate}
      endDate={endDate}
      showTimeSelect
      locale="de"
      onChange={(update) => {
        setDateRange(update);
      }}
      isClearable={true}
    />
    <DatePicker
      selected={startDate1}
      onChange={date => setStartDate1(date)}
      showTimeSelect
      showTimeSelectOnly
      selectsStart
      timeIntervals={15}
      timeCaption="Time"
      dateFormat="h:mm aa"
    />
    <DatePicker
      selected={endDate1}
      onChange={date => setEndDate1(date)}
      showTimeSelect
      showTimeSelectOnly
      selectsEnd
      minTime={startDate1}
      maxTime={startDate1}
      timeIntervals={15}
      timeCaption="Time"
      dateFormat="h:mm aa"
    />
    </div>
  );
}

export default Planner;

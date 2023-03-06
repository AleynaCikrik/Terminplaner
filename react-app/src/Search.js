import './App.css';
import { useEffect } from 'react';
import {useNavigate} from 'react-router-dom';

function getFriseur(userData, friseurID) {
  let friseurName = ''
  userData.forEach((usr) => {if(usr.id+''===friseurID) {friseurName=usr.name}})
  return friseurName
}

function Search(props) {
  const navigate = useNavigate();

  useEffect(() => {
    let loginState = sessionStorage.getItem("login");
    if(loginState !== 'true') {
      navigate('/login')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div className="App">
<div className='containerDiv'>
<select defaultValue={'xxx'} className='niceInput' id='friseurInput'>
      <option value="xxx" disabled hidden>Friseur</option>
        {props.userData.map((data, idx) => {return <option key={idx} value={data.id}>{data.name}</option>})}
      </select></div>
     
     <table border='1'>
    <thead><tr><th>Kunde</th><th>Friseur</th><th>Datum, Uhrzeit</th><th>Dauer</th></tr></thead>
      
      <tbody>
     {props.appointments.map((data, idx) => {return <tr key={idx}><td key={idx+'Kunde'}>{data.knd}</td><td key={idx+'Friseur'}>{getFriseur(props.userData, data.fid)}</td><td key={idx+'von'}>{new Date(data.date.seconds*1000).toLocaleString()}</td><td key={idx+'bis'}>{data.dur}</td></tr>})}
     </tbody></table>
    
    </div>
  );
}

export default Search;

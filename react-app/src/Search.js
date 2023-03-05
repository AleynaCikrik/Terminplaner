import './App.css';
import { useEffect } from 'react';
import {useNavigate} from 'react-router-dom';

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
     
     <table border='1'>
    <thead><tr><th>Kunde</th><th>Frisur</th><th>Friseur</th><th>von</th><th>bis</th></tr></thead>
      
      <tbody>
     {props.appointments.map((data, idx) => {return <tr key={idx}><td key={idx+'Kunde'}>{data.Kunde}</td><td key={idx+'Frisur'}>{data.Frisur}</td><td key={idx+'Friseur'}>{data.Friseur}</td><td key={idx+'von'}>{new Date(data.from.seconds*1000).toLocaleString()}</td><td key={idx+'bis'}>{new Date(data.to.seconds*1000).toLocaleString()}</td></tr>})}
     </tbody></table>
    
    </div>
  );
}

export default Search;

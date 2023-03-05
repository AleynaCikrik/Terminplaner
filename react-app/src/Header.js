import {useNavigate} from 'react-router-dom';

function handleLogout(navigate) {
  sessionStorage.clear();
  navigate('/login')
}

function handleSearch(navigate) {
  navigate('/search')
}

function handlePlanner(navigate) {
  navigate('/planner')
}

function Header() {
  const navigate = useNavigate();
  return (
    <div className='header'>
      <span onClick={()=>handleSearch(navigate)} className='headerIcon'>🔍</span>
      <span onClick={()=>handlePlanner(navigate)} className='headerIcon'>📅</span>
      <span onClick={()=>handleLogout(navigate)} className='headerIconLogout'>🚪</span>
  </div>
  );
}

export default Header;

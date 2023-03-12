import {useNavigate} from 'react-router-dom';

function handleLogout(navigate) {
  sessionStorage.clear();
  navigate('/login')
}

function handleSearch(navigate) {
  navigate('/search')
}

function handleHome(navigate) {
  navigate('/home')
}

function handleAddUser(navigate) {
  navigate('/addUser')
}

function Header() {
  const navigate = useNavigate();
  return (
    <div className='header'>
      <span onClick={()=>handleHome(navigate)} className='headerIcon'>🏠</span>
      <span onClick={()=>handleSearch(navigate)} className='headerIcon'>🔍</span>
      {/* <span onClick={()=>handlePlanner(navigate)} className='headerIcon'>📅</span> */}
      <span onClick={()=>handleAddUser(navigate)} className='headerIcon'>➕</span>
      <span onClick={()=>handleLogout(navigate)} className='headerIconLogout'>🚪</span>
  </div>
  );
}

export default Header;

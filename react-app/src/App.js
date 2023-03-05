import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    let loginState = sessionStorage.getItem("login");
    if(loginState !== 'true') {
      navigate('/login')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div />
  );
}

export default App;

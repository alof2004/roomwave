
import { useState } from 'react';
import '../App.css'; // Adjust the path as necessary
import { Link } from 'react-router-dom'; // Assuming you're using React Router
import { useNavigate } from 'react-router-dom';
import LogoutAlert from './logoutAlert';
import NavBarLandLord from './NavBarLandLord';



function NavBarClient() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogoutAlert, setShowLogoutAlert] = useState(false); // Estado para controlar a exibição do alerta de logout
  const navigate = useNavigate();
  const userData = localStorage.getItem("userData"); // Obtém o item "userData" do localStorage

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowLogoutAlert(true); // Exibe o alerta de logout ao fazer logout
    setTimeout(() => {
      setShowLogoutAlert(false); // Fecha o alerta após 3 
      localStorage.removeItem("userData"); // Remove o item "userData" do localStorage
      localStorage.removeItem("visitedRooms"); // Remove o item "visitedRooms" do localStorage
      navigate('/login'); // Redireciona para a página de login após 
    }, 1000); // Tempo em milissegundos para manter o alerta visível antes de fechar
  };

  function handleperfil(): void {
    navigate('/perfilcertificator'); 
  }
  if (userData && JSON.parse(userData).type === "client"){
    return (<NavBarClient/>)
  }
  if (userData && JSON.parse(userData).type === "landlord"){
    return (<NavBarLandLord/>)
  }
  else{
  return (
    <><nav className="navbar border-bottom navbar-expand-lg myCustomNavbar" data-bs-theme="dark">
      <div className="container-fluid">
        <Link to="/HomeAvaliador" className="navbar-brand">
          <img src="../src/images/roomWaveLogo.png" width="148" height="80" alt="Logo" />
        </Link>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item nav-item-flex">
              <Link to="../../../HomeAvaliador" className="nav-link">
                <img src="../../src/images/quarto.png" width="50" height="60" alt="Home Icon" />
                  Quartos por Avaliar
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ paddingLeft: "2px" }} href='#'>
                <img src="../../src/images/perfil_icon.png" width="50" height="50" alt="Profile Icon" />
                Perfil
                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <button className="dropdown-item" onClick={handleperfil}>O meu Perfil</button>
                  <button className="dropdown-item" onClick={handleLogout}>Log-Out</button> {/* Usando um botão com um manipulador de evento onClick */}
                </div>
              </a>
            </li>
            <li className="nav-item nav-item-flex">
              <Link to="../../../AjudaAvaliador" className="nav-link">
                <img src="../src/images/ajuda_icon.png" width="50" height="50" alt="Help Icon" />
                Ajuda
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav><div>
        <LogoutAlert show={showLogoutAlert} /> {/* Passa o estado showLogoutAlert como prop */}
      </div></>
  );
}
}

export default NavBarClient;

// App.tsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/AuthContext';
import RoomDetails from './components/RoomDetails';
import HomeClient from './components/homeClient';
import HomeLandlord from './components/homeLandlord';
import Home from './components/home';
import Login from './components/Login';
import SignupClient from './components/SignupClient';
import SignupLandlord from './components/SignupLandlord';
import RoomsListPage from './components/RoomsListPage';
import 'leaflet/dist/leaflet.css';
import Map from './components/Map';
import Foundcoord from './components/foundcoord';
import Button from './components/button';
import AddRoom from './components/AddRoom';
import Ajuda from './components/Ajuda';
import { FavoriteRoomsProvider } from './components/FavoriteRoomsContext';
import { UserProvider } from './components/UserContext';
import FavoritesPage from './components/FavoritesPage';
import Perfil from './components/Perfil';
import HomeAvaliador from './components/HomeAvaliador';
import RoomsUniListPage from './components/RoomsUniListPage';
import PerfilLandlord from './components/PerfilLandlord';
import AjudaLandlord from './components/AjudaLandlord';
import PerfilCertificator from './components/PerfilCertificator';
import Avaliar from './components/Avaliar';
import AjudaAvaliador from './components/AjudaCertificador';
import RoomDetailsSecond from './components/RoomDetails2Version';





function App() {
 return (
    <Router>
      <UserProvider>
      <AuthProvider>
        <FavoriteRoomsProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/homeClient" element={<HomeClient />} />
            <Route path="/homeLandlord" element={<HomeLandlord />} />
            <Route path="/homeAvaliador" element={<HomeAvaliador />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup/client" element={<SignupClient />} />
            <Route path="/signup/landlord" element={<SignupLandlord />} />
            <Route path="/addRoom" element={<AddRoom />} />
            <Route path="/RoomDetails" element={<RoomDetails />} />
            <Route path="/home" element={<Home/>} />
            <Route path="/rooms/:city" element={<RoomsListPage/>} />
            <Route path="/Map" element={<Map/>} />
            <Route path="/foundcoord" element={<Foundcoord />} />
            <Route path="/button" element={<Button />} />
            <Route path="/ajuda" element={<Ajuda />} />
            <Route path="/favorites" element={<FavoritesPage/>} />
            <Route path="/roomAntigo/:ID" element={<RoomDetails/>} />
            <Route path="/perfil" element={<Perfil/>} />
            <Route path="/uni/:uni" element={<RoomsUniListPage/>} />
            <Route path="/perfillandlord" element={<PerfilLandlord/>} />
            <Route path="/perfilclient" element={<PerfilLandlord/>} />
            <Route path="/perfilcertificator" element={<PerfilCertificator/>} /> 
            <Route path="/avaliar/:ID" element={<Avaliar/>} />
            <Route path="/ajudalandlord" element={<AjudaLandlord />} />
            <Route path="/ajudaavaliador" element={<AjudaAvaliador />} />
            <Route path="/room/:ID" element={<RoomDetailsSecond />} />

          </Routes>
        </FavoriteRoomsProvider>
      </AuthProvider>
      </UserProvider>
    </Router>
 );
}

export default App;

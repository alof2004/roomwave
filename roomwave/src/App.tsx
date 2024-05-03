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



function App() {
 const { isLoggedIn } = useAuth();
 return (
    <Router>
      <UserProvider>
      <AuthProvider>
        <FavoriteRoomsProvider>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/homeClient" element={<HomeClient />} />
            <Route path="/homeLandlord" element={<HomeLandlord />} />
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
          </Routes>
        </div>
        </FavoriteRoomsProvider>
      </AuthProvider>
      </UserProvider>
    </Router>
 );
}

export default App;

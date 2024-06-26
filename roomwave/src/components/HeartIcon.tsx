import React, { useState, useEffect } from 'react';
import { IonIcon } from '@ionic/react';
import { heart } from 'ionicons/icons';
import '../css/HeartIcon.css';
import { useUser } from './UserContext';

interface HeartIconProps {
 roomId: number;
 isFavorite: boolean;
}

const HeartIcon: React.FC<HeartIconProps> = ({ roomId }) => {
 const [isFavorite, setIsFavorite] = useState(false);

 useEffect(() => {
    // Check if the room is favorited when the component mounts
    const favoriteRooms = JSON.parse(localStorage.getItem('favoriteRooms') || '[]');
    setIsFavorite(favoriteRooms.includes(roomId));
 }, [roomId]);

 const toggleFavorite = () => {
  // Retrieve user data from localStorage
  const userDataString = localStorage.getItem('userData');
  const userData = JSON.parse(userDataString || '{}');
  console.log('userData', userData);
  // Check if there is no user data or if the user is not logged in
  if (!userData || Object.keys(userData).length === 0) {
    console.log('User is not logged in');
    window.location.href = '/login';
    return;
  }

  // Toggle favorite status in localStorage
  const favoriteRooms = JSON.parse(localStorage.getItem('favoriteRooms') || '[]');
  const updatedFavorites = favoriteRooms.includes(roomId)
    ? favoriteRooms.filter((id: number) => id !== roomId)
    : [...favoriteRooms, roomId];
  localStorage.setItem('favoriteRooms', JSON.stringify(updatedFavorites));

  // Update the state to reflect the new favorite status
  setIsFavorite(!isFavorite);
};


 return (
    <div className='large-font text-center top-20'>
      <IonIcon icon={heart} className={`heart-icon ${isFavorite ? 'active' : ''}`} onClick={toggleFavorite}>
        <div className='red-bg'></div>
      </IonIcon>
    </div>
 );
};

export default HeartIcon;

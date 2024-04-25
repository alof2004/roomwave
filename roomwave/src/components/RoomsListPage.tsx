import React, { useEffect, useState } from 'react';

function RoomsListPage() {
    const [lastSegment, setLastSegment] = useState('');

    useEffect(() => {
        const url = window.location.href;
        const segment = url.substring(url.lastIndexOf('/') + 1);
        const decodedRoomName = decodeURIComponent(segment);
        setLastSegment(decodedRoomName);
    }, []);

    return (
        <div>
            <h1>Quartos em: {lastSegment}</h1>
        </div>
    );
}

export default RoomsListPage;
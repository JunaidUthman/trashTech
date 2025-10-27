import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import './UserInterface.css'
import trashCansData from '../../data/trashCans.json'
import TrashCanModal from '../TrashCanModal/TrashCanModal'

// Custom icons
const trashIcon = L.icon({
  iconUrl: '/icons/trashIcone.png',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

const userIcon = L.icon({
  iconUrl: '/icons/location.png', // 👈 add your own icon image here (e.g., a blue dot)
  iconSize: [35, 35],
  iconAnchor: [17, 35],
  popupAnchor: [0, -30],
});

function UserInterface() {
  const center = [35.5889, -5.3626];
  const trashCans = trashCansData.trashCans;

  // 🧭 User position state
  const [userPosition, setUserPosition] = useState(null);

  // 🔍 Get user location when component mounts
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setUserPosition([latitude, longitude]);
          console.log("User position:", latitude, longitude);
        },
        (err) => {
          console.error("Could not get user location:", err);
          alert("Please enable location to mark your position on the map.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }, []);

  // Modal state
  const [selectedCan, setSelectedCan] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMarkerClick = (can) => {
    setSelectedCan(can);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCan(null);
  };

  const handleFindNearest = () => {
    if (!userPosition) {
      alert("Your location is not available yet.");
      return;
    }
    alert("Finding nearest trash cans based on your location...");
  };

  return (
    <div className="user-interface-page">
      <div className="user-interface">
        <div className="map-section">
          <MapContainer
            center={center}
            zoom={14}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* 🗺️ User marker */}
            {userPosition && (
              <Marker position={userPosition} icon={userIcon}>
              </Marker>
            )}

            {/* ♻️ Trash can markers */}
            {trashCans.map((can) => (
              <Marker
                key={can.id}
                position={[can.location.lat, can.location.lng]}
                icon={trashIcon}
                eventHandlers={{
                  click: () => handleMarkerClick(can),
                }}
              />
            ))}
          </MapContainer>
        </div>

        {/* ... your right-side sidebar section (unchanged) ... */}
      </div>

      {/* Modal Component */}
      <TrashCanModal
        can={selectedCan}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default UserInterface;

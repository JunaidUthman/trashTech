import { useState } from 'react'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import { MapPin, Sparkles, TrendingUp, Clock, Package } from 'lucide-react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import './UserInterface.css'
import trashCansData from '../../data/trashCans.json'
import TrashCanModal from '../TrashCanModal/TrashCanModal'

// Custom icon using your image
const customIcon = L.icon({
  iconUrl: '/icons/trashIcone.png',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40]
})

function UserInterface() {
  const center = [35.5889, -5.3626]
  const trashCans = trashCansData.trashCans
  
  // Modal state
  const [selectedCan, setSelectedCan] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleFindNearest = () => {
    alert('Finding nearest trash cans... (This will be implemented with real location data)')
  }

  // Handle marker click
  const handleMarkerClick = (can) => {
    setSelectedCan(can)
    setIsModalOpen(true)
  }

  // Handle modal close
  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedCan(null)
  }

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return '#10b981'
      case 'full':
        return '#ef4444'
      case 'maintenance':
        return '#f59e0b'
      default:
        return '#6b7280'
    }
  }

  // Get fullness percentage color
  const getFullnessColor = (fullness) => {
    if (fullness < 30) return '#10b981'
    if (fullness < 70) return '#f59e0b'
    return '#ef4444'
  }

  return (
    <div className="user-interface-page">

      {/* Main Content */}
      <div className="user-interface">
        {/* Map Section - Left Side */}
        <div className="map-section">
          <MapContainer 
            center={center} 
            zoom={14} 
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {/* Markers for trash cans */}
            {trashCans.map((can) => (
              <Marker 
                key={can.id} 
                position={[can.location.lat, can.location.lng]}
                icon={customIcon}
                eventHandlers={{
                  click: () => handleMarkerClick(can)
                }}
              >
                {/* no Popup here — click opens modal instead */}
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Sidebar Section - Right Side */}
        <div className="sidebar-section">
          <div className="sidebar-content">
            <div className="icon-container">
              <MapPin size={64} className="map-icon" />
            </div>
            
            <h2 className="sidebar-title">Find Your Nearest Trash Can</h2>
            
            <p className="sidebar-description">
              Locate the closest available trash cans in your area. 
              Our smart system will show you the nearest bins and help 
              you navigate to them efficiently.
            </p>

            <div className="stats-container">
              <div className="stat-card">
                <div className="stat-number">{trashCans.length}</div>
                <div className="stat-label">Total Bins</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{trashCans.filter(c => c.status === 'available').length}</div>
                <div className="stat-label">Available</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">${trashCans.reduce((sum, c) => sum + c.earnings, 0).toFixed(2)}</div>
                <div className="stat-label">Total Earnings</div>
              </div>
            </div>

            <div className="info-cards">
              <div className="info-card">
                <h3>Quick Access</h3>
                <p>Find trash cans within walking distance</p>
              </div>
              <div className="info-card">
                <h3>Real-time Status</h3>
                <p>Check if bins are available or full</p>
              </div>
              <div className="info-card">
                <h3>Earn Rewards</h3>
                <p>Get paid for every waste deposit</p>
              </div>
            </div>

            <button className="find-button" onClick={handleFindNearest}>
              Find Nearest Trash Cans
            </button>

            <div className="tips-section">
              <h4>Legend:</h4>
              <ul>
                <li><span className="legend-dot" style={{backgroundColor: '#10b981'}}></span> Available - Ready to use</li>
                <li><span className="legend-dot" style={{backgroundColor: '#ef4444'}}></span> Full - Awaiting collection</li>
                <li><span className="legend-dot" style={{backgroundColor: '#f59e0b'}}></span> Maintenance - Temporarily unavailable</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Component */}
      <TrashCanModal 
        can={selectedCan} 
        isOpen={isModalOpen} 
        onClose={handleCloseModal}
      />
    </div>
  )
}

export default UserInterface
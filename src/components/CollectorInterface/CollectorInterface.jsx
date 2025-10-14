import { useState } from 'react'
import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet'
import { Truck, TrendingUp, Package, Clock, Route, Award, Navigation } from 'lucide-react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import './CollectorInterface.css'
import trashCansData from '../../data/trashCans.json'
import TrashCanModal from '../TrashCanModal/TrashCanModal'
import { findOptimalPath } from '../../utils/pathfindingAlgorithm'

// Custom icon for trash cans
const customIcon = L.icon({
  iconUrl: '/icons/trashIcone.png',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40]
})

// Custom icon for collector location
const collectorIcon = L.icon({
  iconUrl: '/icons/factory.png',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40]
})

function CollectorInterface() {
  const center = [35.5889, -5.3626]
  const trashCans = trashCansData.trashCans
  
  // Collector location (can be updated with real GPS data)
  const [collectorLocation] = useState({
    lat: 35.5989,
    lng: -5.3626,
    name: "Collector - OSOS"
  })
  
  // Modal state
  const [selectedCan, setSelectedCan] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  // Path state
  const [optimalPath, setOptimalPath] = useState(null)
  const [showPath, setShowPath] = useState(false)

  const handleOptimizeRoute = () => {
    const result = findOptimalPath(collectorLocation, trashCans, 75)
    setOptimalPath(result)
    setShowPath(true)
    
    if (result.numberOfStops === 0) {
      alert('No priority bins found! All bins are below 75% capacity.')
    } else {
      alert(`Optimal route calculated!\n\nStops: ${result.numberOfStops}\nTotal Distance: ${result.totalDistance} km\n\nThe route is now displayed on the map.`)
    }
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

  // Calculate priority bins (>70% full)
  const priorityBins = trashCans.filter(c => c.fullness > 70).length
  const totalCapacity = trashCans.reduce((sum, c) => sum + c.fullness, 0) / trashCans.length
  
  // Get high priority bins (>75%) for display
  const highPriorityBins = trashCans.filter(c => c.fullness > 75)

  return (
    <div className="collector-interface-page">
      <div className="collector-interface">
        {/* Sidebar Section - Left Side */}
        <div className="collector-sidebar">
          <div className="collector-sidebar-content">
            <div className="collector-icon-container">
              <Truck size={56} className="collector-icon" />
            </div>
            
            <h2 className="collector-title">Optimize Your Collection Route</h2>
            
            <p className="collector-description">
              Work smarter, not harder! Our intelligent routing system identifies 
              priority bins and creates the most efficient collection path for you.
            </p>

            <div className="collector-stats-grid">
              <div className="collector-stat-card priority">
                <Package className="stat-icon" size={24} />
                <div className="stat-number">{highPriorityBins.length}</div>
                <div className="stat-label">Priority Bins</div>
              </div>
              <div className="collector-stat-card">
                <TrendingUp className="stat-icon" size={24} />
                <div className="stat-number">{totalCapacity.toFixed(0)}%</div>
                <div className="stat-label">Avg Capacity</div>
              </div>
              {optimalPath && showPath && (
                <>
                  <div className="collector-stat-card">
                    <Route className="stat-icon" size={24} />
                    <div className="stat-number">{optimalPath.numberOfStops}</div>
                    <div className="stat-label">Stops</div>
                  </div>
                  <div className="collector-stat-card">
                    <Navigation className="stat-icon" size={24} />
                    <div className="stat-number">{optimalPath.totalDistance}</div>
                    <div className="stat-label">km</div>
                  </div>
                </>
              )}
            </div>

            <button className="optimize-button" onClick={handleOptimizeRoute}>
              <Route size={20} />
              Generate Optimal Route
            </button>

            {showPath && optimalPath && (
              <button 
                className="toggle-path-button" 
                onClick={() => setShowPath(!showPath)}
              >
                {showPath ? 'Hide Route' : 'Show Route'}
              </button>
            )}

            <div className="collector-info-grid">
              <div className="collector-info-card">
                <Award className="card-icon" size={28} />
                <h3>Maximize Efficiency</h3>
                <p>Focus on high-priority bins first</p>
              </div>
              <div className="collector-info-card">
                <Clock className="card-icon" size={28} />
                <h3>Save Time</h3>
                <p>Shortest routes automatically calculated</p>
              </div>
              <div className="collector-info-card">
                <TrendingUp className="card-icon" size={28} />
                <h3>Boost Productivity</h3>
                <p>Collect more in less time</p>
              </div>
            </div>

            <div className="collector-legend">
              <h4>Collection Priority:</h4>
              <ul>
                <li><span className="legend-indicator high"></span> High Priority (&gt;70% full)</li>
                <li><span className="legend-indicator medium"></span> Medium Priority (30-70% full)</li>
                <li><span className="legend-indicator low"></span> Low Priority (&lt;30% full)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Map Section - Right Side */}
        <div className="collector-map-section">
          <MapContainer 
            center={center} 
            zoom={14} 
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {/* Collector location marker */}
            <Marker 
              position={[collectorLocation.lat, collectorLocation.lng]}
              icon={collectorIcon}
            >
              <Popup>
                <div style={{ textAlign: 'center' }}>
                  <strong>{collectorLocation.name}</strong>
                  <br />
                  <span style={{ fontSize: '0.875rem', color: '#64748b' }}>Your Location</span>
                </div>
              </Popup>
            </Marker>
            
            {/* Optimal path polyline */}
            {showPath && optimalPath && optimalPath.path.length > 1 && (
              <Polyline 
                positions={optimalPath.path.map(point => [point.lat, point.lng])}
                color="#3b82f6"
                weight={4}
                opacity={0.7}
                dashArray="10, 10"
              />
            )}
            
            
            {/* Markers for trash cans */}
            {trashCans.map((can) => (
              <Marker 
                key={can.id} 
                position={[can.location.lat, can.location.lng]}
                icon={customIcon}
                eventHandlers={{
                  click: () => handleMarkerClick(can)
                }}
              />
            ))}
          </MapContainer>
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

export default CollectorInterface
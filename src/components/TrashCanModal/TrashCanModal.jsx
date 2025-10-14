import React from 'react';
import { X, MapPin, Package, TrendingUp, Clock, AlertCircle } from 'lucide-react';
import './TrashCanModal.css';

const TrashCanModal = ({ can, isOpen, onClose }) => {
  if (!isOpen || !can) return null;

  const getStatusColor = (status) => {
    const colors = {
      active: '#10b981',
      maintenance: '#f59e0b',
      inactive: '#ef4444',
    };
    return colors[status?.toLowerCase()] || '#6b7280';
  };

  const getFullnessColor = (fullness) => {
    if (fullness < 33) return '#10b981';
    if (fullness < 66) return '#f59e0b';
    return '#ef4444';
  };

  const statusBgMap = {
    active: 'bg-green-50 border-green-200',
    maintenance: 'bg-yellow-50 border-yellow-200',
    inactive: 'bg-red-50 border-red-200',
  };

  const statusTextMap = {
    active: 'text-green-700',
    maintenance: 'text-yellow-700',
    inactive: 'text-red-700',
  };

  const statusClass = can.status?.toLowerCase() || 'inactive';

  return (
    <>
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-container" onClick={(e) => e.stopPropagation()}>
          {/* Header */}
          <div className="modal-header">
            <div className="header-content">
              <h2 className="modal-title">{can.name}</h2>
              <p className="modal-subtitle">{can.location?.address}</p>
            </div>
            <button className="close-btn" onClick={onClose}>
              <X size={24} />
            </button>
          </div>

          {/* Status Badge */}
           

          {/* Main Content */}
          <div className="modal-content">
            {/* Info Grid */}
            <div className="info-grid">
              {/* Type Card */}
              <div className="info-card">
                <div className="info-card-header">
                  <Package size={20} className="info-icon" />
                  <span className="info-label">Type</span>
                </div>
                <p className="info-value">{can.type}</p>
              </div>

              {/* Capacity Card */}
              <div className="info-card">
                <div className="info-card-header">
                  <AlertCircle size={20} className="info-icon" />
                  <span className="info-label">Capacity</span>
                </div>
                <p className="info-value">{can.capacity}L</p>
              </div>
            </div>

            {/* Fullness Section */}
            <div className="fullness-section">
              <div className="section-header">
                <h3 className="section-title">Fullness Level</h3>
                <span className="fullness-percentage">{can.fullness}%</span>
              </div>

              <div className="fullness-bar-container">
                <div className="fullness-bar">
                  <div
                    className="fullness-progress"
                    style={{
                      width: `${can.fullness}%`,
                      backgroundColor: getFullnessColor(can.fullness),
                    }}
                  ></div>
                </div>
              </div>

              <div className="fullness-status">
                {can.fullness < 33 && <p className="status-good">✓ Plenty of space available</p>}
                {can.fullness >= 33 && can.fullness < 66 && <p className="status-warning">⚠ Filling up</p>}
                {can.fullness >= 66 && <p className="status-critical">! Empty soon</p>}
              </div>
            </div>

            {/* Stats Grid */}
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-icon earning-icon">
                  <TrendingUp size={18} />
                </div>
                <div className="stat-content">
                  <p className="stat-label">Potential Earnings</p>
                  <p className="stat-value">${can.earnings}</p>
                </div>
              </div>

              <div className="stat-item">
                <div className="stat-icon collection-icon">
                  <Clock size={18} />
                </div>
                <div className="stat-content">
                  <p className="stat-label">Last Collection</p>
                  <p className="stat-value">{can.lastCollection ? new Date(can.lastCollection).toLocaleDateString() : 'N/A'}</p>
                </div>
              </div>
            </div>

            {/* Location Card */}
            <div className="location-card">
              <MapPin size={18} className="location-icon" />
              <div>
                <p className="location-label">Exact Location</p>
                <p className="location-coords">
                  {typeof can.location?.lat === 'number' ? can.location.lat.toFixed(4) : 'N/A'}° N, {typeof can.location?.lng === 'number' ? can.location.lng.toFixed(4) : 'N/A'}° E
                </p>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="modal-footer">
            <button className="btn-secondary" onClick={onClose}>
              Close
            </button>
            <button className="btn-primary">
              Schedule Collection
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TrashCanModal;
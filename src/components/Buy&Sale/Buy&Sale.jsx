import React, { useState } from "react";

const sampleWastes = [
  { id: 1, name: "Plastic Bottles", type: "Plastic", price: "$120/ton", quantity: "5 tons", country: "Salé", image: "/images/paper.jpg" },
  { id: 2, name: "Scrap Metal", type: "Metal", price: "$450/ton", quantity: "10 tons", country: "Casablanca", image: "/images/metal.webp" },
  { id: 3, name: "Used Paper", type: "Paper", price: "$80/ton", quantity: "7 tons", country: "Hed Soualem", image: "/images/paper.jpg" },
  { id: 4, name: "Glass Waste", type: "Glass", price: "$50/ton", quantity: "3 tons", country: "Marckech", image: "/images/glass.jpg" },
  { id: 5, name: "E-Waste", type: "Electronics", price: "$300/ton", quantity: "2 tons", country: "Casablanca", image: "/images/plasricBottoles.webp" },
];

function BuySale() {
  const [filters, setFilters] = useState({ type: "All" });
    const [selectedWaste, setSelectedWaste] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    const handleBuyClick = (waste) => {
    setSelectedWaste(waste);
    setShowPopup(true);
    };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedWaste(null);
    };

    const handleConfirmPurchase = () => {
    alert(`Vous avez acheté ${selectedWaste.name}!`);
    handleClosePopup();
    };
  const filteredWastes =
    filters.type === "All"
      ? sampleWastes
      : sampleWastes.filter((w) => w.type === filters.type);

  const filterOptions = [
    "All",
    "Plastic",
    "Metal",
    "Paper",
    "Glass",
    "Electronics"
  ];

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>Waste Marketplace</h1>
        <p style={styles.subtitle}>Buy and Sell Premium Recycled Materials</p>
      </div>

      <div style={styles.addWasteContainer}>
        <button style={styles.addWasteButton}>Add Your Waste</button>
      </div>

      

      {/* Filter section */}
      <div style={styles.filterSection}>
        <div style={styles.filterHeader}>
          <h3 style={styles.filterTitle}>Filter by Type</h3>
          <span style={styles.filterCount}>{filteredWastes.length} Results</span>
        </div>
        <div style={styles.filterButtons}>
          {filterOptions.map((option) => (
            <button
              key={option}
              onClick={() => setFilters({ type: option })}
              style={{
                ...styles.filterButton,
                ...(filters.type === option ? styles.filterButtonActive : styles.filterButtonInactive)
              }}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Cards section */}
      <div style={styles.cardsSection}>
        {filteredWastes.map((waste) => (
          <div key={waste.id} style={styles.card}>
            <div style={styles.imageContainer}>
              <img src={waste.image} alt={waste.name} style={styles.image} />
              <div style={styles.typeBadge}>{waste.type}</div>
            </div>
            <div style={styles.cardContent}>
              <h4 style={styles.cardTitle}>{waste.name}</h4>
              <div style={styles.info}>
                <p style={styles.infoItem}><span style={styles.label}>Price:</span> <span style={styles.value}>{waste.price}</span></p>
                <p style={styles.infoItem}><span style={styles.label}>Quantity:</span> <span style={styles.value}>{waste.quantity}</span></p>
                <p style={styles.infoItem}><span style={styles.label}>Location:</span> <span style={styles.value}>{waste.country}</span></p>
              </div>
                <button style={styles.button} onClick={() => handleBuyClick(waste)}>Buy Now</button>
            </div>
          </div>
        ))}



        {showPopup && (
        <div style={styles.popupOverlay} onClick={() => setShowPopup(false)}>
          <div style={styles.popupContent} onClick={(e) => e.stopPropagation()}>
            <button style={styles.closeButton} onClick={() => setShowPopup(false)}>✕</button>
            <div style={styles.popupHeader}>
              <div style={styles.popupIconBox}>
                <img src={selectedWaste?.image} alt={selectedWaste?.name} style={styles.popupHeaderImage} />
              </div>
              <h2 style={styles.popupTitle}>Confirm Purchase</h2>
              <p style={styles.popupSubtitle}>Review your order details</p>
            </div>
            
            <div style={styles.popupBody}>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Product</span>
                <span style={styles.infoValue}>{selectedWaste?.name}</span>
              </div>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Category</span>
                <span style={styles.infoValueBadge}>{selectedWaste?.type}</span>
              </div>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Price</span>
                <span style={styles.priceValue}>{selectedWaste?.price}</span>
              </div>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Quantity</span>
                <span style={styles.infoValue}>{selectedWaste?.quantity}</span>
              </div>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Location</span>
                <span style={styles.infoValue}>{selectedWaste?.country}</span>
              </div>
            </div>

            <div style={styles.popupFooter}>
              <button style={styles.cancelButton} onClick={() => setShowPopup(false)}>Cancel</button>
              <button style={styles.confirmButton} onClick={() => {
                alert(`Purchase confirmed for ${selectedWaste?.name}!`);
                setShowPopup(false);
              }}>Confirm Purchase</button>
            </div>
          </div>
        </div>
      )}
        
      </div>
    </div>
  );
}

const styles = {
    addWasteContainer: {
  display: "flex",
  justifyContent: "flex-end",
  marginBottom: "30px",
  maxWidth: "1200px",
  margin: "0 auto 30px",
},
addWasteButton: {
  padding: "12px 28px",
  backgroundColor: "#3b82f6",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  fontSize: "14px",
  fontWeight: "700",
  cursor: "pointer",
  transition: "all 0.3s ease",
  boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
},
    popupOverlay: {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.4)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
  backdropFilter: "blur(4px)",
},
popupContent: {
  backgroundColor: "#fff",
  borderRadius: "16px",
  padding: "0",
  maxWidth: "500px",
  width: "90%",
  boxShadow: "0 20px 60px rgba(59, 130, 246, 0.15)",
  position: "relative",
  overflow: "hidden",
},
closeButton: {
  position: "absolute",
  top: "20px",
  right: "20px",
  backgroundColor: "#f1f5f9",
  border: "none",
  borderRadius: "50%",
  width: "36px",
  height: "36px",
  fontSize: "20px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 10,
  transition: "all 0.3s ease",
  color: "#64748b",
},
popupHeader: {
  background: "linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)",
  padding: "40px 30px 30px",
  textAlign: "center",
  position: "relative",
},
popupIconBox: {
  width: "80px",
  height: "80px",
  borderRadius: "12px",
  margin: "0 auto 20px",
  overflow: "hidden",
  border: "3px solid #fff",
  boxShadow: "0 8px 20px rgba(59, 130, 246, 0.3)",
},
popupHeaderImage: {
  width: "100%",
  height: "100%",
  objectFit: "cover",
},
popupTitle: {
  margin: "0 0 8px 0",
  color: "#fff",
  fontSize: "24px",
  fontWeight: "700",
},
popupSubtitle: {
  margin: "0",
  color: "rgba(255, 255, 255, 0.9)",
  fontSize: "14px",
},
popupBody: {
  padding: "30px",
},
infoRow: {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  paddingBottom: "16px",
  borderBottom: "1px solid #e2e8f0",
  marginBottom: "16px",
},
infoLabel: {
  color: "#64748b",
  fontSize: "14px",
  fontWeight: "600",
},
infoValue: {
  color: "#000",
  fontSize: "14px",
  fontWeight: "700",
},
infoValueBadge: {
  backgroundColor: "#e0f2fe",
  color: "#0369a1",
  padding: "6px 12px",
  borderRadius: "20px",
  fontSize: "13px",
  fontWeight: "600",
},
priceValue: {
  color: "#3b82f6",
  fontSize: "16px",
  fontWeight: "700",
},
popupFooter: {
  display: "flex",
  gap: "12px",
  padding: "20px 30px 30px",
},
cancelButton: {
  flex: 1,
  padding: "12px 20px",
  backgroundColor: "#f1f5f9",
  color: "#334155",
  border: "2px solid #e2e8f0",
  borderRadius: "8px",
  fontWeight: "700",
  fontSize: "14px",
  cursor: "pointer",
  transition: "all 0.3s ease",
},
confirmButton: {
  flex: 1,
  padding: "12px 20px",
  backgroundColor: "#3b82f6",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  fontWeight: "700",
  fontSize: "14px",
  cursor: "pointer",
  transition: "all 0.3s ease",
  boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
},
  container: {
    minHeight: "100vh",
    backgroundColor: "#f8fafc",
    padding: "40px 20px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  header: {
    textAlign: "center",
    marginBottom: "50px",
    color: "#000",
  },
  title: {
    fontSize: "48px",
    fontWeight: "700",
    margin: "0 0 10px 0",
    color: "linear-gradient(135deg, #3b82f6 0%, #000 100%)",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
  },
  subtitle: {
    fontSize: "18px",
    color: "#64748b",
    margin: "0",
  },
  filterSection: {
    maxWidth: "1200px",
    margin: "0 auto 50px",
    padding: "30px",
    backgroundColor: "#fff",
    borderRadius: "16px",
    border: "1px solid #e2e8f0",
    boxShadow: "0 2px 8px rgba(59, 130, 246, 0.08)",
  },
  filterHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  filterTitle: {
    margin: "0",
    color: "#000",
    fontSize: "18px",
    fontWeight: "700",
  },
  filterCount: {
    backgroundColor: "#3b82f6",
    color: "#fff",
    padding: "6px 14px",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: "600",
  },
  filterButtons: {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
  },
  filterButton: {
    padding: "10px 18px",
    borderRadius: "8px",
    border: "2px solid",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    outline: "none",
  },
  filterButtonActive: {
    backgroundColor: "#3b82f6",
    color: "#fff",
    borderColor: "#3b82f6",
    boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
  },
  filterButtonInactive: {
    backgroundColor: "#f1f5f9",
    color: "#334155",
    borderColor: "#e2e8f0",
  },
  cardsSection: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "30px",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    overflow: "hidden",
    border: "1px solid #e2e8f0",
    transition: "all 0.3s ease",
    cursor: "pointer",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
  },
  imageContainer: {
    position: "relative",
    height: "200px",
    overflow: "hidden",
    backgroundColor: "#f1f5f9",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.3s ease",
  },
  typeBadge: {
    position: "absolute",
    top: "12px",
    right: "12px",
    backgroundColor: "#3b82f6",
    color: "#fff",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600",
  },
  cardContent: {
    padding: "20px",
  },
  cardTitle: {
    margin: "0 0 15px 0",
    fontSize: "18px",
    fontWeight: "700",
    color: "#000",
  },
  info: {
    marginBottom: "15px",
  },
  infoItem: {
    margin: "8px 0",
    fontSize: "14px",
    color: "#475569",
  },
  label: {
    fontWeight: "600",
    color: "#3b82f6",
  },
  value: {
    color: "#000",
    fontWeight: "500",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#3b82f6",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.3s ease",
    marginTop: "10px",
  },
};

export default BuySale;
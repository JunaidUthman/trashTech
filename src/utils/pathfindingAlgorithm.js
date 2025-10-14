// src/utils/pathfindingAlgorithm.js

// Haversine distance in km
export function calculateDistance(lat1, lng1, lat2, lng2) {
  const R = 6371; // km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Nearest neighbor heuristic for path
export function findOptimalPath(collector, bins, fullnessThreshold = 75) {
  const priorityBins = bins.filter(b => b.fullness >= fullnessThreshold);
  if (priorityBins.length === 0) {
    return {
      path: [collector],
      totalDistance: 0,
      numberOfStops: 0,
    };
  }

  const path = [collector];
  const visited = new Set();
  let current = collector;
  let totalDistance = 0;

  while (visited.size < priorityBins.length) {
    let nearest = null;
    let shortest = Infinity;

    for (const bin of priorityBins) {
      if (!visited.has(bin.id)) {
        const dist = calculateDistance(
          current.lat,
          current.lng,
          bin.location.lat,
          bin.location.lng
        );
        if (dist < shortest) {
          shortest = dist;
          nearest = bin;
        }
      }
    }

    if (nearest) {
      visited.add(nearest.id);
      path.push(nearest.location);
      totalDistance += shortest;
      current = nearest.location;
    }
  }

  return {
    path,
    totalDistance: totalDistance.toFixed(2),
    numberOfStops: priorityBins.length,
  };
}

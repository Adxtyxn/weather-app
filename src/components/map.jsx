import GoogleMapReact from "google-map-react";

const Marker = () => (
  <div style={{ fontSize: "24px" }}>📍</div>
);

const Map = ({
  center = { lat: 20.5937, lng: 78.9629 },
  zoom = 5,
  onLocationSelect,
  selectedLocation
}) => {
  return (
    <div className="map-container">
      <GoogleMapReact
        bootstrapURLKeys={{
          key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
        }}
        defaultCenter={center}
        defaultZoom={zoom}
        onClick={({ lat, lng, x, y }) => onLocationSelect(lat, lng, x, y)}
      >
        {selectedLocation && (
          <Marker
            lat={selectedLocation.lat}
            lng={selectedLocation.lng}
          />
        )}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
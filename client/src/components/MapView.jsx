import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function MapView({ posts }) {
  return (
    <MapContainer
      center={[28.6139, 77.2090]}
      zoom={5}
      className="rounded-2xl shadow-lg"
      style={{ height: "50vh", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {posts.map((post, i) => {
        const lat = Number(post.latitude);
        const lng = Number(post.longitude);

        if (!lat || !lng || isNaN(lat) || isNaN(lng)) {
          console.warn(
            `Invalid coordinates for post: ${post.title}`,
            post.latitude,
            post.longitude
          );
          return null;
        }

        return (
          <Marker key={i} position={[lat, lng]}>
            <Popup>
              {post.user && (
                <div className="flex items-center gap-2 mt-3 mr-10 mb-5">
                  {post.user.profilePicture && (
                    <img
                      src={post.user.profilePicture}
                      className="h-7 rounded-full"
                      alt={post.user.username}
                    />
                  )}
                  <h3 className="text-slate-900 font-medium">
                    {post.user.username}
                  </h3>
                </div>
              )}

              
              <h3 className="font-semibold">{post.title}</h3>
              {post.description && <p>{post.description}</p>}
              {post.imageUrl && (
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  width="100"
                  style={{ borderRadius: "6px", marginTop: "6px" }}
                />
              )}
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}

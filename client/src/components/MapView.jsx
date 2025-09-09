import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.fullscreen/Control.FullScreen.css";
import "leaflet.fullscreen/Control.FullScreen.js";

function FullscreenControl() {
  const map = useMap();

  useEffect(() => {
    const control = L.control.fullscreen({
      position: "topright",
      title: "Show Fullscreen",
      titleCancel: "Exit Fullscreen",
    });
    control.addTo(map);

    return () => {
      map.removeControl(control);
    };
  }, [map]);

  return null;
}

export default function MapView({ posts }) {
  const customIcon = L.icon({
    iconUrl:
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEghQQ40jhTVcKfUFthmdOAtFiAaYVqEJG9M_4HKbi61cYlMhnhPn4JKHO-L-0DUGELJStUbd6TdMjivzbz6fEx3QoRfBN3HSDzoSJjA_Vl15Slhyphenhyphencx_0dQz0d7tPizjmlyukXvA9yJ6fVBKSkMazeCug29YUFbbJcSyGxfMYXzOVZtgRPif5cPpZKbt-oA/s512/placeholder.png",
    iconSize: [30, 30],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });

  return (
    <MapContainer
      center={[28.6139, 77.209]}
      zoom={5}
      className="rounded-2xl shadow-lg"
      style={{ height: "20vh", width: "50%" }}
      // style={{ height: "35vh", width: "100%" }}
    >
      
      <FullscreenControl />

      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {posts.map((post, i) => {
        const lat = Number(post.latitude);
        const lng = Number(post.longitude);

        if (!lat || !lng || isNaN(lat) || isNaN(lng)) return null;

        return (
          <Marker key={i} position={[lat, lng]} icon={customIcon}>
            <Popup>
              {post.user && (
                <div className="flex items-center gap-2 mt-3 mb-5">
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

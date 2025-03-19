import { useEffect, useState } from "react";
import { fetchData, getAssetUrl } from "../utils/api";

function Latest() {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const data = await fetchData("/announcement");
        setAnnouncements(data);
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    };

    fetchAnnouncements();
  }, []);

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-2xl font-bold mb-6">Announcements</h1>

      {announcements.length === 0 ? (
        <p>No announcements available.</p>
      ) : (
        <div className="grid gap-6">
          {announcements.map((announcement) => (
            <div
              key={announcement._id}
              className="border p-4 rounded-lg shadow-lg bg-white"
            >
              <h2 className="text-xl font-semibold">{announcement.title}</h2>
              <p className="text-gray-700">{announcement.content}</p>

              {announcement.imageUrl && (
                <img
                  src={getAssetUrl(announcement.imageUrl)}
                  alt="Announcement"
                  className="rounded-lg shadow-sm mt-3"
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    objectFit: "contain"
                  }}
                />
              )}

              <p className="text-sm text-gray-500 mt-2">
                Posted on: {new Date(announcement.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Latest;
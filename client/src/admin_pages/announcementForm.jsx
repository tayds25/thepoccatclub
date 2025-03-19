import { useEffect, useState } from "react";
import { fetchData, uploadFile, deleteData, getAssetUrl } from "../utils/api";

const AnnouncementForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [announcements, setAnnouncements] = useState([]);

  // Fetch Announcements
  const fetchAnnouncements = async () => {
    try {
      const data = await fetchData("/announcement");
      setAnnouncements(data);
    } catch (error) {
      console.error("Error fetching announcements:", error);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  // Add Announcement
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (image) {
      formData.append("image", image);
    }

    try {
      await uploadFile("/announcement", formData);
      setMessage("✅ Announcement added successfully!");
      fetchAnnouncements();
      setTitle("");
      setContent("");
      setImage(null);
    } catch (error) {
      setMessage("❌ Error adding announcement");
      console.error("Error:", error);
    }
  };

  // Delete Announcement
  const handleDelete = async (id) => {
    try {
      await deleteData(`/announcement/${id}`);
      setMessage("🗑️ Announcement deleted successfully!");
      fetchAnnouncements();
    } catch (error) {
      setMessage("❌ Error deleting announcement");
      console.error("Error deleting:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Admin - Manage Announcements</h1>

      {/* Add Announcement Form */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Add Announcement</h2>
        {message && <p className="text-sm text-gray-600">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            required
            className="border p-2 w-full"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Announcement Content"
            required
            className="border p-2 w-full"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])} // Set selected file
            className="border p-2 w-full"
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Add Announcement
          </button>
        </form>
      </div>

      {/* List of Announcements */}
      <div className="mt-6">
        {announcements.map((announcement) => (
          <div key={announcement._id} className="border p-4 rounded mb-2 bg-white shadow-md">
            <h3 className="font-bold">{announcement.title}</h3>
            <p>{announcement.content}</p>
            {announcement.imageUrl && (
              <img
                src={getAssetUrl(announcement.imageUrl)}
                alt="Announcement"
                className="w-auto max-w-full h-auto mt-2"
                style={{ maxHeight: "300px" }}
              />
            )}
            <button
              onClick={() => handleDelete(announcement._id)}
              className="bg-red-500 text-white px-3 py-1 rounded mt-2"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementForm;
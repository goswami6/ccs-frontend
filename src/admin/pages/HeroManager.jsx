import { useEffect, useState } from "react";
import {
  fetchHeroSlides,
  createHeroSlide,
  deleteHeroSlide,
} from "../../utils/api";
import { Trash2, LayoutGrid, ImagePlus } from "lucide-react";
import ImageUploader from "../components/ImageUploader";

export default function HeroManager() {
  /* ================= SECTION STATE ================= */
  const [section, setSection] = useState("hero"); // hero | brand_logo

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  /* ================= LOAD DATA ================= */
  const loadData = async () => {
    try {
      const res = await fetchHeroSlides(section);

      const arr = Array.isArray(res)
        ? res
        : res?.data || [];

      setItems(arr);
    } catch (err) {
      console.error("Failed to load data", err);
      setItems([]);
    }
  };

  useEffect(() => {
    loadData();
  }, [section]); // 🔥 reload when section changes

  /* ================= UPLOAD ================= */
  const handleUpload = async (formData) => {
    try {
      setLoading(true);

      // 🔥 backend needs section
      formData.append("section", section);

      await createHeroSlide(formData);
      await loadData();
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  /* ================= DELETE ================= */
  const removeItem = async (id) => {
    if (!window.confirm("Delete this item?")) return;

    try {
      await deleteHeroSlide(id);
      await loadData();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">

        {/* ================= HEADER ================= */}
        <div className="flex items-center justify-between mb-8">

          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-xl text-primary">
              <LayoutGrid size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-black">
                Home Media Manager
              </h1>
              <p className="text-sm text-gray-500">
                Manage hero banners & brand logo
              </p>
            </div>
          </div>

          {/* 🔥 SECTION SWITCHER */}
          <div className="flex gap-2 bg-white p-1 rounded-xl shadow border">
            <button
              onClick={() => setSection("hero")}
              className={`px-4 py-2 text-sm font-bold rounded-lg transition ${
                section === "hero"
                  ? "bg-primary text-white"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              Hero Banner
            </button>
            <button
              onClick={() => setSection("brand_logo")}
              className={`px-4 py-2 text-sm font-bold rounded-lg transition ${
                section === "brand_logo"
                  ? "bg-primary text-white"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              Brand Logo
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ================= UPLOAD ================= */}
          <div className="bg-white p-6 rounded-2xl shadow border">
            <h3 className="font-bold mb-4 flex items-center">
              <ImagePlus className="mr-2 text-primary" size={18} />
              {section === "hero"
                ? "Add Hero Banner"
                : "Update Brand Logo"}
            </h3>

            <ImageUploader
              folder={section}
              label={
                section === "hero"
                  ? "Hero Image"
                  : "Brand Logo"
              }
              onUpload={handleUpload}
            />

            {loading && (
              <p className="text-xs text-gray-400 mt-2">
                Uploading...
              </p>
            )}
          </div>

          {/* ================= LIST ================= */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow border">
            <h3 className="font-bold mb-4">
              {section === "hero"
                ? `Active Banners (${items.length})`
                : `Current Logo (${items.length})`}
            </h3>

            {items.length === 0 ? (
              <p className="text-gray-400 text-center py-20">
                No data available
              </p>
            ) : (
              <div
                className={`grid gap-4 ${
                  section === "hero"
                    ? "md:grid-cols-2"
                    : "grid-cols-1"
                }`}
              >
                {items.map((item) => (
                  <div
                    key={item._id}
                    className="relative group rounded overflow-hidden border"
                  >
                    <img
                      src={
                        item.image?.startsWith("http")
                          ? item.image
                          : `${import.meta.env.VITE_API_URL.replace(
                              "/api",
                              ""
                            )}${item.image}`
                      }
                      alt="media"
                      className={`w-full ${
                        section === "hero"
                          ? "h-48 object-cover"
                          : "h-40 object-contain bg-gray-50 p-4"
                      }`}
                    />

                    <button
                      onClick={() => removeItem(item._id)}
                      className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

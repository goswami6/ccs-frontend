import { useEffect, useState } from "react";
import {
  fetchFeatures,
  createFeature,
  updateFeature,
  deleteFeature,
} from "../../utils/api";

import {
  GraduationCap,
  Users,
  ShieldCheck,
  Monitor,
  Bus,
  Trophy,
  Trash2,
  Pencil,
  Plus,
} from "lucide-react";

/* ICON MAP */
const iconMap = {
  "academic-cap": GraduationCap,
  users: Users,
  "shield-check": ShieldCheck,
  monitor: Monitor,
  bus: Bus,
  trophy: Trophy,
};

const iconOptions = Object.keys(iconMap);

export default function FeatureManager() {
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(false);

  /* FORM STATE */
  const [form, setForm] = useState({
    title: "",
    description: "",
    icon: "academic-cap",
    order: 0,
  });

  const [editingId, setEditingId] = useState(null);

  /* LOAD FEATURES */
  const loadFeatures = async () => {
    try {
      const data = await fetchFeatures();
      setFeatures(data || []);
    } catch (err) {
      console.error("Failed to load features", err);
    }
  };

  useEffect(() => {
    loadFeatures();
  }, []);

  /* SUBMIT */
  const submit = async () => {
    if (!form.title || !form.description) {
      alert("Title & description required");
      return;
    }

    try {
      setLoading(true);

      if (editingId) {
        await updateFeature(editingId, form);
      } else {
        await createFeature(form);
      }

      resetForm();
      loadFeatures();
    } catch (err) {
      console.error(err);
      alert("Action failed");
    } finally {
      setLoading(false);
    }
  };

  /* EDIT */
  const editFeature = (f) => {
    setEditingId(f._id);
    setForm({
      title: f.title,
      description: f.description,
      icon: f.icon,
      order: f.order || 0,
    });
  };

  /* DELETE */
  const remove = async (id) => {
    if (!window.confirm("Delete this feature?")) return;
    await deleteFeature(id);
    loadFeatures();
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({
      title: "",
      description: "",
      icon: "academic-cap",
      order: 0,
    });
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-black text-gray-800">
              Why Choose Us – Features
            </h1>
            <p className="text-sm text-gray-500">
              Manage homepage feature highlights
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* FORM */}
          <div className="bg-white p-6 rounded-xl shadow border">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Plus size={18} />
              {editingId ? "Edit Feature" : "Add Feature"}
            </h3>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Title"
                value={form.title}
                onChange={(e) =>
                  setForm({ ...form, title: e.target.value })
                }
                className="w-full border px-4 py-2 rounded"
              />

              <textarea
                placeholder="Description"
                rows={3}
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="w-full border px-4 py-2 rounded"
              />

              {/* ICON SELECT */}
              <select
                value={form.icon}
                onChange={(e) =>
                  setForm({ ...form, icon: e.target.value })
                }
                className="w-full border px-4 py-2 rounded"
              >
                {iconOptions.map((key) => (
                  <option key={key} value={key}>
                    {key}
                  </option>
                ))}
              </select>

              {/* ORDER */}
              <input
                type="number"
                placeholder="Order (0 = top)"
                value={form.order}
                onChange={(e) =>
                  setForm({ ...form, order: Number(e.target.value) })
                }
                className="w-full border px-4 py-2 rounded"
              />

              <button
                onClick={submit}
                disabled={loading}
                className="w-full bg-primary text-white py-2 rounded font-bold"
              >
                {loading
                  ? "Saving..."
                  : editingId
                  ? "Update Feature"
                  : "Add Feature"}
              </button>

              {editingId && (
                <button
                  onClick={resetForm}
                  className="w-full text-sm text-gray-500"
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </div>

          {/* LIST */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow border">
            <h3 className="font-bold mb-4">
              Active Features ({features.length})
            </h3>

            {features.length === 0 ? (
              <p className="text-gray-400 text-center py-20">
                No features added yet
              </p>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {features.map((f) => {
                  const Icon = iconMap[f.icon];
                  return (
                    <div
                      key={f._id}
                      className="border rounded-xl p-4 flex gap-4 items-start"
                    >
                      <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-primary">
                        {Icon && <Icon size={24} />}
                      </div>

                      <div className="flex-1">
                        <h4 className="font-bold">{f.title}</h4>
                        <p className="text-sm text-gray-600">
                          {f.description}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          Order: {f.order || 0}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => editFeature(f)}
                          className="text-blue-600"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => remove(f._id)}
                          className="text-red-600"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

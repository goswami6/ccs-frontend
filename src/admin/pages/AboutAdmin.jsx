import { useEffect, useState } from "react";
import { fetchAboutPage, saveAboutPage } from "../../utils/api";
import { uploadImage } from "../../utils/api";
import ImageUploader from "../components/ImageUploader";
import { motion, AnimatePresence } from "framer-motion";
import { Save, Plus, CheckCircle2, AlertCircle, Info, History, Eye, Target, Users, Award } from "lucide-react";

export default function AboutAdmin() {
  const [data, setData] = useState(null);
  const [activeMessage, setActiveMessage] = useState(null); // Success notification
  const [savingSection, setSavingSection] = useState("");

  /* ================= LOAD DATA ================= */
  useEffect(() => {
    fetchAboutPage().then((res) => {
      setData({
        hero: {
          title: res?.hero?.title || "",
          backgroundImage: res?.hero?.backgroundImage || "",
        },
        history: {
          image: res?.history?.image || "",
          description: res?.history?.description || [],
          stats: {
            years: res?.history?.stats?.years || "",
            students: res?.history?.stats?.students || "",
          },
        },
        vision: { text: res?.vision?.text || "" },
        mission: res?.mission || [],
        principal: {
          name: res?.principal?.name || "",
          designation: res?.principal?.designation || "",
          photo: res?.principal?.photo || "",
          message: res?.principal?.message || [],
        },
        coreValues: res?.coreValues || [],
      });
    });
  }, []);

  if (!data) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
    </div>
  );

  /* ================= SECTION SAVE LOGIC ================= */
  const saveSection = async (sectionKey) => {
    try {
      setSavingSection(sectionKey);
      // Backend ko poora data bhej rhe hain ya specific section (as per your API)
      await saveAboutPage({ [sectionKey]: data[sectionKey] });

      setActiveMessage(`${sectionKey.toUpperCase()} Saved Successfully!`);
      setTimeout(() => setActiveMessage(null), 3000);
    } catch (err) {
      alert("Save failed ❌");
    } finally {
      setSavingSection("");
    }
  };

  return (
    <div className="p-4 md:p-10 bg-[#F8FAFC] min-h-screen font-sans">

      {/* SUCCESS TOAST */}
      <AnimatePresence>
        {activeMessage && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            className="fixed top-5 right-5 z-50 flex items-center gap-3 bg-emerald-600 text-white px-6 py-3 rounded-2xl shadow-2xl"
          >
            <CheckCircle2 size={20} />
            <span className="font-bold text-sm">{activeMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-5xl mx-auto space-y-8">

        <div className="border-b border-slate-200 pb-8">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">About Page <span className="text-blue-600">Editor</span></h1>
          <p className="text-slate-500 font-medium">Manage school information, principal's desk and core values.</p>
        </div>

        {/* ================= HERO ================= */}
        <Section title="Hero Section" icon={<Info className="text-blue-500" />}>
          <Input
            label="Title"
            value={data.hero.title}
            onChange={(v) => setData({ ...data, hero: { ...data.hero, title: v } })}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">

            <ImageUploader
              folder="about_hero"
              label="Hero Background Image"
              onUpload={async (formData) => {
                try {
                  // ✅ upload via api.js
                  const res = await uploadImage(formData);

                  console.log("Uploaded Image:", res.data.image);

                  // ✅ SAFE state update
                  setData(prev => ({
                    ...prev,
                    hero: {
                      ...prev.hero,
                      backgroundImage: res.data.image,
                    },
                  }));
                } catch (error) {
                  console.error(error);
                  alert("Hero image upload failed");
                }
              }}
            />

            {/* ✅ IMAGE PREVIEW */}
            {data?.hero?.backgroundImage && (
              <img
                src={
                  data.hero.backgroundImage.startsWith("http")
                    ? data.hero.backgroundImage
                    : `${import.meta.env.VITE_API_URL.replace(
                      "/api",
                      ""
                    )}${data.hero.backgroundImage}`
                }
                className="h-40 w-full object-cover rounded border"
                alt="Hero Background"
              />
            )}

          </div>

          <SaveButton onClick={() => saveSection("hero")} loading={savingSection === "hero"} />
        </Section>

        {/* ================= HISTORY ================= */}
        <Section title="School History" icon={<History className="text-orange-500" />}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* IMAGE UPLOADER */}
            <ImageUploader
              folder="about_history"
              label="About History Image"
              onUpload={async (formData) => {
                try {
                  // ✅ api.js se upload
                  const res = await uploadImage(formData);

                  // ✅ SAFE state update
                  setData((prev) => ({
                    ...prev,
                    history: {
                      ...prev.history,
                      image: res.data.image, // backend image path
                    },
                  }));
                } catch (err) {
                  console.error(err);
                  alert("History image upload failed");
                }
              }}
            />

            {/* IMAGE PREVIEW */}
            {data?.history?.image && (
              <img
                src={
                  data.history.image.startsWith("http")
                    ? data.history.image
                    : `${import.meta.env.VITE_API_URL.replace(
                      "/api",
                      ""
                    )}${data.history.image}`
                }
                alt="History Preview"
                className="h-40 w-full object-cover rounded border"
              />
            )}

          </div>
          <Textarea
            label="Description (One paragraph per line)"
            value={data.history.description.join("\n")}
            onChange={(v) => setData({ ...data, history: { ...data.history, description: v.split("\n") } })}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Experience Years"
              value={data.history.stats.years}
              onChange={(v) => setData({ ...data, history: { ...data.history, stats: { ...data.history.stats, years: v } } })}
            />
            <Input
              label="Total Students"
              value={data.history.stats.students}
              onChange={(v) => setData({ ...data, history: { ...data.history, stats: { ...data.history.stats, students: v } } })}
            />
          </div>
          <SaveButton onClick={() => saveSection("history")} loading={savingSection === "history"} />
        </Section>

        {/* ================= VISION & MISSION ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Section title="Vision" icon={<Eye className="text-purple-500" />}>
            <Textarea
              label="Vision Statement"
              value={data.vision.text}
              onChange={(v) => setData({ ...data, vision: { text: v } })}
            />
            <SaveButton onClick={() => saveSection("vision")} loading={savingSection === "vision"} />
          </Section>

          <Section title="Mission Items" icon={<Target className="text-red-500" />}>
            <div className="space-y-3">
              {data.mission.map((m, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    placeholder="Mission text"
                    value={m.text}
                    onChange={(e) => {
                      const arr = [...data.mission];
                      arr[i].text = e.target.value;
                      setData({ ...data, mission: arr });
                    }}
                    className="flex-1 bg-slate-50 border p-2 text-sm rounded-lg"
                  />
                  <input
                    placeholder="Icon"
                    value={m.icon}
                    onChange={(e) => {
                      const arr = [...data.mission];
                      arr[i].icon = e.target.value;
                      setData({ ...data, mission: arr });
                    }}
                    className="w-16 bg-slate-50 border p-2 text-sm rounded-lg text-center"
                  />
                </div>
              ))}
            </div>
            <AddButton onClick={() => setData({ ...data, mission: [...data.mission, { text: "", icon: "" }] })} />
            <SaveButton onClick={() => saveSection("mission")} loading={savingSection === "mission"} />
          </Section>
        </div>

        {/* ================= PRINCIPAL ================= */}
        <Section title="Principal's Desk" icon={<Users className="text-emerald-500" />}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Input
                label="Principal Name"
                value={data.principal.name}
                onChange={(v) => setData({ ...data, principal: { ...data.principal, name: v } })}
              />
              <Input
                label="Designation"
                value={data.principal.designation}
                onChange={(v) => setData({ ...data, principal: { ...data.principal, designation: v } })}
              />
            </div>
            <ImageUploader
              folder="about_principal"
              label="Principal Photo"
              onUpload={async (formData) => {
                try {
                  // ✅ api.js se upload
                  const res = await uploadImage(formData);

                  // ✅ SAFE state update
                  setData((prev) => ({
                    ...prev,
                    principal: {
                      ...prev.principal,
                      photo: res.data.image, // 🔥 backend image path
                    },
                  }));
                } catch (err) {
                  console.error(err);
                  alert("Principal image upload failed");
                }
              }}
            />

            {/* IMAGE PREVIEW */}
            {data?.principal?.photo && (
              <img
                src={
                  data.principal.photo.startsWith("http")
                    ? data.principal.photo
                    : `${import.meta.env.VITE_API_URL.replace(
                      "/api",
                      ""
                    )}${data.principal.photo}`
                }
                alt="Principal Preview"
                className="mt-4 h-40 w-40 object-cover rounded-xl border"
              />
            )}

          </div>
          <Textarea
            label="Principal Message"
            value={data.principal.message.join("\n")}
            onChange={(v) => setData({ ...data, principal: { ...data.principal, message: v.split("\n") } })}
          />
          <SaveButton onClick={() => saveSection("principal")} loading={savingSection === "principal"} />
        </Section>

        {/* ================= CORE VALUES ================= */}
        <Section title="Core Values" icon={<Award className="text-yellow-500" />}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.coreValues.map((v, i) => (
              <div key={i} className="p-4 bg-slate-50 rounded-2xl border space-y-2">
                <Input
                  label="Title"
                  value={v.title}
                  onChange={(x) => {
                    const arr = [...data.coreValues];
                    arr[i].title = x;
                    setData({ ...data, coreValues: arr });
                  }}
                />
                <Textarea
                  label="Description"
                  value={v.description}
                  onChange={(x) => {
                    const arr = [...data.coreValues];
                    arr[i].description = x;
                    setData({ ...data, coreValues: arr });
                  }}
                />
              </div>
            ))}
          </div>
          <AddButton onClick={() => setData({ ...data, coreValues: [...data.coreValues, { title: "", description: "", icon: "", color: "" }] })} />
          <SaveButton onClick={() => saveSection("coreValues")} loading={savingSection === "coreValues"} />
        </Section>

      </div>
    </div>
  );
}

/* ================= UI HELPERS ================= */

const Section = ({ title, icon, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white p-6 md:p-8 rounded-[2.5rem] shadow-sm border border-slate-200 space-y-6"
  >
    <div className="flex items-center gap-3 border-b border-slate-50 pb-4">
      <div className="p-2 bg-slate-50 rounded-xl">{icon}</div>
      <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">{title}</h2>
    </div>
    {children}
  </motion.div>
);

const Input = ({ label, value, onChange }) => (
  <div className="flex flex-col gap-1">
    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">{label}</label>
    <input
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl text-sm font-bold focus:ring-2 focus:ring-blue-500 transition-all outline-none"
    />
  </div>
);

const Textarea = ({ label, value, onChange }) => (
  <div className="flex flex-col gap-1">
    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">{label}</label>
    <textarea
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      rows={4}
      className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl text-sm font-bold focus:ring-2 focus:ring-blue-500 transition-all outline-none leading-relaxed"
    />
  </div>
);

const AddButton = ({ onClick }) => (
  <button onClick={onClick} className="flex items-center gap-2 text-xs font-black uppercase text-blue-600 hover:text-blue-800 transition-colors py-2">
    <Plus size={14} /> Add New Entry
  </button>
);

const SaveButton = ({ onClick, loading }) => (
  <button
    onClick={onClick}
    disabled={loading}
    className="flex items-center gap-2 bg-slate-900 hover:bg-emerald-600 disabled:bg-slate-300 text-white px-8 py-3 rounded-xl font-bold text-xs transition-all shadow-lg"
  >
    {loading ? <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <Save size={16} />}
    {loading ? "SAVING..." : "SAVE SECTION"}
  </button>
);
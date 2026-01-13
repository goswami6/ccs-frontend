import { useEffect, useState } from "react";
import {
  fetchActivitiesPage,
  saveActivitiesPage,
  uploadImage,
} from "../../utils/api";
import ImageUploader from "../components/ImageUploader";
import { motion, AnimatePresence } from "framer-motion";
import { Save, Plus, Trash2, CheckCircle, Info, Star, Users, Calendar, MapPin } from "lucide-react";

export default function ActivitiesAdmin() {
  const [data, setData] = useState(null);
  const [savingSection, setSavingSection] = useState("");
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    fetchActivitiesPage().then((res) => {
      setData({
        hero: { title: "", subtitle: "", backgroundImage: "", ...(res?.hero || {}) },
        coCurriculars: res?.coCurriculars || [],
        clubs: res?.clubs || [],
        events: res?.events || [],
        fieldTrip: { title: "", description: "", buttonText: "", ...(res?.fieldTrip || {}) },
      });
    });
  }, []);

  if (!data) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-600"></div>
    </div>
  );

  const saveSection = async (sectionKey) => {
    try {
      setSavingSection(sectionKey);
      await saveActivitiesPage({ [sectionKey]: data[sectionKey] });
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch {
      alert("Save Failed ❌");
    } finally {
      setSavingSection("");
    }
  };

  return (
    <div className="p-6 md:p-10 bg-[#F8FAFC] min-h-screen font-sans">
      {/* Success Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-10 right-10 bg-emerald-600 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-2 z-50">
            <CheckCircle size={20} /> <span className="font-bold">Section Updated Successfully!</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto space-y-12">
        <header className="border-b border-slate-200 pb-8">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Activities <span className="text-blue-600">Manager</span></h1>
          <p className="text-slate-500 font-medium mt-1">Configure co-curriculars, clubs, and school events.</p>
        </header>

        {/* ================= HERO ================= */}
        <Section title="Hero Section" icon={<Info className="text-blue-500" />}>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Input label="Main Title" value={data.hero.title} onChange={(v) => setData({ ...data, hero: { ...data.hero, title: v } })} />
              <Textarea label="Subtitle" value={data.hero.subtitle} onChange={(v) => setData({ ...data, hero: { ...data.hero, subtitle: v } })} />
            </div>
            <div className="space-y-4">
              <ImageUploader
                folder="activities/hero"
                label="Background Image"
                onUpload={async (formData) => {
                  try {
                    // 1️⃣ Upload image
                    const res = await uploadImage(formData);
                    const imageUrl = res.data.image;

                    // 2️⃣ Update local state
                    const updatedData = {
                      ...data,
                      hero: {
                        ...data.hero,
                        backgroundImage: imageUrl,
                      },
                    };

                    setData(updatedData);

                    // 3️⃣ SAVE TO DATABASE 🔥🔥
                    await saveActivitiesPage(updatedData);

                    alert("Hero background image saved ✅");
                  } catch (error) {
                    console.error(error);
                    alert("Image upload failed ❌");
                  }
                }}
              />

              {/* IMAGE PREVIEW */}
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
                  className="h-32 w-full object-cover rounded-xl border"
                  alt="Activities Hero"
                />
              )}
            </div>

          </div>
          <SaveButton onClick={() => saveSection("hero")} loading={savingSection === "hero"} />
        </Section>

        {/* ================= CO-CURRICULAR ================= */}
        <Section title="Co-Curricular Activities" icon={<Star className="text-amber-500" />}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.coCurriculars.map((a, i) => (
              <Card key={i} onRemove={() => setData({
                ...data,
                coCurriculars: data.coCurriculars.filter((_, x) => x !== i)
              })}>
                {/* 1. Name Field */}
                <Input
                  label="Activity Name"
                  value={a.name}
                  onChange={(v) => {
                    const arr = [...data.coCurriculars];
                    arr[i].name = v;
                    setData({ ...data, coCurriculars: arr });
                  }}
                />

                {/* 2. Description Field (Added) */}
                <div className="mt-3">
                  <Textarea
                    label="Description"
                    value={a.description}
                    onChange={(v) => {
                      const arr = [...data.coCurriculars];
                      arr[i].description = v;
                      setData({ ...data, coCurriculars: arr });
                    }}
                  />
                </div>

                {/* 3. Icon & Color Row */}
                <div className="grid grid-cols-2 gap-4 mt-3">
                  <Input
                    label="Lucide Icon Key"
                    value={a.icon}
                    placeholder="e.g. Music, Camera"
                    onChange={(v) => {
                      const arr = [...data.coCurriculars];
                      arr[i].icon = v;
                      setData({ ...data, coCurriculars: arr });
                    }}
                  />
                  <Input
                    label="Color Class"
                    value={a.color}
                    placeholder="e.g. text-blue-500"
                    onChange={(v) => {
                      const arr = [...data.coCurriculars];
                      arr[i].color = v;
                      setData({ ...data, coCurriculars: arr });
                    }}
                  />
                </div>

                {/* 4. Trending Toggle */}
                <div className="mt-4 pt-3 border-t border-slate-200/50">
                  <Checkbox
                    label="Show Trending Badge"
                    checked={a.trending}
                    onChange={(v) => {
                      const arr = [...data.coCurriculars];
                      arr[i].trending = v;
                      setData({ ...data, coCurriculars: arr });
                    }}
                  />
                </div>
              </Card>
            ))}
          </div>

          {/* Footer Actions */}
          <div className="flex justify-between items-center mt-6 p-4 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
            <AddButton onClick={() => setData({
              ...data,
              coCurriculars: [...data.coCurriculars, {
                name: "",
                description: "",
                icon: "Star",
                color: "text-blue-500",
                trending: false
              }]
            })} />

            <SaveButton
              onClick={() => saveSection("coCurriculars")}
              loading={savingSection === "coCurriculars"}
            />
          </div>
        </Section>

        {/* ================= CLUBS ================= */}
      {/* ================= CLUBS ================= */}
<Section title="School Clubs" icon={<Users className="text-indigo-500" />}>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {data.clubs.map((c, i) => (
      <Card key={i} onRemove={() => setData({
        ...data,
        clubs: data.clubs.filter((_, x) => x !== i)
      })}>
        <Input
          label="Club Name"
          value={c.name}
          onChange={(v) => {
            const arr = [...data.clubs]; arr[i].name = v; setData({ ...data, clubs: arr });
          }}
        />

        {/* Dynamic Color Pickers */}
        <div className="grid grid-cols-2 gap-3 mt-2">
          <div>
            <label className="text-[10px] font-black uppercase text-slate-400">Start Color</label>
            <input 
              type="color" 
              value={c.fromColor || "#3b82f6"} 
              onChange={(e) => {
                const arr = [...data.clubs]; arr[i].fromColor = e.target.value; setData({ ...data, clubs: arr });
              }}
              className="w-full h-10 rounded-lg cursor-pointer border-none p-1 bg-white shadow-sm"
            />
          </div>
          <div>
            <label className="text-[10px] font-black uppercase text-slate-400">End Color</label>
            <input 
              type="color" 
              value={c.toColor || "#2dd4bf"} 
              onChange={(e) => {
                const arr = [...data.clubs]; arr[i].toColor = e.target.value; setData({ ...data, clubs: arr });
              }}
              className="w-full h-10 rounded-lg cursor-pointer border-none p-1 bg-white shadow-sm"
            />
          </div>
        </div>

        <Input
          label="Lucide Icon"
          value={c.icon}
          placeholder="e.g. Atom"
          onChange={(v) => {
            const arr = [...data.clubs]; arr[i].icon = v; setData({ ...data, clubs: arr });
          }}
        />

        {/* Real-time Gradient Preview using Inline Styles */}
        <div className="mt-3">
          <label className="text-[10px] font-black uppercase text-slate-400">Gradient Preview</label>
          <div 
            className="h-10 w-full rounded-xl shadow-inner transition-all duration-300" 
            style={{
              background: `linear-gradient(to bottom right, ${c.fromColor || '#3b82f6'}, ${c.toColor || '#2dd4bf'})`
            }}
          />
        </div>

        <div className="mt-4">
          <SaveButton onClick={() => saveSection("clubs")} loading={savingSection === "clubs"} mini />
        </div>
      </Card>
    ))}
  </div>

  <div className="mt-6">
    <AddButton onClick={() => setData({
      ...data,
      clubs: [...data.clubs, { 
        name: "", 
        motto: "", 
        icon: "Users", 
        fromColor: "#6366f1", 
        toColor: "#a855f7" 
      }]
    })} />
  </div>
</Section>

        {/* ================= EVENTS ================= */}
        <Section title="Upcoming Events" icon={<Calendar className="text-rose-500" />}>
          <div className="space-y-6">
            {data.events.map((e, i) => (
              <div key={i} className="group relative bg-slate-50 rounded-[2rem] border border-slate-200 p-6 transition-all hover:bg-white hover:shadow-xl">

                {/* Delete Button */}
                <button
                  onClick={() => setData({ ...data, events: data.events.filter((_, x) => x !== i) })}
                  className="absolute -top-2 -right-2 bg-white text-slate-400 hover:text-red-500 p-2 rounded-full shadow-md border border-slate-100 transition-colors z-10"
                >
                  <Trash2 size={18} />
                </button>

                <div className="flex flex-col lg:flex-row gap-8">

                  {/* Left: Image Side */}
                  <div className="w-full lg:w-1/3 space-y-3">
                    <div className="relative group/img overflow-hidden rounded-2xl border-2 border-dashed border-slate-200 aspect-video flex flex-col items-center justify-center bg-white">
                      {e.image ? (
                        <>
                          <img src={e.image} className="absolute inset-0 w-full h-full object-cover" alt="Preview" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                            <p className="text-white text-xs font-bold">Change Image</p>
                          </div>
                        </>
                      ) : (
                        <div className="text-slate-300 text-center p-4">
                          <div className="mx-auto w-10 h-10 mb-2 border-2 border-slate-200 rounded-full flex items-center justify-center italic font-serif">i</div>
                          <p className="text-[10px] font-bold uppercase tracking-widest">No Image Uploaded</p>
                        </div>
                      )}
                    </div>

                    <ImageUploader
                      label="Upload Event Poster"
                      folder="activities/events"
                      onUpload={async (formData) => {
                        try {
                          // 1️⃣ Upload image
                          const res = await uploadImage(formData);
                          const imageUrl = res.data.image;

                          // 2️⃣ Update event image safely
                          const updatedEvents = data.events.map((ev, idx) =>
                            idx === i ? { ...ev, image: imageUrl } : ev
                          );

                          const updatedData = {
                            ...data,
                            events: updatedEvents,
                          };

                          setData(updatedData);

                          // 3️⃣ SAVE TO DATABASE 🔥
                          await saveActivitiesPage(updatedData);

                          alert("Event poster saved ✅");
                        } catch (err) {
                          console.error(err);
                          alert("Event poster upload failed ❌");
                        }
                      }}
                    />
                    {data.events[i]?.image && (
                      <img
                        src={
                          data.events[i].image.startsWith("http")
                            ? data.events[i].image
                            : `${import.meta.env.VITE_API_URL.replace(
                              "/api",
                              ""
                            )}${data.events[i].image}`
                        }
                        className="mt-3 h-32 w-full object-cover rounded-xl border"
                        alt="Event Poster"
                      />
                    )}


                  </div>

                  {/* Right: Content Side */}
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <Input
                        label="Event Title"
                        placeholder="e.g. Annual Sports Day"
                        value={e.title}
                        onChange={(v) => {
                          const arr = [...data.events]; arr[i].title = v; setData({ ...data, events: arr });
                        }}
                      />
                    </div>

                    {/* New Suggested Fields: Date & Location */}
                    <Input
                      label="Event Date"
                      placeholder="e.g. Oct 24, 2024"
                      value={e.date || ""}
                      onChange={(v) => {
                        const arr = [...data.events]; arr[i].date = v; setData({ ...data, events: arr });
                      }}
                    />
                    <Input
                      label="Location"
                      placeholder="e.g. Main Auditorium"
                      value={e.location || ""}
                      onChange={(v) => {
                        const arr = [...data.events]; arr[i].location = v; setData({ ...data, events: arr });
                      }}
                    />

                    <div className="md:col-span-2">
                      <Textarea
                        label="Short Description"
                        placeholder="Tell something about the event..."
                        value={e.description}
                        onChange={(v) => {
                          const arr = [...data.events]; arr[i].description = v; setData({ ...data, events: arr });
                        }}
                      />
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>

          {/* Footer Actions */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 p-6 bg-slate-900 rounded-3xl shadow-2xl">
            <div className="text-white/60 text-sm italic">
              Tip: Use high-quality landscape images for event posters.
            </div>
            <div className="flex gap-4 w-full sm:w-auto">
              <AddButton
                onClick={() => setData({ ...data, events: [...data.events, { title: "", description: "", image: "", date: "", location: "" }] })}
              />
              <SaveButton
                onClick={() => saveSection("events")}
                loading={savingSection === "events"}
              />
            </div>
          </div>
        </Section>

        {/* ================= FIELD TRIP ================= */}
        <Section title="Field Trip (Call to Action)" icon={<MapPin className="text-emerald-500" />}>
          <div className="grid md:grid-cols-3 gap-4">
            <Input label="CTA Title" value={data.fieldTrip.title} onChange={(v) => setData({ ...data, fieldTrip: { ...data.fieldTrip, title: v } })} />
            <Input label="Description" value={data.fieldTrip.description} onChange={(v) => setData({ ...data, fieldTrip: { ...data.fieldTrip, description: v } })} />
            <Input label="Button Label" value={data.fieldTrip.buttonText} onChange={(v) => setData({ ...data, fieldTrip: { ...data.fieldTrip, buttonText: v } })} />
          </div>
          <SaveButton onClick={() => saveSection("fieldTrip")} loading={savingSection === "fieldTrip"} />
        </Section>

      </div>
    </div>
  );
}

/* ================= STYLED UI HELPERS ================= */

const Section = ({ title, icon, children }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
    className="bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-slate-200 space-y-6">
    <div className="flex items-center gap-3 border-b border-slate-50 pb-4">
      <div className="p-2 bg-slate-50 rounded-xl">{icon}</div>
      <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">{title}</h2>
    </div>
    {children}
  </motion.div>
);

const Card = ({ children, onRemove }) => (
  <div className="p-5 rounded-2xl border border-slate-100 bg-slate-50/50 space-y-3 relative group">
    {onRemove && (
      <button onClick={onRemove} className="absolute top-2 right-2 p-1 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">
        <Trash2 size={16} />
      </button>
    )}
    {children}
  </div>
);

const Input = ({ label, value, onChange }) => (
  <div className="flex flex-col gap-1">
    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">{label}</label>
    <input value={value || ""} onChange={(e) => onChange(e.target.value)}
      className="w-full bg-white border border-slate-200 p-3 rounded-xl text-sm font-bold focus:ring-2 focus:ring-blue-500 transition-all outline-none" />
  </div>
);

const Textarea = ({ label, value, onChange }) => (
  <div className="flex flex-col gap-1">
    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">{label}</label>
    <textarea rows={3} value={value || ""} onChange={(e) => onChange(e.target.value)}
      className="w-full bg-white border border-slate-200 p-3 rounded-xl text-sm font-bold focus:ring-2 focus:ring-blue-500 transition-all outline-none" />
  </div>
);

const Checkbox = ({ label, checked, onChange }) => (
  <label className="flex items-center gap-2 cursor-pointer mt-2 group">
    <input type="checkbox" checked={checked || false} onChange={(e) => onChange(e.target.checked)}
      className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
    <span className="text-xs font-black uppercase text-slate-500 group-hover:text-blue-600 transition-colors">{label}</span>
  </label>
);

const AddButton = ({ onClick }) => (
  <button onClick={onClick} className="flex items-center gap-2 text-xs font-black uppercase text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg transition-all">
    <Plus size={16} /> Add Item
  </button>
);

const SaveButton = ({ onClick, loading, mini }) => (
  <button onClick={onClick} disabled={loading}
    className={`${mini ? 'w-full py-2' : 'px-8 py-3'} mt-2 bg-slate-900 hover:bg-blue-600 disabled:bg-slate-300 text-white rounded-xl font-bold text-xs transition-all shadow-lg flex items-center justify-center gap-2`}>
    {loading ? <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save size={14} />}
    {loading ? "SAVING..." : "SAVE SECTION"}
  </button>
);

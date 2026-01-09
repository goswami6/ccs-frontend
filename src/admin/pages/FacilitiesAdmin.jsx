import { useEffect, useState } from "react";
import { fetchFacilitiesPage, saveFacilitiesPage, uploadImage } from "../../utils/api";
import ImageUploader from "../components/ImageUploader";
import { Trash2, Plus, Save, Loader2, CheckCircle, School, Microscope } from "lucide-react";

export default function FacilitiesAdmin() {
  const [data, setData] = useState(null);
  const [savingSection, setSavingSection] = useState(null);

  useEffect(() => {
    fetchFacilitiesPage().then((res) => {
      // Ensure state matches Mongoose schema exactly
      setData({
        hero: res?.hero || { title: "", subtitle: "" },
        academicFacilities: res?.academicFacilities || [],
        scienceSports: {
          scienceTitle: res?.scienceSports?.scienceTitle || "",
          scienceDesc: res?.scienceSports?.scienceDesc || "",
          sportsTitle: res?.scienceSports?.sportsTitle || "",
          sportsDesc: res?.scienceSports?.sportsDesc || "",
          image: res?.scienceSports?.image || ""
        },
        logistics: res?.logistics || [],
      });
    });
  }, []);

  const saveSection = async (sectionKey) => {
    setSavingSection(sectionKey);
    try {
      console.log("Payload being sent to DB:", data);
      const response = await saveFacilitiesPage(data);

      if (response) {
        setTimeout(() => setSavingSection(null), 2000);
      }
    } catch (err) {
      console.error("Save Error:", err);
      setSavingSection(null);
      alert("Database mein save nahi hua! Check Console.");
    }
  };

  if (!data) return (
    <div className="flex flex-col items-center justify-center p-20 space-y-4">
      <Loader2 className="animate-spin text-blue-600" size={40} />
      <p className="font-bold text-slate-400">Loading Database...</p>
    </div>
  );

  /* ================= HELPERS ================= */
  const updateArray = (key, i, field, value) => {
    const arr = [...data[key]];
    arr[i] = { ...arr[i], [field]: value };
    setData({ ...data, [key]: arr });
  };

  return (
    <div className="p-10 bg-slate-50 min-h-screen pb-20 font-sans">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* HEADER */}
        <header className="flex items-center gap-4 border-b pb-6">
          <div className="bg-[#1E88E5] p-3 rounded-2xl shadow-lg">
            <School className="text-white" size={32} />
          </div>
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Facilities Control</h1>
            <p className="text-slate-500 font-medium text-sm italic">Manage campus infrastructure and resources.</p>
          </div>
        </header>

        {/* HERO SECTION */}
        <Section title="Hero Appearance" onSave={() => saveSection("hero")} isLoading={savingSection === "hero"}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="Main Title" value={data.hero.title} onChange={v => setData({ ...data, hero: { ...data.hero, title: v } })} />
            <Input label="Subtitle" value={data.hero.subtitle} onChange={v => setData({ ...data, hero: { ...data.hero, subtitle: v } })} />
          </div>
        </Section>

        {/* ACADEMIC FACILITIES */}
        <Section title="Academic Facilities" onSave={() => saveSection("academic")} isLoading={savingSection === "academic"}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.academicFacilities.map((f, i) => (
              <div key={i} className="p-6 bg-slate-50 border border-slate-200 rounded-[2rem] relative group hover:bg-white transition-all">
                <button onClick={() => setData({ ...data, academicFacilities: data.academicFacilities.filter((_, idx) => idx !== i) })} className="absolute top-5 right-5 text-slate-300 hover:text-red-500 transition-colors">
                  <Trash2 size={18} />
                </button>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <Input label="Facility Title" value={f.title} onChange={v => updateArray("academicFacilities", i, "title", v)} />
                  <Input label="Icon (Lucide)" value={f.icon} onChange={v => updateArray("academicFacilities", i, "icon", v)} />
                  <Input label="Color (e.g. text-blue-600)" value={f.color} onChange={v => updateArray("academicFacilities", i, "color", v)} />
                </div>
                <Textarea label="Description" value={f.description} onChange={v => updateArray("academicFacilities", i, "description", v)} />
              </div>
            ))}
          </div>
          <AddBtn onClick={() => setData({ ...data, academicFacilities: [...data.academicFacilities, { title: "", description: "", icon: "", color: "" }] })} />
        </Section>

        {/* SCIENCE & SPORTS (Fixed Image Logic) */}
        <Section title="Science & Sports Highlights" onSave={() => saveSection("scisport")} isLoading={savingSection === "scisport"}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div className="p-5 bg-blue-50/50 rounded-3xl border border-blue-100">
                <h4 className="text-blue-600 font-bold mb-4 flex items-center gap-2"><Microscope size={18} /> Science Lab Data</h4>
                <Input label="Science Title" value={data.scienceSports.scienceTitle} onChange={v => setData({ ...data, scienceSports: { ...data.scienceSports, scienceTitle: v } })} />
                <div className="mt-4">
                  <Textarea label="Science Description" value={data.scienceSports.scienceDesc} onChange={v => setData({ ...data, scienceSports: { ...data.scienceSports, scienceDesc: v } })} />
                </div>
              </div>
              <div className="p-5 bg-red-50/50 rounded-3xl border border-red-100">
                <h4 className="text-red-600 font-bold mb-4 flex items-center gap-2">🏆 Sports Center Data</h4>
                <Input label="Sports Title" value={data.scienceSports.sportsTitle} onChange={v => setData({ ...data, scienceSports: { ...data.scienceSports, sportsTitle: v } })} />
                <div className="mt-4">
                  <Textarea label="Sports Description" value={data.scienceSports.sportsDesc} onChange={v => setData({ ...data, scienceSports: { ...data.scienceSports, sportsDesc: v } })} />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Section Hero Image</label>
              <ImageUploader
                folder="facilities"
                onUpload={async (fd) => {
                  try {
                    // 1️⃣ Upload image
                    const res = await uploadImage(fd);

                    // normalize response
                    const imageUrl =
                      res?.image ||
                      res?.data?.image ||
                      res?.url ||
                      res?.data?.url;

                    if (!imageUrl) {
                      alert("Image URL not returned from backend");
                      return;
                    }

                    // 2️⃣ Prepare UPDATED DATA
                    const updatedData = {
                      ...data,
                      scienceSports: {
                        ...(data.scienceSports || {}),
                        image: imageUrl,
                      },
                    };

                    // 3️⃣ Update UI
                    setData(updatedData);

                    // 4️⃣ SAVE TO DATABASE 🔥🔥🔥
                    await saveFacilitiesPage(updatedData);

                    alert("Image saved successfully ✅");
                  } catch (err) {
                    console.error(err);
                    alert("Upload failed!");
                  }
                }}
              />

              {/* IMAGE PREVIEW */}
              {data?.scienceSports?.image && (
                <div className="relative group">
                  <img
                    src={data.scienceSports.image}
                    className="w-full h-64 object-cover rounded-[2.5rem] border-4 border-white shadow-xl"
                    alt="Preview"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-[2.5rem] flex items-center justify-center">
                    <p className="text-white font-bold">Image Uploaded & Saved ✅</p>
                  </div>
                </div>
              )}

            </div>
          </div>
        </Section>

        {/* LOGISTICS */}
        <Section title="Logistics & Transport" onSave={() => saveSection("logistics")} isLoading={savingSection === "logistics"}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {data.logistics.map((l, i) => (
              <div key={i} className="p-5 bg-white border border-slate-100 rounded-3xl relative group hover:shadow-md transition-all">
                <button onClick={() => setData({ ...data, logistics: data.logistics.filter((_, idx) => idx !== i) })} className="absolute -top-2 -right-2 bg-white text-red-400 p-1.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all border">
                  <Trash2 size={14} />
                </button>
                <Input label="Label" value={l.label} onChange={v => updateArray("logistics", i, "label", v)} />
                <div className="mt-3">
                  <Input label="Icon Name" value={l.icon} onChange={v => updateArray("logistics", i, "icon", v)} />
                </div>
              </div>
            ))}
          </div>
          <AddBtn onClick={() => setData({ ...data, logistics: [...data.logistics, { label: "", icon: "" }] })} />
        </Section>

      </div>
    </div>
  );
}

/* ================= REUSABLE UI COMPONENTS ================= */

const Section = ({ title, children, onSave, isLoading }) => (
  <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
    <div className="flex justify-between items-center border-b border-slate-50 pb-6 mb-8">
      <h2 className="text-2xl font-black text-slate-800 tracking-tight">{title}</h2>
      <button
        onClick={onSave}
        disabled={isLoading}
        className={`flex items-center gap-2 px-6 py-2.5 rounded-2xl text-sm font-bold transition-all shadow-lg shadow-slate-200
          ${isLoading ? 'bg-emerald-500 text-white' : 'bg-slate-900 text-white hover:bg-[#1E88E5]'}`}
      >
        {isLoading ? <><CheckCircle size={16} className="animate-bounce" /> Saved!</> : <><Save size={16} /> Save Changes</>}
      </button>
    </div>
    {children}
  </div>
);

const Input = ({ label, value, onChange }) => (
  <div className="flex flex-col gap-1 w-full">
    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">{label}</label>
    <input value={value || ""} onChange={(e) => onChange(e.target.value)}
      className="w-full border-slate-200 border p-3.5 rounded-2xl bg-white text-sm focus:border-[#1E88E5] focus:ring-4 focus:ring-blue-500/5 outline-none font-medium transition-all"
    />
  </div>
);

const Textarea = ({ label, value, onChange }) => (
  <div className="flex flex-col gap-1 w-full">
    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">{label}</label>
    <textarea rows={3} value={value || ""} onChange={(e) => onChange(e.target.value)}
      className="w-full border-slate-200 border p-3.5 rounded-2xl bg-white text-sm focus:border-[#1E88E5] focus:ring-4 focus:ring-blue-500/5 outline-none resize-none font-medium transition-all"
    />
  </div>
);

const AddBtn = ({ onClick }) => (
  <button onClick={onClick} className="mt-6 flex items-center gap-2 text-[#1E88E5] font-black text-xs bg-blue-50 px-6 py-3.5 rounded-2xl hover:bg-blue-100 transition-all uppercase tracking-wider border border-blue-100 shadow-sm shadow-blue-100/50">
    <Plus size={16} /> Add New Item
  </button>
);
import { useEffect, useState } from "react";
import { fetchAdmissionPage, saveAdmissionPage, uploadImage } from "../../utils/api";
import ImageUploader from "../components/ImageUploader";
import { Trash2, Plus, Save, Loader2, CheckCircle, GraduationCap } from "lucide-react";

export default function AdmissionAdmin() {
  const [data, setData] = useState(null);
  const [savingSection, setSavingSection] = useState(null); // Tracks which section is saving

  useEffect(() => {
    fetchAdmissionPage().then((res) => {
      setData({
        hero: res?.hero || { title: "", subtitle: "", ctaText: "", backgroundImage: "" },
        steps: res?.steps || [],
        documents: res?.documents || [],
        features: res?.features || [],
        stats: res?.stats || [],
      });
    });
  }, []);

  // Section-wise Save Function
  const saveSection = async (sectionKey) => {
    setSavingSection(sectionKey);
    try {
      await saveAdmissionPage(data);
      // Success state logic handles via savingSection check in UI
      setTimeout(() => setSavingSection(null), 2000); 
    } catch (err) {
      console.error(err);
      alert("Error saving " + sectionKey);
      setSavingSection(null);
    }
  };

  if (!data) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-blue-600" size={40} /></div>;

  /* ================= HELPERS ================= */
  const updateArray = (key, index, field, value) => {
    const arr = [...data[key]];
    arr[index][field] = value;
    setData({ ...data, [key]: arr });
  };

  const removeArrayItem = (key, index) => {
    setData({ ...data, [key]: data[key].filter((_, i) => i !== index) });
  };

  return (
    <div className="p-10 bg-slate-50 min-h-screen pb-20">
      <div className="max-w-6xl mx-auto space-y-12">
        
        <header className="flex items-center gap-4 border-b pb-6">
          <div className="bg-blue-600 p-3 rounded-2xl">
            <GraduationCap className="text-white" size={32} />
          </div>
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Admission Control</h1>
            <p className="text-slate-500 font-medium text-sm italic">Manage process, documents, and requirements.</p>
          </div>
        </header>

        {/* ================= HERO SECTION ================= */}
        <Section 
          title="Hero Appearance" 
          onSave={() => saveSection("hero")} 
          isLoading={savingSection === "hero"}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Input label="Title" value={data.hero.title} onChange={(v) => setData({ ...data, hero: { ...data.hero, title: v } })} />
              <Input label="Subtitle" value={data.hero.subtitle} onChange={(v) => setData({ ...data, hero: { ...data.hero, subtitle: v } })} />
              <Input label="CTA Text" value={data.hero.ctaText} onChange={(v) => setData({ ...data, hero: { ...data.hero, ctaText: v } })} />
            </div>
            <div className="space-y-4">
              <ImageUploader
                folder="admission/hero"
                label="Background Image"
                onUpload={async (formData) => {
                  const img = await uploadImage(formData);
                  setData({ ...data, hero: { ...data.hero, backgroundImage: img.image } });
                }}
              />
              {data.hero.backgroundImage && (
                <img src={data.hero.backgroundImage} className="h-32 w-full object-cover rounded-2xl border-2 border-slate-100 shadow-sm" alt="Preview" />
              )}
            </div>
          </div>
        </Section>

        {/* ================= STEPS ================= */}
        <Section title="Process Steps" onSave={() => saveSection("steps")} isLoading={savingSection === "steps"}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.steps.map((s, i) => (
              <div key={i} className="p-5 bg-slate-50 border border-slate-200 rounded-[2rem] relative group">
                <button onClick={() => removeArrayItem("steps", i)} className="absolute top-4 right-4 text-slate-300 hover:text-red-500 transition-colors"><Trash2 size={18}/></button>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <Input label="Step Title" value={s.title} onChange={(v) => updateArray("steps", i, "title", v)} />
                  <Input label="Icon Name" value={s.icon} onChange={(v) => updateArray("steps", i, "icon", v)} />
                </div>
                <Input label="Color (Tailwind)" value={s.color} onChange={(v) => updateArray("steps", i, "color", v)} />
                <Textarea label="Description" value={s.description} onChange={(v) => updateArray("steps", i, "description", v)} />
              </div>
            ))}
          </div>
          <AddBtn onClick={() => setData({...data, steps: [...data.steps, {title:"", description:"", icon:"", color:""}]})} />
        </Section>

        {/* ================= DOCUMENTS ================= */}
        <Section title="Required Documents" onSave={() => saveSection("docs")} isLoading={savingSection === "docs"}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {data.documents.map((d, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="flex-1"><Input label={`Doc #${i+1}`} value={d} onChange={(v) => {
                  const arr = [...data.documents]; arr[i] = v; setData({ ...data, documents: arr });
                }} /></div>
                <button onClick={() => setData({...data, documents: data.documents.filter((_,idx)=>idx!==i)})} className="mt-5 p-2 text-slate-300 hover:text-red-500"><Trash2 size={16}/></button>
              </div>
            ))}
          </div>
          <AddBtn onClick={() => setData({...data, documents: [...data.documents, ""]})} />
        </Section>

        {/* ================= FEATURES ================= */}
        <Section title="Admission Features" onSave={() => saveSection("features")} isLoading={savingSection === "features"}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.features.map((f, i) => (
              <div key={i} className="p-6 border border-slate-200 rounded-[2rem] bg-white shadow-sm relative">
                <button onClick={() => removeArrayItem("features", i)} className="absolute top-4 right-4 text-slate-300 hover:text-red-500"><Trash2 size={18}/></button>
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Title" value={f.title} onChange={(v) => updateArray("features", i, "title", v)} />
                  <Input label="Icon" value={f.icon} onChange={(v) => updateArray("features", i, "icon", v)} />
                  <Input label="Color" value={f.color} onChange={(v) => updateArray("features", i, "color", v)} />
                  <Input label="Light BG" value={f.lightColor} onChange={(v) => updateArray("features", i, "lightColor", v)} />
                </div>
                <Textarea label="Short Pitch" value={f.description} onChange={(v) => updateArray("features", i, "description", v)} />
              </div>
            ))}
          </div>
          <AddBtn onClick={() => setData({...data, features: [...data.features, {title:"", description:"", icon:"", color:"", lightColor:""}]})} />
        </Section>

        {/* ================= STATS ================= */}
        <Section title="Live Statistics" onSave={() => saveSection("stats")} isLoading={savingSection === "stats"}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {data.stats.map((s, i) => (
              <div key={i} className="p-4 bg-blue-50/50 rounded-3xl border border-blue-100 flex flex-col gap-2 relative group">
                <button onClick={() => removeArrayItem("stats", i)} className="absolute -top-2 -right-2 bg-white text-red-400 p-1 rounded-full shadow opacity-0 group-hover:opacity-100 transition-all"><Trash2 size={14}/></button>
                <Input label="Value" value={s.value} onChange={(v) => updateArray("stats", i, "value", v)} />
                <Input label="Label" value={s.label} onChange={(v) => updateArray("stats", i, "label", v)} />
              </div>
            ))}
          </div>
          <AddBtn onClick={() => setData({...data, stats: [...data.stats, {value:"", label:""}]})} />
        </Section>

      </div>
    </div>
  );
}

/* ================= REFINED UI COMPONENTS ================= */

const Section = ({ title, children, onSave, isLoading }) => (
  <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
    <div className="flex justify-between items-center border-b border-slate-50 pb-6 mb-8">
      <h2 className="text-2xl font-black text-slate-800 tracking-tight">{title}</h2>
      <button 
        onClick={onSave}
        disabled={isLoading}
        className={`flex items-center gap-2 px-6 py-2.5 rounded-2xl text-sm font-bold transition-all shadow-lg shadow-slate-200
          ${isLoading ? 'bg-emerald-500 text-white' : 'bg-slate-900 text-white hover:bg-blue-600'}`}
      >
        {isLoading ? (
          <>
            <CheckCircle className="animate-bounce" size={16} />
            Updated!
          </>
        ) : (
          <>
            <Save size={16} />
            Save {title.split(" ")[0]}
          </>
        )}
      </button>
    </div>
    {children}
  </div>
);

const Input = ({ label, value, onChange }) => (
  <div className="flex flex-col gap-1 w-full">
    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">{label}</label>
    <input
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border-slate-200 border p-3.5 rounded-2xl bg-white text-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
    />
  </div>
);

const Textarea = ({ label, value, onChange }) => (
  <div className="flex flex-col gap-1 w-full mt-2">
    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">{label}</label>
    <textarea
      rows={3}
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border-slate-200 border p-3.5 rounded-2xl bg-white text-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none resize-none"
    />
  </div>
);

const AddBtn = ({ onClick }) => (
  <button 
    onClick={onClick} 
    className="mt-6 flex items-center gap-2 text-blue-600 font-black text-xs bg-blue-50 px-5 py-3 rounded-2xl hover:bg-blue-100 transition-all border border-blue-100"
  >
    <Plus size={16} /> Add New Entry
  </button>
);
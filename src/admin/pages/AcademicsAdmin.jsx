import { useEffect, useState } from "react";
import { fetchAcademicsPage, saveAcademicsPage } from "../../utils/api";
import { Trash2, Plus, Save, Loader2, CheckCircle } from "lucide-react";

const DEFAULT_DATA = {
  hero: { title: "", subtitle: "", backgroundImage: "" },
  pillars: [],
  levels: { prePrimary: [], primary: [], middle: [], secondary: [] },
  methods: [],
};

export default function AcademicsAdmin() {
  const [data, setData] = useState(null);
  const [savingSection, setSavingSection] = useState(null); // Tracks which section is saving

  useEffect(() => {
    fetchAcademicsPage().then((res) => {
      setData({
        ...DEFAULT_DATA,
        ...res,
        hero: { ...DEFAULT_DATA.hero, ...(res?.hero || {}) },
        levels: { ...DEFAULT_DATA.levels, ...(res?.levels || {}) },
        pillars: res?.pillars || [],
        methods: res?.methods || [],
      });
    });
  }, []);

  // Section-wise Save Function
  const saveSection = async (sectionKey) => {
    setSavingSection(sectionKey);
    try {
      await saveAcademicsPage(data); // Backend update
      alert(`${sectionKey.toUpperCase()} updated successfully!`);
    } catch (error) {
      console.error("Update failed", error);
    }
    setSavingSection(null);
  };

  if (!data) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-blue-600" /></div>;

  return (
    <div className="p-10 max-w-6xl mx-auto space-y-12 pb-20">
      <header className="flex justify-between items-center border-b pb-6">
        <div>
          <h1 className="text-4xl font-black italic tracking-tighter text-slate-900">Academics Admin</h1>
          <p className="text-slate-500 text-sm font-medium">Manage curriculum, pillars, and teaching methods.</p>
        </div>
      </header>

      {/* HERO SECTION */}
      <Section 
        title="Hero Header" 
        onSave={() => saveSection("hero")} 
        isLoading={savingSection === "hero"}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="Main Title" value={data.hero.title} onChange={(v) => setData({ ...data, hero: { ...data.hero, title: v } })} />
          <Input label="Subtitle" value={data.hero.subtitle} onChange={(v) => setData({ ...data, hero: { ...data.hero, subtitle: v } })} />
        </div>
      </Section>

      {/* PILLARS SECTION */}
      <Section 
        title="Curriculum Pillars" 
        onSave={() => saveSection("pillars")} 
        isLoading={savingSection === "pillars"}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.pillars.map((p, i) => (
            <div key={i} className="p-5 border rounded-3xl bg-slate-50 relative group border-slate-200">
              <button onClick={() => removeArr("pillars", i)} className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-all"><Trash2 size={18}/></button>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <Input label="Title" value={p.title} onChange={(v) => updateArr("pillars", i, "title", v)} />
                  <Input label="Icon (Lucide)" value={p.icon} onChange={(v) => updateArr("pillars", i, "icon", v)} />
                </div>
                <Input label="Color (e.g. text-blue-500)" value={p.color} onChange={(v) => updateArr("pillars", i, "color", v)} />
                <Textarea label="Description" value={p.description} onChange={(v) => updateArr("pillars", i, "description", v)} />
              </div>
            </div>
          ))}
        </div>
        <AddBtn onClick={() => setData({ ...data, pillars: [...data.pillars, { title: "", icon: "Star", description: "", color: "" }] })} />
      </Section>

      {/* LEVELS SECTION */}
      <Section 
        title="Education Levels" 
        onSave={() => saveSection("levels")} 
        isLoading={savingSection === "levels"}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.keys(data.levels).map((level) => (
            <div key={level} className="space-y-3 bg-slate-50 border p-5 rounded-3xl">
              <h3 className="font-black text-xs uppercase text-blue-600 tracking-widest">{level}</h3>
              <Textarea 
                placeholder="Math, Science, Art..." 
                value={data.levels[level]?.join(", ")} 
                onChange={(v) => {
                  const arr = v.split(",").map(item => item.trim());
                  setData({ ...data, levels: { ...data.levels, [level]: arr } });
                }} 
              />
            </div>
          ))}
        </div>
      </Section>

      {/* METHODS SECTION */}
      <Section 
        title="Teaching Methods" 
        onSave={() => saveSection("methods")} 
        isLoading={savingSection === "methods"}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.methods.map((m, i) => (
            <div key={i} className="p-5 border rounded-3xl bg-slate-50 flex flex-col gap-4 relative">
               <button onClick={() => removeArr("methods", i)} className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-all"><Trash2 size={16}/></button>
               <Input label="Method Title" value={m.title} onChange={(v) => updateArr("methods", i, "title", v)} />
               <Input label="Icon Name" value={m.icon} onChange={(v) => updateArr("methods", i, "icon", v)} />
            </div>
          ))}
        </div>
        <AddBtn onClick={() => setData({ ...data, methods: [...data.methods, { title: "", icon: "Check" }] })} />
      </Section>
    </div>
  );

  /* UTILS */
  function updateArr(key, i, field, value) {
    const arr = [...data[key]];
    arr[i] = { ...arr[i], [field]: value };
    setData({ ...data, [key]: arr });
  }

  function removeArr(key, i) {
    setData({ ...data, [key]: data[key].filter((_, index) => index !== i) });
  }
}

/* UI COMPONENTS */
const Section = ({ title, children, onSave, isLoading }) => (
  <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 relative group overflow-hidden">
    <div className="flex justify-between items-center border-b border-slate-50 pb-6 mb-6">
      <h2 className="font-black text-2xl tracking-tight text-slate-800">{title}</h2>
      <button 
        onClick={onSave}
        disabled={isLoading}
        className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-2xl text-sm font-bold hover:bg-blue-600 transition-all disabled:bg-slate-300"
      >
        {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
        {isLoading ? "Saving..." : "Save Section"}
      </button>
    </div>
    {children}
  </div>
);

const Input = ({ label, value, onChange, placeholder }) => (
  <div className="space-y-1 w-full">
    <label className="text-[10px] uppercase font-black text-slate-400 tracking-widest ml-1">{label}</label>
    <input
      className="w-full border-slate-200 border p-3.5 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm bg-white"
      value={value || ""}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

const Textarea = ({ label, value, onChange, placeholder }) => (
  <div className="space-y-1 w-full">
    {label && <label className="text-[10px] uppercase font-black text-slate-400 tracking-widest ml-1">{label}</label>}
    <textarea
      rows={3}
      className="w-full border-slate-200 border p-3.5 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm bg-white"
      value={value || ""}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

const AddBtn = ({ onClick }) => (
  <button 
    onClick={onClick} 
    className="mt-4 flex items-center gap-2 text-blue-600 font-bold text-xs bg-blue-50 px-5 py-2.5 rounded-2xl hover:bg-blue-100 transition-all"
  >
    <Plus size={16} /> Add New Entry
  </button>
);
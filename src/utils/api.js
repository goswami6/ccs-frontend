import axios from "axios";

// ✅ Axios instance
export const API_BASE_URL = "http://localhost:5006";

// ✅ Axios instance (Base URL + /api)
const API = axios.create({
  baseURL: `${API_BASE_URL}/api`,
});


// 🔐 Attach token automatically
// Request Interceptor (Aapka code sahi hai, bas consistency ke liye)
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("admin_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ================= AUTH =================
// Corrected: Async function banaya aur res.data return kiya
export const adminLogin = async (data) => {
  const res = await API.post("/auth/login", data);
  return res.data; // Component ko direct { token: "..." } milega
};

// ================= IMAGE (GENERIC) =================
export const uploadImage = (formData) =>
  API.post("/images", formData);

export const getImages = () => API.get("/images");

// ================= HERO / SECTION =================

// ✅ GET by section
export const fetchHeroSlides = async (section) => {
  const res = await API.get(`/hero/${section}`);
  return res.data; // always array
};

// ✅ CREATE
export const createHeroSlide = async (formData) => {
  const res = await API.post("/hero", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// ✅ DELETE
export const deleteHeroSlide = async (id) => {
  const res = await API.delete(`/hero/${id}`);
  return res.data;
};
// why choose us

export const fetchFeatures = async () => {
  const res = await API.get("/features");
  return res.data;
};

export const createFeature = (data) =>
  API.post("/features", data);

export const updateFeature = (id, data) =>
  API.put(`/features/${id}`, data);

export const deleteFeature = (id) =>
  API.delete(`/features/${id}`);

// about us page
export const fetchAboutPage = async () => {
  const res = await API.get("/about");
  return res.data;
};

export const saveAboutPage = async (data) => {
  const res = await API.post("/about", data);
  return res.data;
};


// activities page
export const fetchActivitiesPage = async () => {
  const res = await API.get("/activities");
  return res.data;
};

export const saveActivitiesPage = async (data) => {
  const res = await API.post("/activities", data);
  return res.data;
};

// Academics api
export const fetchAcademicsPage = async () => {
  const res = await API.get("/academics");
  return res.data;
};

export const saveAcademicsPage = async (data) => {
  const res = await API.post("/academics", data);
  return res.data;
};

// ADMISSION PAGE
export const fetchAdmissionPage = async () => {
  const res = await API.get("/admission");
  return res.data;
};

export const saveAdmissionPage = async (data) => {
  const res = await API.post("/admission", data);
  return res.data;
};
// facilities

export const fetchFacilitiesPage = async () => {
  const res = await API.get("/facilities");
  return res.data;
};

export const saveFacilitiesPage = async (data) => {
  const res = await API.post("/facilities", data);
  return res.data;
};

// PUBLIC DISCLOSURE
export const fetchDisclosures = async () => {
  const res = await API.get("/disclosure");
  return res.data;
};

export const uploadDisclosure = async (formData) => {
  const res = await API.post("/disclosure", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const deleteDisclosure = async (id) =>
  API.delete(`/disclosure/${id}`);

// new & updates
export const fetchNews = () => API.get("/news").then(res => res.data);
export const createNews = (formData) => API.post("/news", formData, {
  headers: { "Content-Type": "multipart/form-data" }
});
export const deleteNews = (id) => API.delete(`/news/${id}`);

// free
export const fetchFees = async () => {
  try {
    const res = await API.get('/fees');
    return res.data;
  } catch (err) {
    console.error("API Fetch Error:", err);
    return null; // Error aane par null return karein
  }
};

export const updateFee = async (formData) => {
  return await API.post('/fees/update', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};

// Gallery related API calls
export const fetchGalleryItems = () => API.get('/gallery');

export const uploadGalleryMedia = (formData) => API.post('/gallery/upload', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});

export const deleteGalleryItem = (id) => API.delete(`/gallery/${id}`);

// Admin: Student TC Upload
export const uploadStudentTC = (formData) => API.post('/tc/upload', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});

// User: Search TC
export const searchStudentTC = (query) => API.post('/tc/search', query);

// enquiry form 
export const submitEnquiry = (data) => API.post('/enquiry/submit', data);
export const fetchEnquiries = () => API.get('/enquiry');
export const deleteEnquiry = (id) => API.delete(`/enquiry/${id}`);
export const updateEnquiryStatus = (id, status) => API.put(`/enquiry/status/${id}`, { status });

// settings
export const fetchSettings = () => API.get('/settings');
export const updateSettings = (formData) => API.post('/settings/update', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});



export default API;








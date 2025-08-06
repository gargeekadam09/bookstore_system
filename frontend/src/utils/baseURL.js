const getBaseUrl = () => {
    return import.meta.env.VITE_API_URL || "https://bookstore-system-3-bmv4.onrender.com";
}

export default getBaseUrl;
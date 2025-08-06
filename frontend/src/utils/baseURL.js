const getBaseUrl = () => {
    const baseApiUrl = import.meta.env.VITE_API_URL || "https://bookstore-system-3-bmv4.onrender.com";
    return `https://api.allorigins.win/raw?url=${encodeURIComponent(baseApiUrl + '/api')}`;
}

export default getBaseUrl;
const getBaseUrl = () => {
    const baseUrl = import.meta.env.VITE_API_URL || "https://bookstore-system-3-bmv4.onrender.com";
    return `${baseUrl}/api`;
}

export default getBaseUrl;
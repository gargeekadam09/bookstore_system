const getBaseUrl = () => {
    // Use AllOrigins proxy to bypass CORS permanently
    const apiUrl = "https://bookstore-system-3-bmv4.onrender.com/api";
    return `https://api.allorigins.win/raw?url=${encodeURIComponent(apiUrl)}`;
}

export default getBaseUrl;
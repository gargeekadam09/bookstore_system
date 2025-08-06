const getBaseUrl = () => {
    const apiUrl = import.meta.env.VITE_API_URL || "https://bookstore-system-3-bmv4.onrender.com/api";
    return `https://cors-anywhere.herokuapp.com/${apiUrl}`;
}

export default getBaseUrl;
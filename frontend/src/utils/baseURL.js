const getBaseUrl = () => {
    // Try direct connection first - backend CORS might be deployed
    return "https://bookstore-system-3-bmv4.onrender.com/api";
}

export default getBaseUrl;
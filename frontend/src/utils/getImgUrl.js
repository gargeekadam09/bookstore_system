function getImgUrl(name) {
    return new URL(`../assets/books/${name}`, import.meta.url).href
}

export default getImgUrl;
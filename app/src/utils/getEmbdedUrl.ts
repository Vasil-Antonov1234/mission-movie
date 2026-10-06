export function getEmbdedUrl(url: string) {
    const pattern = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/;
    const match = url.match(pattern);

    return match ? `https://www.youtube.com/embed/${match[1]}` : url;
}
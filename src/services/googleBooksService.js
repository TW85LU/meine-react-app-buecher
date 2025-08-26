// Basis-URL für die Google Books API
const BASE_URL = "https://www.googleapis.com/books/v1/volumes";

// Funktion zum Abrufen von Büchern basierend auf einem Suchbegriff
export const searchGoogleBooks = async (query, maxResults = 20) => {
  try {
    const response = await fetch(
      `${BASE_URL}?q=${encodeURIComponent(query)}&maxResults=${maxResults}`
    );

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // Transformieren der Google Books API Daten in unser Format
    return data.items ? transformApiResponse(data.items) : [];
  } catch (error) {
    console.error("Error fetching from Google Books API:", error);
    throw error;
  }
};

// Funktion zum Abrufen eines einzelnen Buchs anhand seiner ID
export const getGoogleBookById = async (bookId) => {
  try {
    const response = await fetch(`${BASE_URL}/${bookId}`);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // Transformieren des einzelnen Buchs in unser Format
    return transformBookItem(data);
  } catch (error) {
    console.error("Error fetching book details:", error);
    throw error;
  }
};

// Hilfsfunktion zum Transformieren der API-Antwort
function transformApiResponse(items) {
  return items.map(transformBookItem).filter((item) => item !== null);
}

// Transformiert ein einzelnes Buch-Item
function transformBookItem(item) {
  // Fehlende Buchinformationen abfangen
  if (!item || !item.volumeInfo) {
    return null;
  }

  const volumeInfo = item.volumeInfo;

  // Extrahieren der Bildinformationen
  const imageLinks = volumeInfo.imageLinks || {};
  const thumbnailUrl =
    imageLinks.thumbnail || imageLinks.smallThumbnail || null;

  return {
    id: item.id,
    title: volumeInfo.title || "Unbekannter Titel",
    author:
      volumeInfo.authors && volumeInfo.authors.length > 0
        ? volumeInfo.authors.join(", ")
        : "Unbekannter Autor",
    description: volumeInfo.description || "Keine Beschreibung verfügbar",
    imageUrl: thumbnailUrl,
    publishedDate: volumeInfo.publishedDate || "Unbekanntes Datum",
    pageCount: volumeInfo.pageCount || "Unbekannt",
    categories: volumeInfo.categories || [],
    language: volumeInfo.language || "Unbekannt",
    previewLink: volumeInfo.previewLink || null,
  };
}
// Eine Sammlung von Beispiel-Büchern für unsere simulierte API
const sampleBooks = [
  {
    id: "1",
    title: "Der Herr der Ringe: Die Gefährten",
    author: "J.R.R. Tolkien",
    description:
      "Der erste Teil der epischen Fantasy-Trilogie, in der Frodo Beutlin eine gefährliche Reise unternimmt, um den Einen Ring zu zerstören.",
    imageUrl:
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "2",
    title: "Harry Potter und der Stein der Weisen",
    author: "J.K. Rowling",
    description:
      "Das erste Abenteuer des jungen Zauberers Harry Potter und seiner Freunde an der Hogwarts-Schule für Hexerei und Zauberei.",
    imageUrl:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
  },
  // Weitere Bücher...
];

// Simuliert einen asynchronen API-Aufruf mit einer kurzen Verzögerung
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Holt alle Bücher mit einer simulierten Netzwerkverzögerung
export const getAllBooks = async () => {
  await delay(800); // 800ms Verzögerung simuliert Netzwerklatenz
  return [...sampleBooks];
};

// Sucht Bücher basierend auf einem Suchbegriff
export const searchBooks = async (searchTerm) => {
  await delay(800);
  if (!searchTerm.trim()) return [...sampleBooks];

  // Filtern der Bücher basierend auf dem Suchbegriff (Titel oder Autor)
  return sampleBooks.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

// Holt ein einzelnes Buch anhand seiner ID
export const getBookById = async (id) => {
  await delay(500);
  const book = sampleBooks.find((book) => book.id === id);

  if (!book) {
    throw new Error("Buch nicht gefunden");
  }

  return book;
};
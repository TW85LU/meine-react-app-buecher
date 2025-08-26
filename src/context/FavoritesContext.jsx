import { createContext, useState, useContext } from "react";

// Create context and custom hook
export const FavoritesContext = createContext();
export const useFavorites = () => useContext(FavoritesContext);

export function FavoritesProvider({ children }) {
  // Simple state for favorites
  const [favorites, setFavorites] = useState([]);

  // Add or remove from favorites
  const toggleFavorite = (book) => {
    setFavorites((prev) =>
      prev.some((fav) => fav.id === book.id)
        ? prev.filter((fav) => fav.id !== book.id)
        : [...prev, book]
    );
  };

  // Check if a book is favorite
  const isFavorite = (bookId) => favorites.some((book) => book.id === bookId);

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}
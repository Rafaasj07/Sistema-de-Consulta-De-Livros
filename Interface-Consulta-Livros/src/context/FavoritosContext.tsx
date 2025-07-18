// Importa funções do React necessárias para criar contexto e manipular estado.
import { createContext, useContext, useEffect, useState } from "react";
// Importa o tipo 'Livro', que representa a estrutura dos dados de um livro.
import { Livro } from "../types/Livro";

// Define a forma (interface) do contexto de favoritos.
// Diz que o contexto terá:
// - um array de livros favoritos,
// - uma função para alternar (adicionar/remover) favoritos,
// - uma função para verificar se um livro está favoritado.
interface FavoritosContextType {
  favoritos: Livro[];
  alternarFavorito: (book: Livro) => void;
  estaFavoritado: (book: Livro) => boolean;
}

// Cria o contexto de favoritos, inicialmente com valor indefinido.
// Esse contexto será preenchido com o estado real dentro do provider.
const FavoritosContext = createContext<FavoritosContextType | undefined>(undefined);

// Define o componente 'FavoritesProvider', que vai envolver a aplicação e fornecer o contexto global.
export function FavoritesProvider(props: { children: React.ReactNode }) {
  // Estado que guarda a lista de livros favoritos.
  const [favoritos, setFavoritos] = useState<Livro[]>(() => {
    const stored = localStorage.getItem("favoritos");
    return stored ? JSON.parse(stored) : [];
  });

  // Quando o componente for montado, tenta carregar os favoritos salvos no localStorage.
  

  // Sempre que a lista de favoritos mudar, salva a nova lista no localStorage.
  useEffect(() => {
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
  }, [favoritos]);

  // Alterna o estado de favorito de um livro.
  // Se o livro já está nos favoritos, remove.
  // Se não está, adiciona.
  function alternarFavorito(book: Livro) {
    setFavoritos((prev) => {
      const exists = prev.find((fav) => fav.key === book.key); // Procura se já está na lista.
      if (exists) {
        // Remove o livro da lista de favoritos.
        return prev.filter((fav) => fav.key !== book.key);
      } else {
        // Adiciona o livro à lista de favoritos.
        return [...prev, book];
      }
    });
  }

  // Verifica se um livro está na lista de favoritos.
  function estaFavoritado(book: Livro) {
    return favoritos.some((fav) => fav.key === book.key);
  };

  // Retorna o Provider do contexto, fornecendo os valores para os filhos (children) da aplicação.
  return (
    <FavoritosContext.Provider value={{ favoritos, estaFavoritado, alternarFavorito }}>
      {props.children}
    </FavoritosContext.Provider>
  )
}

// Hook personalizado para acessar o contexto de favoritos de forma mais simples.
// Verifica se está dentro de um provider, e lança erro se não estiver.
export function useFavoritos() {
  const context = useContext(FavoritosContext);
  if (!context) {
    throw new Error("useFavorites deve ser usado dentro de um FavoritesProvider");
  }
  return context;
}

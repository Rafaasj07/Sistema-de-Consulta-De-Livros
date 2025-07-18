// Importa componentes visuais do Chakra UI: Box (container), Heading (título) e SimpleGrid (grid responsiva)
import { Box, Heading, SimpleGrid } from "@chakra-ui/react";

// Importa o hook do contexto de favoritos para acessar os livros salvos
import { useFavoritos } from "../context/FavoritosContext";

// Importa o componente que exibe o cartão visual de um livro
import { CartaoLivro } from "../components/CartaoLivro";

// Importa a interface que representa os dados de um livro
import { Livro } from "../types/Livro";

// Importa o hook useState para gerenciar o estado local (modal e livro selecionado)
import { useState } from "react";

// Importa o componente de modal que mostra os detalhes do livro
import { ModalLivro } from "../components/ModalLivro";

// Componente da página que exibe os livros favoritos.
// Ele obtém a lista de livros favoritos do contexto e os renderiza em uma grade,
// permitindo que o usuário visualize os detalhes de cada livro em um modal.
export const PaginaFavoritos = () => {
  // Obtém a lista de livros favoritos do contexto
  const { favoritos } = useFavoritos();

  // Estado para controlar se o modal está aberto ou fechado
  const [modalAberto, setModalAberto] = useState(false);

  // Estado para guardar o livro que foi clicado e será mostrado no modal
  const [livroSelecionado, setLivroSelecionado] = useState<Livro | null>(null);

  // Função chamada ao clicar em um livro: abre o modal e define o livro selecionado
  function abrirModal(livro: Livro) {
    setLivroSelecionado(livro);
    setModalAberto(true);
  }

  // Função chamada ao fechar o modal: reseta os estados
  function fecharModal() {
    setModalAberto(false);
    setLivroSelecionado(null);
  }

  return (
    // Container da página com padding e espaçamento vertical entre os elementos
    <Box p={8} display='flex' flexDirection='column' gap={3}>
      
      {/* Título da seção */}
      <Heading size={'md'} fontWeight={'bold'}>Meus livros favoritos:</Heading>

      {/* Condicional: se não houver favoritos, mostra uma mensagem. Caso contrário, mostra os livros em grid */}
      {favoritos.length === 0 ? (
        <p>Nenhum livro favorito ainda.</p>
      ) : (
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 5 }} gap={6}>
          {/* Renderiza um cartão para cada livro, com função de clique que abre o modal */}
          {favoritos.map((livro) => (
            <CartaoLivro key={livro.key} livro={livro} onClick={abrirModal} />
          ))}
        </SimpleGrid>
      )}

      {/* Componente de modal para exibir detalhes do livro selecionado */}
      <ModalLivro
        isOpen={modalAberto} // controla se o modal está visível
        onClose={fecharModal} // função chamada para fechar
        livro={livroSelecionado} // livro atual selecionado
      />
    </Box>
  );
};
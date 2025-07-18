// src/components/ModalLivro.tsx

// Importa os componentes de modal e elementos visuais da biblioteca Chakra UI.
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  Image,
  Stack,
  Box,
  Button,
} from "@chakra-ui/react";

// Importa a interface 'Livro', que define a estrutura de dados de um livro.
import { Livro } from "../types/Livro";

// Importa ícones de estrela preenchida e vazia da biblioteca react-icons.
import { FaRegStar, FaStar } from "react-icons/fa6";

// Importa o hook personalizado para acessar o contexto de favoritos.
import { useFavoritos } from "../context/FavoritosContext";

// Define a tipagem das propriedades esperadas pelo componente ModalLivro.
interface ModalLivroProps {
  isOpen: boolean;         // Controla se o modal está aberto ou fechado.
  onClose: () => void;     // Função que fecha o modal.
  livro: Livro | null;     // Livro selecionado (pode ser null).
}

// Componente que renderiza um modal com os detalhes do livro.
export function ModalLivro({ isOpen, onClose, livro }: ModalLivroProps) {
  // Se não houver um livro selecionado, não renderiza nada.
  if (!livro) return null;

  // Obtém as funções do contexto de favoritos.
  const { estaFavoritado, alternarFavorito } = useFavoritos();

  return (
    // Componente Modal do Chakra UI. Renderiza sobre a tela e é centralizado.
    <Modal isOpen={isOpen} onClose={onClose} size="3xl" isCentered>
      <ModalOverlay /> {/* Fundo escurecido por trás do modal */}

      <ModalContent>
        <ModalHeader>{livro.title}</ModalHeader> {/* Título no topo do modal */}
        <ModalCloseButton /> {/* Botão de fechar (ícone "X") no canto superior direito */}

        <ModalBody>
          {/* Stack define a estrutura horizontal no desktop e vertical no mobile */}
          <Stack direction={{ base: "column", md: "row" }} spacing={6}>
            
            {/* Lado esquerdo: capa do livro */}
            <Box flexShrink={0}>
              {livro.cover_i ? (
                // Se houver capa, exibe a imagem
                <Image
                  src={`https://covers.openlibrary.org/b/id/${livro.cover_i}-L.jpg`}
                  alt={`Capa do livro ${livro.title}`}
                  width={{ base: "50%", md: "100%" }} // 50% no mobile, 100% no desktop
                  marginX={"auto"} // Centraliza horizontalmente no mobile
                  objectFit="cover" // Mantém proporção sem distorcer
                  borderRadius="md" // Cantos arredondados
                />
              ) : (
                // Se não houver imagem, exibe uma caixa cinza com mensagem
                <Box
                  boxSize="200px"
                  bg="gray.100"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text color="gray.500">Sem capa</Text>
                </Box>
              )}
            </Box>

            {/* Lado direito: informações + botão */}
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              flex="1"
            >
              {/* Informações sobre o livro */}
              <Box>
                <Text fontSize={'lg'}>
                  <strong>Título:</strong> {livro.title || "Desconhecido"}
                </Text>
                <Text fontSize={'lg'}>
                  <strong>Autores:</strong> {livro.author_name?.join(", ") || "Desconhecido"}
                </Text>
                <Text fontSize={'lg'}>
                  <strong>Editora:</strong> {livro.publisher?.join(", ") || "Não informada"}
                </Text>
                <Text fontSize={'lg'}>
                  <strong>Ano de publicação:</strong> {livro.first_publish_year || "Desconhecido"}
                </Text>
                <Text fontSize={'lg'}>
                  <strong>Nº de páginas:</strong> {livro.number_of_pages_median || "Desconhecido"}
                </Text>
              </Box>

              {/* Botão que alterna entre adicionar ou remover dos favoritos */}
              {
                estaFavoritado(livro)
                ? (
                  // Se já for favorito, mostra botão de "Adicionado aos favoritos"
                  <Button
                    colorScheme="yellow"
                    gap={5}
                    fontSize={'lg'}
                    onClick={() => alternarFavorito(livro)}
                  >
                    <FaStar /> {/* Ícone de estrela cheia */}
                    Adicionado aos favoritos!
                  </Button>
                )
                : (
                  // Se não for favorito ainda, mostra botão de "Adicionar"
                  <Button
                    colorScheme="yellow"
                    gap={5}
                    fontSize={'lg'}
                    onClick={() => alternarFavorito(livro)}
                  >
                    <FaRegStar /> {/* Ícone de estrela vazia */}
                    Adicionar aos favoritos
                  </Button>
                )
              }
            </Box>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

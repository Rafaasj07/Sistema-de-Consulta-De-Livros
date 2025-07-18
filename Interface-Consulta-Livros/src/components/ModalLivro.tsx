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

import { Livro } from "../types/Livro";
import { FaRegStar, FaStar } from "react-icons/fa6";
import { useFavoritos } from "../context/FavoritosContext";

interface ModalLivroProps {
  isOpen: boolean;
  onClose: () => void;
  livro: Livro | null;
}

export function ModalLivro({ isOpen, onClose, livro }: ModalLivroProps) {
  if (!livro) return null;

  const { estaFavoritado, alternarFavorito } = useFavoritos();

  // O componente ModalLivro exibe um modal com os detalhes de um livro.
  // Ele recebe props para controlar sua visibilidade (isOpen), uma função para fechar (onClose)
  // e o objeto livro cujos detalhes serão exibidos.
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl" isCentered>
      <ModalOverlay
        bg="rgba(0, 0, 0, 0.75)"
        backdropFilter="blur(6px)"
      />
      <ModalContent
        bg="#121212"
        borderRadius="md"
        boxShadow="0 0 20px rgba(0,0,0,0.7)"
      >
        <ModalHeader
          color="#F1F1F1"
          fontWeight="bold"
          fontSize={{ base: "2xl", md: "3xl" }}
          borderBottom="1px solid #2C2C2C"
          pb={3}
        >
          {livro.title}
        </ModalHeader>
        <ModalCloseButton
          _hover={{ bg: "rgba(255,255,255,0.1)" }}
          color="#B0B0B0"
        />
        <ModalBody>
          <Stack direction={{ base: "column", md: "row" }} spacing={8}>
            {/* Capa do livro */}
            <Box
              flexShrink={0}
              border="1px solid #2C2C2C"
              borderRadius="md"
              overflow="hidden"
              w={{ base: "60%", md: "35%" }}
              mx="auto"
            >
              {livro.cover_i ? (
                <Image
                  src={`https://covers.openlibrary.org/b/id/${livro.cover_i}-L.jpg`}
                  alt={`Capa do livro ${livro.title}`}
                  w="100%"
                  h="100%"
                  objectFit="cover"
                  transition="transform 0.3s ease"
                  _hover={{ transform: "scale(1.05)" }}
                />
              ) : (
                <Box
                  boxSize="200px"
                  bg="#1E1E1E"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  color="#B0B0B0"
                  fontWeight="medium"
                  fontSize="lg"
                  userSelect="none"
                >
                  Sem capa
                </Box>
              )}
            </Box>

            {/* Informações e botão */}
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              flex="1"
              color="#F1F1F1"
            >
              <Box mb={6} lineHeight="1.5">
                <Text fontSize="lg" mb={2}>
                  <Text as="span" color="#B0B0B0" fontWeight="semibold">
                    Título:
                  </Text>{" "}
                  {livro.title || "Desconhecido"}
                </Text>

                <Text fontSize="lg" mb={2}>
                  <Text as="span" color="#B0B0B0" fontWeight="semibold">
                    Autores:
                  </Text>{" "}
                  {livro.author_name?.join(", ") || "Desconhecido"}
                </Text>

                <Text fontSize="lg" mb={2}>
                  <Text as="span" color="#B0B0B0" fontWeight="semibold">
                    Editora:
                  </Text>{" "}
                  {livro.publisher?.join(", ") || "Não informada"}
                </Text>

                <Text fontSize="lg" mb={2}>
                  <Text as="span" color="#B0B0B0" fontWeight="semibold">
                    Ano de publicação:
                  </Text>{" "}
                  {livro.first_publish_year || "Desconhecido"}
                </Text>

                <Text fontSize="lg" mb={2}>
                  <Text as="span" color="#B0B0B0" fontWeight="semibold">
                    Nº de páginas:
                  </Text>{" "}
                  {livro.number_of_pages_median || "Desconhecido"}
                </Text>
              </Box>

              <Button
                colorScheme="yellow"
                size="lg"
                fontSize="lg"
                gap={3}
                bg={estaFavoritado(livro) ? "#FFD700" : "#3C91E6"}
                color={estaFavoritado(livro) ? "#121212" : "#F1F1F1"}
                _hover={{
                  bg: estaFavoritado(livro) ? "#e6c200" : "#347CC1",
                }}
                onClick={() => alternarFavorito(livro)}
                leftIcon={
                  estaFavoritado(livro) ? (
                    <FaStar color="#FFD700" />
                  ) : (
                    <FaRegStar />
                  )
                }
                borderRadius="md"
                boxShadow="md"
                transition="background-color 0.3s ease"
              >
                {estaFavoritado(livro)
                  ? "Adicionado aos favoritos!"
                  : "Adicionar aos favoritos"}
              </Button>
            </Box>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
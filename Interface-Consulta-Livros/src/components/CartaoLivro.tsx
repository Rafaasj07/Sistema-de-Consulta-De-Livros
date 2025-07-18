import { Box, Image, Text, Heading, VStack, IconButton  } from '@chakra-ui/react';
// Importa o "tipo" (interface) Livro para garantir que os dados recebidos estão corretos.
import type { Livro } from '../types/Livro';
import { FaRegStar, FaStar } from "react-icons/fa6"; // Ícone do favorito (estrelas)
//Importa o contexto de favoritos
import { useFavoritos } from '../context/FavoritosContext';


// Define a "forma" (interface) das propriedades que este componente espera receber.
interface CartaoLivroProps {
  livro: Livro; // Espera um objeto 'livro' com a estrutura definida em 'Livro'.
  onClick: (livro: Livro) => void // Espera uma função para ser executada quando clicado
}

// Exporta um componente funcional que recebe as informações de um livro e as exibe.
// Ele renderiza um cartão visual para cada livro, incluindo a capa, título, autor e ano,
// além de um botão para adicionar/remover o livro dos favoritos.
export function CartaoLivro({ livro, onClick }: CartaoLivroProps) {
  // Define a URL da imagem da capa, ou uma imagem padrão caso não exista.
  const urlCapa = livro.cover_i
    ? `https://covers.openlibrary.org/b/id/${livro.cover_i}-M.jpg`
    : 'https://via.placeholder.com/200x300.png?text=Sem+Capa';

  // Pega as funções de manipulação dos favoritos
  const { estaFavoritado, alternarFavorito } = useFavoritos();

  // Retorna o JSX que representa o cartão do livro.
  return (
    // 'Box' é o container principal do cartão, com borda, sombra e efeitos de hover.
    <Box
      borderWidth="1px"
      borderRadius="xl"
      overflow="hidden"
      shadow="sm"
      _hover={{ shadow: 'lg', transform: 'scale(1.02)', transition: '0.2s', cursor: 'pointer' }}
      bg="#1E1E1E"
      borderColor="	#2C2C2C"
      w="100%"
      maxW="300px"
      position={'relative'}
      onClick={() => onClick(livro)}
    >
      {/* 'Image' exibe a capa do livro, garantindo que ela preencha o espaço definido. */}
      <Image
        src={urlCapa}
        alt={`Capa do livro ${livro.title}`}
        w="100%"
        h="300px"
        objectFit="cover"
      />

      {/* Botão para alternar se o livro está favoritado ou não */}
      <IconButton 
        aria-label="Alternar Favorito" 
        size={"sm"} rounded={"full"} 
        position={"absolute"} 
        top={3} 
        right={3}
        onClick={(event) => {
          event.stopPropagation();
          alternarFavorito(livro)
        }}
      >
        {
          estaFavoritado(livro)
          ?
            <FaStar color='#FFD700'/>
          :
            <FaRegStar color='#FFD700'/>
        }
      </IconButton>

      {/* 'VStack' empilha as informações de texto verticalmente com espaçamento e alinhamento. */}
      <VStack p={4} align="start" spacing={2}>
        {/* 'Heading' para o título. 'isTruncated' adiciona "..." se o texto for muito longo. */}
        <Heading as="h3" color="#F1F1F1" fontSize="lg" isTruncated title={livro.title}>
          {livro.title}
        </Heading>

        {/* 'Text' para o autor. 'noOfLines={2}' limita o texto a no máximo duas linhas. */}
        <Text fontSize="md" color="	#B0B0B0" noOfLines={2}>
          {livro.author_name?.join(', ') || 'Autor desconhecido'}
        </Text>

        {/* 'Text' para o ano de publicação. */}
        <Text fontSize="sm" color="#B0B0B0">
          Ano: {livro.first_publish_year || 'N/A'}
        </Text>
      </VStack>
    </Box>
  );
}
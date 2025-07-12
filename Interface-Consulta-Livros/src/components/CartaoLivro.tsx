import { Box, Image, Text, Heading, VStack } from '@chakra-ui/react';
// Importa o "tipo" (interface) Livro para garantir que os dados recebidos estão corretos.
import type { Livro } from '../types/Livro';

// Define a "forma" (interface) das propriedades que este componente espera receber.
interface CartaoLivroProps {
  livro: Livro; // Espera um objeto 'livro' com a estrutura definida em 'Livro'.
}

// Exporta um componente funcional que recebe as informações de um livro e as exibe.
export function CartaoLivro({ livro }: CartaoLivroProps) {
  // Define a URL da imagem da capa, ou uma imagem padrão caso não exista.
  const urlCapa = livro.cover_i
    ? `https://covers.openlibrary.org/b/id/${livro.cover_i}-M.jpg`
    : 'https://via.placeholder.com/200x300.png?text=Sem+Capa';

  // Retorna o JSX que representa o cartão do livro.
  return (
    // 'Box' é o container principal do cartão, com borda, sombra e efeitos de hover.
    <Box
      borderWidth="1px"
      borderRadius="xl"
      overflow="hidden"
      shadow="sm"
      _hover={{ shadow: 'lg', transform: 'scale(1.02)', transition: '0.2s' }}
      bg="white"
      w="100%"
      maxW="300px"
    >
      {/* 'Image' exibe a capa do livro, garantindo que ela preencha o espaço definido. */}
      <Image
        src={urlCapa}
        alt={`Capa do livro ${livro.title}`}
        w="100%"
        h="300px"
        objectFit="cover"
      />

      {/* 'VStack' empilha as informações de texto verticalmente com espaçamento e alinhamento. */}
      <VStack p={4} align="start" spacing={2}>
        {/* 'Heading' para o título. 'isTruncated' adiciona "..." se o texto for muito longo. */}
        <Heading as="h3" fontSize="lg" isTruncated title={livro.title}>
          {livro.title}
        </Heading>

        {/* 'Text' para o autor. 'noOfLines={2}' limita o texto a no máximo duas linhas. */}
        <Text fontSize="md" color="gray.700" noOfLines={2}>
          {livro.author_name?.join(', ') || 'Autor desconhecido'}
        </Text>

        {/* 'Text' para o ano de publicação. */}
        <Text fontSize="sm" color="gray.500">
          Ano: {livro.first_publish_year || 'N/A'}
        </Text>
      </VStack>
    </Box>
  );
}
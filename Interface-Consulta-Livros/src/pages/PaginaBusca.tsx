import { useState } from 'react';
// Importa o hook 'useQuery' do React Query para buscar, cachear e gerenciar dados de API.
import { useQuery } from '@tanstack/react-query';
// Importa a função que faz a chamada para a API da Open Library.
import { buscarLivros } from '../services/servicoOpenLibrary';
// Importa o componente que exibe as informações de um único livro.
import { CartaoLivro } from '../components/CartaoLivro';

// Importa componentes de UI pré-estilizados da biblioteca Chakra UI.
import {
  Box,
  Button,
  Input,
  SimpleGrid,
  Spinner,
  Text,
  Alert,
  AlertIcon,
  AlertTitle,
  Stack,
} from '@chakra-ui/react';


export function PaginaBusca() {
  // Cria estados para controlar o texto do input, a página atual e o termo que foi de fato pesquisado.
  const [termoBusca, setTermoBusca] = useState('');
  const [pagina, setPagina] = useState(1);
  const [termoAtivo, setTermoAtivo] = useState('');

  // 'useQuery' gerencia a chamada à API.
  const { data, isPending, isError } = useQuery({
    // Chave única para esta busca. O React Query a usa para cache. A busca é refeita se 'termoAtivo' or 'pagina' mudar.
    queryKey: ['livros', termoAtivo, pagina],
    // A função que executa a busca.
    queryFn: () => buscarLivros({ termo: termoAtivo, pagina }),
    // Habilita a busca apenas se 'termoAtivo' não for uma string vazia.
    enabled: !!termoAtivo,
  });

  // Função chamada quando o formulário de busca é enviado.
  const lidarComBusca = (evento: React.FormEvent) => {
    evento.preventDefault(); // Impede o recarregamento padrão da página.
    if (!termoBusca) return; // Não faz nada se o campo estiver vazio.
    setPagina(1); // Reseta para a primeira página a cada nova busca.
    setTermoAtivo(termoBusca); // Define o termo ativo, o que dispara o 'useQuery'.
  };

  // Retorna o JSX que será renderizado na tela.
  return (
    // 'Box' é um container principal com padding.
    <Box p={8}>
      {/* 'Stack' organiza o formulário de busca, tornando-o responsivo (coluna no mobile, linha no desktop). */}
      <Stack
        as="form"
        direction={{ base: 'column', md: 'row' }}
        mb={8}
        spacing={4}
        onSubmit={lidarComBusca}
        align="stretch"
      >
        {/* 'Input' é o campo de texto para o usuário digitar a busca. */}
        <Input
          placeholder="Digite o título do livro..."
          value={termoBusca}
          onChange={(e) => setTermoBusca(e.target.value)}
          size="lg"
          fontSize={{ base: 'md', md: 'xl' }}
          height={{ base: '44px', md: '56px' }}
          width={{ base: '100%', md: '500px' }}
        />
        {/* 'Button' para submeter a busca. 'isLoading' mostra um spinner no botão durante a busca. */}
        <Button
          type="submit"
          colorScheme="teal"
          isLoading={isPending && !!termoAtivo}
          size="lg"
          fontSize={{ base: 'md', md: 'xl' }}
          height={{ base: '44px', md: '56px' }}
          width={{ base: '100%', md: 'auto' }}
        >
          Buscar
        </Button>
      </Stack>

      {/* Renderização condicional: mostra o 'Spinner' de carregamento se a busca estiver pendente. */}
      {isPending && termoAtivo && <Spinner size="xl" display="block" mx="auto" my={4} />}

      {/* Renderização condicional: mostra um 'Alert' de erro se a busca falhar. */}
      {isError && (
        <Alert status="error" my={4}>
          <AlertIcon />
          <AlertTitle>Ocorreu um erro ao buscar os livros.</AlertTitle>
        </Alert>
      )}

      {/* 'SimpleGrid' cria uma grade responsiva para exibir os resultados da busca. */}
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 5 }} gap={6}>
        {/* Mapeia os dados recebidos ('data.docs') e renderiza um 'CartaoLivro' para cada livro. */}
        {data?.docs.map((livro) => (
          <CartaoLivro key={livro.key} livro={livro} />
        ))}
      </SimpleGrid>

      {/* Renderização condicional: mostra os controles de paginação apenas se houver resultados. */}
      {data && data.docs.length > 0 && (
        // 'Stack' organiza os botões e o texto da paginação.
        <Stack
          direction={{ base: 'column-reverse', sm: 'row' }}
          justify="center"
          align="center"
          mt={8}
          spacing={4}
        >
          {/* Botão para voltar para a página anterior. */}
          <Button
            colorScheme="teal"
            variant="outline"
            onClick={() => setPagina((p) => Math.max(p - 1, 1))}
            isDisabled={pagina === 1}
          >
            ← Anterior
          </Button>

          {/* Exibe o número da página atual. */}
          <Text fontSize="lg" fontWeight="medium">
            Página {pagina}
          </Text>

          {/* Botão para avançar para a próxima página. */}
          <Button
            colorScheme="teal"
            onClick={() => setPagina((p) => p + 1)}
            isDisabled={data.docs.length < 10} // Desabilitado se a página atual não estiver cheia.
          >
            Próxima →
          </Button>
        </Stack>
      )}
    </Box>
  );
}
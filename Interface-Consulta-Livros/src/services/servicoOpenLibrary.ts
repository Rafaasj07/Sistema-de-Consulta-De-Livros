import api from './api';
// Importa o "tipo" (interface) que define a estrutura da resposta da API.
import type { ResultadoBuscaLivros } from '../types/Livro';

// Define a "forma" (interface) dos parâmetros que a função de busca espera receber.
interface ParametrosBusca {
  termo: string; // O texto a ser pesquisado.
  pagina: number; // O número da página de resultados.
}

// Exporta uma função assíncrona para buscar livros na API.
// Ela recebe um objeto com 'termo' e 'pagina' e retorna uma promessa com os resultados.
export const buscarLivros = async ({ termo, pagina }: ParametrosBusca): Promise<ResultadoBuscaLivros> => {
  // Faz uma requisição GET para o endpoint '/search.json' usando a instância 'api'.
  // O 'await' pausa a execução até que a requisição seja concluída.
  const { data } = await api.get<ResultadoBuscaLivros>('/search.json', {
    // Define os parâmetros da URL da requisição (ex: ?q=...&page=...).
    params: {
      q: termo, // O termo da busca.
      page: pagina, // O número da página.
      limit: 10, // Limita a resposta a 10 livros por página.
    },
  });
  // Retorna apenas os dados ('data') da resposta da API.
  return data;
};
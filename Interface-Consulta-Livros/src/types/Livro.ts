// Define a "forma" (interface) de um objeto Livro, especificando os tipos de cada campo.
// O '?' indica que um campo é opcional e pode não estar presente na resposta da API.
export interface Livro {
  key: string; // ID único do livro na API.
  title: string; // Título do livro.
  author_name?: string[]; // Array com o nome dos autores.
  first_publish_year?: number; // Ano da primeira publicação.
  cover_i?: number; // ID da imagem da capa.
  publisher?: string[]; // Array com os nomes das editoras.
  number_of_pages_median?: number; // Mediana do número de páginas.
}

// Define a "forma" (interface) da resposta completa que a API de busca retorna.
export interface ResultadoBuscaLivros {
  docs: Livro[]; // 'docs' é um array de objetos, onde cada objeto é do tipo 'Livro'.
  numFound: number; // 'numFound' é o número total de resultados encontrados para a busca.
}
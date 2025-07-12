// Importa a biblioteca 'axios' para fazer requisições HTTP (chamar APIs).
import axios from 'axios';

// Cria uma instância do axios com configurações pré-definidas.
const api = axios.create({
  // Define a URL base para todas as requisições feitas com esta instância.
  // Assim, você não precisa repetir 'https://openlibrary.org' em toda chamada.
  baseURL: 'https://openlibrary.org',
});

// Exporta a instância 'api' para ser usada em outras partes do seu projeto.
export default api;
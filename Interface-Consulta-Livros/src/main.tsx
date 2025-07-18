import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ChakraProvider } from '@chakra-ui/react';
import App from './App.tsx';
import { FavoritesProvider } from './context/FavoritosContext.tsx';

// Cria uma instância do cliente do React Query para gerenciar o cache.
const queryClient = new QueryClient();

// Renderiza a aplicação na <div id="root"> do seu HTML.
ReactDOM.createRoot(document.getElementById('root')!).render(
  // Ativa checagens e avisos extras para desenvolvimento.
  <React.StrictMode>
     {/* Habilita o sistema de rotas para a aplicação. */}
    <BrowserRouter>
     {/* Disponibiliza o cliente do React Query para toda a árvore de componentes. */}
      <QueryClientProvider client={queryClient}>
        {/* Aplica o sistema de design do Chakra UI a todos os componentes filhos. */}
        <ChakraProvider>
          {/* Aplica o contexto da lista de favoritos a todos os componentes filhos. */}
          <FavoritesProvider>
            {/* O componente principal que contém toda a aplicação. */}
            <App />
          </FavoritesProvider>
        </ChakraProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
# 📚 **Sistema de Consulta de Livros**

Este projeto é uma aplicação web interativa desenvolvida com React e TypeScript, que permite aos usuários buscar, visualizar detalhes e gerenciar uma lista de livros favoritos. Ele consome a [Open Library Search API](https://openlibrary.org/dev/docs/api/search) para obter dados de livros de forma eficiente e otimizada.

O foco principal foi na implementação de uma experiência de usuário fluida, com gerenciamento de estado avançado, persistência de dados e um design responsivo.

## ✨ **Status do Projeto**

O projeto está **concluído** em termos de funcionalidades principais, oferecendo uma experiência completa de busca e gerenciamento de favoritos. O design é responsivo e adaptável a diferentes tamanhos de tela.

### ✅ **Funcionalidades Implementadas**

  * **Listagem de Livros:**

      * **Consumo da API:** Integração com a Open Library Search API utilizando **Axios** para requisições HTTP e **React Query (@tanstack/react-query)** para gerenciamento de cache, estados de carregamento e erros.
      * **Exibição Detalhada:** Os resultados são exibidos em uma grade responsiva (`SimpleGrid` do Chakra UI), mostrando o título, autor(es), ano de publicação e a imagem da capa do livro. Um placeholder é exibido caso a capa não esteja disponível.
      * **Tratamento de Dados:** Lida elegantemente com casos onde informações como autor ou ano podem estar ausentes na resposta da API.

  * **Busca Interativa:**

      * Um campo de entrada (`Input` do Chakra UI) permite buscar livros por título.
      * A busca é otimizada e acionada apenas quando o usuário submete o formulário (clica no botão "Buscar" ou pressiona Enter), minimizando requisições desnecessárias.

  * **Paginação Inteligente:**

      * Implementação de botões "Próxima" e "Anterior" para navegação entre as páginas de resultados da API.
      * O botão "Anterior" é automaticamente desabilitado na primeira página para evitar navegação inválida.
      * O botão "Próxima" é desabilitado quando a API indica que não há mais resultados (baseado na quantidade de itens retornados).

  * **Página de Detalhes (Modal):**

      * Ao clicar em qualquer `CartaoLivro` (seja na página de busca ou de favoritos), um modal (`ModalLivro`) é exibido com informações mais detalhadas sobre o livro, como editora e número de páginas.
      * Este modal também integra a funcionalidade de "favoritar/desfavoritar" o livro.

  * **Sistema de Favoritos Completo:**

      * **Context API:** Utiliza o `React Context` (`FavoritosContext.tsx`) para gerenciar o estado global dos livros favoritos.
      * **Persistência de Dados:** A lista de favoritos é automaticamente salva no `localStorage` do navegador, garantindo que os livros favoritados permaneçam salvos mesmo após o usuário fechar e reabrir o navegador.
      * **Interação em Cartões e Modal:** Os usuários podem favoritar/desfavoritar livros tanto a partir do ícone de estrela nos cartões de livro (`CartaoLivro.tsx`) quanto através do botão dedicado no modal de detalhes (`ModalLivro.tsx`).
      * O ícone de estrela e o texto do botão no modal mudam dinamicamente para indicar o status de favorito.

  * **Página de Favoritos Dedicada:**

      * Uma rota específica (`/favoritos`) exibe apenas os livros que foram marcados como favoritos pelo usuário.
      * Esta página também permite visualizar os detalhes dos livros favoritos através do mesmo `ModalLivro`.

  * **Gerenciamento de Estado da UI:**

      * **Indicadores Visuais:** Um `Spinner` (indicador de carregamento) é exibido durante as buscas à API para melhorar a experiência do usuário.
      * **Feedback de Erro:** Mensagens de erro (`Alert` do Chakra UI) são exibidas de forma clara caso a comunicação com a API falhe, informando o usuário sobre possíveis problemas.

  * **Design Responsivo:**

      * Todo o layout da aplicação foi construído com base nos princípios de responsividade do Chakra UI, adaptando-se perfeitamente a telas de desktops, tablets e dispositivos móveis. A grade de livros, por exemplo, ajusta dinamicamente o número de colunas.

## 🛠️ **Tecnologias Utilizadas**

Este projeto foi construído com as seguintes tecnologias e bibliotecas:

  * **React 18:** Biblioteca JavaScript para construção de interfaces de usuário reativas e componentizadas.
  * **TypeScript:** Superset do JavaScript que adiciona tipagem estática, proporcionando maior segurança, legibilidade e manutenibilidade ao código.
  * **Chakra UI v2:** Um framework de componentes React que oferece um conjunto de blocos de construção de UI acessíveis e altamente personalizáveis, facilitando o desenvolvimento de interfaces bonitas e responsivas.
  * **React Query v5 (`@tanstack/react-query`):** Uma poderosa biblioteca para gerenciamento de estado de servidor (server state), caching, sincronização e atualização de dados assíncronos em aplicações React. Reduz significativamente a quantidade de código boilerplate.
  * **Axios:** Cliente HTTP baseado em Promises para o navegador e Node.js, utilizado para fazer as requisições à API da Open Library.
  * **React Router DOM v6:** Biblioteca para roteamento declarativo em aplicações React, permitindo a navegação entre diferentes páginas (`/` para busca e `/favoritos`).
  * **Local Storage:** API do navegador utilizada para persistir a lista de livros favoritos no lado do cliente, garantindo que os dados não sejam perdidos ao fechar o navegador.
  * **React Icons:** Biblioteca que oferece uma vasta coleção de ícones populares (como Font Awesome, Material Design, etc.) para serem usados facilmente como componentes React (ex: `FaStar`, `FaRegStar` para favoritos).
  * **Vite:** Uma ferramenta de build e servidor de desenvolvimento frontend moderno, que oferece um ambiente de desenvolvimento extremamente rápido e otimizado.

## 📁 **Estrutura do Projeto**

A estrutura de pastas e arquivos do projeto está organizada de forma modular para facilitar a manutenção e escalabilidade:

```
Interface-Consulta-Livros/              
├── src/
│   ├── assets/             # Imagens e outros recursos estáticos (ex: logo.png)
│   ├── components/         # Componentes React reutilizáveis
│   │   ├── CartaoLivro.tsx # Cartão de exibição de um livro
│   │   └── ModalLivro.tsx  # Modal de detalhes e favoritos de um livro
│   ├── context/            # Contextos globais da aplicação
│   │   └── FavoritosContext.tsx # Contexto para gerenciar livros favoritos
│   ├── pages/              # Páginas principais da aplicação (rotas)
│   │   ├── PaginaBusca.tsx # Página para buscar livros
│   │   └── PaginaFavoritos.tsx # Página para exibir livros favoritos
│   ├── services/           # Módulos para interação com APIs externas
│   │   ├── api.ts          # Configuração da instância Axios
│   │   └── servicoOpenLibrary.ts # Funções para chamar a API da Open Library
│   ├── types/              # Definições de tipos TypeScript (interfaces)
│   │   └── Livro.ts        # Interfaces para o objeto Livro e resultados da API
│   ├── App.tsx             # Componente raiz da aplicação, configura rotas e layout
│   └── main.tsx            # Ponto de entrada da aplicação React, renderiza o App
├── index.html              # Arquivos estático index.html
├── .gitignore              # Arquivos e pastas a serem ignorados pelo Git
├── package.json            # Metadados do projeto e dependências
├── package-lock.json       # Bloqueia as versões exatas das dependências
├── README.md               # Este arquivo!
├── tsconfig.json           # Configurações do TypeScript
├── vite.config.ts          # Configurações do Vite
└── ...outros arquivos de configuração
```

## 🚀 **Deploy**

A versão atual do projeto está disponível para visualização no seguinte link:

**[https://sistema-consulta-livros.netlify.app/](https://sistema-consulta-livros.netlify.app/)**

## ⚙️ **Como Rodar o Projeto Localmente**

Para executar este projeto na sua máquina local, siga os passos abaixo:

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/SEU-USUARIO/NOME-DO-SEU-REPOSITORIO.git
    ```

      * *(Substitua `SEU-USUARIO/NOME-DO-SEU-REPOSITORIO.git` pelo caminho real do seu repositório Git).*

2.  **Acesse a pasta do projeto:**

    ```bash
    cd NOME-DO-SEU-REPOSITORIO/Interface-Consulta-Livros
    ```

      * *(Se o seu clone já estiver na raiz do projeto, pode ser apenas `cd Interface-Consulta-Livros` ou pule este passo).*

3.  **Instale as dependências:**

    ```bash
    npm install
    ```

      * Este comando instalará todas as bibliotecas listadas no `package.json`.

4.  **Inicie o servidor de desenvolvimento:**

    ```bash
    npm run dev
    ```

      * Após executar este comando, a aplicação estará disponível em `http://localhost:5173` (ou outra porta indicada no seu terminal). Ele também ativará o `Hot Module Reloading` para uma experiência de desenvolvimento rápida.


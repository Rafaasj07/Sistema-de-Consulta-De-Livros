// Importa ferramentas de roteamento e componentes/hooks do Chakra UI e React Icons.
import { Routes, Route, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Flex,
  Heading,
  chakra,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  useDisclosure, // Hook do Chakra para controlar estados de abre/fecha (como o Drawer).
} from '@chakra-ui/react';
import { HiMenu } from 'react-icons/hi'; // Ícone de menu (hambúrguer).
import { PaginaBusca } from './pages/PaginaBusca'; // Componente da página de busca.
import { PaginaFavoritos } from './pages/PaginaFavoritos';

// Cria um componente 'NavLink' que une o Link do React Router com o sistema de estilos do Chakra.
const NavLink = chakra(RouterLink);

function App() {
  // O hook 'useDisclosure' gerencia o estado (aberto/fechado) do menu mobile (Drawer).
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    // 'Box' serve como container principal da aplicação.
    <Box>
      {/* 'Flex' cria a barra de navegação superior, com estilos responsivos de padding. */}
      <Flex
        as="nav"
        bg="teal.500"
        p={{ base: 4, md: 6 }}
        color="white"
        align="center"
        justify="space-between"
        shadow="md"
      >
        {/* Título da aplicação com tamanho de fonte responsivo. */}
        <Heading fontSize={{ base: '2xl', md: '4xl' }} ml={2}>
          Consulta de Livros
        </Heading>

        {/* Botão de menu (hambúrguer) que só aparece em telas pequenas (mobile). */}
        <IconButton
          aria-label="Abrir menu"
          icon={<HiMenu />}
          display={{ base: 'flex', md: 'none' }} // Controla a visibilidade: visível no mobile, some no desktop.
          onClick={onOpen} // Abre o Drawer ao ser clicado.
          variant="ghost"
          color="white"
          fontSize="4xl"
        />

        {/* Links de navegação que só aparecem em telas médias e grandes (desktop). */}
        <Flex gap={8} display={{ base: 'none', md: 'flex' }}>
          <NavLink to="/" fontWeight="bold" fontSize="2xl">
            Busca
          </NavLink>
          <NavLink to="/favoritos" fontWeight="bold" fontSize="2xl" mr={5}>
            Favoritos
          </NavLink>
        </Flex>
      </Flex>

      {/* O Drawer (menu lateral) para a versão mobile. Controlado pelo 'useDisclosure'. */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="teal.500" color="white">
          <DrawerCloseButton fontSize="xl" top={4} right={5} />
          <DrawerHeader fontSize="2xl">Menu</DrawerHeader>
          <DrawerBody>
            {/* Links de navegação dentro do menu mobile. */}
            <Flex direction="column" gap={4} mt={3}>
              <NavLink to="/" onClick={onClose} fontSize="xl" fontWeight="bold">
                Busca
              </NavLink>
              <NavLink to="/favoritos" onClick={onClose} fontSize="xl" fontWeight="bold">
                Favoritos
              </NavLink>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* 'main' é a área principal onde o conteúdo das páginas é renderizado. */}
      <main>
        {/* 'Routes' define a área onde o conteúdo da página será trocado dinamicamente. */}
        <Routes>
          {/* 'Route' mapeia uma URL (path) para um componente específico (element). */}
          <Route path="/" element={<PaginaBusca />} />
          <Route path="/favoritos" element={<PaginaFavoritos/>} />
        </Routes>
      </main>
    </Box>
  );
}

// Exporta o componente App para ser usado em outras partes do projeto.
export default App;
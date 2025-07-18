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
  useDisclosure,
  Image,
  HStack,
} from '@chakra-ui/react';
import { HiMenu } from 'react-icons/hi'; // Ícone de menu (hambúrguer).
import { PaginaBusca } from './pages/PaginaBusca'; // Componente da página de busca.
import { PaginaFavoritos } from './pages/PaginaFavoritos';

// Cria um componente 'NavLink' que une o Link do React Router com o sistema de estilos do Chakra.
const NavLink = chakra(RouterLink);

function App() {
  // O hook 'useDisclosure' gerencia o estado (aberto/fechado) do menu mobile (Drawer).
  const { isOpen, onOpen, onClose } = useDisclosure();

  // O componente principal App define a estrutura da interface do usuário.
  // Ele inclui a barra de navegação superior, o menu lateral para mobile e
  // a área principal onde as diferentes páginas são renderizadas via roteamento.
  return (
    // 'Box' serve como container principal da aplicação.
    <Box bg="#121212" minH="100vh" color="#F1F1F1">
      {/* 'Flex' cria a barra de navegação superior, com estilos responsivos de padding. */}
      <Flex
        as="nav"
        bg="#1F1F1F"
        p={{ base: 4, md: 6 }}
        color="#F1F1F1"
        align="center"
        justify="space-between"
        shadow="md"
        h={{ base: "95px", md: "130px" }}
      >
        <HStack spacing={{ base: 1, md: 4 }} align="center" ml={{ base: "0", md: "2" }}>
          {/* Título da aplicação com tamanho de fonte responsivo. */}
          <Heading fontSize={{ base: "2xl", md: "4xl" }} color="#F1F1F1">
            Consulta de Livros
          </Heading>
          {/* Logo ao lado do título */}
          <Image
            src="./src/assets/logo.png"
            alt="Ícone de livro"
            boxSize={{ base: "75px", md: "135px" }}
            mt="2"
          />
        </HStack>

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
        <DrawerContent bg="#1E1E1E" color="white">
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
          <Route path="/favoritos" element={<PaginaFavoritos />} />
        </Routes>
      </main>
    </Box>
  );
}

// Exporta o componente App para ser usado em outras partes do projeto.
export default App;
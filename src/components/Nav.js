'use client'
import { Box, Flex, Text, IconButton, Stack, Collapse, Icon, useColorModeValue, useDisclosure, Spacer } from '@chakra-ui/react';
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import Link from 'next/link';
import Image from 'next/image';

// Definición de los elementos de navegación
const NAV_ITEMS = [
  {
    label: 'Check your captured Pokemons!',
    href: 'captured', 
  },
];

export default function Nav() {
  // Hook para manejar la apertura y cierre del menú en dispositivos móviles
  const { isOpen, onToggle } = useDisclosure();

  return (
    <header>
      <nav>
        {/* Barra de navegación */}
        <Flex
          as="nav"
          bg={useColorModeValue('white', 'gray.800')}
          color={useColorModeValue('gray.600', 'white')}
          minH={'60px'}
          py={{ base: 2 }}
          px={{ base: 8 }}
          borderBottom={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.900')}
          align={'center'}
        >
          {/* Logo */}
          <Flex flex={{ base: 1 }} justify={{ base: 'start', md: 'start' }}>
            <Link href="/">
              <Image src="/logo.jpeg" alt="logo" width={100} height={50} priority placeholder='blur' blurDataURL='data:image/jpeg;base64,...' />
            </Link>
          </Flex>
          
          {/* Espacio entre elementos */}
          <Spacer />

          {/* Menú de escritorio */}
          <Flex
            flex={{ base: 1, md: 'auto' }}
            justify={{ base: 'flex-end', md: 'flex-end' }}
            alignItems="center"
            display={{ base: 'none', md: 'flex' }}
          >
            <DesktopNav />
          </Flex>

          {/* Botón de menú para dispositivos móviles */}
          <Flex
            flex={{ base: 1, md: 'auto' }}
            justify={{ base: 'flex-end', md: 'center' }}
            alignItems="center"
            display={{ base: 'flex', md: 'none' }}
          >
            <IconButton
              onClick={onToggle}
              icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
              variant={'ghost'}
              aria-label={'Toggle Navigation'}
              aria-expanded={isOpen ? 'true' : 'false'}
              aria-haspopup="true"
              aria-controls="mobile-menu"
            />
          </Flex>
        </Flex>

        {/* Menú desplegable en dispositivos móviles */}
        <Collapse in={isOpen} animateOpacity>
          <MobileNav />
        </Collapse>
      </nav>
    </header>
  );
}

// Componente para el menú de escritorio
const DesktopNav = () => {
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('gray.800', 'white');

  return (
    <Stack as="ul" direction={'row'} spacing={1} listStyleType="none">
      {NAV_ITEMS.map((navItem) => (
        <Link href={navItem.href ?? '/'} key={navItem.label}>
          <Text fontSize={'sm'} fontWeight={700} color={linkColor} _hover={{ textDecoration: 'none', color: linkHoverColor }}>
            {navItem.label}
          </Text>
        </Link>
      ))}
    </Stack>
  );
}

// Componente para el menú en dispositivos móviles
const MobileNav = () => {
  return (
    <Stack id="mobile-menu" bg={useColorModeValue('white', 'gray.800')} p={4} display={{ md: 'none' }}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
}

// Componente para un elemento de menú en dispositivos móviles
const MobileNavItem = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack as="li" spacing={4} onClick={children && onToggle}>
      <Link py={2} href={href ?? '/'} _hover={{ textDecoration: 'none' }}>
        <Text fontWeight={600} color={useColorModeValue('gray.600', 'gray.200')}>
          {label}
        </Text>  
      </Link>
    </Stack>
  );
}

import * as React from 'react';
import { Link, Button, Flex, Box, useDisclosure, Icon } from '@chakra-ui/react';

import { motion } from 'framer-motion';

function NavMenu({ link }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box pos="relative">
      <Button
        as="a"
        cursor="pointer"
        colorScheme={'whiteAlpha'}
        color="#eee"
        variant={'ghost'}
        onMouseEnter={onOpen}
        onMouseLeave={onClose}
      >
        {link.label ? link.label : <Icon as={link.icon} w={'6'} h={'6'} />}
      </Button>
      <NavHoverOptions
        onMouseEnter={onOpen}
        onMouseLeave={onClose}
        animate={isOpen ? 'open' : 'closed'}
        options={link.children}
      />
    </Box>
  );
}

function NavHoverOptions({ options, ...props }) {
  return (
    <NavMenuPopup py="3" {...props}>
      <Flex
        as="ul"
        listStyleType={'none'}
        direction={'column'}
        color="gray.800"
      >
        {options.map(option => {
          return (
            <Box
              key={option.label}
              as="li"
              _hover={{
                bg: 'gray.100',
              }}
            >
              <Link
                px="6"
                py="2"
                _hover={{
                  textDecoration: 'none',
                }}
                d="block"
                fontSize={'md'}
                fontWeight="medium"
              >
                {' '}
                {option.label}
              </Link>
            </Box>
          );
        })}
      </Flex>
    </NavMenuPopup>
  );
}

export const MotionBox = motion(Box);

const NavMenuPopup = props => (
  <MotionBox
    border="8px solid black"
    initial="init"
    variants={variants}
    outline="0"
    opacity="0"
    bg="white"
    pos="fixed"
    bottom="0"
    left="2px"
    right="2px"
    shadow="lg"
    rounded="2xl"
    mt="0"
    {...props}
  />
);
const variants = {
  init: {
    opacity: 0,
    y: 'calc(-60.99px)',
    // y: 'calc(-100% - 56.99px)',
    display: 'none',
    transition: {
      duration: 0,
    },
  },
  open: {
    opacity: 1,
    y: 'calc(-50.99px)',
    display: 'block',
    transition: {
      duration: 0.2,
    },
  },
  closed: {
    opacity: 0,
    y: 'calc(-60.99px)',
    transition: {
      duration: 0.2,
    },
    transitionEnd: {
      display: 'none',
    },
  },
};

export default NavMenu;

import React from 'react';

import { Flex } from '@chakra-ui/react';
import NavMenuMobile from './NavMenuMobile';
import { links } from '../_data';

function Navbar() {
  return (
    <Flex
      display={{
        base: 'flex',
        md: 'none',
      }}
      color={'white'}
      pos="fixed"
      bottom={0}
      w="full"
      zIndex={'2'}
      px="4"
      py="4"
      bgColor="gray.900"
      d="flex"
      justifyContent={'space-between'}
    >
      <Flex
        alignItems={'center'}
        justifyContent="space-between"
        flex="1"
        gap="1"
      >
        {links.map(link => {
          return <NavMenuMobile key={link.label} link={link} />;
        })}
      </Flex>
    </Flex>
  );
}

export default Navbar;

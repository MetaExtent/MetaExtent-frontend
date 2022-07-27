import {
    Button,
    ButtonGroup,
    Container,
    Divider,
    IconButton,
    Input,
    Stack,
    Box,
    Icon,
    Text,
    Switch,
} from '@chakra-ui/react';
import * as React from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { Md3DRotation, MdLanguage } from 'react-icons/md';
// import { ReactComponent as Logo } from '../../logo.svg';

export default function Footer() {
    return (
        <Box bg="gray.800" color="white">
            <Container as="footer" maxW="1234" mx="auto" w="91%" role="contentinfo">
                <Stack
                    spacing="8"
                    direction={{ base: 'column', md: 'row' }}
                    justify="space-between"
                    py={{ base: '12', md: '16' }}
                >
                    <Stack spacing={{ base: '6', md: '8' }} align="start">
                        {/* <Logo /> */}
                        <Icon as={Md3DRotation} w={12} h={12} />
                        <Text fontWeight={'bold'} color="muted">
                            EzSwap
                        </Text>
                    </Stack>
                    <Stack
                        direction={{ base: 'column-reverse', md: 'column', lg: 'row' }}
                        spacing={{ base: '12', md: '8' }}
                    >
                        <Stack direction="row" spacing="8">
                            <Stack spacing="4" minW="36" flex="1">
                                <Text fontSize="sm" fontWeight="semibold" color="subtle">
                                    Ipsum
                                </Text>
                                <Stack spacing="3" shouldWrapChildren>
                                    <Button variant="link">Lorem</Button>
                                    <Button variant="link">Lorem</Button>
                                    <Button variant="link">Lorem</Button>
                                </Stack>
                            </Stack>
                            <Stack spacing="4" minW="36" flex="1">
                                <Text fontSize="sm" fontWeight="semibold" color="subtle">
                                    Ipsum
                                </Text>
                                <Stack spacing="3" shouldWrapChildren>
                                    <Button variant="link">Lorem</Button>
                                    <Button variant="link">Lorem</Button>
                                    <Button variant="link">Lorem</Button>
                                </Stack>
                            </Stack>
                        </Stack>
                        <Stack spacing="4">
                            <Text fontSize="sm" fontWeight="semibold" color="subtle">
                                Stay up to date
                            </Text>
                            <Stack
                                spacing="4"
                                direction={{ base: 'column', sm: 'row' }}
                                maxW={{ lg: '360px' }}
                            >
                                <Input placeholder="Enter your email" type="email" required />
                                <Button
                                    variant="solid"
                                    colorScheme={'teal'}
                                    type="submit"
                                    flexShrink={0}
                                >
                                    Subscribe
                                </Button>
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>
                <Divider />
                <Stack
                    pt="8"
                    pb="12"
                    justify="space-between"
                    direction={{ base: 'column-reverse', md: 'row' }}
                    align="center"
                >
                    <Box
                        fontSize="sm"
                        color="subtle"
                        d="flex"
                        alignItems={'center'}
                        gap="2"
                    >
                        <Switch colorScheme={'teal'} />
                        <Icon as={MdLanguage} w="6" h="6" />
                    </Box>
                    <ButtonGroup variant="ghost">
                        <IconButton
                            as="a"
                            href="#"
                            aria-label="LinkedIn"
                            icon={<FaLinkedin fontSize="1.25rem" />}
                        />
                        <IconButton
                            as="a"
                            href="#"
                            aria-label="GitHub"
                            icon={<FaGithub fontSize="1.25rem" />}
                        />
                        <IconButton
                            as="a"
                            href="#"
                            aria-label="Twitter"
                            icon={<FaTwitter fontSize="1.25rem" />}
                        />
                    </ButtonGroup>
                </Stack>
            </Container>
        </Box>
    );
}

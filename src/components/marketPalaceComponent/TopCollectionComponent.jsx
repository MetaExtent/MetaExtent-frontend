import { Avatar, AvatarBadge, Box, Button, Divider, HStack, SimpleGrid, Text, VStack } from '@chakra-ui/react'
import React from 'react';
import avater from '../images/Draft.png';
import { topCollectionData } from './data/sliderData';


function TopCollectionComponent() {
    return (
        <>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
                {topCollectionData.map((data) => (


                    <Box height='90px' borderBottom="1px" borderBottomColor="gray.300" alignItems="left" display="flex" justifyContent="space-between" key={data.id}>

                        <HStack gap={2}>
                            <Text>{data.id}</Text>
                            <Avatar src={data.image}>
                                <AvatarBadge boxSize='1.25em' bg='green.500' />
                            </Avatar>
                            <VStack align="left">
                                <Text fontWeight="bold" mb="-6px">{data.name}</Text>
                                <Text color="alphaWhite.900">Floor price: {data.price}</Text>
                            </VStack>
                        </HStack>
                        <VStack alignItems="center" justifyContent="center">
                            <Text fontWeight="bold" mb="-6px" color="green.600">{data.percentage}</Text>
                            <Text color="alphaWhite.900">{data.amount}</Text>

                        </VStack>

                    </Box>

                ))}


            </SimpleGrid>
            <HStack alignItems="center" justifyContent="center" py="50px">
                <Button textAlign="center" bgColor="blue.400"> Go to Rankings</Button>
            </HStack>
        </>

    )
}

export default TopCollectionComponent
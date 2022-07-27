import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import "swiper/css/navigation";
import { Box, Button, Container, Flex, Heading, HStack, Image, Stack, Text, useColorModeValue, VStack } from '@chakra-ui/react';
import { TrendingAllCategories } from './data/sliderData';
import { Navigation } from "swiper";
import imaage from '../images/componentImages/dev1.jpg';
import pp from '../images/componentImages/11.png';

function TrendingInAllComponent() {
    const textColor = useColorModeValue("gray.600", "whiteAlpha.500");
    return (
        <>
            <Swiper

                breakpoints={{
                    // when window width is >= 640px
                    640: {
                        width: 640,
                        slidesPerView: 1,
                    },
                    // when window width is >= 768px
                    768: {
                        width: 768,
                        slidesPerView: 2,
                    },
                }}
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Pagination, Navigation]}

                className="mySwiper"
            >

                {TrendingAllCategories.map((item, key) => (
                    <SwiperSlide key={item.id}>
                        <Box h="500px" border="1px solid gray" borderRadius="12px" borderColor="gray.200" >
                            <VStack>
                                <Image mb="-30px" borderTopLeftRadius="12px" borderTopRightRadius="12px" h="250px" w="100%" src={item.image} />
                                <Image src={item.pp} h="40px" w="40px" borderRadius="50%" objectFit="cover" border="3px solid white" bgColor="gray.400" />
                                <Text fontWeight="bold" fontSize="21px" marginBottom="-40px">{item.name}</Text>
                                <Text fontSize="16px" color={textColor}><span color='gray.100'>by</span> {item.nameBy}</Text>
                                <Text p="20px" color={textColor} textAlign="center">{item.desc}</Text>
                            </VStack>
                        </Box>
                    </SwiperSlide>

                ))}

            </Swiper>
        </>
    );
}

export default TrendingInAllComponent;
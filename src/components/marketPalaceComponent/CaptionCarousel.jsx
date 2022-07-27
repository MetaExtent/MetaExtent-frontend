import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import "swiper/css/navigation";
import { Box, Button, Container, Flex, Heading, HStack, Stack, Text } from '@chakra-ui/react';
import { NFTCategory } from './data/sliderData';
import { Navigation } from "swiper";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

function CaptionCarousel() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleNFT = (data) => {
        console.log(data);
        console.log(data.value);
        navigate("/nft-profile", { state: { data: data, nft: true } });
    }
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

                {NFTCategory.map((s) => (
                    <SwiperSlide key={s.id}>
                        <Flex height="600px" boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" direction="column" borderRadius="12px" display="flex" justifyContent="space-between" bgImage={s.image} backgroundPosition="center" bgSize="cover" key={s.id} cursor="pointer" onClick={() => handleNFT(s)}>
                            <HStack p="20px" justifyContent="flex-end">
                                <Button>Live</Button>
                            </HStack>
                            <Box p="20px 20px 60px 20px" justifyContent="flex-end">
                                <Heading color="whiteAlpha.900">{s.heading}</Heading>
                                <Text color="whiteAlpha.700">{s.sub}</Text>
                            </Box>
                        </Flex>
                    </SwiperSlide>
                ))}


            </Swiper>
        </>
    );
}

export default CaptionCarousel
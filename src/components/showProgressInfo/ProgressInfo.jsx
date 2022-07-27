import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import React from 'react'

function ProgressInfo(props) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    //console.log(modal);
    return (

        <><Button onClick={onOpen}>Sale Offer</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Hello
                    </ModalBody>


                </ModalContent>
            </Modal>
        </>
    )
}

export default ProgressInfo
import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import UploadFile from "../UploadFile/UploadFile";
import TextareaAutosize from '@mui/base/TextareaAutosize';



const ModalUploadFile = ({ show, handleClose, msj, title }) => {



    return (
        <Modal show={show} onHide={handleClose}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{msj}

                <UploadFile>

                </UploadFile>

                <TextareaAutosize
                    maxRows={4}
                    disabled
                    aria-label="maximum height"
                    defaultValue=""
                    style={{ width: "100%", height: 300, overflow: 'auto', marginTop: 20 }}
                /></Modal.Body>
            <Modal.Footer>


                <Button variant="primary" onClick={handleClose}>
                    Aceptar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalUploadFile;
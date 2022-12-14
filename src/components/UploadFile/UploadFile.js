import axios from 'axios';
import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import InputGroup from 'react-bootstrap/InputGroup';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

class UploadFile extends Component {

    state = {

        // Initially, no file is selected
        selectedFile: null
    };

    // On file select (from the pop up)
    onFileChange = event => {

        // Update the state
        this.setState({ selectedFile: event.target.files[0] });

    };

    // On file upload (click the upload button)
    onFileUpload = () => {
        // Create an object of formData
        const formData = new FormData();

        // Update the formData object
        formData.append(
            "myFile",
            this.state.selectedFile,
            this.state.selectedFile.name
        );

        // Details of the uploaded file
        console.log(this.state.selectedFile);

        // Request made to the backend api
        // Send formData object
        axios.post("http://localhost:8181/cxf/carga/services/csv", formData);
    };

    render() {

        return (

            <>
                <Form>
                    <Row>
                        <Col xs={7}>
                            <Form.Control onChange={this.onFileChange} type="file" />
                        </Col>
                        <Col>
                            <Button onClick={this.onFileUpload} style={{ marginTop: 5 }}>
                                Subir archivo
                            </Button>
                        </Col>

                    </Row>
                </Form>

            </>




        );
    }
}

export default UploadFile;

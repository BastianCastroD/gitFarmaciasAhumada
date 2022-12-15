import axios from 'axios';
import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import * as XLSX from 'xlsx/xlsx.mjs';

class UploadFile extends Component {

    state = {

        // Initially, no file is selected
        selectedFile: null
    };

    // On file select (from the pop up)
    onFileChange = event => {

        // Update the state
        const files = event.target.files[0];
        const file = files;
        const reader = new FileReader();
        reader.onload = (event) => {
            const wb = XLSX.read(event.target.result);
            const sheets = wb.SheetNames;
            if (sheets.length) {
                const rows = XLSX.utils.sheet_to_csv(wb.Sheets[sheets[0]]);
                this.setState({ selectedFile: rows });;
                console.log(rows);
            }
        }
        reader.readAsArrayBuffer(file);
    };

    // On file upload (click the upload button)
    onFileUpload = () => {
        console.log(this.state.selectedFile);
        // Create an object of formData
        // console.log(this.state.selectedFile)
        const formData = new FormData();
        const blob = new Blob([this.state.selectedFile], { type: 'text/csv' });
        console.log(blob);
        // Update the formData object
        formData.append(
            "csv",
            blob,
            "Poliza.csv"
        );
        // Details of the uploaded file

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

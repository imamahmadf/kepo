import React from "react";
import { Button, Modal, Row } from "react-bootstrap";

class Edit extends React.Component {
  state = {
    show: false,
  };

  showModal = (e) => {
    this.setState({ show: e.value });
  };

  render() {
    return (
      <Row>
        <Modal
          show={this.props.muncul}
          onHide={() => this.showModal(!this.state.show)}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Modal heading
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>Anda Berhasil LOGIN</Modal.Body>
          <Modal.Footer>
            <Button
              onClick={() => this.showModal(!this.state.show)}
              variant="secondary"
            >
              Close
            </Button>
            <Button
              onClick={() => this.showModal(!this.state.show)}
              variant="primary"
            >
              Save Username & Password
            </Button>
          </Modal.Footer>
        </Modal>
      </Row>
    );
  }
}

export default Edit;

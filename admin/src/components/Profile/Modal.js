import Modal from 'react-bootstrap/Modal';
import HealthInfo from './healthInfo';

const ImageModal = (props) => {
  return (
    <Modal {...props} size="lg" centered dialogClassName="custom-modal">
      <Modal.Header closeButton className="bg-primary text-white">
        <Modal.Title className="mx-auto">Edit</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center text-dark">
        <HealthInfo id={props.id} onHide={props.onHide} />
      </Modal.Body>
    </Modal>
  );
};

export default ImageModal;

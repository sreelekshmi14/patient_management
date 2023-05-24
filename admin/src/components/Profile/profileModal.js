import Modal from 'react-bootstrap/Modal';
import ProfileEdit from './profileEdit';

const ProfileModal = (props) => {
  console.log(props);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="custom-modal"
    >
      <Modal.Header closeButton className="text-center bg-primary text-white">
        <Modal.Title className="mx-auto">Edit Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body
        className="text-dark "
        style={{ height: '400px', overflowY: 'auto' }}
      >
        <ProfileEdit id={props.id} onHide={props.onHide} />
      </Modal.Body>
    </Modal>
  );
};

export default ProfileModal;

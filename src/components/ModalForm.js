import React from 'react'
import { Button, Icon, Modal } from 'semantic-ui-react'

const ModalForm = (props) => {
  const { open, size,setTrackerData } = props;

  return (
    <>
      

      <Modal
        size={size}
        open={open}
        onClose={() => setTrackerData((e) => ({ ...e, showModal: false }))}
      >
        <Modal.Header>Delete Your Account</Modal.Header>
        <Modal.Content>
          <p>Are you sure you want to delete your account</p>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => setTrackerData((e) => ({ ...e, showModal: false }))}>
            No
          </Button>
          <Button positive onClick={() => setTrackerData((e) => ({ ...e, showModal: false }))}>
            Yes
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  )
}

export default ModalForm

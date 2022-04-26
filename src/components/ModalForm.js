import React from 'react';
import TrackerForm from './TackerForm';
import {  Modal } from 'semantic-ui-react';

const ModalForm = (props) => {
  const { open, size,trackerData,setTrackerData,handleSubmit,handleUpdate } = props;

  return (
    <>
      

      <Modal
        size={size}
        open={open}
        onClose={() => setTrackerData((e) => ({ ...e, showForm: false }))}
      >
        <Modal.Header>Create Your Entry</Modal.Header>
        <Modal.Content>
        {trackerData.showForm && <TrackerForm trackerData={trackerData} setTrackerData={setTrackerData} handleSubmit={handleSubmit} handleUpdate={handleUpdate} />}
        </Modal.Content>
      </Modal>
    </>
  )
}

export default ModalForm

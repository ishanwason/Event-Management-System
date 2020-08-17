import React from 'react';
import { Modal, ModalHeader, ModalBody, Label, Badge, ModalFooter, Button } from 'reactstrap'
import moment from 'moment'
import TimePicker from 'rc-time-picker'
const EventDetails = (props) => {
    const details = props.details;

    return (
        <Modal isOpen={props.open} toggle={props.closeModal}>
            <ModalHeader className='bg-dark text-white'>Event Details</ModalHeader>
            <ModalBody className='d-flex flex-column'>
                <Label className='d-flex  p-2'>
                    <strong>Name:</strong>
                    <p className='ml-4'>{details.name}</p>
                </Label>
                <Label className='d-flex p-2'>
                    <strong>Date :</strong>
                    <p className='ml-4'>{moment(details.date).format('DD MMM,YYYY')}</p>
                </Label>
                <Label className='d-flex p-2'>
                    <strong>Time :</strong>
                    <p className='ml-4'>{moment(details.date).format('hh:mm A')}</p>
                </Label>
                <Label className='d-flex p-2'>
                    <strong>Description :</strong>
                    <p className='ml-4'>{details.description}</p>
                </Label>
                <Label className='d-flex align-items-center p-2'>
                    <strong>Scheduled :</strong>
                    <Badge className='ml-4' color={details.isActive ? 'info' : 'danger'}>{details.isActive ? 'Scheduled' : 'Cancelled'}</Badge>
                </Label>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={() => props.closeModal()}>Close</Button>
            </ModalFooter>
        </Modal>
    )
}

export default EventDetails;
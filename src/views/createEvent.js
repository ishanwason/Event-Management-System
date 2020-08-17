import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardBody, Label, Form, Button, Input, Row, Alert } from 'reactstrap';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import moment from 'moment'
import Switch from "react-switch";
import { addEvents } from '../action/events';
import { useSelector, useDispatch } from 'react-redux';
import { REMOVE_ERROR, REMOVE_MESSAGE } from '../action/types';
import { setError, setData } from '../action';
import { Loader } from './loader';
import { Link } from 'react-router-dom';

const CreateEvent = (props) => {
    const event = useSelector(state => state.event);
    const dispatch = useDispatch();

    const [eventDetails, setEventDetails] = useState({ name: '', description: '', date: '', time: '', isActive: false });
    const [eventList, setEventList] = useState([]);
    const [alertMessage, setAlertMessage] = useState('')
    useEffect(() => {
        debugger;
        event.error ? setAlertMessage(event.error) : (event.message && setAlertMessage(event.message))
    }, [event.error, event.message])

    const handleChange = (name, value) => {
        setEventDetails({ ...eventDetails, [name]: value })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const obj = ({ ...eventDetails, date: `${eventDetails.date}T${eventDetails.time}` })
        delete obj.time;
        setEventDetails({ ...eventDetails, name: '', description: '', date: '', time: '', isActive: false, })
        setEventList(eventList.concat(obj));
        e.target.reset();
    }
    const deleteEvent = (event) => {
        const updatedEventList = eventList.filter(item => {
            if (moment(event.date).diff(moment(item.date), 'minute') === 0 && item.name === event.name)
                return false;
            return true;
        })
        setEventList(updatedEventList)
    }

    const submitEvents = () => {
        dispatch(addEvents(eventList));
        setEventList([]);
    }
    const removeError = () => {
        setTimeout(() => {
            setAlertMessage('')
            if (event.message)
                dispatch(setData(REMOVE_MESSAGE))
            if (Event.error)
                dispatch(setError(REMOVE_ERROR))
        }, 3000);
    }
    return (
        <div className='d-flex full-page2 flex-start'>
            {event.isFetching && <Loader />}
            <div className='half-page1'>
                {alertMessage && <Alert color={event.message ? 'dark' : 'danger'}>{alertMessage}</Alert>}
                {alertMessage && removeError()}
                <Card >
                    <CardHeader className='d-flex justify-content-between align-items-center bg-dark text-white'>
                        <div className='d-flex align-items-center bg-dark text-white'>
                            <span className="material-icons">stars</span>
                            <strong>Add Event Details</strong>
                        </div>
                        <Link to='/event/view'>View Events</Link>
                    </CardHeader>
                    <CardBody>
                        <Form className='d-flex flex-column p-3' onSubmit={handleSubmit}>
                            <Label className='d-flex w-100 justify-content-between mt-2'>
                                {/* <Row className=' align-items-center'> */}
                                <strong>Name</strong>
                                <Input type="text" minLength={3} maxLength={50} placeholder="Enter Event Name" required className='ml-2 w-75' name="name" onChange={(e) => handleChange(e.target.name, e.target.value)} />
                                {/* </Row> */}
                            </Label>
                            <Label className='d-flex w-100 justify-content-between mt-2'>
                                <strong>Date</strong>
                                <Input type="date" className='ml-2 w-75' min={moment().format()} required name="date" onChange={(e) => handleChange(e.target.name, e.target.value)} />
                            </Label>
                            <Label className='d-flex w-100 justify-content-between mt-2'>
                                <strong>Time</strong>
                                <TimePicker className='ml-2 w-75' focusOnOpen required placeholder="Select Time" name="time" disabled={!eventDetails.date} showSecond={false} onChange={(e) => handleChange('time', e.format('HH:mm'))} />
                            </Label>
                            <Label className='d-flex w-100 justify-content-between mt-2'>
                                <strong>Description</strong>
                                <Input type="textarea" className='textarea-align  w-75' minLength={5} placeholder="Enter event description" required name="description" onChange={(e) => handleChange(e.target.name, e.target.value)} />
                            </Label>
                            <Label className='d-flex w-100 mt-2'>
                                <strong>Active</strong>
                                {/* <Switch name="isActive" className='ml-4 react-switch' style={{ marginLeft: '40px' }} checked={eventDetails.isActive} onChange={(e) => handleChange('isActive', e)} /> */}
                                <Switch
                                    checked={eventDetails.isActive}
                                    onChange={(e) => handleChange('isActive', e)}
                                    handleDiameter={28}
                                    onColor="#08f"
                                    offColor="#FF0000"
                                    // offHandleColor="#0ff"
                                    // onHandleColor="	#FF0000"
                                    height={30}
                                    // required
                                    width={70}
                                    className="react-switch"
                                    id="small-radius-switch"
                                />
                            </Label>
                            <Row className='d-flex justify-content-center mt-2'>
                                <Button className='w-25' type="submit" color="primary">Add</Button>
                            </Row>
                        </Form>
                    </CardBody>
                </Card>
            </div>
            {!!eventList.length && <Card className='half-page2 ml-3'>
                <CardHeader className='d-flex justify-content-between bg-dark text-white'>Events Created</CardHeader>
                <CardBody className="scroll">
                    {!!eventList.length && <div>
                        <Row className='justify-content-around' style={{ borderBottom: '0.4px solid black' }}>
                            <strong>Name</strong>
                            <strong>Date</strong>
                            <strong> </strong>
                        </Row>
                        {eventList.map((item, index) => (
                            <Row className='justify-content-around' key={index}>
                                <p>{item.name.slice(0, 10)}{item.name.length > 10 && '...'}</p>
                                <p>{moment(item.date).format('DD MMM,YYYY hh:mm A')}</p>
                                <p>
                                    <Button onClick={() => deleteEvent(item)} style={{ display: 'flex', alignItems: 'flex-start', height: '35px', backgroundColor: 'black', color: 'white' }}>
                                        <span className="material-icons"> delete</span></Button>
                                </p>
                            </Row>))}
                    </div>}
                    <Label className='d-flex justify-content-center w-100 mt-3'>
                        <Button color="primary" className='w-25' onClick={submitEvents} >Submit</Button>
                    </Label>
                </CardBody>
            </Card>}
        </div >
    )
}

export default CreateEvent;
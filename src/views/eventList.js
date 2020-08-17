import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getEvents } from '../action/events';
import { pageSize } from '../utils/global';
import { Card, CardHeader, CardBody, Table, Badge, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import moment from 'moment'
import EventDetails from './eventDetail';
import PaginationComponent from './pagination';
import { Loader } from './loader';

const EventList = (props) => {
    const event = useSelector(state => state.event);
    const events = event.events.data;
    const totalEvents = event.events.count;
    const totalPages = Math.ceil(event.events.count / pageSize);
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [openModal, setOpen] = useState(false);
    const [eventDetail, setEventDetails] = useState({})
    const [filter, setFilters] = useState({ fromDate: '', toDate: '' })
    const [invalid, setInvalid] = useState('')
    useEffect(() => {
        if (!event.events.data.length)
            dispatch(getEvents(pageSize, page))

    }, [])
    useEffect(() => {
        const filters = Object.values(filter);
        let valid = true;
        filters.forEach(item => {
            if (!item)
                valid = false;
        })
        if (new Date(filter.fromDate) > new Date(filter.toDate))
            valid = false

        if (valid)
            dispatch(getEvents(pageSize, 1, filter.fromDate, filter.toDate))

    }, [filter])
    const closeModal = () => {
        setOpen(false)
    }
    const handleRowClick = (detail) => {
        setOpen(true);
        setEventDetails(detail)
    }
    const getEventByPages = (page) => {
        dispatch(getEvents(pageSize, page, filter.fromDate, filter.toDate))
        setPage(page);
    }
    const handleFilters = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        if (name === 'fromDate' && new Date(value) > new Date(filter.toDate))
            return setInvalid(name)
        if (name === 'toDate' && new Date(value) < new Date(filter.fromDate))
            return setInvalid(name)
        setInvalid('')
        setFilters({ ...filter, [name]: value })
    }
    return (
        <div className='d-flex full-page1 justify-content-center align-items-center'>
            {event.isFetching && <Loader />}
            <Card className='w-75 mt-4'>
                <CardHeader className='d-flex justify-content-between bg-dark text-white'>
                    <div className='d-flex align-items-center'>
                        <span class="material-icons">stars</span>
                        <strong className='ml-1'>Events List</strong>
                    </div>
                    <Link to='/event/create'>Add Events</Link>
                </CardHeader>
                <CardBody>
                    <div className='d-flex w-25 mb-4'>
                        <div className='d-flex flex-column'>
                            <strong>From Date</strong>
                            <Input type="date" name="fromDate" onChange={handleFilters} invalid={invalid === 'fromDate'} />
                        </div>
                        <div className='d-flex flex-column ml-2'>
                            <strong>To Date</strong>
                            <Input type="date" name="toDate" onChange={handleFilters} invalid={invalid === 'toDate'} />
                        </div>
                    </div>
                    {!events.length && <div className='d-flex justify-content-center align-items-center font-weight-bolder' style={{ fontSize: '30px' }}>
                        <span className="material-icons">error</span>
                        No Events Found
                        </div>}
                    {!!events.length && <Table hover striped>
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Event Name</th>
                                <th>Event Date</th>
                                <th>Event Time</th>
                                <th>Event Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {events.map((item, index) => (
                                <tr key={index} style={{ cursor: 'pointer' }} onClick={() => handleRowClick(item)}>
                                    <td>{page > 1 ? ((pageSize * (page - 1)) + index + 1) : (index + 1)}</td>
                                    <td>{item.name}</td>
                                    <td>{moment(item.date).format('DD MMM,YYYY')}</td>
                                    <td>{moment(item.date).format('hh:mm A')}</td>
                                    <td><Badge color={item.isActive ? 'primary' : 'danger'}>{item.isActive ? 'Scheduled' : 'Cancelled'}</Badge></td>
                                </tr>

                            ))}
                        </tbody>
                    </Table>}
                    <div className='d-flex w-100 justify-content-center'>
                        {!!events.length && <PaginationComponent totalPages={totalPages} currentPage={page} getEventByPages={getEventByPages} />}
                    </div>
                </CardBody>
            </Card>
            {openModal && <EventDetails details={eventDetail} closeModal={closeModal} open={openModal} />}
        </div>
    )
}

export default EventList;
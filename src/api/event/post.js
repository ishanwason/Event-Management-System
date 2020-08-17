const { EventService } = require('../../services')
const { validateEventCreate } = require('../../validation/event')
const moment = require('moment')

const createEventHandler = async (req, res) => {
    const { error } = validateEventCreate(req.body);
    console.log(error)
    if (error)
        return res.send({ message: 'Bad Request', status: 400, success: false })
    try {
        const eventNames = [];
        req.body.forEach(event => {
            eventNames.push(event.name)
        });
        const eventsExist = await EventService.getEvent(eventNames)
        if (eventsExist.length) {
            req.body = req.body.filter(event => {
                const matchedEvent = eventsExist.find(item => {
                    return (item.name === event.name && moment(item.date).diff(moment(event.date), 'minute') === 0)
                });
                if (matchedEvent)
                    return false;
                else
                    return true;
            })
        }
        if (!req.body.length)
            return res.send({ message: 'The Event/Events Already Exists', status: 400, success: false })
        const body = req.body.map(event => {
            return { ...event, createdBy: req.userId, updatedBy: req.userId }
        })
        const createdEvents = await EventService.createEvent(body)
        if (!createdEvents.length)
            return res.send({ message: 'Internal Server Error', status: 409, success: false })
        return res.send({ message: 'Event Created Successfully', payload: createdEvents, status: 201, success: true })
    }
    catch (error) {
        return res.send({ message: 'Something Went Wrong', exception: error.message, status: 500, success: false })
    }
}

module.exports = {
    createEventHandler
}
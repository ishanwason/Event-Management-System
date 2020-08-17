const { EventService } = require('../../services')
const { validateEventList } = require('../../validation')


const getEventListHandler = async (req, res) => {
    const pageNumber = Number(req.query.pageNumber);
    const pageSize = Number(req.query.pageSize);
    const { error } = validateEventList({ ...req.query, pageNumber, pageSize });
    if (error)
        return res.send({ message: 'Bad Request', status: 400, success: false })
    const offset = pageSize * (pageNumber - 1);
    const fromDate = req.query.fromDate;
    const toDate = req.query.toDate;
    try {
        const { rows, count } = await EventService.getEvents(offset, pageSize, fromDate, toDate);
        if (!count)
            return res.send({ message: 'No Events Exists', status: 404, success: false })
        if (!rows.length)
            return res.send({ message: 'No More Events Exists', status: 404, success: false })
        res.send({ payload: { data: rows, count }, status: 200, success: true })
    }
    catch (error) {
        console.log(error.message)
        return res.send({ message: 'Something Went Wrong', exception: error.message, status: 500, success: false })
    }

}

module.exports = {
    getEventListHandler
}


const { Event } = require('./../model');
const { Op } = require('sequelize');


class EventService {
    static async getEvents(offset, limit, fromDate, toDate) {
        return await Event.findAndCountAll(this.getFilter(fromDate, toDate, limit, offset));
        // return await Event.findAndCountAll({
        //     where: this.getFilter(fromDate, toDate),
        //     limit,
        //     offset,
        //     order: [['createdAt', 'DESC']]
        // });
    }
    static async createEvent(eventBody) {
        return await Event.bulkCreate(eventBody)
    }
    static async getEvent(names) {
        return await Event.findAll({
            where: {
                name: names
            }
        })
    }
    static getFilter(fromDate, toDate, limit, offset) {
        return (!fromDate && !toDate) ? {
            limit,
            offset,
            order: [['createdAt', 'DESC']]
        } : {
                where: {
                    isActive: true,
                    date: {
                        [Op.gte]: new Date(fromDate),
                        [Op.lte]: new Date(toDate)
                    }
                },
                limit,
                offset,
                order: [['createdAt', 'DESC']]
            }
        // return (!fromDate && !toDate) ? {
        //     isActive: true
        // } : {
        //         isActive: true,
        //         date: {
        //             [Op.gte]: new Date(fromDate),
        //             [Op.lte]: new Date(toDate)
        //         }
        //     }
    }
}

module.exports = EventService
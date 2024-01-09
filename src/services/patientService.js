require('dotenv').config();
import { reject } from 'lodash';
import db from '../models/index';
import emailService from './emailService'
import {v4 as uuidv4 } from 'uuid';

let buildUrEmail = (doctorId, token) => {
    let result = `${process.env.URL_REACT}/verify-booking?${token}&doctorId=${doctorId}`
    return result
}

let patientBookingAppointmentService = (data) => {
    return new Promise(async (resolve,reject) => {
        try {
            if(!data.email || !data.doctorId || !data.timeType || !data.date || !data.fullName) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing paramater!'
                })
            } else {

                let token = uuidv4()
                await emailService.sendSimpleEmail({
                    reciverEmail: data.email,
                    patientName: data.fullName,
                    time: data.timeString,
                    doctorName: data.language,
                    redirectLink: buildUrEmail(data.doctorId, token)
                })
                //upsert patient
                let user = await db.User.findOrCreate({
                    where: {email: data.email},
                    default: {
                        email: data.email,
                        roleId: 'R3'
                    }
                });

                //create a booking record
                if(user[0]) {
                    await db.Booking.findOrCreate({
                        where: { patientId: user[0].id},
                        defaults: {
                            statusId: 'S1',
                            doctorId: data.doctorId,
                            patientId: user[0].id,
                            date: data.date,
                            timeType: data.timeType,
                            token: token
                        }
        
                    })
                }

                resolve({
                    data:user,
                    errCode: 0,
                    errMessage: 'Save infor doctor succeed'
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

let verifyBookAppointmentService = (data) => {
    return new Promise (async (resolve, reject) => {
        try {
            if(!data.token || !data.doctorId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter!!'
                })
            } else {
                let appointment = await db.Booking.findOne({
                    where: {
                        doctorId: data.doctorId,
                        token: data.token,
                        statusId: 'S1'
                    },
                    raw: false
                })

                if(appointment) {
                    appointment.statusId = 'S2';
                    await appointment.save();

                    resolve({
                        errCode: 0,
                        errMessage: "Update the appointment succeed!"
                    })
                } else {
                    resolve({
                        errCode: 2,
                        errMessage: "Appointment has been activated or does not exist"
                    })
                }
            }

        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    patientBookingAppointmentService: patientBookingAppointmentService,
    verifyBookAppointmentService: verifyBookAppointmentService,
}
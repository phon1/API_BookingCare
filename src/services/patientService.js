require('dotenv').config();
import db from '../models/index';


let patientBookingAppointmentService = (data) => {
    return new Promise(async (resolve,reject) => {
        try {
            if(!data.email) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing paramater!'
                })
            } else {
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
                            timeType: data.timeType
                        }
        
                    })
                }

                resolve({
                    data:user,
                    errCode: 0,
                    Message: 'Save infor doctor succeed'
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
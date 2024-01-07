import patientService from '../services/patientService'

let patientBookingAppointment = async(req, res) => {
    try {
        let booking = await patientService.patientBookingAppointmentService(req.body);
        return res.status(200).json(booking)
    } catch(e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server!!'
        })
    }
}

module.exports = {
    patientBookingAppointment: patientBookingAppointment,
}
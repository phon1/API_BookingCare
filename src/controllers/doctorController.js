import doctorService from "../services/doctorService"

let getTopDoctorHome = async (req, res) => {
    let limit = req.query.limit;
    if(!limit) limit = 10;
    try{
        let response = await doctorService.getTopDoctorHomeService(limit)
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server!!'
        })
    }
}

let getAllDoctors = async (req,res) => {
    try {
        let doctors = await doctorService.getAllDoctorService()
        return res.status(200).json(doctors)
    } catch(e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server!!'
        })
    }
}

let postInfoDoctor = async (req,res) => {
    try {
        let response = await doctorService.postInfoDoctorService(req.body)
        return res.status(200).json(response)
    } catch(e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server!!'
        })
    }
}

let getDetailDoctorById = async (req,res) => {
    try {

        let info = await doctorService.getDetailDoctorByIdService(req.query.id)
        return res.status(200).json(info)
    } catch(e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server!!'
        })
    }
}

let bulkCreateSchedule = async (req, res) => {
    try {

        let bulk = await doctorService.bulkCreateScheduleService(req.body)
        return res.status(200).json(bulk)
    } catch(e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server!!'
        })
    }
}

let getScheduleDoctorByDate = async (req, res) => {
    try {

        let bulk = await doctorService.getScheduleDoctorByDateService(req.query.doctorId, req.query.date);
        return res.status(200).json(bulk)
    } catch(e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server!!'
        })
    }
}

let getExtraInforDoctorById = async (req, res) => {
    try {
        let InforDoctor = await doctorService.getExtraInforDoctorByIdService(req.query.doctorId);
        return res.status(200).json(InforDoctor)
    } catch(e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server!!'
        })
    }
}

let getProfileDoctorById = async (req, res) => {
    try {
        let ProfileDoctor = await doctorService.getProfileDoctorByIdService(req.query.doctorId);
        return res.status(200).json(ProfileDoctor)
    } catch(e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server!!'
        })
    }
}

let getListPatientForDoctor = async (req, res) => {
    try {
        let listPatient = await doctorService.getListPatientForDoctorService(req.query.doctorId, req.query.date);
        return res.status(200).json(listPatient)
    } catch(e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server!!'
        })
    }
}

module.exports = {
    getTopDoctorHome: getTopDoctorHome,
    getAllDoctors: getAllDoctors,
    postInfoDoctor: postInfoDoctor,
    getDetailDoctorById: getDetailDoctorById,
    bulkCreateSchedule: bulkCreateSchedule,
    getScheduleDoctorByDate: getScheduleDoctorByDate,
    getExtraInforDoctorById: getExtraInforDoctorById,
    getProfileDoctorById: getProfileDoctorById,
    getListPatientForDoctor: getListPatientForDoctor,
}
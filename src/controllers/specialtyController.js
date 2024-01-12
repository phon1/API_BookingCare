import specialtyService from '../services/specialtyService'

let createSpecialty = async(req, res) => {
    try {
        let specialty = await specialtyService.createSpecialtyService(req.body);
        return res.status(200).json(specialty)
    } catch(e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server!!'
        })
    }
}

let getAllSpecialty = async(req, res) => {
    try {
        let getSpecialty = await specialtyService.getAllSpecialtyService();
        return res.status(200).json(getSpecialty)
    } catch(e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server!!'
        })
    }
}

let getdetailSpecialtyById = async(req, res) => {
    try {
        let info = await specialtyService.getdetailSpecialtyByIdService(req.query.id, req.query.location);
        return res.status(200).json(info)
    } catch(e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server!!'
        })
    }
}

module.exports = {
    createSpecialty: createSpecialty,
    getAllSpecialty: getAllSpecialty,
    getdetailSpecialtyById: getdetailSpecialtyById,
}
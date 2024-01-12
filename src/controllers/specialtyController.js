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

module.exports = {
    createSpecialty: createSpecialty,
}
const { reject } = require("lodash");
const db = require("../models");

let createClinicService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(!data.name || !data.adress || !data.imageBase64 
            || !data.descriptionHTML || !data.descriptionMarkdown) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            } else {
                await db.Clinic.create({
                    name: data.name,
                    address: data.address,
                    image: data.imageBase64,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown
                })

                resolve({
                    errCode: 0,
                    errMessage: 'OK'
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createClinicService: createClinicService,
}
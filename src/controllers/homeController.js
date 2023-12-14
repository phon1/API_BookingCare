import db from '../models/index';
import CRUDService from "../services/CRUDService"
let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        console.log('---------------------------------');
        console.log(data);
        console.log('---------------------------------');
        return res.render('homepage.ejs', {
            data: JSON.stringify(data)
        });

    } catch (error) {
        console.log(error);
    }

}

let getAboutPage = (req, res) => {
    return res.render('test/about.ejs');
}

let getCRUD = (req, res) => {
    return res.render('crud.ejs');
}

let postCRUD = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body);
    console.log(message);
    return res.send('post crud from server');
}

let displayGetCRUD = async (req, res) => {
    let data = await CRUDService.getAllUser({
        raw: true,
    });
    // console.log('----------')
    // console.log(data)
    // console.log('----------')

    return res.render('displayCRUD.ejs', {
        dataTable: data
    })
}


let getEditCRUD = async  (req, res) => {
    let userId = req.query.id;
    if (!userId) {
        return res.send('Users not found!') 
    }
    else {
        console.log (userId)
        let userData = await CRUDService.getUserInfoById(userId);
        console.log('----------')
        console.log(userData)
        console.log('----------')
        return res.render('editCRUD.ejs', {
            user: userData
        })
    }

}

let putCRUD = async (req, res) =>{
    let data = req.body;
    let allUsers = await CRUDService.updateUserData(data);
    return res.render('displayCRUD.ejs', {
        dataTable: allUsers
    })
}
module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    displayGetCRUD: displayGetCRUD,
    postCRUD: postCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
}
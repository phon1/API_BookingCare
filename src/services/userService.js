import bcrypt from 'bcryptjs';
import db from "../models/index"

const salt = bcrypt.genSaltSync(10);

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            var hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (error) {
            reject(error);
        }
    })
}

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);

            if (!isExist) {
                userData.errCode = 1;
                userData.errMessage = `Your's Email isn't exist in your system. Please try other email!`
                resolve(userData)
            } else {
                let user = await db.User.findOne({
                    attributes: ['email', 'roleId', 'password'],
                    where: { email: email },
                    raw: true
                });
                if (!user) {
                    userData.errCode = 2;
                    userData.errMessage = `User's not found`
                    resolve(userData)
                } else {
                    let check = await bcrypt.compareSync(password, user.password)
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = 'Ok';
                        userData.user = user;
                        delete user.password;
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = 'Wrong password';
                    }
                    resolve(userData)

                }
            }
        } catch (error) {
            reject(error)
        }
    })
}

let compareUserPassword = () => {
    return new Promise((resolve, reject) => {
        try {

        } catch (error) {
            reject(error);
        }
    })
}

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            })

            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (error) {
            reject(error);
        }
    })
}

let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            console.log(userId)
            if (userId === 'ALL') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            if (userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    where: { id: userId }
                })
            }

            resolve(users)

        } catch (error) {
            reject(error)
        }
    })
}

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkUserEmail(data.email);

            if (check == true) {
                resolve({
                    errCode: 1,
                    errMessage: 'Your email is already used, Plz try order email'
                })
            } else {
                console.log('data',data)
                let hashPasswordFromBcrypt = await hashUserPassword(data.password)
                await db.User.create({
                    email: data.email,
                    password: hashPasswordFromBcrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phonenumber: data.phoneNumber,
                    gender: data.gender,
                    roleId: data.roleId,
                    positionId: data.positionId
                })
    
                resolve({
                    errCode: 0,
                    message: 'OK'
                });
            }
        } catch (error) {
            reject(error)
        }
    })
}

let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        let user = await db.User.findOne({
            where: { id: userId }
        })
        if (!user) {
            resolve({
                errCode: 2,
                errMessage: `The user isn't exist`
            })
        }
        else {
            await db.User.destroy({
                where: { id: userId }
            });
    
            resolve({
                errCode: 0,
                message: 'The user is deleted'
            })
        }

    })
}

let updateUserData = (data) => {
    return new Promise (async(resolve,reject) => {
        try {
            if(!data.id || !data.roleId || !data.positionId || !data.gender){
                resolve({
                    errCode: 2,
                    errMessage: 'Missing requied parameters'
                })
            }
            let user = await db.User.findOne({
                where: {id: data.id},
                raw: false

            })
            if(user){
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                user.roleId = data.roleId;
                user.positionId = data.positionId;
                user.gender = data.gender;
                user.phonenumber = data.phonenumber;

                await user.save();

                resolve({
                    errCode: 0,
                    message: 'Update the user succeeds!'
                })
            } else{
                resolve({
                    errCode: 1,
                    errMessage: 'User\'s not found!'
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

let getAllCodeService = (typeInput) => {
    return new Promise ( async (resolve,reject) => {
        try {
            if(!typeInput){
                resolve({
                    errCode: 1,
                    errMessage: 'Missing requied parameters'
                })
            } else {
                let res = {};
                let allcode = await db.Allcode.findAll({
                    where: {type: typeInput}
                });
                res.errCode = 0;
                res.data = allcode;
                resolve(res);

            }

        } catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    updateUserData: updateUserData,
    getAllCodeService: getAllCodeService,
}
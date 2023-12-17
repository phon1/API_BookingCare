import bcrypt from 'bcryptjs';
import db from "../models/index"

let handleUserLogin = (email,password) => {
    return new Promise(async(resolve,reject) => {
        try {
            let userData= {};
            let isExist = await checkUserEmail(email);

            if(!isExist) {
                userData.errCode = 1;
                userData.errMessage = `Your's Email isn't exist in your system. Please try other email!`
                resolve(userData)
            } else{
                let user = await db.User.findOne({
                    attributes : ['email', 'roleId', 'password'],
                    where : { email: email},
                    raw : true
                });
                if(!user){
                    userData.errCode = 2;
                    userData.errMessage = `User's not found`
                    resolve(userData)
                } else{
                    let check = await bcrypt.compareSync(password, user.password)
                    if(check) {
                        userData.errCode = 0;
                        userData.errMessage= 'Ok';
                        userData.user = user;
                        delete user.password;
                    } else {
                        userData.errCode = 3;
                        userData.errMessage= 'Wrong password';
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
    return new Promise (async(resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {email: userEmail}
            })

            if(user){
                resolve(true)
            } else{
                resolve(false)
            }
        } catch (error) {
            reject(error);
        }
    })
}
module.exports = {
    handleUserLogin: handleUserLogin
}
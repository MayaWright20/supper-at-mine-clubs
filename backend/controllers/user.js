import { User } from "../models/user.js";

export const signup = async(req, res, next) => {
    const {name, username, email, password} = req.body;

    let user = await User.findOne({
        $or: [
            { email: email || username },
            { username: email || username },
        ]
    });

    // if(user) return next(new ErrorHandler("User already exists", 400));
    if(user) return console.log("Already have that person")

    user = await User.create({name, username, email, password});
    console.log('created')
};
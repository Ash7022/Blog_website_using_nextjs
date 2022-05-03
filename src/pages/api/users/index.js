import User from "../../../model/User";
import {dbConnect, runMIddle}  from "../../../utils/Index";
import Morgan from "morgan"


dbConnect();

export default async(req, res) =>{
    const {method, body} = req;
    const morgan = Morgan("dev")

    switch(method) {
        case "GET":
            try {
                const users = await User.find();

                await runMIddle(req, res, morgan);
                return res.status(200).json(users);

            } catch (error) {
                return res.status(400).json({msg:error.messgage});
            }
        case "POST":
            try {
                const newUser = new User(body);
                const savedUser = await newUser.save();
                await runMIddle(req, res, morgan);
                return res.status(200).json({id:savedUser.id});
                
            }
            catch (error) {
            return res.status(400).json({msg:error.messgage});
        }
    }

};

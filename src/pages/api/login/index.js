
import {dbConnect, runMIddle}  from "../../../utils/Index";
import Morgan from "morgan"
import User from "../../../model/User";


dbConnect();

export default async(req, res) =>{
    const {method, body} = req;
    const morgan = Morgan("dev")

    switch(method) {
        case "POST":
            try {
                
                const user = await User.findOne (body);
                await runMIddle(req, res, morgan);
                return res.status(200).json({id:user.id});
                
            }
            catch (error) {
            return res.status(400).json({msg:error.messgage});
        }
    }

};
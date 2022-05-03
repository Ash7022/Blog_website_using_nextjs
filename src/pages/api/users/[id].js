import Task from "../../../model/Task";
import {dbConnect, runMIddle}  from "../../..//utils/Index";
import Morgan from "morgan"


dbConnect();

export default async(req, res) =>{
    const {method, body, query:{id}} = req;
    const morgan = Morgan("dev")

    switch(method) {
        case "GET":
            try {
                const tasks = await Task.find({user:id});
                if(!tasks) return res.status(404).json({msg:"Task desnot exists"})

                await runMIddle(req, res, morgan);
                return res.status(200).json(tasks);

            } catch (error) {
                return res.status(400).json({msg:error.messgage});
            }
        }

    };
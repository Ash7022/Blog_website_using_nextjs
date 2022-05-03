import Task from "../../../model/Task";
import {dbConnect, runMIddle}  from "../../..//utils/Index";
import Morgan from "morgan"


dbConnect();

export default async(req, res) =>{
    const {method, body} = req;
    const morgan = Morgan("dev")

    switch(method) {
        case "GET":
            try {
                const tasks = await Task.find({user:body["user-id"]});

                await runMIddle(req, res, morgan);
                return res.status(200).json(tasks);

            } catch (error) {
                return res.status(400).json({msg:error.messgage});
            }
        case "POST":
            try {
                console.log("done")
                // const newTask = new Task(body);
                // const savedTask = await newTask.save();
                // await runMIddle(req, res, morgan);
                // return res.status(200).json(savedTask);

                const { title, description } = body;
                console.log(body["user-id"]);
                const newTask = new Task({title, description,user:body["user-id"]} );
                const savedTask = await newTask.save();
                await runMIddle(req, res, morgan);
                return res.status(200).json(savedTask);
            }
            catch (error) {
            return res.status(400).json({msg:error.messgage});
        }
    }

};




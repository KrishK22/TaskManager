import taskModel from '../models/taskModel.js'

export const addTask = async (req, res) => {
    try {

        const user = req.user;
        const createdBy = user._id.toString();
        const title = req.body.title;
        const description = req.body.description;
        const status = req.body.status;
        const priority = req.body.priority;

        const createTask = await taskModel.create({
            createdBy,
            title,
            description,
            status,
            priority
        })


        res.status(201).json({
            message: "Task added",
            task: createTask
        })



    } catch (error) {
        console.log(`${error} found in addTask controller`)
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const deleteTask = async (req, res) => {
    try {
        console.log(req.params.id)
        const taskId = req.params.id;
        const deleteTask = await taskModel.findByIdAndDelete(taskId)

        if (!deleteTask) {
            return res.status(404).json({
                message: "Task not found"
            })
        }

        res.status(200).json({
            message: "Task deleted Successfully",
            task: deleteTask
        })


    } catch (error) {
        console.log(`${error.message} found in the deleteTask Message`)
        res.status(500).json({
            message: "Internal Server Error "
        })
    }

}

export const getTask = async (req, res) => {
    try {
        const userId = req.user._id;
        const allTask = await taskModel.find({ createdBy: userId })

        res.status(200).json({
            message: "Got all Task",
            tasks: allTask
        })


    } catch (error) {
        console.log(`${error.message} found in getTask controller`)
        res.status(200).json({
            message: "Internal Server Error"
        })
    }
}


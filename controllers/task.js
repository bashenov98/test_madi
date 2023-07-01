
const jwt = require('jsonwebtoken');

const Task = require("../models/task"); 

module.exports.create_task = async (req, res) => {
    jwt.verify(req.token, 'your_secret_key', async (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            const newTask = new Task(req.body);
            await newTask.save();
            return res.status(200).json({ newTask });
        }
    });
}

module.exports.get_task_by_id = async (req, res) => {
    jwt.verify(req.token, 'your_secret_key', async (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            const task = await Task.findById(req.params.id);
            if (task == null) {
                return res.status(404).send('Task not found');
            }
            return res.status(200).json(task);
        }
    });
}

// PUT endpoint for updating a task
module.exports.update_task_by_id = async (req, res) => {
    jwt.verify(req.token, 'your_secret_key', async (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            try {
                const updatedTask = await Task.findByIdAndUpdate(
                    req.params.id,
                    req.body,
                    { new: true }  // This option returns the updated document
                );

                if (!updatedTask) {
                    return res.status(404).send('Task not found');
                }

                res.json(updatedTask);
            } catch (err) {
                res.status(500).send(err);
            }
        }
    });
}

module.exports.delete_task_by_id = async (req, res) => {
    jwt.verify(req.token, 'your_secret_key', async (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            try {
                const deletedTask = await Task.findByIdAndRemove(req.params.id);

                if (!deletedTask) {
                    return res.status(404).send('Task not found');
                }

                res.status(204).send();
            } catch (err) {
                res.status(500).send(err);
            }
        }
    });
};
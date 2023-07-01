const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const Task = require("../models/task");

const Tag = require("../models/tag");

module.exports.create_tag = async (req, res) => {
    jwt.verify(req.token, 'your_secret_key', async (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            try {
                const tag = new Tag(req.body);

                const savedTag = await tag.save();

                const task = await Task.findById(req.params.taskId);
                if (!task) {
                    return res.status(404).send('Task not found');
                }

                task.tags.push(savedTag._id);
                await task.save();

                return res.status(200).json(savedTag);
            } catch (err) {
                res.status(400).send(err);
            }
        }
    });
}

module.exports.get_tag_by_id = async (req, res) => {
    jwt.verify(req.token, 'your_secret_key', async (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            const tag = await Tag.findById(req.params.id);
            if (tag == null) {
                return res.status(404).send('Tag not found');
            }
            return res.status(200).json(tag);
        }
    });
}

module.exports.update_tag_by_id = async (req, res) => {
    jwt.verify(req.token, 'your_secret_key', async (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            try {
                const updatedTag = await Tag.findByIdAndUpdate(
                    req.params.id,
                    req.body,
                    { new: true }  // This option returns the updated document
                );

                if (!updatedTag) {
                    return res.status(404).send('Tag not found');
                }

                return res.json(updatedTag);
            } catch (err) {
                res.status(500).send(err);
            }
        }
    });
}

module.exports.delete_tag_by_id = async (req, res) => {
    jwt.verify(req.token, 'your_secret_key', async (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            try {
                tagId = req.params.id;
                const tasks = await Task.find({ tags: tagId });
                tasks.forEach(async (task) => {
                    const index = task.tags.indexOf(tagId);
                    if (index !== -1) {
                        task.tags.splice(index, 1);
                        await task.save();
                    }
                });

                const deletedTag = await Tag.findByIdAndRemove(tagId);

                if (!deletedTag) {
                    return res.status(404).send('Task not found');
                }

                res.status(204).send();
            } catch (err) {
                res.status(500).send(err);
            }
        }
    });
}


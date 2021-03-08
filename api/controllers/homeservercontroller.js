// i don't like to 'use strict';

const mongoose = require('mongoose'),
    Task = mongoose.model('Tasks');

exports.list_all_tasks = function(req, res) {
    Task.find({}, function (err, task) {
        if (err) {
            res.send(err);
        }
        console.log(task);
        res.render('taskview', {task: task});
    });
};

exports.create_a_task = function(req, res) {
    console.log('from ground control to major tom- this is request.body: ', req.body);
    let new_task = new Task(req.body);
    new_task.save(function (err, task) {
        if (err) {
            res.send(err);
        }
        res.render('single',{task: task});
    });
};

exports.read_a_task = function(req, res) {
    Task.findById(req.params.taskId, function (err, task) {
        console.log('the id of this task is: ', req.params.taskId);
        if (err) {
            res.send(err);
        }
        res.render('single',{task: task});
    })
};

exports.update_a_task = function(req, res) {
    Task.findOneAndUpdate({_id: req.params.taskID}, req.body, {new: true}, function (err, task) {
        if (err) {
            res.send(err);
        }
        res.json(task);
    });
}

exports.delete_a_task = function(req, res) {
    Task.deleteOne({
        _id: req.params.taskId
    }, function (err, task) {
        if (err) {
            res.send(err);
        }
        console.log('Task deleted');
        res.render('taskview');
    });
};

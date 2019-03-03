const Note = require('../models/note');

module.exports = {
    addNote: async (req, res, next) => {
        const { title, body } = req.body;
        let { date } = req.body;
        const user = req.user._id;
        date = new Date(date);
        const newNote = new Note({ user, title, body, date });
        await newNote.save().then(doc => {
            if (!doc) {
                return res.status(404).end();
            }
            return res.status(200).json("OK");
        }).catch(err => next(err))
    },
    getNotes: async (req, res, next) => {
        const user = req.user._id;
        const notes = await Note.find({ user }, { title: 1, date: 1 });
        res.status(200).json({ notes });
    },
    getNote: async (req, res, next) => {
        const { title } = req.body;
        let { date } = req.body;
        date = new Date(date);
        const user = req.user._id;
        const noteFound = await Note.find({ user, title, date });
        res.status(200).json({ noteFound });
    },

    delNote: async (req, res, next) => {
        const { title, body } = req.body;
        let { date } = req.body;
        const user = req.user._id;
        date = new Date(date);
        Note.deleteOne({ user, title, body, date }).then(doc => {
            if (!doc) {
                return res.status(404).end();
            }
            return res.status(200).json("OK");
        }).catch(err => next(err))
    },
    updateNote: async (req, res, next) => {
        const { title, oldBody, body } = req.body;
        let { date, oldDate } = req.body;
        const user = req.user._id;
        date = new Date(date);
        oldDate = new Date(oldDate);
        var qry = await Note.update(
            { user, title, body: oldBody, date: oldDate },
            { body, date }).then(doc => {
                if (!doc) {
                    return res.status(404).end();
                }
                return res.status(200).json("OK");
            }).catch(err => next(err))
    }
}
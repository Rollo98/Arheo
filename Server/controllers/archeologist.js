const Archeologist = require('../models/archeologist')
const fs = require('fs')

module.exports = {
  addArcheologist: async (req, res, next) => {
    if (req.user.role.includes("writer")) {
      let fullpath = ""
      if ((req.files[0] !== null) && (req.files[0] !== undefined)) {
        const oldPath = `./${req.files[0].path}`,
          newPath = `./${req.files[0].path}_${req.files[0].originalname}`
        fs.renameSync(oldPath, newPath)
        fullpath = newPath.replace('.', '')
      }
      const { firstName, lastName } = req.body
      const birthDay = JSON.parse(req.body.birthDay)
      const Domeniu = JSON.parse(req.body.Domeniu)
      const Santier = JSON.parse(req.body.Santier)
      const Lucrari = req.body.Lucrari
      const Studii = JSON.parse(req.body.Studii)
      const Specializarii = JSON.parse(req.body.Specializarii)
      const Institutii = JSON.parse(req.body.Institutii)
      let user = [req.user.userName]
      dateModified = new Date()
      if ((req.body.deathDay === null) || (req.body.deathDay === undefined)) {
        newArcheologist = new Archeologist({
          user, firstName, lastName, birthDay,
          Domeniu, Santier, Lucrari, Studii, Specializarii,
          Institutii, dateModified,
          photo: fullpath, author: user[0]
        })
      } else {
        const deathDay = JSON.parse(req.body.deathDay)
        newArcheologist = new Archeologist({
          user, firstName, lastName, birthDay, deathDay,
          Domeniu, Santier, Lucrari, Studii, Specializarii,
          Institutii, dateModified,
          photo: fullpath, author: user[0]
        })
      }
      await newArcheologist.save().then(doc => {
        if (!doc) {
          return res.status(404)
        }
        return res.status(200).json({ _id: newArcheologist._id })
      }).catch(err => next(err))
    }
  },

  getArcheologist: async (req, res, next) => {
    if (((req.params.firstName === null) || (req.params.firstName === undefined)) ||
      ((req.params.lastName === null) || (req.params.lastName === undefined))) {
      const archeologists = await Archeologist.find({}, { firstName: 1, lastName: 1, birthDay: 1, university: 1, photo: 1 })
      if (!archeologists) {
        res.status(500)
      }
      res.status(200).json({ archeologists })
    } else {
      const { firstName, lastName } = req.params
      const archeologists = await Archeologist.find({ firstName, lastName })
      res.status(200).json({ archeologists })
    }
    res.status(400)
  },

  deleteArcheologist: async (req, res, next) => {
    if (req.user.role.includes("writer")) {
      if ((req.body.deathDay === null) || (req.body.deathDay === undefined)) {
        newArcheologist = new Archeologist({ user, firstName, lastName, birthDay, institution, specialization, university, works, date })
        await Archeologist.deleteOne({ user, firstName, lastName, birthDay, institution, specialization, university, works, date }).then(entry => {
          if (!entry) {
            return res.status(404)
          }
          return res.status(200).json("OK")
        }).catch(err => next(err))
      } else {
        const { deathDay } = req.body
        newArcheologist = new Archeologist({ user, firstName, lastName, birthDay, deathDay, institution, specialization, university, works, date })
        await Archeologist.deleteOne({ user, firstName, lastName, birthDay, deathDay, institution, specialization, university, works, date }).then(entry => {
          if (!entry) {
            return res.status(404)
          }
          return res.status(200).json("OK")
        }).catch(err => next(err))
      }
    }
  },

  updateArcheologist: async (req, res, next) => {
    if (req.user.role.includes("writer")) {
      if (((req.params.firstName === null) || (req.params.firstName === undefined)) ||
        ((req.params.lastName === null) || (req.params.lastName === undefined))) {
        const { old_user, old_firstName, old_lastName, old_birthDay, old_institution, old_specialization, old_university, old_works, old_date } = req.body
        oldArcheologist = new Archeologist({ old_user, old_firstName, old_lastName, old_birthDay, old_institution, old_specialization, old_university, old_works, old_date })
        if ((req.body.deathDay === null) || (req.body.deathDay === undefined)) {
          const { user, firstName, lastName, birthDay, deathDay, institution, specialization, university, works, date } = req.body
          await Archeologist.update(oldArcheologist, { user, firstName, lastName, birthDay, deathDay, institution, specialization, university, works, date })
            .then(ret => {
              if (!ret) {
                return res.status(400)
              }
              return res.status(200)
            }).catch(err => next(err))
        } else {
          const { user, firstName, lastName, birthDay, institution, specialization, university, works, date } = req.body
          await Archeologist.update(oldArcheologist, { user, firstName, lastName, birthDay, institution, specialization, university, works, date })
            .then(ret => {
              if (!ret) {
                return res.status(400)
              }
              return res.status(200)
            }).catch(err => next(err))
        }
      }
    }
    res.status(400)
  }
}
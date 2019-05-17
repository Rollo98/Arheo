const Archeologist = require('../models/archeologist')
const fs = require('fs')

module.exports = {
  addArcheologist: async (req, res, next) => {
    if (req.user.role.includes("writer")) {
      const oldPath = `./${req.file.path}`,
        newPath = `./${req.file.path}_${req.file.originalname}`
      fs.renameSync(oldPath, newPath)
      const fullpath = newPath.replace('.', '')
      const { firstName, lastName } = req.body
      const institution = JSON.parse(req.body.institution)
      const specialization = JSON.parse(req.body.specialization)
      const university = JSON.parse(req.body.university)
      const works = JSON.parse(req.body.works)
      let user = [req.user.userName]
      let { birthDay } = req.body
      dateModified = new Date()
      birthDay = new Date(birthDay)
      if ((req.body.deathDay === null) || (req.body.deathDay === undefined)) {
        newArcheologist = new Archeologist({
          user, firstName, lastName, birthDay, institution,
          specialization, university, works, dateModified,
          photo: fullpath, author: user[0]
        })
      } else {
        const { deathDay } = req.body
        newArcheologist = new Archeologist({
          user, firstName, lastName, birthDay, institution,
          specialization, university, works, dateModified,
          deathDay, photo: fullpath, author: user[0]
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
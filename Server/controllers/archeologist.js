const Archeologist = require('../models/archeologist');

module.exports = {
  isWriter: async (req, res, next) => {
    if (req.user.role.includes("writer")) {
      return res.status(200).json("OK");
    }
    res.status(400)
  },
  isAdmin: async (req, res, next) => {
    if (req.user.role.includes("admin")) {
      return res.status(200).json("OK");
    }
    res.status(400)
  },
  addArcheologist: async (req, res, next) => {
    if (req.user.role.includes("writer")) {
      const { firstName, lastName, institution, specialization, university, works } = req.body;
      let user = [req.user.userName]
      let { birthDay } = req.body;
      dateModified = new Date();
      birthDay = new Date(birthDay);
      if ((req.body.deathDay === null) || (req.body.deathDay === undefined)) {
        newArcheologist = new Archeologist({ user, firstName, lastName, birthDay, institution, specialization, university, works, dateModified, author:user[0] });
      } else {
        const { deathDay } = req.body;
        newArcheologist = new Archeologist({ user, firstName, lastName, birthDay, deathDay, institution, specialization, university, works, dateModified, author:user[0] });
      }
      await newArcheologist.save().then(doc => {
        if (!doc) {
          return res.status(404)
        }
        return res.status(200).json({ _id: newArcheologist._id });
      }).catch(err => next(err))
    }
  },
  getArcheologist: async (req, res, next) => {
    if (((req.params.firstName === null) || (req.params.firstName === undefined)) ||
      ((req.params.lastName === null) || (req.params.lastName === undefined))) {
      const archeologists = await Archeologist.find({},{ firstName: 1, lastName: 1, birthDay: 1, university: 1 });
      if(!archeologists){
        res.status(500)
      }
      res.status(200).json({ archeologists });
    } else {
      const { firstName, lastName } = req.params;
      const archeologists = await Archeologist.find({firstName, lastName});
      res.status(200).json({ archeologists });
    }
    res.status(400)
  },

  deleteArcheologist: async (req, res, next) => {
    if (req.user.role.includes("writer")) {
      if ((req.body.deathDay === null) || (req.body.deathDay === undefined)) {
        newArcheologist = new Archeologist({ user, firstName, lastName, birthDay, institution, specialization, university, works, date });
        await Archeologist.deleteOne({ user, firstName, lastName, birthDay, institution, specialization, university, works, date }).then(entry => {
          if (!entry) {
            return res.status(404)
          }
          return res.status(200).json("OK");
        }).catch(err => next(err))
      } else {
        const { deathDay } = req.body;
        newArcheologist = new Archeologist({ user, firstName, lastName, birthDay, deathDay, institution, specialization, university, works, date });
        await Archeologist.deleteOne({ user, firstName, lastName, birthDay, deathDay, institution, specialization, university, works, date }).then(entry => {
          if (!entry) {
            return res.status(404)
          }
          return res.status(200).json("OK");
        }).catch(err => next(err))
      }
    }
  },

  updateArcheologist: async (req, res, next) => {
    if (req.user.role.includes("writer")) {
      if (((req.params.firstName === null) || (req.params.firstName === undefined)) ||
        ((req.params.lastName === null) || (req.params.lastName === undefined))) {
        const { old_user, old_firstName, old_lastName, old_birthDay, old_institution, old_specialization, old_university, old_works, old_date } = req.body;
        oldArcheologist = new Archeologist({ old_user, old_firstName, old_lastName, old_birthDay, old_institution, old_specialization, old_university, old_works, old_date });
        if ((req.body.deathDay === null) || (req.body.deathDay === undefined)) {
          const { user, firstName, lastName, birthDay, deathDay, institution, specialization, university, works, date } = req.body;
          await Archeologist.update(oldArcheologist, { user, firstName, lastName, birthDay, deathDay, institution, specialization, university, works, date })
            .then(ret => {
              if (!ret) {
                return res.status(400)
              }
              return res.status(200)
            }).catch(err => next(err))
        } else {
          const { user, firstName, lastName, birthDay, institution, specialization, university, works, date } = req.body;
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
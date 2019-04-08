const Archeologist = require('../models/archeologist');

module.exports = {
  //still needs the image handling part fuck me over
  addArcheologist: async (req, res, next) => {
    if (req.user.role.includes("writer")) {
      const { user, firstName, lastName, birthDay, institution, specialization, university, works } = req.body;
      let { date } = req.body;
      date = new Date(date);
      if ((req.body.deathDay === null) || (req.body.deathDay === undefined)) {
        newArcheologist = new Archeologist({ user, firstName, lastName, birthDay, institution, specialization, university, works, date });
      } else {
        const { deathDay } = req.body;
        newArcheologist = new Archeologist({ user, firstName, lastName, birthDay, deathDay, institution, specialization, university, works, date });
      }
      await newArcheologist.save().then(doc => {
        if (!doc) {
          return res.status(404).end();
        }
        return res.status(200).json("OK");
      }).catch(err => next(err))
    }
  },
  getArcheologist: async (req, res, next) => {
    if (((req.params.firstName === null) || (req.params.firstName === undefined)) ||
      ((req.params.lastName === null) || (req.params.lastName === undefined))) {
      const archeologists = await Archeologist.find({ firstName: 1, lastName: 1, birthDay: 1, university: 1, institution: 1, works: 1 });
      res.status(200).json({ archeologists });
    } else {
      const { firstName, lastName } = req.params;
      const archeologist = await Archeologist.find(firstName, lastName);
      if (!archeologist) {
        res.status(400).end();
      }
      res.status(200).json({ archeologist });
    }
    res.status(400).end();
  },
  deleteArcheologist: async (req, res, next) => {
    if (req.user.role.includes("writer")) {
      if ((req.body.deathDay === null) || (req.body.deathDay === undefined)) {
        newArcheologist = new Archeologist({ user, firstName, lastName, birthDay, institution, specialization, university, works, date });
        await Archeologist.deleteOne({ user, firstName, lastName, birthDay, institution, specialization, university, works, date }).then(entry => {
          if (!entry) {
            return res.status(404).end();
          }
          return res.status(200).json("OK");
        }).catch(err => next(err))
      } else {
        const { deathDay } = req.body;
        newArcheologist = new Archeologist({ user, firstName, lastName, birthDay, deathDay, institution, specialization, university, works, date });
        await Archeologist.deleteOne({ user, firstName, lastName, birthDay, deathDay, institution, specialization, university, works, date }).then(entry => {
          if (!entry) {
            return res.status(404).end();
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
                return res.status(400).end();
              }
              return res.status(200).end();
            }).catch(err => next(err))
        } else {
          const { user, firstName, lastName, birthDay, institution, specialization, university, works, date } = req.body;
          await Archeologist.update(oldArcheologist, { user, firstName, lastName, birthDay, institution, specialization, university, works, date })
            .then(ret => {
              if (!ret) {
                return res.status(400).end();
              }
              return res.status(200).end();
            }).catch(err => next(err))
        }
      }
    }
    res.status(400).end();
  }
}
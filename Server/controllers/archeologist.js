const Archeologist = require("../models/archeologist");
const fs = require("fs");

module.exports = {
  addArcheologist: async (req, res, next) => {
    if (req.user.role.includes("writer") || req.user.role.includes("admin")) {
      let fullpath = "";
      if (req.files[0] !== null && req.files[0] !== undefined) {
        const oldPath = `./${req.files[0].path}`,
          newPath = `./${req.files[0].path}_${req.files[0].originalname}`;
        fs.renameSync(oldPath, newPath);
        fullpath = newPath.replace(".", "");
      }
      const { prenume, numeDeFamilie } = req.body;
      const birthDay = JSON.parse(req.body.birthDay);
      const Domeniu = JSON.parse(req.body.Domeniu);
      const Santier = JSON.parse(req.body.Santier);
      const Lucrari = JSON.parse(req.body.Lucrari);
      const Observatii = JSON.parse(req.body.Observatii);
      const Studii = JSON.parse(req.body.Studii);
      const Specializarii = JSON.parse(req.body.Specializarii);
      const Institutii = JSON.parse(req.body.Institutii);
      let user = [req.user.userName];
      dateModified = new Date();

      if (req.body.deathDay === null || req.body.deathDay === undefined) {
        newArcheologist = new Archeologist({
          user,
          prenume,
          numeDeFamilie,
          birthDay,
          Domeniu,
          Santier,
          Lucrari,
          Studii,
          Specializarii,
          Institutii,
          dateModified,
          Observatii,
          photo: fullpath,
          author: user[0]
        });
      } else {
        const deathDay = JSON.parse(req.body.deathDay);
        newArcheologist = new Archeologist({
          user,
          prenume,
          numeDeFamilie,
          birthDay,
          deathDay,
          Domeniu,
          Santier,
          Lucrari,
          Studii,
          Specializarii,
          Institutii,
          dateModified,
          Observatii,
          photo: fullpath,
          author: user[0]
        });
      }

      await newArcheologist
        .save()
        .then(doc => {
          if (!doc) {
            return res.status(404);
          }
          return res.status(200).json({ _id: newArcheologist._id });
        })
        .catch(err => next(err));
    }
  },

  getArcheologist: async (req, res, next) => {
    console.log(req.query)
    let query = {}
    if (req.query === null)
      query = { ...req.query }
    try {
      const archeologists = await Archeologist.find(query);
      res.status(200).json({ archeologists });
    } catch (err) {
      console.log(err)
      return res.status(500).json({ err });
    }
    res.status(400);
  },

  deleteArcheologist: async (req, res, next) => {
    if (req.user.role.includes("writer") || req.user.role.includes("admin")) {
      console.log(req.params);
      const { prenume, numeDeFamilie } = req.params;
      try {
        const archeologist = await Archeologist.find({ prenume, numeDeFamilie }, { photo: 1 })
        if (archeologist[0].photo !== undefined && archeologist[0].photo !== "")
          fs.unlinkSync(`.${archeologist[0].photo}`)
      } catch (err) {
        console.log(err)
        return res.status(500).json({ err });
      }
      await Archeologist.deleteOne(
        {
          prenume: prenume,
          numeDeFamilie: numeDeFamilie
        },
        error => {
          if (error) {
            return res.status(500).json({ error });
          }
          return res.json({ prenume, numeDeFamilie, response: "Success" });
        }
      );
    }
  },

  updateArcheologist: async (req, res, next) => {
    if (req.user.role.includes("writer") || req.user.role.includes("admin")) {
      if (
        req.params.prenume === null ||
        req.params.prenume === undefined ||
        (req.params.numeDeFamilie === null || req.params.numeDeFamilie === undefined)
      ) {
        const {
          old_user,
          old_prenume,
          old_numeDeFamilie,
          old_birthDay,
          old_institution,
          old_specialization,
          old_university,
          old_works,
          old_date
        } = req.body;
        oldArcheologist = new Archeologist({
          old_user,
          old_prenume,
          old_numeDeFamilie,
          old_birthDay,
          old_institution,
          old_specialization,
          old_university,
          old_works,
          old_date
        });
        if (req.body.deathDay === null || req.body.deathDay === undefined) {
          const {
            user,
            prenume,
            numeDeFamilie,
            birthDay,
            deathDay,
            institution,
            specialization,
            university,
            works,
            date
          } = req.body;
          await Archeologist.update(oldArcheologist, {
            user,
            prenume,
            numeDeFamilie,
            birthDay,
            deathDay,
            institution,
            specialization,
            university,
            works,
            date
          })
            .then(ret => {
              if (!ret) {
                return res.status(400);
              }
              return res.status(200);
            })
            .catch(err => next(err));
        } else {
          const {
            user,
            prenume,
            numeDeFamilie,
            birthDay,
            institution,
            specialization,
            university,
            works,
            date
          } = req.body;
          await Archeologist.update(oldArcheologist, {
            user,
            prenume,
            numeDeFamilie,
            birthDay,
            institution,
            specialization,
            university,
            works,
            date
          })
            .then(ret => {
              if (!ret) {
                return res.status(400);
              }
              return res.status(200);
            })
            .catch(err => next(err));
        }
      }
    }
    res.status(400);
  }
};

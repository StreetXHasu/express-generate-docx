const db = require("../models");
const docx = require("docx");
const {
  AlignmentType,
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  TextRun,
  UnderlineType,
} = docx;

//список групп докментов
exports.index = async function (req, res, next) {
  try {
    if (req.user) {
      const docs = await db.Docs_group.findAll({
        limit: 10,
      });

      return res.status(200).json({
        user: req.user,
        msg: "Список групп документов",
        docs,
      });
    } else
      return res.status(403).json({
        error: "Not authorized",
      });
    return;
    res.render("auth_login", {
      title: "Авторизация",
    });
  } catch (error) {
    return res.status(401).json(error);
  }
};
exports.docs_group_create_post = async function (req, res, next) {
  try {
    if (!req.user) {
      return res.status(403).json({
        error: "Not authorized",
      });
    }
    let doc_name = req.body.name;
    let doc_disc = req.body.disc;
    let doc_img = req.file;
    let fileName = `${doc_img.destination}${doc_img.filename}`;

    const [doc, created] = await db.Docs_group.findOrCreate({
      where: {
        name: doc_name,
      },
      defaults: {
        disc: doc_disc,
        img: fileName,
      },
    });
    let success = `Группа ${doc.name} уже есть.`;
    if (created) {
      success = `Группа ${doc.name} создана!`; // This will certainly be 'Technical Lead JavaScript'
    }
    return res.json({
      success,
      doc,
    });
  } catch (err) {
    err.status = 404;
    return next(err);
  }

  return;
};
exports.docs_group_detail_post = async function (req, res, next) {
  try {
    console.log("ТЕСТ   ", req.params.id);
    let doc_group = await db.Docs_group.findOne({
      where: { id: req.params.id },
    });
    let success = `Группа ${doc_group.name}.`;
    return res.json({
      success,
      doc_group,
    });
  } catch (err) {
    err.status = 404;
    return next(err);
  }
};
exports.docs_group_edit_post = async function (req, res, next) {
  let doc_name = req.body.name;
  let doc_disc = req.body.disc;
  let doc_img = req.body.img;
  try {
    let doc_group = await db.Docs_group.findOne({
      where: { id: req.params.id },
    });
    doc_group.name = doc_name;
    doc_group.disc = doc_disc;
    if (doc_img) {
      doc_group.img = doc_img;
    }
    doc_group.save();

    let success = `Группа ${doc_group.id} изменена!.`;
    return res.json({
      success,
      doc_group,
    });
  } catch (err) {
    err.status = 404;
    return next(err);
  }
};
exports.docs_group_del_post = async function (req, res, next) {
  try {
    let doc_group = await db.Docs_group.findOne({
      where: { id: req.params.id },
    });
    doc_group.destroy();
    let success = `Группа ${doc_group.name} удалена!.`;
    return res.json({
      success,
      doc_group,
    });
  } catch (err) {
    err.status = 404;
    return next(err);
  }
};

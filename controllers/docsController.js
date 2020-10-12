const db = require("../models");

const { body, validationResult } = require("express-validator");

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

//список документов
exports.index = async function (req, res, next) {
  try {
    if (req.user) {
      const docs = await db.Docs.findAll({
        limit: 10,
      });

      return res.status(200).json({
        user: req.user,
        msg: "Список групп документов",
        docs,
      });
    } else
      return res.status(200).json({
        msg: "Not authorized",
      });
    return;
    res.render("auth_login", {
      title: "Авторизация",
    });
  } catch (error) {
    return res.status(401).json(error);
  }
};
exports.docs_create_post = async function (req, res, next) {
  try {
    let doc_user = 1;
    let doc_group = req.body.doc.groupId;

    let doc_name = req.body.doc.name;
    let doc_disc = req.body.doc.disc;
    let doc_format = "docx";
    let doc_pin = 0;
    let doc_hide = 0;
    let doc_data = {
      creator: "Clippy",
      title: "Sample Document",
      description: "A brief example of using docx",
      styles: {
        paragraphStyles: [
          {
            id: "Heading1",
            name: "Heading 1",
            basedOn: "Normal",
            next: "Normal",
            quickFormat: true,
            run: {
              size: 28,
              bold: true,
              italics: true,
              color: "red",
            },
            paragraph: {
              spacing: {
                after: 120,
              },
            },
          },
          {
            id: "Heading2",
            name: "Heading 2",
            basedOn: "Normal",
            next: "Normal",
            quickFormat: true,
            run: {
              size: 26,
              bold: true,
              underline: {
                type: UnderlineType.DOUBLE,
                color: "FF0000",
              },
            },
            paragraph: {
              spacing: {
                before: 240,
                after: 120,
              },
            },
          },
          {
            id: "aside",
            name: "Aside",
            basedOn: "Normal",
            next: "Normal",
            run: {
              color: "999999",
              italics: true,
            },
            paragraph: {
              indent: {
                left: 720,
              },
              spacing: {
                line: 276,
              },
            },
          },
          {
            id: "wellSpaced",
            name: "Well Spaced",
            basedOn: "Normal",
            quickFormat: true,
            paragraph: {
              spacing: {
                line: 276,
                before: 20 * 72 * 0.1,
                after: 20 * 72 * 0.05,
              },
            },
          },
          {
            id: "ListParagraph",
            name: "List Paragraph",
            basedOn: "Normal",
            quickFormat: true,
          },
        ],
      },
      numbering: {
        config: [
          {
            reference: "my-crazy-numbering",
            levels: [
              {
                level: 0,
                format: "lowerLetter",
                text: "%1)",
                alignment: AlignmentType.LEFT,
              },
            ],
          },
        ],
      },
    };

    // userId: DataTypes.INTEGER,
    // docs_groupId: DataTypes.INTEGER,
    // name: DataTypes.STRING,
    // disc: DataTypes.TEXT,
    // data: DataTypes.TEXT,
    // format: DataTypes.STRING,
    // pin: DataTypes.INTEGER,
    // hide: DataTypes.INTEGER
    const [docs, created] = await db.Docs.findOrCreate({
      where: {
        userId: doc_user,
        docs_groupId: doc_group,
        name: doc_name,
      },
      defaults: {
        disc: doc_disc,
        data: "",
        format: doc_format,
        pin: doc_pin,
        hide: doc_hide,
      },
    });
    let success = `Документ ${docs.name} уже есть.`;
    if (created) {
      success = `Документ ${docs.name} создана!`; // This will certainly be 'Technical Lead JavaScript'
    }

    return res.json({
      success,
      doc: docs,
    });

    doc = new Document(doc_data);

    doc.addSection({
      children: [
        new Paragraph({
          text: "Test heading1, bold and italicized",
          heading: HeadingLevel.HEADING_1,
        }),
        new Paragraph("Some simple content"),
        new Paragraph({
          text: "Test heading2 with double red underline",
          heading: HeadingLevel.HEADING_2,
        }),
        new Paragraph({
          text: "Option1",
          numbering: {
            reference: "my-crazy-numbering",
            level: 0,
          },
        }),
        new Paragraph({
          text: "Option5 -- override 2 to 5",
          numbering: {
            reference: "my-crazy-numbering",
            level: 0,
          },
        }),
        new Paragraph({
          text: "Option3",
          numbering: {
            reference: "my-crazy-numbering",
            level: 0,
          },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "Some monospaced content",
              font: {
                name: "Monospace",
              },
            }),
          ],
        }),
        new Paragraph({
          text: "An aside, in light gray italics and indented",
          style: "aside",
        }),
        new Paragraph({
          text: "This is normal, but well-spaced text",
          style: "wellSpaced",
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "This is a bold run,",
              bold: true,
            }),
            new TextRun(" switching to normal "),
            new TextRun({
              text: "and then underlined ",
              underline: {},
            }),
            new TextRun({
              text: "and back to normal.",
            }),
          ],
        }),
      ],
    });

    const b64string = await Packer.toBase64String(doc);

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=My Document.docx"
    );
    res.send(Buffer.from(b64string, "base64"));
    return;
    res.json({
      msg: "Новый документ",
      user: req.body,
    });
    return;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.
      res.json({
        msg: "ошибка",
        user: req.body,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.

      // Create an Author object with escaped and trimmed data.
      Auth.authReg(req.body.login, req.body.password);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
exports.docs_detail_post = async function (req, res, next) {
  try {
    let doc = await db.Docs.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (doc) {
      let success = `Документ ${doc.name}.`;
      return res.json({
        success,
        doc,
      });
    }
  } catch (err) {
    err.status = 404;
    return next(err);
  }
};
exports.docs_edit_post = async function (req, res, next) {
  let doc_name = req.body.doc.name;
  let doc_disc = req.body.doc.disc;
  let doc_img = req.body.doc.img;
  try {
    let doc = await db.Docs.findOne({
      where: {
        id: req.params.id,
      },
    });
    doc.name = doc_name;
    doc.disc = doc_disc;
    if (doc_img) {
      doc.img = doc_img;
    }
    doc.save();

    let success = `Документ ${doc.id} изменена!.`;
    return res.json({
      success,
      doc,
    });
  } catch (err) {
    err.status = 404;
    return next(err);
  }
};
exports.docs_del_post = async function (req, res, next) {
  try {
    let doc = await db.Docs.findOne({
      where: {
        id: req.params.id,
      },
    });
    doc.destroy();
    let success = `Документ ${doc.name} удалена!.`;
    return res.json({
      success,
      doc,
    });
  } catch (err) {
    err.status = 404;
    return next(err);
  }
};

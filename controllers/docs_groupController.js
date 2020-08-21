const db = require('../models');
const Docs = require('../models/docs');
const Docs_group = require('../models/docs_group');
const User = require('../models/user');
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

const docx = require('docx');
const { AlignmentType, Document, HeadingLevel, Packer, Paragraph, TextRun, UnderlineType } = docx;

//список групп докментов
exports.index = async function (req, res) {
    const docs = await db.Docs_group.findAll({ limit: 10 });

    res.json({ msg: "Список групп документов", docs });
    return;
    res.render('auth_login', { title: 'Авторизация' });
}
exports.docs_group_create_post = async function (req, res) {

    try {
        let doc_name = req.body.doc.name;
        let doc_disc = req.body.doc.disc;
        let doc_img = req.body.doc.img;

        const [doc, created] = await db.Docs_group.findOrCreate({
            where: {
                name: doc_name,
            },
            defaults: {
                disc: doc_disc,
                img: doc_img
            }
        })
        let success = `Группа ${doc.name} уже есть.`;
        if (created) {
            success = `Группа ${doc.name} создана!`; // This will certainly be 'Technical Lead JavaScript'
        }
        return res.json({
            success,
            doc,
        })
    } catch (error) {

    }


    return
}
exports.docs_group_detail_post = async function (req, res) {

    try {
        let doc_group = await db.Docs_group.findOne({ where: { id: req.params.id } });
        let success = `Группа ${doc_group.name}.`;
        return res.json({
            success,
            doc_group,
        })
    } catch (error) {

    }
}
exports.docs_group_edit_post = async function (req, res) {

    try {
        // let doc_group = await db.Docs_group.findOne({ where: { id: req.params.id } });
        // doc_group.destroy();
        // let success = `Группа ${doc_group.name} удалена!.`;
        // return res.json({
        //     success,
        //     doc_group,
        // })
        return res.json({
            success: "потом будет",
        })
    } catch (error) {

    }
}
exports.docs_group_del_post = async function (req, res) {

    try {
        let doc_group = await db.Docs_group.findOne({ where: { id: req.params.id } });
        doc_group.destroy();
        let success = `Группа ${doc_group.name} удалена!.`;
        return res.json({
            success,
            doc_group,
        })
    } catch (error) {

    }
}
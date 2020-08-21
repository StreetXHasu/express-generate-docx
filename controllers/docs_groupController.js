const Docs = require('../models/docs');
const docx = require('docx');
const Docs_group = require('../models/docs_group');
const User = require('../models/user');
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
const { AlignmentType, Document, HeadingLevel, Packer, Paragraph, TextRun, UnderlineType } = docx;

//список документов
exports.index = function (req, res) {
    res.json({ msg: "Список документов", user: req.body });
    return;
    res.render('auth_login', { title: 'Авторизация' });
}
exports.docs_create_post = async function (req, res) {
    const doc = new Document({
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
                        spacing: { line: 276, before: 20 * 72 * 0.1, after: 20 * 72 * 0.05 },
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
    });

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

    res.setHeader('Content-Disposition', 'attachment; filename=My Document.docx');
    res.send(Buffer.from(b64string, 'base64'));
    return
    res.json({ msg: "Новый документ", user: req.body });
    return;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {

        // There are errors. Render form again with sanitized values/errors messages.
        res.json({ msg: "ошибка", user: req.body, errors: errors.array() });
        return;
    }
    else {

        // Data from form is valid.

        // Create an Author object with escaped and trimmed data.
        Auth.authReg(req.body.login, req.body.password)

    }

    res.json({ msg: "готово" });
}
exports.docs_edit_post = function (req, res) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {

        // There are errors. Render form again with sanitized values/errors messages.
        res.json({ msg: "ошибка", user: req.body, errors: errors.array() });
        return;
    }
    else {

        // Data from form is valid.

        // Create an Author object with escaped and trimmed data.
        Auth.authReg(req.body.login, req.body.password)

    }

    res.json({ msg: "готово" });
}
exports.docs_del_post = function (req, res) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {

        // There are errors. Render form again with sanitized values/errors messages.
        res.json({ msg: "ошибка", user: req.body, errors: errors.array() });
        return;
    }
    else {

        // Data from form is valid.

        // Create an Author object with escaped and trimmed data.
        Auth.authReg(req.body.login, req.body.password)

    }

    res.json({ msg: "готово" });
}
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import * as fontkit from "fontkit";
import { Packer, Paragraph, Document, TextRun } from "docx";

import { lathaToKalaham } from "./mappings/latha_kalaham.js";

const dirname = path.dirname(fileURLToPath(import.meta.url));

const content = fs.readFileSync(path.resolve(dirname, "input.docx"), "binary");

const zip = new PizZip(content);

const doc = new Docxtemplater(zip, {
  paragraphLoop: true,
  linebreaks: true,
});

const text = doc.getFullText();

const source = fontkit.openSync(path.resolve(dirname, "fonts/latha.ttf"));
const target = fontkit.openSync(path.resolve(dirname, "fonts/Kalaham.otf"));

const mapping = lathaToKalaham();

let misses = [];

function convertText(text) {
  let converted = "";
  for (let i = 0; i < text.length; i++) {
    const sourceGlyph = source.glyphForCodePoint(text.charCodeAt(i));

    const targetHasGlyph = target.glyphForCodePoint(
      mapping.get(sourceGlyph.codePoints[0])
    ).codePoints[0];

    if (targetHasGlyph) {
      converted += String.fromCharCode(targetHasGlyph);
    } else {
      misses.push(sourceGlyph.codePoints);
    }
  }
  return converted;
}

const convertedText = convertText(text);

console.log(text);
console.log(convertedText);

const outDoc = new Document({
  sections: [
    {
      properties: {},
      children: [
        new Paragraph({
          children: [
            new TextRun({
              text: convertedText,
              font: "kalaham",
            }),
          ],
        }),
      ],
    },
  ],
});

Packer.toBuffer(outDoc).then((buffer) => {
  fs.writeFileSync("output.docx", buffer);
});

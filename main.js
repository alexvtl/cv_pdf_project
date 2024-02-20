const express = require("express");
const app = express();
const port = 3000;
const PDFDocument = require("pdfkit");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();

const sqlUser = process.env.VITE_SQL_USER;
const sqlPassword = process.env.VITE_SQL_PASSWORD;
const sqlHOST = process.env.VITE_SQL_HOST;

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: sqlHOST,
  user: sqlUser,
  password: sqlPassword,
  database: "pdf_project",
});

db.connect((err) => {
  if (err) {
    console.error("Erreur de connexion à la BD", err);
    return;
  }
  console.log("Connecté à la BD ");
});
app.get("/", async (req, res) => {
  async function addImageToPdf() {
    const doc = new PDFDocument();
    res.setHeader("Content-Type", "application/pdf");
    doc.pipe(res);
    doc.rect(0, 15, 1150, 220).fillAndStroke("#f5f5f5", "white").stroke();
    doc.rect(15, 0, 190, 1654).fillAndStroke("#d9e7eb").stroke();
    const url = "https://cdn.futura-sciences.com/sources/Elon%20Musk1.jpg";

    const fetch = (...args) =>
      import("node-fetch").then(({ default: fetch }) => fetch(...args));

    const response = await fetch(url);
    const logo = await response.arrayBuffer();

    doc
      .circle(110, 110, 70)
      .save()
      .clip()
      .image(logo, 40, 50, {
        width: 120,
        height: 120,
        align: "center",
        valign: "center",
        cover: [140, 120],
      })
      .restore();

    doc
      .fillColor("#7c7c7c")
      .font("Courier", 20)
      .text("DÉVELOPPEUR WEB", 240, 50);
    doc
      .fillColor("#2c515f")
      .font("Times-Bold", 35)
      .text("Vital Alexandre", 240, 80, {
        characterSpacing: 2,
        lineBreak: false,
      });
    doc.moveDown(50);
    doc.rect(240, 130, 50, 1).fillAndStroke("#b6b6b6").stroke();
    // description
    doc
      .fillColor("#7c7c7c")
      .font("Courier", 13)
      .text(
        "purus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vivamus nec hendrerit felis. Morbi aliquam facilisis risus eu lacinia. Sed eu leo in turpis fringilla hendrerit. Ut nec accumsan nisl. Suspendisse rhoncus nisl posuere tortor tempus et dapibus elit porta. Cras leo neque, elementum a rhoncus ut, vestibulum non nibh. Phasellus pretium justo turpis. Etiam vulputate, odio vitae tincidunt ultricies, eros odio dapibus nisi, ut tincidunt lacus arcu eu elit. Aenean velit erat, vehicula eget lacinia ut, dignissim non tellus. Aliquam nec lacus mi, sed vestibulum nunc. Suspendisse potenti. Curabitur vitae sem turpis. Vestibulum sed neque eget dolor dapibus porttitor at sit amet sem. Fusce a turpis lorem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae",
        240,
        150,
        {
          width: 360,
          height: 80,
          align: "justify",
          lineBreak: true,
        }
      );
    //section hard skills
    doc
      .fillColor("#2c515f")
      .font("Times-Bold", 15)
      .text("HARD SKILLS", 30, 250, { characterSpacing: 2 });
    doc.rect(30, 270, 50, 1).fillAndStroke("#b6b6b6").stroke();
    doc
      .fillColor("#7c7c7c")
      .font("Courier", 13)
      .list(
        [
          "HTML",
          "CSS",
          "JAVASCRIPTsofijdsi",
          "ReactJS",
          "HTML",
          "CSS",
          "JAVASCRIPT",
          "ReactJS",
          "HTML",
          "CSS",
          "JAVASCRIPT",
          "ReactJS",
          "ReactJS",
          "HTML",
          "CSS",
        ],
        30,
        290,
        {
          width: 175,
          align: "left",
          listType: "bullet",
          bulletRadius: 1,
        }
      );
    //section soft skills
    doc
      .fillColor("#2c515f")
      .font("Times-Bold", 15)
      .text("SOFT SKILLS", 30, 510, { characterSpacing: 2 });
    doc.rect(30, 530, 50, 1).fillAndStroke("#b6b6b6").stroke();
    doc
      .fillColor("#7c7c7c")
      .font("Courier", 13)
      .list(
        [
          "HTML",
          "CSS",
          "JAVASCRIPTsofijdsisfdsdfqdsqfdqsfdsq",
          "ReactJS",
          "HTML",
        ],
        30,
        550,
        {
          width: 175,
          align: "left",
          listType: "bullet",
          bulletRadius: 1,
        }
      );
    //section contact
    doc
      .fillColor("#2c515f")
      .font("Times-Bold", 15)
      .text("CONTACT", 30, 650, { characterSpacing: 2 });
    doc.rect(30, 670, 50, 1).fillAndStroke("#b6b6b6").stroke();
    doc.image("./public/phone.png", 30, 690, { width: 13 });
    //section contact
    doc
      .fillColor("#7c7c7c")
      .font("Courier", 13)
      .text("0672040148", 50, 690, { characterSpacing: 1 });
    doc
      .image("./public/mail.png", 30, 720, { width: 13 })
      .fillColor("#7c7c7c")
      .font("Courier", 13)
      .text("alex.78@hotmail.fr", 50, 720, {
        width: 145,
        height: 30,
      });
    doc
      .image("./public/place.png", 30, 750, { width: 15 })
      .fillColor("#7c7c7c")
      .font("Courier", 13)
      .text("21 rue de la roseraie, meudon, 92360 ", 50, 750, {
        width: 145,
        height: 50,
      });
    // section expériences
    doc
      .fillColor("#2c515f")
      .font("Times-Bold", 15)
      .text("EXPERIENCES", 240, 250, { characterSpacing: 2 });
    doc.rect(240, 270, 50, 1).fillAndStroke("#b6b6b6").stroke();
    //experiences 1
    doc
      .fillColor("black")
      .font("Times-Bold", 13)
      .text("APPLICATION DEVELOPER", 240, 290);
    doc.fillColor("#7c7c7c").font("Courier", 13).text("AMAZON", 240, 305);
    doc.fillColor("black").font("Times-Bold", 13).text("2022 - 2023", 240, 320);
    doc
      .fillColor("#7c7c7c")
      .font("Courier", 13)
      .list(
        ["HTMLlksjfksjqljks", "CSS lsdfksjld slfdksj", "JAVASCRIPTsofijdsi"],
        240,
        335,
        {
          width: 175,
          align: "left",
          listType: "bullet",
          bulletRadius: 1,
        }
      );
    //experiences 2
    doc
      .fillColor("black")
      .font("Times-Bold", 13)
      .text("APPLICATION DEVELOPER", 240, 395);
    doc.fillColor("#7c7c7c").font("Courier", 13).text("AMAZON", 240, 410);
    doc.fillColor("black").font("Times-Bold", 13).text("2022 - 2023", 240, 425);
    doc
      .fillColor("#7c7c7c")
      .font("Courier", 13)
      .list(
        [
          "HTMLlksjfksjqljkkldjkjvdlkflkjvfdkljs",
          "CSS lsdfksjld slfdksj",
          "JAVASCRIPTsofijdsi",
        ],
        240,
        440,
        {
          width: 475,
          align: "left",
          listType: "bullet",
          bulletRadius: 1,
        }
      );
    //experiences 3
    doc
      .fillColor("black")
      .font("Times-Bold", 13)
      .text("APPLICATION DEVELOPER", 240, 500);
    doc.fillColor("#7c7c7c").font("Courier", 13).text("AMAZON", 240, 515);
    doc.fillColor("black").font("Times-Bold", 13).text("2022 - 2023", 240, 530);
    doc
      .fillColor("#7c7c7c")
      .font("Courier", 13)
      .list(
        [
          "HTMLlksjfksjqljkkldjkjvdlkflkjvfdkljs",
          "CSS lsdfksjld slfdksj",
          "JAVASCRIPTsofijdsi",
        ],
        240,
        545,
        {
          width: 475,
          align: "left",
          listType: "bullet",
          bulletRadius: 1,
        }
      );
    // section diplomes
    doc
      .fillColor("#2c515f")
      .font("Times-Bold", 15)
      .text("DIPLÖMES", 240, 600, { characterSpacing: 2 });
    doc.rect(240, 620, 50, 1).fillAndStroke("#b6b6b6").stroke();
    // diplome 1
    doc.fillColor("black").font("Times-Bold", 13).text("2022 - 2023", 240, 635);
    doc.fillColor("black").font("Times-Bold", 13).text("HETIC", 240, 650);
    doc
      .fillColor("#7c7c7c")
      .font("Courier", 13)
      .text("Bachelor developeur web", 240, 665, { lineBreak: false });
    // diplome 2
    doc.fillColor("black").font("Times-Bold", 13).text("2022 - 2023", 240, 690);
    doc
      .fillColor("black")
      .font("Times-Bold", 13)
      .text("HETIC", 240, 705, { lineBreak: false });
    doc
      .fillColor("#7c7c7c")
      .font("Courier", 13)
      .text("Bachelor developeur web", 240, 720, { lineBreak: false });
    doc.end();
    // Finalisez le document PDF
  }

  await addImageToPdf();
});

app.post("/update", async (req, res) => {
  const {
    name,
    job,
    color,
    description,
    urlProfil,
    phone,
    email,
    address,
    hardskill,
    softskill,
    job1,
    job2,
    job3,
    grade1,
    grade2,
  } = req.body;

  async function adddImageToPdf() {
    const doc = new PDFDocument();
    res.setHeader("Content-Type", "application/pdf");
    doc.pipe(res);
    doc.rect(0, 15, 1150, 220).fillAndStroke(color.box1).stroke();
    doc.rect(15, 0, 190, 1654).fillAndStroke(color.box2).stroke();
    const url = urlProfil; // Remplacez ceci par l'URL de votre image

    const fetch = (...args) =>
      import("node-fetch").then(({ default: fetch }) => fetch(...args));
    const response = await fetch(url);
    const logo = await response.arrayBuffer();

    // Ajoutez l'image au document en utilisant le buffer
    doc
      .circle(110, 110, 70)
      .save()
      .clip()
      .image(logo, 40, 50, {
        width: 120,
        height: 120,
        align: "center",
        valign: "center",
        cover: [140, 120],
      })
      .restore();

    doc.fillColor(color.text).font("Courier", 20).text(job, 240, 50, {
      lineBreak: false,
    });
    doc.fillColor(color.title).font("Times-Bold", 35).text(name, 240, 80, {
      characterSpacing: 2,
      lineBreak: false,
    });
    doc.moveDown(50);
    doc.rect(240, 130, 50, 1).fillAndStroke("#b6b6b6").stroke();
    doc.fillColor(color.text).font("Courier", 13).text(description, 240, 150, {
      width: 360,
      height: 80,
      align: "justify",
      lineBreak: true,
    });
    doc
      .fillColor(color.title)
      .font("Times-Bold", 15)
      .text("HARD SKILLS", 30, 250, { characterSpacing: 2 });
    doc.rect(30, 270, 50, 1).fillAndStroke("#b6b6b6").stroke();
    doc.fillColor(color.text).font("Courier", 13).list(hardskill, 30, 290, {
      width: 175,
      align: "left",
      listType: "bullet",
      bulletRadius: 1,
    });
    doc
      .fillColor(color.title)
      .font("Times-Bold", 15)
      .text("SOFT SKILLS", 30, 510, { characterSpacing: 2 });
    doc.rect(30, 530, 50, 1).fillAndStroke("#b6b6b6").stroke();
    doc.fillColor(color.text).font("Courier", 13).list(softskill, 30, 550, {
      width: 175,
      lineBreak: false,
      align: "left",
      listType: "bullet",
      bulletRadius: 1,
    });
    doc
      .fillColor(color.title)
      .font("Times-Bold", 15)
      .text("CONTACT", 30, 650, { characterSpacing: 2 });
    doc.rect(30, 670, 50, 1).fillAndStroke(color.text).stroke();
    doc.image("./public/phone.png", 30, 690, { width: 13 });
    doc
      .fillColor(color.text)
      .font("Courier", 13)
      .text(phone, 50, 690, { characterSpacing: 1 });
    doc
      .image("./public/mail.png", 30, 720, { width: 13 })
      .fillColor(color.text)
      .font("Courier", 13)
      .text(email, 50, 720, {
        width: 145,
        height: 30,
      });
    doc
      .image("./public/place.png", 30, 750, { width: 15 })
      .fillColor(color.text)
      .font("Courier", 13)
      .text(address, 50, 750, {
        width: 145,
        height: 50,
      });
    // section expériences
    doc
      .fillColor(color.title)
      .font("Times-Bold", 15)
      .text("EXPERIENCES", 240, 250, { characterSpacing: 2 });
    doc.rect(240, 270, 50, 1).fillAndStroke("#b6b6b6").stroke();
    //experiences 1
    doc.fillColor("black").font("Times-Bold", 13).text(job1.job, 240, 290);
    doc.fillColor(color.text).font("Courier", 13).text(job1.company, 240, 305);
    doc
      .fillColor("black")
      .font("Times-Bold", 13)
      .text(job1.date1 + " - " + job1.date2, 240, 320);
    doc
      .fillColor(color.text)
      .font("Courier", 13)
      .list([job1.tasks[0], job1.tasks[1], job1.tasks[2]], 240, 335, {
        width: 175,
        align: "left",
        listType: "bullet",
        bulletRadius: 1,
      });
    //experiences 2
    doc.fillColor("black").font("Times-Bold", 13).text(job2.job, 240, 395);
    doc.fillColor(color.text).font("Courier", 13).text(job2.company, 240, 410);
    doc
      .fillColor("black")
      .font("Times-Bold", 13)
      .text(job2.date1 + " - " + job2.date2, 240, 425);
    doc
      .fillColor(color.text)
      .font("Courier", 13)
      .list([job2.tasks[0], job2.tasks[1], job2.tasks[2]], 240, 440, {
        width: 475,
        align: "left",
        listType: "bullet",
        bulletRadius: 1,
      });
    //experiences 3
    doc.fillColor("black").font("Times-Bold", 13).text(job3.job, 240, 500);
    doc.fillColor(color.text).font("Courier", 13).text(job3.company, 240, 515);
    doc
      .fillColor("black")
      .font("Times-Bold", 13)
      .text(job3.date1 + " - " + job3.date2, 240, 530);
    doc
      .fillColor(color.text)
      .font("Courier", 13)
      .list([job3.tasks[0], job3.tasks[1], job3.tasks[2]], 240, 545, {
        width: 475,
        align: "left",
        listType: "bullet",
        bulletRadius: 1,
      });
    // section diplomes
    doc
      .fillColor(color.title)
      .font("Times-Bold", 15)
      .text("DIPLÖMES", 240, 600, { characterSpacing: 2 });
    doc.rect(240, 620, 50, 1).fillAndStroke("#b6b6b6").stroke();
    // diplome 1
    doc
      .fillColor("black")
      .font("Times-Bold", 13)
      .text(grade1.date1 + " - " + grade1.date2, 240, 635);
    doc.fillColor("black").font("Times-Bold", 13).text(grade1.school, 240, 650);
    doc
      .fillColor(color.text)
      .font("Courier", 13)
      .text(grade1.grade, 240, 665, { lineBreak: false });
    // diplome 2
    doc
      .fillColor("black")
      .font("Times-Bold", 13)
      .text(grade2.date1 + " - " + grade2.date2, 240, 690);
    doc
      .fillColor("black")
      .font("Times-Bold", 13)
      .text(grade2.school, 240, 705, { lineBreak: false });
    doc
      .fillColor(color.text)
      .font("Courier", 13)
      .text(grade2.grade, 240, 720, { lineBreak: false });

    doc.end();
  }

  await adddImageToPdf();
});
// sauvegarder cv dans base de donnée
app.post("/save", (req, res) => {
  let {
    urlProfil = null,
    job = null,
    fullname = null,
    description = null,
    phone = null,
    email = null,
    address = null,
    soft_skills = [],
    hard_skills = [],
    experiences = [],
    grade = [],
    Colorbox1 = null,
    Colorbox2 = null,
    Colortitle = null,
    Colortext = null,
  } = req.body;

  const experiencesJson = JSON.stringify(experiences);
  const educationsJson = JSON.stringify(grade);
  const softSkillsJson = JSON.stringify(soft_skills);
  const hardSkillsJson = JSON.stringify(hard_skills);

  const sql = `INSERT INTO pdf (
    urlProfil,
    job,
    fullname,
    description,
    phone,
    email,
    address,
    soft_skills,
    hard_skills,
    experiences,
    grade,
    Colorbox1,
    Colorbox2,
    color_title,
    color_text
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  // ajout '?' pour empecher les injections SQL
  //requête SQL
  db.query(
    sql,
    [
      urlProfil,
      job,
      fullname,
      description,
      phone,
      email,
      address,
      softSkillsJson,
      hardSkillsJson,
      experiencesJson,
      educationsJson,
      Colorbox1,
      Colorbox2,
      Colortitle,
      Colortext,
    ],
    (error) => {
      if (error) {
        console.error(error);
      }
      res.json({ message: "CV enregistré" });
    }
  );
});

// afficher tous les scv de la base de donnée
app.get("/cvs", (req, res) => {
  const sql = "SELECT id, fullname , date_creation FROM Pdf";

  db.query(sql, (error, results) => {
    if (error) {
      return res.status(500).send({ error });
    }
    res.json(results);
  });
});
// récuper un cv via son id
app.get("/cv/:id", (req, res) => {
  const { id } = req.params;

  const sql = "SELECT * FROM pdf WHERE id = ?";

  db.query(sql, [id], (error, results) => {
    if (error) {
      console.error(error);
      return res.json({
        error: "Erreuur",
      });
    }
    if (results.length > 0) {
      res.json(results[0]);
    } else {
      res.json({ message: "CV non trouvé" });
    }
  });
});
// supprimer cv par son id
app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM pdf WHERE id = ?";

  db.query(sql, [id], (error) => {
    if (error) {
      return res.json({ error: "Erreur suppression CV" });
    }
    res.json({ message: "CV supprimé" });
  });
});
app.listen(port, () => {
  console.log(`connexion au port${port}`);
});

let menu = "profil";
// affichage menu
function menuDisplay() {
  document.querySelectorAll(".section_form_bloc").forEach((el) => {
    el.id === `section_${menu}`
      ? el.classList.remove("hidden")
      : el.classList.add("hidden");
  });
}
menuDisplay();
// quand menu correspond à l'icone nav modifie son appararance
function menuSelected() {
  document.querySelectorAll(".nav_icone_box").forEach((el) => {
    el.dataset.name === menu
      ? el.classList.add("menu_selected")
      : el.classList.remove("menu_selected");
  });
}
menuSelected();

// cible menu icone
document.querySelector("#section_nav").addEventListener("click", (e) => {
  let cible = e.target;
  let nav = cible.closest(".icon_menu");
  Boolean(nav) === false ? null : (menu = nav.dataset.name);
  menuDisplay();
  menuSelected();
});
//fonction pour afficher les cvs de la Bd
function displayCvs() {
  fetch("http://localhost:3000/cvs")
    .then((response) => response.json())
    .then((data) => {
      const list = document.getElementById("listCv");
      list.innerHTML = "";
      data.forEach((cv) => {
        const date = new Date(cv.date_creation);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString();
        const day = date.getDate().toString();
        const hours = date.getHours().toString();
        const minutes = date.getMinutes().toString();
        const newDate = `${day}/${month}/${year} ${hours}:${minutes}`;
        const item = document.createElement("li");
        item.className = "list_li";
        const deleteIcon = document.createElement("i");
        deleteIcon.className = "fa-solid fa-xmark iconDelete";
        deleteIcon.onclick = () => deleteCv(cv.id);
        const cvTitle = document.createElement("p");
        cvTitle.className = "list_cv_title";
        cvTitle.innerHTML = `<i class="fa-solid fa-file-pdf"></i>${
          cv.fullname + " " + newDate
        }`;
        cvTitle.onclick = () => loadcv(cv.id);
        item.appendChild(cvTitle);
        item.appendChild(deleteIcon);

        list.appendChild(item);
      });
    })
    .catch((error) => console.error("Erreur:", error));
}
//bouton history
document.querySelector("#history").addEventListener("click", (e) => {
  e.preventDefault();
  menu = "history";

  menuDisplay();
  displayCvs();
});
// fonction pour pouvoir supprimer un cv par son id
function deleteCv(id) {
  fetch(`http://localhost:3000/delete/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      response.json();
    })
    .then((data) => {
      displayCvs();
    })
    .catch((error) => {
      console.error(error);
    });
}
// fonction qui permet d'afficher les données du cv sélectionné
function loadcv(id) {
  fetch(`http://localhost:3000/cv/${id}`)
    .then((response) => response.json())
    .then((cv) => {
      document.querySelector("#name").value = cv.fullname || "";
      document.querySelector("#description").value = cv.description || "";
      document.querySelector("#url").value = cv.urlProfil || "";
      document.querySelector("#job").value = cv.job || "";
      document.querySelector("#phone").value = cv.phone || "";
      document.querySelector("#email").value = cv.email || "";
      document.querySelector("#address").value = cv.address || "";

      const experience1 = cv.experiences[0];
      document.querySelector(".experiences_1.job").value =
        experience1.job || "";
      document.querySelector(".experiences_1.company").value =
        experience1.company || "";
      document.querySelector(".experiences_1.date1").value =
        experience1.date1 || "";
      document.querySelector(".experiences_1.date2").value =
        experience1.date2 || "";
      document.querySelector(".experiences_1.tasksjob1").value =
        experience1.tasks[0] || "";
      document.querySelector(".experiences_1.tasksjob2").value =
        experience1.tasks[1] || "";
      document.querySelector(".experiences_1.tasksjob3").value =
        experience1.tasks[2] || "";

      const experience2 = cv.experiences[1];
      document.querySelector(".experiences_2.job").value =
        experience2.job || "";
      document.querySelector(".experiences_2.company").value =
        experience2.company || "";
      document.querySelector(".experiences_2.date1").value =
        experience2.date1 || "";
      document.querySelector(".experiences_2.date2").value =
        experience2.date2 || "";
      document.querySelector(".experiences_2.tasksjob1").value =
        experience2.tasks[0] || "";
      document.querySelector(".experiences_2.tasksjob2").value =
        experience2.tasks[1] || "";
      document.querySelector(".experiences_2.tasksjob3").value =
        experience2.tasks[2] || "";

      const experience3 = cv.experiences[2];
      document.querySelector(".experiences_3.job").value =
        experience3.job || "";
      document.querySelector(".experiences_3.company").value =
        experience3.company || "";
      document.querySelector(".experiences_3.date1").value =
        experience3.date1 || "";
      document.querySelector(".experiences_3.date2").value =
        experience3.date2 || "";
      document.querySelector(".experiences_1.tasksjob1").value =
        experience3.tasks[0] || "";
      document.querySelector(".experiences_1.tasksjob2").value =
        experience3.tasks[1] || "";
      document.querySelector(".experiences_1.tasksjob3").value =
        experience3.tasks[2] || "";

      const grade1 = cv.grade[0];
      document.querySelector(".diplôme_1.date1").value = grade1.date1 || "";
      document.querySelector(".diplôme_1.date2").value = grade1.date2 || "";
      document.querySelector(".diplôme_1.school").value =
        grade1.school.toUpperCase() || "";
      document.querySelector(".diplôme_1.grade").value = grade1.grade || "";

      const grade2 = cv.grade[1];
      document.querySelector(".diplôme_2.date1").value = grade2.date1 || "";
      document.querySelector(".diplôme_2.date2").value = grade2.date2 || "";
      document.querySelector(".diplôme_2.school").value =
        grade2.school.toUpperCase() || "";
      document.querySelector(".diplôme_2.grade").value = grade2.grade || "";

      document.querySelector("#color_box_horizontal").value =
        cv.Colorbox1 || "";
      document.querySelector("#color_box_vertical").value = cv.Colorbox2 || "";
      document.querySelector("#color_title").value = cv.Colortitle || "";
      document.querySelector("#color_text").value = cv.Colortext || "";

      fetchpdf()
        .then((element) => element.blob())
        .then((data) => {
          // Créer une URL blob
          const url = window.URL.createObjectURL(data);
          const iframe = document.querySelector("#resume_preview");
          iframe.src = url + "#toolbar=0";
        });
      menu = "profil";
      menuDisplay();
    })
    .catch((error) => console.error("Erreur:", error));
}

// affiche pdf par défaut
fetch("http://localhost:3000/")
  .then((element) => element.blob())
  .then((data) => {
    const url = window.URL.createObjectURL(data);
    const iframe = document.querySelector("#resume_preview");
    iframe.src = url + "#toolbar=0";
  });

//input change ajout tableaux hardskills
let hardskills = [];
document.querySelectorAll(".hard_skills").forEach((el, index) =>
  el.addEventListener("change", (e) => {
    hardskills.splice(index, 0, e.target.value.toUpperCase());
  })
);

//input change ajout tableaux hardskills
let softskills = [];
document.querySelectorAll(".soft_skills").forEach((el, index) =>
  el.addEventListener("change", (e) => {
    softskills.splice(index, 0, e.target.value.toUpperCase());
  })
);
// call api Post modif pdf
async function fetchpdf() {
  const result = await fetch("http://localhost:3000/update", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: document.querySelector("#name").value,

      description: document.querySelector("#description").value,
      urlProfil: document.querySelector("#url").value,
      job: document.querySelector("#job").value.toUpperCase(),
      phone: document.querySelector("#phone").value,
      email: document.querySelector("#email").value,
      address: document.querySelector("#address").value,
      hardskill: hardskills,
      softskill: softskills,
      job1: {
        job: document.querySelector(".experiences_1.job").value.toUpperCase(),
        company: document
          .querySelector(".experiences_1.company")
          .value.toUpperCase(),
        date1: document.querySelector(".experiences_1.date1").value,
        date2: document.querySelector(".experiences_1.date2").value,
        tasks: [
          document.querySelector(".experiences_1.tasksjob1").value,
          document.querySelector(".experiences_1.tasksjob2").value,
          document.querySelector(".experiences_1.tasksjob3").value,
        ],
      },
      job2: {
        job: document.querySelector(".experiences_2.job").value.toUpperCase(),
        company: document
          .querySelector(".experiences_2.company")
          .value.toUpperCase(),
        date1: document.querySelector(".experiences_2.date1").value,
        date2: document.querySelector(".experiences_2.date2").value,
        tasks: [
          document.querySelector(".experiences_2.tasksjob1").value,
          document.querySelector(".experiences_2.tasksjob2").value,
          document.querySelector(".experiences_2.tasksjob3").value,
        ],
      },
      job3: {
        job: document.querySelector(".experiences_3.job").value.toUpperCase(),
        company: document
          .querySelector(".experiences_3.company")
          .value.toUpperCase(),
        date1: document.querySelector(".experiences_3.date1").value,
        date2: document.querySelector(".experiences_3.date2").value,
        tasks: [
          document.querySelector(".experiences_3.tasksjob1").value,
          document.querySelector(".experiences_3.tasksjob2").value,
          document.querySelector(".experiences_3.tasksjob3").value,
        ],
      },
      grade1: {
        date1: document.querySelector(".diplôme_1.date1").value,
        date2: document.querySelector(".diplôme_1.date2").value,
        school: document.querySelector(".diplôme_1.school").value.toUpperCase(),
        grade: document.querySelector(".diplôme_1.grade").value,
      },
      grade2: {
        date1: document.querySelector(".diplôme_2.date1").value,
        date2: document.querySelector(".diplôme_2.date2").value,
        school: document.querySelector(".diplôme_2.school").value.toUpperCase(),
        grade: document.querySelector(".diplôme_2.grade").value,
      },
      color: {
        box1: document.querySelector("#color_box_horizontal").value,
        box2: document.querySelector("#color_box_vertical").value,
        title: document.querySelector("#color_title").value,
        text: document.querySelector("#color_text").value,
      },
    }),
  });
  return result;
}

document.querySelectorAll("input").forEach((el) =>
  el.addEventListener("change", () => {
    fetchpdf()
      .then((element) => element.blob())
      .then((data) => {
        // Créer une URL blob
        const url = window.URL.createObjectURL(data);
        const iframe = document.querySelector("#resume_preview");
        iframe.src = url + "#toolbar=0";
      });
  })
);
// bouton download
document.querySelector("#download").addEventListener("click", () => {
  function download_file(fileURL, fileName) {
    var link = document.createElement("a");
    link.href = fileURL;
    link.setAttribute("download", fileName);
    link.click();
  }
  let fileURL = document.querySelector("#resume_preview").src;
  let fileName = `${document.querySelector("#name").value} CV.pdf`;
  download_file(fileURL, fileName);
});

//bouton Save
document.getElementById("save").addEventListener("click", () => {
  fetch("http://localhost:3000/save", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      job: document.querySelector("#job").value.toUpperCase(),
      phone: document.querySelector("#phone").value,
      email: document.querySelector("#email").value,
      address: document.querySelector("#address").value,
      urlProfil: document.querySelector("#url").value,
      fullname: document.querySelector("#name").value,
      description: document.querySelector("#description").value,
      soft_skills: softskills,
      hard_skills: hardskills,
      experiences: [
        {
          job: document.querySelector(".experiences_1.job").value.toUpperCase(),
          company: document
            .querySelector(".experiences_1.company")
            .value.toUpperCase(),
          date1: document.querySelector(".experiences_1.date1").value,
          date2: document.querySelector(".experiences_1.date2").value,
          tasks: [
            document.querySelector(".experiences_1.tasksjob1").value,
            document.querySelector(".experiences_1.tasksjob2").value,
            document.querySelector(".experiences_1.tasksjob3").value,
          ],
        },
        {
          job: document.querySelector(".experiences_2.job").value.toUpperCase(),
          company: document
            .querySelector(".experiences_2.company")
            .value.toUpperCase(),
          date1: document.querySelector(".experiences_2.date1").value,
          date2: document.querySelector(".experiences_2.date2").value,
          tasks: [
            document.querySelector(".experiences_2.tasksjob1").value,
            document.querySelector(".experiences_2.tasksjob2").value,
            document.querySelector(".experiences_2.tasksjob3").value,
          ],
        },
        {
          job: document.querySelector(".experiences_3.job").value.toUpperCase(),
          company: document
            .querySelector(".experiences_3.company")
            .value.toUpperCase(),
          date1: document.querySelector(".experiences_3.date1").value,
          date2: document.querySelector(".experiences_3.date2").value,
          tasks: [
            document.querySelector(".experiences_3.tasksjob1").value,
            document.querySelector(".experiences_3.tasksjob2").value,
            document.querySelector(".experiences_3.tasksjob3").value,
          ],
        },
      ],
      grade: [
        {
          date1: document.querySelector(".diplôme_1.date1").value,
          date2: document.querySelector(".diplôme_1.date2").value,
          school: document
            .querySelector(".diplôme_1.school")
            .value.toUpperCase(),
          grade: document.querySelector(".diplôme_1.grade").value,
        },
        {
          date1: document.querySelector(".diplôme_2.date1").value,
          date2: document.querySelector(".diplôme_2.date2").value,
          school: document
            .querySelector(".diplôme_2.school")
            .value.toUpperCase(),
          grade: document.querySelector(".diplôme_2.grade").value,
        },
      ],
      Colorbox1: document.querySelector("#color_box_horizontal").value,
      Colorbox2: document.querySelector("#color_box_vertical").value,
      Colortitle: document.querySelector("#color_title").value,
      Colortext: document.querySelector("#color_text").value,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      displayCvs();
      menu = "history";
      menuDisplay();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

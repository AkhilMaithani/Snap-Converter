// strict mode on
"use strict";
// #######################################################
// global variables
let length = 0;
let number = 0;
let num = 0;
let uniElement;
let images = [];
// #######################################################
// add images
function addImagesToPDF(element) {
  length = element.files.length;
  for (var i = 0; i < length; i++) {
    displayImages(element, i);
  }
  displayDone(length);
}
// #######################################################
// display done button
let displayDone = (length) => {
  var doneBlock = document.getElementsByClassName("done");
  var converBlock = document.getElementsByClassName("convert-PDF");

  if (length >= 1) {
    doneBlock[0].style.display = "block";
  } else {
    doneBlock[0].style.display = "none";
  }
  converBlock[0].style.display = "none";
};
// #######################################################
// show convert button
let displayConvert = function () {
  var doneBlock = document.getElementsByClassName("done");
  var converBlock = document.getElementsByClassName("convert-PDF");

  doneBlock[0].style.display = "none";
  converBlock[0].style.display = "block";
};
// #######################################################
// display images
function displayImages(element, index) {
  // add-data
  let addData = document.getElementsByClassName("add-data");
  num = number;

  // pdf-file
  let pdfFileSection = document.createElement("section");
  pdfFileSection.setAttribute("class", "pdf-file");
  pdfFileSection.setAttribute("id", `${num}`);
  addData[0].prepend(pdfFileSection);

  // pdf-file-data
  let pdfFileDataDiv = document.createElement("div");
  pdfFileDataDiv.setAttribute("class", "pdf-file-data");
  pdfFileSection.appendChild(pdfFileDataDiv);

  // trash-button
  let trashButton = document.createElement("p");
  trashButton.setAttribute("class", "trash-button");
  trashButton.setAttribute("onclick", "deleteElement(this)");
  trashButton.setAttribute("id", `${num}`);
  ++number;
  pdfFileDataDiv.appendChild(trashButton);

  // icon
  let iIcon = document.createElement("i");
  iIcon.setAttribute("class", "fa-solid fa-trash-can");
  trashButton.appendChild(iIcon);

  // image section
  let imageSection = document.createElement("div");
  imageSection.setAttribute("class", "image-section");
  pdfFileDataDiv.appendChild(imageSection);

  // image tag
  let imageAdd = document.createElement("img");
  imageAdd.src = URL.createObjectURL(element.files[index]);
  imageSection.appendChild(imageAdd);

  // image name
  let imageName = document.createElement("p");
  imageName.setAttribute("class", "image-name");
  pdfFileDataDiv.appendChild(imageName);
  imageName.innerHTML = element.files[index].name;

  images.unshift(`${element.files[index].name}`);
  uniElement = element;
}
// #######################################################
// Delete Image
let deleteElement = (e) => {
  let newId = e.id;
  let pdfFile = document.getElementsByClassName("pdf-file");

  for (let i = 0; i < pdfFile.length; i++) {
    if (pdfFile[i].id == newId) {
      pdfFile[i].remove();
      --length;
    }
  }
  displayDone(length);
};
// #######################################################
// download pdf file
let downloadPDF = () => {
  let width;
  let height;

  width = Number(document.getElementById("image-width").value);
  height = Number(document.getElementById("image-height").value);

  if (width === 0) {
    width = 200;
  }
  if (height === 0) {
    height = 200;
  }

  const doc = new jsPDF();
  let imageAdd = document.getElementsByTagName("img");
  let length = imageAdd.length;

  for (let i = 0; i < length; i++) {
    let imagePath = imageAdd[i];
    doc.addImage(imagePath, 5, 5, width, height);
    doc.addPage();
  }

  let numberOfPages = doc.internal.getNumberOfPages();
  doc.deletePage(numberOfPages);
  doc.save("imageToPDF.pdf");
};

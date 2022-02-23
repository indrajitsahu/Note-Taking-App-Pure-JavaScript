console.log("Welcome to note taking app");

showNotes();

let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function () {
  // if(addTxt.value==null)

  let addTxt = document.getElementById("addTxt");
  let notes = localStorage.getItem("notes");
  let notesObj;

  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  notesObj.push(addTxt.value);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTxt.value = "";
  console.log(notesObj);
  showNotes();
});

function showNotes() {
  let notes = localStorage.getItem("notes");
  let notesObj;
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  let html = "";
  notesObj.forEach(function (element, index) {
    html += `
        <div class="noteCard card my-2 mx-2" style="width: 18rem;">
          <div class="card-body">
              <h5 class="card-title">Note ${index + 1}</h5>
              <p class="card-text">${element}</p>
              <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
          </div>
        </div>`;
  });

  let notesElm = document.getElementById("notes");

  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    // noteElm.innerHTML = "Add a note to show them here.";
    notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
  }
}

function deleteNote(index) {
  // console.log("I am deleting this note " + index);

  let notes = localStorage.getItem("notes");
  let notesObj;
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}

let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
  let inputVal = search.value.toLowerCase();
  let noteCards = document.getElementsByClassName("noteCard");

  Array.from(noteCards).forEach(function (element) {
    let cardTxt = element.getElementsByTagName("p")[0].innerText.toLowerCase();
    if (cardTxt.includes(inputVal)) element.style.display = "block";
    else element.style.display = "none";
  });
});






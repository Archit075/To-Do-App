// console.log('hello this is js file')


showNotes();
    


//if user adds the note add it to the local storage
let addBtn = document.getElementById('addBtn');      // getting acces of addBtn
addBtn.addEventListener("click", function (e) {
    let addtext = document.getElementById("addText");
    let addTitle = document.getElementById("addTitle");

    let notes = localStorage.getItem("notes");          //  check in the local storage if there is any text in in notes
    let notesObj;
    if (notes == null) {
        notesObj = [];         // if there's nothing then leave a space there
    }
    else {
        notesObj = JSON.parse(notes);        //if there is any text then convert it into an array
    }
    let myObj = {
        title: addTitle.value,
        text: addText.value
    }
    
    notesObj.push(myObj);       // push the value in the notesObj
    localStorage.setItem("notes", JSON.stringify(notesObj));       // set the item in the local storage by converting it into     string chunks for storing it as an array
    addText.value = "";
    addTitle.value = "";                 // after storing empty the addtext for the next notes
    //  console.log(notesObj);
    showNotes();  // to update the given notes in the lower cards
});



// Function to show elements from the local storage

function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += ` <div class="noteCard my-2 mx-5" style="width: 18rem;">
                    <div class="card-body">
                    <h5 class="card-title">${index + 1}. ${element.title}</h5>
                    <p class="card-text">${element.text}</p>
                    <button id="${index}" onclick="deleteNotes(this.id)" class="btn btn-primary">Delete Note</button>
                    </div>
                </div>`;
    });
    let notesElm = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes`;
    }
}
//<h5 class="card-title">Notes ${index + 1}</h5>

//function to delete notes

function deleteNotes(index) {
    //console.log('i am deleting', index);
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}



//making search functionality 

let search = document.getElementById('searchTxt');
search.addEventListener("input", function(){

    let inputVal = search.value.toLowerCase();
    // console.log('Input event fired!', inputVal);
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
        // console.log(cardTxt);
    })
})


// let search = document.getElementById('searchTxt');
// search.addEventListener("input", function(){  
    
//     let inputVal = search.value.toLowerCase;
//     //console.log('input event fired!', inputVal);
//     let noteCards = document.getElementsByClassName('noteCard');
//     Array.from(noteCards).forEach(function(element){
//         let cardTxt = element.getElementsByTagName("p")[0].innerText;
//        // console.log(cardTxt);
//         if(cardTxt.includes(inputVal)){
//             element.style.display = "block";
//         }
//         else{
//             element.style.display = "none";
//         }
//     })
// })
console.log("Welcome to note app");
showNotes();

//if user add's a note, add it to the local storage

let addBtn = document.getElementById("addBtn");


addBtn.addEventListener('click', function (event) {
    let addTxt = document.getElementById("addTxt");
    let addTitle=document.getElementById("addTitle");
    let notes = localStorage.getItem("notes");

    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    let myObj={
        title:addTitle.value,
        text:addTxt.value
    }
    notesObj.push(myObj);
    // notesObj.push(addTitle.value);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    addTitle.value="";
    // console.log(notesObj);
    showNotes();
});
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
        html += ` <div class="my-2 mx-2 card noteCard" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">${element.title}</h5>
            <p class="card-text">${element.text}</p>
            <button  id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
        </div>
    </div>`;

    });
    let notesElm = document.getElementById("notes");
    if (notesObj.length != 0) 
    {
        notesElm.innerHTML = html;

    }

}


//function to delete a note

function deleteNote(index) {
    console.log(index);
    // localStorage.removeItem(index);
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index,1);
    localStorage.setItem("notes",JSON.stringify(notesObj));
    showNotes();


}

let searchTxt=document.getElementById("searchTxt");


searchTxt.addEventListener("input",function(){
    let inputVal=searchTxt.value;
    // console.log("Input",inputVal);
    let noteCards=document.getElementsByClassName("noteCard");
    Array.from(noteCards).forEach(function(element){
         
        let cardTxt=element.getElementsByTagName("p")[0].innerText;
        // console.log(cardTxt);

        if(cardTxt.includes(inputVal)){
            element.style.display="block";
        }
        else{
            // element.setAttribute("style","display:none");
            element.style.display="none";
        }
       
        
    });
});



var siteName = document.getElementById("sitename");
var siteUrl = document.getElementById("siteurl");
var addBtn = document.getElementById("addBtn");
var UpdateBtn = document.getElementById("UpdateBtn")
var tableContent = document.getElementById("tableContent");
var currentIndex;
var bookMarksList = [];
if(localStorage.getItem("bookMarksList") != null){
    bookMarksList = JSON.parse(localStorage.getItem("bookMarksList"))
    displayWebsite(bookMarksList)
}


function addWebsite(){
    if(validationName()==true && validationSite()==true){
        var addToForm = {
            name: siteName.value,
            url: siteUrl.value,
        }
        bookMarksList.push(addToForm);
        updateLocalStorage()
        displayWebsite(bookMarksList);
        updateInputValue();
    }else{
        addBtn.setAttribute('data-bs-toggle', 'modal');
        addBtn.setAttribute('data-bs-target', '#exampleModal');
    }

}

function displayWebsite(List){
    var marks = ``;
    for(var i=0 ; i<List.length ; i++){
        marks += `<tr>
                    <td>${i+1}</td>
                    <td class="text-capitalize">${List[i].name}</td>
                    <td><a href="${List[i].url}"><button class="btn btn-primary px-3"><i class="fa-solid fa-eye"></i> Visit</button></a></td>
                    <td><button onclick="getDataOnClick(${i})" class="btn btn-warning px-3"><i class="fa-solid fa-pen-to-square"></i> Update</button></td>
                    <td><button onclick="deleteBookmark(${i})" class="btn btn-danger px-3"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
                </tr>`
    }

    document.getElementById("tableContent").innerHTML = marks;
}

function updateLocalStorage(){
    localStorage.setItem("bookMarksList",JSON.stringify(bookMarksList))
}

function deleteBookmark(index){
    bookMarksList.splice(index,1)
    updateLocalStorage()
    displayWebsite(bookMarksList)
}

function updateInputValue(config){
    siteName.value = config ? config.name : null;
    siteUrl.value = config ? config.url : null;
}

function getDataOnClick(index){
    updateInputValue(bookMarksList[index])
    currentIndex=index;
    addBtn.classList.add('d-none')
    UpdateBtn.classList.remove('d-none')
}

function updateBookmark(){
    bookMarksList[currentIndex].name = siteName.value
    bookMarksList[currentIndex].url = siteUrl.value
    displayWebsite(bookMarksList)
    updateLocalStorage()
    addBtn.classList.remove('d-none')
    UpdateBtn.classList.add('d-none')
    updateInputValue()
}

function validationName() {
    var regex = /^\w{3,}$/;
    if (regex.test(siteName.value)) {
        siteName.classList.add('is-valid')
        siteName.classList.remove('is-invalid')
        addBtn.removeAttribute('data-bs-toggle', 'modal');
        addBtn.removeAttribute('data-bs-target', '#exampleModal');
        return true;
    }
    else {
        siteName.classList.add('is-invalid')
        siteName.classList.remove('is-valid')
        addBtn.setAttribute('data-bs-toggle', 'modal');
        addBtn.setAttribute('data-bs-target', '#exampleModal');
        return false;
    }



}

function validationSite() {

    var regex = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;

    if (regex.test(siteUrl.value)) {
        siteUrl.classList.add('is-valid')
        siteUrl.classList.remove('is-invalid')
        addBtn.removeAttribute('data-bs-toggle', 'modal');
        addBtn.removeAttribute('data-bs-target', '#exampleModal');
        return true;
    }
    else {
        siteUrl.classList.add('is-invalid')
        siteUrl.classList.remove('is-valid')
        addBtn.setAttribute('data-bs-toggle', 'modal');
        addBtn.setAttribute('data-bs-target', '#exampleModal');
        return false;
    }

}
const elList=document.querySelector(".book-list");
const elTemplate=document.querySelector(".item-template").content;
let itemFragment=new DocumentFragment();


// Search dom elment
const elFormSearch=document.querySelector(".search-form-js");
const elSErachInput=document.querySelector(".form-control")
const elSErachAuthorInput=document.querySelector(".input-author-search")
let elValueAthor
const elSelectSort=document.querySelector(".sort-by-select");


// Create option for language
const elSelectSortLanguage=document.querySelector(".sort-language");
let optionFragment=new DocumentFragment();

let allLanguage=[]

function makeList(array) {
    elList.innerHTML=""
    array.forEach(obj => {
        let templatClone=elTemplate.cloneNode(true);
        templatClone.querySelector(".front").src=obj.imageLink
        templatClone.querySelector(".book-title").textContent=obj.title
        templatClone.querySelector(".book-in-title").textContent=obj.title
        templatClone.querySelector(".book-year").textContent=obj.year
        templatClone.querySelector(".book-pages").textContent=obj.pages
        templatClone.querySelector(".book-language").textContent=obj.language
        templatClone.querySelector(".book-author").textContent=obj.author
        templatClone.querySelector(".book-wiki").href=obj.link

        itemFragment.appendChild(templatClone)
    });
    elList.appendChild(itemFragment)
}

function filletArray(item){
    return books.filter(elm =>{
        return elm.title.match(item) && elm.author.match(elValueAthor) && (elSelectSortLanguage.value=="all" || elm.language.includes(elSelectSortLanguage.value))
    })
}

function sortBY(array, which) {
    if (which=="default") {
        return
    }else if(which=="a-z"){
        array.sort((a,b)=> a.title.charCodeAt(0)- b.title.charCodeAt(0))
    }else if(which=="z-a"){
        array.sort((a,b)=> b.title.charCodeAt(0)- a.title.charCodeAt(0))
    }else if(which=="0-1"){
        array.sort((a,b)=> a.year- b.year)
    }else if(which=="1-0"){
        array.sort((a,b)=> b.year- a.year)
    }else if(which=="many"){
        array.sort((a,b)=> b.pages- a.pages)
    }else if(which=="few"){
        array.sort((a,b)=> a.pages- b.pages)
    }else{
        return 0
    }


    
}

function filterlanguage() {
    books.forEach(item=>{
        let fewTimeArray=[]
        fewTimeArray.push(item.language)
        fewTimeArray.forEach(elm=>{
            if (!allLanguage.includes(elm)) {
                allLanguage.push(elm)
            }
        })
    })
}

function createOption() {
    allLanguage.forEach(elm=>{
        let forElOption=document.createElement("option");
        forElOption.textContent=elm
        forElOption.value=elm
        optionFragment.appendChild(forElOption)
    })
    elSelectSortLanguage.appendChild(optionFragment)
}




elFormSearch.addEventListener("submit", evt=>{
    evt.preventDefault('')
    let inputValue=new RegExp(elSErachInput.value.trim(), "gi")
    elValueAthor=new RegExp(elSErachAuthorInput.value.trim(), "gi")
    let filertArray=filletArray(inputValue)
    let valueSelectSort=elSelectSort.value
    if (filertArray.length > 0) {
        sortBY(filertArray, valueSelectSort)
        makeList(filertArray)
    }else{
        alert("Sory i can not foud this book")
    }

})



filterlanguage()
createOption()
makeList(books)

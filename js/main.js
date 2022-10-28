const elList=document.querySelector(".book-list");
const elTemplate=document.querySelector(".item-template").content;
let itemFragment=new DocumentFragment();


// Search dom elment
const elFormSearch=document.querySelector(".search-form-js");
const elSErachInput=document.querySelector(".form-control")

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
        return elm.title.match(item)
    })
}


elFormSearch.addEventListener("submit", evt=>{
    evt.preventDefault('')
    let inputValue=new RegExp(elSErachInput.value.trim(), "gi")
    let filertArray=filletArray(inputValue)
    if (filertArray.length > 0) {
        makeList(filertArray)
    }

})




makeList(books)

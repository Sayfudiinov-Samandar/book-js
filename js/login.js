const elForm=document.querySelector(".site-form")
const elInputEmail=elForm.querySelector(".input-email")
const elInputPassword=elForm.querySelector(".input-password")
const elSeePassword=document.querySelector(".see-pasword")
// console.log(elSeePassword);


elSeePassword.addEventListener("mousedown", function(){
    elInputPassword.type="text"
    elSeePassword.classList.add("not-see")
})

window.addEventListener("mouseup", function(){
    elInputPassword.type="password"
    elSeePassword.classList.remove("not-see")

})


async function sendApi() {
try {
    let emailValue=elInputEmail.value.trim()
    let passwordValue=elInputPassword.value.trim()
    
    const res= await fetch("https://reqres.in/api/login",{
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify({
            email: "eve.holt@reqres.in",
            password: "cityslicka",
        })
    })
    let data =await res.json()

    if (data.token) {
        location.replace("index.html")
    }
    localStorage.setItem("token", data.token)
} catch (error) {
    console.log(error);
    
}
}



elForm.addEventListener("submit", function(evt){
    evt.preventDefault();
    sendApi()
})
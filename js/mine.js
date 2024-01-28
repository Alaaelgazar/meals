// ------loading screen------
$(document).ready(
    function(){
        $(".loadingpage").fadeOut(1000);
        $("body").css("overflow", "visible")        

    }
    
)

// ------side Bar--------
function openSideNav() {
    $(".sideBar").animate({ left: 0}, 500)
    $(".open-close-icon").removeClass("fa-align-justify");
    $(".open-close-icon").addClass("fa-x");
    for (let i = 0; i < 5; i++) {
        $(".links li").eq(i).animate({top: 0},500)
    }
}
function closeSideNav() {
    let boxWidth = $(".sideBar .nav-content").outerWidth()
    $(".sideBar").animate({left: -boxWidth}, 500)
    $(".open-close-icon").addClass("fa-align-justify");
    $(".open-close-icon").removeClass("fa-x");
    $(".links li").animate({top: 300}, 500)
}
closeSideNav()
$(".sideBar i.open-close-icon").click(function() {
    if ($(".sideBar").css("left") == "0px") {
        closeSideNav()
    } else {
        openSideNav()
    }
})
let Datarow = document.getElementById("Data");
let searchContainer =document.getElementById("searchContainer");

// ========defult===========

async function getdata(){
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`) ;
    respone= await respone.json();
    console.log(respone);
    diplaydata(respone.meals)
}
function diplaydata(data){
    let cartoona = "";
    for (let i = 0; i < data.length; i++) {
        cartoona += `
        <div class="col-md-3">
            <div class="meal  overflow-hidden position-relative rounded-2">
            <img src="${data[i].strMealThumb}" class="w-100" alt="meal">
            <div class="meal-layer position-absolute d-flex flex-column align-items-center text-black  p-2">
                <h3>${data[i].strMeal}</h3>
            </div>
        </div>
    </div>
        `
}}
getdata()

// ========= Search by name =========


function searchInputs(){
    searchContainer.innerHTML=`
    <div class="row p-4">
            <div class="col-md-6">
                <input onkeyup="searchByName(this.value)" placeholder="Search By Name" type="text" class="form-control py-2">
            </div>
            <div class="col-md-6">
                <input onkeyup="searchByFLetter(this.value)" maxlength="1" placeholder="Search By First Letter" type="text" class="form-control py-2">
            </div>
        </div>
    `
    Datarow.innerHTML = ""
}
async function searchByName(letter) {
    Datarow.innerHTML = ""
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${letter}`)
    response = await response.json()
    displayMeals(response.meals)
}

// =======search by first name=====
async function searchByFLetter(letter) {
    Datarow.innerHTML = ""
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
    response = await response.json()
    displayMeals(response.meals)
}




// ===categories=====
async function getcat(){
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    response = await response.json();
    displayCat(response.categories)
}
function displayCat(data) {
    let cartoona = "";
    for (let i = 0; i < data.length; i++) {
        cartoona += `
        <div class="col-md-3">
            <div onclick="getCategoryDetails('${data[i].strCategory}')"  class="meal  overflow-hidden position-relative rounded-2">
            <img src="${data[i].strCategoryThumb}" class="w-100" alt="meal">
            <div class="meal-layer position-absolute d-flex flex-column align-items-center text-black  p-2">
                <h3>${data[i].strCategory}</h3>
                <P>${data[i].strCategoryDescription.split(" ").slice( 0 ,25).join(" ")}</P>
            </div>
        </div>
    </div>
        `
    }

    Datarow.innerHTML = cartoona
}
async function getCategoryDetails(category){
    let respone= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    respone= await respone.json();
    displayMeals(respone.meals.slice(0,20))
}







// ===Area=====
async function getArea(){
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    response = await response.json();
    displayArea(response.meals)
}

function displayArea(data) {
    let cartoona = "";
    for (let i = 0; i < data.length; i++) {
        cartoona += `
        <div class="col-md-3 text-white">
            <div onclick="getAreaDetails('${data[i].strArea}')"  class="meal  position-relative rounded-2">
            <i class="fa-solid fa-house-laptop fa-4x"></i>
                <h3>${data[i].strArea}</h3>
        </div>
    </div>
        `
    }

    Datarow.innerHTML = cartoona
}
async function getAreaDetails(area){
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
    respone= await respone.json();
    displayMeals(respone.meals.slice(0,20))
}









// ====ingradiants=====
async function getIngraidents(){
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    response = await response.json();
    displayIngraidents(response.meals)
}
function displayIngraidents(data) {
    let cartoona = "";
    for (let i = 0; i < data.length; i++) {
        cartoona += `
        <div class="col-md-3">
            <div onclick="getIngradientDetails('${data[i].strIngredient}')" class="rounded-2 text-center cursor-pointer">
            <i class="fa-solid fa-drumstick-bite fa-4x"></i>
            <h3 class="text-white">${data[i].strIngredient}</h3>
            <p class="text-white">${data[i].strDescription}</p>
            </div>
        </div>
        `}
        Datarow.innerHTML = cartoona}
async function getIngradientDetails(ingradiants){
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingradiants}`)
    response = await response.json();
    displayMeals(response.meals.slice(0,25))
}





function displayMeals(data) {
    let cartoona = "";

    for (let i = 0; i < data.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="MealDetails('${data[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${data[i].strMealThumb}" alt="">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${data[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `
    }

    Datarow.innerHTML = cartoona
}
async function MealDetails(mealId){
    Datarow.innerHTML = ""
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
    respone = await respone.json();
    displayMealDetails(respone.meals[0])
}

function displayMealDetails(meal) {
    let ingredients = ``
    let cartona ="";
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }
    cartona+= `
    <div class="col-md-4 text-white">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                    alt="">
                    <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8 text-white">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredients}
                </ul>
                <h3>Tags :</h3>
                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`

    Datarow.innerHTML = cartona
}


let UserName = document.getElementById("UserName");
let UserEmail =document.getElementById("UserEmail");
let UserPhone =document.getElementById("UserPhone");
let UserAge = document.getElementById("UserAge");
let Userpassward =document.getElementById("Userpassward");
let Userrepassword = document.getElementById("Userrepassword");
// ======concatUs===========
function concatUs(){

    Datarow.innerHTML=`
    <div class="container">
    <div class="row">
        <div class="col-md-6">
            <input id="UserName" onkeyup="validationName()" type="text" placeholder="Enter Your Name" class="form-control my-3 py-2">
            <p id="nameMsg" class="bg-danger text-white w-100 mt-2 rounded-1 p-2 text-center d-none">
                Special characters and numbers not allowed
            </p>
        </div>
        <div class="col-md-6">
            <input id="UserEmail" onkeyup="validationEmail()" type="email" placeholder="Enter Your Email" class="form-control my-3 py-2">
            <p id="emailMsg" class="bg-danger text-white w-100 mt-2 rounded-1 p-2 text-center d-none">
                Email not valid *exemple@yyy.zzz
            </p>
        </div>
        <div class="col-md-6">
            <input id="UserPhone" onkeyup="validationPhone()" type="text" placeholder="Enter Your Phone" class="form-control my-3 py-2">
            <p id="phoneMsg" class="bg-danger text-white w-100 mt-2 rounded-1 p-2 text-center d-none">
                Enter valid Phone
            </p>
        </div>
        <div class="col-md-6">
            <input id="UserAge" onkeyup="validationAge()" type="number" placeholder="Enter Your Age" class="form-control my-3 py-2">
            <p id="ageMsg" class="bg-danger text-white w-100 mt-2 rounded-1 p-2 text-center d-none">
                Enter valid Age
            </p>
        </div>
        <div class="col-md-6">
            <input id="Userpassward" onkeyup="validationpass()" type="password" placeholder="Enter Your password" class="form-control my-3 py-2">
            <p id="passMsg" class="bg-danger text-white w-100 mt-2 rounded-1 p-2 text-center d-none">
                Enter valid password *Minimum eight characters, at least one letter and one number:*
            </p>
        </div>
        <div class="col-md-6">
            <input id="Userrepassword" onkeyup="validationrepass()" type="password" placeholder="Repassword" class="form-control my-3 py-2">
            <p id="repassMsg" class="bg-danger text-white w-100 mt-2 rounded-1 p-2 text-center d-none">
                Enter valid repassword
            </p>
        </div>
        <button id="submitBtn" class="btn btn-outline-danger px-2 mt-3 w-25 mx-auto">Submit</button>

    </div>
</div>`

}
function validationName(){
    let ragex = /^[a-zA-Z]{3,}(\s?)$/;
    let res =ragex.test(document.getElementById("UserName").value);
    if(res==true){
        document.getElementById("nameMsg").classList.replace("d-block", "d-none")
    }
    else{
        document.getElementById("nameMsg").classList.replace("d-none", "d-block")

    }
    return res
}
function validationEmail(){
    let ragex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let res =ragex.test(document.getElementById("UserEmail").value)
    if(res==true){
        document.getElementById("emailMsg").classList.replace("d-block", "d-none")
    }
    else{
        document.getElementById("emailMsg").classList.replace("d-none", "d-block")

    }
    return res
}
function validationPhone(){
    let ragex = /^01[0-2]\s?\d{1,8}$/;
    let res =ragex.test(document.getElementById("UserPhone").value)
    if(res==true){
        document.getElementById("phoneMsg").classList.replace("d-block", "d-none")
    }
    else{
        document.getElementById("phoneMsg").classList.replace("d-none", "d-block")

    }
    return res
}
function validationAge(){
    let ragex = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/;
    let res =ragex.test(document.getElementById("UserAge").value)
    if(res==true){
        document.getElementById("ageMsg").classList.replace("d-block", "d-none")
    }
    else{
        document.getElementById("ageMsg").classList.replace("d-none", "d-block")

    }
    return res
}
function validationpass(){
    let ragex = /[A-Z]{1}[a-z0-9]{4,}(\W?\s?)$/;
    let res =ragex.test(document.getElementById("Userpassward").value)
    if(res==true){
        document.getElementById("passMsg").classList.replace("d-block", "d-none")
    }
    else{
        document.getElementById("passMsg").classList.replace("d-none", "d-block")

    }
    return res
}
function validationrepass(){
    let ragex = /[A-Z]{1}[a-z0-9]{4,}(\W?\s?)$/;
    let res =ragex.test(document.getElementById("Userrepassword").value)
    if(res==true){
        document.getElementById("repassMsg").classList.replace("d-block", "d-none")
    }
    else{
        document.getElementById("repassMsg").classList.replace("d-none", "d-block")

    }
    return res
}
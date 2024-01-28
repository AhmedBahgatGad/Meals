document.addEventListener("DOMContentLoaded", function () {
    function addLoader() {
        document.getElementById("loader").classList.add("d-flex")
        document.getElementById("loader").classList.remove("d-none")
    }
    function removeLoader() {
        document.getElementById("loader").classList.remove("d-flex")
        document.getElementById("loader").classList.add("d-none")
    }
    let width = $(".links").outerWidth()
    $("#sidebar").animate({ left: `-${width}px` }, 400)
    closeSideNav()
    function closeSideNav() {
        $("#sidebar").animate({ left: `-${width}px` }, 700)
        $("#sidebar ul").animate({ top: `100%` }, 1000)
        $("#setting").html(`<i class="fa-solid fa-bars fa-2xl"></i>`)
    }
    $("#setting").on("click", function () {
        let left = $("#sidebar").css("left")
        if (left == "0px") {
            $("#sidebar").animate({ left: `-${width}px` }, 700)
            $("#sidebar ul").animate({ top: `100%` }, 1000)
            $("#setting").html(`<i class="fa-solid fa-bars fa-2xl"></i>`)
        }
        else {
            $("#sidebar").animate({ left: `0px` }, 700)
            $("#sidebar ul").animate({ top: `0%` }, 1000)
            $("#setting").html(`<i class="fa-solid fa-x fa-2xl"></i>`)
        }
    })
    // meal detail
    let detail = {}
    function mealDetail(key) {
        closeSideNav()
        async function getDetail() {
            addLoader()
            let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${key}`);
            respone = await respone.json();
            detail = respone
            displayDetail()
            removeLoader()
        }
        getDetail()
        function displayDetail() {
            document.getElementById("rowData").innerHTML = `<div class="col-md-4">
            <img class="w-100 rounded-3" src="${detail.meals[0].strMealThumb}" alt="">
                <h2>${detail.meals[0].strMeal}</h2>
        </div><div class="col-md-8 text-white">
        <h2>Instructions</h2>
        <p>${detail.meals[0].strInstructions}</p>
        <h3><span class="fw-bolder">Area : </span>${detail.meals[0].strArea}</h3>
        <h3><span class="fw-bolder">Category : </span>${detail.meals[0].strCategory}</h3>
        <h3>Recipes :</h3>
        <ul class="list-unstyled d-flex g-3 flex-wrap">
            <li class="alert alert-info m-2 p-1">1 cup  ${detail.meals[0].strIngredient1}</li><li class="alert alert-info m-2 p-1">1 large ${detail.meals[0].strIngredient2}</li><li class="alert alert-info m-2 p-1">1 large ${detail.meals[0].strIngredient3}</li><li class="alert alert-info m-2 p-1">1 tbs ${detail.meals[0].strIngredient4}</li><li class="alert alert-info m-2 p-1">2 tsp ${detail.meals[0].strIngredient5}</li><li class="alert alert-info m-2 p-1">1 tsp  ${detail.meals[0].strIngredient6}</li><li class="alert alert-info m-2 p-1">1/2 tsp ${detail.meals[0].strIngredient7}</li><li class="alert alert-info m-2 p-1">1/2 tsp ${detail.meals[0].strIngredient8}</li><li class="alert alert-info m-2 p-1">1/4 tsp ${detail.meals[0].strIngredient9}</li><li class="alert alert-info m-2 p-1">1/4 tsp ${detail.meals[0].strIngredient10}</li><li class="alert alert-info m-2 p-1">4 cups  ${detail.meals[0].strIngredient11}</li><li class="alert alert-info m-2 p-1">1 cup  ${detail.meals[0].strIngredient12}</li><li class="alert alert-info m-2 p-1">Pinch ${detail.meals[0].strIngredient13}</li>
        </ul>

        <h3>Tags :</h3>
        <ul class="list-unstyled d-flex g-3 flex-wrap">
            
<li class="alert alert-danger m-2 p-1">Soup</li>
        </ul>

        <a target="_blank" href="${detail.meals[0].strSource}" class="btn btn-success">Source</a>
        <a target="_blank" href="${detail.meals[0].strYoutube}" class="btn btn-danger">Youtube</a>
    </div>`
        }
    }
    let meals = document.querySelectorAll(".meal")
    meals.forEach(element => {
        element.addEventListener('click', mealName)
        function mealName() {
            return mealDetail(element.querySelector("h3").innerHTML)
        }
    });
    // meal detail
    // search
    document.getElementById("search").addEventListener("click", search)
    async function searchByNameApi() {
        addLoader()
        let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${document.getElementById("searchName").value}`);
        respone = await respone.json();
        detail = respone
        removeLoader()
        searchByName()
    }
    document.getElementById("searchName").addEventListener("keyup",searchByNameApi)
    document.getElementById("searchLetter").addEventListener("keyup",searchByLetterApi)
    function searchByName() {
        document.getElementById("rowData").style.display = "flex";
        document.getElementById("rowData").innerHTML = `<div class="col-md-3">
        <div
          class="meal position-relative overflow-hidden rounded-2 cursor-pointer"
        >
          <img
            class="w-100"
            src="${detail.meals[0].strMealThumb}"
            alt=""
            srcset=""
          />
          <div
            class="meal-layer position-absolute d-flex align-items-center text-black p-2"
          >
            <h3>${detail.meals[0].strMeal}</h3>
          </div>
        </div>
      </div>`
      let mealsType = document.querySelectorAll(".meal-layer")
        mealsType.forEach(element => {
            element.addEventListener('click', mealName)
            function mealName() {
                return mealDetail(element.querySelector("h3").innerHTML)
            }
        });
     }
     async function searchByLetterApi() {
        addLoader()
        let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${document.getElementById("searchLetter").value}`);
        respone = await respone.json();
        detail = respone
        removeLoader()
        searchByLetter()
    }
    function searchByLetter() {
        document.getElementById("rowData").style.display = "flex";
        let temp = ""
        detail.meals.forEach(element => {
            temp += `<div class="col-md-3">
            <div
              class="meal position-relative overflow-hidden rounded-2 cursor-pointer"
            >
              <img
                class="w-100"
                src="${element.strMealThumb}"
                alt=""
                srcset=""
              />
              <div
                class="meal-layer position-absolute d-flex align-items-center text-black p-2"
              >
                <h3>${element.strMeal}</h3>
              </div>
            </div>
          </div>`
        });
        document.getElementById("rowData").innerHTML = temp
        let mealsType = document.querySelectorAll(".meal-layer")
        mealsType.forEach(element => {
            element.addEventListener('click', mealName)
            function mealName() {
                return mealDetail(element.querySelector("h3").innerHTML)
            }
        });
     }
    function search() {
        closeSideNav()
        document.getElementById("searchContainer").style.display = "block";
        document.getElementById("rowData").style.display = "none";
    }
    function removeSearch() {
        document.getElementById("searchContainer").style.display = "none";
        document.getElementById("rowData").style.display = "flex";
    }
    // search
    // categories api
    let category = document.getElementById("category")
    let catArr = []
    async function getCategories() {
        addLoader()
        let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
        respone = await respone.json();
        catArr.push(respone)
        displayCategories()
        removeLoader()
        closeSideNav()
    }
    function displayCategories() {
        removeSearch()
        let categories = ""
        for (i = 0; i < catArr[0].categories.length; i++) {
            categories += `<div class="col-md-3 meal position-relative overflow-hidden rounded-2 cursor-pointer">
            <img class="w-100" src="${catArr[0].categories[i].strCategoryThumb}" alt="" srcset="">
            <div class="meal-layer position-absolute text-center text-black">
                <h3>${catArr[0].categories[i].strCategory}</h3>
                <p>${catArr[0].categories[i].strCategoryDescription.substring(0, 120)}</p>
            </div>
            </div>`
        }
        document.getElementById("rowData").innerHTML = categories
        let mealsType = document.querySelectorAll(".meal-layer")
        mealsType.forEach(element => {
            element.addEventListener('click', mealName)
            function mealName() {
                return mealType(element.querySelector("h3").innerHTML)
            }
        });

    }
    category.addEventListener('click', getCategories)
    // categories by type
    let Type = {}
    function mealType(key) {
        async function getType() {
            addLoader()
            let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${key}`);
            respone = await respone.json();
            Type = respone
            displayType()
            removeLoader()
        }
        getType()
        function displayType() {
            let temp = ""
            Type.meals.forEach(element => {
                temp += `<div class="col-md-3">
                <div class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${element.strMealThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                    <h3>${element.strMeal}</h3>
                    </div>
                    </div>
                    </div>`
            });
            document.getElementById("rowData").innerHTML = temp
            let mealsType = document.querySelectorAll(".meal")
            mealsType.forEach(element => {
                element.addEventListener('click', mealName)
                function mealName() {
                    return mealDetail(element.querySelector("h3").innerHTML)
                }
            });
        }
    }
    // categories by type
    // categories api
    // area api
    let area = document.getElementById("area")
    let areaObj = {}
    async function getArea() {
        addLoader()
        let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
        respone = await respone.json();
        areaObj = respone
        displayArea()
        removeLoader()
    }
    function displayArea() {
        removeSearch()
        closeSideNav()
        let temp = ""
        areaObj.meals.forEach(element => {
            temp += `<div class="col-md-3">
            <div class="rounded-2 area text-center text-white cursor-pointer" value="${element.strArea}">
                    <i class="fa-solid fa-house-laptop fa-4x"></i>
                    <h3>${element.strArea}</h3>
            </div></div>`
        });
        document.getElementById("rowData").innerHTML = temp
        let mealsType = document.querySelectorAll(".area")
        mealsType.forEach(element => {
            element.addEventListener('click', mealName)
            function mealName() {
                return areaType(element.querySelector("h3").innerHTML)
            }
        });
    }

    area.addEventListener('click', getArea)
    // area by type
    function areaType(key) {
        async function getType() {
            addLoader()
            let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${key}`);
            respone = await respone.json();
            Type = respone
            displayType()
            removeLoader()
        }
        getType()
        function displayType() {
            let temp = ""
            Type.meals.forEach(element => {
                temp += `<div class="col-md-3">
                <div class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${element.strMealThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                    <h3>${element.strMeal}</h3>
                    </div>
                    </div>
                    </div>`
            });
            document.getElementById("rowData").innerHTML = temp
            let mealsType = document.querySelectorAll(".meal")
            mealsType.forEach(element => {
                element.addEventListener('click', mealName)
                function mealName() {
                    return mealDetail(element.querySelector("h3").innerHTML)
                }
            });
        }
    }
    // area by type
    // area api
    // ingrediants api
    let ingredients = document.getElementById("ingredients")
    let ingObj = {}
    async function getIng() {
        addLoader()
        let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
        respone = await respone.json();
        ingObj = respone
        displayIng()
        removeLoader()
    }
    function displayIng() {
        removeSearch()
        closeSideNav()
        let temp = ""
        for (i = 0; i < 20; i++) {
            temp += `<div class="col-md-3">
            <div class="rounded-2 area text-center text-white cursor-pointer" value="${ingObj.meals[i].strArea}">
                    <i class="fa-solid fa-house-laptop fa-4x"></i>
                    <h3>${ingObj.meals[i].strIngredient}</h3>
                    <p>${ingObj.meals[i].strDescription.substring(0, 131)}</p>
            </div></div>`
        }
        document.getElementById("rowData").innerHTML = temp
        let ingredType = document.querySelectorAll(".area")
        ingredType.forEach(element => {
            element.addEventListener('click', mealName)
            function mealName() {
                return ingType(element.querySelector("h3").innerHTML)
            }
        });
    }
    // ingrediants by type
    function ingType(key) {
        async function getType() {
            addLoader()
            let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${key}`);
            respone = await respone.json();
            Type = respone
            displayType()
            removeLoader()
        }
        getType()
        function displayType() {
            let temp = ""
            Type.meals.forEach(element => {
                temp += `<div class="col-md-3">
                <div class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${element.strMealThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                    <h3>${element.strMeal}</h3>
                    </div>
                    </div>
                    </div>`
            });
            document.getElementById("rowData").innerHTML = temp
            let mealsType = document.querySelectorAll(".meal")
            mealsType.forEach(element => {
                element.addEventListener('click', mealName)
                function mealName() {
                    return mealDetail(element.querySelector("h3").innerHTML)
                }
            });
        }
    }
    // ingrediants by type
    ingredients.addEventListener('click', getIng)
    // ingrediants api
    // contact Us

    // function contact() {
    //     document.getElementById("rowData").innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    //     <div class="container w-75 text-center">
    //         <div class="row g-4">
    //             <div class="col-md-6">
    //                 <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
    //                 <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
    //                     Special characters and numbers not allowed
    //                 </div>
    //             </div>
    //             <div class="col-md-6">
    //                 <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
    //                 <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
    //                     Email not valid *exemple@yyy.zzz
    //                 </div>
    //             </div>
    //             <div class="col-md-6">
    //                 <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
    //                 <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
    //                     Enter valid Phone Number
    //                 </div>
    //             </div>
    //             <div class="col-md-6">
    //                 <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
    //                 <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
    //                     Enter valid age
    //                 </div>
    //             </div>
    //             <div class="col-md-6">
    //                 <input id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
    //                 <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
    //                     Enter valid password *Minimum eight characters, at least one letter and one number:*
    //                 </div>
    //             </div>
    //             <div class="col-md-6">
    //                 <input id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
    //                 <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
    //                     Enter valid repassword 
    //                 </div>
    //             </div>
    //         </div>
    //         <button id="submitBtn" disabled="" class="btn btn-outline-danger px-2 mt-3">Submit</button>
    //     </div>
    // </div>`
    // }
    // contact()

    // contact Us
    // validation
    let contact = document.getElementById("contact")
    contact.addEventListener('click', showContacts)
    function showContacts() {
        removeSearch()
        document.getElementById("rowData").innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
        <div class="container w-75 text-center">
        <div class="row g-4">
                <div class="col-md-6">
                    <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                    <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Special characters and numbers not allowed
                    </div>
                </div>
                <div class="col-md-6">
                    <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                    <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Email not valid *exemple@yyy.zzz
                    </div>
                </div>
                <div class="col-md-6">
                    <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                    <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Enter valid Phone Number
                    </div>
                </div>
                <div class="col-md-6">
                    <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                    <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Enter valid age
                    </div>
                </div>
                <div class="col-md-6">
                    <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                    <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Enter valid password *Minimum eight characters, at least one letter and one number:*
                    </div>
                </div>
                <div class="col-md-6">
                    <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
                    <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Enter valid repassword 
                    </div>
                </div>
            </div>
            <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
        </div>
    </div> `
        submitBtn = document.getElementById("submitBtn")


        document.getElementById("nameInput").addEventListener("focus", () => {
            nameInputTouched = true
        })

        document.getElementById("emailInput").addEventListener("focus", () => {
            emailInputTouched = true
        })

        document.getElementById("phoneInput").addEventListener("focus", () => {
            phoneInputTouched = true
        })

        document.getElementById("ageInput").addEventListener("focus", () => {
            ageInputTouched = true
        })

        document.getElementById("passwordInput").addEventListener("focus", () => {
            passwordInputTouched = true
        })

        document.getElementById("repasswordInput").addEventListener("focus", () => {
            repasswordInputTouched = true
        })
    }
    let nameInputTouched = false;
    let emailInputTouched = false;
    let phoneInputTouched = false;
    let ageInputTouched = false;
    let passwordInputTouched = false;
    let repasswordInputTouched = false;




    function inputsValidation() {
        if (nameInputTouched) {
            if (nameValidation()) {
                document.getElementById("nameAlert").classList.replace("d-block", "d-none")

            } else {
                document.getElementById("nameAlert").classList.replace("d-none", "d-block")

            }
        }
        if (emailInputTouched) {

            if (emailValidation()) {
                document.getElementById("emailAlert").classList.replace("d-block", "d-none")
            } else {
                document.getElementById("emailAlert").classList.replace("d-none", "d-block")

            }
        }

        if (phoneInputTouched) {
            if (phoneValidation()) {
                document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
            } else {
                document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

            }
        }

        if (ageInputTouched) {
            if (ageValidation()) {
                document.getElementById("ageAlert").classList.replace("d-block", "d-none")
            } else {
                document.getElementById("ageAlert").classList.replace("d-none", "d-block")

            }
        }

        if (passwordInputTouched) {
            if (passwordValidation()) {
                document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
            } else {
                document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

            }
        }
        if (repasswordInputTouched) {
            if (repasswordValidation()) {
                document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
            } else {
                document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

            }
        }


        if (nameValidation() &&
            emailValidation() &&
            phoneValidation() &&
            ageValidation() &&
            passwordValidation() &&
            repasswordValidation()) {
            submitBtnNaNpxoveAttribute("disabled")
        } else {
            submitBtn.setAttribute("disabled", true)
        }
    }

    function nameValidation() {
        return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
    }

    function emailValidation() {
        return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
    }

    function phoneValidation() {
        return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
    }

    function ageValidation() {
        return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
    }

    function passwordValidation() {
        return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))
    }

    function repasswordValidation() {
        return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
    }
    // validation
})
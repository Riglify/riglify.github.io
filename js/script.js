// RIGLIFY SCRIPT - COPYRIGHT 2026 BY NOTHINGBUTTYLER. ALL RIGHTS RESERVED. \\

function openAuth(){
    document.getElementById("auth-overlay").style.display = "flex";
}

function closeAuth(){
    document.getElementById("auth-overlay").style.display = "none";
}

    // discord login successful script

const params = new URLSearchParams(window.location.search);

const username = params.get("username");
const avatar = params.get("avatar");
const id = params.get("id");

/* SAVE LOGIN */

if(username && avatar){

    localStorage.setItem("riglifyUser", JSON.stringify({
        username,
        avatar,
        id
    }));

}

/* LOAD USER */

const savedUser =
JSON.parse(localStorage.getItem("riglifyUser"));

if(savedUser){

    document.getElementById("login-btn")
    .style.display = "none";

    document.getElementById("account-wrapper")
    .style.display = "block";

    document.getElementById("account-btn")
    .innerHTML = `
        <img
        src="https://cdn.discordapp.com/avatars/${savedUser.id}/${savedUser.avatar}.png"
        style="
            width:100%;
            height:100%;
            border-radius:50%;
            object-fit:cover;
        "
        >
    `;

}

/* MENU */

function toggleAccountMenu(){

    const menu =
    document.getElementById("account-menu");

    if(menu.style.display === "flex"){

        menu.style.display = "none";

    }else{

        menu.style.display = "flex";

    }

}

/* LOGOUT */

function logout(){

    localStorage.removeItem("riglifyUser");

    window.location.reload();

}

function openSidebar(){

    document
    .getElementById("mobile-sidebar")
    .classList.add("active");

    document
    .getElementById("sidebar-overlay")
    .classList.add("active");

}

function closeSidebar(){

    document
    .getElementById("mobile-sidebar")
    .classList.remove("active");

    document
    .getElementById("sidebar-overlay")
    .classList.remove("active");

}
    

const searchInput =
document.getElementById("search-input");

const suggestions =
document.getElementById("search-suggestions");

searchInput.addEventListener("input", () => {

    const query =
    searchInput.value.trim();

    if(!query){

        suggestions.style.display = "none";
        suggestions.innerHTML = "";

        return;
    }

    suggestions.style.display = "block";

    suggestions.innerHTML = `

<div
    class="search-suggestion"
    onclick="window.location.href='/avatars?q=${encodeURIComponent(query)}'"
>
    Search "<span>${query}</span>" in Avatars
</div>

<div
    class="search-suggestion"
    onclick="window.location.href='/models?q=${encodeURIComponent(query)}'"
>
    Search "<span>${query}</span>" in Models
</div>

<div
    class="search-suggestion"
    onclick="window.location.href='/bundles?q=${encodeURIComponent(query)}'"
>
    Search "<span>${query}</span>" in Bundles
</div>

<div
    class="search-suggestion"
    onclick="window.location.href='/items?q=${encodeURIComponent(query)}'"
>
    Search "<span>${query}</span>" in Items
</div>

`;
    
});
    
    searchInput.addEventListener("keydown", (e) => {

    if(e.key === "Enter"){

        const query = searchInput.value.trim();

        if(query){

            window.location.href =
            "/avatars?q=" + encodeURIComponent(query);

        }

    }

});

document.addEventListener("click", (e) => {

    if(
        !searchInput.contains(e.target) &&
        !suggestions.contains(e.target)
    ){

        suggestions.style.display = "none";

    }

});


const searchBtn =
document.getElementById("search-btn");

searchBtn?.addEventListener("click", () => {

    const query =
    searchInput.value.trim();

    if(query){

        window.location.href =
        "/avatars?q=" + encodeURIComponent(query);

    }

});

const urlParams =
new URLSearchParams(window.location.search);

const query =
urlParams.get("q");

const avatarSearch =
document.getElementById("avatar-search");

if(query && avatarSearch){

    avatarSearch.value = query;

}

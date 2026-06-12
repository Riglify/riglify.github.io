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

    document.getElementById("account-btn")
    .style.display = "block"; // <-- add this

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

if(searchInput && suggestions){

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

}
    
    if(searchInput){

    searchInput.addEventListener("keydown", (e) => {

        if(e.key === "Enter"){

            const query = searchInput.value.trim();

            if(query){

                window.location.href =
                "/avatars?q=" + encodeURIComponent(query);

            }

        }

    });

}

        
        

document.addEventListener("click", (e) => {

    if(!searchInput || !suggestions) return;

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


// avatars full script

/* SEARCH */

async function searchAvatar(){

    const username =
    document.getElementById("avatarInput").value.trim();

    if(!username) return;

    const overlay =
    document.getElementById("avatar-popup-overlay");

    const content =
    document.getElementById("avatar-popup-content");

    overlay.style.display = "flex";

    content.innerHTML = `
        <p style="color:#9ca3af;" align="center">
            <i class="fa-solid fa-circle-notch fa-spin"></i> Importing avatar...
        </p>
    `;

    try{

        const res = await fetch(
            `https://riglify.onrender.com/avatar/${username}`
        );

        const data = await res.json();

        if(!data.success){

            content.innerHTML = `
                <p style="color:red;" align="center">
                    <i class="fa-solid fa-x" style="color: rgb(255, 0, 0);"></i> User not found. Please try again.
                </p>
            `;

            return;

        }

        content.innerHTML = `
        <div class="avatar-layout-grid">

            <div class="grid-top-header" style="grid-column: 1 / -1; margin-bottom: -4px;">
                <h2 style="font-size: 20px; font-weight: 700; margin: 0 0 8px 0;">
                    Roblox Character - ${data.username}
                </h2>
                
                <div class="mobile-scroll-hint">
                    <span>Swipe down to import specific items</span>
                    <div class="hint-arrows">
                        <span>↓</span><span>↓</span>
                    </div>
                </div>
            </div>

            <div class="grid-left-column">
                
                <div class="preview-box">
                    <div class="preview-toggle">
                        <button class="toggle-btn active-toggle" onclick="show2DPreview(this)">2D</button>
                        <button class="toggle-btn" style="opacity:.5;cursor:not-allowed;">3D - Coming Soon!</button>
                    </div>
                    <img src="${data.thumbnail}" class="preview-avatar" id="preview2d">
                    <img src="${data.thumbnail3d}" class="preview-avatar preview-3d" id="preview3d" style="display:none;">
                </div>

                <div class="grid-download-types">
                    <div class="export-buttons">
                        <button class="export-btn">Download as .OBJ</button>
                        <button class="export-btn">Download as .GLB</button>
                        <button class="export-btn secondary-export" onclick="toggleMoreFormats()">Other...</button>
                    </div>
                    
                    <div id="moreFormats" style="display: none; gap: 8px; flex-wrap: wrap; margin-top: 10px;">
                        <button class="export-btn">.FBX</button>
                        <button class="export-btn">.DAE</button>
                        <button class="export-btn">.PLY</button>
                        <button class="export-btn">.RBXM</button>
                    </div>
                    
                    <p style="color: red; margin-top: 12px; font-size: 13px; text-align: center;">
                        NOTE: this is just a preview. The real version will be out soon.
                    </p>
                </div>

            </div>

            <div class="grid-items-download">
                <div class="asset-scroll" style="max-height: 450px; overflow-y: auto; padding-right: 4px;">
                    ${data.assets ? data.assets
                        .filter(asset =>
                            asset.assetType !== "Animation" &&
                            asset.assetType !== "Emote"
                        )
                        .map(asset => {
                            console.log(asset);
                            return `
                                <div class="asset-card">
                                    <div class="asset-thumb">
                                        <img src="${asset.image}" class="asset-image" alt="${asset.name}">
                                    </div>
                                    <div class="asset-info">
                                        <h3>${asset.name || `Asset ${asset.id}`}</h3>
                                        <button onclick="downloadAsset('${asset.id}')">Download</button>
                                    </div>
                                </div>
                            `;
                        }).join("")
                    : '<p style="color:#9ca3af;">No assets found</p>'}
                </div>
            </div>

        </div>
        `;

        // Pinned close button automatic override finder code
        setTimeout(() => {
            const popup = document.getElementById('avatar-popup');
            if (popup) {
                const closeButtons = popup.querySelectorAll('button, .close, [onclick*="close"]');
                closeButtons.forEach(btn => {
                    if (btn.textContent.trim() === '×' || btn.textContent.toLowerCase().includes('x') || btn.classList.contains('close-popup-btn')) {
                        btn.onclick = function() {
                            closeAvatarPopup();
                        };
                    }
                });
            }
        }, 50);

    } catch(err) {
        console.log(err);
        content.innerHTML = `
            <p style="color:red;" align="center">
                <i class="fa-solid fa-face-sad-cry" style="color: rgb(255, 0, 0);"></i> Failed to import avatar!
            </p>
        `;
    }
}

/* CLOSE */

function closeAvatarPopup() {
    const overlay = document.getElementById('avatar-popup-overlay');
    if (overlay) {
        overlay.classList.remove('active');
        overlay.style.display = 'none'; // Backup clear
    }
}
    
function toggleMoreFormats(){

    const box =
    document.getElementById("moreFormats");

    if(box.style.display === "flex"){

        box.style.display = "none";

    }else{

        box.style.display = "flex";

    }

}
    
function show2DPreview(btn){

    document.getElementById("preview2d")
    .style.display = "block";

    document.getElementById("preview3d")
    .style.display = "none";

    document.querySelectorAll(".toggle-btn")
    .forEach(b=>b.classList.remove("active-toggle"));

    btn.classList.add("active-toggle");

}

function show3DPreview(btn){

    document.getElementById("preview2d")
    .style.display = "none";

    document.getElementById("preview3d")
    .style.display = "block";

    document.querySelectorAll(".toggle-btn")
    .forEach(b=>b.classList.remove("active-toggle"));

    btn.classList.add("active-toggle");

}
    
function downloadAsset(id){

    window.open(
        `https://riglify.onrender.com/download/${id}`,
        "_blank"
    );

}

function openAvatarPopup() {
    document
        .getElementById("avatar-popup-overlay")
        .classList.add("active");
}

const video = document.getElementById("tutorial-video");
const playBtn = document.getElementById("play-btn");
const seekBar = document.getElementById("seek-bar");
const time = document.getElementById("time");
const fullscreenBtn = document.getElementById("fullscreen-btn");

/* ONLY RUN IF THE VIDEO ELEMENT EXISTS ON THIS PAGE */
if (video) {

    /* PLAY */
    if (playBtn) {
        playBtn.onclick = () => {
            if(video.paused){
                video.play();
                playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
            }else{
                video.pause();
                playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
            }
        };
    }

    /* UPDATE */
    video.addEventListener("timeupdate", () => {
        if (seekBar) seekBar.value = (video.currentTime / video.duration) * 100 || 0;
        
        const format = (t) => {
            const mins = Math.floor(t / 60); 
            const secs = Math.floor(t % 60).toString().padStart(2,"0");
            return `${mins}:${secs}`;
        };
        
        if (time) time.textContent = `${format(video.currentTime)} / ${format(video.duration)}`;
    });

    /* SEEK */
    if (seekBar) {
        seekBar.addEventListener("input", () => {
            video.currentTime = (seekBar.value / 100) * video.duration;
        });
    }

    /* FULLSCREEN */
    if (fullscreenBtn) {
        fullscreenBtn.onclick = () => {
            if(video.requestFullscreen){
                video.requestFullscreen();
            }
        };
    }
}

function openLogoutConfirm(){

    document.getElementById(
        "logout-overlay"
    ).style.display = "flex";

}

function closeLogoutConfirm(){

    document.getElementById(
        "logout-overlay"
    ).style.display = "none";

}

function confirmLogout(){

    localStorage.removeItem("riglifyUser");

    window.location.reload();

            }

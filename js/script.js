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
                        <button class="toggle-btn active-toggle" id="btn2d" onclick="toggleAvatarView('2D')">2D</button>
                        <button class="toggle-btn" id="btn3d" onclick="toggleAvatarView('3D')">3D Preview</button>
                    </div>
                    
                    <img src="${data.thumbnail}" class="preview-avatar" id="preview2d">
                    
                    <div id="preview3d" class="preview-3d-container" style="display: none; width: 100%; height: 250px;">
    <model-viewer 
        id="avatar-3d-engine"
        src="https://riglify.onrender.com/download/all_glb" 
        poster="${data.thumbnail}"
        loading="lazy"
        reveal="interaction"
        alt="Roblox Avatar 3D Model"
        auto-rotate 
        camera-controls 
        interaction-prompt="none"
        shadow-intensity="1" 
        exposure="1.2"
        style="width: 100%; height: 100%; --poster-color: transparent;">
        
        <div slot="poster" class="threed-loading-slot">
            <div class="threed-spinner"></div>
            <span style="font-size: 13px; color: #8d95a3;">Streaming 3D Grid Asset...</span>
        </div>
    </model-viewer>
</div>
                </div>

                <div class="grid-download-types">
                    <div class="export-buttons">
                        <button class="export-btn" onclick="downloadAsset('all_obj')">Download as .OBJ</button>
                        <button class="export-btn" onclick="downloadAsset('all_glb')">Download as .GLB</button>
                        <button class="export-btn" onclick="downloadAsset('all_rbxm')">Download as .RBXM</button>
                        <button class="export-btn secondary-export" onclick="openFormatsModal(event)">More...</button>
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

        <div id="formatsModalOverlay" class="formats-overlay-blur" style="display: none;" onclick="closeFormatsModal()">
            <div class="formats-pill-card" onclick="event.stopPropagation()">
                <div class="formats-modal-header">
                    <span>Export Formats</span>
                    <button class="formats-modal-close-x" onclick="closeFormatsModal()">×</button>
                </div>
                
                <div class="formats-modal-scrollable-body">
                    <div class="formats-grid-box">
                        <div class="modal-section-block">
                            <h4>Game Engines</h4>
                            <button onclick="downloadAsset('unity_fbx')">• Unity (.FBX)</button>
                            <button onclick="downloadAsset('unreal_fbx')">• Unreal Engine (.FBX)</button>
                        </div>
                        
                        <div class="modal-section-block">
                            <h4>3D Software</h4>
                            <button onclick="downloadAsset('blender_glb')">• Blender (.GLB)</button>
                            <button onclick="downloadAsset('maya_obj')">• Maya (.OBJ)</button>
                            <button onclick="downloadAsset('c4d_dae')">• Cinema4D (.DAE)</button>
                        </div>
                        
                        <div class="modal-section-block">
                            <h4>Roblox</h4>
                            <button onclick="downloadAsset('all_rbxm')">• .RBXM</button>
                        </div>
                        
                        <div class="modal-section-block">
                            <h4>Other Formats</h4>
                            <button onclick="downloadAsset('all_ply')">• .PLY</button>
                            <button onclick="downloadAsset('all_stl')">• .STL</button>
                        </div>
                    </div>
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

/* CLOSE MAIN POPUP */
function closeAvatarPopup() {
    const overlay = document.getElementById('avatar-popup-overlay');
    if (overlay) {
        overlay.classList.remove('active');
        overlay.style.display = 'none';
    }
}

/* 2D / 3D PREVIEW SWITCHER ENGINE */
/* 2D / 3D PREVIEW SWITCHER ENGINE */
function toggleAvatarView(viewType) {
    const img2D = document.getElementById("preview2d");
    const container3D = document.getElementById("preview3d"); 
    const btn2D = document.getElementById("btn2d");
    const btn3D = document.getElementById("btn3d");

    if (!img2D || !container3D) return;

    if (viewType === "3D") {
        img2D.style.display = "none";
        container3D.style.display = "flex"; 
        btn3D.classList.add("active-toggle");
        btn2D.classList.remove("active-toggle");
        
        // INSTANT KICKSTART: Forces the 3D engine to fire up immediately on click
        const modelEngine = document.getElementById("avatar-3d-engine");
        if(modelEngine) {
            modelEngine.dismissPoster();
        }
    } else {
        container3D.style.display = "none";
        img2D.style.display = "block";
        btn2D.classList.add("active-toggle");
        btn3D.classList.remove("active-toggle");
    }
}

/* OPEN AND CLOSE SEPARATE FORMATS MODAL OVERLAY */
function openFormatsModal(event) {
    if(event) event.stopPropagation();
    const modalOverlay = document.getElementById("formatsModalOverlay");
    if (modalOverlay) modalOverlay.style.display = "flex";
}

function closeFormatsModal() {
    const modalOverlay = document.getElementById("formatsModalOverlay");
    if (modalOverlay) modalOverlay.style.display = "none";
}
    
/* ==========================================================================
   RIGLIFY SINGLE-ITEM ZIP DOWNLOAD ENGINE
   ========================================================================== */
async function downloadAsset(id) {
    // If it's a main option like 'all_obj', 'all_glb', 'unity_fbx', etc., download normally
    if (id.startsWith('all_') || id.includes('_')) {
        window.open(`https://riglify.onrender.com/download/${id}`, "_blank");
        return;
    }

    // Otherwise, it's a specific accessory item! Let's zip it.
    const zip = new JSZip();
    let assetName = `Asset_${id}`;
    
    // Find the asset card in your popup list to grab its actual name for the file
    const assetCards = document.querySelectorAll('.asset-card');
    for (let card of assetCards) {
        if (card.querySelector('button')?.getAttribute('onclick')?.includes(id)) {
            const heading = card.querySelector('h3')?.textContent.trim();
            if (heading) {
                // Sanitize the name so it's a safe filename
                assetName = heading.replace(/[^a-z0-9]/gi, '_').toLowerCase();
                break;
            }
        }
    }

    try {
        // Fetch the raw asset file from your server invisibly
        const response = await fetch(`https://riglify.onrender.com/download/${id}`);
        if (!response.ok) throw new Error("Could not fetch asset data.");
        
        const blob = await response.blob();
        
        // Put the file inside the zip (adjust extension if your backend serves something other than .rbxm)
        zip.file(`${assetName}.rbxm`, blob);
        
        // Generate the zip and download it to their computer
        const zipContent = await zip.generateAsync({ type: "blob" });
        saveAs(zipContent, `${assetName}.zip`);
        
    } catch (error) {
        console.error("ZIP Error:", error);
        // Fallback: If the zipping fails, just download the raw file standard way so it doesn't break
        window.open(`https://riglify.onrender.com/download/${id}`, "_blank");
    }
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

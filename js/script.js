// RIGLIFY SCRIPT - COPYRIGHT 2026 BY NOTHINGBUTTYLER. ALL RIGHTS RESERVED. \\

function openAuth(){
    const auth = document.getElementById("auth-overlay");
    if (auth) auth.style.display = "flex";
}

function closeAuth(){
    const auth = document.getElementById("auth-overlay");
    if (auth) auth.style.display = "none";
}

// Discord login successful script
const params = new URLSearchParams(window.location.search);
const usernameParam = params.get("username");
const avatarParam = params.get("avatar");
const idParam = params.get("id");

/* SAVE LOGIN */
if(usernameParam && avatarParam){
    localStorage.setItem("riglifyUser", JSON.stringify({
        username: usernameParam,
        avatar: avatarParam,
        id: idParam
    }));
}

/* LOAD USER */
const savedUser = JSON.parse(localStorage.getItem("riglifyUser"));

if(savedUser){
    const loginBtn = document.getElementById("login-btn");
    const accountBtn = document.getElementById("account-btn");

    if (loginBtn) loginBtn.style.display = "none";
    if (accountBtn) {
        accountBtn.style.display = "block";
        accountBtn.innerHTML = `
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
}

/* MENU */
function toggleAccountMenu(){
    const menu = document.getElementById("account-menu");
    if(!menu) return;
    
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
    const sidebar = document.getElementById("mobile-sidebar");
    const overlay = document.getElementById("sidebar-overlay");
    if (sidebar) sidebar.classList.add("active");
    if (overlay) overlay.classList.add("active");
}

function closeSidebar(){
    const sidebar = document.getElementById("mobile-sidebar");
    const overlay = document.getElementById("sidebar-overlay");
    if (sidebar) sidebar.classList.remove("active");
    if (overlay) overlay.classList.remove("active");
}
    
const searchInput = document.getElementById("search-input");
const suggestions = document.getElementById("search-suggestions");

if(searchInput && suggestions){
    searchInput.addEventListener("input", () => {
        const query = searchInput.value.trim();

        if(!query){
            suggestions.style.display = "none";
            suggestions.innerHTML = "";
            return;
        }

        suggestions.style.display = "block";
        suggestions.innerHTML = `
            <div class="search-suggestion" onclick="window.location.href='/avatars?q=${encodeURIComponent(query)}'">
                Search "<span>${query}</span>" in Avatars
            </div>
            <div class="search-suggestion" onclick="window.location.href='/models?q=${encodeURIComponent(query)}'">
                Search "<span>${query}</span>" in Models
            </div>
            <div class="search-suggestion" onclick="window.location.href='/bundles?q=${encodeURIComponent(query)}'">
                Search "<span>${query}</span>" in Bundles
            </div>
            <div class="search-suggestion" onclick="window.location.href='/items?q=${encodeURIComponent(query)}'">
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
                window.location.href = "/avatars?q=" + encodeURIComponent(query);
            }
        }
    });
}

document.addEventListener("click", (e) => {
    if(!searchInput || !suggestions) return;
    if(!searchInput.contains(e.target) && !suggestions.contains(e.target)){
        suggestions.style.display = "none";
    }
});

const searchBtn = document.getElementById("search-btn");
if (searchBtn && searchInput) {
    searchBtn.addEventListener("click", () => {
        const query = searchInput.value.trim();
        if(query){
            window.location.href = "/avatars?q=" + encodeURIComponent(query);
        }
    });
}

const urlParams = new URLSearchParams(window.location.search);
const queryVal = urlParams.get("q");
const avatarSearch = document.getElementById("avatar-search");

if(queryVal && avatarSearch){
    avatarSearch.value = queryVal;
}

let currentViewingUserId = null;

// avatars full script

/* SEARCH */
async function searchAvatar(){
    const avatarInput = document.getElementById("avatarInput");
    if (!avatarInput) return;
    
    const username = avatarInput.value.trim();
    if(!username) return;

    const overlay = document.getElementById("avatar-popup-overlay");
    const content = document.getElementById("avatar-popup-content");

    if (overlay) overlay.style.display = "flex";
    if (content) {
        content.innerHTML = `
            <p style="color:#9ca3af;" align="center">
                <i class="fa-solid fa-circle-notch fa-spin"></i> Importing avatar...
            </p>
        `;
    }

    try{
        const res = await fetch(`https://riglify.onrender.com/avatar/${username}`);
const data = await res.json();

if(!data.success){
            if (content) {
                content.innerHTML = `
                    <p style="color:red;" align="center">
                        <i class="fa-solid fa-x" style="color: rgb(255, 0, 0);"></i> User not found. Please try again.
                    </p>
                `;
            }
            return;
        }
        
        currentViewingUserId = data.userId;

        if (content) {
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
                        
                        <div id="preview3d" class="preview-3d-container" style="display: none; width: 100%; height: 280px; min-height: 280px; position: relative; justify-content: center; align-items: center;">
                            <iframe
    id="avatar-3d-engine"
    src="https://roembed.com/avatar/${data.userId}?orbitDist=7.3&anim=spin"
    style="
        width:100%;
        height:100%;
        border:none;
        border-radius:8px;
        overflow:hidden;
        background:#1f2937;
    "
    allowfullscreen>
</iframe>
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
                            .filter(asset => asset.assetType !== "Animation" && asset.assetType !== "Emote")
                            .map(asset => {
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

            <div id="formatsModalOverlay" class="formats-overlay-blur" style="display: none;" onclick="closeFormatsModal(event)">
                <div class="formats-pill-card" onclick="event.stopPropagation()">
                    <div class="formats-modal-header">
                        <span>Export Formats</span>
                        <button class="formats-modal-close-x" onclick="event.stopPropagation(); closeFormatsModal(event)">&times;</button>
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
        }

        // Pinned close button automatic override finder code
        setTimeout(() => {
            const popup = document.getElementById('avatar-popup-content');
            if (popup) {
                const closeButtons = popup.querySelectorAll('button, .close, [onclick*="close"]');
                closeButtons.forEach(btn => {
                    // SECURE SHIELD: Ignore any close button elements living inside the formats modal panel context
                    if (btn.closest('#formatsModalOverlay')) return;

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
        if (content) {
            content.innerHTML = `
                <p style="color:red;" align="center">
                    <i class="fa-solid fa-face-sad-cry" style="color: rgb(255, 0, 0);"></i> Failed to import avatar!
                </p>
            `;
        }
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

function closeFormatsModal(event) {
    if (event) {
        event.stopPropagation();
    }
    const modalOverlay = document.getElementById("formatsModalOverlay");
    if (modalOverlay) modalOverlay.style.display = "none";
}
    
/* ==========================================================================
   RIGLIFY SINGLE-ITEM ZIP DOWNLOAD ENGINE
   ========================================================================== */
async function downloadAsset(id) {

    const userId = currentViewingUserId;

    if (!userId) {
        console.error("No avatar user ID found.");
        return;
    }

    const downloadUrl =
        `https://riglify.onrender.com/download/${id}?userId=${userId}`;

    console.log("Starting download:", downloadUrl);

    try {

        const response = await fetch(downloadUrl);

        if (!response.ok) {
            throw new Error(
                `Download failed with status ${response.status}`
            );
        }

        const blob = await response.blob();

        const blobUrl =
            window.URL.createObjectURL(blob);

        const link =
            document.createElement("a");

        link.href = blobUrl;

        link.download =
            `Riglify_Asset_${id}.rbxm`;

        document.body.appendChild(link);

        link.click();

        link.remove();

        window.URL.revokeObjectURL(blobUrl);

        console.log(
            "Download completed successfully."
        );

    } catch (error) {

        console.error(
            "Download error:",
            error
        );

        alert(
            "The download failed. Please try again."
        );

    }

}

function openAvatarPopup() {
    const overlay = document.getElementById("avatar-popup-overlay");
    if (overlay) overlay.classList.add("active");
}

/* ==========================================================================
   CUSTOM VIDEO TUTORIAL PLAYER ENGINE
   ========================================================================== */
const video = document.getElementById("tutorial-video");
const playBtn = document.getElementById("play-btn");
const seekBar = document.getElementById("seek-bar");
const timeElement = document.getElementById("time");
const fullscreenBtn = document.getElementById("fullscreen-btn");

if (video) {
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

    video.addEventListener("timeupdate", () => {
        if (seekBar) seekBar.value = (video.currentTime / video.duration) * 100 || 0;
        
        const format = (t) => {
            const mins = Math.floor(t / 60); 
            const secs = Math.floor(t % 60).toString().padStart(2,"0");
            return `${mins}:${secs}`;
        };
        
        if (timeElement) timeElement.textContent = `${format(video.currentTime)} / ${format(video.duration)}`;
    });

    if (seekBar) {
        seekBar.addEventListener("input", () => {
            video.currentTime = (seekBar.value / 100) * video.duration;
        });
    }

    if (fullscreenBtn) {
        fullscreenBtn.onclick = () => {
            if(video.requestFullscreen){
                video.requestFullscreen();
            }
        };
    }
}

/* ==========================================================================
   LOGOUT PROFILE MANAGEMENT MODALS
   ========================================================================== */
function openLogoutConfirm(){
    const logoutOverlay = document.getElementById("logout-overlay");
    if (logoutOverlay) logoutOverlay.style.display = "flex";
}

function closeLogoutConfirm(){
    const logoutOverlay = document.getElementById("logout-overlay");
    if (logoutOverlay) logoutOverlay.style.display = "none";
}

function confirmLogout(){
    localStorage.removeItem("riglifyUser");
    window.location.reload();
                          }

// Mac Features - Launchpad, Mission Control, Spotlight, etc.

// Spotlight
let spotlightOpen = false;

function openSpotlight() {
    const overlay = document.getElementById('spotlight-overlay');
    const search = document.getElementById('spotlight-search');
    
    if (spotlightOpen) {
        overlay.classList.add('hidden');
        spotlightOpen = false;
    } else {
        overlay.classList.remove('hidden');
        search.value = '';
        search.focus();
        spotlightOpen = true;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('spotlight-search');
    const results = document.getElementById('spotlight-results');
    const overlay = document.getElementById('spotlight-overlay');
    
    // Close on overlay click
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            openSpotlight();
        }
    });
    
    // Search functionality
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        if (!query) {
            results.innerHTML = '';
            return;
        }
        
        const apps = [
            { name: 'Calculator', icon: '🧮', action: 'openCalculator' },
            { name: 'Text Editor', icon: '📝', action: 'openTextEditor' },
            { name: 'File Explorer', icon: '📁', action: 'openFileExplorer' },
            { name: 'Browser', icon: '🌐', action: 'openBrowser' },
            { name: 'Terminal', icon: '💻', action: 'openTerminal' },
            { name: 'Settings', icon: '⚙️', action: 'openSettings' },
            { name: 'Calendar', icon: '📅', action: 'openCalendar' },
            { name: 'Notes', icon: '📋', action: 'openNotes' },
            { name: 'Photos', icon: '📷', action: 'openPhotoViewer' },
            { name: 'Music', icon: '🎵', action: 'openMusicPlayer' },
            { name: 'Sandbox Manager', icon: '🔒', action: 'openSandboxManager' },
            { name: 'App Store', icon: '🏪', action: 'openAppStore' },
            { name: 'Time Machine', icon: '⏰', action: 'openTimeMachine' },
            { name: 'Voice Assistant', icon: '🎤', action: 'openVoiceAssistant' }
        ];
        
        const matches = apps.filter(app => app.name.toLowerCase().includes(query));
        
        results.innerHTML = matches.map(app => `
            <div class="spotlight-result" onclick="${app.action}(); openSpotlight();">
                <span class="spotlight-result-icon">${app.icon}</span>
                <span>${app.name}</span>
            </div>
        `).join('');
    });
    
    // Keyboard shortcut
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.code === 'Space') {
            e.preventDefault();
            openSpotlight();
        }
        if (e.key === 'Escape' && spotlightOpen) {
            openSpotlight();
        }
    });
});

// Launchpad
function openLaunchpad() {
    const overlay = document.getElementById('launchpad-overlay');
    const grid = document.getElementById('launchpad-grid');
    
    if (overlay.classList.contains('hidden')) {
        const apps = [
            { name: 'Files', icon: '📁', action: 'openFileExplorer' },
            { name: 'Text Editor', icon: '📝', action: 'openTextEditor' },
            { name: 'Calculator', icon: '🧮', action: 'openCalculator' },
            { name: 'Browser', icon: '🌐', action: 'openBrowser' },
            { name: 'Photos', icon: '🖼️', action: 'openPhotoViewer' },
            { name: 'Music', icon: '🎵', action: 'openMusicPlayer' },
            { name: 'Videos', icon: '🎬', action: 'openVideoPlayer' },
            { name: 'Mail', icon: '📧', action: 'openEmailClient' },
            { name: 'Calendar', icon: '📅', action: 'openCalendar' },
            { name: 'Notes', icon: '📋', action: 'openNotes' },
            { name: 'Settings', icon: '⚙️', action: 'openSettings' },
            { name: 'Terminal', icon: '💻', action: 'openTerminal' },
            { name: 'Sandboxes', icon: '🔒', action: 'openSandboxManager' },
            { name: 'App Store', icon: '🏪', action: 'openAppStore' },
            { name: 'Time Machine', icon: '⏰', action: 'openTimeMachine' },
            { name: 'Assistant', icon: '🎤', action: 'openVoiceAssistant' },
            { name: 'Activity', icon: '📊', action: 'openActivityMonitor' }
        ];
        
        grid.innerHTML = apps.map(app => `
            <div class="launchpad-app" onclick="${app.action}(); closeLaunchpad();">
                <div class="launchpad-app-icon">${app.icon}</div>
                <div class="launchpad-app-name">${app.name}</div>
            </div>
        `).join('');
        
        overlay.classList.remove('hidden');
    } else {
        closeLaunchpad();
    }
}

function closeLaunchpad() {
    const overlay = document.getElementById('launchpad-overlay');
    overlay.classList.add('hidden');
}

// Mission Control
function openMissionControl() {
    const overlay = document.getElementById('mission-control-overlay');
    const windows = document.getElementById('mc-windows');
    
    if (overlay.classList.contains('hidden')) {
        const openWindows = windowManager.getAllWindows();
        
        windows.innerHTML = openWindows.map(win => `
            <div class="mc-window" onclick="closeMissionControl()">
                ${win.title}
            </div>
        `).join('');
        
        if (openWindows.length === 0) {
            windows.innerHTML = '<p style="color:white; text-align:center; opacity:0.7;">No windows open</p>';
        }
        
        overlay.classList.remove('hidden');
    } else {
        closeMissionControl();
    }
}

function closeMissionControl() {
    const overlay = document.getElementById('mission-control-overlay');
    overlay.classList.add('hidden');
}

// Event listeners for overlays
document.addEventListener('DOMContentLoaded', () => {
    const launchpadOverlay = document.getElementById('launchpad-overlay');
    const missionControlOverlay = document.getElementById('mission-control-overlay');
    
    launchpadOverlay.addEventListener('click', (e) => {
        if (e.target === launchpadOverlay) {
            closeLaunchpad();
        }
    });
    
    missionControlOverlay.addEventListener('click', (e) => {
        if (e.target === missionControlOverlay) {
            closeMissionControl();
        }
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === 'F3') {
            e.preventDefault();
            openMissionControl();
        }
        if (e.key === 'F4') {
            e.preventDefault();
            openLaunchpad();
        }
        if (e.key === 'Escape') {
            closeLaunchpad();
            closeMissionControl();
        }
    });
});

// Trash
function openTrash() {
    windowManager.createWindow({
        title: 'Trash',
        width: 600,
        height: 400,
        content: `
            <div style="padding:40px; text-align:center;">
                <div style="font-size:80px; margin-bottom:20px;">🗑️</div>
                <h2>Trash</h2>
                <p style="opacity:0.7; margin:20px 0;">Trash is empty</p>
                <button class="button" style="margin-top:20px;">Empty Trash</button>
            </div>
        `
    });
}

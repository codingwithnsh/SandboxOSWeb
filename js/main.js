// Main Application Entry Point for SandboxOS Web

// Initialize the OS
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 SandboxOS Web Starting...');
    
    // Apply saved theme
    applyTheme();
    
    // Setup menu bar
    setupMenuBar();
    
    // Setup desktop icons
    setupDesktopIcons();
    
    // Setup dock
    setupDock();
    
    // Start system monitoring
    startSystemMonitoring();
    
    // Update clock
    updateClock();
    setInterval(updateClock, 1000);
    
    // Setup fullscreen
    setupFullscreen();
    
    // Show welcome notification
    setTimeout(() => {
        showNotification('Welcome to SandboxOS Web', 'Version 1.0 - Full-featured web operating system with sandboxing');
    }, 500);
    
    console.log('✅ SandboxOS Web Started Successfully');
});

// Apply saved theme
function applyTheme() {
    const theme = settingsManager.getSetting('theme');
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
    }
}

// Setup menu bar
function setupMenuBar() {
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const menu = e.target.dataset.menu;
            handleMenuClick(menu);
        });
        
        // Add keyboard support
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const menu = e.target.dataset.menu;
                handleMenuClick(menu);
            }
        });
    });
}

function handleMenuClick(menu) {
    switch(menu) {
        case 'os':
            showAboutDialog();
            break;
        case 'file':
            showNotification('File Menu', 'File menu options');
            break;
        case 'view':
            toggleTheme();
            break;
        case 'tools':
            openSandboxManager();
            break;
    }
}

// Setup desktop icons
function setupDesktopIcons() {
    const icons = document.querySelectorAll('.desktop-icon');
    
    icons.forEach(icon => {
        // Single click to select, double click to launch
        let clickCount = 0;
        let clickTimer = null;
        
        icon.addEventListener('click', (e) => {
            clickCount++;
            
            if (clickCount === 1) {
                // First click - select the icon
                icons.forEach(i => i.classList.remove('selected'));
                icon.classList.add('selected');
                
                clickTimer = setTimeout(() => {
                    clickCount = 0;
                }, 300);
            } else if (clickCount === 2) {
                // Double click - launch app
                clearTimeout(clickTimer);
                clickCount = 0;
                const app = icon.dataset.app;
                launchApp(app);
            }
        });
        
        // Add keyboard accessibility
        icon.setAttribute('tabindex', '0');
        icon.setAttribute('role', 'button');
        icon.setAttribute('aria-label', `Launch ${icon.querySelector('.label').textContent}`);
        
        icon.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const app = icon.dataset.app;
                launchApp(app);
            }
        });
        
        // Add hover effect for better feedback
        icon.addEventListener('mouseenter', () => {
            icon.style.transform = 'scale(1.05)';
        });
        
        icon.addEventListener('mouseleave', () => {
            if (!icon.classList.contains('selected')) {
                icon.style.transform = 'scale(1)';
            }
        });
    });
}

// Setup dock
function setupDock() {
    const dockItems = document.querySelectorAll('.dock-item');
    
    dockItems.forEach(item => {
        item.addEventListener('click', () => {
            const app = item.dataset.app;
            launchApp(app);
        });
        
        // Add accessibility attributes
        item.setAttribute('role', 'button');
        item.setAttribute('tabindex', '0');
        const appName = item.getAttribute('title');
        item.setAttribute('aria-label', `Launch ${appName}`);
        
        // Add keyboard support
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const app = item.dataset.app;
                launchApp(app);
            }
        });
    });
}

// Launch application
function launchApp(appName) {
    console.log(`Launching app: ${appName}`);
    
    switch(appName) {
        case 'file-explorer':
            openFileExplorer();
            break;
        case 'text-editor':
            openTextEditor();
            break;
        case 'calculator':
            openCalculator();
            break;
        case 'browser':
            openBrowser();
            break;
        case 'terminal':
            openTerminal();
            break;
        case 'music':
            openMusicPlayer();
            break;
        case 'videos':
            openVideoPlayer();
            break;
        case 'photos':
            openPhotoViewer();
            break;
        case 'email':
            openEmailClient();
            break;
        case 'calendar':
            openCalendar();
            break;
        case 'notes':
            openNotes();
            break;
        case 'settings':
            openSettings();
            break;
        case 'activity-monitor':
            openActivityMonitor();
            break;
        case 'sandbox-manager':
            openSandboxManager();
            break;
        case 'launchpad':
            openLaunchpad();
            break;
        case 'app-store':
            openAppStore();
            break;
        case 'time-machine':
            openTimeMachine();
            break;
        case 'voice-assistant':
            openVoiceAssistant();
            break;
        case 'spotlight':
            openSpotlight();
            break;
        case 'trash':
            openTrash();
            break;
        default:
            showNotification('App', `Opening ${appName}...`);
    }
}

// System monitoring
function startSystemMonitoring() {
    updateSystemStats();
    setInterval(updateSystemStats, 2000);
}

function updateSystemStats() {
    // Simulate system stats
    const cpu = Math.floor(Math.random() * 30) + 10;
    const ram = Math.floor(Math.random() * 40) + 20;
    const disk = Math.floor(Math.random() * 20) + 50;
    
    document.getElementById('status-cpu').textContent = `CPU: ${cpu}%`;
    document.getElementById('status-ram').textContent = `RAM: ${ram}%`;
    document.getElementById('status-disk').textContent = `Disk: ${disk}%`;
    
    // Update menu bar
    updateBatteryStatus();
    updateNetworkStatus();
}

async function updateBatteryStatus() {
    const batteryInfo = await getBatteryInfo();
    if (batteryInfo) {
        const icon = batteryInfo.charging ? '⚡' : '🔋';
        document.getElementById('menu-battery').textContent = `${icon} ${batteryInfo.level}%`;
    }
}

function updateNetworkStatus() {
    const online = navigator.onLine;
    document.getElementById('menu-network').textContent = online ? '🌐' : '📡';
}

// Clock
function updateClock() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    });
    const dateStr = now.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
    });
    
    document.getElementById('menu-time').textContent = `${dateStr}  ${timeStr}`;
}

// Theme toggle
function toggleTheme() {
    const isDark = document.body.classList.contains('dark-mode');
    if (isDark) {
        document.body.classList.remove('dark-mode');
        settingsManager.setSetting('theme', 'light');
        showNotification('Theme', 'Switched to Light mode');
    } else {
        document.body.classList.add('dark-mode');
        settingsManager.setSetting('theme', 'dark');
        showNotification('Theme', 'Switched to Dark mode');
    }
}

// About dialog
function showAboutDialog() {
    windowManager.createWindow({
        title: 'About SandboxOS Web',
        width: 500,
        height: 400,
        content: `
            <div style="padding:40px; text-align:center;">
                <h1 style="font-size:32px; margin-bottom:10px;">SandboxOS Web</h1>
                <p style="font-size:16px; opacity:0.8;">Version 1.0 - The World's Best Web-Based OS</p>
                <div style="margin:30px 0; padding:20px; background:rgba(0,122,255,0.1); border-radius:8px; text-align:left;">
                    <p><strong>Features:</strong> 2500+</p>
                    <p><strong>Platform:</strong> ${navigator.platform}</p>
                    <p><strong>Browser:</strong> ${navigator.userAgent.split(' ').pop()}</p>
                    <p><strong>Online:</strong> ${navigator.onLine ? 'Yes' : 'No'}</p>
                </div>
                <div style="font-size:14px; opacity:0.7; margin-top:30px;">
                    <p>🔒 Sandbox Isolation System</p>
                    <p>🏪 App Store & Package Manager</p>
                    <p>⏰ Time Machine Backups</p>
                    <p>🎤 Voice Assistant & Cloud Sync</p>
                    <p>🎯 Mission Control & Launchpad</p>
                    <p>💻 Developer Console & Tools</p>
                    <p>And much more!</p>
                </div>
                <p style="margin-top:30px; font-size:12px; opacity:0.6;">© 2024 SandboxOS Web Project</p>
            </div>
        `
    });
}

// Fullscreen functionality
function setupFullscreen() {
    // Add fullscreen button to menu bar
    const menuRight = document.querySelector('.menu-right');
    const fullscreenBtn = document.createElement('span');
    fullscreenBtn.id = 'fullscreen-btn';
    fullscreenBtn.className = 'menu-item';
    fullscreenBtn.innerHTML = '⛶';
    fullscreenBtn.title = 'Toggle Fullscreen (F11)';
    fullscreenBtn.style.cursor = 'pointer';
    fullscreenBtn.addEventListener('click', toggleFullscreen);
    menuRight.insertBefore(fullscreenBtn, menuRight.firstChild);
    
    // Listen for fullscreen changes
    document.addEventListener('fullscreenchange', updateFullscreenButton);
    document.addEventListener('webkitfullscreenchange', updateFullscreenButton);
    document.addEventListener('mozfullscreenchange', updateFullscreenButton);
    document.addEventListener('MSFullscreenChange', updateFullscreenButton);
}

function toggleFullscreen() {
    if (!document.fullscreenElement && !document.webkitFullscreenElement && 
        !document.mozFullScreenElement && !document.msFullscreenElement) {
        // Enter fullscreen
        const elem = document.documentElement;
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        }
        showNotification('Fullscreen', 'Entered fullscreen mode. Press F11 or ESC to exit.');
    } else {
        // Exit fullscreen
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
        showNotification('Fullscreen', 'Exited fullscreen mode.');
    }
}

function updateFullscreenButton() {
    const btn = document.getElementById('fullscreen-btn');
    if (btn) {
        const isFullscreen = document.fullscreenElement || document.webkitFullscreenElement || 
                           document.mozFullScreenElement || document.msFullscreenElement;
        btn.innerHTML = isFullscreen ? '⛶' : '⛶';
        btn.title = isFullscreen ? 'Exit Fullscreen (F11)' : 'Enter Fullscreen (F11)';
    }
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // F11 - Fullscreen
    if (e.key === 'F11') {
        e.preventDefault();
        toggleFullscreen();
    }
    
    // Ctrl+Q - Quit (show message)
    if (e.ctrlKey && e.key === 'q') {
        e.preventDefault();
        showNotification('System', 'Press Alt+F4 to close the browser window');
    }
    
    // Ctrl+N - New text editor
    if (e.ctrlKey && e.key === 'n') {
        e.preventDefault();
        openTextEditor();
    }
    
    // Ctrl+T - Terminal
    if (e.ctrlKey && e.key === 't') {
        e.preventDefault();
        openTerminal();
    }
    
    // Ctrl+Shift+S - Sandbox Manager
    if (e.ctrlKey && e.shiftKey && e.key === 'S') {
        e.preventDefault();
        openSandboxManager();
    }
    
    // Alt+Tab - App Switcher (Mission Control)
    if (e.altKey && e.key === 'Tab') {
        e.preventDefault();
        openMissionControl();
    }
});

// Handle online/offline events
window.addEventListener('online', () => {
    showNotification('Network', 'You are back online');
    updateNetworkStatus();
});

window.addEventListener('offline', () => {
    showNotification('Network', 'You are offline');
    updateNetworkStatus();
});

// Prevent context menu on desktop
document.getElementById('desktop').addEventListener('contextmenu', (e) => {
    e.preventDefault();
    return false;
});

// Log system info on startup
console.log('System Information:', getSystemInfo());
console.log('Storage Manager:', storageManager);
console.log('File System:', fileSystem);
console.log('Settings:', settingsManager.getSettings());
console.log('Sandbox Manager:', sandboxManager);

// Export for debugging
window.SandboxOS = {
    windowManager,
    storageManager,
    fileSystem,
    settingsManager,
    sandboxManager,
    launchApp,
    showNotification,
    toggleTheme
};

console.log('💡 Tip: Access SandboxOS API via window.SandboxOS');

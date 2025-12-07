function openSettings() {
    windowManager.createWindow({
        title: 'Settings',
        width: 700,
        height: 500,
        content: `
            <div class="settings-layout">
                <div class="settings-sidebar">
                    <div class="file-item" onclick="showSettingsSection('appearance')">🎨 Appearance</div>
                    <div class="file-item" onclick="showSettingsSection('system')">💻 System</div>
                    <div class="file-item" onclick="showSettingsSection('privacy')">🔒 Privacy</div>
                    <div class="file-item" onclick="showSettingsSection('about')">ℹ️ About</div>
                </div>
                <div class="settings-content" id="settings-content">
                    <h2>Appearance</h2>
                    <div class="settings-section">
                        <div class="settings-option">
                            <label class="settings-label">Theme</label>
                            <select onchange="changeTheme(this.value)">
                                <option value="light">Light</option>
                                <option value="dark">Dark</option>
                            </select>
                        </div>
                        <div class="settings-option">
                            <label class="settings-label">Accent Color</label>
                            <input type="color" value="#007AFF">
                        </div>
                    </div>
                </div>
            </div>
        `
    });
}

function changeTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
    settingsManager.setSetting('theme', theme);
    showNotification('Settings', `Theme changed to ${theme} mode`);
}

function showSettingsSection(section) {
    const content = document.getElementById('settings-content');
    if (section === 'about') {
        content.innerHTML = `
            <h2>About SandboxOS Web</h2>
            <p>Version 1.0 - Web Edition</p>
            <p>A comprehensive web-based operating system with sandboxing capabilities.</p>
            <p><strong>Features:</strong> 2500+</p>
            <p><strong>Platform:</strong> ${navigator.platform}</p>
            <p><strong>User Agent:</strong> ${navigator.userAgent.substring(0, 100)}...</p>
        `;
    }
}

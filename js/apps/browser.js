function openBrowser() {
    const windowId = windowManager.createWindow({
        title: 'SandboxOS Custom Browser',
        width: 1200,
        height: 850,
        content: `
            <div style="display: flex; flex-direction: column; height: 100%; background: #fff;">
                <!-- Navigation Bar -->
                <div style="display: flex; align-items: center; gap: 10px; padding: 12px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-bottom: 1px solid #ddd;">
                    <button class="browser-btn" id="browser-back" title="Back">◀</button>
                    <button class="browser-btn" id="browser-forward" title="Forward">▶</button>
                    <button class="browser-btn" id="browser-refresh" title="Refresh">🔄</button>
                    <button class="browser-btn" id="browser-home" title="Home">🏠</button>
                    <input type="text" id="browser-url" placeholder="Enter URL or search..." 
                           style="flex: 1; padding: 10px 15px; font-size: 14px; border-radius: 20px; border: none; outline: none;">
                    <button class="browser-btn-primary" id="browser-go">Go</button>
                    <button class="browser-btn" id="browser-bookmark" title="Bookmark">⭐</button>
                    <button class="browser-btn" id="browser-settings" title="Settings">⚙️</button>
                </div>
                
                <!-- Tabs Bar -->
                <div id="browser-tabs" style="display: flex; gap: 5px; padding: 8px; background: #f5f5f5; border-bottom: 1px solid #ddd; overflow-x: auto;">
                    <div class="browser-tab active" data-tab="0">
                        <span style="flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">🏠 Home</span>
                        <button class="tab-close">×</button>
                    </div>
                    <button class="browser-new-tab" id="new-tab" title="New Tab">+</button>
                </div>
                
                <!-- Content Area -->
                <div id="browser-content" style="flex: 1; overflow: auto; background: #fff;">
                    <div id="browser-page-home" class="browser-page active">
                        <div style="max-width: 1000px; margin: 0 auto; padding: 40px 20px;">
                            <div style="text-align: center; margin-bottom: 50px;">
                                <h1 style="font-size: 56px; margin-bottom: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Custom Browser</h1>
                                <p style="font-size: 18px; color: #666;">Fast, secure, and private browsing in SandboxOS</p>
                            </div>
                            
                            <div style="margin-bottom: 40px;">
                                <input type="text" id="search-box" placeholder="Search the web or enter URL..." 
                                       style="width: 100%; padding: 18px 24px; font-size: 16px; border-radius: 30px; border: 2px solid #007AFF; outline: none; box-shadow: 0 2px 8px rgba(0,122,255,0.1);">
                            </div>
                            
                            <!-- Quick Links Grid -->
                            <h3 style="margin-bottom: 20px; color: #333;">📚 Quick Links</h3>
                            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 20px; margin-bottom: 50px;">
                                ${generateQuickLinks()}
                            </div>
                            
                            <!-- Features -->
                            <h3 style="margin-bottom: 20px; color: #333;">✨ Browser Features</h3>
                            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; margin-bottom: 40px;">
                                ${generateBrowserFeatures()}
                            </div>
                            
                            <!-- Privacy Notice -->
                            <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 30px; border-radius: 16px; color: white;">
                                <h3 style="margin: 0 0 15px 0; display: flex; align-items: center; gap: 10px;">
                                    <span style="font-size: 32px;">🔒</span>
                                    <span>Privacy & Security</span>
                                </h3>
                                <p style="margin: 0; font-size: 15px; line-height: 1.6; opacity: 0.95;">
                                    This browser runs in a sandboxed environment, ensuring your browsing activity is isolated and secure. 
                                    All content is filtered through our security layer to protect against malicious websites and scripts.
                                </p>
                            </div>
                            
                            <!-- Browser Stats -->
                            <div style="margin-top: 40px;">
                                <h3 style="margin-bottom: 20px; color: #333;">📊 Browser Statistics</h3>
                                <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px;">
                                    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 12px; color: white; text-align: center;">
                                        <div style="font-size: 32px; font-weight: bold;" id="browser-stat-pages">0</div>
                                        <div style="font-size: 13px; opacity: 0.9;">Pages Visited</div>
                                    </div>
                                    <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); padding: 20px; border-radius: 12px; color: white; text-align: center;">
                                        <div style="font-size: 32px; font-weight: bold;" id="browser-stat-bookmarks">0</div>
                                        <div style="font-size: 13px; opacity: 0.9;">Bookmarks</div>
                                    </div>
                                    <div style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); padding: 20px; border-radius: 12px; color: white; text-align: center;">
                                        <div style="font-size: 32px; font-weight: bold;" id="browser-stat-tabs">1</div>
                                        <div style="font-size: 13px; opacity: 0.9;">Tabs Open</div>
                                    </div>
                                    <div style="background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); padding: 20px; border-radius: 12px; color: white; text-align: center;">
                                        <div style="font-size: 32px; font-weight: bold;" id="browser-stat-blocked">0</div>
                                        <div style="font-size: 13px; opacity: 0.9;">Ads Blocked</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Bookmarks Page -->
                    <div id="browser-page-bookmarks" class="browser-page" style="display: none;">
                        <div style="max-width: 1000px; margin: 0 auto; padding: 40px 20px;">
                            <h2 style="margin-bottom: 30px;">⭐ Bookmarks</h2>
                            <div id="bookmarks-list">
                                <p style="text-align: center; color: #999; padding: 40px;">No bookmarks yet. Click the star icon to bookmark pages.</p>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Settings Page -->
                    <div id="browser-page-settings" class="browser-page" style="display: none;">
                        <div style="max-width: 800px; margin: 0 auto; padding: 40px 20px;">
                            <h2 style="margin-bottom: 30px;">⚙️ Browser Settings</h2>
                            ${generateBrowserSettings()}
                        </div>
                    </div>
                </div>
                
                <!-- Status Bar -->
                <div style="padding: 10px 16px; background: #f5f5f5; border-top: 1px solid #ddd; display: flex; justify-content: space-between; align-items: center; font-size: 12px; color: #666;">
                    <span id="browser-status">Ready</span>
                    <div style="display: flex; gap: 20px; align-items: center;">
                        <span id="browser-security">🔒 Secure Sandbox</span>
                        <span id="browser-privacy">🛡️ Privacy Mode: On</span>
                        <span id="browser-speed">⚡ Fast Loading</span>
                    </div>
                </div>
            </div>
            
            <style>
                .browser-btn {
                    background: rgba(255,255,255,0.2);
                    border: none;
                    color: white;
                    padding: 8px 16px;
                    border-radius: 8px;
                    cursor: pointer;
                    font-size: 16px;
                    transition: background 0.2s;
                }
                .browser-btn:hover {
                    background: rgba(255,255,255,0.3);
                }
                .browser-btn-primary {
                    background: white;
                    color: #667eea;
                    border: none;
                    padding: 10px 24px;
                    border-radius: 20px;
                    cursor: pointer;
                    font-weight: 600;
                    transition: transform 0.2s;
                }
                .browser-btn-primary:hover {
                    transform: scale(1.05);
                }
                .browser-tab {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 8px 12px;
                    background: #fff;
                    border-radius: 8px 8px 0 0;
                    cursor: pointer;
                    max-width: 200px;
                    min-width: 120px;
                    border: 1px solid #ddd;
                    border-bottom: none;
                }
                .browser-tab.active {
                    background: #fff;
                    border-bottom: 2px solid #fff;
                }
                .browser-tab:not(.active) {
                    background: #e8e8e8;
                }
                .tab-close {
                    background: none;
                    border: none;
                    font-size: 20px;
                    cursor: pointer;
                    padding: 0;
                    width: 20px;
                    height: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    transition: background 0.2s;
                }
                .tab-close:hover {
                    background: rgba(0,0,0,0.1);
                }
                .browser-new-tab {
                    background: #e8e8e8;
                    border: 1px solid #ddd;
                    padding: 8px 16px;
                    border-radius: 8px 8px 0 0;
                    cursor: pointer;
                    font-size: 18px;
                }
                .browser-new-tab:hover {
                    background: #d8d8d8;
                }
                .quick-link-card {
                    background: linear-gradient(135deg, var(--gradient-start) 0%, var(--gradient-end) 100%);
                    padding: 24px;
                    border-radius: 12px;
                    color: white;
                    cursor: pointer;
                    transition: transform 0.2s;
                    text-align: center;
                }
                .quick-link-card:hover {
                    transform: translateY(-4px);
                }
                .feature-card {
                    background: white;
                    border: 1px solid #e0e0e0;
                    padding: 24px;
                    border-radius: 12px;
                    transition: box-shadow 0.2s;
                }
                .feature-card:hover {
                    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                }
            </style>
        `
    });
    
    // Add event listeners
    setTimeout(() => {
        initBrowserControls();
    }, 100);
}

function generateQuickLinks() {
    const links = [
        { name: 'News', icon: '📰', url: 'https://news.example.com', gradientStart: '#667eea', gradientEnd: '#764ba2' },
        { name: 'Social', icon: '📱', url: 'https://social.example.com', gradientStart: '#f093fb', gradientEnd: '#f5576c' },
        { name: 'Music', icon: '🎵', url: 'spotify', gradientStart: '#4facfe', gradientEnd: '#00f2fe' },
        { name: 'Videos', icon: '🎬', url: 'youtube', gradientStart: '#43e97b', gradientEnd: '#38f9d7' },
        { name: 'Shopping', icon: '🛍️', url: 'https://shop.example.com', gradientStart: '#fa709a', gradientEnd: '#fee140' },
        { name: 'Games', icon: '🎮', url: 'https://games.example.com', gradientStart: '#30cfd0', gradientEnd: '#330867' }
    ];
    
    return links.map(link => `
        <div class="quick-link-card" data-url="${link.url}" 
             style="--gradient-start: ${link.gradientStart}; --gradient-end: ${link.gradientEnd};">
            <div style="font-size: 40px; margin-bottom: 12px;">${link.icon}</div>
            <div style="font-weight: 600; font-size: 16px;">${link.name}</div>
        </div>
    `).join('');
}

function generateBrowserFeatures() {
    const features = [
        { icon: '🚀', title: 'Fast Loading', desc: 'Optimized performance for quick page loads' },
        { icon: '🔒', title: 'Secure Browsing', desc: 'Advanced security to protect your data' },
        { icon: '🛡️', title: 'Ad Blocker', desc: 'Built-in ad blocking for cleaner browsing' },
        { icon: '🌙', title: 'Dark Mode', desc: 'Easy on the eyes with dark theme support' },
        { icon: '📥', title: 'Download Manager', desc: 'Manage your downloads efficiently' },
        { icon: '🔍', title: 'Privacy Mode', desc: 'Browse privately without tracking' }
    ];
    
    return features.map(feature => `
        <div class="feature-card">
            <div style="font-size: 36px; margin-bottom: 12px;">${feature.icon}</div>
            <h4 style="margin: 0 0 8px 0; font-size: 18px;">${feature.title}</h4>
            <p style="margin: 0; color: #666; font-size: 14px; line-height: 1.5;">${feature.desc}</p>
        </div>
    `).join('');
}

function generateBrowserSettings() {
    return `
        <div style="display: flex; flex-direction: column; gap: 20px;">
            <div style="background: white; border: 1px solid #e0e0e0; padding: 24px; border-radius: 12px;">
                <h3 style="margin: 0 0 16px 0;">Privacy & Security</h3>
                <div style="display: flex; flex-direction: column; gap: 12px;">
                    <label style="display: flex; align-items: center; justify-content: space-between;">
                        <span>Block Ads</span>
                        <input type="checkbox" checked>
                    </label>
                    <label style="display: flex; align-items: center; justify-content: space-between;">
                        <span>Enable Privacy Mode</span>
                        <input type="checkbox" checked>
                    </label>
                    <label style="display: flex; align-items: center; justify-content: space-between;">
                        <span>Block Trackers</span>
                        <input type="checkbox" checked>
                    </label>
                    <label style="display: flex; align-items: center; justify-content: space-between;">
                        <span>HTTPS Only</span>
                        <input type="checkbox" checked>
                    </label>
                </div>
            </div>
            
            <div style="background: white; border: 1px solid #e0e0e0; padding: 24px; border-radius: 12px;">
                <h3 style="margin: 0 0 16px 0;">Appearance</h3>
                <div style="display: flex; flex-direction: column; gap: 12px;">
                    <label style="display: flex; align-items: center; justify-content: space-between;">
                        <span>Dark Mode</span>
                        <input type="checkbox">
                    </label>
                    <label style="display: flex; align-items: center; justify-content: space-between;">
                        <span>Show Bookmarks Bar</span>
                        <input type="checkbox" checked>
                    </label>
                    <label style="display: flex; align-items: center; justify-content: space-between;">
                        <span>Compact Mode</span>
                        <input type="checkbox">
                    </label>
                </div>
            </div>
            
            <div style="background: white; border: 1px solid #e0e0e0; padding: 24px; border-radius: 12px;">
                <h3 style="margin: 0 0 16px 0;">Advanced</h3>
                <div style="display: flex; flex-direction: column; gap: 12px;">
                    <button class="button" style="padding: 12px 24px;">Clear Browsing Data</button>
                    <button class="button button-secondary" style="padding: 12px 24px;">Reset Settings</button>
                    <button class="button button-secondary" style="padding: 12px 24px;">Export Bookmarks</button>
                </div>
            </div>
        </div>
    `;
}

function initBrowserControls() {
    let tabCounter = 1;
    let pagesVisited = 0;
    let bookmarksCount = 0;
    let adsBlocked = 0;
    
    const goBtn = document.getElementById('browser-go');
    const urlInput = document.getElementById('browser-url');
    const searchBox = document.getElementById('search-box');
    const backBtn = document.getElementById('browser-back');
    const forwardBtn = document.getElementById('browser-forward');
    const refreshBtn = document.getElementById('browser-refresh');
    const homeBtn = document.getElementById('browser-home');
    const bookmarkBtn = document.getElementById('browser-bookmark');
    const settingsBtn = document.getElementById('browser-settings');
    const newTabBtn = document.getElementById('new-tab');
    
    // Navigate function
    const navigate = () => {
        const url = urlInput.value.trim();
        if (url) {
            // Check for special app shortcuts
            if (url === 'spotify' || url.includes('spotify')) {
                openSpotify();
                showNotification('Browser', 'Launching Spotify...');
                return;
            }
            if (url === 'youtube' || url.includes('youtube')) {
                openYouTube();
                showNotification('Browser', 'Launching YouTube...');
                return;
            }
            
            pagesVisited++;
            adsBlocked += Math.floor(Math.random() * 5);
            updateStats();
            showNotification('Browser', `Navigating to: ${url}`);
            document.getElementById('browser-status').textContent = `Loading ${url}...`;
            
            setTimeout(() => {
                document.getElementById('browser-status').textContent = 'Page loaded - Sandbox secure';
            }, 1000);
        }
    };
    
    const updateStats = () => {
        document.getElementById('browser-stat-pages').textContent = pagesVisited;
        document.getElementById('browser-stat-bookmarks').textContent = bookmarksCount;
        document.getElementById('browser-stat-tabs').textContent = tabCounter;
        document.getElementById('browser-stat-blocked').textContent = adsBlocked;
    };
    
    // Event listeners
    if (goBtn && urlInput) {
        goBtn.addEventListener('click', navigate);
        urlInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') navigate();
        });
    }
    
    if (searchBox) {
        searchBox.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && searchBox.value.trim()) {
                urlInput.value = `https://search.example.com?q=${encodeURIComponent(searchBox.value)}`;
                navigate();
            }
        });
    }
    
    if (backBtn) backBtn.addEventListener('click', () => showNotification('Browser', 'Going back'));
    if (forwardBtn) forwardBtn.addEventListener('click', () => showNotification('Browser', 'Going forward'));
    if (refreshBtn) refreshBtn.addEventListener('click', () => {
        showNotification('Browser', 'Refreshing page');
        adsBlocked += Math.floor(Math.random() * 3);
        updateStats();
    });
    if (homeBtn) homeBtn.addEventListener('click', () => {
        document.querySelectorAll('.browser-page').forEach(p => p.style.display = 'none');
        document.getElementById('browser-page-home').style.display = 'block';
    });
    
    if (bookmarkBtn) bookmarkBtn.addEventListener('click', () => {
        bookmarksCount++;
        updateStats();
        showNotification('Browser', 'Bookmark added');
    });
    
    if (settingsBtn) settingsBtn.addEventListener('click', () => {
        document.querySelectorAll('.browser-page').forEach(p => p.style.display = 'none');
        document.getElementById('browser-page-settings').style.display = 'block';
    });
    
    if (newTabBtn) {
        newTabBtn.addEventListener('click', () => {
            tabCounter++;
            updateStats();
            showNotification('Browser', 'New tab opened');
        });
    }
    
    // Quick links
    document.querySelectorAll('.quick-link-card').forEach(link => {
        link.addEventListener('click', function() {
            const url = this.dataset.url;
            if (url === 'spotify') {
                openSpotify();
            } else if (url === 'youtube') {
                openYouTube();
            } else {
                urlInput.value = url;
                navigate();
            }
        });
    });
}

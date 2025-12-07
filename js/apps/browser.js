function openBrowser() {
    const windowId = windowManager.createWindow({
        title: 'SandboxOS Browser',
        width: 1100,
        height: 750,
        content: `
            <div style="display: flex; flex-direction: column; height: 100%;">
                <div style="display: flex; align-items: center; gap: 10px; padding: 12px; background: rgba(0,0,0,0.05); border-bottom: 1px solid #ddd;">
                    <button class="button button-secondary" id="browser-back" style="padding: 6px 12px;">◀</button>
                    <button class="button button-secondary" id="browser-forward" style="padding: 6px 12px;">▶</button>
                    <button class="button button-secondary" id="browser-refresh" style="padding: 6px 12px;">🔄</button>
                    <button class="button button-secondary" id="browser-home" style="padding: 6px 12px;">🏠</button>
                    <input type="text" id="browser-url" placeholder="Enter URL or search..." 
                           style="flex: 1; padding: 10px 15px; font-size: 14px; border-radius: 20px;">
                    <button class="button" id="browser-go" style="padding: 8px 20px; border-radius: 20px;">Go</button>
                    <button class="button button-secondary" id="browser-bookmark" style="padding: 6px 12px;">⭐</button>
                </div>
                <div id="browser-tabs" style="display: flex; gap: 5px; padding: 8px; background: rgba(0,0,0,0.02); border-bottom: 1px solid #ddd; overflow-x: auto;">
                    <div class="browser-tab active" data-tab="0">
                        <span>🏠 Home</span>
                        <button class="tab-close">×</button>
                    </div>
                    <button class="button button-secondary" id="new-tab" style="padding: 4px 12px; font-size: 18px;">+</button>
                </div>
                <div id="browser-content" style="flex: 1; overflow: auto; padding: 20px;">
                    <div id="browser-page-home" class="browser-page active">
                        <div style="max-width: 800px; margin: 0 auto;">
                            <h1 style="font-size: 48px; text-align: center; margin-bottom: 30px;">🌐 SandboxOS Browser</h1>
                            <div style="text-align: center; margin-bottom: 40px;">
                                <input type="text" id="search-box" placeholder="Search the web..." 
                                       style="width: 100%; max-width: 600px; padding: 15px 20px; font-size: 16px; border-radius: 25px; border: 2px solid #007AFF;">
                            </div>
                            <h3 style="margin-bottom: 15px;">📚 Quick Links</h3>
                            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 15px;">
                                <div class="quick-link" data-url="about:blank" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 12px; text-align: center; cursor: pointer;">
                                    <div style="font-size: 32px; margin-bottom: 8px;">📰</div>
                                    <div>News</div>
                                </div>
                                <div class="quick-link" data-url="about:blank" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 20px; border-radius: 12px; text-align: center; cursor: pointer;">
                                    <div style="font-size: 32px; margin-bottom: 8px;">📧</div>
                                    <div>Email</div>
                                </div>
                                <div class="quick-link" data-url="about:blank" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; padding: 20px; border-radius: 12px; text-align: center; cursor: pointer;">
                                    <div style="font-size: 32px; margin-bottom: 8px;">🎵</div>
                                    <div>Music</div>
                                </div>
                                <div class="quick-link" data-url="about:blank" style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); color: white; padding: 20px; border-radius: 12px; text-align: center; cursor: pointer;">
                                    <div style="font-size: 32px; margin-bottom: 8px;">🎬</div>
                                    <div>Videos</div>
                                </div>
                                <div class="quick-link" data-url="about:blank" style="background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); color: white; padding: 20px; border-radius: 12px; text-align: center; cursor: pointer;">
                                    <div style="font-size: 32px; margin-bottom: 8px;">🛍️</div>
                                    <div>Shopping</div>
                                </div>
                                <div class="quick-link" data-url="about:blank" style="background: linear-gradient(135deg, #30cfd0 0%, #330867 100%); color: white; padding: 20px; border-radius: 12px; text-align: center; cursor: pointer;">
                                    <div style="font-size: 32px; margin-bottom: 8px;">🎮</div>
                                    <div>Games</div>
                                </div>
                            </div>
                            <div style="margin-top: 40px; padding: 20px; background: rgba(255, 165, 0, 0.1); border-radius: 12px; border-left: 4px solid #FFA500;">
                                <h4 style="margin: 0 0 10px 0;">ℹ️ Browser Information</h4>
                                <p style="margin: 0; opacity: 0.8;">This is a demo browser running in SandboxOS. For security reasons, external websites cannot be embedded. This browser simulates a web browsing experience within the sandbox environment.</p>
                            </div>
                            <div style="margin-top: 20px;">
                                <h3 style="margin-bottom: 15px;">📊 Browser Stats</h3>
                                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px;">
                                    <div style="background: rgba(0,122,255,0.1); padding: 15px; border-radius: 8px; text-align: center;">
                                        <div style="font-size: 24px; font-weight: bold; color: #007AFF;">0</div>
                                        <div style="font-size: 12px; opacity: 0.7;">Pages Visited</div>
                                    </div>
                                    <div style="background: rgba(0,122,255,0.1); padding: 15px; border-radius: 8px; text-align: center;">
                                        <div style="font-size: 24px; font-weight: bold; color: #007AFF;">0</div>
                                        <div style="font-size: 12px; opacity: 0.7;">Bookmarks</div>
                                    </div>
                                    <div style="background: rgba(0,122,255,0.1); padding: 15px; border-radius: 8px; text-align: center;">
                                        <div style="font-size: 24px; font-weight: bold; color: #007AFF;">0</div>
                                        <div style="font-size: 12px; opacity: 0.7;">Tabs Open</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style="padding: 8px 12px; background: rgba(0,0,0,0.02); border-top: 1px solid #ddd; display: flex; justify-content: space-between; align-items: center; font-size: 12px;">
                    <span id="browser-status">Ready</span>
                    <span>🔒 Secure Connection</span>
                </div>
            </div>
        `
    });
    
    // Add event listeners
    setTimeout(() => {
        const goBtn = document.getElementById('browser-go');
        const urlInput = document.getElementById('browser-url');
        const searchBox = document.getElementById('search-box');
        const backBtn = document.getElementById('browser-back');
        const forwardBtn = document.getElementById('browser-forward');
        const refreshBtn = document.getElementById('browser-refresh');
        const homeBtn = document.getElementById('browser-home');
        const bookmarkBtn = document.getElementById('browser-bookmark');
        
        if (goBtn && urlInput) {
            const navigate = () => {
                const url = urlInput.value.trim();
                if (url) {
                    showNotification('Browser', `Navigating to: ${url}`);
                    document.getElementById('browser-status').textContent = `Loading ${url}...`;
                    setTimeout(() => {
                        document.getElementById('browser-status').textContent = 'Page loaded';
                    }, 1000);
                }
            };
            
            goBtn.addEventListener('click', navigate);
            urlInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') navigate();
            });
        }
        
        if (searchBox) {
            searchBox.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && searchBox.value.trim()) {
                    showNotification('Browser', `Searching for: ${searchBox.value}`);
                    if (urlInput) {
                        urlInput.value = `https://search.example.com?q=${encodeURIComponent(searchBox.value)}`;
                    }
                }
            });
        }
        
        if (backBtn) backBtn.addEventListener('click', () => showNotification('Browser', 'Back button clicked'));
        if (forwardBtn) forwardBtn.addEventListener('click', () => showNotification('Browser', 'Forward button clicked'));
        if (refreshBtn) refreshBtn.addEventListener('click', () => showNotification('Browser', 'Page refreshed'));
        if (homeBtn) homeBtn.addEventListener('click', () => showNotification('Browser', 'Navigating to home'));
        if (bookmarkBtn) bookmarkBtn.addEventListener('click', () => showNotification('Browser', 'Bookmark added'));
        
        // Quick links
        document.querySelectorAll('.quick-link').forEach(link => {
            link.addEventListener('click', function() {
                const url = this.dataset.url;
                showNotification('Browser', `Opening ${this.textContent.trim()}`);
            });
        });
    }, 100);
}

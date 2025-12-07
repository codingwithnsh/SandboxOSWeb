function openAppStore() {
    const windowId = windowManager.createWindow({
        title: 'App Store',
        width: 1100,
        height: 800,
        content: `
            <div style="display: flex; flex-direction: column; height: 100%; background: #f5f5f7;">
                <!-- Header -->
                <div class="app-store-header" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 32px; color: white;">
                    <h1 style="font-size: 48px; margin: 0 0 16px 0;">App Store</h1>
                    <p style="font-size: 18px; margin: 0; opacity: 0.9;">Discover amazing apps for your SandboxOS</p>
                    <div style="margin-top: 24px;">
                        <input type="text" id="app-store-search" class="app-store-search" placeholder="Search apps, games, and more..." 
                               style="width: 100%; max-width: 500px; padding: 14px 20px; border-radius: 25px; border: none; font-size: 16px;">
                    </div>
                </div>
                
                <!-- Categories -->
                <div class="app-store-categories" style="display: flex; gap: 12px; padding: 20px 32px; background: white; border-bottom: 1px solid #e0e0e0; overflow-x: auto;">
                    <div class="app-store-category active" data-category="all">All Apps</div>
                    <div class="app-store-category" data-category="entertainment">Entertainment</div>
                    <div class="app-store-category" data-category="productivity">Productivity</div>
                    <div class="app-store-category" data-category="utilities">Utilities</div>
                    <div class="app-store-category" data-category="development">Development</div>
                    <div class="app-store-category" data-category="social">Social</div>
                </div>
                
                <!-- Featured Apps Section -->
                <div style="flex: 1; overflow-y: auto; padding: 32px;">
                    <div style="margin-bottom: 40px;">
                        <h2 style="font-size: 28px; margin-bottom: 20px; color: #1d1d1f;">Featured Apps</h2>
                        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 24px;">
                            ${generateFeaturedApps()}
                        </div>
                    </div>
                    
                    <div id="app-store-apps-container">
                        <h2 style="font-size: 28px; margin-bottom: 20px; color: #1d1d1f;">All Apps</h2>
                        <div class="app-store-apps" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 24px;">
                            ${generateAppStoreItems()}
                        </div>
                    </div>
                </div>
            </div>
            
            <style>
                .app-store-search {
                    outline: none;
                }
                .app-store-category {
                    padding: 10px 20px;
                    background: #f5f5f7;
                    border-radius: 20px;
                    cursor: pointer;
                    font-size: 14px;
                    font-weight: 500;
                    white-space: nowrap;
                    transition: all 0.2s;
                    color: #1d1d1f;
                }
                .app-store-category:hover {
                    background: #e8e8ed;
                }
                .app-store-category.active {
                    background: #007AFF;
                    color: white;
                }
                .app-store-item {
                    background: white;
                    border-radius: 16px;
                    padding: 24px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                    transition: transform 0.2s, box-shadow 0.2s;
                    display: flex;
                    flex-direction: column;
                }
                .app-store-item:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 8px 16px rgba(0,0,0,0.15);
                }
                .app-store-item-icon {
                    font-size: 64px;
                    margin-bottom: 16px;
                    text-align: center;
                }
                .app-store-item-name {
                    font-size: 20px;
                    font-weight: 600;
                    margin-bottom: 8px;
                    color: #1d1d1f;
                }
                .app-store-item-desc {
                    font-size: 14px;
                    color: #86868b;
                    margin-bottom: 12px;
                    flex: 1;
                    line-height: 1.5;
                }
                .app-store-item-rating {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    margin-bottom: 12px;
                    font-size: 14px;
                }
                .app-store-install-btn {
                    background: #007AFF;
                    color: white;
                    border: none;
                    padding: 12px 24px;
                    border-radius: 24px;
                    font-size: 15px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: background 0.2s;
                }
                .app-store-install-btn:hover {
                    background: #0051D5;
                }
                .app-store-install-btn.installed {
                    background: #34C759;
                }
                .app-store-install-btn.installing {
                    background: #86868b;
                    cursor: not-allowed;
                }
                .featured-app-card {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    border-radius: 16px;
                    padding: 32px;
                    color: white;
                    cursor: pointer;
                    transition: transform 0.2s;
                    min-height: 200px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                }
                .featured-app-card:hover {
                    transform: scale(1.02);
                }
            </style>
        `
    });
    
    setTimeout(() => {
        initAppStore(windowId);
    }, 100);
}

function generateFeaturedApps() {
    const featured = [
        { icon: '🎵', name: 'Spotify', desc: 'Music for everyone', gradient: 'linear-gradient(135deg, #1DB954 0%, #191414 100%)' },
        { icon: '▶️', name: 'YouTube', desc: 'Watch your favorite videos', gradient: 'linear-gradient(135deg, #FF0000 0%, #282828 100%)' },
        { icon: '🌐', name: 'Custom Browser', desc: 'Browse the web securely', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }
    ];
    
    return featured.map(app => `
        <div class="featured-app-card" style="background: ${app.gradient};" data-featured-app="${app.name.toLowerCase().replace(' ', '-')}">
            <div>
                <div style="font-size: 56px; margin-bottom: 12px;">${app.icon}</div>
                <h3 style="font-size: 24px; margin: 0 0 8px 0;">${app.name}</h3>
                <p style="margin: 0; opacity: 0.9;">${app.desc}</p>
            </div>
            <button class="app-store-install-btn" style="align-self: flex-start; margin-top: 16px;">Get</button>
        </div>
    `).join('');
}

function generateAppStoreItems() {
    const apps = [
        { 
            id: 'spotify',
            icon: '🎵', 
            name: 'Spotify', 
            desc: 'Stream millions of songs and podcasts. Listen to your favorite music anytime, anywhere.', 
            rating: '4.9',
            category: 'entertainment',
            downloads: '500M+',
            size: '45 MB',
            installed: false
        },
        { 
            id: 'youtube',
            icon: '▶️', 
            name: 'YouTube', 
            desc: 'Watch, like, and share videos from creators around the world. Your video destination.', 
            rating: '4.8',
            category: 'entertainment',
            downloads: '1B+',
            size: '125 MB',
            installed: false
        },
        { 
            id: 'custom-browser',
            icon: '🌐', 
            name: 'Custom Browser', 
            desc: 'Fast, secure web browsing with built-in privacy features and ad blocking capabilities.', 
            rating: '4.7',
            category: 'utilities',
            downloads: '100M+',
            size: '85 MB',
            installed: true
        },
        { 
            id: 'advanced-editor',
            icon: '📝', 
            name: 'Advanced Editor', 
            desc: 'Powerful text editor with syntax highlighting, multiple tabs, and advanced features.', 
            rating: '4.5',
            category: 'productivity',
            downloads: '50M+',
            size: '22 MB',
            installed: false
        },
        { 
            id: 'photo-editor',
            icon: '🎨', 
            name: 'Photo Editor', 
            desc: 'Professional photo editing with filters, effects, and advanced tools for creativity.', 
            rating: '4.8',
            category: 'utilities',
            downloads: '200M+',
            size: '95 MB',
            installed: false
        },
        { 
            id: 'data-analyzer',
            icon: '📊', 
            name: 'Data Analyzer', 
            desc: 'Analyze and visualize your data with powerful charts and statistical tools.', 
            rating: '4.2',
            category: 'productivity',
            downloads: '10M+',
            size: '55 MB',
            installed: false
        },
        { 
            id: 'music-studio',
            icon: '🎼', 
            name: 'Music Studio', 
            desc: 'Create and produce music with professional-grade virtual instruments and effects.', 
            rating: '4.6',
            category: 'entertainment',
            downloads: '25M+',
            size: '180 MB',
            installed: false
        },
        { 
            id: 'game-center',
            icon: '🎮', 
            name: 'Game Center', 
            desc: 'Play casual games, track achievements, and compete with friends online.', 
            rating: '4.4',
            category: 'entertainment',
            downloads: '150M+',
            size: '120 MB',
            installed: false
        },
        { 
            id: 'e-reader',
            icon: '📚', 
            name: 'E-Reader', 
            desc: 'Read ebooks, PDFs, and documents with customizable fonts and reading modes.', 
            rating: '4.7',
            category: 'productivity',
            downloads: '75M+',
            size: '35 MB',
            installed: false
        },
        { 
            id: 'video-editor',
            icon: '🎬', 
            name: 'Video Editor', 
            desc: 'Edit videos with transitions, effects, and timeline-based editing tools.', 
            rating: '4.5',
            category: 'utilities',
            downloads: '80M+',
            size: '210 MB',
            installed: false
        },
        { 
            id: 'messenger',
            icon: '💬', 
            name: 'Messenger', 
            desc: 'Chat with friends and family with instant messaging and video calls.', 
            rating: '4.3',
            category: 'social',
            downloads: '500M+',
            size: '65 MB',
            installed: false
        },
        { 
            id: 'code-playground',
            icon: '💻', 
            name: 'Code Playground', 
            desc: 'Learn and practice coding with interactive tutorials and challenges.', 
            rating: '4.8',
            category: 'development',
            downloads: '20M+',
            size: '42 MB',
            installed: false
        }
    ];
    
    return apps.map(app => `
        <div class="app-store-item" data-app-id="${app.id}" data-category="${app.category}">
            <div class="app-store-item-icon">${app.icon}</div>
            <div class="app-store-item-name">${app.name}</div>
            <div class="app-store-item-desc">${app.desc}</div>
            <div class="app-store-item-rating">
                <span>⭐ ${app.rating}</span>
                <span style="color: #86868b;">•</span>
                <span style="color: #86868b;">${app.downloads}</span>
                <span style="color: #86868b;">•</span>
                <span style="color: #86868b;">${app.size}</span>
            </div>
            <button class="app-store-install-btn ${app.installed ? 'installed' : ''}" data-app-id="${app.id}">
                ${app.installed ? 'Installed ✓' : 'Get'}
            </button>
        </div>
    `).join('');
}

function initAppStore(windowId) {
    // Category filtering
    document.querySelectorAll('.app-store-category').forEach(cat => {
        cat.addEventListener('click', function() {
            document.querySelectorAll('.app-store-category').forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            
            const category = this.dataset.category;
            filterAppsByCategory(category);
        });
    });
    
    // Search functionality
    const searchInput = document.getElementById('app-store-search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            filterAppsBySearch(query);
        });
    }
    
    // Install buttons
    document.querySelectorAll('.app-store-install-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const appId = this.dataset.appId;
            if (!this.classList.contains('installed') && !this.classList.contains('installing')) {
                installApp(this, appId);
            }
        });
    });
    
    // Featured app cards
    document.querySelectorAll('[data-featured-app]').forEach(card => {
        const btn = card.querySelector('.app-store-install-btn');
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const appName = card.dataset.featuredApp;
            installApp(this, appName);
        });
        
        card.addEventListener('click', function() {
            const appName = this.dataset.featuredApp;
            if (appName === 'spotify') {
                openSpotify();
            } else if (appName === 'youtube') {
                openYouTube();
            } else if (appName === 'custom-browser') {
                openBrowser();
            }
        });
    });
}

function filterAppsByCategory(category) {
    const apps = document.querySelectorAll('.app-store-item');
    apps.forEach(app => {
        if (category === 'all' || app.dataset.category === category) {
            app.style.display = 'flex';
        } else {
            app.style.display = 'none';
        }
    });
}

function filterAppsBySearch(query) {
    const apps = document.querySelectorAll('.app-store-item');
    apps.forEach(app => {
        const name = app.querySelector('.app-store-item-name').textContent.toLowerCase();
        const desc = app.querySelector('.app-store-item-desc').textContent.toLowerCase();
        
        if (name.includes(query) || desc.includes(query)) {
            app.style.display = 'flex';
        } else {
            app.style.display = 'none';
        }
    });
}

function installApp(button, appId) {
    // Show installing state
    button.classList.add('installing');
    button.textContent = 'Installing...';
    button.disabled = true;
    
    // Simulate installation
    setTimeout(() => {
        button.classList.remove('installing');
        button.classList.add('installed');
        button.textContent = 'Installed ✓';
        
        showNotification('App Store', `Successfully installed app!`);
        
        // Launch the app after installation
        setTimeout(() => {
            if (appId === 'spotify') {
                openSpotify();
            } else if (appId === 'youtube') {
                openYouTube();
            } else if (appId === 'custom-browser') {
                openBrowser();
            } else {
                showNotification('App Store', `${appId} is now available in your app launcher`);
            }
        }, 500);
    }, 2000);
}

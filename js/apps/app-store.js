function openAppStore() {
    windowManager.createWindow({
        title: 'App Store',
        width: 900,
        height: 700,
        content: `
            <div class="app-store-header">
                <input type="text" class="app-store-search" placeholder="Search apps...">
            </div>
            <div class="app-store-categories">
                <div class="app-store-category active">All</div>
                <div class="app-store-category">Productivity</div>
                <div class="app-store-category">Utilities</div>
                <div class="app-store-category">Development</div>
                <div class="app-store-category">Entertainment</div>
            </div>
            <div class="app-store-apps">
                ${generateAppStoreItems()}
            </div>
        `
    });
}

function generateAppStoreItems() {
    const apps = [
        { icon: '📝', name: 'Advanced Editor', desc: 'Powerful text editor', rating: '4.5' },
        { icon: '🎨', name: 'Photo Editor', desc: 'Edit your photos', rating: '4.8' },
        { icon: '📊', name: 'Data Analyzer', desc: 'Analyze your data', rating: '4.2' },
        { icon: '🎵', name: 'Music Studio', desc: 'Create music', rating: '4.6' },
        { icon: '🎮', name: 'Game Center', desc: 'Play games', rating: '4.4' },
        { icon: '📚', name: 'E-Reader', desc: 'Read books', rating: '4.7' }
    ];
    
    return apps.map(app => `
        <div class="app-store-item">
            <div class="app-store-item-icon">${app.icon}</div>
            <div class="app-store-item-name">${app.name}</div>
            <div class="app-store-item-desc">${app.desc}</div>
            <div>⭐ ${app.rating}</div>
            <button class="button" style="margin-top:10px;">Install</button>
        </div>
    `).join('');
}

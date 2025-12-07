// File Explorer Application

function openFileExplorer() {
    const windowId = windowManager.createWindow({
        title: 'Files',
        width: 900,
        height: 600,
        content: `
            <div class="file-explorer-toolbar">
                <button class="button button-secondary" onclick="fileExplorerGoBack()">⬅️ Back</button>
                <button class="button button-secondary" onclick="fileExplorerGoHome()">🏠 Home</button>
                <button class="button button-secondary" onclick="fileExplorerNewFolder()">📁+ New Folder</button>
            </div>
            <div class="file-explorer-main">
                <div class="file-explorer-sidebar">
                    <h3>Favorites</h3>
                    <div class="file-item" onclick="navigateToPath('/Home')">📁 Home</div>
                    <div class="file-item" onclick="navigateToPath('/Home/Documents')">📄 Documents</div>
                    <div class="file-item" onclick="navigateToPath('/Home/Downloads')">📥 Downloads</div>
                    <div class="file-item" onclick="navigateToPath('/Home/Pictures')">🖼️ Pictures</div>
                </div>
                <div class="file-list" id="file-list"></div>
            </div>
        `
    });

    window.currentPath = '/Home';
    refreshFileList();
}

function refreshFileList() {
    const list = document.getElementById('file-list');
    if (!list) return;

    const items = fileSystem.listDirectory(window.currentPath);
    
    list.innerHTML = `
        <h3>📂 ${window.currentPath}</h3>
        ${items.map(item => `
            <div class="file-item" onclick="fileItemClick('${item.name}', '${item.type}')">
                <span class="file-icon">${item.type === 'folder' ? '📁' : getFileIcon(item.name)}</span>
                <div>
                    <div>${item.name}</div>
                    <small>${item.type === 'file' ? formatSize(item.size) : ''} - ${formatDate(item.modified)}</small>
                </div>
            </div>
        `).join('')}
        ${items.length === 0 ? '<p style="opacity:0.5; text-align:center; padding:40px;">Empty folder</p>' : ''}
    `;
}

function fileItemClick(name, type) {
    if (type === 'folder') {
        window.currentPath = window.currentPath + '/' + name;
        refreshFileList();
    } else {
        showNotification('File Explorer', `Opened: ${name}`);
    }
}

function navigateToPath(path) {
    window.currentPath = path;
    refreshFileList();
}

function fileExplorerGoBack() {
    const parts = window.currentPath.split('/').filter(p => p);
    if (parts.length > 1) {
        parts.pop();
        window.currentPath = '/' + parts.join('/');
        refreshFileList();
    }
}

function fileExplorerGoHome() {
    window.currentPath = '/Home';
    refreshFileList();
}

function fileExplorerNewFolder() {
    const name = prompt('Enter folder name:');
    if (name) {
        fileSystem.createFolder(window.currentPath, name);
        refreshFileList();
        showNotification('File Explorer', `Folder "${name}" created`);
    }
}

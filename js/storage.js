// Storage Manager for SandboxOS Web

class StorageManager {
    constructor() {
        this.prefix = 'sandboxos_';
    }

    // Save data to localStorage
    save(key, data) {
        try {
            const serialized = JSON.stringify(data);
            localStorage.setItem(this.prefix + key, serialized);
            return true;
        } catch (e) {
            console.error('Storage save error:', e);
            return false;
        }
    }

    // Load data from localStorage
    load(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(this.prefix + key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (e) {
            console.error('Storage load error:', e);
            return defaultValue;
        }
    }

    // Remove data from localStorage
    remove(key) {
        try {
            localStorage.removeItem(this.prefix + key);
            return true;
        } catch (e) {
            console.error('Storage remove error:', e);
            return false;
        }
    }

    // Clear all storage
    clear() {
        try {
            const keys = Object.keys(localStorage);
            keys.forEach(key => {
                if (key.startsWith(this.prefix)) {
                    localStorage.removeItem(key);
                }
            });
            return true;
        } catch (e) {
            console.error('Storage clear error:', e);
            return false;
        }
    }

    // Get all keys
    getAllKeys() {
        const keys = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith(this.prefix)) {
                keys.push(key.substring(this.prefix.length));
            }
        }
        return keys;
    }
}

// File System Manager (Virtual)
class FileSystemManager {
    constructor() {
        this.storage = new StorageManager();
        this.rootKey = 'filesystem';
        this.init();
    }

    init() {
        const fs = this.storage.load(this.rootKey);
        if (!fs) {
            // Create default file system structure
            const defaultFS = {
                '/': {
                    type: 'folder',
                    name: 'root',
                    created: new Date().toISOString(),
                    modified: new Date().toISOString(),
                    children: {
                        'Home': {
                            type: 'folder',
                            name: 'Home',
                            created: new Date().toISOString(),
                            modified: new Date().toISOString(),
                            children: {
                                'Documents': {
                                    type: 'folder',
                                    name: 'Documents',
                                    created: new Date().toISOString(),
                                    modified: new Date().toISOString(),
                                    children: {}
                                },
                                'Downloads': {
                                    type: 'folder',
                                    name: 'Downloads',
                                    created: new Date().toISOString(),
                                    modified: new Date().toISOString(),
                                    children: {}
                                },
                                'Desktop': {
                                    type: 'folder',
                                    name: 'Desktop',
                                    created: new Date().toISOString(),
                                    modified: new Date().toISOString(),
                                    children: {}
                                },
                                'Pictures': {
                                    type: 'folder',
                                    name: 'Pictures',
                                    created: new Date().toISOString(),
                                    modified: new Date().toISOString(),
                                    children: {}
                                },
                                'Music': {
                                    type: 'folder',
                                    name: 'Music',
                                    created: new Date().toISOString(),
                                    modified: new Date().toISOString(),
                                    children: {}
                                },
                                'Videos': {
                                    type: 'folder',
                                    name: 'Videos',
                                    created: new Date().toISOString(),
                                    modified: new Date().toISOString(),
                                    children: {}
                                }
                            }
                        }
                    }
                }
            };
            this.storage.save(this.rootKey, defaultFS);
        }
    }

    getFileSystem() {
        return this.storage.load(this.rootKey) || {};
    }

    saveFileSystem(fs) {
        this.storage.save(this.rootKey, fs);
    }

    // Navigate to path and get node
    getNode(path) {
        const fs = this.getFileSystem();
        const parts = path.split('/').filter(p => p);
        let current = fs['/'];
        
        for (const part of parts) {
            if (current && current.children && current.children[part]) {
                current = current.children[part];
            } else {
                return null;
            }
        }
        
        return current;
    }

    // List directory contents
    listDirectory(path) {
        const node = this.getNode(path);
        if (!node || node.type !== 'folder') {
            return [];
        }
        
        return Object.entries(node.children || {}).map(([name, item]) => ({
            name,
            type: item.type,
            size: item.size || 0,
            created: item.created,
            modified: item.modified
        }));
    }

    // Create folder
    createFolder(path, name) {
        const fs = this.getFileSystem();
        const parent = this.getNode(path);
        
        if (!parent || parent.type !== 'folder') {
            return false;
        }
        
        if (!parent.children) {
            parent.children = {};
        }
        
        if (parent.children[name]) {
            return false; // Already exists
        }
        
        parent.children[name] = {
            type: 'folder',
            name,
            created: new Date().toISOString(),
            modified: new Date().toISOString(),
            children: {}
        };
        
        this.saveFileSystem(fs);
        return true;
    }

    // Create file
    createFile(path, name, content = '') {
        const fs = this.getFileSystem();
        const parent = this.getNode(path);
        
        if (!parent || parent.type !== 'folder') {
            return false;
        }
        
        if (!parent.children) {
            parent.children = {};
        }
        
        parent.children[name] = {
            type: 'file',
            name,
            content,
            size: content.length,
            created: new Date().toISOString(),
            modified: new Date().toISOString()
        };
        
        this.saveFileSystem(fs);
        return true;
    }

    // Delete item
    deleteItem(path, name) {
        const fs = this.getFileSystem();
        const parent = this.getNode(path);
        
        if (!parent || parent.type !== 'folder' || !parent.children) {
            return false;
        }
        
        if (!parent.children[name]) {
            return false;
        }
        
        delete parent.children[name];
        parent.modified = new Date().toISOString();
        
        this.saveFileSystem(fs);
        return true;
    }

    // Rename item
    renameItem(path, oldName, newName) {
        const fs = this.getFileSystem();
        const parent = this.getNode(path);
        
        if (!parent || parent.type !== 'folder' || !parent.children) {
            return false;
        }
        
        if (!parent.children[oldName] || parent.children[newName]) {
            return false;
        }
        
        parent.children[newName] = parent.children[oldName];
        parent.children[newName].name = newName;
        parent.children[newName].modified = new Date().toISOString();
        delete parent.children[oldName];
        parent.modified = new Date().toISOString();
        
        this.saveFileSystem(fs);
        return true;
    }

    // Read file
    readFile(path, name) {
        const fs = this.getFileSystem();
        const parent = this.getNode(path);
        
        if (!parent || parent.type !== 'folder' || !parent.children) {
            return null;
        }
        
        const file = parent.children[name];
        if (!file || file.type !== 'file') {
            return null;
        }
        
        return file.content || '';
    }

    // Write file
    writeFile(path, name, content) {
        const fs = this.getFileSystem();
        const parent = this.getNode(path);
        
        if (!parent || parent.type !== 'folder' || !parent.children) {
            return false;
        }
        
        if (!parent.children[name]) {
            return this.createFile(path, name, content);
        }
        
        const file = parent.children[name];
        if (file.type !== 'file') {
            return false;
        }
        
        file.content = content;
        file.size = content.length;
        file.modified = new Date().toISOString();
        
        this.saveFileSystem(fs);
        return true;
    }
}

// Settings Manager
class SettingsManager {
    constructor() {
        this.storage = new StorageManager();
        this.settingsKey = 'settings';
        this.defaults = {
            theme: 'light',
            accentColor: '#007AFF',
            wallpaper: null,
            username: 'User',
            autoSave: true,
            notifications: true,
            soundEnabled: true
        };
    }

    getSettings() {
        return {
            ...this.defaults,
            ...this.storage.load(this.settingsKey, {})
        };
    }

    getSetting(key) {
        const settings = this.getSettings();
        return settings[key];
    }

    setSetting(key, value) {
        const settings = this.getSettings();
        settings[key] = value;
        this.storage.save(this.settingsKey, settings);
        return true;
    }

    resetSettings() {
        this.storage.save(this.settingsKey, this.defaults);
        return true;
    }
}

// Create global instances
const storageManager = new StorageManager();
const fileSystem = new FileSystemManager();
const settingsManager = new SettingsManager();

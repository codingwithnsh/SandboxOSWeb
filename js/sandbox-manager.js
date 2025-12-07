// Sandbox Manager for SandboxOS Web

class Sandbox {
    constructor(id, name, type, config = {}) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.status = 'stopped'; // stopped, running, paused
        this.created = new Date().toISOString();
        this.config = {
            cpuLimit: config.cpuLimit || 50,
            memoryLimit: config.memoryLimit || 512,
            diskLimit: config.diskLimit || 1024,
            ...config
        };
        this.stats = {
            cpu: 0,
            memory: 0,
            disk: 0,
            uptime: 0
        };
        this.iframe = null;
    }

    start() {
        if (this.status === 'running') return false;
        this.status = 'running';
        this.startTime = Date.now();
        
        // Create iframe for isolation
        // Note: Using restrictive sandbox for security - only allows scripts
        this.iframe = document.createElement('iframe');
        this.iframe.sandbox = 'allow-scripts';
        this.iframe.style.display = 'none';
        this.iframe.srcdoc = '<!DOCTYPE html><html><head><title>Sandbox</title></head><body><p>Sandbox Environment</p></body></html>';
        document.body.appendChild(this.iframe);
        
        // Simulate resource usage
        this.updateStatsInterval = setInterval(() => {
            this.updateStats();
        }, 1000);
        
        return true;
    }

    stop() {
        if (this.status !== 'running') return false;
        this.status = 'stopped';
        
        if (this.iframe) {
            document.body.removeChild(this.iframe);
            this.iframe = null;
        }
        
        if (this.updateStatsInterval) {
            clearInterval(this.updateStatsInterval);
        }
        
        this.stats = { cpu: 0, memory: 0, disk: 0, uptime: 0 };
        return true;
    }

    pause() {
        if (this.status !== 'running') return false;
        this.status = 'paused';
        return true;
    }

    resume() {
        if (this.status !== 'paused') return false;
        this.status = 'running';
        return true;
    }

    updateStats() {
        if (this.status === 'running') {
            // Simulate resource usage
            this.stats.cpu = Math.min(Math.random() * this.config.cpuLimit, this.config.cpuLimit);
            this.stats.memory = Math.min(Math.random() * this.config.memoryLimit, this.config.memoryLimit);
            this.stats.disk = Math.min(Math.random() * this.config.diskLimit * 0.1, this.config.diskLimit);
            this.stats.uptime = Math.floor((Date.now() - this.startTime) / 1000);
        }
    }

    getStats() {
        return { ...this.stats };
    }

    executeCommand(command) {
        // Simulate command execution in sandbox
        return `Sandbox [${this.name}]: Executed command: ${command}`;
    }
}

class SandboxManagerCore {
    constructor() {
        this.sandboxes = [];
        this.templates = {
            general: {
                name: 'General Purpose',
                cpuLimit: 50,
                memoryLimit: 512,
                diskLimit: 1024
            },
            development: {
                name: 'Development',
                cpuLimit: 75,
                memoryLimit: 1024,
                diskLimit: 2048
            },
            testing: {
                name: 'Testing',
                cpuLimit: 50,
                memoryLimit: 512,
                diskLimit: 512
            },
            lightweight: {
                name: 'Lightweight',
                cpuLimit: 25,
                memoryLimit: 256,
                diskLimit: 512
            },
            heavy: {
                name: 'Heavy Workload',
                cpuLimit: 100,
                memoryLimit: 2048,
                diskLimit: 4096
            }
        };
        this.loadSandboxes();
    }

    createSandbox(name, type = 'general', customConfig = null) {
        const id = generateId();
        const template = this.templates[type] || this.templates.general;
        const config = customConfig || template;
        
        const sandbox = new Sandbox(id, name, type, config);
        this.sandboxes.push(sandbox);
        this.saveSandboxes();
        
        showNotification('Sandbox Created', `Sandbox "${name}" has been created`);
        return sandbox;
    }

    deleteSandbox(id) {
        const index = this.sandboxes.findIndex(s => s.id === id);
        if (index !== -1) {
            const sandbox = this.sandboxes[index];
            sandbox.stop();
            this.sandboxes.splice(index, 1);
            this.saveSandboxes();
            showNotification('Sandbox Deleted', `Sandbox "${sandbox.name}" has been deleted`);
            return true;
        }
        return false;
    }

    getSandbox(id) {
        return this.sandboxes.find(s => s.id === id);
    }

    getAllSandboxes() {
        return this.sandboxes;
    }

    startSandbox(id) {
        const sandbox = this.getSandbox(id);
        if (sandbox && sandbox.start()) {
            this.saveSandboxes();
            showNotification('Sandbox Started', `Sandbox "${sandbox.name}" is now running`);
            return true;
        }
        return false;
    }

    stopSandbox(id) {
        const sandbox = this.getSandbox(id);
        if (sandbox && sandbox.stop()) {
            this.saveSandboxes();
            showNotification('Sandbox Stopped', `Sandbox "${sandbox.name}" has been stopped`);
            return true;
        }
        return false;
    }

    pauseSandbox(id) {
        const sandbox = this.getSandbox(id);
        if (sandbox && sandbox.pause()) {
            this.saveSandboxes();
            return true;
        }
        return false;
    }

    resumeSandbox(id) {
        const sandbox = this.getSandbox(id);
        if (sandbox && sandbox.resume()) {
            this.saveSandboxes();
            return true;
        }
        return false;
    }

    saveSandboxes() {
        const data = this.sandboxes.map(s => ({
            id: s.id,
            name: s.name,
            type: s.type,
            status: s.status,
            created: s.created,
            config: s.config
        }));
        storageManager.save('sandboxes', data);
    }

    loadSandboxes() {
        const data = storageManager.load('sandboxes', []);
        this.sandboxes = data.map(item => {
            const sandbox = new Sandbox(item.id, item.name, item.type, item.config);
            sandbox.created = item.created;
            sandbox.status = 'stopped'; // Reset status on load
            return sandbox;
        });
    }

    getTemplate(type) {
        return this.templates[type] || this.templates.general;
    }

    getAllTemplates() {
        return Object.entries(this.templates).map(([key, value]) => ({
            id: key,
            ...value
        }));
    }
}

// Create global sandbox manager instance
const sandboxManager = new SandboxManagerCore();

// Sandbox Manager UI Application
function openSandboxManager() {
    const windowId = windowManager.createWindow({
        title: 'Sandbox Manager',
        width: 1000,
        height: 700,
        content: '<div id="sandbox-manager-app"></div>'
    });

    const container = document.getElementById('sandbox-manager-app');
    renderSandboxManager(container);

    // Refresh interval
    const refreshInterval = setInterval(() => {
        if (!document.getElementById(`window-${windowId}`)) {
            clearInterval(refreshInterval);
        } else {
            renderSandboxManager(container);
        }
    }, 2000);
}

function renderSandboxManager(container) {
    const sandboxes = sandboxManager.getAllSandboxes();
    
    container.innerHTML = `
        <div class="sandbox-toolbar">
            <h2>🔒 Sandbox Manager</h2>
            <div>
                <button class="button" onclick="showCreateSandboxDialog()">➕ New Sandbox</button>
                <button class="button button-secondary" onclick="renderSandboxManager(document.getElementById('sandbox-manager-app'))">🔄 Refresh</button>
            </div>
        </div>
        <div class="sandbox-layout">
            <div class="sandbox-list-panel">
                <div class="sandbox-list-header">Sandboxes (${sandboxes.length})</div>
                <div class="sandbox-grid">
                    ${sandboxes.map(sandbox => `
                        <div class="sandbox-card">
                            <div class="sandbox-card-header">
                                <div class="sandbox-card-name">${sandbox.name}</div>
                                <div class="sandbox-card-status ${sandbox.status}">${sandbox.status.toUpperCase()}</div>
                            </div>
                            <div class="sandbox-card-info">
                                <div class="sandbox-card-info-item">
                                    <span>Type:</span>
                                    <span>${sandbox.type}</span>
                                </div>
                                <div class="sandbox-card-info-item">
                                    <span>CPU:</span>
                                    <span>${Math.round(sandbox.stats.cpu)}% / ${sandbox.config.cpuLimit}%</span>
                                </div>
                                <div class="sandbox-card-info-item">
                                    <span>Memory:</span>
                                    <span>${Math.round(sandbox.stats.memory)}MB / ${sandbox.config.memoryLimit}MB</span>
                                </div>
                                <div class="sandbox-card-info-item">
                                    <span>Disk:</span>
                                    <span>${Math.round(sandbox.stats.disk)}MB / ${sandbox.config.diskLimit}MB</span>
                                </div>
                            </div>
                            <div class="sandbox-card-controls">
                                ${sandbox.status === 'stopped' ? 
                                    `<button class="sandbox-control-btn" onclick="sandboxManager.startSandbox('${sandbox.id}')">▶️ Start</button>` :
                                    sandbox.status === 'running' ?
                                    `<button class="sandbox-control-btn secondary" onclick="sandboxManager.pauseSandbox('${sandbox.id}')">⏸️ Pause</button>
                                     <button class="sandbox-control-btn secondary" onclick="sandboxManager.stopSandbox('${sandbox.id}')">⏹️ Stop</button>` :
                                    `<button class="sandbox-control-btn" onclick="sandboxManager.resumeSandbox('${sandbox.id}')">▶️ Resume</button>`
                                }
                                <button class="sandbox-control-btn danger" onclick="sandboxManager.deleteSandbox('${sandbox.id}')">🗑️ Delete</button>
                            </div>
                        </div>
                    `).join('')}
                    ${sandboxes.length === 0 ? '<p style="text-align:center; padding: 40px; opacity: 0.7;">No sandboxes created. Click "New Sandbox" to get started.</p>' : ''}
                </div>
            </div>
        </div>
    `;
}

function showCreateSandboxDialog() {
    const overlay = document.createElement('div');
    overlay.className = 'sandbox-create-overlay';
    
    const dialog = document.createElement('div');
    dialog.className = 'sandbox-create-dialog';
    
    const templates = sandboxManager.getAllTemplates();
    let selectedTemplate = 'general';
    
    dialog.innerHTML = `
        <div class="sandbox-create-title">Create New Sandbox</div>
        <div class="sandbox-create-form">
            <div class="sandbox-form-group">
                <label class="sandbox-form-label">Sandbox Name</label>
                <input type="text" class="sandbox-form-input" id="sandbox-name-input" placeholder="My Sandbox">
            </div>
            <div class="sandbox-form-group">
                <label class="sandbox-form-label">Template</label>
                <div class="sandbox-templates">
                    ${templates.map(t => `
                        <div class="sandbox-template ${t.id === selectedTemplate ? 'selected' : ''}" data-template="${t.id}">
                            <div class="sandbox-template-name">${t.name}</div>
                            <div class="sandbox-template-specs">CPU: ${t.cpuLimit}% | RAM: ${t.memoryLimit}MB | Disk: ${t.diskLimit}MB</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
        <div class="sandbox-create-actions">
            <button class="button button-secondary" onclick="this.closest('.sandbox-create-overlay').remove(); this.closest('.sandbox-create-dialog').remove()">Cancel</button>
            <button class="button" id="create-sandbox-btn">Create</button>
        </div>
    `;
    
    document.body.appendChild(overlay);
    document.body.appendChild(dialog);
    
    // Template selection
    dialog.querySelectorAll('.sandbox-template').forEach(el => {
        el.addEventListener('click', function() {
            dialog.querySelectorAll('.sandbox-template').forEach(t => t.classList.remove('selected'));
            this.classList.add('selected');
            selectedTemplate = this.dataset.template;
        });
    });
    
    // Create button
    document.getElementById('create-sandbox-btn').addEventListener('click', () => {
        const name = document.getElementById('sandbox-name-input').value.trim();
        if (!name) {
            showNotification('Error', 'Please enter a sandbox name');
            return;
        }
        
        sandboxManager.createSandbox(name, selectedTemplate);
        overlay.remove();
        dialog.remove();
        
        // Refresh the sandbox manager view
        const container = document.getElementById('sandbox-manager-app');
        if (container) {
            renderSandboxManager(container);
        }
    });
    
    // Close on overlay click
    overlay.addEventListener('click', () => {
        overlay.remove();
        dialog.remove();
    });
}

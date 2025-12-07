// Window Manager for SandboxOS Web

class WindowManager {
    constructor() {
        this.windows = [];
        this.zIndexCounter = 100;
        this.activeWindow = null;
        this.container = document.getElementById('windows-container');
    }

    createWindow(options) {
        const {
            title = 'Window',
            width = 600,
            height = 400,
            content = '',
            onClose = null
        } = options;

        const windowId = generateId();
        const window = document.createElement('div');
        window.className = 'window';
        window.id = `window-${windowId}`;
        window.style.width = `${width}px`;
        window.style.height = `${height}px`;
        window.style.left = `${Math.random() * 200 + 50}px`;
        window.style.top = `${Math.random() * 100 + 50}px`;
        window.style.zIndex = this.zIndexCounter++;

        window.innerHTML = `
            <div class="window-title-bar">
                <div class="window-controls">
                    <div class="window-control close" data-action="close"></div>
                    <div class="window-control minimize" data-action="minimize"></div>
                    <div class="window-control maximize" data-action="maximize"></div>
                </div>
                <div class="window-title">${title}</div>
            </div>
            <div class="window-content" id="content-${windowId}">
                ${content}
            </div>
        `;

        this.container.appendChild(window);

        // Make window draggable
        this.makeDraggable(window);

        // Add window controls
        const closeBtn = window.querySelector('[data-action="close"]');
        const minimizeBtn = window.querySelector('[data-action="minimize"]');
        const maximizeBtn = window.querySelector('[data-action="maximize"]');

        closeBtn.addEventListener('click', () => {
            if (onClose) onClose();
            this.closeWindow(windowId);
        });

        minimizeBtn.addEventListener('click', () => {
            window.style.display = 'none';
        });

        maximizeBtn.addEventListener('click', () => {
            this.toggleMaximize(window);
        });

        // Focus on click
        window.addEventListener('mousedown', () => {
            this.focusWindow(window);
        });

        this.windows.push({
            id: windowId,
            element: window,
            title,
            minimized: false,
            maximized: false
        });

        this.focusWindow(window);

        return windowId;
    }

    makeDraggable(windowEl) {
        const titleBar = windowEl.querySelector('.window-title-bar');
        let isDragging = false;
        let currentX;
        let currentY;
        let initialX;
        let initialY;

        titleBar.addEventListener('mousedown', (e) => {
            if (e.target.classList.contains('window-control')) return;
            
            isDragging = true;
            initialX = e.clientX - windowEl.offsetLeft;
            initialY = e.clientY - windowEl.offsetTop;
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;

            e.preventDefault();
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;

            windowEl.style.left = `${currentX}px`;
            windowEl.style.top = `${currentY}px`;
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
        });
    }

    focusWindow(windowEl) {
        this.activeWindow = windowEl;
        windowEl.style.zIndex = this.zIndexCounter++;
    }

    closeWindow(windowId) {
        const index = this.windows.findIndex(w => w.id === windowId);
        if (index !== -1) {
            const window = this.windows[index];
            this.container.removeChild(window.element);
            this.windows.splice(index, 1);
        }
    }

    toggleMaximize(windowEl) {
        const window = this.windows.find(w => w.element === windowEl);
        if (!window) return;

        if (window.maximized) {
            windowEl.style.width = window.prevWidth;
            windowEl.style.height = window.prevHeight;
            windowEl.style.left = window.prevLeft;
            windowEl.style.top = window.prevTop;
            window.maximized = false;
        } else {
            window.prevWidth = windowEl.style.width;
            window.prevHeight = windowEl.style.height;
            window.prevLeft = windowEl.style.left;
            window.prevTop = windowEl.style.top;

            const desktop = document.getElementById('desktop');
            windowEl.style.width = `${desktop.offsetWidth}px`;
            windowEl.style.height = `${desktop.offsetHeight}px`;
            windowEl.style.left = '0px';
            windowEl.style.top = '0px';
            window.maximized = true;
        }
    }

    getContentElement(windowId) {
        return document.getElementById(`content-${windowId}`);
    }

    setWindowTitle(windowId, title) {
        const window = this.windows.find(w => w.id === windowId);
        if (window) {
            window.title = title;
            const titleEl = window.element.querySelector('.window-title');
            if (titleEl) {
                titleEl.textContent = title;
            }
        }
    }

    getAllWindows() {
        return this.windows;
    }
}

// Create global window manager instance
const windowManager = new WindowManager();

// Paint Application

function openPaint() {
    const windowId = windowManager.createWindow({
        title: '🎨 Paint',
        width: 900,
        height: 700,
        content: `
            <div style="display: flex; flex-direction: column; height: 100%;">
                <div style="display: flex; align-items: center; gap: 10px; padding: 10px; background: rgba(0,0,0,0.05); border-bottom: 1px solid #ddd; flex-wrap: wrap;">
                    <button class="button button-secondary" id="paint-clear">🗑️ Clear</button>
                    <button class="button button-secondary" id="paint-save">💾 Save</button>
                    <div style="height: 30px; width: 1px; background: #ddd; margin: 0 5px;"></div>
                    <label style="display: flex; align-items: center; gap: 5px;">
                        Tool:
                        <select id="paint-tool" style="padding: 5px;">
                            <option value="pen">✏️ Pen</option>
                            <option value="eraser">🧹 Eraser</option>
                            <option value="line">📏 Line</option>
                            <option value="rectangle">▢ Rectangle</option>
                            <option value="circle">⭕ Circle</option>
                            <option value="fill">🪣 Fill</option>
                        </select>
                    </label>
                    <label style="display: flex; align-items: center; gap: 5px;">
                        Size:
                        <input type="range" id="paint-size" min="1" max="50" value="5" style="width: 100px;">
                        <span id="size-value">5px</span>
                    </label>
                    <label style="display: flex; align-items: center; gap: 5px;">
                        Color:
                        <input type="color" id="paint-color" value="#000000" style="width: 50px; height: 30px; cursor: pointer;">
                    </label>
                    <div style="display: flex; gap: 5px; margin-left: 10px;">
                        <div class="color-preset" style="width: 30px; height: 30px; background: #000000; border: 2px solid #ddd; border-radius: 4px; cursor: pointer;" data-color="#000000"></div>
                        <div class="color-preset" style="width: 30px; height: 30px; background: #FF0000; border: 2px solid #ddd; border-radius: 4px; cursor: pointer;" data-color="#FF0000"></div>
                        <div class="color-preset" style="width: 30px; height: 30px; background: #00FF00; border: 2px solid #ddd; border-radius: 4px; cursor: pointer;" data-color="#00FF00"></div>
                        <div class="color-preset" style="width: 30px; height: 30px; background: #0000FF; border: 2px solid #ddd; border-radius: 4px; cursor: pointer;" data-color="#0000FF"></div>
                        <div class="color-preset" style="width: 30px; height: 30px; background: #FFFF00; border: 2px solid #ddd; border-radius: 4px; cursor: pointer;" data-color="#FFFF00"></div>
                        <div class="color-preset" style="width: 30px; height: 30px; background: #FF00FF; border: 2px solid #ddd; border-radius: 4px; cursor: pointer;" data-color="#FF00FF"></div>
                        <div class="color-preset" style="width: 30px; height: 30px; background: #00FFFF; border: 2px solid #ddd; border-radius: 4px; cursor: pointer;" data-color="#00FFFF"></div>
                        <div class="color-preset" style="width: 30px; height: 30px; background: #FFFFFF; border: 2px solid #ddd; border-radius: 4px; cursor: pointer;" data-color="#FFFFFF"></div>
                    </div>
                </div>
                <div style="flex: 1; position: relative; overflow: hidden; background: #f5f5f5;">
                    <canvas id="paint-canvas" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; border: 1px solid #ddd; cursor: crosshair; box-shadow: 0 2px 10px rgba(0,0,0,0.1);"></canvas>
                </div>
                <div style="padding: 8px 12px; background: rgba(0,0,0,0.02); border-top: 1px solid #ddd; display: flex; justify-content: space-between; font-size: 12px;">
                    <span id="paint-status">Ready to draw</span>
                    <span id="paint-coords">X: 0, Y: 0</span>
                </div>
            </div>
        `
    });
    
    setTimeout(() => {
        const canvas = document.getElementById('paint-canvas');
        if (!canvas) return;
        
        canvas.width = 800;
        canvas.height = 500;
        
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        let isDrawing = false;
        let lastX = 0;
        let lastY = 0;
        let currentTool = 'pen';
        let brushSize = 5;
        let brushColor = '#000000';
        
        const toolSelect = document.getElementById('paint-tool');
        const sizeSlider = document.getElementById('paint-size');
        const colorPicker = document.getElementById('paint-color');
        const clearBtn = document.getElementById('paint-clear');
        const saveBtn = document.getElementById('paint-save');
        const sizeValue = document.getElementById('size-value');
        const status = document.getElementById('paint-status');
        const coords = document.getElementById('paint-coords');
        
        // Tool selection
        if (toolSelect) {
            toolSelect.addEventListener('change', (e) => {
                currentTool = e.target.value;
                status.textContent = `Tool: ${e.target.options[e.target.selectedIndex].text}`;
            });
        }
        
        // Brush size
        if (sizeSlider && sizeValue) {
            sizeSlider.addEventListener('input', (e) => {
                brushSize = parseInt(e.target.value);
                sizeValue.textContent = brushSize + 'px';
            });
        }
        
        // Color picker
        if (colorPicker) {
            colorPicker.addEventListener('input', (e) => {
                brushColor = e.target.value;
            });
        }
        
        // Color presets
        document.querySelectorAll('.color-preset').forEach(preset => {
            preset.addEventListener('click', function() {
                brushColor = this.dataset.color;
                colorPicker.value = brushColor;
            });
        });
        
        // Clear canvas
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                if (confirm('Clear the canvas?')) {
                    ctx.fillStyle = 'white';
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    showNotification('Paint', 'Canvas cleared');
                }
            });
        }
        
        // Save canvas
        if (saveBtn) {
            saveBtn.addEventListener('click', () => {
                const dataURL = canvas.toDataURL('image/png');
                showNotification('Paint', 'Drawing saved (simulated)');
            });
        }
        
        // Mouse tracking
        canvas.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            const x = Math.floor(e.clientX - rect.left);
            const y = Math.floor(e.clientY - rect.top);
            coords.textContent = `X: ${x}, Y: ${y}`;
        });
        
        // Drawing functions
        canvas.addEventListener('mousedown', (e) => {
            isDrawing = true;
            const rect = canvas.getBoundingClientRect();
            lastX = e.clientX - rect.left;
            lastY = e.clientY - rect.top;
        });
        
        canvas.addEventListener('mousemove', (e) => {
            if (!isDrawing) return;
            
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            
            if (currentTool === 'pen') {
                ctx.strokeStyle = brushColor;
                ctx.lineWidth = brushSize;
                ctx.beginPath();
                ctx.moveTo(lastX, lastY);
                ctx.lineTo(x, y);
                ctx.stroke();
            } else if (currentTool === 'eraser') {
                ctx.strokeStyle = 'white';
                ctx.lineWidth = brushSize;
                ctx.beginPath();
                ctx.moveTo(lastX, lastY);
                ctx.lineTo(x, y);
                ctx.stroke();
            }
            
            lastX = x;
            lastY = y;
        });
        
        canvas.addEventListener('mouseup', () => {
            isDrawing = false;
        });
        
        canvas.addEventListener('mouseleave', () => {
            isDrawing = false;
        });
        
        showNotification('Paint', 'Paint app ready - Start drawing!');
    }, 100);
}

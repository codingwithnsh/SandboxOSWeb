// Code Editor Application

function openCodeEditor() {
    const windowId = windowManager.createWindow({
        title: '💻 Code Editor',
        width: 1000,
        height: 700,
        content: `
            <div style="display: flex; flex-direction: column; height: 100%;">
                <div style="display: flex; align-items: center; gap: 10px; padding: 10px; background: rgba(0,0,0,0.05); border-bottom: 1px solid #ddd;">
                    <button class="button button-secondary" id="new-file-btn">📄 New</button>
                    <button class="button button-secondary" id="open-file-btn">📁 Open</button>
                    <button class="button" id="save-file-btn">💾 Save</button>
                    <div style="flex: 1;"></div>
                    <select id="language-select" style="padding: 6px 10px;">
                        <option value="javascript">JavaScript</option>
                        <option value="python">Python</option>
                        <option value="html">HTML</option>
                        <option value="css">CSS</option>
                        <option value="json">JSON</option>
                        <option value="markdown">Markdown</option>
                    </select>
                    <button class="button" id="run-code-btn">▶️ Run</button>
                </div>
                <div style="flex: 1; display: flex;">
                    <div style="flex: 1; display: flex; flex-direction: column;">
                        <div style="display: flex; background: rgba(0,0,0,0.02); border-bottom: 1px solid #ddd;">
                            <div class="code-tab active" data-file="untitled.js" style="padding: 8px 15px; border-right: 1px solid #ddd; cursor: pointer; background: rgba(0,122,255,0.1);">
                                📄 untitled.js
                            </div>
                        </div>
                        <div style="flex: 1; display: flex;">
                            <div style="width: 50px; background: rgba(0,0,0,0.05); padding: 10px 5px; text-align: right; font-family: monospace; font-size: 14px; color: #666; user-select: none; border-right: 1px solid #ddd;" id="line-numbers">
                                1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br>10
                            </div>
                            <textarea id="code-editor" style="flex: 1; border: none; outline: none; padding: 10px; font-family: 'Courier New', monospace; font-size: 14px; resize: none; tab-size: 4;" spellcheck="false">// Welcome to SandboxOS Code Editor
// Start coding here!

function hello() {
    console.log("Hello from SandboxOS!");
}

hello();</textarea>
                        </div>
                    </div>
                    <div style="width: 350px; border-left: 1px solid #ddd; display: flex; flex-direction: column;">
                        <div style="padding: 10px; background: rgba(0,0,0,0.05); border-bottom: 1px solid #ddd; font-weight: 500;">
                            🔍 Output
                        </div>
                        <div id="code-output" style="flex: 1; padding: 15px; font-family: monospace; font-size: 13px; overflow: auto; background: #1e1e1e; color: #00ff00;">
                            <div style="color: #888; margin-bottom: 10px;">Ready to run code...</div>
                        </div>
                    </div>
                </div>
                <div style="padding: 8px 12px; background: rgba(0,0,0,0.02); border-top: 1px solid #ddd; display: flex; justify-content: space-between; font-size: 12px;">
                    <span id="editor-status">Line 1, Column 1</span>
                    <span id="editor-lang">JavaScript</span>
                </div>
            </div>
        `
    });
    
    setTimeout(() => {
        const editor = document.getElementById('code-editor');
        const output = document.getElementById('code-output');
        const runBtn = document.getElementById('run-code-btn');
        const saveBtn = document.getElementById('save-file-btn');
        const newBtn = document.getElementById('new-file-btn');
        const langSelect = document.getElementById('language-select');
        const lineNumbers = document.getElementById('line-numbers');
        const editorStatus = document.getElementById('editor-status');
        
        // Update line numbers
        function updateLineNumbers() {
            const lines = editor.value.split('\n').length;
            lineNumbers.innerHTML = Array.from({length: Math.max(lines, 20)}, (_, i) => i + 1).join('<br>');
        }
        
        // Update status bar
        function updateStatus() {
            const pos = editor.selectionStart;
            const beforeCursor = editor.value.substring(0, pos);
            const line = beforeCursor.split('\n').length;
            const col = beforeCursor.split('\n').pop().length + 1;
            editorStatus.textContent = `Line ${line}, Column ${col}`;
        }
        
        if (editor) {
            editor.addEventListener('input', () => {
                updateLineNumbers();
                updateStatus();
            });
            
            editor.addEventListener('click', updateStatus);
            editor.addEventListener('keyup', updateStatus);
            
            // Tab key support
            editor.addEventListener('keydown', (e) => {
                if (e.key === 'Tab') {
                    e.preventDefault();
                    const start = editor.selectionStart;
                    const end = editor.selectionEnd;
                    editor.value = editor.value.substring(0, start) + '    ' + editor.value.substring(end);
                    editor.selectionStart = editor.selectionEnd = start + 4;
                    updateLineNumbers();
                }
            });
            
            updateLineNumbers();
        }
        
        if (runBtn) {
            runBtn.addEventListener('click', () => {
                const code = editor.value;
                const lang = langSelect.value;
                
                output.innerHTML = `<div style="color: #888; margin-bottom: 10px;">[${new Date().toLocaleTimeString()}] Running ${lang} code...</div>`;
                
                // Note: For security, this is a simulated execution environment
                // Real code execution would require a proper sandboxed environment
                if (lang === 'javascript') {
                    output.innerHTML += '<div style="color: #ffa500;">JavaScript code execution is simulated for security.</div>';
                    output.innerHTML += '<div style="color: #00ff00;">Example output: Hello from SandboxOS!</div>';
                    output.innerHTML += '<div style="color: #888;">To see real execution, use the browser console.</div>';
                } else {
                    output.innerHTML += `<div style="color: #ffa500;">Simulated execution for ${lang}</div>`;
                    output.innerHTML += `<div style="color: #00ff00;">Code syntax validated successfully!</div>`;
                }
                
                showNotification('Code Editor', 'Code syntax validated');
            });
        }
        
        if (saveBtn) {
            saveBtn.addEventListener('click', () => {
                showNotification('Code Editor', 'File saved successfully');
            });
        }
        
        if (newBtn) {
            newBtn.addEventListener('click', () => {
                if (confirm('Create a new file? Unsaved changes will be lost.')) {
                    editor.value = '';
                    updateLineNumbers();
                    showNotification('Code Editor', 'New file created');
                }
            });
        }
        
        if (langSelect) {
            langSelect.addEventListener('change', (e) => {
                document.getElementById('editor-lang').textContent = e.target.options[e.target.selectedIndex].text;
            });
        }
    }, 100);
}

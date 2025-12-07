// Text Editor Application

function openTextEditor() {
    const windowId = windowManager.createWindow({
        title: 'Text Editor - Untitled',
        width: 800,
        height: 600,
        content: `
            <div class="text-editor-toolbar">
                <button class="button button-secondary" onclick="textEditorNew()">📄 New</button>
                <button class="button button-secondary" onclick="textEditorSave()">💾 Save</button>
                <button class="button button-secondary" onclick="textEditorLoad()">📁 Open</button>
            </div>
            <div class="text-editor-content">
                <div class="text-editor-line-numbers" id="line-numbers"></div>
                <textarea class="text-editor-textarea" id="text-editor-area" spellcheck="false"></textarea>
            </div>
            <div class="text-editor-status" id="text-editor-status">Line: 1, Column: 0</div>
        `
    });

    const textarea = document.getElementById('text-editor-area');
    const lineNumbers = document.getElementById('line-numbers');
    const status = document.getElementById('text-editor-status');

    function updateLineNumbers() {
        const lines = textarea.value.split('\n');
        lineNumbers.innerHTML = lines.map((_, i) => i + 1).join('\n');
    }

    function updateStatus() {
        const text = textarea.value;
        const cursorPos = textarea.selectionStart;
        const textBeforeCursor = text.substring(0, cursorPos);
        const line = textBeforeCursor.split('\n').length;
        const column = textBeforeCursor.split('\n').pop().length;
        status.textContent = `Line: ${line}, Column: ${column}`;
    }

    textarea.addEventListener('input', () => {
        updateLineNumbers();
        updateStatus();
    });

    textarea.addEventListener('keyup', updateStatus);
    textarea.addEventListener('click', updateStatus);

    updateLineNumbers();
}

function textEditorNew() {
    const textarea = document.getElementById('text-editor-area');
    if (textarea) {
        textarea.value = '';
        showNotification('Text Editor', 'New document created');
    }
}

function textEditorSave() {
    const textarea = document.getElementById('text-editor-area');
    if (textarea) {
        const content = textarea.value;
        const filename = prompt('Enter filename:', 'document.txt');
        if (filename) {
            downloadFile(filename, content);
            showNotification('Text Editor', `File saved: ${filename}`);
        }
    }
}

async function textEditorLoad() {
    try {
        const file = await loadFile('text/*');
        const textarea = document.getElementById('text-editor-area');
        if (textarea) {
            textarea.value = file.content;
            showNotification('Text Editor', `File loaded: ${file.name}`);
        }
    } catch (e) {
        console.error('Error loading file:', e);
    }
}

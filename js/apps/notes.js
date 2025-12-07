function openNotes() {
    windowManager.createWindow({
        title: 'Notes',
        width: 800,
        height: 600,
        content: `
            <div style="display:flex; height:100%;">
                <div style="width:200px; padding:10px; border-right:1px solid #ddd;">
                    <button class="button" style="width:100%; margin-bottom:10px;">+ New Note</button>
                    <div class="file-item">Meeting Notes</div>
                    <div class="file-item">Shopping List</div>
                    <div class="file-item">Ideas</div>
                </div>
                <div style="flex:1; padding:20px;">
                    <input type="text" placeholder="Untitled Note" style="width:100%; font-size:24px; font-weight:bold; margin-bottom:20px;">
                    <textarea style="width:100%; height:calc(100% - 80px); border:none; outline:none; font-size:14px;" placeholder="Start typing..."></textarea>
                </div>
            </div>
        `
    });
}

function openPhotoViewer() {
    windowManager.createWindow({
        title: 'Photos',
        width: 900,
        height: 700,
        content: `
            <div style="padding:10px; border-bottom:1px solid #ddd;">
                <button class="button button-secondary">📁 Open</button>
                <button class="button button-secondary">🔄 Rotate</button>
                <button class="button button-secondary">↔️ Flip</button>
            </div>
            <div style="height:calc(100% - 60px); display:flex; align-items:center; justify-content:center; font-size:120px;">📷<br><div style="font-size:16px; opacity:0.7;">No image loaded</div></div>
        `
    });
}

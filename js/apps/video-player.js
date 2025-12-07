function openVideoPlayer() {
    windowManager.createWindow({
        title: 'Video Player',
        width: 800,
        height: 600,
        content: `
            <div style="height:450px; background:#000; display:flex; align-items:center; justify-content:center; font-size:150px;">🎬</div>
            <div style="padding:20px; text-align:center;">
                <button class="button">📁 Open Video</button>
            </div>
        `
    });
}

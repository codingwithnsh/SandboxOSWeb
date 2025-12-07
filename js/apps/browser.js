function openBrowser() {
    windowManager.createWindow({
        title: 'Browser',
        width: 1000,
        height: 700,
        content: `
            <div style="padding:20px; text-align:center;">
                <h2>🌐 Web Browser</h2>
                <input type="text" placeholder="Enter URL..." style="width:80%; padding:12px; margin:20px; font-size:16px;">
                <button class="button">Go</button>
                <p style="opacity:0.7; margin-top:30px;">Note: For security reasons, external websites cannot be embedded in this demo.</p>
            </div>
        `
    });
}

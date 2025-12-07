function openTimeMachine() {
    windowManager.createWindow({
        title: 'Time Machine',
        width: 700,
        height: 600,
        content: `
            <div style="padding:30px; text-align:center;">
                <h1>⏰ Time Machine</h1>
                <p style="margin:30px 0;">Automated backup and restore system</p>
                <div style="margin:40px 0;">
                    <h3>Latest Backup</h3>
                    <p>${new Date().toLocaleString()}</p>
                </div>
                <button class="button" style="padding:15px 30px; font-size:16px;">Backup Now</button>
                <button class="button button-secondary" style="padding:15px 30px; font-size:16px; margin-left:10px;">Restore</button>
                <div style="margin-top:40px;">
                    <h4>Backup History</h4>
                    <div style="text-align:left; max-width:400px; margin:20px auto;">
                        <div style="padding:10px; border-bottom:1px solid #ddd;">Today, 10:30 AM - 2.3 GB</div>
                        <div style="padding:10px; border-bottom:1px solid #ddd;">Yesterday, 10:30 AM - 2.2 GB</div>
                        <div style="padding:10px; border-bottom:1px solid #ddd;">Dec 5, 10:30 AM - 2.1 GB</div>
                    </div>
                </div>
            </div>
        `
    });
}

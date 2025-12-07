function openEmailClient() {
    windowManager.createWindow({
        title: 'Mail',
        width: 900,
        height: 600,
        content: `
            <div class="email-layout">
                <div class="email-sidebar">
                    <h3>📧 Mailboxes</h3>
                    <div class="file-item">📥 Inbox (3)</div>
                    <div class="file-item">📤 Sent</div>
                    <div class="file-item">📝 Drafts</div>
                    <div class="file-item">🗑️ Trash</div>
                    <button class="button" style="margin-top:20px;">✏️ Compose</button>
                </div>
                <div class="email-list">
                    <div class="email-item">
                        <strong>Team Meeting</strong><br>
                        <small>Sarah Johnson - Let's discuss...</small>
                    </div>
                    <div class="email-item">
                        <strong>System Update</strong><br>
                        <small>IT - System maintenance...</small>
                    </div>
                </div>
                <div class="email-content">
                    <p style="text-align:center; opacity:0.7; padding:40px;">Select an email to read</p>
                </div>
            </div>
        `
    });
}

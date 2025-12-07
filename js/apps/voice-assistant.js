function openVoiceAssistant() {
    windowManager.createWindow({
        title: 'Voice Assistant',
        width: 400,
        height: 500,
        content: `
            <div style="padding:30px; text-align:center;">
                <div style="font-size:100px; margin:40px 0;">🎤</div>
                <h2>Voice Assistant</h2>
                <p style="opacity:0.7; margin:20px 0;">Click the microphone to start</p>
                <button class="button" style="padding:20px 40px; font-size:18px; border-radius:50px; margin:30px 0;" onclick="startVoiceRecognition()">🎤 Start Listening</button>
                <div id="voice-result" style="margin-top:30px; min-height:60px; padding:20px; background:rgba(0,122,255,0.1); border-radius:8px;"></div>
            </div>
        `
    });
}

function startVoiceRecognition() {
    const result = document.getElementById('voice-result');
    if (result) {
        result.innerHTML = '<p style="opacity:0.7;">Listening...</p>';
        setTimeout(() => {
            result.innerHTML = '<p>Voice recognition is not available in this demo environment.</p>';
        }, 2000);
    }
}

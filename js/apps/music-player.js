function openMusicPlayer() {
    windowManager.createWindow({
        title: 'Music Player',
        width: 500,
        height: 600,
        content: `
            <div class="music-player-cover">🎵</div>
            <div class="music-player-info">
                <h3>No song playing</h3>
                <p>Select a song to play</p>
            </div>
            <div class="music-player-controls">
                <button class="music-control-button">⏮️</button>
                <button class="music-control-button">▶️</button>
                <button class="music-control-button">⏸️</button>
                <button class="music-control-button">⏹️</button>
                <button class="music-control-button">⏭️</button>
            </div>
            <div style="padding:20px;">
                <button class="button">📁 Open Music File</button>
            </div>
        `
    });
}

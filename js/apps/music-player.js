function openMusicPlayer() {
    const windowId = windowManager.createWindow({
        title: '🎵 Music Player',
        width: 600,
        height: 700,
        content: `
            <div style="display: flex; flex-direction: column; height: 100%;">
                <div style="flex: 1; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px; color: white;">
                    <div class="music-player-cover" style="width: 200px; height: 200px; background: rgba(255,255,255,0.2); border-radius: 20px; display: flex; align-items: center; justify-content: center; font-size: 80px; margin-bottom: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
                        🎵
                    </div>
                    <div class="music-player-info" style="text-align: center;">
                        <h2 id="music-title" style="margin: 0 0 10px 0; font-size: 24px;">Chill Vibes</h2>
                        <p id="music-artist" style="margin: 0; opacity: 0.9; font-size: 16px;">SandboxOS Music</p>
                    </div>
                    <div style="width: 100%; margin-top: 30px;">
                        <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 8px;">
                            <span id="current-time">0:00</span>
                            <span id="total-time">3:45</span>
                        </div>
                        <div style="width: 100%; height: 6px; background: rgba(255,255,255,0.3); border-radius: 3px; cursor: pointer;" id="progress-bar">
                            <div style="width: 0%; height: 100%; background: white; border-radius: 3px; transition: width 0.3s;" id="progress"></div>
                        </div>
                    </div>
                </div>
                <div style="padding: 20px; background: rgba(0,0,0,0.02);">
                    <div class="music-player-controls" style="display: flex; justify-content: center; align-items: center; gap: 15px; margin-bottom: 20px;">
                        <button class="music-control-button" id="shuffle-btn" style="padding: 12px; background: transparent; border: none; font-size: 24px; cursor: pointer; opacity: 0.6; transition: all 0.2s;">🔀</button>
                        <button class="music-control-button" id="prev-btn" style="padding: 12px; background: transparent; border: none; font-size: 32px; cursor: pointer; transition: all 0.2s;">⏮️</button>
                        <button class="music-control-button" id="play-btn" style="padding: 15px; background: #007AFF; border: none; font-size: 36px; cursor: pointer; border-radius: 50%; width: 70px; height: 70px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0,122,255,0.4); transition: all 0.2s;">▶️</button>
                        <button class="music-control-button" id="next-btn" style="padding: 12px; background: transparent; border: none; font-size: 32px; cursor: pointer; transition: all 0.2s;">⏭️</button>
                        <button class="music-control-button" id="repeat-btn" style="padding: 12px; background: transparent; border: none; font-size: 24px; cursor: pointer; opacity: 0.6; transition: all 0.2s;">🔁</button>
                    </div>
                    <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 20px;">
                        <span style="font-size: 20px;">🔊</span>
                        <input type="range" id="volume-slider" min="0" max="100" value="70" style="flex: 1; cursor: pointer;">
                        <span id="volume-value" style="font-size: 14px; min-width: 40px;">70%</span>
                    </div>
                    <div>
                        <h4 style="margin: 0 0 10px 0;">📚 Playlist</h4>
                        <div id="playlist" style="max-height: 200px; overflow-y: auto;">
                            <div class="playlist-item active" data-song="0" style="padding: 12px; background: rgba(0,122,255,0.1); border-radius: 8px; margin-bottom: 8px; cursor: pointer; display: flex; align-items: center; gap: 12px;">
                                <span style="font-size: 20px;">🎵</span>
                                <div style="flex: 1;">
                                    <div style="font-weight: 500;">Chill Vibes</div>
                                    <div style="font-size: 12px; opacity: 0.7;">SandboxOS Music</div>
                                </div>
                                <span style="font-size: 12px; opacity: 0.7;">3:45</span>
                            </div>
                            <div class="playlist-item" data-song="1" style="padding: 12px; border-radius: 8px; margin-bottom: 8px; cursor: pointer; display: flex; align-items: center; gap: 12px;">
                                <span style="font-size: 20px;">🎸</span>
                                <div style="flex: 1;">
                                    <div style="font-weight: 500;">Electronic Dreams</div>
                                    <div style="font-size: 12px; opacity: 0.7;">Virtual Artist</div>
                                </div>
                                <span style="font-size: 12px; opacity: 0.7;">4:12</span>
                            </div>
                            <div class="playlist-item" data-song="2" style="padding: 12px; border-radius: 8px; margin-bottom: 8px; cursor: pointer; display: flex; align-items: center; gap: 12px;">
                                <span style="font-size: 20px;">🎹</span>
                                <div style="flex: 1;">
                                    <div style="font-weight: 500;">Ambient Flow</div>
                                    <div style="font-size: 12px; opacity: 0.7;">Digital Sounds</div>
                                </div>
                                <span style="font-size: 12px; opacity: 0.7;">5:23</span>
                            </div>
                            <div class="playlist-item" data-song="3" style="padding: 12px; border-radius: 8px; margin-bottom: 8px; cursor: pointer; display: flex; align-items: center; gap: 12px;">
                                <span style="font-size: 20px;">🎼</span>
                                <div style="flex: 1;">
                                    <div style="font-weight: 500;">Synth Wave</div>
                                    <div style="font-size: 12px; opacity: 0.7;">Retro Future</div>
                                </div>
                                <span style="font-size: 12px; opacity: 0.7;">3:58</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    });
    
    // Add interactivity
    setTimeout(() => {
        let isPlaying = false;
        let currentProgress = 0;
        let progressInterval = null;
        
        const playBtn = document.getElementById('play-btn');
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        const shuffleBtn = document.getElementById('shuffle-btn');
        const repeatBtn = document.getElementById('repeat-btn');
        const volumeSlider = document.getElementById('volume-slider');
        const volumeValue = document.getElementById('volume-value');
        const progressBar = document.getElementById('progress-bar');
        const progress = document.getElementById('progress');
        const currentTime = document.getElementById('current-time');
        
        if (playBtn) {
            playBtn.addEventListener('click', () => {
                isPlaying = !isPlaying;
                playBtn.textContent = isPlaying ? '⏸️' : '▶️';
                
                if (isPlaying) {
                    showNotification('Music Player', 'Playing music...');
                    progressInterval = setInterval(() => {
                        currentProgress += 0.5;
                        if (currentProgress > 100) currentProgress = 0;
                        progress.style.width = currentProgress + '%';
                        const minutes = Math.floor((currentProgress * 3.75) / 60);
                        const seconds = Math.floor((currentProgress * 3.75) % 60);
                        currentTime.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
                    }, 500);
                } else {
                    showNotification('Music Player', 'Paused');
                    if (progressInterval) clearInterval(progressInterval);
                }
            });
        }
        
        if (prevBtn) prevBtn.addEventListener('click', () => showNotification('Music Player', 'Previous track'));
        if (nextBtn) nextBtn.addEventListener('click', () => showNotification('Music Player', 'Next track'));
        
        if (shuffleBtn) {
            shuffleBtn.addEventListener('click', function() {
                this.style.opacity = this.style.opacity === '1' ? '0.6' : '1';
                showNotification('Music Player', 'Shuffle ' + (this.style.opacity === '1' ? 'enabled' : 'disabled'));
            });
        }
        
        if (repeatBtn) {
            repeatBtn.addEventListener('click', function() {
                this.style.opacity = this.style.opacity === '1' ? '0.6' : '1';
                showNotification('Music Player', 'Repeat ' + (this.style.opacity === '1' ? 'enabled' : 'disabled'));
            });
        }
        
        if (volumeSlider && volumeValue) {
            volumeSlider.addEventListener('input', (e) => {
                volumeValue.textContent = e.target.value + '%';
            });
        }
        
        // Playlist items
        document.querySelectorAll('.playlist-item').forEach(item => {
            item.addEventListener('click', function() {
                document.querySelectorAll('.playlist-item').forEach(i => {
                    i.style.background = 'transparent';
                    i.classList.remove('active');
                });
                this.style.background = 'rgba(0,122,255,0.1)';
                this.classList.add('active');
                
                const songTitle = this.querySelector('div > div').textContent;
                document.getElementById('music-title').textContent = songTitle;
                showNotification('Music Player', `Now playing: ${songTitle}`);
            });
        });
    }, 100);
}

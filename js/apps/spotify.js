// Spotify Music Streaming Application for SandboxOS Web

function openSpotify() {
    const windowId = windowManager.createWindow({
        title: 'Spotify',
        width: 1200,
        height: 800,
        content: `
            <div style="display: flex; height: 100%; background: linear-gradient(180deg, #1DB954 0%, #121212 15%);">
                <!-- Sidebar -->
                <div style="width: 230px; background: #000; padding: 24px 8px; display: flex; flex-direction: column;">
                    <div style="margin-bottom: 24px;">
                        <div style="font-size: 24px; font-weight: bold; color: #fff; margin-bottom: 20px;">
                            🎵 Spotify
                        </div>
                        <div class="spotify-nav-item active" data-view="home">
                            <span style="margin-right: 12px;">🏠</span>Home
                        </div>
                        <div class="spotify-nav-item" data-view="search">
                            <span style="margin-right: 12px;">🔍</span>Search
                        </div>
                        <div class="spotify-nav-item" data-view="library">
                            <span style="margin-right: 12px;">📚</span>Your Library
                        </div>
                    </div>
                    
                    <div style="margin-bottom: 16px;">
                        <div class="spotify-nav-item" data-view="create-playlist">
                            <span style="margin-right: 12px;">➕</span>Create Playlist
                        </div>
                        <div class="spotify-nav-item" data-view="liked">
                            <span style="margin-right: 12px;">💚</span>Liked Songs
                        </div>
                    </div>
                    
                    <div style="border-top: 1px solid #282828; padding-top: 16px; margin-top: auto;">
                        <div style="font-size: 11px; color: #b3b3b3; margin-bottom: 8px;">PLAYLISTS</div>
                        <div class="spotify-playlist-item">Daily Mix 1</div>
                        <div class="spotify-playlist-item">Discover Weekly</div>
                        <div class="spotify-playlist-item">Release Radar</div>
                        <div class="spotify-playlist-item">Your Top Songs 2024</div>
                        <div class="spotify-playlist-item">Chill Vibes</div>
                        <div class="spotify-playlist-item">Workout Mix</div>
                    </div>
                </div>
                
                <!-- Main Content -->
                <div style="flex: 1; overflow-y: auto; padding: 24px;" id="spotify-main-content">
                    <div id="spotify-home-view">
                        <h2 style="color: #fff; font-size: 32px; margin-bottom: 24px;">Good ${getTimeOfDay()}</h2>
                        
                        <!-- Quick Access -->
                        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 32px;">
                            ${generateQuickAccessItems()}
                        </div>
                        
                        <!-- Recommended -->
                        <h3 style="color: #fff; font-size: 24px; margin-bottom: 16px;">Made for you</h3>
                        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 24px; margin-bottom: 32px;">
                            ${generateSpotifyCards('recommended')}
                        </div>
                        
                        <!-- Recently Played -->
                        <h3 style="color: #fff; font-size: 24px; margin-bottom: 16px;">Recently played</h3>
                        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 24px; margin-bottom: 32px;">
                            ${generateSpotifyCards('recent')}
                        </div>
                        
                        <!-- Popular Playlists -->
                        <h3 style="color: #fff; font-size: 24px; margin-bottom: 16px;">Popular playlists</h3>
                        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 24px;">
                            ${generateSpotifyCards('popular')}
                        </div>
                    </div>
                    
                    <div id="spotify-search-view" style="display: none;">
                        <h2 style="color: #fff; font-size: 32px; margin-bottom: 24px;">Search</h2>
                        <input type="text" id="spotify-search-input" placeholder="What do you want to listen to?" 
                               style="width: 100%; max-width: 400px; padding: 12px 16px; border-radius: 24px; border: none; font-size: 14px; margin-bottom: 32px;">
                        
                        <h3 style="color: #fff; font-size: 24px; margin-bottom: 16px;">Browse all</h3>
                        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 24px;">
                            ${generateGenreCards()}
                        </div>
                    </div>
                    
                    <div id="spotify-library-view" style="display: none;">
                        <h2 style="color: #fff; font-size: 32px; margin-bottom: 24px;">Your Library</h2>
                        <div style="display: flex; gap: 12px; margin-bottom: 24px;">
                            <button class="spotify-filter-btn active">Playlists</button>
                            <button class="spotify-filter-btn">Artists</button>
                            <button class="spotify-filter-btn">Albums</button>
                            <button class="spotify-filter-btn">Podcasts</button>
                        </div>
                        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 24px;">
                            ${generateSpotifyCards('library')}
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Player Bar -->
            <div style="position: absolute; bottom: 0; left: 0; right: 0; height: 90px; background: #181818; border-top: 1px solid #282828; display: flex; align-items: center; padding: 0 16px; justify-content: space-between;">
                <!-- Now Playing -->
                <div style="flex: 0.3; display: flex; align-items: center; gap: 14px;">
                    <div id="spotify-current-track-cover" style="width: 56px; height: 56px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 24px;">🎵</div>
                    <div style="flex: 1; min-width: 0;">
                        <div id="spotify-current-track" style="color: #fff; font-size: 14px; font-weight: 500; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">Not Playing</div>
                        <div id="spotify-current-artist" style="color: #b3b3b3; font-size: 12px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">Select a song</div>
                    </div>
                    <button class="spotify-icon-btn" id="spotify-like-btn" title="Like">💚</button>
                </div>
                
                <!-- Player Controls -->
                <div style="flex: 0.4; display: flex; flex-direction: column; align-items: center; gap: 8px; max-width: 722px;">
                    <div style="display: flex; align-items: center; gap: 16px;">
                        <button class="spotify-icon-btn" id="spotify-shuffle" title="Shuffle">🔀</button>
                        <button class="spotify-icon-btn" id="spotify-prev" title="Previous">⏮️</button>
                        <button class="spotify-play-btn" id="spotify-play-pause" title="Play">▶️</button>
                        <button class="spotify-icon-btn" id="spotify-next" title="Next">⏭️</button>
                        <button class="spotify-icon-btn" id="spotify-repeat" title="Repeat">🔁</button>
                    </div>
                    <div style="display: flex; align-items: center; gap: 8px; width: 100%;">
                        <span id="spotify-current-time" style="color: #b3b3b3; font-size: 11px; min-width: 40px; text-align: right;">0:00</span>
                        <div style="flex: 1; height: 4px; background: #4d4d4d; border-radius: 2px; position: relative; cursor: pointer;" id="spotify-progress-bar">
                            <div id="spotify-progress-fill" style="height: 100%; background: #1DB954; border-radius: 2px; width: 0%;"></div>
                            <div id="spotify-progress-thumb" style="position: absolute; top: 50%; right: -6px; transform: translateY(-50%); width: 12px; height: 12px; background: #fff; border-radius: 50%; opacity: 0; transition: opacity 0.2s;"></div>
                        </div>
                        <span id="spotify-total-time" style="color: #b3b3b3; font-size: 11px; min-width: 40px;">0:00</span>
                    </div>
                </div>
                
                <!-- Volume & Options -->
                <div style="flex: 0.3; display: flex; align-items: center; justify-content: flex-end; gap: 8px;">
                    <button class="spotify-icon-btn" title="Queue">📋</button>
                    <button class="spotify-icon-btn" title="Connect to device">💻</button>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <button class="spotify-icon-btn" id="spotify-mute" title="Mute">🔊</button>
                        <div style="width: 93px; height: 4px; background: #4d4d4d; border-radius: 2px; position: relative; cursor: pointer;" id="spotify-volume-bar">
                            <div id="spotify-volume-fill" style="height: 100%; background: #fff; border-radius: 2px; width: 70%;"></div>
                        </div>
                    </div>
                    <button class="spotify-icon-btn" title="Full Screen">⛶</button>
                </div>
            </div>
            
            <style>
                .spotify-nav-item {
                    padding: 8px 16px;
                    color: #b3b3b3;
                    font-size: 14px;
                    font-weight: 600;
                    cursor: pointer;
                    border-radius: 4px;
                    margin-bottom: 8px;
                    transition: color 0.2s;
                    display: flex;
                    align-items: center;
                }
                .spotify-nav-item:hover {
                    color: #fff;
                }
                .spotify-nav-item.active {
                    color: #fff;
                    background: #282828;
                }
                .spotify-playlist-item {
                    padding: 8px 16px;
                    color: #b3b3b3;
                    font-size: 14px;
                    cursor: pointer;
                    margin-bottom: 4px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                .spotify-playlist-item:hover {
                    color: #fff;
                }
                .spotify-card {
                    background: #181818;
                    padding: 16px;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: background 0.3s;
                }
                .spotify-card:hover {
                    background: #282828;
                }
                .spotify-card-cover {
                    width: 100%;
                    aspect-ratio: 1;
                    border-radius: 8px;
                    margin-bottom: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 48px;
                }
                .spotify-card-title {
                    color: #fff;
                    font-size: 14px;
                    font-weight: 600;
                    margin-bottom: 4px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                .spotify-card-subtitle {
                    color: #b3b3b3;
                    font-size: 12px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                }
                .spotify-icon-btn {
                    background: none;
                    border: none;
                    color: #b3b3b3;
                    cursor: pointer;
                    font-size: 16px;
                    padding: 8px;
                    transition: color 0.2s;
                }
                .spotify-icon-btn:hover {
                    color: #fff;
                }
                .spotify-play-btn {
                    background: #fff;
                    border: none;
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    font-size: 12px;
                    transition: transform 0.2s;
                }
                .spotify-play-btn:hover {
                    transform: scale(1.06);
                }
                .spotify-filter-btn {
                    padding: 8px 16px;
                    background: #232323;
                    border: none;
                    border-radius: 20px;
                    color: #fff;
                    font-size: 13px;
                    cursor: pointer;
                    transition: background 0.2s;
                }
                .spotify-filter-btn:hover {
                    background: #2a2a2a;
                }
                .spotify-filter-btn.active {
                    background: #1DB954;
                }
                #spotify-progress-bar:hover #spotify-progress-thumb {
                    opacity: 1;
                }
            </style>
        `
    });
    
    // Initialize Spotify player
    setTimeout(() => {
        initSpotifyPlayer(windowId);
    }, 100);
}

function getTimeOfDay() {
    const hour = new Date().getHours();
    if (hour < 12) return 'morning';
    if (hour < 18) return 'afternoon';
    return 'evening';
}

function generateQuickAccessItems() {
    const items = [
        { title: 'Liked Songs', subtitle: '120 liked songs', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', icon: '💚' },
        { title: 'Daily Mix 1', subtitle: 'The Weeknd, Drake, and more', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', icon: '🎵' },
        { title: 'Discover Weekly', subtitle: 'Your weekly mixtape of fresh music', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', icon: '🔍' },
        { title: 'Release Radar', subtitle: 'Catch all the latest music', gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', icon: '🎧' },
        { title: 'Your Top Songs 2024', subtitle: 'Your most played songs this year', gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', icon: '⭐' },
        { title: 'Chill Vibes', subtitle: 'Relax and unwind', gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)', icon: '🌙' }
    ];
    
    return items.map(item => `
        <div class="spotify-quick-item" data-title="${item.title}" style="background: #282828; border-radius: 6px; display: flex; align-items: center; gap: 12px; cursor: pointer; overflow: hidden; transition: background 0.3s;">
            <div style="width: 80px; height: 80px; background: ${item.gradient}; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-size: 32px;">${item.icon}</div>
            <div style="flex: 1; min-width: 0; padding-right: 12px;">
                <div style="color: #fff; font-size: 16px; font-weight: 600; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${item.title}</div>
            </div>
        </div>
    `).join('');
}

function generateSpotifyCards(type) {
    const playlists = {
        recommended: [
            { title: 'Daily Mix 1', artist: 'Made for you', color: '#8E44AD', icon: '🎵' },
            { title: 'Discover Weekly', artist: 'Your weekly mixtape', color: '#3498DB', icon: '🔍' },
            { title: 'Release Radar', artist: 'New releases for you', color: '#1ABC9C', icon: '🎧' },
            { title: 'Your Top Songs 2024', artist: 'Your favorites', color: '#E74C3C', icon: '⭐' },
            { title: 'Peaceful Piano', artist: 'Relax and indulge', color: '#95A5A6', icon: '🎹' },
            { title: 'RapCaviar', artist: 'New music from Kendrick', color: '#E67E22', icon: '🎤' }
        ],
        recent: [
            { title: 'Chill Hits', artist: 'Kick back to the best', color: '#9B59B6', icon: '😌' },
            { title: 'Rock Classics', artist: 'Rock legends & epic', color: '#34495E', icon: '🎸' },
            { title: 'Mood Booster', artist: 'Get happy with these', color: '#F39C12', icon: '☀️' },
            { title: 'Deep Focus', artist: 'Keep calm and focus', color: '#16A085', icon: '🧘' },
            { title: 'Jazz Vibes', artist: 'The original chill', color: '#C0392B', icon: '🎺' },
            { title: 'Workout Motivation', artist: 'Pump up the energy', color: '#D35400', icon: '💪' }
        ],
        popular: [
            { title: 'Today\'s Top Hits', artist: 'Ed Sheeran is on top', color: '#2ECC71', icon: '🔥' },
            { title: 'All Out 2010s', artist: 'The biggest songs', color: '#3498DB', icon: '🎉' },
            { title: 'Viva Latino', artist: 'Today\'s top Latin hits', color: '#E74C3C', icon: '💃' },
            { title: 'Peaceful Piano', artist: 'Relax and indulge', color: '#95A5A6', icon: '🎹' },
            { title: 'Feelin\' Good', artist: 'Feel good with this', color: '#F1C40F', icon: '😊' },
            { title: 'Hot Country', artist: 'Today\'s top country', color: '#D68910', icon: '🤠' }
        ],
        library: [
            { title: 'My Playlist #1', artist: '24 songs', color: '#8E44AD', icon: '📁' },
            { title: 'Summer Vibes', artist: '48 songs', color: '#E74C3C', icon: '☀️' },
            { title: 'Study Music', artist: '32 songs', color: '#3498DB', icon: '📚' },
            { title: 'Party Mix', artist: '56 songs', color: '#1ABC9C', icon: '🎉' },
            { title: 'Road Trip', artist: '40 songs', color: '#E67E22', icon: '🚗' },
            { title: 'Late Night', artist: '28 songs', color: '#34495E', icon: '🌙' }
        ]
    };
    
    return (playlists[type] || playlists.recommended).map(item => `
        <div class="spotify-card" data-title="${item.title}">
            <div class="spotify-card-cover" style="background: ${item.color};">${item.icon}</div>
            <div class="spotify-card-title">${item.title}</div>
            <div class="spotify-card-subtitle">${item.artist}</div>
        </div>
    `).join('');
}

function generateGenreCards() {
    const genres = [
        { name: 'Pop', color: '#E13300', icon: '🎤' },
        { name: 'Hip-Hop', color: '#AF2896', icon: '🎧' },
        { name: 'Rock', color: '#8D67AB', icon: '🎸' },
        { name: 'Latin', color: '#E8115B', icon: '💃' },
        { name: 'R&B', color: '#BA5D07', icon: '🎵' },
        { name: 'Country', color: '#8D67AB', icon: '🤠' },
        { name: 'Electronic', color: '#1E3264', icon: '🎹' },
        { name: 'Jazz', color: '#477D95', icon: '🎺' },
        { name: 'Classical', color: '#8D67AB', icon: '🎻' },
        { name: 'Metal', color: '#503750', icon: '🤘' },
        { name: 'Indie', color: '#E1118C', icon: '🎨' },
        { name: 'Soul', color: '#DC148C', icon: '💚' }
    ];
    
    return genres.map(genre => `
        <div style="background: ${genre.color}; padding: 16px; border-radius: 8px; cursor: pointer; height: 180px; position: relative; overflow: hidden; transition: transform 0.2s;">
            <div style="color: #fff; font-size: 24px; font-weight: 700;">${genre.name}</div>
            <div style="position: absolute; right: -8px; bottom: -8px; font-size: 64px; opacity: 0.8; transform: rotate(25deg);">${genre.icon}</div>
        </div>
    `).join('');
}

function initSpotifyPlayer(windowId) {
    const songs = [
        { title: 'Blinding Lights', artist: 'The Weeknd', duration: 200 },
        { title: 'Shape of You', artist: 'Ed Sheeran', duration: 233 },
        { title: 'Someone Like You', artist: 'Adele', duration: 285 },
        { title: 'Levitating', artist: 'Dua Lipa', duration: 203 },
        { title: 'Watermelon Sugar', artist: 'Harry Styles', duration: 174 },
        { title: 'Good 4 U', artist: 'Olivia Rodrigo', duration: 178 }
    ];
    
    let currentSongIndex = 0;
    let isPlaying = false;
    let currentTime = 0;
    let duration = songs[currentSongIndex].duration;
    let playInterval = null;
    let isShuffle = false;
    let repeatMode = 0; // 0: off, 1: repeat all, 2: repeat one
    
    // Navigation
    document.querySelectorAll('.spotify-nav-item').forEach(item => {
        item.addEventListener('click', function() {
            document.querySelectorAll('.spotify-nav-item').forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            
            const view = this.dataset.view;
            document.getElementById('spotify-home-view').style.display = 'none';
            document.getElementById('spotify-search-view').style.display = 'none';
            document.getElementById('spotify-library-view').style.display = 'none';
            
            if (view === 'home') {
                document.getElementById('spotify-home-view').style.display = 'block';
            } else if (view === 'search') {
                document.getElementById('spotify-search-view').style.display = 'block';
            } else if (view === 'library') {
                document.getElementById('spotify-library-view').style.display = 'block';
            }
        });
    });
    
    // Play song on card click
    document.querySelectorAll('.spotify-card, .spotify-quick-item').forEach(card => {
        card.addEventListener('click', function() {
            const title = this.dataset.title;
            currentSongIndex = Math.floor(Math.random() * songs.length);
            loadSong();
            play();
            showNotification('Spotify', `Playing: ${title}`);
        });
    });
    
    // Play/Pause
    const playPauseBtn = document.getElementById('spotify-play-pause');
    playPauseBtn.addEventListener('click', () => {
        if (isPlaying) {
            pause();
        } else {
            play();
        }
    });
    
    // Previous
    document.getElementById('spotify-prev').addEventListener('click', () => {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        loadSong();
        if (isPlaying) play();
    });
    
    // Next
    document.getElementById('spotify-next').addEventListener('click', () => {
        next();
    });
    
    // Shuffle
    document.getElementById('spotify-shuffle').addEventListener('click', function() {
        isShuffle = !isShuffle;
        this.style.color = isShuffle ? '#1DB954' : '#b3b3b3';
        showNotification('Spotify', `Shuffle ${isShuffle ? 'on' : 'off'}`);
    });
    
    // Repeat
    document.getElementById('spotify-repeat').addEventListener('click', function() {
        repeatMode = (repeatMode + 1) % 3;
        const modes = ['off', 'all', 'one'];
        this.style.color = repeatMode > 0 ? '#1DB954' : '#b3b3b3';
        this.textContent = repeatMode === 2 ? '🔂' : '🔁';
        showNotification('Spotify', `Repeat ${modes[repeatMode]}`);
    });
    
    // Progress bar
    const progressBar = document.getElementById('spotify-progress-bar');
    const progressFill = document.getElementById('spotify-progress-fill');
    
    progressBar.addEventListener('click', (e) => {
        const rect = progressBar.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        currentTime = percent * duration;
        updateProgress();
    });
    
    // Volume
    const volumeBar = document.getElementById('spotify-volume-bar');
    const volumeFill = document.getElementById('spotify-volume-fill');
    let volume = 0.7;
    
    volumeBar.addEventListener('click', (e) => {
        const rect = volumeBar.getBoundingClientRect();
        volume = (e.clientX - rect.left) / rect.width;
        volumeFill.style.width = (volume * 100) + '%';
    });
    
    document.getElementById('spotify-mute').addEventListener('click', function() {
        if (volume > 0) {
            volume = 0;
            this.textContent = '🔇';
        } else {
            volume = 0.7;
            this.textContent = '🔊';
        }
        volumeFill.style.width = (volume * 100) + '%';
    });
    
    function loadSong() {
        const song = songs[currentSongIndex];
        document.getElementById('spotify-current-track').textContent = song.title;
        document.getElementById('spotify-current-artist').textContent = song.artist;
        currentTime = 0;
        duration = song.duration;
        updateProgress();
    }
    
    function play() {
        isPlaying = true;
        playPauseBtn.textContent = '⏸️';
        playPauseBtn.title = 'Pause';
        
        playInterval = setInterval(() => {
            currentTime += 1;
            if (currentTime >= duration) {
                if (repeatMode === 2) {
                    currentTime = 0;
                } else {
                    next();
                }
            }
            updateProgress();
        }, 1000);
    }
    
    function pause() {
        isPlaying = false;
        playPauseBtn.textContent = '▶️';
        playPauseBtn.title = 'Play';
        if (playInterval) {
            clearInterval(playInterval);
            playInterval = null;
        }
    }
    
    function next() {
        if (isShuffle) {
            currentSongIndex = Math.floor(Math.random() * songs.length);
        } else {
            currentSongIndex = (currentSongIndex + 1) % songs.length;
        }
        loadSong();
        if (isPlaying) play();
    }
    
    function updateProgress() {
        const percent = (currentTime / duration) * 100;
        progressFill.style.width = percent + '%';
        document.getElementById('spotify-current-time').textContent = formatTime(currentTime);
        document.getElementById('spotify-total-time').textContent = formatTime(duration);
    }
    
    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
    
    // Initialize
    loadSong();
}

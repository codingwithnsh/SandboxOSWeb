// YouTube Video Streaming Application for SandboxOS Web

function openYouTube() {
    const windowId = windowManager.createWindow({
        title: 'YouTube',
        width: 1400,
        height: 900,
        content: `
            <div style="display: flex; flex-direction: column; height: 100%; background: #0f0f0f;">
                <!-- Top Navigation -->
                <div style="background: #212121; padding: 8px 16px; display: flex; align-items: center; gap: 16px; border-bottom: 1px solid #303030;">
                    <button class="youtube-icon-btn" id="yt-menu-btn" title="Menu">☰</button>
                    <div style="display: flex; align-items: center; gap: 4px;">
                        <span style="font-size: 24px;">▶️</span>
                        <span style="color: #fff; font-size: 20px; font-weight: 500;">YouTube</span>
                    </div>
                    
                    <div style="flex: 1; max-width: 600px; display: flex; gap: 0; margin: 0 40px;">
                        <input type="text" id="yt-search-input" placeholder="Search" 
                               style="flex: 1; padding: 10px 16px; border: 1px solid #303030; background: #121212; color: #fff; border-radius: 40px 0 0 40px; outline: none; font-size: 14px;">
                        <button class="youtube-search-btn" id="yt-search-btn" title="Search" 
                                style="padding: 0 24px; background: #303030; border: 1px solid #303030; border-left: none; border-radius: 0 40px 40px 0; cursor: pointer;">🔍</button>
                    </div>
                    
                    <div style="margin-left: auto; display: flex; gap: 12px; align-items: center;">
                        <button class="youtube-icon-btn" title="Create">➕</button>
                        <button class="youtube-icon-btn" title="Notifications">🔔</button>
                        <div style="width: 32px; height: 32px; background: #3ea6ff; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #0f0f0f; font-weight: 600; cursor: pointer;">U</div>
                    </div>
                </div>
                
                <!-- Main Content -->
                <div style="display: flex; flex: 1; overflow: hidden;">
                    <!-- Sidebar -->
                    <div id="yt-sidebar" style="width: 240px; background: #212121; overflow-y: auto; padding: 12px 0; border-right: 1px solid #303030;">
                        <div class="yt-nav-section">
                            <div class="yt-nav-item active" data-view="home">
                                <span style="margin-right: 24px;">🏠</span>Home
                            </div>
                            <div class="yt-nav-item" data-view="shorts">
                                <span style="margin-right: 24px;">📱</span>Shorts
                            </div>
                            <div class="yt-nav-item" data-view="subscriptions">
                                <span style="margin-right: 24px;">📺</span>Subscriptions
                            </div>
                        </div>
                        
                        <div class="yt-nav-divider"></div>
                        
                        <div class="yt-nav-section">
                            <div class="yt-nav-item" data-view="library">
                                <span style="margin-right: 24px;">📚</span>Library
                            </div>
                            <div class="yt-nav-item" data-view="history">
                                <span style="margin-right: 24px;">🕐</span>History
                            </div>
                            <div class="yt-nav-item" data-view="watch-later">
                                <span style="margin-right: 24px;">⏰</span>Watch Later
                            </div>
                            <div class="yt-nav-item" data-view="liked">
                                <span style="margin-right: 24px;">👍</span>Liked Videos
                            </div>
                        </div>
                        
                        <div class="yt-nav-divider"></div>
                        
                        <div class="yt-nav-section">
                            <div style="padding: 8px 24px; color: #aaa; font-size: 14px; font-weight: 500;">Subscriptions</div>
                            ${generateSubscriptionItems()}
                        </div>
                        
                        <div class="yt-nav-divider"></div>
                        
                        <div class="yt-nav-section">
                            <div style="padding: 8px 24px; color: #aaa; font-size: 14px; font-weight: 500;">Explore</div>
                            <div class="yt-nav-item" data-view="trending">
                                <span style="margin-right: 24px;">🔥</span>Trending
                            </div>
                            <div class="yt-nav-item" data-view="music">
                                <span style="margin-right: 24px;">🎵</span>Music
                            </div>
                            <div class="yt-nav-item" data-view="gaming">
                                <span style="margin-right: 24px;">🎮</span>Gaming
                            </div>
                            <div class="yt-nav-item" data-view="news">
                                <span style="margin-right: 24px;">📰</span>News
                            </div>
                            <div class="yt-nav-item" data-view="sports">
                                <span style="margin-right: 24px;">⚽</span>Sports
                            </div>
                        </div>
                    </div>
                    
                    <!-- Main Video Area -->
                    <div style="flex: 1; overflow-y: auto; background: #0f0f0f;">
                        <div id="yt-home-view" style="padding: 24px;">
                            <!-- Filter Chips -->
                            <div style="display: flex; gap: 12px; margin-bottom: 24px; overflow-x: auto; padding-bottom: 8px;">
                                ${generateFilterChips()}
                            </div>
                            
                            <!-- Video Grid -->
                            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 24px;">
                                ${generateVideoCards('home')}
                            </div>
                        </div>
                        
                        <div id="yt-video-player" style="display: none;">
                            <!-- Video Player -->
                            <div style="background: #000; aspect-ratio: 16/9; position: relative; display: flex; align-items: center; justify-content: center;">
                                <div id="yt-player-screen" style="width: 100%; height: 100%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; flex-direction: column; align-items: center; justify-content: center; position: relative;">
                                    <div style="font-size: 64px; margin-bottom: 16px;">▶️</div>
                                    <div style="color: #fff; font-size: 18px;">Playing Video</div>
                                    <div id="yt-player-title" style="color: #fff; font-size: 14px; margin-top: 8px; opacity: 0.8;"></div>
                                    
                                    <!-- Player Controls Overlay -->
                                    <div style="position: absolute; bottom: 0; left: 0; right: 0; padding: 16px; background: linear-gradient(transparent, rgba(0,0,0,0.8));">
                                        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                                            <span id="yt-player-current" style="color: #fff; font-size: 12px;">0:00</span>
                                            <div style="flex: 1; height: 4px; background: rgba(255,255,255,0.3); border-radius: 2px; cursor: pointer;" id="yt-player-progress">
                                                <div id="yt-player-progress-fill" style="height: 100%; background: #ff0000; width: 0%; border-radius: 2px;"></div>
                                            </div>
                                            <span id="yt-player-total" style="color: #fff; font-size: 12px;">0:00</span>
                                        </div>
                                        <div style="display: flex; align-items: center; justify-content: space-between;">
                                            <div style="display: flex; gap: 12px;">
                                                <button class="yt-player-btn" id="yt-play-pause">⏸️</button>
                                                <button class="yt-player-btn" id="yt-skip-back">⏮️</button>
                                                <button class="yt-player-btn" id="yt-skip-forward">⏭️</button>
                                                <button class="yt-player-btn" id="yt-volume-btn">🔊</button>
                                            </div>
                                            <div style="display: flex; gap: 12px;">
                                                <button class="yt-player-btn" id="yt-quality">⚙️</button>
                                                <button class="yt-player-btn" id="yt-fullscreen">⛶</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Video Info -->
                            <div style="padding: 20px 24px; max-width: 1280px;">
                                <h1 id="yt-video-title" style="color: #fff; font-size: 20px; font-weight: 500; margin-bottom: 12px;"></h1>
                                
                                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
                                    <div style="display: flex; align-items: center; gap: 12px;">
                                        <div style="width: 40px; height: 40px; background: #3ea6ff; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600;">C</div>
                                        <div>
                                            <div id="yt-channel-name" style="color: #fff; font-size: 16px; font-weight: 500;"></div>
                                            <div id="yt-channel-subs" style="color: #aaa; font-size: 12px;"></div>
                                        </div>
                                        <button style="background: #fff; color: #0f0f0f; border: none; padding: 10px 16px; border-radius: 20px; font-weight: 500; cursor: pointer; margin-left: 12px;">Subscribe</button>
                                    </div>
                                    
                                    <div style="display: flex; gap: 8px;">
                                        <button class="yt-action-btn" id="yt-like-btn">
                                            <span style="margin-right: 8px;">👍</span>
                                            <span id="yt-like-count">0</span>
                                        </button>
                                        <button class="yt-action-btn">
                                            <span style="margin-right: 8px;">💬</span>Share
                                        </button>
                                        <button class="yt-action-btn">
                                            <span style="margin-right: 8px;">📥</span>Download
                                        </button>
                                        <button class="yt-action-btn">⋯</button>
                                    </div>
                                </div>
                                
                                <div style="background: #272727; padding: 12px; border-radius: 12px; color: #fff;">
                                    <div style="display: flex; gap: 8px; margin-bottom: 8px;">
                                        <span id="yt-view-count" style="font-weight: 500;"></span>
                                        <span id="yt-upload-date"></span>
                                    </div>
                                    <div id="yt-video-description" style="font-size: 14px; line-height: 1.6; color: #aaa;"></div>
                                </div>
                                
                                <!-- Comments Section -->
                                <div style="margin-top: 24px;">
                                    <div style="color: #fff; font-size: 20px; font-weight: 500; margin-bottom: 24px;">
                                        <span id="yt-comment-count">127</span> Comments
                                    </div>
                                    ${generateComments()}
                                </div>
                            </div>
                            
                            <!-- Suggestions -->
                            <div style="padding: 0 24px 24px;">
                                <h3 style="color: #fff; margin-bottom: 16px;">Suggested Videos</h3>
                                <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 16px;">
                                    ${generateVideoCards('suggestions')}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <style>
                .youtube-icon-btn {
                    background: transparent;
                    border: none;
                    color: #fff;
                    font-size: 20px;
                    cursor: pointer;
                    padding: 8px;
                    border-radius: 50%;
                    transition: background 0.2s;
                }
                .youtube-icon-btn:hover {
                    background: #303030;
                }
                .youtube-search-btn {
                    color: #fff;
                }
                .yt-nav-section {
                    padding: 8px 0;
                }
                .yt-nav-item {
                    padding: 10px 24px;
                    color: #fff;
                    font-size: 14px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    transition: background 0.2s;
                }
                .yt-nav-item:hover {
                    background: #3f3f3f;
                }
                .yt-nav-item.active {
                    background: #3f3f3f;
                }
                .yt-nav-divider {
                    height: 1px;
                    background: #303030;
                    margin: 12px 0;
                }
                .yt-filter-chip {
                    padding: 8px 16px;
                    background: #272727;
                    border: 1px solid #303030;
                    border-radius: 20px;
                    color: #fff;
                    font-size: 14px;
                    cursor: pointer;
                    white-space: nowrap;
                    transition: background 0.2s;
                }
                .yt-filter-chip:hover {
                    background: #3f3f3f;
                }
                .yt-filter-chip.active {
                    background: #fff;
                    color: #0f0f0f;
                }
                .yt-video-card {
                    cursor: pointer;
                }
                .yt-video-thumbnail {
                    width: 100%;
                    aspect-ratio: 16/9;
                    border-radius: 12px;
                    background-size: cover;
                    background-position: center;
                    margin-bottom: 12px;
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 48px;
                }
                .yt-video-duration {
                    position: absolute;
                    bottom: 8px;
                    right: 8px;
                    background: rgba(0,0,0,0.8);
                    color: #fff;
                    padding: 2px 4px;
                    border-radius: 4px;
                    font-size: 12px;
                    font-weight: 500;
                }
                .yt-video-title {
                    color: #fff;
                    font-size: 16px;
                    font-weight: 500;
                    margin-bottom: 8px;
                    overflow: hidden;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    line-height: 1.4;
                }
                .yt-video-info {
                    color: #aaa;
                    font-size: 14px;
                }
                .yt-player-btn {
                    background: transparent;
                    border: none;
                    color: #fff;
                    font-size: 18px;
                    cursor: pointer;
                    padding: 8px;
                }
                .yt-action-btn {
                    background: #272727;
                    border: none;
                    color: #fff;
                    padding: 10px 16px;
                    border-radius: 20px;
                    cursor: pointer;
                    font-size: 14px;
                    font-weight: 500;
                    transition: background 0.2s;
                }
                .yt-action-btn:hover {
                    background: #3f3f3f;
                }
                .yt-comment {
                    display: flex;
                    gap: 16px;
                    margin-bottom: 24px;
                }
                .yt-comment-avatar {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    flex-shrink: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 600;
                }
            </style>
        `
    });
    
    setTimeout(() => {
        initYouTubeApp(windowId);
    }, 100);
}

function generateSubscriptionItems() {
    const channels = [
        { name: 'MrBeast', avatar: '👑' },
        { name: 'PewDiePie', avatar: '👊' },
        { name: 'Dude Perfect', avatar: '🎯' },
        { name: 'NASA', avatar: '🚀' },
        { name: 'TED', avatar: '💡' },
        { name: 'Veritasium', avatar: '🔬' },
        { name: 'Kurzgesagt', avatar: '🦆' },
        { name: 'MKBHD', avatar: '📱' }
    ];
    
    return channels.map(channel => `
        <div class="yt-nav-item">
            <span style="margin-right: 12px;">${channel.avatar}</span>
            <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${channel.name}</span>
        </div>
    `).join('');
}

function generateFilterChips() {
    const filters = ['All', 'Music', 'Gaming', 'Live', 'News', 'Sports', 'Learning', 'Comedy', 'Technology', 'Fashion', 'Food', 'Travel'];
    return filters.map((filter, i) => 
        `<div class="yt-filter-chip ${i === 0 ? 'active' : ''}">${filter}</div>`
    ).join('');
}

function generateVideoCards(type) {
    const videos = [
        {
            title: 'Building the World\'s Largest Sandbox - MrBeast Challenge',
            channel: 'MrBeast',
            views: '45M views',
            time: '2 days ago',
            duration: '15:32',
            gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            icon: '👑',
            description: 'We built the world\'s largest sandbox and filled it with treasure!',
            likes: '2.3M',
            channelSubs: '245M subscribers'
        },
        {
            title: 'I Tried Every Programming Language (You Won\'t Believe #7!)',
            channel: 'Tech Channel',
            views: '2.1M views',
            time: '1 week ago',
            duration: '22:18',
            gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            icon: '💻',
            description: 'Testing out every programming language to find the best one for beginners.',
            likes: '156K',
            channelSubs: '3.2M subscribers'
        },
        {
            title: 'Epic Gaming Montage - Best Moments 2024',
            channel: 'ProGamer',
            views: '8.9M views',
            time: '3 days ago',
            duration: '18:45',
            gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            icon: '🎮',
            description: 'Check out the most insane gaming moments from this year!',
            likes: '892K',
            channelSubs: '12M subscribers'
        },
        {
            title: 'How to Cook the Perfect Steak - Chef\'s Guide',
            channel: 'Cooking Master',
            views: '1.5M views',
            time: '5 days ago',
            duration: '12:08',
            gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
            icon: '👨‍🍳',
            description: 'Learn the secrets to cooking a restaurant-quality steak at home.',
            likes: '124K',
            channelSubs: '5.4M subscribers'
        },
        {
            title: 'Amazing Science Experiments You Can Try at Home!',
            channel: 'Science Fun',
            views: '12M views',
            time: '1 month ago',
            duration: '25:50',
            gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
            icon: '🔬',
            description: 'Mind-blowing science experiments with everyday household items.',
            likes: '1.1M',
            channelSubs: '18M subscribers'
        },
        {
            title: 'Top 10 Travel Destinations for 2024',
            channel: 'Travel Vlogger',
            views: '3.2M views',
            time: '2 weeks ago',
            duration: '20:33',
            gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
            icon: '✈️',
            description: 'Discover the most beautiful and exciting places to visit this year!',
            likes: '234K',
            channelSubs: '7.8M subscribers'
        },
        {
            title: 'The Future of AI - What You Need to Know',
            channel: 'Tech Explained',
            views: '5.6M views',
            time: '4 days ago',
            duration: '16:21',
            gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
            icon: '🤖',
            description: 'Exploring the latest developments in artificial intelligence and machine learning.',
            likes: '445K',
            channelSubs: '9.2M subscribers'
        },
        {
            title: 'Epic Car Chase Scene - Behind The Scenes',
            channel: 'Movie Magic',
            views: '7.3M views',
            time: '1 week ago',
            duration: '14:56',
            gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
            icon: '🎬',
            description: 'See how we filmed the most intense car chase in cinema history!',
            likes: '678K',
            channelSubs: '15M subscribers'
        },
        {
            title: 'Meditation Music - 1 Hour of Peaceful Sounds',
            channel: 'Relaxation Zone',
            views: '950K views',
            time: '3 months ago',
            duration: '1:00:00',
            gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
            icon: '🧘',
            description: 'Relax and unwind with this calming meditation music.',
            likes: '89K',
            channelSubs: '2.1M subscribers'
        }
    ];
    
    return videos.map((video, index) => `
        <div class="yt-video-card" data-video-index="${index}">
            <div class="yt-video-thumbnail" style="background: ${video.gradient};">
                <span>${video.icon}</span>
                <div class="yt-video-duration">${video.duration}</div>
            </div>
            <div style="display: flex; gap: 12px;">
                <div style="width: 36px; height: 36px; background: #3ea6ff; border-radius: 50%; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-weight: 600;">
                    ${video.icon}
                </div>
                <div style="flex: 1; min-width: 0;">
                    <div class="yt-video-title">${video.title}</div>
                    <div class="yt-video-info">
                        <div>${video.channel}</div>
                        <div>${video.views} • ${video.time}</div>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function generateComments() {
    const comments = [
        { author: 'John Doe', avatar: '👤', text: 'This is amazing! Best video I\'ve seen all week!', likes: '234', time: '2 days ago' },
        { author: 'Jane Smith', avatar: '👩', text: 'Can\'t wait for the next episode! Keep up the great work!', likes: '156', time: '1 day ago' },
        { author: 'Tech Guru', avatar: '💻', text: 'Really informative content. Learned something new today!', likes: '89', time: '3 hours ago' },
        { author: 'Music Lover', avatar: '🎵', text: 'The background music is perfect! What\'s the name of the track?', likes: '45', time: '5 hours ago' },
        { author: 'Gaming Pro', avatar: '🎮', text: 'This reminds me of my first experience with this. Good times!', likes: '67', time: '1 day ago' }
    ];
    
    return comments.map(comment => `
        <div class="yt-comment">
            <div class="yt-comment-avatar" style="background: #3ea6ff;">${comment.avatar}</div>
            <div style="flex: 1;">
                <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 4px;">
                    <span style="color: #fff; font-size: 13px; font-weight: 500;">@${comment.author.toLowerCase().replace(' ', '')}</span>
                    <span style="color: #aaa; font-size: 12px;">${comment.time}</span>
                </div>
                <div style="color: #fff; font-size: 14px; margin-bottom: 8px;">${comment.text}</div>
                <div style="display: flex; gap: 16px; align-items: center;">
                    <button style="background: transparent; border: none; color: #fff; font-size: 12px; cursor: pointer; display: flex; align-items: center; gap: 8px;">
                        <span>👍</span><span>${comment.likes}</span>
                    </button>
                    <button style="background: transparent; border: none; color: #fff; font-size: 12px; cursor: pointer;">
                        <span>👎</span>
                    </button>
                    <button style="background: transparent; border: none; color: #fff; font-size: 12px; cursor: pointer;">
                        Reply
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function initYouTubeApp(windowId) {
    const videos = [
        {
            title: 'Building the World\'s Largest Sandbox - MrBeast Challenge',
            channel: 'MrBeast',
            views: '45M views',
            time: '2 days ago',
            duration: 15 * 60 + 32,
            gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            icon: '👑',
            description: 'We built the world\'s largest sandbox and filled it with treasure! This was one of the most challenging projects we\'ve ever done. Watch to see if we can complete it!',
            likes: '2.3M',
            channelSubs: '245M subscribers'
        },
        {
            title: 'I Tried Every Programming Language (You Won\'t Believe #7!)',
            channel: 'Tech Channel',
            views: '2.1M views',
            time: '1 week ago',
            duration: 22 * 60 + 18,
            gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            icon: '💻',
            description: 'Testing out every programming language to find the best one for beginners. From Python to Rust, we cover them all!',
            likes: '156K',
            channelSubs: '3.2M subscribers'
        },
        {
            title: 'Epic Gaming Montage - Best Moments 2024',
            channel: 'ProGamer',
            views: '8.9M views',
            time: '3 days ago',
            duration: 18 * 60 + 45,
            gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            icon: '🎮',
            description: 'Check out the most insane gaming moments from this year! Featuring gameplay from all the top games.',
            likes: '892K',
            channelSubs: '12M subscribers'
        }
    ];
    
    let currentVideoIndex = 0;
    let isPlaying = false;
    let currentTime = 0;
    let playInterval = null;
    
    // Navigation
    document.querySelectorAll('.yt-nav-item').forEach(item => {
        item.addEventListener('click', function() {
            if (this.dataset.view) {
                document.querySelectorAll('.yt-nav-item').forEach(i => i.classList.remove('active'));
                this.classList.add('active');
                showNotification('YouTube', `Navigating to ${this.textContent.trim()}`);
            }
        });
    });
    
    // Video cards click
    document.querySelectorAll('.yt-video-card').forEach(card => {
        card.addEventListener('click', function() {
            const index = parseInt(this.dataset.videoIndex);
            if (index < videos.length) {
                currentVideoIndex = index;
                playVideo(videos[index]);
            }
        });
    });
    
    // Search
    const searchInput = document.getElementById('yt-search-input');
    const searchBtn = document.getElementById('yt-search-btn');
    
    const performSearch = () => {
        const query = searchInput.value.trim();
        if (query) {
            showNotification('YouTube', `Searching for: ${query}`);
        }
    };
    
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') performSearch();
    });
    
    // Sidebar toggle
    document.getElementById('yt-menu-btn').addEventListener('click', () => {
        const sidebar = document.getElementById('yt-sidebar');
        sidebar.style.display = sidebar.style.display === 'none' ? 'block' : 'none';
    });
    
    function playVideo(video) {
        // Show video player view
        document.getElementById('yt-home-view').style.display = 'none';
        document.getElementById('yt-video-player').style.display = 'block';
        
        // Update video info
        document.getElementById('yt-player-title').textContent = video.title;
        document.getElementById('yt-video-title').textContent = video.title;
        document.getElementById('yt-channel-name').textContent = video.channel;
        document.getElementById('yt-channel-subs').textContent = video.channelSubs;
        document.getElementById('yt-view-count').textContent = video.views;
        document.getElementById('yt-upload-date').textContent = video.time;
        document.getElementById('yt-video-description').textContent = video.description;
        document.getElementById('yt-like-count').textContent = video.likes;
        
        // Update player screen
        const playerScreen = document.getElementById('yt-player-screen');
        playerScreen.style.background = video.gradient;
        
        // Reset and start playback
        currentTime = 0;
        isPlaying = true;
        updatePlayerControls();
        startPlayback();
        
        showNotification('YouTube', `Now playing: ${video.title}`);
    }
    
    function startPlayback() {
        if (playInterval) clearInterval(playInterval);
        
        playInterval = setInterval(() => {
            if (isPlaying) {
                currentTime++;
                const video = videos[currentVideoIndex];
                if (currentTime >= video.duration) {
                    currentTime = video.duration;
                    pause();
                }
                updateProgress();
            }
        }, 1000);
    }
    
    function updateProgress() {
        const video = videos[currentVideoIndex];
        const percent = (currentTime / video.duration) * 100;
        document.getElementById('yt-player-progress-fill').style.width = percent + '%';
        document.getElementById('yt-player-current').textContent = formatTime(currentTime);
        document.getElementById('yt-player-total').textContent = formatTime(video.duration);
    }
    
    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
    
    function play() {
        isPlaying = true;
        updatePlayerControls();
    }
    
    function pause() {
        isPlaying = false;
        updatePlayerControls();
    }
    
    function updatePlayerControls() {
        const playPauseBtn = document.getElementById('yt-play-pause');
        if (playPauseBtn) {
            playPauseBtn.textContent = isPlaying ? '⏸️' : '▶️';
        }
    }
    
    // Player controls
    const playPauseBtn = document.getElementById('yt-play-pause');
    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', () => {
            if (isPlaying) {
                pause();
            } else {
                play();
            }
        });
    }
    
    const skipBackBtn = document.getElementById('yt-skip-back');
    if (skipBackBtn) {
        skipBackBtn.addEventListener('click', () => {
            currentTime = Math.max(0, currentTime - 10);
            updateProgress();
        });
    }
    
    const skipForwardBtn = document.getElementById('yt-skip-forward');
    if (skipForwardBtn) {
        skipForwardBtn.addEventListener('click', () => {
            const video = videos[currentVideoIndex];
            currentTime = Math.min(video.duration, currentTime + 10);
            updateProgress();
        });
    }
    
    // Progress bar click
    const progressBar = document.getElementById('yt-player-progress');
    if (progressBar) {
        progressBar.addEventListener('click', (e) => {
            const video = videos[currentVideoIndex];
            const rect = progressBar.getBoundingClientRect();
            const percent = (e.clientX - rect.left) / rect.width;
            currentTime = percent * video.duration;
            updateProgress();
        });
    }
    
    // Like button
    const likeBtn = document.getElementById('yt-like-btn');
    if (likeBtn) {
        likeBtn.addEventListener('click', function() {
            const video = videos[currentVideoIndex];
            const currentLikes = parseInt(video.likes);
            video.likes = (currentLikes + 1) + 'K';
            document.getElementById('yt-like-count').textContent = video.likes;
            this.style.background = '#3f3f3f';
            showNotification('YouTube', 'Liked!');
        });
    }
}

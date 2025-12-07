function openCalendar() {
    windowManager.createWindow({
        title: 'Calendar',
        width: 800,
        height: 600,
        content: `
            <div class="calendar-header">
                <h2>${new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h2>
            </div>
            <div class="calendar-grid">
                ${['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => `<div style="padding:10px; font-weight:bold;">${d}</div>`).join('')}
                ${Array.from({length: 35}, (_, i) => {
                    const day = i - 3; // Offset for month start
                    const isToday = day === new Date().getDate();
                    return `<div class="calendar-day ${isToday ? 'today' : ''}">${day > 0 && day <= 31 ? day : ''}</div>`;
                }).join('')}
            </div>
        `
    });
}

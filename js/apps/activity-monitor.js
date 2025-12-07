function openActivityMonitor() {
    windowManager.createWindow({
        title: 'Activity Monitor',
        width: 900,
        height: 600,
        content: `
            <div class="activity-tabs">
                <div class="activity-tab active">CPU</div>
                <div class="activity-tab">Memory</div>
                <div class="activity-tab">Disk</div>
                <div class="activity-tab">Network</div>
            </div>
            <div class="activity-content">
                <h3>CPU Usage: <span id="cpu-usage">0%</span></h3>
                <canvas id="cpu-chart" width="800" height="200" style="border:1px solid #ddd; margin:20px 0;"></canvas>
                <h4>Processes</h4>
                <table class="process-list">
                    <tr><th>Name</th><th>CPU%</th><th>Memory</th></tr>
                    <tr><td>System</td><td>2.3%</td><td>256MB</td></tr>
                    <tr><td>Browser</td><td>5.1%</td><td>512MB</td></tr>
                </table>
            </div>
        `
    });
}

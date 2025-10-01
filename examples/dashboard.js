async function fetchHealthData(endpoint) {
    try {
        const response = await fetch(`/api/healthcheck/${endpoint}`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error(`Error fetching ${endpoint}:`, error);
        return { error: error.message };
    }
}

function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function getStatusClass(percent) {
    if (percent < 70) return 'healthy';
    if (percent < 90) return 'warning';
    return 'error';
}

function renderServerInfo(data) {
    if (data.error) {
        document.getElementById('server-info').innerHTML = `<div class="status error">Error: ${data.error}</div>`;
        return;
    }

    const server = data.data;
    const memoryPercent = server.memory.memory.percent.totalRaw;
    
    document.getElementById('server-info').innerHTML = `
        <div class="metric">
            <span class="metric-label">Status</span>
            <span class="status ${server.alive ? 'healthy' : 'error'}">${server.alive ? 'Healthy' : 'Down'}</span>
        </div>
        <div class="metric">
            <span class="metric-label">Uptime</span>
            <span class="metric-value">${server.uptime.text}</span>
        </div>
        <div class="metric">
            <span class="metric-label">Memory Usage</span>
            <span class="metric-value">${server.memory.memory.percent.totalText}</span>
        </div>
        <div class="metric">
            <span class="metric-label">Memory Used</span>
            <span class="metric-value">${server.memory.memory.used.text}</span>
        </div>
        <div class="metric">
            <span class="metric-label">Memory Free</span>
            <span class="metric-value">${server.memory.memory.free.text}</span>
        </div>
        <div class="metric">
            <span class="metric-label">Max Memory</span>
            <span class="metric-value">${server.memory.memory.max.text}</span>
        </div>
        <div class="metric">
            <span class="metric-label">Strapi Version</span>
            <span class="metric-value">${server.version.strapi}</span>
        </div>
        <div class="metric">
            <span class="metric-label">App Version</span>
            <span class="metric-value">${server.version.application}</span>
        </div>
    `;
}

function renderDatabaseInfo(data) {
    if (data.error) {
        document.getElementById('database-info').innerHTML = `<div class="status error">Error: ${data.error}</div>`;
        return;
    }

    const db = data.data;
    
    document.getElementById('database-info').innerHTML = `
        <div class="metric">
            <span class="metric-label">Status</span>
            <span class="status ${db.alive ? 'healthy' : 'error'}">${db.alive ? 'Connected' : 'Disconnected'}</span>
        </div>
        <div class="metric">
            <span class="metric-label">Client</span>
            <span class="metric-value">${db.client}</span>
        </div>
        <div class="metric">
            <span class="metric-label">Version</span>
            <span class="metric-value">${db.version}</span>
        </div>
        <div class="metric">
            <span class="metric-label">Uptime</span>
            <span class="metric-value">${db.uptime.text}</span>
        </div>
        <div class="metric">
            <span class="metric-label">Size</span>
            <span class="metric-value">${db.size.text}</span>
        </div>
        <div class="metric">
            <span class="metric-label">Connections</span>
            <span class="metric-value">${db.connections.current}/${db.connections.max}</span>
        </div>
    `;
}

function renderOverviewInfo(data) {
    if (data.error) {
        document.getElementById('overview-info').innerHTML = `<div class="status error">Error: ${data.error}</div>`;
        return;
    }

    const overview = data.data;
    const server = overview.server;
    const database = overview.database;
    
    document.getElementById('overview-info').innerHTML = `
        <div class="metric">
            <span class="metric-label">Overall Status</span>
            <span class="status ${server.alive && database.alive ? 'healthy' : 'error'}">
                ${server.alive && database.alive ? 'All Systems Operational' : 'Issues Detected'}
            </span>
        </div>
        <div class="metric">
            <span class="metric-label">Server Status</span>
            <span class="status ${server.alive ? 'healthy' : 'error'}">${server.alive ? 'Online' : 'Offline'}</span>
        </div>
        <div class="metric">
            <span class="metric-label">Database Status</span>
            <span class="status ${database.alive ? 'healthy' : 'error'}">${database.alive ? 'Connected' : 'Disconnected'}</span>
        </div>
        <div class="metric">
            <span class="metric-label">System Uptime</span>
            <span class="metric-value">${server.uptime.text}</span>
        </div>
        <div class="metric">
            <span class="metric-label">Memory Usage</span>
            <span class="metric-value">${server.memory.memory.percent.totalText}</span>
        </div>
        <div class="metric">
            <span class="metric-label">Database Size</span>
            <span class="metric-value">${database.size.text}</span>
        </div>
    `;
}

async function loadHealthData() {
    document.getElementById('loading').style.display = 'block';
    document.getElementById('dashboard').style.display = 'none';

    try {
        const [serverData, databaseData, overviewData] = await Promise.all([
            fetchHealthData('server'),
            fetchHealthData('database'),
            fetchHealthData('all')
        ]);

        renderServerInfo(serverData);
        renderDatabaseInfo(databaseData);
        renderOverviewInfo(overviewData);

        document.getElementById('loading').style.display = 'none';
        document.getElementById('dashboard').style.display = 'block';
    } catch (error) {
        document.getElementById('loading').innerHTML = `<div class="status error">Error loading data: ${error.message}</div>`;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Load data on page load
    loadHealthData();
    
    // Auto-refresh every 30 seconds
    setInterval(loadHealthData, 30000);
    
    // Add click handler for refresh button
    const refreshBtn = document.querySelector('.refresh-btn');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', loadHealthData);
    }
});

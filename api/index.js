/**
 * Circuit Bot Dashboard
 * View bot status, logs, and control the bot
 */

// Simple in-memory storage for logs and status
let botEnabled = true;
let interactionLogs = [];
let errorLogs = [];
const MAX_LOGS = 50;

// Function to add interaction log
function logInteraction(type, command, user) {
  interactionLogs.unshift({
    timestamp: new Date().toISOString(),
    type,
    command,
    user,
    status: 'success'
  });
  if (interactionLogs.length > MAX_LOGS) interactionLogs.pop();
}

// Function to add error log
function logError(error, details) {
  errorLogs.unshift({
    timestamp: new Date().toISOString(),
    error: error.toString(),
    details: details || 'No additional details'
  });
  if (errorLogs.length > MAX_LOGS) errorLogs.pop();
}

// Export functions for use in interactions.js
global.botEnabled = () => botEnabled;
global.setBotEnabled = (value) => { botEnabled = value; };
global.logInteraction = logInteraction;
global.logError = logError;
global.getInteractionLogs = () => interactionLogs;
global.getErrorLogs = () => errorLogs;

export default function handler(req, res) {
  // Handle POST requests for toggling bot
  if (req.method === 'POST') {
    const { action, password } = req.body || {};
    
    // Simple password protection (change this!)
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'circuitbot123';
    
    if (password !== ADMIN_PASSWORD) {
      return res.status(401).json({ error: 'Invalid password' });
    }
    
    if (action === 'toggle') {
      botEnabled = !botEnabled;
      return res.json({ 
        success: true, 
        enabled: botEnabled,
        message: `Bot is now ${botEnabled ? 'ENABLED' : 'DISABLED'}`
      });
    }
    
    if (action === 'clear_logs') {
      interactionLogs = [];
      errorLogs = [];
      return res.json({ success: true, message: 'Logs cleared' });
    }
    
    return res.status(400).json({ error: 'Invalid action' });
  }

  // Handle GET requests - show dashboard
  if (req.method === 'GET') {
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Circuit Bot Dashboard</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      padding: 20px;
      color: #333;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .header {
      text-align: center;
      color: white;
      margin-bottom: 30px;
      padding: 30px;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      border-radius: 20px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    }
    
    .header h1 {
      font-size: 3em;
      margin-bottom: 10px;
    }
    
    .header p {
      font-size: 1.2em;
      opacity: 0.9;
    }
    
    .status-card {
      background: white;
      border-radius: 15px;
      padding: 30px;
      margin-bottom: 20px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }
    
    .status-indicator {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      font-size: 1.5em;
      font-weight: bold;
      margin-bottom: 20px;
    }
    
    .status-dot {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      animation: pulse 2s infinite;
    }
    
    .status-online {
      background: #10b981;
    }
    
    .status-offline {
      background: #ef4444;
    }
    
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    
    .controls {
      display: flex;
      gap: 15px;
      flex-wrap: wrap;
      margin-top: 20px;
    }
    
    .btn {
      padding: 12px 24px;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    
    .btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
    
    .btn-primary {
      background: #667eea;
      color: white;
    }
    
    .btn-danger {
      background: #ef4444;
      color: white;
    }
    
    .btn-success {
      background: #10b981;
      color: white;
    }
    
    .btn-secondary {
      background: #6b7280;
      color: white;
    }
    
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 15px;
      margin: 20px 0;
    }
    
    .stat-box {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 20px;
      border-radius: 10px;
      text-align: center;
    }
    
    .stat-value {
      font-size: 2em;
      font-weight: bold;
      margin-bottom: 5px;
    }
    
    .stat-label {
      opacity: 0.9;
      font-size: 0.9em;
    }
    
    .logs-section {
      background: white;
      border-radius: 15px;
      padding: 30px;
      margin-bottom: 20px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }
    
    .logs-section h2 {
      margin-bottom: 20px;
      color: #667eea;
    }
    
    .log-entry {
      background: #f9fafb;
      border-left: 4px solid #667eea;
      padding: 15px;
      margin-bottom: 10px;
      border-radius: 5px;
      font-family: 'Courier New', monospace;
      font-size: 0.9em;
    }
    
    .log-entry.error {
      border-left-color: #ef4444;
      background: #fef2f2;
    }
    
    .log-timestamp {
      color: #6b7280;
      font-size: 0.85em;
      margin-bottom: 5px;
    }
    
    .password-input {
      padding: 10px;
      border: 2px solid #e5e7eb;
      border-radius: 6px;
      font-size: 14px;
      width: 200px;
    }
    
    .password-input:focus {
      outline: none;
      border-color: #667eea;
    }
    
    .alert {
      padding: 15px;
      border-radius: 8px;
      margin: 15px 0;
      font-weight: 500;
    }
    
    .alert-success {
      background: #d1fae5;
      color: #065f46;
      border: 1px solid #10b981;
    }
    
    .alert-error {
      background: #fee2e2;
      color: #991b1b;
      border: 1px solid #ef4444;
    }
    
    .empty-state {
      text-align: center;
      padding: 40px;
      color: #9ca3af;
    }
    
    .info-box {
      background: #eff6ff;
      border: 1px solid #3b82f6;
      border-radius: 8px;
      padding: 15px;
      margin: 15px 0;
    }
    
    .info-box strong {
      color: #1e40af;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>⚡ Circuit Bot Dashboard</h1>
      <p>Monitor and control your Discord bot</p>
    </div>
    
    <div class="status-card">
      <div class="status-indicator">
        <div class="status-dot ${botEnabled ? 'status-online' : 'status-offline'}"></div>
        <span>Bot Status: ${botEnabled ? 'ENABLED ✅' : 'DISABLED ❌'}</span>
      </div>
      
      <div class="info-box">
        <strong>ℹ️ Note:</strong> The bot will always show as "offline" in Discord because it's serverless. 
        This is normal! The bot responds to commands even while showing offline status.
      </div>
      
      <div class="stats-grid">
        <div class="stat-box">
          <div class="stat-value">${interactionLogs.length}</div>
          <div class="stat-label">Total Interactions</div>
        </div>
        <div class="stat-box">
          <div class="stat-value">${errorLogs.length}</div>
          <div class="stat-label">Errors Logged</div>
        </div>
        <div class="stat-box">
          <div class="stat-value">${botEnabled ? 'ACTIVE' : 'PAUSED'}</div>
          <div class="stat-label">Current State</div>
        </div>
        <div class="stat-box">
          <div class="stat-value">Vercel</div>
          <div class="stat-label">Platform</div>
        </div>
      </div>
      
      <div id="alert" style="display: none;"></div>
      
      <div class="controls">
        <input 
          type="password" 
          id="password" 
          class="password-input" 
          placeholder="Admin Password"
          value="circuitbot123"
        >
        <button class="btn ${botEnabled ? 'btn-danger' : 'btn-success'}" onclick="toggleBot()">
          ${botEnabled ? '⏸️ Disable Bot' : '▶️ Enable Bot'}
        </button>
        <button class="btn btn-secondary" onclick="clearLogs()">
          🗑️ Clear Logs
        </button>
        <button class="btn btn-primary" onclick="location.reload()">
          🔄 Refresh
        </button>
      </div>
    </div>
    
    <div class="logs-section">
      <h2>📊 Recent Interactions</h2>
      ${interactionLogs.length > 0 ? 
        interactionLogs.map(log => `
          <div class="log-entry">
            <div class="log-timestamp">${new Date(log.timestamp).toLocaleString()}</div>
            <strong>${log.type}</strong> - Command: <code>/${log.command}</code> - User: ${log.user || 'Unknown'}
          </div>
        `).join('') :
        '<div class="empty-state">No interactions logged yet. Try using a command in Discord!</div>'
      }
    </div>
    
    <div class="logs-section">
      <h2>⚠️ Error Logs</h2>
      ${errorLogs.length > 0 ?
        errorLogs.map(log => `
          <div class="log-entry error">
            <div class="log-timestamp">${new Date(log.timestamp).toLocaleString()}</div>
            <strong>Error:</strong> ${log.error}<br>
            <strong>Details:</strong> ${log.details}
          </div>
        `).join('') :
        '<div class="empty-state">✅ No errors logged. Everything is working smoothly!</div>'
      }
    </div>
  </div>
  
  <script>
    async function toggleBot() {
      const password = document.getElementById('password').value;
      const alertDiv = document.getElementById('alert');
      
      try {
        const response = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'toggle', password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
          alertDiv.className = 'alert alert-success';
          alertDiv.textContent = data.message;
          alertDiv.style.display = 'block';
          setTimeout(() => location.reload(), 1000);
        } else {
          alertDiv.className = 'alert alert-error';
          alertDiv.textContent = data.error || 'Failed to toggle bot';
          alertDiv.style.display = 'block';
        }
      } catch (error) {
        alertDiv.className = 'alert alert-error';
        alertDiv.textContent = 'Error: ' + error.message;
        alertDiv.style.display = 'block';
      }
    }
    
    async function clearLogs() {
      const password = document.getElementById('password').value;
      const alertDiv = document.getElementById('alert');
      
      if (!confirm('Are you sure you want to clear all logs?')) return;
      
      try {
        const response = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'clear_logs', password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
          alertDiv.className = 'alert alert-success';
          alertDiv.textContent = data.message;
          alertDiv.style.display = 'block';
          setTimeout(() => location.reload(), 1000);
        } else {
          alertDiv.className = 'alert alert-error';
          alertDiv.textContent = data.error || 'Failed to clear logs';
          alertDiv.style.display = 'block';
        }
      } catch (error) {
        alertDiv.className = 'alert alert-error';
        alertDiv.textContent = 'Error: ' + error.message;
        alertDiv.style.display = 'block';
      }
    }
    
    // Auto-refresh every 30 seconds
    setTimeout(() => location.reload(), 30000);
  </script>
</body>
</html>
    `;
    
    return res.status(200).send(html);
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
}


# HTML Dashboard Example

This directory contains an example HTML dashboard for the Strapi Healthcheck Plugin that provides a human-readable interface for monitoring your Strapi instance.

## Files

- `dashboard.html` - The main dashboard HTML file
- `dashboard.js` - JavaScript functionality for the dashboard
- `README.md` - This documentation file

## Usage

1. Copy both `dashboard.html` and `dashboard.js` to your Strapi project's `public` directory
2. Access the dashboard at `http://your-strapi-domain/dashboard.html`
3. The dashboard will automatically load health data and refresh every 30 seconds

## Features

- **Real-time monitoring** of server and database health
- **Auto-refresh** every 30 seconds
- **Color-coded status indicators** (green/yellow/red)
- **Responsive design** that works on mobile and desktop
- **Comprehensive metrics** including uptime, memory usage, database status, and more

## Configuration

The dashboard automatically connects to the healthcheck plugin endpoints:
- `/api/healthcheck/ping` - Simple ping test
- `/api/healthcheck/server` - Server information
- `/api/healthcheck/database` - Database information  
- `/api/healthcheck/all` - Combined information

## Security

This dashboard is designed to work with the healthcheck plugin's public endpoints. Make sure you have configured the plugin permissions correctly for public access.

## Customization

You can modify the dashboard by editing the HTML and JavaScript files:
- Change refresh interval in `dashboard.js` (default: 30 seconds)
- Modify styling in the `<style>` section of `dashboard.html`
- Add additional metrics by extending the JavaScript functions

## Browser Compatibility

The dashboard uses modern JavaScript features and is compatible with:
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

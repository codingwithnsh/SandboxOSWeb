# Quick Start Guide for SandboxOS Web

## 🚀 Getting Started

### Method 1: Local File (Recommended for Development)
1. Download or clone this repository
2. Open `index.html` in your web browser
3. That's it! The OS will start automatically

### Method 2: Web Server (Recommended for Production)
If you want to serve it via a web server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server

# Using PHP
php -S localhost:8000
```

Then navigate to `http://localhost:8000` in your browser.

## 🎯 First Steps

1. **Explore the Desktop**
   - Click on any desktop icon to launch an application
   - Try the File Explorer (📁) to see the virtual filesystem

2. **Try the Dock**
   - The dock at the bottom has quick access to all apps
   - Hover over icons to see their names
   - Click to launch

3. **Use Spotlight Search**
   - Press `Ctrl+Space` or click 🔍 in the dock
   - Type to search for apps
   - Press Enter to launch

4. **Create a Sandbox**
   - Click the 🔒 Sandboxes icon
   - Click "➕ New Sandbox"
   - Choose a template and name
   - Click "Create"
   - Now you can start, pause, or stop the sandbox

5. **Try Mac Features**
   - Press `F3` for Mission Control (see all windows)
   - Press `F4` for Launchpad (see all apps)
   - Press `Ctrl+Space` for Spotlight search

6. **Customize Appearance**
   - Open Settings (⚙️)
   - Change theme to Dark mode
   - Pick a custom accent color

## 🔑 Keyboard Shortcuts

- `Ctrl+Space` - Spotlight search
- `Ctrl+N` - New text editor
- `Ctrl+T` - Terminal
- `Ctrl+Shift+S` - Sandbox Manager
- `Alt+Tab` - Mission Control
- `F3` - Mission Control
- `F4` - Launchpad
- `Esc` - Close overlays

## 📱 Applications to Try

### Essential Apps
- **File Explorer** - Browse the virtual filesystem
- **Text Editor** - Create and edit text files
- **Calculator** - Perform calculations
- **Terminal** - Run commands

### Productivity
- **Notes** - Take notes
- **Calendar** - Manage events
- **Email** - Read and compose emails

### Media
- **Photos** - View images
- **Music** - Play music
- **Videos** - Watch videos

### System
- **Sandbox Manager** - Manage isolated environments
- **Activity Monitor** - View system resources
- **Settings** - Customize the OS
- **App Store** - Browse and install apps

### Advanced
- **Time Machine** - Backup and restore
- **Voice Assistant** - Voice control
- **Developer Console** - Debug and inspect

## 🎨 Customization

1. **Change Theme**
   - Open Settings → Appearance
   - Select Light or Dark mode
   - Theme is automatically saved

2. **Change Accent Color**
   - Open Settings → Appearance
   - Click "Choose Color"
   - Pick your favorite color

3. **Manage Files**
   - All files are stored in browser's localStorage
   - Files persist between sessions
   - Use File Explorer to manage files

## 🔒 Using Sandboxes

### Creating a Sandbox
1. Open Sandbox Manager (🔒)
2. Click "➕ New Sandbox"
3. Enter a name (e.g., "Development")
4. Choose a template:
   - **General Purpose**: Balanced resources
   - **Development**: More resources for coding
   - **Testing**: Isolated testing environment
   - **Lightweight**: Minimal resources
   - **Heavy Workload**: Maximum resources
5. Click "Create"

### Managing Sandboxes
- **Start**: Click ▶️ to start the sandbox
- **Pause**: Click ⏸️ to pause
- **Resume**: Click ▶️ to resume from pause
- **Stop**: Click ⏹️ to stop
- **Delete**: Click 🗑️ to remove

### Monitoring Resources
Each sandbox shows:
- CPU usage (%)
- Memory usage (MB)
- Disk usage (MB)
- Current status

## 💡 Tips & Tricks

1. **Multiple Windows**
   - You can open multiple apps at once
   - Drag windows by their title bar
   - Click the green button to maximize
   - Click the yellow button to minimize
   - Click the red button to close

2. **Virtual Filesystem**
   - Files are stored in browser's localStorage
   - Maximum ~5MB of storage
   - Files persist between sessions
   - Clear browser data to reset

3. **Data Persistence**
   - Settings are automatically saved
   - Sandboxes are saved
   - File system is saved
   - Everything persists in localStorage

4. **Performance**
   - Works best in Chrome/Edge
   - Disable browser extensions for best performance
   - Close unused windows to save resources

5. **Debugging**
   - Open browser console (F12)
   - Access OS API via `window.SandboxOS`
   - View system information
   - Check for errors

## 🐛 Troubleshooting

### Issue: Apps not opening
- **Solution**: Refresh the page (F5)
- Check browser console for errors

### Issue: Settings not saving
- **Solution**: Check if localStorage is enabled
- Some browsers in private mode disable localStorage

### Issue: Files not persisting
- **Solution**: Don't clear browser data
- Check localStorage size limit

### Issue: Slow performance
- **Solution**: Close unused windows
- Clear browser cache
- Use Chrome or Edge for best performance

### Issue: Sandboxes not working
- **Solution**: Refresh the page
- Check browser console for iframe errors
- Ensure JavaScript is enabled

## 🔧 Advanced Usage

### Access the OS API
```javascript
// In browser console
SandboxOS.launchApp('calculator')
SandboxOS.showNotification('Test', 'Hello!')
SandboxOS.toggleTheme()
```

### View System Data
```javascript
// In browser console
console.log(SandboxOS.fileSystem.getFileSystem())
console.log(SandboxOS.settingsManager.getSettings())
console.log(SandboxOS.sandboxManager.getAllSandboxes())
```

### Clear All Data
```javascript
// WARNING: This will delete everything!
localStorage.clear()
location.reload()
```

## 📚 Learn More

- Read the full README.md for complete documentation
- Check the code in `js/` directory for implementation details
- Explore individual app files in `js/apps/`
- Review styles in `styles/` directory

## 🎉 Have Fun!

Explore all the features, create sandboxes, try different apps, and customize the OS to your liking!

---

**Need Help?** Check the README.md or open an issue on GitHub.

**Version**: 1.0 - Web Edition

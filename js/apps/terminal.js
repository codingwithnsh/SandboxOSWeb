// Terminal Application

function openTerminal() {
    const windowId = windowManager.createWindow({
        title: 'Terminal',
        width: 800,
        height: 500,
        content: `
            <div class="terminal-output" id="terminal-output"></div>
            <div class="terminal-input-line">
                <span class="terminal-prompt">$</span>
                <input type="text" class="terminal-input" id="terminal-input" autocomplete="off">
            </div>
        `
    });

    const output = document.getElementById('terminal-output');
    const input = document.getElementById('terminal-input');
    const commandHistory = [];
    let historyIndex = 0;

    // Welcome message
    output.innerHTML = `SandboxOS Web Terminal v1.0
Type 'help' for available commands.

`;

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const command = input.value.trim();
            if (command) {
                commandHistory.push(command);
                historyIndex = commandHistory.length;
                executeCommand(command);
                input.value = '';
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyIndex > 0) {
                historyIndex--;
                input.value = commandHistory[historyIndex];
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                input.value = commandHistory[historyIndex];
            } else {
                historyIndex = commandHistory.length;
                input.value = '';
            }
        }
    });

    function executeCommand(command) {
        output.innerHTML += `$ ${command}\n`;
        const result = processCommand(command);
        output.innerHTML += result + '\n\n';
        output.scrollTop = output.scrollHeight;
    }

    function processCommand(command) {
        const parts = command.split(' ');
        const cmd = parts[0].toLowerCase();

        switch (cmd) {
            case 'help':
                return `Available commands:
  help       - Show this help message
  clear      - Clear the terminal
  echo       - Print message
  date       - Show current date and time
  whoami     - Show current user
  calc       - Calculate expression (e.g., calc 2+2)
  ls         - List files
  pwd        - Print working directory
  uname      - System information`;
            
            case 'clear':
                output.innerHTML = '';
                return '';
            
            case 'echo':
                return parts.slice(1).join(' ');
            
            case 'date':
                return new Date().toString();
            
            case 'whoami':
                return settingsManager.getSetting('username');
            
            case 'calc':
                try {
                    const expr = parts.slice(1).join(' ');
                    return `${expr} = ${safeEval(expr)}`;
                } catch (e) {
                    return 'Error: Invalid expression';
                }
            
            case 'ls':
                return 'Documents/  Downloads/  Pictures/  Music/  Videos/';
            
            case 'pwd':
                return '/Home';
            
            case 'uname':
                const info = getSystemInfo();
                return `Platform: ${info.platform}\nLanguage: ${info.language}`;
            
            default:
                return `Command not found: ${cmd}\nType 'help' for available commands`;
        }
    }

    input.focus();
}

// waiting for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
    const themeSelect = document.getElementById('theme-select');
    const themeContainer = document.getElementById('theme-switcher');
    const root = document.documentElement;

    if (!themeSelect || !themeContainer) return;

    // Progressive Enhancement: Only show the picker if JS is working
    themeContainer.removeAttribute('hidden');

    // 1. Load saved preference or default to 'system'
    const savedTheme = localStorage.getItem('theme') || 'system';
    themeSelect.value = savedTheme;
    applyTheme(savedTheme);

    // 2. Listen for user changes
    themeSelect.addEventListener('change', (event) => {
        const selectedTheme = event.target.value;
        applyTheme(selectedTheme);
        
        // Handle localStorage availability
        try {
            localStorage.setItem('theme', selectedTheme);
        } catch (e) {
            console.error("localStorage is not available.");
        }
    });

    // 3. Helper to apply the theme state to the root
    function applyTheme(theme) {
        root.setAttribute('data-theme', theme);
    }
});
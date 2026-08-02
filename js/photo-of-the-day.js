class PhotoOfTheDay extends HTMLElement {
    constructor() {
        super();
        // keyless API
        this.endpoint = "https://picsum.photos/v2/list?page=1&limit=1";
        this.cacheKey = 'daily-photo-cache';
        this.ttl = 3600000; // 1 hour TTL
        this.controller = null;
    }

    // Requirement: Declare which attributes to watch for reconfiguration
    static get observedAttributes() {
        return ['page'];
    }

    // Requirement: Implementation of attributeChangedCallback
    attributeChangedCallback(name, oldValue, newValue) {
        // Only re-fetch if the value actually changed and component is on the page
        if (oldValue !== newValue && this.isConnected) {
            this.fetchPhoto();
        }
    }

    connectedCallback() {
        this.render();
        this.fetchPhoto();
    }

    disconnectedCallback() {
        if (this.controller) this.controller.abort(); // Prevent memory leaks
    }

    async fetchPhoto() {
        // NEW: Get the current page attribute or default to '1'
        const page = this.getAttribute('page') || '1';
        const dynamicEndpoint = `https://picsum.photos/v2/list?page=${page}&limit=1`;

        // Update cache key to be page-specific so different pages cache separately
        const currentPageCacheKey = `${this.cacheKey}-page-${page}`;

        this.controller = new AbortController();
        const timeoutId = setTimeout(() => this.controller.abort(), 5000);

        this.updateState('loading', 'Loading daily photo...');

        // Check page-specific cache
        let cached = null;
        try {
            cached = JSON.parse(localStorage.getItem(currentPageCacheKey));
        } catch (e) {
            // localStorage unavailable - skip cache, fetch fresh
        }
        if (cached && (Date.now() - cached.time < this.ttl)) {
            clearTimeout(timeoutId);
            this.displayData(cached.data); // API returns an array
            return;
        }

        try {
            const response = await fetch(dynamicEndpoint, { signal: this.controller.signal });
            if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

            const data = await response.json();
            const photoItem = data[0];

            try {
                localStorage.setItem(currentPageCacheKey, JSON.stringify({
                    data: photoItem,
                    time: Date.now()
                }));
            } catch (e) {
                // Storage unavailable - continue without caching
            }

            this.displayData(photoItem);
        } catch (error) {
            const msg = error.name === 'AbortError' ? 'Request timed out.' : error.message;
            this.updateState('error', `Could not load photo: ${msg}`);
        } finally {
            clearTimeout(timeoutId);
        }
    }

    render() {
        const template = document.getElementById('photo-template');
        const content = template.content.cloneNode(true);

        content.querySelector('.refresh-btn').addEventListener('click', () => {
            const page = this.getAttribute('page') || '1';
            const currentPageCacheKey = `${this.cacheKey}-page-${page}`;

            localStorage.removeItem(currentPageCacheKey);
            this.fetchPhoto();
        });

        this.replaceChildren(content);
        this.updateState('idle');
    }

    displayData(photo) {
        const img = this.querySelector('.daily-image');
        const caption = this.querySelector('.photo-credit');

        // Safe rendering with textContent/setAttribute
        img.setAttribute('src', photo.download_url);
        img.setAttribute('alt', `A featured photo by ${photo.author}`);
        caption.textContent = `Photo by: ${photo.author}`; // Attribution required

        this.updateState('success');
    }

    updateState(state, message = '') {
        this.setAttribute('state', state); // Reflect state to DOM for styling
        const status = this.querySelector('.status-message');
        if (message) {
            status.textContent = message;
            status.hidden = false;
        } else {
            status.hidden = true;
        }
    }
}

customElements.define('photo-of-the-day', PhotoOfTheDay);
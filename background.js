chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({
        speed: 1.0,
        defaultSpeed: 1.0,
        maxSpeed: 8.0,
        minSpeed: 0.5,
        disableOnSites: [],
        rememberSpeed: true,
        enableOverlay: true,
        opacity: 0.3,
        extensionEnabled: true
    });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getSettings") {
        chrome.storage.sync.get([
            "speed", "defaultSpeed", "maxSpeed", "minSpeed", "disableOnSites", "rememberSpeed",
            "enableOverlay", "opacity", "extensionEnabled"
        ], (data) => {
            sendResponse(data);
        });
        return true;
    } else if (request.action === "updateSettings") {
        chrome.storage.sync.set(request.settings);
    }
});
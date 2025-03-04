chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    let video = document.querySelector("video");
    if (!video) return;

    if (request.action === "changeSpeed") {
        chrome.storage.sync.get(["maxSpeed"], (data) => {
            video.playbackRate = Math.min(Math.max(video.playbackRate + (request.increase ? 0.1 : -0.1), 0.5), data.maxSpeed);
            chrome.storage.sync.set({ speed: video.playbackRate });
            sendResponse({ speed: video.playbackRate });
        });
        return true;
    }

    if (request.action === "getCurrentSpeed") {
        sendResponse({ speed: video.playbackRate });
    }

    if (request.action === "resetSpeed") {
        video.playbackRate = 1.0;
        chrome.storage.sync.set({ speed: video.playbackRate });
        sendResponse({ speed: video.playbackRate });
    }
});
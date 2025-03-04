document.addEventListener("DOMContentLoaded", () => {
    function updateSpeedDisplay(speed) {
        document.getElementById("currentSpeed").textContent = speed.toFixed(1);
    }

    function requestCurrentSpeed() {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { action: "getCurrentSpeed" }, (response) => {
                if (response) updateSpeedDisplay(response.speed);
            });
        });
    }

    requestCurrentSpeed();

    document.getElementById("increaseSpeed").addEventListener("click", () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { action: "changeSpeed", increase: true }, (response) => {
                if (response) updateSpeedDisplay(response.speed);
            });
        });
    });

    document.getElementById("decreaseSpeed").addEventListener("click", () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { action: "changeSpeed", increase: false }, (response) => {
                if (response) updateSpeedDisplay(response.speed);
            });
        });
    });

    document.getElementById("resetSpeed").addEventListener("click", () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { action: "resetSpeed" }, (response) => {
                if (response) updateSpeedDisplay(response.speed);
            });
        });
    });
    
    document.getElementById("settings").addEventListener("click", () => {
        chrome.runtime.openOptionsPage();
    });

    document.getElementById("disableExtension").addEventListener("change", (event) => {
        let enabled = !event.target.checked;
        chrome.storage.sync.set({ extensionEnabled: enabled });
        document.querySelectorAll("button").forEach(button => {
            if (button.id !== "disableExtension") button.style.display = enabled ? "block" : "none";
        });
    });

    document.getElementById("about").addEventListener("click", () => {
        window.open("https://github.com/vuartex", "_blank");
    });
});
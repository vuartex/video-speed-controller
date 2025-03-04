document.addEventListener("DOMContentLoaded", () => {
    chrome.storage.sync.get(["defaultSpeed", "maxSpeed", "minSpeed", "enableMouseWheel", "enableSpeedPanel", "theme"], (data) => {
        document.getElementById("defaultSpeed").value = data.defaultSpeed;
        document.getElementById("maxSpeed").value = data.maxSpeed;
        document.getElementById("minSpeed").value = data.minSpeed;
        document.getElementById("enableMouseWheel").checked = data.enableMouseWheel;
        document.getElementById("enableSpeedPanel").checked = data.enableSpeedPanel;
        document.getElementById("theme").value = data.theme;
    });

    document.getElementById("save").addEventListener("click", () => {
        chrome.storage.sync.set({
            defaultSpeed: parseFloat(document.getElementById("defaultSpeed").value),
            maxSpeed: parseFloat(document.getElementById("maxSpeed").value),
            minSpeed: parseFloat(document.getElementById("minSpeed").value),
            enableMouseWheel: document.getElementById("enableMouseWheel").checked,
            enableSpeedPanel: document.getElementById("enableSpeedPanel").checked,
            theme: document.getElementById("theme").value
        });
    });
});
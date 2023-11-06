'use strict';

function onEvent(event, selector, callback) {
    return selector.addEventListener(event, callback);
}

function selectById(selector, parent = document) {
    return parent.getElementById(selector);
}

function select(selector, parent = document) {
    return parent.querySelector(selector);
}

function selectAll(selector, parent = document) {
    return[...parent.querySelectorAll(selector)];
}

function create(element, parent = document) {
    return parent.createElement(element);
}

function print(...args) {
    console.log(args.join(', '));
}

const WindowInfo = window.navigator.userAgent;
print(window.navigator.language);
const os = selectById('os');
const language = selectById('language');
const browser = selectById('browser');
const pageWidth = selectById('page-w');
const pageHeight = selectById('page-h');
const deviceOrientation = selectById('orientation');
const percent = selectById('batteryPercent');
const statusBar = selectById('batteryStatus');
const wifiStatus = selectById('wifiStatus');
const statusTitle = selectById('statusTitle');

function getWindowDimensions() {
    pageWidth.innerText = `Window width: ${window.innerWidth}px`;
    pageHeight.innerText = `Window height: ${window.innerHeight}px`;
    if (window.innerWidth >= window.innerHeight) {
        deviceOrientation.innerText = `Orientaion: landscape`;
    } else {
        deviceOrientation.innerText = `Orientaion: portrait`;
    }
}

function getWindowInfo() {
    if (WindowInfo.includes('Macintosh')) {
        os.innerHTML = "OS: Mac/OS";
    } else {
        os.innerHTML = "OS: Windows";
    }
    language.innerText = `language: ${window.navigator.language}`;
    let browserName = window.navigator.userAgent;
    if (browserName.includes('Edg')) {
        browser.innerHTML = "Browser: Edge";
    } else if (browserName.includes('OPR')) {
        browser.innerHTML = "Browser: Opera";
    } else if (browserName.includes('Chrome')) {
        browser.innerHTML = "Browser: Chrome";
    } else if (browserName.includes('Firefox')) {
        browser.innerHTML = "Browser: Firefox";
    }
}

function getbatteryInfo() {
    if ('getBattery' in navigator) {
        navigator.getBattery().then((battery) => {
            percent.innerText = `level: ${battery.level * 100}%`;
            onEvent('levelchange', battery, () => {
                percent.innerText = `level: ${battery.level * 100}%`;
            });
        }); 
        navigator.getBattery().then((battery) => {
            if (battery.charging) {
                statusBar.innerText = 'Charging status: charging';
            } else {
                statusBar.innerText = 'Charging status: not charging';
            }
            onEvent('chargingchange',battery, () => {
                if (battery.charging) {
                    statusBar.innerText = 'Charging status: charging';
                } else {
                    statusBar.innerText = 'Charging status: not charging';
                }
            });
        })
    } else {
        percent.innerText = 'level: not available';
        statusBar.innerText = 'Charging status: not available';
    }
}

function checkIfOnline() {
    const onlineStatus = navigator.onLine;
    if (onlineStatus) {
        wifiStatus.innerText = 'Online';
        statusTitle.style.backgroundColor = '#00d800';
    } else {
        wifiStatus.innerText = 'Offline';
        statusTitle.style.backgroundColor = '#f00';
    }
    onEvent('online',window, () => {
        wifiStatus.innerText = 'Online';
        statusTitle.style.backgroundColor = '#00d800';
    });
    onEvent('offline',window, () => {
        wifiStatus.innerText = 'Offline';
        statusTitle.style.backgroundColor = '#f00';
    });
};


onEvent('load',window, () => {
    getWindowInfo();
    getWindowDimensions();
    getbatteryInfo();
    checkIfOnline();
});

onEvent('resize', window, () => {
    getWindowDimensions();
});
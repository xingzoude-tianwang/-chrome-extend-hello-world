function testToggle(tab) {    
    const keys = Object.keys(tab)
    const text = JSON.stringify(tab)
    chrome.browserAction.setBadgeText({
        text: keys[1]
    })
    chrome.browserAction.setBadgeBackgroundColor({
        color: [255, 0, 0, 255]
    })
    chrome.browserAction.setIcon({
        path: '../asset/img/icon2.png'
    })
    chrome.browserAction.setPopup({
        popup: '../page/bye.html'
    })
    chrome.browserAction.setTitle({
        title: text
    })
    const contextMenusParam = {
        type: "radio", //"normal", "checkbox", "radio", "separator"
        title: "tttt",
        checked: false,
        onclick(info, tab) {
            chrome.browserAction.setTitle({
                title: JSON.stringify(info) + tab,
            }) 
            updateContextMenus(info.menuItemId);
        },
        contexts: ["page"] //["all", "page", "frame", "selection", "link", "editable", "image", "video", "audio"] 
    };
    chrome.contextMenus.create(contextMenusParam);
    updateContextMenus = (id) => {
        const contextMenusUpdateParam = {
            id: `${id}`,
            checked: true,
            title: "its true",
            type: "radio",
        }
        chrome.contextMenus.create(contextMenusUpdateParam);
    }
}
// chrome.browserAction.onClicked.addListener(function(tab) {
//     testToggle(tab);
//     console.log(tab);
// });
testToggle({ tab: 'test' });
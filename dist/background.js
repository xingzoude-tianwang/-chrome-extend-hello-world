// function testToggle(tab) {    
//     const keys = Object.keys(tab)
//     chrome.browserAction.setBadgeText({
//         text: keys[1]
//     })
//     chrome.browserAction.setBadgeBackgroundColor({
//         color: [255, 0, 0, 255]
//     })
//     chrome.browserAction.setIcon({
//         path: '../asset/img/icon2.png'
//     })
//     // chrome.browserAction.setPopup({
//     //     popup: '../page/bye.html'
//     // })
//     chrome.browserAction.setTitle({
//         title: 'its my life'
//     })

//     const contextMenusParam = {
//         type: "radio", //"normal", "checkbox", "radio", "separator"
//         title: "tttt",
//         checked: false,
//         onclick(info, tab) {
//             chrome.browserAction.setTitle({
//                 title: JSON.stringify(tab) + info,
//             }) 
//             debugger;
//             updateContextMenus(info.menuItemId);
//         },
//         contexts: ["all"] //["all", "page", "frame", "selection", "link", "editable", "image", "video", "audio"] 
//     };
//     chrome.contextMenus.create(contextMenusParam);
//     updateContextMenus = (id) => {
//         const contextMenusUpdateParam = {
//             id: `${id}`,
//             checked: true,
//             title: "its true",
//             type: "radio",
//         }
//         chrome.contextMenus.create(contextMenusUpdateParam);
//     }
// }

// chrome.runtime.onInstalled.addListener(async () => {
//     let url = chrome.runtime.getURL("../page/backgroundPage.html");
//     let tab = await chrome.tabs.create({ url });
//     console.log(`Created tab ${tab.id}`);
//     console.log(tab);
//     testToggle({ tab: 'test' });
// });

let color = '#3aa757';
let colorIndex = 0;
const presetButtonColors = ["#3aa757", "#e8453c", "#f9bb2d", "#4688f1"];

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  chrome.storage.sync.set({ colorIndex });
  chrome.storage.sync.set({ presetButtonColors });
  console.log('Default background color set to %cgreen', `color: ${color}`, `colorIndex: ${colorIndex}`, `presetButtonColors: ${presetButtonColors}`);
});

function changeData() {
  chrome.storage.sync.get("colorIndex", ({ colorIndex }) => {
    chrome.storage.sync.get("presetButtonColors", ({ presetButtonColors }) => {
      const len = presetButtonColors.length;
      const currentIndex = ((colorIndex + 1) % len);
      chrome.storage.sync.set({ colorIndex: currentIndex });
      changeColor.style.backgroundColor = presetButtonColors[currentIndex];
    });
  });
}

async function changeActiveCurrentPageBackGroup() {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setPageBackgroundColor,
  });
}

function setPageBackgroundColor() {
  chrome.storage.sync.get("colorIndex", ({ colorIndex }) => {
    chrome.storage.sync.get("presetButtonColors", ({ presetButtonColors }) => {
      const color = presetButtonColors[colorIndex];
      document.body.style.backgroundColor = color;
    });
  });
}

chrome.commands.onCommand.addListener(function() {
  changeData();
  changeActiveCurrentPageBackGroup();
});
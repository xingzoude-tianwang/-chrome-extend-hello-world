// Initialize button with user's preferred color
let changeColor = document.getElementById("changeColor");

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

// The body of this function will be executed as a content script inside the
// current page
function setPageBackgroundColor() {
  chrome.storage.sync.get("colorIndex", ({ colorIndex }) => {
    chrome.storage.sync.get("presetButtonColors", ({ presetButtonColors }) => {
      const color = presetButtonColors[colorIndex];
      document.body.style.backgroundColor = color;
    });
  });
}

// 初始化数据， 保证每次点击actions 就能够切换颜色的数据
changeData();


// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
  changeActiveCurrentPageBackGroup();
});


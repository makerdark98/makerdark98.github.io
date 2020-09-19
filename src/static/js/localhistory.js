function getLocalStorageVersion() {
  if (localStorage.md98wiki === "true") return "v1";
  else if (localStorage.md98wiki === "v2") return "v2";
  return false;
}
function localStorageUpgrade(version) {
  try {
    if (version !== "v2") throw "invalid version";
    if (localStorage.md98wiki === "v1") {
      localStorage.md98wiki = "v2";
      localStorage.md98wikiData = JSON.stringify(
        JSON.parse(localStorage.md98wikiData).map(e => ({
          name : e,
          link : `/wiki/${e}`,
        })));
    }
  } catch (err) {
    console.error(err);
    return false;
  }
}

function initLocalStorage() {
  try {
    localStorage.md98wiki = "v2";
    localStorage.md98wikiData = JSON.stringify([]);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

function getHistory() {
  try {
    var localStorageVersion = getLocalStorageVersion();
    if (localStorageVersion === false) {
      initLocalStorage();
    } else if (localStorageVersion !== "v2") {
      localStorageUpgrade("v2");
    }
    return JSON.parse(localStorage.md98wikiData);
  } catch (err) {
    console.error(err);
    return [];
  }
}

function pushHistory(name, link) {
  try {
    var localStorageVersion = getLocalStorageVersion();
    if (localStorageVersion === false) {
      initLocalStorage();
    } else if (localStorageVersion !== "v2") {
      localStorageUpgrade("v2");
    }

    var originalHistory = getHistory();
    var beforeIdx = originalHistory.indexOf({name, link});
    if (beforeIdx > -1) originalHistory.splice(beforeIdx, 1);
    originalHistory.push({name, link});
    localStorage.md98wikiData = JSON.stringify(originalHistory);

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

function showAllHistory(container, show) {
  var hist = getHistory();
  if (show) {
    container.innerHTML = hist.slice(0, hist.length-3).map(h=> `<li class="breadcrumb-item"><a href="${h.link}">${h.name.slice(0, 10)}</a></li>`).join('\n');
  } else {
    container.innerHTML = '...';
  }
}

function displayHistory(container) {
  try {
    var maxLength = 3;
    if (container) {
      var hist = getHistory();

      container.innerHTML = '<nav aria-label="breadcrumb"><ol class="breadcrumb">'
        + (hist.length > 3 ? '<li style="cursor:pointer;" class="hidden-history">...</li>' : "")
        + hist.slice(-3).map(h =>`<li class="breadcrumb-item"><a href="${h.link}">${h.name.slice(0, 10)}</a></li>`).join('\n');
      + '</ol></nav>';

    }
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  var hist = document.querySelector('.wiki-history');
  displayHistory(hist);
  if (hist) convertWikiLink(hist);
  let hidden_history = document.querySelector('.hidden-history');
  if (hidden_history !== null) {
    hidden_history.addEventListener('click', (event) => {
      event.stopPropagation();
      showAllHistory(hidden_history, true);
    });
    document.querySelector('html').addEventListener('click', () => {
      showAllHistory(hidden_history, false);
    });
  }
});

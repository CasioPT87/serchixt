
const goTo = (pageName, pushHistoryState = true) => {
    const changePageEvent = new CustomEvent("changePage", {
        detail: { pageName }
    });
    if (typeof document !== 'undefined') {
        if (pushHistoryState) window.history.pushState(null, null, pageName);
        window.dispatchEvent(changePageEvent);
    }
}

export default goTo
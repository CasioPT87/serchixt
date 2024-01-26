import routes from "../routes";

const goTo = (pageName, pushHistoryState = true) => {
    const changePageEvent = new CustomEvent("changePage", {
        detail: { pageName }
    });
    if (typeof document !== 'undefined') {
        if (pushHistoryState) window.history.pushState(null, null, routes[pageName].path);
        window.dispatchEvent(changePageEvent);
    }
}

export default goTo
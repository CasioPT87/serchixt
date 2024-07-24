import routes from "../routes";

const goTo = ({ pageName, pushHistoryState = true, redirect = false }) => {
    const changePageEvent = new CustomEvent("changePage", {
        detail: { pageName }
    });
    if (typeof document !== 'undefined') {
        if (pushHistoryState) window.history.pushState(null, null, routes[pageName].path);
        else if (redirect) window.location.replace(routes[pageName].path)
        window.dispatchEvent(changePageEvent);
    }
}

export default goTo
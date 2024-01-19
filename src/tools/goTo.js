
const goTo = (pageName) => {
    console.log('pagename', pageName)
    const changePageEvent = new CustomEvent("changePage", {
        detail: { pageName }
    });
    if (typeof document !== 'undefined') window.dispatchEvent(changePageEvent);
}

export default goTo
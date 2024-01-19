
const goTo = (pageName) => {
    console.log('pagename', pageName)
    const changePageEvent = new CustomEvent("changePage", {
        detail: { pageName }
    });
    window.dispatchEvent(changePageEvent);
}

export default goTo
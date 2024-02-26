import React from "react"
import { Provider } from "react-redux"
import Router from '../../../src/router/index.js'

const createMarkup = ({ pageName, store, preloadData }) => {
    return (
        <Provider store={store} >
            <Router initialPageName={pageName} preloadData={{ [pageName]: preloadData }} />
        </Provider>
    )
}

export {
    createMarkup
}


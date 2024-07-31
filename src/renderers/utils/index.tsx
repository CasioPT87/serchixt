import React from "react"
import { Provider } from "react-redux"
import Router from '../../router'
import { PageName as PageNameType, Store } from "../../types"

const createMarkup = ({ pageName, store, preloadData }: {
    pageName: PageNameType,
    store: Store,
    preloadData: any
}) => {
    return (
        <Provider store={store} >
            <Router initialPageName={pageName} preloadData={{ [pageName]: preloadData }} />
        </Provider>
    )
}

export {
    createMarkup
}


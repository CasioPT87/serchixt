import React from "react"
import { Provider } from "react-redux"
import Router from '../../router'
import { PageName as PageNameType, Store } from "../../types"

const createMarkup = ({ pageName, store, user, preloadData }: {
    pageName: PageNameType,
    store: Store,
    user: Object | null,
    preloadData: any
}) => {
    return (
        <Provider store={store} >
            <Router initialPageName={pageName} preloadData={{ [pageName]: preloadData }} user={user} />
        </Provider>
    )
}

export {
    createMarkup
}


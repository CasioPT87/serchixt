import React from 'react';
import { RootState, Action, Reducer, Dispatch } from './store'
import { setUpStore } from '../store';
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { UnknownAction } from 'redux'

const store = setUpStore()
type Store = typeof store
type AppDispatch = typeof store.dispatch | Dispatch

type PageName = 'home' | 'profile' | 'shipments'

type PageComponent = React.FC<any>
interface PageValue {
    path: string,
    pageComponent: PageComponent,
    isHome?: boolean,
} 

type Routes = {
    [key in PageName]: PageValue
}

type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
RootState,
unknown,
UnknownAction
>

type AppThunkDispatch = ThunkDispatch<RootState, any, UnknownAction>


export {
    PageName,
    Routes,
    RootState,
    AppDispatch,
    AppThunk,
    AppThunkDispatch,
    Action,
    Reducer,
    Store
}
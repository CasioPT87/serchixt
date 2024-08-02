import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { UnknownAction } from 'redux'
import { setUpStore } from '../../store';

interface RootState {
  article: {
    list: any[];
  };
  user: {
    data: string | null;
  };
}

type Action<T> = (payload: T) => ActionResponse<T>

interface ActionResponse<T> {
  type: string;
  payload: T;
}

type Reducer = (state: RootState[keyof RootState], action: ActionResponse<any>) => RootState[keyof RootState];

type Dispatch = (action: ActionResponse<any>, ...extraArgs: any[]) => UnknownAction

const store = setUpStore()
type Store = typeof store
type AppDispatch = typeof store.dispatch | Dispatch

type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
RootState,
unknown,
UnknownAction
>

type AppThunkDispatch = ThunkDispatch<RootState, any, any>

export { RootState, Action, Reducer, Dispatch, Store, AppDispatch, AppThunk, AppThunkDispatch };

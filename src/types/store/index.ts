import { UnknownAction } from 'redux'

interface RootState {
  article: {
    list: any[];
  };
  user: {
    list: any[];
  };
}

type Action<T> = (payload: T) => ActionResponse<T>

interface ActionResponse<T> {
  type: string;
  payload: T;
}

type Reducer = (state: RootState[keyof RootState], action: ActionResponse<any>) => RootState[keyof RootState];

type Dispatch = (action: ActionResponse<any>, ...extraArgs: any[]) => UnknownAction

export { RootState, Action, Reducer, Dispatch };

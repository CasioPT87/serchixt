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

export { RootState, Action, Reducer };

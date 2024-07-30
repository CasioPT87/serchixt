interface RootState {
  article: {
    list: any[];
  };
  user: {
    list: any[];
  };
}

interface Action<T> {
  (payload: T): {
    type: string;
    payload: T;
  };
}

type Reducer = (state: RootState, action: Action<Object>) => RootState

export { RootState, Action, Reducer };

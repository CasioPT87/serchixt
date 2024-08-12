import React, { useContext } from 'react';
import goTo from '../../utils/goTo';
import { PreloadDataContext } from '../../contexts';

const fakeArticlesFetch = (token: string | null) => async () => {
  const data = await fetch('https://catfact.ninja/breeds');
  const body = await data.json();
  return body.data;
};

type ResponseData = Array<{ breed: string; country: string; origin: string }>;

type Props = {
  preloadData?: ResponseData;
};

const Articles: React.FC<Props> & {
  preloadFn: (token: string | null) => () => Promise<ResponseData>;
} = () => {
  const breeds: ResponseData = useContext(PreloadDataContext);
  return (
    <div>
      <h1>Articles test page</h1>
      {!breeds && <h3>this could be a spinner</h3>}
      <div className="list">
        {breeds && (
          <ul>
            {breeds.map((breed) => {
              return (
                <li key={breed.breed}>
                  <p>{`articles from ${breed.country} to ${breed.origin}`}</p>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <button
        className="button-test"
        onClick={() => goTo({ pageName: 'home' })}
      >
        Go Home
      </button>
      <button
        className="button-test"
        onClick={() => goTo({ pageName: 'profile' })}
      >
        Go to Profile
      </button>
      <button
        className="button-test"
        onClick={() => goTo({ pageName: 'login' })}
      >
        Go to Login
      </button>
    </div>
  );
};

Articles.preloadFn = fakeArticlesFetch;

export default Articles;

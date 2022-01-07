import React, { Suspense, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './routes';
import { SWRConfig } from 'swr';
import { fetcher } from './utils/fetcher';

function Loading() {
  const [show, isShow] = useState(false);
  useEffect(() => {
    const time = setTimeout(() => {
      isShow(true);
    }, 150);
    return () => {
      clearTimeout(time);
    };
  }, []);
  console.log(11111);

  if (show) {
    return <div>loading...</div>;
  }
  return null;
}

function App() {
  return (
    <SWRConfig
      value={{
        fetcher: fetcher,
        suspense: true,
      }}
    >
      <Suspense fallback={<Loading />}>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </Suspense>
    </SWRConfig>
  );
}

export default App;

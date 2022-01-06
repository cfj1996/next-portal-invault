import React, { Suspense, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './routes';

function Loading() {
  const [show, isShow] = useState(false);
  useEffect(() => {
    const time = setTimeout(() => {
      isShow(true);
    }, 500);
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
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Suspense>
  );
}

export default App;

import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './routes';

function App() {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Suspense>
  );
}

export default App;

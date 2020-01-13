import React from 'react';
import './index.css';

import Editor from './pages/editor';
import Store from './stores/files';

function App() {
  return (
    <Store.Container>
      <Editor />
    </Store.Container>
  );
}

export default App;

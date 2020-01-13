import React from 'react';
import './index.css';

import Editor from './pages/editor';

// Import Undux store
import Store from './stores/files';

function App() {
  return (
    // Wrap undux store around Editor component to feed store values
    <Store.Container>
      <Editor />
    </Store.Container>
  );
}

export default App;

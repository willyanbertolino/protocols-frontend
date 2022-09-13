import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SharedLayoutGlobal, Protocols, Home } from './pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayoutGlobal />}>
          <Route index element={<Home />} />
          <Route path="protocolos" element={<Protocols />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

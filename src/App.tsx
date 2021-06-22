import { Home } from "./pages/Home";
import { NewRom } from "./pages/NewRom";

import { BrowserRouter, Route } from 'react-router-dom'

import './styles/global.scss'

function App() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Home} />
      <Route path="/rooms/new" exact component={NewRom} />
    </BrowserRouter>
  );
}
export default App;

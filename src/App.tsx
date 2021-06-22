import { Home } from "./pages/Home";
import { NewRom } from "./pages/NewRom";
import { BrowserRouter, Route } from 'react-router-dom'

import { AuthContextProvider } from './contexts/AuthContext'

import './styles/global.scss' 

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Route path="/" exact component={Home} />
        <Route path="/rooms/new" exact component={NewRom} />
      </AuthContextProvider>
    </BrowserRouter>
  );
}
export default App;

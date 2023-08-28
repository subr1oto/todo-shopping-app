// App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './helpers/context';
import TodoList from './components/TodoList';
import ShoppingCart from './components/ShoppingCart';
import WeatherDisplay from './components/WeatherDisplay';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';

const App = () => {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/about" Component={About} />
          <Route path="/contact" Component={Contact} />
        </Routes>
        <TodoList />
        <ShoppingCart />
        <WeatherDisplay />
      </Router>
    </AppProvider>
  );
};

export default App;
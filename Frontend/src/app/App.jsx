import './App.css';
import { RouterProvider } from 'react-router';
import router from './app.routes';
import ThemeToggle from './ThemeToggle';

const App = () => {
  return (
    <>
      <ThemeToggle />
      <RouterProvider router={router} />
    </>
  )
}

export default App
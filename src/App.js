import './App.css';
import BlogList from './components/BlogList/BlogList';
import Sidebar from './components/Sidebar/Sidebar';

function App() {
  return (
    <div className="App">
      <Sidebar />
      <BlogList />
    </div>
  );
}

export default App;

import BlogList from '../../components/BlogList/BlogList';
import Sidebar from '../../components/Sidebar/Sidebar';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <Sidebar />
      <BlogList />
    </div>
  );
}

export default Home;

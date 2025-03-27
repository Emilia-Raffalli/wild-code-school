import './App.css'
import { Routes, Route } from 'react-router';
import Layout from './pages/Layout';
import RecentAds from './components/RecentAds';
import AboutPage from './pages/AboutPage';
import AdDetailsPage from './pages/AdDetailsPage';
import NewAdForm from './pages/NewAdForm';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<RecentAds />} />
        {/* <Route path="/ads" element={<RecentAds />} />  */}
        <Route path="/ads" element={<RecentAds />} />
        <Route path="about" element = {<AboutPage/>} />
        <Route path="ad/:id" element = {<AdDetailsPage />} />
        <Route path="ad/new" element = {<NewAdForm />} />
        <Route path='admin' element = {<AdminPage />} />
      </Route>
    </Routes>
  );
}

export default App;

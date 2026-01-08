import { Outlet } from 'react-router-dom';
import Header from '@components/Header';

const DashboardLayout = () => {
  return (
    <main>
      <Header />
      <div className="container mt-8">
        <Outlet />
      </div>
    </main>
  )
}

export default DashboardLayout

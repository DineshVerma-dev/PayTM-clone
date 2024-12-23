import { Outlet } from 'react-router-dom';

export const Home = () => {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <Outlet /> {/* Renders child routes */}
    </div>
  );
};

import { useState } from 'react';
import { HomePage } from './HomePage';
import { LoginPage } from './LoginPage';
import { NextBackButtons } from './components/Button';

export function CreatePage() {
  const [currentPage, setCurrentPage] = useState('Home');

  // This method is checking to see what the value of `currentPage` is. Depending on the value of currentPage, we return the corresponding component to render.
  const renderPage = () => {
    if (currentPage === 'Home') {
      return <HomePage />;
    }
    if (currentPage === 'Login') {
      return <LoginPage />;
    }
  };

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <>
      {/* Here we are calling the renderPage method which will return a component  */}
      {renderPage()}
      <NextBackButtons currentPage={currentPage} handlePageChange={handlePageChange} />
    </>
  );
}

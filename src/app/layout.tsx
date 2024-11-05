"use client";

import { useState } from 'react';
import './globals.css';
import Header from './components/layoutComponents/header';
import Nav from './components/layoutComponents/nav';
import Login from './pages/login/login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './pages/register/register'; 

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (token: string) => {
    localStorage.setItem('authToken', token);
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <html lang="pt">
        <body className="flex flex-col min-h-screen">
          <Routes>

            <Route path="/" element={isAuthenticated ? (
              <>
                <Header />
                <div className="flex flex-1">
                  <Nav />
                  <main className="flex-1 p-4 overflow-y-auto">
                    {children}
                  </main>
                </div>
              </>
            ) : (
              <Login onLogin={handleLogin} />
            )} />

            <Route path="/register" element={<Register onRegister={handleLogin} />} />
          </Routes>
        </body>
      </html>
    </Router>
  );
}

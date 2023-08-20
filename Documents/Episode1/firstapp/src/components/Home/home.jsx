import React from 'react';
import './home.css';

function Home() {
  return (
    <div className="container">
      <header className="header">
        <div className="header-content">
          <h1>Welcome to Our Cool Website</h1>
          <p>Discover amazing content and services</p>
          <a href="/transactions" className="cta-button">Make Transaction</a>
        </div>
      </header>

      <main className="main-content">
        <section className="feature">
          <h2>Our Features</h2>
          <p>Learn about the great features we offer.</p>
          <ul>
            <li>Transactions</li>
            <li>Reports</li>
          </ul>
        </section>

      </main>

      <footer className="footer">
        <p>&copy; 2023 Cool Website. All rights reserved.</p>
        <p>Tresor Xavier</p>
      </footer>
    </div>
  );
}

export default Home;

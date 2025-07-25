import React from 'react';
import './styles/main.css';
import './styles/components.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>El Bethel Academy - Next-Generation Learning Platform</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <nav className="main-nav">
        <div className="nav-container">
          <div className="nav-left">
            <div className="logo-container">
              <Image src="/images/logo.png" alt="El Bethel Academy" className="nav-logo" width={40} height={40} />
              <span className="school-name">El Bethel Academy</span>
            </div>
          </div>

          <div className="nav-center">
            <div className="nav-links">
              <Link href="/" className="nav-link active">
                <i className="fas fa-home"></i> Home
              </Link>
              <Link href="/payments" className="nav-link">
                <i className="fas fa-credit-card"></i> Payments
              </Link>
              <Link href="/notifications" className="nav-link">
                <i className="fas fa-bell"></i> Notifications
                <span className="notification-badge">3</span>
              </Link>
              <Link href="/profile" className="nav-link">
                <i className="fas fa-user"></i> Profile
              </Link>
              <Link href="/settings" className="nav-link">
                <i className="fas fa-cog"></i> Settings
              </Link>
            </div>
          </div>

          <div className="nav-right">
            <div className="nav-actions">
              <button className="nav-action-btn theme-toggle" id="themeToggle">
                <i className="fas fa-sun"></i>
              </button>
              <div className="profile-dropdown">
                <button className="profile-btn" id="profileBtn">
                  <Image src="/images/placeholder-user.jpg" alt="User" className="profile-avatar" width={30} height={30} />
                  <span className="profile-name">Guest User</span>
                  <i className="fas fa-chevron-down"></i>
                </button>
                <div className="dropdown-menu" id="profileDropdown">
                  <Link href="/profile" className="dropdown-item">
                    <i className="fas fa-user"></i> Profile
                  </Link>
                  <Link href="/settings" className="dropdown-item">
                    <i className="fas fa-cog"></i> Settings
                  </Link>
                  <div className="dropdown-divider"></div>
                  <button className="dropdown-item" id="logoutBtn">
                    <i className="fas fa-sign-out-alt"></i> Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Add main content and footer in follow-ups to keep this modular */}
    </>
  );
}

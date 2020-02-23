import React from "react";

const Home = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        {/* Since we use router, it's advisable to use <Link> from React Router */}
        <a className="navbar-brand" href="/">
          Book World
        </a>

        {/* the toggle button will won't work as we do not import jQuery. Vanilla Bootstrap needs jQuery to work.
        We are using React. If you want the button to work it's better to use React-Bootstrap components rather than
        plain HTML tags with bootstrap classes. Try understanding the difference :) */}

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" href="/profile">
                Profile
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/signup">
                Register
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Home;

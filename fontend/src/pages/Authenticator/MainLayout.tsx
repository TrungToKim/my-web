import { NavLink, Outlet } from "react-router";
import { useMemo } from "react";
import reactLogo from "../../assets/react.svg";
import "./MainLayout.scss";

interface Nav {
  name: string;
  path: string;
}

export default function MainLayout() {
  const ListNav: Nav[] = useMemo(
    () => [
      { name: "itch.io", path: "itch-io" },
      { name: "Browse games", path: "games" },
      { name: "Games jams", path: "jams" },
      { name: "Upload Game", path: "devlops" },
      { name: "Developer Logs", path: "devlogs" },
      { name: "Community", path: "community" },
    ],
    [],
  );

  return (
    <div className="main-layout">
      <div className="nav-box">
        <div className="nav-logo">
          <NavLink to="/">
            <img src={reactLogo} alt="ReactLogo" />
          </NavLink>
        </div>
        <div className="nav-container">
          {ListNav.map((Nav) => {
            return (
              <div key={Nav.name}>
                <NavLink to={Nav.path}>{Nav.name}</NavLink>
              </div>
            );
          })}
        </div>
        <div className="nav-search">
          <input
            type="text"
            placeholder="Search for games, jams, tags or creators"
          />
        </div>
      </div>

      <main className="main-content">
        <Outlet />
      </main>

      <div className="main-footer">
        <footer className="main-contact">
          <section>
            <div className="About">
              <h4>About</h4>
              <p>123@gmail.com</p>
              <p>86 Uptha Road, Casco, Maine, 04015, USA</p>
              <p>1111222233</p>
            </div>
            <div className="Contact">
              <h4>Group</h4>
              <p>Team Alpha</p>
              <p>Project Beta</p>
            </div>
            <div className="Group">
              <h4>Contact</h4>
              <p>Discord</p>
              <p>Facebook</p>
              <p>GitHub</p>
            </div>
          </section>
        </footer>
      </div>
    </div>
  );
}

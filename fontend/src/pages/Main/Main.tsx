import "./Main.sass";
import { NavLink, Outlet } from "react-router";

interface Type {
  name: string;
  path: string;
}

const ListType: Type[] = [
  { name: "Browser", path: "/Browser" },
  { name: "Windows", path: "/Windows" },
  { name: "MacOs", path: "/MacOs" },
  { name: "Linux", path: "/Linux" },
  { name: "BrowserAll", path: "/BrowserAll" },
];

export default function Main() {
  return (
    <div className="main">
      <div className="main-header">
        <header className="main-nav">
          <div className="main-search-box">
            <input type="text" placeholder="Search here" />
          </div>

          <div className="nav-container">
            <div className="nav-container-type">
              {ListType.map((Type) => (
                <div className="type-name" key={Type.name}>
                  <NavLink to={Type.path}>{Type.name}</NavLink>
                </div>
              ))}
            </div>
            <div className="nav-container-creator"></div>
            <div className="nav-container-about"></div>
          </div>
        </header>
      </div>
      <div className="main-container">
        <div className="main-content">
          <section className="main-content">
            <Outlet />
          </section>
        </div>
        {/* <div className="main-footer" style={{ background: "#f9f9f9", padding: "30px 20px", borderTop: "1px solid #eee" }}>
                    <footer className="main-contact">
                        <section style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
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
                </div> */}
      </div>
    </div>
  );
}

import { NavLink, Outlet } from "react-router";
import reactLogo from "../../assets/react.svg";

interface Nav {
  name: string;
  path: string;
}

export default function MainLayout() {
  const ListNav: Nav[] = [
    { name: "itch.io", path: "itch-io" },
    { name: "Browse games", path: "games" },
    { name: "Games jams", path: "jams" },
    { name: "Upload Game", path: "devlops" },
    { name: "Developer Logs", path: "devlogs" },
    { name: "Community", path: "community" },
  ];
  return (
    <>
      <div
        className="nav-box"
        style={{
          display: "flex",
          gap: "15px",
          height: "20px",
          alignItems: "center",
          paddingBottom: "10px",
        }}
      >
        <div className="nav-logo">
          <NavLink to="/Home">
            <img
              src={reactLogo}
              alt="ReactLogo"
              style={{ width: "25px", height: "25px" }}
            />
          </NavLink>
        </div>
        <div
          className="nav-container"
          style={{
            display: "flex",
            textAlign: "center",
            gap: "10px",
            float: "left",
            alignItems: "center",
            paddingBottom: "10px",
          }}
        >
          {ListNav.map((Nav) => {
            return (
              <div key={Nav.name} style={{ paddingTop: "10px" }}>
                <NavLink
                  to={Nav.path}
                  style={({ isActive }) => ({
                    textDecoration: "none",
                    padding: "5px",
                    color: isActive ? "White" : "Black",
                    fontSize: "16px",
                    alignItems: "center",
                    backgroundColor: isActive ? "Gray" : "White",
                  })}
                >
                  {Nav.name}
                </NavLink>
              </div>
            );
          })}
        </div>
        <div style={{ padding: "0px 4px 0px 4px" }}>
          <input
            type="text"
            placeholder="Search for games,jams,tags or creators"
            style={{
              width: "25vw",
              padding: "0px 4px 0px 10px",
              height: "16px",
              fontSize: "12px",
            }}
          />
        </div>
      </div>
      <main style={{ flex: 1, padding: "20px" }}>
        <Outlet />
      </main>
      <div
        className="main-footer"
        style={{
          background: "#f9f9f9",
          padding: "30px 20px",
          borderTop: "1px solid #eee",
        }}
      >
        <footer className="main-contact">
          <section
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
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
    </>
  );
}

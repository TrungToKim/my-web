import { NavLink } from "react-router";
import reactLogo from "../../assets/react.svg";

interface Nav {
  name: string;
  path: string;
}

export default function Navbar() {
  const ListNav: Nav[] = [
    { name: "itch.io", path: "/itch.io" },
    { name: "Browse games", path: "/Games" },
    { name: "Games jams", path: "/Jams" },
    { name: "Upload Game", path: "/Devlops" },
    { name: "Developer Logs", path: "/Devlogs" },
    { name: "Community", path: "/Community" },
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
    </>
  );
}

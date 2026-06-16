export default function Footer() {
  return (
    <>
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

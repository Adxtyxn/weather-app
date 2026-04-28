import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <h1 className="hero-title">
        WEATHER. <br /> FEEL EVERY CLICK.
      </h1>

      <button className="cta-btn" onClick={() => navigate("/map")}>
        Explore Map →
      </button>
    </div>
  );
}

export default Home;
import Navbar from "../Navbar/Navbar";
import "./Header.css";

export default function Header() {
  return (
    <header className="fa-header">
      <div className="fa-header__inner">
        <Navbar />
      </div>
    </header>
  );
}

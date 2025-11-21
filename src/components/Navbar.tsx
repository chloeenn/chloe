import "./Navbar.css";

interface NavItem {
  id: string;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: "hero", label: "☾" },
  { id: "about", label: "about me." },
  { id: "experience", label: "experience." },
  { id: "projects", label: "projects." },
  { id: "contact", label: "contact." },
];

export default function Navbar() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="nav-header">
      <nav className="nav-container">
        <ul className="nav-list">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <button className="nav-link" onClick={() => scrollTo(item.id)}>
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

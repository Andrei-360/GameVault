export default function Sidebar() {
  return (
    <aside className="panel sidebar-panel">
      <h3>Categorii</h3>
      <ul className="category-list">
        <li className="category-item active">
          <span className="cat-name">Toate jocurile</span>
          <span className="cat-count">(3)</span>
        </li>
        <li className="category-item">
          <span className="cat-name">Tactical RTS</span>
          <span className="cat-count">(1)</span>
        </li>
        <li className="category-item">
          <span className="cat-name">Sci-Fi RTS</span>
          <span className="cat-count">(2)</span>
        </li>
        <li className="category-item">
          <span className="cat-name">Shootere (FPS)</span>
          <span className="cat-count">(0)</span>
        </li>
        <li className="category-item">
          <span className="cat-name">RPG & Aventură</span>
          <span className="cat-count">(0)</span>
        </li>
        <li className="category-item">
          <span className="cat-name">Simulatoare</span>
          <span className="cat-count">(0)</span>
        </li>
      </ul>

      <hr className="sidebar-divider" />

      <h3>Favorite</h3>
      <ul className="quick-games-list">
        <li className="quick-game-item">WARNO</li>
        <li className="quick-game-item">StarCraft II</li>
        <li className="quick-game-item">Halo Wars 2</li>
      </ul>
    </aside>
  );
}
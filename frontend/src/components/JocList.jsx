import JocCard from "./JocCard.jsx";

export default function JocList({ jocuri, onToggle, onDelete, onOpenArcade }) {
  if (jocuri.length === 0) {
    return <p className="empty">Nu există niciun joc în colecție.</p>;
  }

  return (
    <ul className="item-list">
      {jocuri.map((joc) => (
        <JocCard
          key={joc.id}
          joc={joc}
          onToggle={onToggle}
          onDelete={onDelete}
          onOpenArcade={onOpenArcade}
        />
      ))}
    </ul>
  );
}
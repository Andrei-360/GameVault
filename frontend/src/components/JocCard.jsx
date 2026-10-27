import { useState } from "react";

const CLASE_SPECIFICE = {
  WARNO: "card-warno",
  "StarCraft II": "card-sc2",
  "Halo Wars 2": "card-halo"
};

function adaugaAutoplay(url) {
  if (!url) return "";
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}autoplay=1`;
}

export default function JocCard({ joc, onToggle, onDelete, onOpenArcade }) {
  const [deschis, setDeschis] = useState(false);
  const [ostDeschis, setOstDeschis] = useState(false);
  const [trailerDeschis, setTrailerDeschis] = useState(false);

  const clasaSpecifica = CLASE_SPECIFICE[joc.titlu] || "";
  const clasaTerminat = joc.terminat ? "done" : "";
  const clasaCard = `item-card ${clasaSpecifica} ${clasaTerminat}`.trim();

  return (
    <li className={clasaCard}>
      {/* 1. Rândul principal cu datele jocului */}
      <div className="card-top">
        <label className="card-main">
          <input
            type="checkbox"
            checked={joc.terminat}
            onChange={() => onToggle(joc.id)}
          />
          <div className="card-info">
            <h3>{joc.titlu}</h3>
            <span className={`badge badge-${joc.platforma.toLowerCase()}`}>
              {joc.platforma}
            </span>
            <p className="game-details">
              {joc.expansiuni ? `Expansiuni: ${joc.expansiuni}` : `Gen: ${joc.gen}`}
            </p>
          </div>
        </label>

        <div className="card-actions">
          <span className="status">
            {joc.terminat ? "Terminat" : "În desfășurare"}
          </span>
          <button
            type="button"
            className="btn-danger"
            onClick={() => onDelete(joc.id)}
            aria-label={`Șterge ${joc.titlu}`}
          >
            Șterge
          </button>
          <button
            type="button"
            className={`btn-expand ${deschis ? "open" : ""}`}
            onClick={() => {
              setDeschis((prev) => !prev);
              if (deschis) {
                setOstDeschis(false);
                setTrailerDeschis(false);
              }
            }}
            aria-label="Afișează detalii media"
          >
            ▼
          </button>
        </div>
      </div>

      {/* 2. Zona expandabilă a cardului */}
      {deschis && (
        <div className="card-expanded-media">
          {/* CĂSUȚA 1: TRAILER OFICIAL */}
          {joc.trailer && (
            <div className="media-toggle-box">
              <div className="toggle-box-header">
                <div className="toggle-box-info">
                  <span className="toggle-box-icon">🎬</span>
                  <span className="toggle-box-title">
                    <strong>Trailer oficial:</strong> {joc.titlu}
                  </span>
                </div>

                <button
                  type="button"
                  className={`btn-media-toggle ${trailerDeschis ? "active" : ""}`}
                  onClick={() => setTrailerDeschis((prev) => !prev)}
                >
                  <span>Vezi Trailer</span>
                  <span className="toggle-arrow">{trailerDeschis ? "▲" : "▼"}</span>
                </button>
              </div>

              {trailerDeschis && (
                <div className="media-player-container">
                  <div className="media-video-wrapper">
                    <iframe
                      src={adaugaAutoplay(joc.trailer)}
                      title={`Trailer ${joc.titlu}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* CĂSUȚA 2: SOUNDTRACK / OST */}
          {joc.soundtrack && (
            <div className="media-toggle-box">
              <div className="toggle-box-header">
                <div className="toggle-box-info">
                  <span className="toggle-box-icon">🎵</span>
                  <span className="toggle-box-title">
                    <strong>OST:</strong> {joc.soundtrack}
                  </span>
                </div>

                {joc.ostEmbed && (
                  <button
                    type="button"
                    className={`btn-media-toggle ${ostDeschis ? "active" : ""}`}
                    onClick={() => setOstDeschis((prev) => !prev)}
                  >
                    <span>Ascultă OST</span>
                    <span className="toggle-arrow">{ostDeschis ? "▲" : "▼"}</span>
                  </button>
                )}
              </div>

              {ostDeschis && joc.ostEmbed && (
                <div className="media-player-container">
                  <div className="media-video-wrapper">
                    <iframe
                      src={adaugaAutoplay(joc.ostEmbed)}
                      title={`OST ${joc.titlu}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* EASTER EGG ASCUNS: Vizibil DOAR pe cardul StarCraft II */}
          {joc.titlu === "StarCraft II" && (
            <div className="easter-egg-marine-wrap">
              <button
                type="button"
                className="btn-marine-easter-egg"
                onClick={onOpenArcade}
                title="You want a piece of me, boy? (Lansează Terran Defense)"
              >
                <img
                  src="/img/marine-starcraft_tuff.gif"
                  alt="Terran Marine"
                  className="marine-sprite"
                />
                <span className="marine-tooltip">Terran Defense 🕹️</span>
              </button>
            </div>
          )}
        </div>
      )}
    </li>
  );
}
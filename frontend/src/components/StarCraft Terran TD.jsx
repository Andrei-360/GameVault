import { useEffect, useRef, useState } from "react";

const TURNURI_CONFIG = {
  marine: { nume: "Marine", cost: 100, raza: 95, cadenta: 18, damage: 14, culoare: "#00d2ff" },
  firebat: { nume: "Firebat", cost: 150, raza: 65, cadenta: 8, damage: 6, culoare: "#e11d74", splash: true },
  marauder: { nume: "Marauder", cost: 220, raza: 120, cadenta: 45, damage: 45, culoare: "#f59e0b", slow: true }
};

const DRUM = [
  { x: 0, y: 120 },
  { x: 180, y: 120 },
  { x: 180, y: 260 },
  { x: 420, y: 260 },
  { x: 420, y: 100 },
  { x: 620, y: 100 },
  { x: 620, y: 320 },
  { x: 750, y: 320 }
];

export default function TerranDefense({ onClose }) {
  const canvasRef = useRef(null);
  const [tipSelectat, setTipSelectat] = useState("marine");
  const [minerale, setMinerale] = useState(350);
  const [viataBaza, setViataBaza] = useState(20);
  const [val, setVal] = useState(1);
  const [scor, setScor] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const gameRef = useRef({
    turnuri: [],
    inamici: [],
    proiectile: [],
    frame: 0,
    viata: 20,
    minerale: 350,
    val: 1,
    scor: 0,
    ruleaza: true
  });

  gameRef.current.viata = viataBaza;
  gameRef.current.minerale = minerale;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;

    const g = gameRef.current;
    g.ruleaza = true;

    function genereazaInamic() {
      const tipZerg = Math.random() > 0.3 ? "zergling" : "roach";
      g.inamici.push({
        x: DRUM[0].x,
        y: DRUM[0].y,
        punctCurent: 0,
        tip: tipZerg,
        hp: tipZerg === "zergling" ? 40 + g.val * 8 : 110 + g.val * 22,
        hpMax: tipZerg === "zergling" ? 40 + g.val * 8 : 110 + g.val * 22,
        viteza: tipZerg === "zergling" ? 1.8 : 1.1,
        raza: tipZerg === "zergling" ? 9 : 14,
        culoare: tipZerg === "zergling" ? "#a855f7" : "#10b981",
        recompensa: tipZerg === "zergling" ? 25 : 50
      });
    }

    function loop() {
      if (!g.ruleaza) return;
      g.frame++;

      if (g.frame % Math.max(30, 90 - g.val * 5) === 0) {
        genereazaInamic();
      }

      ctx.fillStyle = "#0a0714";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = "rgba(0, 210, 255, 0.25)";
      ctx.lineWidth = 26;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      DRUM.forEach((pt, i) => {
        if (i === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      });
      ctx.stroke();

      ctx.fillStyle = "#a855f7";
      ctx.font = "bold 11px sans-serif";
      ctx.fillText("SPAWN ZERG", 8, 100);
      ctx.fillStyle = "#00d2ff";
      ctx.fillText("BAZA TERRAN", 660, 305);

      for (let i = g.inamici.length - 1; i >= 0; i--) {
        const inamic = g.inamici[i];
        const tinta = DRUM[inamic.punctCurent + 1];

        if (tinta) {
          const dx = tinta.x - inamic.x;
          const dy = tinta.y - inamic.y;
          const dist = Math.hypot(dx, dy);

          if (dist < inamic.viteza) {
            inamic.punctCurent++;
          } else {
            inamic.x += (dx / dist) * inamic.viteza;
            inamic.y += (dy / dist) * inamic.viteza;
          }
        } else {
          g.viata -= 1;
          setViataBaza(g.viata);
          g.inamici.splice(i, 1);

          if (g.viata <= 0) {
            setGameOver(true);
            g.ruleaza = false;
            return;
          }
          continue;
        }

        ctx.fillStyle = inamic.culoare;
        ctx.beginPath();
        ctx.arc(inamic.x, inamic.y, inamic.raza, 0, Math.PI * 2);
        ctx.fill();

        const lungimeHp = 22;
        const hpPct = Math.max(0, inamic.hp / inamic.hpMax);
        ctx.fillStyle = "rgba(0,0,0,0.6)";
        ctx.fillRect(inamic.x - lungimeHp / 2, inamic.y - inamic.raza - 6, lungimeHp, 4);
        ctx.fillStyle = hpPct > 0.5 ? "#22c55e" : "#ef4444";
        ctx.fillRect(inamic.x - lungimeHp / 2, inamic.y - inamic.raza - 6, lungimeHp * hpPct, 4);
      }

      g.turnuri.forEach((turn) => {
        turn.cooldown = (turn.cooldown || 0) + 1;

        let tintaInRaza = null;
        for (let inamic of g.inamici) {
          const dist = Math.hypot(inamic.x - turn.x, inamic.y - turn.y);
          if (dist <= turn.raza) {
            tintaInRaza = inamic;
            break;
          }
        }

        if (tintaInRaza && turn.cooldown >= turn.cadenta) {
          turn.cooldown = 0;
          if (turn.splash) {
            ctx.fillStyle = "rgba(225, 29, 116, 0.4)";
            ctx.beginPath();
            ctx.arc(turn.x, turn.y, turn.raza, 0, Math.PI * 2);
            ctx.fill();

            g.inamici.forEach((inamic) => {
              if (Math.hypot(inamic.x - turn.x, inamic.y - turn.y) <= turn.raza) {
                inamic.hp -= turn.damage;
              }
            });
          } else {
            g.proiectile.push({
              x: turn.x,
              y: turn.y,
              tinta: tintaInRaza,
              culoare: turn.culoare,
              damage: turn.damage,
              slow: turn.slow,
              viteza: turn.slow ? 5 : 8
            });
          }
        }

        ctx.fillStyle = turn.culoare;
        ctx.beginPath();
        ctx.arc(turn.x, turn.y, 14, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = "#000000";
        ctx.font = "bold 10px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(turn.nume[0], turn.x, turn.y);
      });

      for (let pIdx = g.proiectile.length - 1; pIdx >= 0; pIdx--) {
        const p = g.proiectile[pIdx];
        if (!g.inamici.includes(p.tinta)) {
          g.proiectile.splice(pIdx, 1);
          continue;
        }

        const dx = p.tinta.x - p.x;
        const dy = p.tinta.y - p.y;
        const dist = Math.hypot(dx, dy);

        if (dist < 8) {
          p.tinta.hp -= p.damage;
          if (p.slow) {
            p.tinta.viteza = Math.max(0.6, p.tinta.viteza * 0.7);
          }
          g.proiectile.splice(pIdx, 1);
        } else {
          p.x += (dx / dist) * p.viteza;
          p.y += (dy / dist) * p.viteza;

          ctx.fillStyle = p.culoare;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.slow ? 5 : 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      for (let i = g.inamici.length - 1; i >= 0; i--) {
        if (g.inamici[i].hp <= 0) {
          g.minerale += g.inamici[i].recompensa;
          g.scor += g.inamici[i].recompensa;
          setMinerale(g.minerale);
          setScor(g.scor);
          g.inamici.splice(i, 1);
        }
      }

      if (g.frame % 600 === 0) {
        g.val += 1;
        setVal(g.val);
      }

      animId = requestAnimationFrame(loop);
    }

    animId = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(animId);
      g.ruleaza = false;
    };
  }, []);

  function handleCanvasClick(e) {
    if (gameOver) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const turnConfig = TURNURI_CONFIG[tipSelectat];
    if (minerale < turnConfig.cost) return;

    for (let i = 0; i < DRUM.length - 1; i++) {
      const p1 = DRUM[i];
      const p2 = DRUM[i + 1];
      const dX = p2.x - p1.x;
      const dY = p2.y - p1.y;
      const l2 = dX * dX + dY * dY;
      const t = Math.max(0, Math.min(1, ((x - p1.x) * dX + (y - p1.y) * dY) / l2));
      const dist = Math.hypot(x - (p1.x + t * dX), y - (p1.y + t * dY));
      if (dist < 26) return;
    }

    gameRef.current.turnuri.push({
      x,
      y,
      cooldown: 0,
      ...turnConfig
    });

    setMinerale((prev) => prev - turnConfig.cost);
  }

  return (
    <div className="arcade-modal-overlay">
      <div className="arcade-modal">
        <div className="arcade-header">
          <h3>⚡ SC Terran Defense: Sector Koprulu</h3>
          <button type="button" className="btn-arcade-close" onClick={onClose}>
            ✕ Închide
          </button>
        </div>

        <div className="arcade-stats-bar">
          <span>💎 Minerale: <strong>{minerale}</strong></span>
          <span>🛡️ Baza: <strong>{viataBaza} HP</strong></span>
          <span>🌊 Val: <strong>{val}</strong></span>
          <span>🏆 Scor: <strong>{scor}</strong></span>
        </div>

        <div className="arcade-controls">
          <span className="controls-label">Alege unitate de plasat:</span>
          {Object.entries(TURNURI_CONFIG).map(([cheie, t]) => (
            <button
              key={cheie}
              type="button"
              className={`btn-unit-select ${tipSelectat === cheie ? "selected" : ""}`}
              onClick={() => setTipSelectat(cheie)}
              style={{ borderColor: t.culoare }}
            >
              <strong>{t.nume}</strong> ({t.cost} min)
            </button>
          ))}
        </div>

        <div className="arcade-canvas-wrap">
          <canvas
            ref={canvasRef}
            width={750}
            height={380}
            onClick={handleCanvasClick}
          />

          {gameOver && (
            <div className="arcade-game-over">
              <h4>Baza a căzut! Zergii au invadat.</h4>
              <p>Scor final: {scor}</p>
              <button
                type="button"
                className="btn-arcade-restart"
                onClick={() => {
                  window.location.reload();
                }}
              >
                Reîncearcă
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
import { useEffect, useRef, useState } from "react";

const TURNURI_CONFIG = {
  marine: { nume: "Marine", cost: 100, raza: 105, cadenta: 34, damage: 25, culoare: "#00d2ff" },
  firebat: { nume: "Firebat", cost: 150, raza: 100, cadenta: 80, damage: 45, culoare: "#e11d74", splash: true },
  marauder: { nume: "Marauder", cost: 220, raza: 135, cadenta: 42, damage: 48, culoare: "#f59e0b", slow: true }
};

const FIREBAT_SOUND_PATHS = [
  "/sounds/firebat_fire1.wav",
  "/sounds/firebat_fire2.wav"
];

class FirebatAudioManager {
  constructor() {
    this.soundPools = [[], []];
    this.poolPointers = [0, 0];
    this.currentTrackIndex = 0;

    FIREBAT_SOUND_PATHS.forEach((path, soundIdx) => {
      for (let i = 0; i < 4; i++) {
        const audio = new Audio(path);
        audio.preload = "auto";
        audio.volume = 0.12;
        this.soundPools[soundIdx].push(audio);
      }
    });
  }

  playAttack() {
    const track = this.currentTrackIndex;
    const pool = this.soundPools[track];
    const pointer = this.poolPointers[track];

    const audio = pool[pointer];
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(() => {});
    }

    this.poolPointers[track] = (pointer + 1) % 4;
    this.currentTrackIndex = (this.currentTrackIndex + 1) % 2;
  }
}

const firebatAudio = new FirebatAudioManager();

const MARINE_IDLE_FILES = {
  up:         "/img/marine/marine_sprite_01.png",
  up_right:   "/img/marine/marine_sprite_02.png",
  right:      "/img/marine/marine_sprite_03.png",
  down_right: "/img/marine/marine_sprite_04.png",
  down:       "/img/marine/marine_sprite_05.png",
  down_left:  "/img/marine/marine_sprite_06.png",
  left:       "/img/marine/marine_sprite_07.png",
  up_left:    "/img/marine/marine_sprite_08.png"
};

const MARINE_FIRING_FILES = {
  up:         "/img/marine_firing/marine_firing_01.png",
  up_right:   "/img/marine_firing/marine_firing_02.png",
  right:      "/img/marine_firing/marine_firing_03.png",
  down_right: "/img/marine_firing/marine_firing_04.png",
  down:       "/img/marine_firing/marine_firing_05.png",
  down_left:  "/img/marine_firing/marine_firing_06.png",
  left:       "/img/marine_firing/marine_firing_07.png",
  up_left:    "/img/marine_firing/marine_firing_08.png"
};

const FIREBAT_IDLE_FILES = {
  up:         "/img/firebat_idle/firebat_01.png",
  up_right:   "/img/firebat_idle/firebat_08.png",
  right:      "/img/firebat_idle/firebat_03.png",
  down_right: "/img/firebat_idle/firebat_04.png",
  down:       "/img/firebat_idle/firebat_05.png",
  down_left:  "/img/firebat_idle/firebat_06.png",
  left:       "/img/firebat_idle/firebat_07.png",
  up_left:    "/img/firebat_idle/firebat_02.png"
};

const FIREBAT_FIRING_FILES = {
  up:         "/img/firebat_firing/firebat_01.png",
  up_right:   "/img/firebat_firing/firebat_08.png",
  right:      "/img/firebat_firing/firebat_03.png",
  down_right: "/img/firebat_firing/firebat_04.png",
  down:       "/img/firebat_firing/firebat_05.png",
  down_left:  "/img/firebat_firing/firebat_06.png",
  left:       "/img/firebat_firing/firebat_07.png",
  up_left:    "/img/firebat_firing/firebat_02.png"
};

const ZERGLING_MOVE1_FILES = {
  up:    "/img/zergling_move1/01_N.png",
  down:  "/img/zergling_move1/05_S.png",
  left:  "/img/zergling_move1/03_W.png",
  right: "/img/zergling_move1/07_E.png"
};

const ZERGLING_MOVE2_FILES = {
  up:    "/img/zergling_move2/01_N.png",
  down:  "/img/zergling_move2/05_S.png",
  left:  "/img/zergling_move2/03_V.png",
  right: "/img/zergling_move2/07_E.png"
};

function playSound(path, volume = 0.5) {
  try {
    const snd = new Audio(path);
    snd.volume = volume;
    snd.play().catch((err) => {
      console.warn("Eroare la redarea sunetului:", err);
    });
  } catch (e) {
    console.warn("Eroare audio:", e);
  }
}

function getDirectionKey(angleDeg) {
  if (angleDeg >= 337.5 || angleDeg < 22.5) return "right";
  if (angleDeg >= 22.5 && angleDeg < 67.5) return "down_right";
  if (angleDeg >= 67.5 && angleDeg < 112.5) return "down";
  if (angleDeg >= 112.5 && angleDeg < 157.5) return "down_left";
  if (angleDeg >= 157.5 && angleDeg < 202.5) return "left";
  if (angleDeg >= 202.5 && angleDeg < 247.5) return "up_left";
  if (angleDeg >= 247.5 && angleDeg < 292.5) return "up";
  return "up_right";
}

const DRUM = [
  { x: 0, y: 400 },
  { x: 380, y: 400 },
  { x: 380, y: 200 },
  { x: 150, y: 200 },
  { x: 150, y: 620 },
  { x: 520, y: 620 },
  { x: 520, y: 350 },
  { x: 800, y: 350 },
  { x: 800, y: 200 },
  { x: 1020, y: 200 },
  { x: 1020, y: 550 },
  { x: 1200, y: 550 }
];

export default function TerranDefense({ onClose }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const marineIdleImagesRef = useRef({});
  const marineFiringImagesRef = useRef({});
  const firebatIdleImagesRef = useRef({});
  const firebatFiringImagesRef = useRef({});
  
  const zerglingMove1ImagesRef = useRef({});
  const zerglingMove2ImagesRef = useRef({});

  const mousePosRef = useRef({ x: -100, y: -100, inCanvas: false });
  const bgMusicRef = useRef(null);
  
  const mapBgImageRef = useRef(null);
  const roadTextureImgRef = useRef(null);
  const roadPatternRef = useRef(null);

  const lastMarineSoundTimeRef = useRef(0);
  const lastFirebatReadySoundTimeRef = useRef(0);
  const lastMarauderReadySoundTimeRef = useRef(0);
  const ultimulValRedatRef = useRef(0);

  const [tipSelectat, setTipSelectat] = useState("marine");
  const [minerale, setMinerale] = useState(250);
  const [viataBaza, setViataBaza] = useState(20);
  const [val, setVal] = useState(1);
  const [scor, setScor] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const tipSelectatRef = useRef(tipSelectat);
  tipSelectatRef.current = tipSelectat;

  const gameRef = useRef({
    turnuri: [],
    inamici: [],
    proiectile: [],
    frame: 0,
    viata: 20,
    minerale: 250,
    val: 1,
    scor: 0,
    ruleaza: true
  });

  gameRef.current.viata = viataBaza;
  gameRef.current.minerale = minerale;

  const toggleFullscreen = () => {
    const elem = containerRef.current;
    if (!elem) return;

    if (!document.fullscreenElement) {
      elem.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch((err) => {
        console.warn("Eroare la activarea fullscreen:", err);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      }).catch(() => {});
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    let isActive = true;
    const bgAudio = new Audio("/sounds/music/05. Terran Two.mp3");
    bgAudio.volume = 0.25;
    bgAudio.loop = true;
    bgMusicRef.current = bgAudio;

    const startOnUserAction = () => {
      if (!isActive) return;
      bgAudio.play().catch(() => {});
      window.removeEventListener("click", startOnUserAction);
    };

    const playPromise = bgAudio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        if (isActive) {
          window.addEventListener("click", startOnUserAction);
        }
      });
    }

    return () => {
      isActive = false;
      window.removeEventListener("click", startOnUserAction);
      bgAudio.pause();
      bgAudio.currentTime = 0;
      bgAudio.src = "";
      bgMusicRef.current = null;
    };
  }, []);

  useEffect(() => {
    const bgImg = new Image();
    bgImg.src = "/img/maps/map1_bg.jpeg";
    mapBgImageRef.current = bgImg;

    const roadImg = new Image();
    roadImg.src = "/img/texturi/road_texture_map1.jpeg";
    roadImg.onload = () => {
      roadTextureImgRef.current = roadImg;
    };

    const loadGroup = (files, targetRef) => {
      const loaded = {};
      Object.entries(files).forEach(([key, src]) => {
        const img = new Image();
        img.src = src;
        img.onload = () => { loaded[key] = img; };
        img.onerror = () => { console.warn(`Nu s-a putut încărca: ${src}`); };
      });
      targetRef.current = loaded;
    };

    loadGroup(MARINE_IDLE_FILES, marineIdleImagesRef);
    loadGroup(MARINE_FIRING_FILES, marineFiringImagesRef);
    loadGroup(FIREBAT_IDLE_FILES, firebatIdleImagesRef);
    loadGroup(FIREBAT_FIRING_FILES, firebatFiringImagesRef);
    loadGroup(ZERGLING_MOVE1_FILES, zerglingMove1ImagesRef);
    loadGroup(ZERGLING_MOVE2_FILES, zerglingMove2ImagesRef);
  }, []);

  function estePozitieValida(x, y) {
    for (let i = 0; i < DRUM.length - 1; i++) {
      const p1 = DRUM[i];
      const p2 = DRUM[i + 1];
      const dX = p2.x - p1.x;
      const dY = p2.y - p1.y;
      const l2 = dX * dX + dY * dY;
      const t = Math.max(0, Math.min(1, ((x - p1.x) * dX + (y - p1.y) * dY) / l2));
      const dist = Math.hypot(x - (p1.x + t * dX), y - (p1.y + t * dY));
      if (dist < 32) return false;
    }

    for (const turn of gameRef.current.turnuri) {
      if (Math.hypot(x - turn.x, y - turn.y) < 35) return false;
    }

    return true;
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;

    const g = gameRef.current;
    g.ruleaza = true;

    if (ultimulValRedatRef.current !== 1) {
      ultimulValRedatRef.current = 1;
      playSound("/sounds/zergling_wave_start.wav", 0.5);
    }

    function genereazaInamic() {
      const tipZerg = Math.random() > 0.35 ? "zergling" : "hydralisk";
      const vitezaInitiala = tipZerg === "zergling" ? 2.2 : 0.9;

      g.inamici.push({
        id: Date.now() + Math.random(),
        x: DRUM[0].x,
        y: DRUM[0].y,
        punctCurent: 0,
        ultimulPunctCurent: -1,
        dirSegment: "down",
        tip: tipZerg,
        hp: tipZerg === "zergling" ? 40 + g.val * 8 : 115 + g.val * 20,
        hpMax: tipZerg === "zergling" ? 40 + g.val * 8 : 115 + g.val * 20,
        vitezaBase: vitezaInitiala,
        viteza: vitezaInitiala,
        raza: tipZerg === "zergling" ? 14 : 16,
        culoare: tipZerg === "zergling" ? "#a855f7" : "#10b981",
        recompensa: tipZerg === "zergling" ? 15 : 35
      });
    }

    function loop() {
      if (!g.ruleaza) return;
      g.frame++;

      if (g.frame % Math.max(35, 95 - g.val * 4) === 0) {
        genereazaInamic();
      }

      // 1. Randare fundal hartă
      const bgImg = mapBgImageRef.current;
      if (bgImg && bgImg.complete && bgImg.naturalWidth !== 0) {
        ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
      } else {
        ctx.fillStyle = "#0a0714";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // 2. Randare drum texturat
      const roadImg = roadTextureImgRef.current;
      if (roadImg && roadImg.complete && roadImg.naturalWidth !== 0 && !roadPatternRef.current) {
        roadPatternRef.current = ctx.createPattern(roadImg, 'repeat');
      }

      ctx.save();
      if (roadPatternRef.current) {
        ctx.strokeStyle = roadPatternRef.current;
      } else {
        ctx.strokeStyle = "rgba(0, 210, 255, 0.4)";
      }
      ctx.lineWidth = 36;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      DRUM.forEach((pt, i) => {
        if (i === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      });
      ctx.stroke();
      ctx.restore();

      // 3. Indicator plasare turn (hover)
      if (mousePosRef.current.inCanvas) {
        const mx = mousePosRef.current.x;
        const my = mousePosRef.current.y;
        const cfg = TURNURI_CONFIG[tipSelectatRef.current];
        const valid = estePozitieValida(mx, my) && g.minerale >= cfg.cost;

        ctx.save();
        ctx.beginPath();
        ctx.arc(mx, my, cfg.raza, 0, Math.PI * 2);
        ctx.fillStyle = valid ? "rgba(0, 210, 255, 0.08)" : "rgba(239, 68, 68, 0.12)";
        ctx.fill();
        ctx.strokeStyle = valid ? "rgba(0, 210, 255, 0.35)" : "rgba(239, 68, 68, 0.45)";
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(mx, my, 15, 0, Math.PI * 2);
        ctx.fillStyle = valid ? "rgba(34, 197, 94, 0.4)" : "rgba(239, 68, 68, 0.4)";
        ctx.fill();
        ctx.restore();
      }

      // 4. Randare inamici
      for (let i = g.inamici.length - 1; i >= 0; i--) {
        const inamic = g.inamici[i];

        if (inamic.punctCurent !== inamic.ultimulPunctCurent) {
          inamic.ultimulPunctCurent = inamic.punctCurent;
          const p1Seg = DRUM[inamic.punctCurent];
          const p2Seg = DRUM[inamic.punctCurent + 1];
          if (p1Seg && p2Seg) {
            const segDx = p2Seg.x - p1Seg.x;
            const segDy = p2Seg.y - p1Seg.y;
            if (Math.abs(segDx) > Math.abs(segDy)) {
              inamic.dirSegment = segDx > 0 ? "right" : "left";
            } else {
              inamic.dirSegment = segDy > 0 ? "down" : "up";
            }
          }
        }

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
            if (bgMusicRef.current) bgMusicRef.current.pause();
            return;
          }
          continue;
        }

        const dirKey = inamic.dirSegment || "down";

        if (inamic.tip === "zergling") {
          const frameIndex = Math.floor(g.frame / 8) % 2;
          const setCurent = frameIndex === 0 ? zerglingMove1ImagesRef.current : zerglingMove2ImagesRef.current;
          
          const zerglingSprite = setCurent[dirKey] || setCurent["down"];

          if (zerglingSprite) {
            const size = 48;
            ctx.drawImage(zerglingSprite, inamic.x - size / 2, inamic.y - size / 2, size, size);
          }
        } else {
          ctx.fillStyle = inamic.culoare;
          ctx.beginPath();
          ctx.arc(inamic.x, inamic.y, inamic.raza, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = "#ffffff";
          ctx.font = "bold 9px sans-serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText("H", inamic.x, inamic.y);
        }

        // Bara de HP
        const lungimeHp = 24;
        const hpPct = Math.max(0, inamic.hp / inamic.hpMax);
        ctx.fillStyle = "rgba(0,0,0,0.6)";
        ctx.fillRect(inamic.x - lungimeHp / 2, inamic.y - inamic.raza - 8, lungimeHp, 4);
        ctx.fillStyle = hpPct > 0.5 ? "#22c55e" : "#ef4444";
        ctx.fillRect(inamic.x - lungimeHp / 2, inamic.y - inamic.raza - 8, lungimeHp * hpPct, 4);
      }

      // 5. Randare turnuri și atacuri
      g.turnuri.forEach((turn) => {
        turn.cooldown = (turn.cooldown || 0) + 1;
        if (turn.shootTimer > 0) turn.shootTimer--;

        let tintaInRaza = g.inamici.find(
          (inamic) => inamic.id === turn.tintaId && Math.hypot(inamic.x - turn.x, inamic.y - turn.y) <= turn.raza
        );

        if (!tintaInRaza) {
          tintaInRaza = g.inamici.find(
            (inamic) => Math.hypot(inamic.x - turn.x, inamic.y - turn.y) <= turn.raza
          );
          turn.tintaId = tintaInRaza ? tintaInRaza.id : null;
        }

        if (tintaInRaza && turn.shootTimer <= 0) {
          const dx = tintaInRaza.x - turn.x;
          const dy = tintaInRaza.y - turn.y;
          let unghi = (Math.atan2(dy, dx) * 180) / Math.PI;
          if (unghi < 0) unghi += 360;
          turn.unghi = unghi;
        }

        if (tintaInRaza && turn.cooldown >= turn.cadenta) {
          turn.cooldown = 0;

          if (turn.tip === "marine") {
            turn.shootTimer = 8;
            playSound("/sounds/marine_fire.wav", 0.28);
            g.proiectile.push({
              x: turn.x,
              y: turn.y,
              tinta: tintaInRaza,
              culoare: turn.culoare,
              damage: turn.damage,
              slow: turn.slow,
              viteza: 8
            });
          } else if (turn.tip === "firebat") {
            turn.shootTimer = 50; 
            firebatAudio.playAttack();
          } else if (turn.tip === "marauder") {
            turn.shootTimer = 12;
            playSound("/sounds/marauder_fire.wav", 0.65);
            g.proiectile.push({
              x: turn.x,
              y: turn.y,
              tinta: tintaInRaza,
              culoare: turn.culoare,
              damage: turn.damage,
              slow: true,
              viteza: 6.5
            });
          }
        }

        const isShooting = (turn.shootTimer || 0) > 0;

        if (turn.tip === "firebat" && isShooting) {
          const unghiRad = (turn.unghi * Math.PI) / 180;
          const conRaza = turn.raza;
          const semiUnghiCon = (35 * Math.PI) / 180;

          if (turn.shootTimer % 10 === 0) {
            g.inamici.forEach((inamic) => {
              const dX = inamic.x - turn.x;
              const dY = inamic.y - turn.y;
              const dist = Math.hypot(dX, dY);

              if (dist <= conRaza) {
                const unghiInamic = Math.atan2(dY, dX);
                let diffUnghi = Math.abs(unghiRad - unghiInamic);
                if (diffUnghi > Math.PI) diffUnghi = 2 * Math.PI - diffUnghi;

                if (diffUnghi <= semiUnghiCon) {
                  inamic.hp -= turn.damage / 4;
                }
              }
            });
          }

          ctx.save();
          const flameGradient = ctx.createRadialGradient(
            turn.x, turn.y, 8,
            turn.x, turn.y, conRaza
          );
          flameGradient.addColorStop(0, "rgba(255, 230, 0, 0.55)");
          flameGradient.addColorStop(0.4, "rgba(255, 80, 0, 0.40)");
          flameGradient.addColorStop(1, "rgba(239, 68, 68, 0)");

          ctx.fillStyle = flameGradient;
          ctx.beginPath();
          ctx.moveTo(turn.x, turn.y);
          ctx.arc(turn.x, turn.y, conRaza, unghiRad - semiUnghiCon, unghiRad + semiUnghiCon);
          ctx.closePath();
          ctx.fill();
          ctx.restore();
        }

        const dirKey = getDirectionKey(turn.unghi ?? 90);

        if (turn.tip === "marine") {
          const marineSprite = isShooting
            ? (marineFiringImagesRef.current[dirKey] || marineIdleImagesRef.current[dirKey])
            : (marineIdleImagesRef.current[dirKey] || marineFiringImagesRef.current[dirKey]);

          if (marineSprite) {
            const w = 52;
            const h = 52;
            ctx.drawImage(marineSprite, turn.x - w / 2, turn.y - h / 2, w, h);
          }
        } else if (turn.tip === "firebat") {
          const firebatSprite = isShooting
            ? (firebatFiringImagesRef.current[dirKey] || firebatIdleImagesRef.current[dirKey])
            : (firebatIdleImagesRef.current[dirKey] || firebatFiringImagesRef.current[dirKey]);

          if (firebatSprite) {
            const size = 72; // Firebat mărit la 72px pentru un vizual mai imponent
            ctx.drawImage(firebatSprite, turn.x - size / 2, turn.y - size / 2, size, size);
          }
        } else {
          ctx.fillStyle = turn.culoare;
          ctx.beginPath();
          ctx.arc(turn.x, turn.y, 16, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = "#ffffff";
          ctx.lineWidth = 2;
          ctx.stroke();

          ctx.fillStyle = "#000000";
          ctx.font = "bold 10px sans-serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText("M", turn.x, turn.y);
        }
      });

      // 6. Randare proiectile
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
            p.tinta.viteza = Math.max(0.4, p.tinta.viteza * 0.65);
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

      // 7. Curățare inamici morți
      for (let i = g.inamici.length - 1; i >= 0; i--) {
        if (g.inamici[i].hp <= 0) {
          const inamicMort = g.inamici[i];
          g.minerale += inamicMort.recompensa;
          g.scor += inamicMort.recompensa;
          setMinerale(g.minerale);
          setScor(g.scor);

          if (inamicMort.tip === "zergling") {
            playSound("/sounds/zergling_die.wav", 0.5);
          }

          g.inamici.splice(i, 1);
        }
      }

      if (g.frame % 600 === 0) {
        g.val += 1;
        setVal(g.val);
      }

      if (g.val !== ultimulValRedatRef.current) {
        ultimulValRedatRef.current = g.val;
        playSound("/sounds/zergling_wave_start.wav", 0.5);
      }

      animId = requestAnimationFrame(loop);
    }

    animId = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(animId);
      g.ruleaza = false;
    };
  }, [gameOver]);

  function getCanvasCoords(e) {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  }

  function handleMouseMove(e) {
    const { x, y } = getCanvasCoords(e);
    mousePosRef.current = { x, y, inCanvas: true };
  }

  function handleMouseLeave() {
    mousePosRef.current.inCanvas = false;
  }

  function handleCanvasClick(e) {
    if (gameOver) return;
    const { x, y } = getCanvasCoords(e);

    const turnConfig = TURNURI_CONFIG[tipSelectat];
    if (minerale < turnConfig.cost) return;
    if (!estePozitieValida(x, y)) return;

    gameRef.current.turnuri.push({
      x,
      y,
      tip: tipSelectat,
      unghi: 90,
      shootTimer: 0,
      cooldown: 0,
      tintaId: null,
      ...turnConfig
    });

    if (tipSelectat === "marine") {
      const now = Date.now();
      if (now - lastMarineSoundTimeRef.current >= 1800) {
        playSound("/sounds/marine_ready.wav", 0.85);
        lastMarineSoundTimeRef.current = now;
      }
    } else if (tipSelectat === "firebat") {
      const now = Date.now();
      if (now - lastFirebatReadySoundTimeRef.current >= 1800) {
        playSound("/sounds/firebat_ready.wav", 0.85);
        lastFirebatReadySoundTimeRef.current = now;
      }
    } else if (tipSelectat === "marauder") {
      const now = Date.now();
      if (now - lastMarauderReadySoundTimeRef.current >= 1800) {
        playSound("/sounds/marauder_ready.wav", 0.85);
        lastMarauderReadySoundTimeRef.current = now;
      }
    }

    setMinerale((prev) => prev - turnConfig.cost);
  }

  function handleRestart() {
    ultimulValRedatRef.current = 1;
    gameRef.current = {
      turnuri: [],
      inamici: [],
      proiectile: [],
      frame: 0,
      viata: 20,
      minerale: 250,
      val: 1,
      scor: 0,
      ruleaza: true
    };
    setMinerale(250);
    setViataBaza(20);
    setVal(1);
    setScor(0);
    setGameOver(false);

    if (bgMusicRef.current) {
      bgMusicRef.current.currentTime = 0;
      bgMusicRef.current.play().catch(() => {});
    }
  }

  function handleCloseModal() {
    if (bgMusicRef.current) {
      bgMusicRef.current.pause();
      bgMusicRef.current.currentTime = 0;
      bgMusicRef.current.src = "";
    }
    if (onClose) onClose();
  }

  return (
    <div className={`arcade-modal-overlay ${isFullscreen ? "fullscreen-mode" : ""}`} ref={containerRef}>
      <div className="arcade-modal">
        <div className="arcade-header">
          <h3>⚡ SC Terran Defense: Sector Koprulu</h3>
          <div className="arcade-header-actions" style={{ display: "flex", gap: "8px" }}>
            <button type="button" className="btn-arcade-fullscreen" onClick={toggleFullscreen} style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", padding: "4px 10px", borderRadius: "6px", cursor: "pointer", fontSize: "0.8rem" }}>
              {isFullscreen ? "🗗 Ieși Fullscreen" : "⛶ Fullscreen Joc"}
            </button>
            <button type="button" className="btn-arcade-close" onClick={handleCloseModal}>
              ✕ Închide
            </button>
          </div>
        </div>

        <div className="arcade-stats-bar">
          <span>💎 Minerale: <strong>{minerale}</strong></span>
          <span>🛡️ Baza: <strong>{viataBaza} HP</strong></span>
          <span>🌊 Val: <strong>{val}</strong></span>
          <span>🏆 Scor: <strong>{scor}</strong></span>
        </div>

        <div className="arcade-controls">
          <span className="controls-label">Unitate selectată:</span>
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
            width={1200}
            height={700}
            onClick={handleCanvasClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          />

          {gameOver && (
            <div className="arcade-game-over">
              <h4>Baza a căzut! Zergii au invadat.</h4>
              <p>Scor final: {scor}</p>
              <button
                type="button"
                className="btn-arcade-restart"
                onClick={handleRestart}
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
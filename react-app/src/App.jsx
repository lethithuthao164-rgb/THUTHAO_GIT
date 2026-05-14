import { useEffect, useState } from "react";

const ICONS = [
  "🧸","🎀","🍭","🌸","🐰","🌈","🍦","✨",
  "🍓","🧁","🐾","🎈","🐥","🎨","🍩","🍒","⭐",
  "💎","🎵","🦋","🍔","⚽","🚀"
];

const LEVELS = [10, 20, 40];

const MESSAGES = [
  "Level 1 xong rồi! Bạn lật nhanh hơn cả não mình 😭",
  "Level 2 qua luôn? Bạn chắc không phải người thường 🤖",
  "Level 3 phá đảo! Game xin nghỉ việc 🫠👑"
];

// =======================
// RANDOM THẺ
// =======================
function shuffle(arr) {

  const a = [...arr];

  for (let i = a.length - 1; i > 0; i--) {

    const j = Math.floor(Math.random() * (i + 1));

    [a[i], a[j]] = [a[j], a[i]];
  }

  return a;
}

export default function App() {

  // =======================
  // STATE
  // =======================
  const [level, setLevel] = useState(0);

  const [cards, setCards] = useState([]);

  const [flipped, setFlipped] = useState([]);

  const [lock, setLock] = useState(false);

  const [showPopup, setShowPopup] = useState(false);

  const total = LEVELS[level];

  // =======================
  // SỐ CỘT THEO LEVEL
  // =======================
  // 10 thẻ = 5 ngang 2 dọc
  // 20 thẻ = 5 ngang 4 dọc
  // 40 thẻ = 8 ngang 5 dọc

  function getColumns() {

    if (total === 10) return 5;

    if (total === 20) return 5;

    if (total === 40) return 8;

    return 5;
  }

  // =======================
  // KHỞI TẠO LEVEL
  // =======================
  function startLevel(lv) {

    const size = LEVELS[lv];

    const pairs = size / 2;

    const selected =
      shuffle(ICONS).slice(0, pairs);

    const deck =
      shuffle([...selected, ...selected]).map(
        (icon, index) => ({
          id: index,
          icon,
          hidden: false
        })
      );

    setCards(deck);

    setFlipped([]);

    setLock(false);

    setShowPopup(false);

    setLevel(lv);
  }

  // =======================
  // START GAME
  // =======================
  useEffect(() => {

    startLevel(0);

  }, []);

  // =======================
  // LẬT THẺ
  // =======================
  function handleFlip(card) {

    if (lock) return;

    if (flipped.includes(card.id)) return;

    if (card.hidden) return;

    const newFlipped = [...flipped, card.id];

    setFlipped(newFlipped);

    // ĐỦ 2 LÁ
    if (newFlipped.length === 2) {

      setLock(true);

      const [a, b] = newFlipped;

      const c1 =
        cards.find(c => c.id === a);

      const c2 =
        cards.find(c => c.id === b);

      // ===================
      // GIỐNG NHAU
      // ===================
      if (c1.icon === c2.icon) {

        setTimeout(() => {

          // ẨN THẺ
          setCards(prev =>
            prev.map(c =>
              c.id === a || c.id === b
                ? { ...c, hidden: true }
                : c
            )
          );

          setFlipped([]);

          setLock(false);

        }, 400);

      } else {

        // ===================
        // KHÁC NHAU
        // ===================
        setTimeout(() => {

          setFlipped([]);

          setLock(false);

        }, 700);
      }
    }
  }

  // =======================
  // KIỂM TRA THẺ ĐANG LẬT
  // =======================
  const isFlipped =
    (id) => flipped.includes(id);

  // =======================
  // THANH TIẾN ĐỘ
  // =======================
  const progress =
    (
      cards.filter(c => c.hidden).length
      / LEVELS[level]
    ) * 100;

  // =======================
  // KIỂM TRA THẮNG
  // =======================
  const isWin =
    cards.length > 0 &&
    cards.every(c => c.hidden);

  useEffect(() => {

    if (isWin) {

      setTimeout(() => {

        setShowPopup(true);

      }, 500);
    }

  }, [cards]);

  function nextLevel() {

    if (level < LEVELS.length - 1) {

      startLevel(level + 1);

    } else {

      startLevel(0);
    }
  }

  return (

    <div style={styles.container}>

      {/* TITLE */}
      <h1 style={styles.title}>
        🧠 Memory Flip Game
      </h1>

      {/* LEVEL */}
      <p style={styles.levelText}>
        Level {level + 1}
      </p>

      {/* PROGRESS */}
      <div style={styles.progressBox}>

        <div
          style={{
            ...styles.progressFill,
            width: `${progress}%`
          }}
        />

      </div>

      {/* GRID */}
      <div
        style={{
          ...styles.grid,

          gridTemplateColumns:
            `repeat(${getColumns()}, 90px)`
        }}
      >

        {cards.map(card => (

          <div
            key={card.id}

            onClick={() => handleFlip(card)}

            style={{
              ...styles.card,

              opacity:
                card.hidden ? 0 : 1,

              visibility:
                card.hidden
                  ? "hidden"
                  : "visible",

              pointerEvents:
                card.hidden
                  ? "none"
                  : "auto"
            }}
          >

            <div
              style={{
                ...styles.inner,

                transform:
                  isFlipped(card.id)
                    ? "rotateY(180deg)"
                    : "rotateY(0deg)"
              }}
            >

              {/* BACK */}
              <div style={styles.back}>
                ❓
              </div>

              {/* FRONT */}
              <div style={styles.front}>
                {card.icon}
              </div>

            </div>

          </div>

        ))}

      </div>

      {/* POPUP */}
      {showPopup && (

        <div style={styles.overlay}>

          <div style={styles.popup}>

            <h2>
              {MESSAGES[level]}
            </h2>

            <button
              onClick={nextLevel}
              style={styles.button}
            >

              {
                level < LEVELS.length - 1
                  ? "Sang level tiếp 🚀"
                  : "Chơi lại 🔁"
              }

            </button>

          </div>

        </div>
      )}

      {/* PHÁ ĐẢO */}
      {
        isWin &&
        level === LEVELS.length - 1 &&
        !showPopup && (

          <div style={styles.winText}>
            Bạn đã phá đảo toàn bộ game 👑🔥
          </div>
        )
      }

    </div>
  );
}

const styles = {

  container: {
    fontFamily: "Segoe UI",
    textAlign: "center",
    minHeight: "100vh",
    padding: 20,
    background: "#fff5f7"
  },

  title: {
    marginBottom: 5
  },

  levelText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ff5c8a"
  },

  grid: {
    display: "grid",
    gap: 12,
    justifyContent: "center",
    marginTop: 25
  },

  card: {
    width: 90,
    height: 120,
    perspective: 1000,
    cursor: "pointer"
  },

  inner: {
    width: "100%",
    height: "100%",
    position: "relative",
    transition: "0.5s",
    transformStyle: "preserve-3d"
  },

  front: {
    position: "absolute",
    width: "100%",
    height: "100%",
    background: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 32,
    borderRadius: 12,
    backfaceVisibility: "hidden",
    transform: "rotateY(180deg)",
    boxShadow: "0 4px 10px rgba(0,0,0,0.15)"
  },

  back: {
    position: "absolute",
    width: "100%",
    height: "100%",
    background: "#ffb6c1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 26,
    borderRadius: 12,
    backfaceVisibility: "hidden",
    boxShadow: "0 4px 10px rgba(0,0,0,0.15)"
  },

  progressBox: {
    width: 260,
    height: 12,
    background: "#ddd",
    margin: "15px auto",
    borderRadius: 20,
    overflow: "hidden"
  },

  progressFill: {
    height: "100%",
    background: "#ff5c8a",
    borderRadius: 20,
    transition: "0.3s"
  },

  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },

  popup: {
    background: "white",
    padding: 25,
    borderRadius: 16,
    textAlign: "center",
    minWidth: 300
  },

  button: {
    marginTop: 15,
    padding: "12px 22px",
    border: "none",
    background: "#ff5c8a",
    color: "white",
    borderRadius: 20,
    cursor: "pointer",
    fontSize: 16
  },

  winText: {
    marginTop: 20,
    fontWeight: "bold",
    color: "green",
    fontSize: 20
  }
};
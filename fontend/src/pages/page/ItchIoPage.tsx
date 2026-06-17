import { useState, useEffect, useRef } from "react";

type Category = "game" | "tool" | "app";

interface ItchItem {
  id: number;
  title: string;
  author: string;
  price: string;
  image: string;
  tag: string;
  category: Category;
  sales: number;
  hasDiscount: boolean;
}

const TAGS = ["windows", "macos", "linux", "browse", "alltags"];
const GAME_BY_PRICE = ["game", "tool", "app", "free", "top seller", "discount"];
const TAG_POOL = ["windows", "macos", "linux"];
const CATEGORY_POOL: Category[] = ["game", "tool", "app"];
const PRICES = ["Free", "$1.99", "$3.99", "$5.99", "$9.99"];

const generateMockItems = (page: number): ItchItem[] => {
  const items: ItchItem[] = [];
  const start = (page - 1) * 12;
  for (let i = 0; i < 12; i++) {
    const idx = start + i;
    const tag = TAG_POOL[idx % TAG_POOL.length];
    const category = CATEGORY_POOL[idx % CATEGORY_POOL.length];
    const price = PRICES[idx % PRICES.length];
    items.push({
      id: idx,
      title: `${category.charAt(0).toUpperCase() + category.slice(1)} ${tag} Item ${idx + 1}`,
      author: `Creator ${(idx % 50) + 1}`,
      price,
      image: `https://picsum.photos/seed/${tag}${idx}/200/150`,
      tag,
      category,
      sales: Math.floor(Math.random() * 2000),
      hasDiscount: idx % 3 === 0,
    });
  }
  return items;
};

const filterItems = (items: ItchItem[], activeTag: string, activePrice: string): ItchItem[] => {
  let filtered = items;

  if (activeTag && activeTag !== "alltags" && activeTag !== "browse") {
    filtered = filtered.filter((item) => item.tag === activeTag);
  }

  if (activePrice) {
    switch (activePrice) {
      case "game":
        filtered = filtered.filter((item) => item.category === "game");
        break;
      case "tool":
        filtered = filtered.filter((item) => item.category === "tool");
        break;
      case "app":
        filtered = filtered.filter((item) => item.category === "app");
        break;
      case "free":
        filtered = filtered.filter((item) => item.price === "Free");
        break;
      case "top seller":
        filtered = filtered.filter((item) => item.sales > 1000);
        break;
      case "discount":
        filtered = filtered.filter((item) => item.hasDiscount);
        break;
    }
  }

  return filtered;
};

export default function ItchIoPage() {
  const [activeTag, setActiveTag] = useState("alltags");
  const [activePrice, setActivePrice] = useState("");
  const [allItems, setAllItems] = useState<ItchItem[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const items = filterItems(allItems, activeTag, activePrice);

  useEffect(() => {
    setAllItems([]);
    setPage(1);
  }, [activeTag, activePrice]);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      const newItems = generateMockItems(page);
      setAllItems((prev) => (page === 1 ? newItems : [...prev, ...newItems]));
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [page]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loading]);

  const sidebarStyle: React.CSSProperties = {
    width: "220px",
    minWidth: "220px",
    paddingRight: "28px",
    borderRight: "1px solid #16213e",
  };

  const sectionTitleStyle: React.CSSProperties = {
    fontSize: "11px",
    fontWeight: 700,
    color: "#6a6a7a",
    textTransform: "uppercase",
    letterSpacing: "1px",
    marginBottom: "8px",
    marginTop: "20px",
  };

  const navItemStyle = (isActive: boolean): React.CSSProperties => ({
    display: "block",
    width: "100%",
    padding: "6px 12px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: isActive ? 600 : 400,
    color: isActive ? "#fff" : "#b0b0c0",
    backgroundColor: isActive ? "#0f3460" : "transparent",
    textAlign: "left",
    transition: "all 0.15s",
    textTransform: "capitalize",
    marginBottom: "2px",
  });

  const itemStyle: React.CSSProperties = {
    width: "calc(16.666% - 14px)",
    marginBottom: "24px",
    backgroundColor: "#1a1a2e",
    borderRadius: "8px",
    overflow: "hidden",
    cursor: "pointer",
    transition: "transform 0.2s",
    border: "1px solid #16213e",
  };

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "32px 20px",
        display: "flex",
      }}
    >
      {/* Left Sidebar */}
      <div style={sidebarStyle}>
        <div style={{ ...sectionTitleStyle, marginTop: 0 }}>Tags</div>
        {TAGS.map((tag) => (
          <button
            key={tag}
            onClick={() => {
              setActiveTag(tag);
              setActivePrice("");
            }}
            style={navItemStyle(activeTag === tag && !activePrice)}
          >
            {tag}
          </button>
        ))}
        <div style={sectionTitleStyle}>Game by Price</div>
        {GAME_BY_PRICE.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setActivePrice(cat);
              setActiveTag("");
            }}
            style={navItemStyle(activePrice === cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Right Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {items.length === 0 && !loading ? (
            <div style={{ width: "100%", textAlign: "center", padding: "60px 0", color: "#7a7a8a", fontSize: "15px" }}>
              No items found for this filter.
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} style={{ ...itemStyle, position: "relative" }}>
                {item.hasDiscount && (
                  <div
                    style={{
                      position: "absolute",
                      top: "8px",
                      left: "8px",
                      backgroundColor: "#e74c3c",
                      color: "#fff",
                      fontSize: "10px",
                      fontWeight: 700,
                      padding: "2px 6px",
                      borderRadius: "4px",
                    }}
                  >
                    DISCOUNT
                  </div>
                )}
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: "100%",
                    height: "120px",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
                <div style={{ padding: "12px" }}>
                  <div
                    style={{
                      fontWeight: 600,
                      fontSize: "13px",
                      color: "#e0e0e0",
                      marginBottom: "4px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {item.title}
                  </div>
                  <div
                    style={{
                      fontSize: "11px",
                      color: "#7a7a8a",
                      marginBottom: "2px",
                    }}
                  >
                    by {item.author}
                  </div>
                  <div
                    style={{
                      fontSize: "10px",
                      color: "#5a5a6a",
                      marginBottom: "4px",
                      textTransform: "capitalize",
                    }}
                  >
                    {item.category} &middot; {item.tag}
                  </div>
                  <div
                    style={{
                      fontSize: "13px",
                      fontWeight: 700,
                      color: item.price === "Free" ? "#4caf50" : "#e0e0e0",
                    }}
                  >
                    {item.price} {item.sales > 1000 && <span style={{ fontSize: "10px", color: "#f39c12", fontWeight: 400 }}>Top Seller</span>}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Infinite scroll sentinel */}
        <div ref={sentinelRef} style={{ height: "1px" }} />

        {loading && (
          <div
            style={{
              textAlign: "center",
              padding: "24px",
              color: "#7a7a8a",
              fontSize: "14px",
            }}
          >
            Loading more items...
          </div>
        )}
      </div>
    </div>
  );
}

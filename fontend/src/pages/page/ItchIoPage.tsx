import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import "./ItchIoPage.scss";

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

const PAGE_SIZE = 12;

const generateMockItems = (page: number): ItchItem[] => {
  const items: ItchItem[] = [];
  const start = (page - 1) * PAGE_SIZE;
  for (let i = 0; i < PAGE_SIZE; i++) {
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
      sales: (idx * 97) % 2000,
      hasDiscount: idx % 3 === 0,
    });
  }
  return items;
};

const filterItems = (
  items: ItchItem[],
  activeTag: string,
  activePrice: string,
): ItchItem[] => {
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

function ItchItemCard({ item }: { item: ItchItem }) {
  return (
    <a href={`/${item.category}/${item.id}`} className="itchio-item">
      {item.hasDiscount && <div className="discount-badge">DISCOUNT</div>}
      <img src={item.image} alt={item.title} loading="lazy" />
      <div className="item-body">
        <div className="item-title">{item.title}</div>
        <div className="item-author">by {item.author}</div>
        <div className="item-meta">
          {item.category} &middot; {item.tag}
        </div>
        <div className={`item-price${item.price === "Free" ? " free" : ""}`}>
          {item.price}{" "}
          {item.sales > 1000 && <span className="top-seller">Top Seller</span>}
        </div>
      </div>
    </a>
  );
}

export default function ItchIoPage() {
  const [activeTag, setActiveTag] = useState("alltags");
  const [activePrice, setActivePrice] = useState("");
  const [allItems, setAllItems] = useState<ItchItem[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refetchKey, setRefetchKey] = useState(0);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef(false);

  loadingRef.current = loading;

  const items = useMemo(
    () => filterItems(allItems, activeTag, activePrice),
    [allItems, activeTag, activePrice],
  );

  useEffect(() => {
    setAllItems([]);
    setPage(1);
    setRefetchKey((k) => k + 1);
  }, [activeTag, activePrice]);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      const newItems = generateMockItems(page);
      setAllItems((prev) => (page === 1 ? newItems : [...prev, ...newItems]));
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [page, refetchKey]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    const grid = gridRef.current;
    if (!sentinel || !grid) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loadingRef.current) {
          setPage((prev) => prev + 1);
        }
      },
      { root: grid, rootMargin: "200px" },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  const handleTagClick = useCallback((tag: string) => {
    setActiveTag(tag);
    setActivePrice("");
  }, []);

  const handlePriceClick = useCallback((cat: string) => {
    setActivePrice(cat);
    setActiveTag("");
  }, []);

  return (
    <div className="itchio-page">
      <div className="itchio-sidebar">
        <div className="section-title">Tags</div>
        {TAGS.map((tag) => (
          <button
            key={tag}
            onClick={() => handleTagClick(tag)}
            className={`nav-btn${activeTag === tag && !activePrice ? " active" : ""}`}
          >
            {tag}
          </button>
        ))}
        <div className="section-title">Game by Price</div>
        {GAME_BY_PRICE.map((cat) => (
          <button
            key={cat}
            onClick={() => handlePriceClick(cat)}
            className={`nav-btn${activePrice === cat ? " active" : ""}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="itchio-content">
        <div ref={gridRef} className="itchio-grid">
          {items.length === 0 && !loading ? (
            <div className="itchio-empty">No items found for this filter.</div>
          ) : (
            items.map((item) => <ItchItemCard key={item.id} item={item} />)
          )}
          {loading && (
            <div className="itchio-loading">Loading more items...</div>
          )}
          <div ref={sentinelRef} className="itchio-sentinel" />
        </div>
      </div>
    </div>
  );
}

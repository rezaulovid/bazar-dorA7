
import Link from "next/link";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

interface Headlines {
    id: string | number;
  nameBn: string;
  icon?: string;
    slug: string;
    categoryIcon?: string;
}

const Marquee = async () => {
  let headlines: Headlines[] = [];

  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/bazardor/products",
      {
        next: { revalidate: 300 },
      }
    );

    if (res.ok) {
      const data = await res.json();

      headlines = Array.isArray(data)
        ? data
        : Array.isArray(data.data)
          ? data.data
          : [];
    } else {
      console.error(`Marquee API Error: ${res.status}`);
    }
  } catch (error) {
    console.error("Marquee fetch failed:", error);
  }

  return (
    <div className="bg-white rounded-br-sm text-black">
      <div className="flex max-w-7xl mx-auto">
        {headlines.length > 0 ? (
          <MarqueeText
            className="py-1"
            direction="right"
            duration={10}
          >
            {headlines.map((h) => (
              <Link
                className="hover:underline"
                href={`/products/${h.slug}`}
                key={h.id}
              >
                <span>
                  {h.icon} {h.nameBn}
                </span>
                <span className="mx-5">•</span>
              </Link>
            ))}
          </MarqueeText>
        ) : (
          <p className="py-1">
            সর্বশেষ আপডেট দেখতে কিছুক্ষণ পর আবার চেষ্টা করুন।
          </p>
        )}
      </div>
    </div>
  );
};

export default Marquee;
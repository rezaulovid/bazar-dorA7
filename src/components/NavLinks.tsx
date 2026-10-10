
import Link from "next/link";

interface Navs {
    id: string | number;
    slug: string;
    nameBn: string;
    icon?: string;
}

const NavLinks = async () => {
    let navs: Navs[] = [];

    try {
        const res = await fetch(
            "https://api.api-store.workers.dev/api/bazardor/categories",
            {
                next: { revalidate: 300 },
            }
        );

        if (!res.ok) {
            console.error(`NavLinks API Error: ${res.status}`);
        } else {
            const contentType = res.headers.get("content-type");

            if (contentType?.includes("application/json")) {
                const data = await res.json();

                navs = Array.isArray(data)
                    ? data
                    : Array.isArray(data.data)
                    ? data.data
                    : Array.isArray(data.categories)
                    ? data.categories
                    : [];
            } else {
                console.error("NavLinks API JSON response দেয়নি।");
            }
        }
    } catch (error) {
        console.error("Categories fetch error:", error);
    }

    return (
        <div className="flex gap-5 w-full overflow-x-auto">
            <Link href="/">হোম</Link>

            {navs.map((n) => (
                <Link key={n.id || n.slug} href={`/category/${n.slug}`}>
                    {n.icon || "📁"} {n.nameBn}
                </Link>
            ))}
        </div>
    );
};

export default NavLinks;



import Link from "next/link";
import { getCategories } from "@/lib/api";

const StudioCategoryNav = async ({ selectedCategory }) => {
  const categories = await getCategories();

  return (
    <div className="flex flex-wrap gap-3 mb-8">

      <Link
        href="/studios"
        className={`btn ${
          !selectedCategory ? "btn-primary" : "btn-outline"
        }`}
      >
        All Studios
      </Link>

      {categories.map((category) => (
        <Link
          key={category}
          href={`/studios?category=${encodeURIComponent(category)}`}
          className={`btn ${
            selectedCategory === category
              ? "btn-primary"
              : "btn-outline"
          }`}
        >
          {category}
        </Link>
      ))}

    </div>
  );
};

export default StudioCategoryNav;

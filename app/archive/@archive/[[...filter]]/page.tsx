import NewsList from "@/components/news-list/news-list";
import { getAvailableNewsYears, getNewsForYear } from "@/lib/news";
import Link from "next/link";

interface FilteredNewsPageProps {
  params: { filter: number };
}

export default function FilteredNewsPage({ params }: FilteredNewsPageProps) {
  const filter = params.filter;
  const news = getNewsForYear(filter);

  const links = getAvailableNewsYears();
  return (
    <header id="archive-header">
      <nav>
        <ul>
          {links.map((link) => (
            <li key={link}>
              <Link href={`/archive/${link}`}>{link}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

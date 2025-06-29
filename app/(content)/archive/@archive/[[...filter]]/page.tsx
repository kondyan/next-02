import NewsList from "@/components/news-list/news-list";
import {
  getAvailableNewsMonths,
  getAvailableNewsYears,
  getNewsForYear,
  getNewsForYearAndMonth,
} from "@/lib/news";
import Link from "next/link";

interface FilteredNewsPageProps {
  params: {
    filter?: number[];
  };
}

export default async function FilteredNewsPage({
  params,
}: FilteredNewsPageProps) {
  const filter = await params.filter;
  const selectedYear = filter?.[0];
  const selectedMonth = filter?.[1];

  let news;

  let newsContent = <p>No news found for the selected period.</p>;
  let links = getAvailableNewsYears();

  if (selectedYear && !selectedMonth) {
    news = getNewsForYear(selectedYear);
    links = getAvailableNewsMonths(selectedYear);
  }
  if (selectedYear && selectedMonth) {
    news = getNewsForYearAndMonth(selectedYear, selectedMonth);
    links = [];
  }

  if (
    (selectedYear && !getAvailableNewsYears().includes(+selectedYear)) ||
    (selectedMonth &&
      !getAvailableNewsMonths(selectedYear as number).includes(+selectedMonth))
  ) {
    throw new Error("Invalid Filter");
  }

  if (news && news.length > 0) {
    newsContent = <NewsList news={news} />;
  }
  return (
    <>
      <header id="archive-header">
        <nav>
          <ul>
            {links.map((link) => {
              const href = selectedYear
                ? `/archive/${selectedYear}/${link}`
                : `/archive/${link}`;
              return (
                <li key={link}>
                  <Link href={href}>{link}</Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>
      {newsContent}
    </>
  );
}

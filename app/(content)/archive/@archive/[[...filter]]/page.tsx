import NewsList from "@/components/news-list/news-list";
import {
  getAvailableNewsMonths,
  getAvailableNewsYears,
  getNewsForYear,
  getNewsForYearAndMonth,
} from "@/lib/news";
import Link from "next/link";
import { Suspense } from "react";

interface FilteredNewsPageProps {
  params: {
    filter?: number[];
  };
}

async function FilteredNews({ year, month }: { year: number; month: number }) {
  let news;

  if (year && !month) {
    news = await getNewsForYear(year);
  } else if (year && month) {
    news = await getNewsForYearAndMonth(year, month);
  }

  let newsContent = <p>No news found for the selected period.</p>;

  if (news && news.length > 0) {
    newsContent = <NewsList news={news} />;
    return newsContent;
  }
}

async function FilteredHeader({ year, month }) {
  const availableYears = await getAvailableNewsYears();

  if (
    (year && !(await availableYears).includes(year)) ||
    (month && !getAvailableNewsMonths(year as number).includes(month))
  ) {
    throw new Error("Invalid Filter");
  }

  let links: number[] = availableYears;

  if (year && !month) {
    links = getAvailableNewsMonths(year);
  }
  if (year && month) {
    links = [];
  }

  return (
    <header id="archive-header">
      <nav>
        <ul>
          {links.map((link) => {
            const href = year ? `/archive/${year}/${link}` : `/archive/${link}`;
            return (
              <li key={link}>
                <Link href={href}>{link}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}

export default async function FilteredNewsPage({
  params,
}: FilteredNewsPageProps) {
  const awaitedParams = await params;
  const filter = awaitedParams.filter;
  const selectedYear = filter?.[0];
  const selectedMonth = filter?.[1];

  return (
    <>
      <Suspense fallback={<p>Loading Filter...</p>}>
        <FilteredHeader year={selectedYear} month={selectedMonth} />
      </Suspense>

      <Suspense fallback={<p>Loading News...</p>}>
        <FilteredNews year={selectedYear} month={selectedMonth} />
      </Suspense>
    </>
  );
}

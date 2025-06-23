/* eslint-disable @next/next/no-img-element */
import { DUMMY_NEWS } from "@/dummy-news";

export default async function NewsDynamicPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const newsItem = DUMMY_NEWS.find((newsItem) => newsItem.slug === slug);

  if (!newsItem) {
    return <h1>Item was not Found, try again</h1>;
  }

  return (
    <article className="news-article">
      <header>
        <img src={`/images/news/${newsItem.image}`} alt={newsItem?.title} />
        <h1>{newsItem.slug} Page</h1>
        <time dateTime={newsItem.date}>{newsItem.date}</time>
      </header>
      <p>{newsItem.content}</p>
    </article>
  );
}

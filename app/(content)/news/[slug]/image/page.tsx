import { getNewsItem } from "@/lib/news";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function ImagePage({
  params,
}: {
  params: { slug: string };
}) {
  const awaitedParams = await params;
  const newsItemSlug = awaitedParams.slug;
  const newsItem = await getNewsItem(newsItemSlug);

  if (!newsItem) {
    notFound();
  }

  return (
    <div>
      <Image
        src={`/images/news/${newsItem.image}`}
        alt={newsItem.title}
        width={700}
        height={700}
      />
    </div>
  );
}

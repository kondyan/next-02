import { getNewsItem } from "@/lib/news";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function InterceptedImagePage({
  params,
}: {
  params: { slug: string };
}) {
  const newsItemSlug = params.slug;
  const newsItem = await getNewsItem(newsItemSlug);

  if (!newsItem) {
    notFound();
  }

  return (
    <>
      <dialog className="modal" open>
        <div>
          <Image
            src={`/images/news/${newsItem.image}`}
            alt={newsItem.title}
            width={600}
            height={600}
          />
        </div>
      </dialog>
    </>
  );
}

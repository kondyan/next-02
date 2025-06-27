"use client";

import { DUMMY_NEWS } from "@/dummy-news";
import Image from "next/image";
import { notFound, useRouter } from "next/navigation";
import React from "react";

export default function InterceptedImagePage({
  params,
}: {
  params: { slug: string };
}) {
  const router = useRouter();
  const newsItemSlug = React.use(params).slug;
  const newsItem = DUMMY_NEWS.find(
    (newsItem) => newsItem.slug === newsItemSlug
  );

  if (!newsItem) {
    notFound();
  }

  return (
    <>
      <div className="modal-background" onClick={router.back} />
      <dialog className="modal" open>
        <div>
          <Image
            src={`/images/news/${newsItem.image}`}
            alt={newsItem.title}
            width={700}
            height={700}
          />
        </div>
      </dialog>
    </>
  );
}

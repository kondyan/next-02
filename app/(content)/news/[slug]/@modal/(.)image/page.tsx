"use client";

import { DUMMY_NEWS } from "@/dummy-news";
import Image from "next/image";
import { notFound, useRouter } from "next/navigation";
import React, { Usable } from "react";

export default function InterceptedImagePage({
  params,
}: {
  params: Usable<{ slug: string }>;
}) {
  const router = useRouter();
  const newsItemSlug = React.use<{ slug: string }>(params).slug;
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
            width={600}
            height={600}
          />
        </div>
      </dialog>
    </>
  );
}

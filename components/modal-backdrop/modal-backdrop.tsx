"use client";

import { useRouter } from "next/router";

export default function ModalDrop() {
  const router = useRouter();
  return <div className="modal-background" onClick={router.back} />;
}

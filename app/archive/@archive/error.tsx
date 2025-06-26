"use client";

export default function ErrorPage({ error }: { error: Error }) {
  return (
    <div id="error">
      <h2>An Error occurred!</h2>
      <p>{error.message}</p>
    </div>
  );
}

import { db } from "./db";
import Link from "next/link";
export default async function Home() {
  const snippets = await db.snippet.findMany();
  //snippets will be an array of objects

  const renderedSnippets = snippets.map((snippet) => {
    return (
      <Link
        className="flex justify-between items-center p-2 border rounded"
        href={`/snippets/${snippet.id}`}
        key={snippet.id}
      >
        <div> {snippet.title}</div>
        <div>View</div>
      </Link>
    );
  });
  return (
    <div>
      <div className="items-center flex m-2 justify-between ">
        <h1 className="text-xl font-bold">Snippets</h1>
        <Link className="border p-2 rounded" href="/snippets/new">
          New
        </Link>
      </div>
      <div className="flex flex-col gap-2">{renderedSnippets}</div>
    </div>
  );
}

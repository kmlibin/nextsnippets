//when a user tries to find data that doesn't exist, call notfound function which redirects user to a diff page that says sorry data isn't there
import { notFound } from "next/navigation";
import { db } from "@/app/db";
import Link from "next/link";
import * as actions from "@/actions";

interface SnippetShowPageProps {
  //params stored as string, remember
  params: {
    id: string;
  };
}

export default async function SnippetShowPage(props: SnippetShowPageProps) {
  // await new Promise ((r) => setTimeout(r, 2000)) //checking to make sure load works
  const snippet = await db.snippet.findFirst({
    //turn into number, because stored in db as number
    where: { id: parseInt(props.params.id) },
  });
  //   console.log(snippet);
  if (!snippet) {
    return notFound();
  }

  //form action assumes that it will send form data, but we are sending a number. need to bind it so it's like a preloaded version 
  const deleteSnippetAction = actions.deleteSnippet.bind(null, snippet.id)
  return (
    <div>
      <div className="flex m-4 justify-between items-center">
        <h1 className="text-xl font-bold"> {snippet.title}</h1>
        <div className="flex gap-4">
          <Link
            href={`/snippets/${snippet.id}/edit`}
            className="p-2 border rounded"
          >
            Edit
          </Link>
          <form action = {deleteSnippetAction}>
            <button className="p-2 border rounded">Delete</button>
          </form>
        </div>
      </div>
      <pre className="p-3 border rounded bg-gray-200 border-gray-200">
        <code>{snippet.code}</code>
      </pre>
    </div>
  );
}

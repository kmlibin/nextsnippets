//when a user tries to find data that doesn't exist, call notfound function which redirects user to a diff page that says sorry data isn't there
import { notFound } from "next/navigation";
import { db } from "@/app/db";

interface SnippetShowPageProps {
  //params stored as string, remember
  params: {
    id: string;
  };
}

export default async function SnippetShowPage(props: SnippetShowPageProps) {
  const snippet = await db.snippet.findFirst({
    //turn into number, because stored in db as number
    where: { id: parseInt(props.params.id) },
  });
  console.log(snippet);
  if (!snippet) {
    return notFound();
  }
  return <div>{snippet.title}</div>;
}

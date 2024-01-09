import { db } from "@/app/db";
import { notFound } from "next/navigation";


import SnippetEditForm from "@/app/components/snippet-edit-form";

interface EditSnippetProps {
  params: {
    id: string;
  };
}

export default async function EditSnippet(props: EditSnippetProps) {
  const id = parseInt(props.params.id);
  //fetch snippet to edit
  const snippet = await db.snippet.findFirst({
    //turn into number, because stored in db as number
    where: { id },
  });
  //   console.log(snippet);
  if (!snippet) {
    return notFound();
  }

  return (
    <div>
      <SnippetEditForm snippet={snippet} />
    </div>
  );
}

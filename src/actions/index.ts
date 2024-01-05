"use server";
import { redirect } from "next/navigation";
import { db } from "@/app/db";

//edit snippet
export async function editSnippet(id: number, code: string) {
  await db.snippet.update({
    where: { id },
    //what new info we want to assign to the snippet we found
    data: { code },
  });

  //redirect user to show page (snippets/[id])
  redirect(`/snippets/${id}`);
}

//delete snippet
export async function deleteSnippet(id: number) {
  await db.snippet.delete({
    where: { id },
  });

  redirect(`/`);
}

export async function createSnippet(
  formState: { message: string },
  formData: FormData
) {
  //add a new record to our DB (remember, through Prisma)
  //see MDN - FormData constructor. With an <form> element, submission creates a FormData object populated from form's key/value pairs.
  //linked to name in

  //make clear to Next that this is the server action. special directive used by NextJs. If a function has this exact
  //string at the top of the function, Next treats this as a server action. executed on the server . moved this from a page
  // "use server";
  //make sure input is valid, type it with string if needed (if no checks)
  const title = formData.get("title");
  const code = formData.get("code");


  //return a message (via the useFormState hook)
  if (typeof title !== "string" || title.length < 3) {
    return {
      message: "Title must be longer",
    };
  }

  if (typeof code !== "string" || code.length < 10) {
    return {
      message: "Code must be longer",
    };
  }

  //take input and create a new record in db. using Prisma client
  const snippet = await db.snippet.create({
    data: {
      title,
      code,
    },
  });
  console.log(snippet);
  //returns a snippet (const snippet, above) that also has an id prop
  //redirect the user
  redirect("/");
}
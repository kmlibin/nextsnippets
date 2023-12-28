import { db } from "@/app/db";
import { redirect } from "next/navigation";

export default function SnippetCreatePage() {
  //add a new record to our DB (remember, through Prisma)

  //see MDN - FormData constructor. With an <form> element, submission creates a FormData object populated from form's key/value pairs.
  //linked to name in
  async function createSnippet(formData: FormData) {
    //make clear to Next that this is the server action. special directive used by NextJs. If a function has this exact
    //string at the top of the function, Next treats this as a server action. executed on the server 
    "use server";
    //make sure input is valid
    const title = formData.get("title") as string;
    const code = formData.get("code") as string;
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
  return (
    <form action={createSnippet}>
      <h3 className="font-bold m-3">Create a Snippet</h3>
      <div className="flex flex-col gap-4">
        <label className="w-12" htmlFor="title">
          Title
        </label>
        <input name="title" className="border rounded p-2 w-full" id="title" />
      </div>

      <div className="flex flex-col gap-4">
        <label className="w-12" htmlFor="code">
          Code
        </label>
        <textarea name="code" className="border rounded p-2 w-full" id="code" />
      </div>

      <button type="submit" className="rounded p-2 bg-blue-200">
        Create
      </button>
    </form>
  );
}

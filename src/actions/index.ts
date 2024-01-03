"use server";
import { redirect } from "next/navigation";
import { db } from "@/app/db";

export async function editSnippet(id: number, code: string) {
  await db.snippet.update({
    where: { id },
    //what new info we want to assign to the snippet we found
    data: { code },
  });

  //redirect user to show page (snippets/[id])
  redirect(`/snippets/${id}`);
}

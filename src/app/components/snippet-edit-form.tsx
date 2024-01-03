"use client";
//prisma makes interfaces for us out of our db
import { useState } from "react";
import type { Snippet } from "@prisma/client";
import Editor from "@monaco-editor/react";
import { editSnippet } from "@/actions";

interface SnippetEditFormProps {
  snippet: Snippet;
}

export default function SnippetEditForm(props: SnippetEditFormProps) {
  const snippet = props.snippet;
  //for default value in the code editor and for updating
  const [code, setCode] = useState(snippet.code);
  //update the code value
  const handleEditorChange = (value: string = "") => {
    setCode(value);
  };

  //bind for preloaded version with some arguments already assigned. null always first
  const editSnippetAction = editSnippet.bind(null, snippet.id, code)

  return (
    <div>
      <Editor
        height="40vh"
        theme="vs-dark"
        language="javascript"
        defaultValue={snippet.code}
        options={{ minimap: { enabled: false } }}
        onChange={handleEditorChange}
      />
      <form action ={editSnippetAction}>
        <button type="submit" className="p-2 border rounded">
            Save
        </button>
      </form>
    </div>
  );
}

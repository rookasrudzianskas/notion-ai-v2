"use client";

import React, {useEffect, useState} from 'react';
import {useRoom, useSelf} from "@liveblocks/react/suspense";
import * as Y from "yjs";
import {LiveblocksYjsProvider} from "@liveblocks/yjs";
import {Button} from "@/components/ui/button";
import {MoonIcon, SunIcon} from "lucide-react";
import { useCreateBlockNote } from "@blocknote/react";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/shadcn/style.css";
import { BlockNoteEditor } from "@blocknote/core";
import { BlockNoteView } from "@blocknote/shadcn";
import stringToColor from "@/lib/stringToColor";
import TranslateDocument from "@/components/TranslateDocument";

type EditorProps = {
  doc: Y.Doc;
  provider: any;
  darkMode: boolean;
};

function BlockNode({doc, provider, darkMode}: EditorProps) {
  const userInfo = useSelf((me) => me.info);

  const editor: BlockNoteEditor = useCreateBlockNote({
    collaboration: {
      provider,

      fragment: doc.getXmlFragment('document-store'),

      user: {
        name: userInfo?.name,
        color: stringToColor(userInfo?.email || '1'),
      }
    }
  });

  return (
    <div className={'relative max-w-6xl mx-auto'}>
      <BlockNoteView
        editor={editor}
        theme={darkMode ? "dark" : "light"}
        className={'min-h-screen'}
      />
    </div>
  )
}

const Editor = ({}) => {
  const room = useRoom();
  const [doc, setDoc] = useState<Y.Doc>();
  const [provider, setProvider] = useState<LiveblocksYjsProvider>();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const yDoc = new Y.Doc();
    const yProvider = new LiveblocksYjsProvider(room, yDoc);
    setDoc(yDoc);
    setProvider(yProvider);

    return () => {
      yDoc?.destroy();
      yProvider?.destroy();
    };

  }, [room])

  if(!doc || !provider) return null;

  const style = `hover:text-white ${
    darkMode ? 'text-gray-300 bg-gray-700 hover:bg-gray-100 hover:text-gray-700' : 'text-gray-700 bg-gray-200' +
      ' hover:bg-gray-300 hover:text-gray-700'
  }`;

  return (
    <div className={'max-w-6xl mx-auto'}>
      <div className={'flex items-center gap-2 justify-end mb-10'}>
        <TranslateDocument doc={doc} />

        <Button className={style} onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <SunIcon /> : <MoonIcon />}
        </Button>
      </div>
      <BlockNote doc={doc} provider={provider} darkMode={darkMode} />
    </div>
  );
};

export default Editor;
// by Rokas with ❤️

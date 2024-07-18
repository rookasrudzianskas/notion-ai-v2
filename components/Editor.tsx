"use client";

import React, {useEffect, useState} from 'react';
import {useRoom} from "@liveblocks/react/suspense";
import * as Y from "yjs";
import {LiveblocksYjsProvider} from "@liveblocks/yjs";
import {Button} from "@/components/ui/button";
import {MoonIcon, SunIcon} from "lucide-react";

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

        <Button className={style} onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <SunIcon /> : <MoonIcon />}
        </Button>
      </div>
      {/*<BlockNote />*/}
    </div>
  );
};

export default Editor;
// by Rokas with ❤️

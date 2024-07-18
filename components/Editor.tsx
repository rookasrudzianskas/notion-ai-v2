"use client";

import React, {useState} from 'react';
import {useRoom} from "@liveblocks/react/suspense";
import * as Y from "yjs";

const Editor = ({}) => {
  const room = useRoom();
  const [doc, setDoc] = useState<Y.Doc>();
  return (
    <div className={'max-w-6xl mx-auto'}>
      <div>

      </div>
    </div>
  );
};

export default Editor;
// by Rokas with ❤️

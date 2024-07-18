"use client";

import React, {useState} from 'react';
import {useMyPresence, useOthers} from "@liveblocks/react/suspense";

const LiveCursorProvider = ({children}: { children: React.ReactNode }) => {
  const [myPresence, updateMyPresence] = useMyPresence();
  const others = useOthers();

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const cursor = { x: Math.floor(e.pageX), y: Math.floor(e.pageY) };
    updateMyPresence({ cursor });
  }

  function handlePointerLeave(e: React.PointerEvent<HTMLDivElement>) {
    updateMyPresence({ cursor: null });
  }

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >

    </div>
  );
};

export default LiveCursorProvider;
// by Rokas with ❤️

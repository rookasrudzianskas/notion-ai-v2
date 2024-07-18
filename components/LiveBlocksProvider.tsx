"use client";

import React from 'react';
import {LiveblocksProvider} from "@liveblocks/react/suspense";

const LiveBlocksProvider = ({children}: { children: React.ReactNode }) => {

  if (!process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY) {
    throw new Error('NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY public key is not set');
  }

  return (
    <LiveblocksProvider
      authEndpoint={'/auth-endpoint'}
      throttle={16}
    >
      {children}
    </LiveblocksProvider>
  );
};

export default LiveBlocksProvider;
// by Rokas with ❤️

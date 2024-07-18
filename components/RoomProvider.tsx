"use client";

import React from 'react';
import { ClientSideSuspense, RoomProvider as RoomProviderWrapper } from "@liveblocks/react/suspense";
import LoadingSpinner from "@/components/LoadingSpinner";
import LiveCursorProvider from "@/components/LiveCursorProvider";

const RoomProvider = ({roomId, children}: { roomId: string, children: React.ReactNode }) => {
  return (
    <RoomProviderWrapper
      id={roomId}
      initialPresence={{
        cursor: null,
      }}
      // initialStorage={{
      //   people: new LiveList([new LiveObject({ name: "Marie", age: 30 })]),
      // }}
    >
      <ClientSideSuspense fallback={<LoadingSpinner />}>
        <LiveCursorProvider>
          {children}
        </LiveCursorProvider>
      </ClientSideSuspense>
    </RoomProviderWrapper>
  );
};

export default RoomProvider;
// by Rokas with ❤️

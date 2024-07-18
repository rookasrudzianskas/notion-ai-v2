"use client";

import React, {useEffect} from 'react';
import NewDocumentButton from "@/components/NewDocumentButton";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {MenuIcon} from "lucide-react";
import { useCollection } from 'react-firebase-hooks/firestore';
import {useUser} from "@clerk/nextjs";
import {collectionGroup, DocumentData, query, where} from "@firebase/firestore";
import {db} from "@/firebase";

interface RoomDocument extends DocumentData {
  createdAt: string;
  role: "owner" | "editor";
  roomId: string;
  userId: string;
}

const Sidebar = ({}) => {
  const user = useUser();
  console.log(user);
  const [data, loading, error] = useCollection(
    user &&
      query(
        collectionGroup(db, "rooms"), where("userId", "==", user.emailAddresses[0].toString())
    )
  );

  useEffect(() => {
    if (!data) return;
    const grouped = data.docs.reduce<{
      owner: RoomDocument[];
      editor: RoomDocument[];
    }>(
      (acc, curr) => {
        const roomData = curr.data() as RoomDocument;

        if (roomData.role === "owner") {
          acc.owner.push({
            id: curr.id,
            ...roomData,
          });
        } else {
          acc.editor.push({
            id: curr.id,
            ...roomData,
          });
        }
        return acc;
      }, {
        owner: [],
        editor: [],
      }
    )
  }, [data])

  const menuOptions = (
    <>
      <NewDocumentButton />
      {/*   My documents */}
      {/*   Shared with me */}
      {/*  Shared with me */}
    </>
  );

  return (
    <div className={'p-2 md:p-5 bg-gray-200 relative'}>
      <div className={'md:hidden'}>
        <Sheet>
          <SheetTrigger>
            <MenuIcon className={'p-2  hover:opacity-30 rounded-lg'} size={40} />
          </SheetTrigger>
          <SheetContent side={'left'}>
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <div>
                {menuOptions}
              </div>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>

      <div className={'hidden md:inline'}>
        {menuOptions}
      </div>
    </div>
  );
};

export default Sidebar;
// by Rokas with ❤️

import React from 'react';
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

const Sidebar = ({}) => {
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

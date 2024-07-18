"use client";

import React from 'react';
import {SignedIn, SignedOut, SignInButton, UserButton, useUser} from "@clerk/nextjs";

const Header = ({}) => {
  const { user } = useUser();

  return (
    <div className={'flex items-center justify-between p-5'}>
      {user && (
        <h1 className={'text-2xl'}>{user?.firstName}{`'s`} Space</h1>
      )}

      {/* Breadcrumbs */}

      <div>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>

    </div>
  );
};

export default Header;
// by Rokas with ❤️

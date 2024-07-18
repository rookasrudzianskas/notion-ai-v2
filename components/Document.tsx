"use client";

import React, {useEffect, useState, useTransition} from 'react';
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {doc, updateDoc} from "@firebase/firestore";
import {db} from "@/firebase";
import {useDocumentData} from "react-firebase-hooks/firestore";

const Document = ({ id }: { id: string}) => {
  const [input, setInput] = useState('');
  const [isUpdating, startTransition] = useTransition();
  const [data, loading, error] = useDocumentData(doc(db, "documents", id));

  useEffect(() => {
    if (!data) return;
    setInput(data.title);
  }, [data]);

  const updateTitle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(input.trim()) {
      startTransition(async () => {
        await updateDoc(doc(db,"documents", id), {
          title: input,
        });
      });
    }
  };

  return (
    <div>
      <div className={'flex max-w-6xl mx-auto justify-between'}>
        <form className={'flex space-x-2 flex-1'} onSubmit={updateTitle}>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            disabled={isUpdating}
            type={'submit'}
          >
            {isUpdating ? 'Updating...' : 'Update'}
          </Button>
        </form>
      </div>
      <div>

      </div>
      {/*  Collaborative editor here */}
    </div>
  );
};

export default Document;
// by Rokas with ❤️
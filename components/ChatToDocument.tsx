"use client";

import React, {FormEvent, useState, useTransition} from 'react';
import {
  Dialog, DialogClose,
  DialogContent,
  DialogDescription, DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {Button} from "@/components/ui/button";
import {usePathname, useRouter} from "next/navigation";
import {deleteDocument, inviteUserToDocument} from "@/actions/actions";
import { toast } from "sonner"
import {Input} from "@/components/ui/input";
import {BoltIcon, MessageCircleIcon} from "lucide-react";
import Markdown from "react-markdown";

const ChatToDocument = ({doc}: { doc: Y.Doc }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [input, setInput] = useState('');
  const [summary, setSummary] = useState('');
  const [question, setQuestion] = useState('');

  const handleAskQuestion = async (e: FormEvent) => {
    e.preventDefault();

  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button asChild variant={'outline'}>
        <DialogTrigger>
          <MessageCircleIcon className={'mr-2'} />
          Chat to Document
        </DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Chat to Document</DialogTitle>
          <DialogDescription>
            Ask the document a question and get a response from the AI. You can ask multiple questions at once by separating them with a comma.
          </DialogDescription>
        </DialogHeader>

        {summary && (
          <div className={'flex flex-col items-start max-h-96 overflow-y-scroll gap-2 p-5 bg-gray-100'}>
            <div className={'flex'}>
              <BoltIcon className={'w-10 flex-shrink-0'} />
              <p className={'font-bold'}>
                GPT {isPending ? "is translating..." : "translated"}
              </p>
            </div>
            <p>{isPending ? "Translating..." : <Markdown>summary</Markdown>}</p>
          </div>
        )}

        <form className={'flex gap-2'} onSubmit={handleAskQuestion}>
          <Input
            type={'text'}
            placeholder={'WHat do you want to ask?'}
            className={'w-full'}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button type={'submit'} disabled={isPending || !input}>
            {isPending ? 'Asking...' : 'Ask'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ChatToDocument;
// by Rokas with ❤️

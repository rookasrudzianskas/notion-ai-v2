import * as Y from "yjs";
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
import {Input} from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {BotIcon, LanguagesIcon} from "lucide-react";
import {toast} from "sonner";
import Markdown from "react-markdown";

type Language =
  | "english"
  | "spanish"
  | "portuguese"
  | "french"
  | "german"
  | "chinese"
  | "arabic"
  | "hindi"
  | "russian"
  | "japanese";

const languages: Language[] = [
  "english",
  "spanish",
  "portuguese",
  "french",
  "german",
  "chinese",
  "arabic",
  "hindi",
  "russian",
  "japanese",
];

const TranslateDocument = ({doc}: { doc: Y.Doc }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState<Language>('');
  const [summary, setSummary] = useState('');
  const [question, setQuestion] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleAskQuestion = async (e: FormEvent) => {
    e.preventDefault();

    startTransition(async () => {
      const documentData = doc.get("document-store").toJSON();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/translateDocument`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            document: documentData,
            targetLang: language,
          }),
        }
      );
      if(res.ok) {
        const id = toast.loading("Translating document...");
        const { translatedText } = await res.json();
        setSummary(translatedText);
        toast.success("Translated Summary succesffully!", {
          id,
        });
      }
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button asChild variant={'outline'}>
        <DialogTrigger>
          <LanguagesIcon />
          Translate
        </DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Translate Document</DialogTitle>
          <DialogDescription>
            Translate the document into your preferred language. You can
            translate multiple documents at once by separating them with a comma.
          </DialogDescription>

          <hr className={'mt-5'} />
          {question && <p className={'mt-5 text-gray-500'}>Q: {question}</p>}
        </DialogHeader>

        {summary && (
          <div className={'flex flex-col items-start max-h-96 overflow-y-scroll gap-2 p-5 bg-gray-100'}>
            <div className={'flex'}>
              <BotIcon className={'w-10 flex-shrink-0'} />
              <p className={'font-bold'}>
                GPT {isPending ? "is translating..." : "translated"}
              </p>
            </div>
            <p>{isPending ? "Translating..." : <Markdown>summary</Markdown>}</p>
          </div>
        )}

        <form className={'flex gap-2'} onSubmit={handleAskQuestion}>
          <Select
            value={language}
            onValueChange={setLanguage}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang} value={lang}>{lang}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button type={'submit'} disabled={!language || isPending}>
            {isPending ? 'Translating...' : 'Translate'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TranslateDocument;
// by Rokas with ❤️

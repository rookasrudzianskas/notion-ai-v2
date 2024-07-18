"use client";

import React, {useState, useTransition} from 'react';
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
import {deleteDocument} from "@/actions/actions";
import { toast } from "sonner"

const DeleteDocument = ({}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const router = useRouter();

  const handleDelete = async () => {
    const roomId = pathname.split("/").pop();
    if(!roomId) return;
    startTransition(async () => {
      const { success } = await deleteDocument(roomId);

      if (success) {
        setIsOpen(false);
        router.replace("/");
        toast.success("Document deleted");
      } else {
        toast.error("Something went wrong");
      }
    });
    };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button asChild variant={'destructive'}>
        <DialogTrigger>Delete</DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely to delete?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. Please type in your password to confirm
            deletion.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className={'sm:justify-end gap-2'}>
          <Button
            type={'button'}
            variant={'destructive'}
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? 'Deleting...' : 'Delete'}
          </Button>
          <DialogClose asChild>
            <Button type={'button'} variant={'secondary'}>
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDocument;
// by Rokas with ❤️

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
import {deleteDocument} from "@/actions/actions";
import { toast } from "sonner"
import {Input} from "@/components/ui/input";

const InviteUser = ({}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const router = useRouter();
  const [email, setEmail] = useState('');

  const handleInvite = async (e: FormEvent) => {
    e.preventDefault();
    const roomId = pathname.split("/").pop();
    if(!email) return;
    if(!roomId) return;



    startTransition(async () => {
      const { success } = await inviteUserToDocument(roomId);

      if (success) {
        setIsOpen(false);
        setEmail('');
        toast.success("User invited");
      } else {
        toast.error("Something went wrong");
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button asChild variant={'outline'}>
        <DialogTrigger>Invite</DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite User</DialogTitle>
          <DialogDescription>
            Enter the email address of the user you want to invite. You can
            invite multiple users by separating them with a comma.
          </DialogDescription>
        </DialogHeader>

        <form className={'flex gap-2'} onSubmit={handleInvite}>
          <Input
            type={'email'}
            placeholder={'Enter email address'}
            className={'w-full'}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button type={'submit'} disabled={isPending || !email}>
            {isPending ? 'Inviting...' : 'Invite'}
          </Button>
        </form>

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

export default InviteUser;
// by Rokas with ❤️

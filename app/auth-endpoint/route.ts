import {NextRequest, NextResponse} from "next/server";
import {auth} from "@clerk/nextjs/server";
import liveblocks from "@/lib/liveblocks";
import {adminDb} from "@/firebase-admin";

export async function POST(req: NextRequest) {
  console.log("YOU ARE AUTHORIZED!!!");
  auth().protect();

  const { userId, sessionClaims } = await auth();
  const { room } = await req.json();

  console.log("USER ID>>>", userId, "SESSION", sessionClaims);

  const session = liveblocks.prepareSession(sessionClaims?.email!, {
    userInfo: {
      name: sessionClaims?.fullName!,
      email: sessionClaims?.email!,
      avatar: sessionClaims?.image!,
    }
  });


  const usersInRoom = await adminDb
    .collectionGroup("rooms")
    .where("userId", "==", sessionClaims?.email)
    .get();

  console.log("USERS>>>>", usersInRoom);

  const userInRoom = usersInRoom.docs.find((doc) => doc.id === room);

  if (userInRoom?.exists) {
    session.allow(room, session.FULL_ACCESS);
    const { body, status } = await session.authorize();

    return new Response(body, { status });
  } else {
    return NextResponse.json({ message: 'You are not in this room' }, { status: 403 });
  }
}

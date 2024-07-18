import {User} from "@/types/types";

export {

}

declare global {
  interface CustomJwtSessionClaims extends User {}
}

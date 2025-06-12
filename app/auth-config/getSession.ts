import { auth } from "../auth"
 
export default async function getSession() {
  const session = await auth()
  //console.log("Session:", session?.user?.email);
  return session
}
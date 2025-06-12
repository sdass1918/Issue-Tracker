import { signIn } from "../auth";
import { Button, Flex } from "@radix-ui/themes";

export default function SignIn() {
  return (
    <Flex direction="column" gap="3" align="center">
      <form
        action={async () => {
          "use server";
          await signIn("github", { redirectTo: "/" });
        }}
      >
        <Button type="submit" color="gray">
          Sign in with GitHub
        </Button>
      </form>

      <form
        action={async () => {
          "use server";
          await signIn("google", { redirectTo: "/" });
        }}
      >
        <Button type="submit" color="gray">
          Sign in with Google
        </Button>
      </form>
    </Flex>
  );
}

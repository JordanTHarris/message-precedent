import { signIn } from "next-auth/react";
import {
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  use,
} from "react";
import { toast } from "sonner";
import { LoadingDots, Google, Discord } from "@/components/shared/icons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const SignInModal = ({
  showSignInModal,
  setShowSignInModal,
}: {
  showSignInModal: boolean;
  setShowSignInModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const [googleLoading, setGoogleLoading] = useState(false);
  const [discordLoading, setDiscordLoading] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);

  async function onEmailSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setEmailLoading(true);

    const formData = new FormData(event.currentTarget);

    const res = await signIn("email", {
      email: formData.get("email"),
      redirect: false,
    });

    if (res?.error) {
      toast.error("Make sure you have entered a valid email");
    } else if (res?.ok) {
      toast.success("Check your email for the login link");
      event.currentTarget.reset();
    } else {
      toast.error("Something went wrong. Please try again later.");
    }

    setEmailLoading(false);
  }

  return (
    <Dialog open={showSignInModal} onOpenChange={setShowSignInModal}>
      <DialogContent>
        <DialogHeader className="space-y-1">
          <DialogTitle className="text-2xl">Sign In</DialogTitle>
          <DialogDescription>
            Use one of the provided methods below
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-6">
            <Button
              disabled={googleLoading}
              variant="outline"
              className={`${
                googleLoading ? "cursor-not-allowed" : ""
              } flex flex-1 items-center justify-center space-x-3 transition-all duration-75 focus:outline-none`}
              onClick={() => {
                setGoogleLoading(true);
                signIn("google");
              }}
            >
              {googleLoading ? (
                <LoadingDots color="#808080" />
              ) : (
                <>
                  <Google className="h-5 w-5" />
                  <p>Google</p>
                </>
              )}
            </Button>
            <Button
              disabled={discordLoading}
              variant="outline"
              className={`${
                discordLoading ? "cursor-not-allowed" : ""
              } flex flex-1 items-center justify-center space-x-3 transition-all duration-75 focus:outline-none`}
              onClick={() => {
                setDiscordLoading(true);
                signIn("discord");
              }}
            >
              {discordLoading ? (
                <LoadingDots color="#808080" />
              ) : (
                <>
                  <Discord className="h-5 w-5" />
                  <p>Discord</p>
                </>
              )}
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <form onSubmit={onEmailSubmit} className="grid gap-6">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" className="text-base" type="email" />
            </div>
            <DialogFooter>
              <Button
                type="submit"
                disabled={emailLoading}
                size={"lg"}
                className="flex flex-1 items-center justify-center space-x-3 transition-all duration-75 focus:outline-none"
              >
                {emailLoading ? <LoadingDots /> : <p>Generate Magic Link</p>}
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export function useSignInModal() {
  const [showSignInModal, setShowSignInModal] = useState(false);

  const SignInModalCallback = useCallback(() => {
    return (
      <SignInModal
        showSignInModal={showSignInModal}
        setShowSignInModal={setShowSignInModal}
      />
    );
  }, [showSignInModal, setShowSignInModal]);

  return useMemo(
    () => ({ setShowSignInModal, SignInModal: SignInModalCallback }),
    [setShowSignInModal, SignInModalCallback],
  );
}

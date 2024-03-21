import Image from "next/image";
import { signIn } from "next-auth/react";
import {
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  use,
} from "react";
import { LoadingDots, Google, Discord } from "@/components/shared/icons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

const SignInModal = ({
  showSignInModal,
  setShowSignInModal,
}: {
  showSignInModal: boolean;
  setShowSignInModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const [googleClicked, setGoogleClicked] = useState(false);
  const [discordClicked, setDiscordClicked] = useState(false);
  const [emailClicked, setEmailClicked] = useState(false);
  const { toast } = useToast();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setEmailClicked(true);
    const res = await signIn("email", {
      email: event.currentTarget.email.value,
      redirect: false,
    });
    if (res?.error) {
      toast({
        variant: "destructive",
        description: `Something went wrong: ${res?.error}`,
      });
    } else if (res?.ok) {
      toast({
        description: "Check your email for the login link.",
      });
    }
    setEmailClicked(false);
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
              disabled={googleClicked}
              variant="outline"
              className={`${
                googleClicked ? "cursor-not-allowed" : ""
              } flex flex-1 items-center justify-center space-x-3 transition-all duration-75 focus:outline-none`}
              onClick={() => {
                setGoogleClicked(true);
                signIn("google");
              }}
            >
              {googleClicked ? (
                <LoadingDots color="#808080" />
              ) : (
                <>
                  <Google className="h-5 w-5" />
                  <p>Google</p>
                </>
              )}
            </Button>
            <Button
              disabled={discordClicked}
              variant="outline"
              className={`${
                discordClicked ? "cursor-not-allowed" : ""
              } flex flex-1 items-center justify-center space-x-3 transition-all duration-75 focus:outline-none`}
              onClick={() => {
                setDiscordClicked(true);
                signIn("discord");
              }}
            >
              {discordClicked ? (
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

          <form onSubmit={onSubmit} className="grid gap-6">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" />
            </div>
            <DialogFooter>
              <Button
                type="submit"
                disabled={emailClicked}
                className="flex flex-1 items-center justify-center space-x-3 transition-all duration-75 focus:outline-none"
              >
                {emailClicked ? <LoadingDots /> : <p>Generate Magic Link</p>}
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

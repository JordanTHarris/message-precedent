import Image from "next/image";
import { signIn } from "next-auth/react";
import {
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
} from "react";
import { LoadingDots, Google, Discord } from "@/components/shared/icons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
  const [googleClicked, setGoogleClicked] = useState(false);
  const [discordClicked, setDiscordClicked] = useState(false);

  return (
    <Dialog open={showSignInModal} onOpenChange={setShowSignInModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sign In</DialogTitle>
          <DialogDescription>
            Sign in to your account to continue
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Username
            </Label>
            <Input id="name" placeholder="GodGamer123" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              Password
            </Label>
            <Input id="password" className="col-span-3" />
          </div>
          <Button
            disabled={googleClicked}
            className={`${
              googleClicked ? "cursor-not-allowed " : "border"
            } flex items-center justify-center space-x-3 transition-all duration-75 focus:outline-none`}
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
            className={`${
              discordClicked ? "cursor-not-allowed " : "border"
            } flex items-center justify-center space-x-3 transition-all duration-75 focus:outline-none`}
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

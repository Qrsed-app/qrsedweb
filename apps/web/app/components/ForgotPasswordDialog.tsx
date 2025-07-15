import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { authClient } from "../lib/auth-client";
import { validateEmail } from "../lib/schemas";

type ForgotPasswordForm = {
  email: string;
};

type ForgotPasswordDialogProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

export default function ForgotPasswordDialog({ isOpen, setIsOpen }: ForgotPasswordDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<ForgotPasswordForm>();

  const onSubmit = async (data: ForgotPasswordForm) => {
    if (!validateEmail(data.email)) {
      setError("email", { message: "Please enter a valid email address" });
      return;
    }

    setIsLoading(true);
    setMessage("");
    setMessageType("");

    try {
      await authClient.requestPasswordReset({
        email: data.email,
        redirectTo: "https://qrsedweb.localhost/reset-password",
      });
      setMessage("Password reset email sent! Check your inbox.");
      setMessageType("success");
      setTimeout(() => {
        setIsOpen(false);
        reset();
        setMessage("");
        setMessageType("");
      }, 2000);
    } catch (err) {
      console.error("Password reset failed:", err);
      setMessage("Failed to send reset email. Please try again.");
      setMessageType("error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      reset();
      setMessage("");
      setMessageType("");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reset Password</DialogTitle>
          <DialogDescription>
            Enter your email address and we'll send you a link to reset your password.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="reset-email">Email</Label>
            <Input
              id="reset-email"
              type="email"
              placeholder="elminster@faerun.com"
              {...register("email")}
              autoComplete="email"
            />
            {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
          </div>
          {message && (
            <div
              className={`rounded-md p-3 text-sm ${
                messageType === "success"
                  ? "bg-green-50 text-green-700"
                  : "bg-destructive/15 text-destructive"
              }`}
            >
              {message}
            </div>
          )}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Sending..." : "Send Reset Email"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

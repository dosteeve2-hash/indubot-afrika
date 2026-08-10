"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export default function SignInButton({
  provider,
  label,
}: {
  provider: "google" | "github";
  label: string;
}) {
  const [loading, setLoading] = useState(false);

  async function handleSignIn() {
    setLoading(true);
    try {
      await authClient.signIn.social({ provider, callbackURL: "/dashboard" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      disabled={loading}
      onClick={handleSignIn}
      size="sm"
      type="button"
      variant="outline"
    >
      {loading ? "Connexion..." : label}
    </Button>
  );
}

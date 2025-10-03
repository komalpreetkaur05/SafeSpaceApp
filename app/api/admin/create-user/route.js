"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  useAuth,
  useSignIn,
  useSignUp,
  useUser,
} from "@clerk/nextjs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SiteHeader from "@/components/site-header";

export default function SafespacePlatform() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("signin"); // "signin" or "signup"

  const router = useRouter();
  const { isSignedIn } = useAuth();
  const { signIn, setActive: setSignInActive } = useSignIn();
  const { signUp, setActive: setSignUpActive } = useSignUp();
  const { user } = useUser();

  // Redirect after login/signup based on role
  useEffect(() => {
    if (isSignedIn && user) {
      const email =
        user.primaryEmailAddress?.emailAddress ??
        user.emailAddresses[0]?.emailAddress;

      if (email) {
        fetch("/api/get-user-role", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, userId: user.id }),
        })
          .then((res) => res.json())
          .then(({ role }) => {
            if (role && role.trim().toLowerCase() === "admin") {
              router.push("/admin/overview");
            } else if (role === "team_leader" || role === "support_worker") {
              router.push("/dashboard");
            } else {
              router.push("/dashboard");
            }
          });
      }
    }
  }, [isSignedIn, user, router]);

  // Handle Sign In
  const handleLogin = async () => {
    setLoading(true);
    try {
      const result = await signIn.create({
        identifier: form.email,
        password: form.password,
      });

      if (result.status === "complete") {
        await setSignInActive({ session: result.createdSessionId });
      } else {
        alert("Login failed. Please check credentials.");
      }
    } catch (err) {
      console.error(err);
      alert("Couldn't sign in: " + err.errors?.[0]?.message ?? "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  // Handle Sign Up
  const handleSignup = async () => {
    setLoading(true);
    try {
      const result = await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });

      if (result.status === "complete") {
        await setSignUpActive({ session: result.createdSessionId });
      } else {
        alert("Signup failed. Try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Couldn't sign up: " + err.errors?.[0]?.message ?? "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader
        isAuthenticated={isSignedIn}
        userName={user?.fullName ?? null}
      />

      {!isSignedIn && (
        <section className="flex min-h-[calc(100vh-56px)] items-center justify-center bg-gradient-to-br from-teal-50 to-green-100 p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-teal-600">
                <img
                  src="/images/logo.png"
                  alt="SafeSpace Logo"
                  className="h-10 w-10"
                />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-800">
                <span className="text-teal-600">Safe</span>
                <span className="text-gray-900">Space</span>
              </CardTitle>
              <CardDescription>
                {mode === "signin"
                  ? "Sign in to access your account"
                  : "Create a new account"}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                />
              </div>

              {mode === "signin" ? (
                <Button
                  onClick={handleLogin}
                  disabled={loading}
                  className="w-full bg-teal-600 hover:bg-teal-700"
                >
                  {loading ? "Signing In..." : "Sign In"}
                </Button>
              ) : (
                <Button
                  onClick={handleSignup}
                  disabled={loading}
                  className="w-full bg-teal-600 hover:bg-teal-700"
                >
                  {loading ? "Signing Up..." : "Sign Up"}
                </Button>
              )}

              <div className="text-center text-sm text-gray-600">
                {mode === "signin" ? (
                  <>
                    Don’t have an account?{" "}
                    <button
                      onClick={() => setMode("signup")}
                      className="text-teal-600 hover:underline"
                    >
                      Sign up
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <button
                      onClick={() => setMode("signin")}
                      className="text-teal-600 hover:underline"
                    >
                      Sign in
                    </button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </section>
      )}
    </div>
  );
}

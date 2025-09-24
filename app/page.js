"use client";

import { useState } from "react";
import { useSignIn, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Shield, Loader2 } from "lucide-react";
import InteractiveDashboard from "../app/interactive/page.jsx";
import SiteHeader from "../components/site-header.jsx";
import { mapClerkRoleToAppRole } from "../lib/role";


export default function SafespacePlatform() {
  const { user, isLoaded } = useUser();
  const { signIn, setActive } = useSignIn();
  const router = useRouter();
  
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // If user is already authenticated, show dashboard
  if (isLoaded && user) {
    const userRole = mapClerkRoleToAppRole(user);
    return (
      <div className="min-h-screen bg-gray-50">
        <SiteHeader
          isAuthenticated={true}
          userName={user.firstName || "User"}
          onSignOut={() => {}} // Clerk handles this
        />
        <InteractiveDashboard
          userRole={userRole}
          userName={user.firstName || "User"}
        />
      </div>
    );
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!signIn) return;

    setIsLoading(true);
    setError("");

    try {
      const result = await signIn.create({
        identifier: loginForm.email,
        password: loginForm.password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        // User will be redirected automatically due to the useUser check above
      } else {
        // Handle other sign-in flows if needed
        console.error("Sign-in incomplete:", result);
        setError("Sign-in failed. Please try again.");
      }
    } catch (err) {
      console.error("Sign-in error:", err);
      setError("Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading while Clerk is initializing
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show  login form 
  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader
        isAuthenticated={false}
        userName={null}
        onSignOut={() => {}}
      />

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
            <CardTitle className="text-2xl font-bold text-gray-900">
              <span className="text-teal-600">Safe</span>
              <span className="text-gray-900">Space</span>
            </CardTitle>
            <CardDescription>Mental Health Support Platform</CardDescription>
            <p className="text-sm text-gray-500 mt-2">Staff Members Only</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-3 py-2 rounded text-sm">
                  {error}
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={loginForm.email}
                  onChange={(e) =>
                    setLoginForm({ ...loginForm, email: e.target.value })
                  }
                  required
                  disabled={isLoading}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={loginForm.password}
                  onChange={(e) =>
                    setLoginForm({ ...loginForm, password: e.target.value })
                  }
                  required
                  disabled={isLoading}
                />
              </div>
              
              <Button
                type="submit"
                className="w-full bg-teal-600 hover:bg-teal-700"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  <>
                    <Shield className="h-4 w-4 mr-2" />
                    Sign In
                  </>
                )}
              </Button>
            </form>
            
            <div className="text-center pt-4 border-t">
              <p className="text-xs text-gray-500">
                Need access? Contact your system administrator.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
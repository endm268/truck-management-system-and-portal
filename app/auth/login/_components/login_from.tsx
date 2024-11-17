"use client";

import { useState, startTransition } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react"; // Import signIn function from NextAuth
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginForm() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();

  // Define the handleSubmit function to handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission
    setError(""); // Reset error before login attempt

    try {
      const result = await signIn("credentials", {
        redirect: false, // Disable automatic redirect
        userName: username, // Pass username and password as credentials
        password: password,
      });

      if (result?.error) {
        setError(result.error); // Display error message if login failed
      } else {
        startTransition(() => {
          router.push("/dashboard/overview"); // Redirect on successful login
        });
      }
    } catch (err) {
      setError("An error occurred during login."); // Fallback error message
      console.error("Login error:", err);
    }
  };

  return (
    <div
      className="flex h-screen items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600"
      dir="rtl"
      style={{
        backgroundImage: "url('/path-to-your-background-image.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-black bg-opacity-50 w-full h-full absolute top-0 left-0 z-0" />
      <Card className="w-full max-w-sm relative z-10 bg-white bg-opacity-90 shadow-lg">
        <CardHeader>
          <CardTitle>تسجيل الدخول</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="username">اسم المستخدم</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="password">كلمة المرور</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              تسجيل الدخول
            </Button>
            {error && <p className="text-red-500 text-center">{error}</p>}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

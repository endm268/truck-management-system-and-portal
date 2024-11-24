"use client";

import { useState, startTransition } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginForm() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      const result = await signIn("credentials", {
        redirect: false,
        userName: username,
        password: password,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        startTransition(() => {
          router.push("/dashboard/overview");
        });
      }
    } catch (err) {
      setError("حدث خطأ أثناء تسجيل الدخول.");
      console.error("Login error:", err);
    }
  };

  return (
    <div
      className="flex h-screen items-center justify-center w-full bg-white dark:bg-black p-4"
      dir="rtl"
    >
      <Card className="w-full max-w-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-lg rounded-lg p-6">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold">تسجيل الدخول</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label
                htmlFor="username"
                className="text-gray-600 dark:text-gray-300"
              >
                اسم المستخدم
              </Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="mt-1 bg-white dark:bg-gray-700 dark:text-gray-100"
              />
            </div>
            <div>
              <Label
                htmlFor="password"
                className="text-gray-600 dark:text-gray-300"
              >
                كلمة المرور
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 bg-white dark:bg-gray-700 dark:text-gray-100"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white"
            >
              تسجيل الدخول
            </Button>
            {error && <p className="text-red-500 text-center">{error}</p>}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

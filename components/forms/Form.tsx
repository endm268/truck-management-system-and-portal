// components/forms/MyCustomForm.tsx
"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface MyCustomFormProps {
  onSubmit: (data: any) => void;
}

const MyCustomForm: React.FC<MyCustomFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, email });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="p-2 border rounded-md dark:bg-gray-800 dark:border-gray-600"
      />
      <Input
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="p-2 border rounded-md dark:bg-gray-800 dark:border-gray-600"
      />
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default MyCustomForm;

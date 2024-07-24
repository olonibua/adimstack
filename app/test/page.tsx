import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const MemberFormValidation = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(50, { message: "Name must be at most 50 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

const MemberFormDefaultValues = {
  name: "",
  email: "",
  password: "",
};

export default function Home() {
  const form = useForm({
    resolver: zodResolver(MemberFormValidation),
    defaultValues: MemberFormDefaultValues,
  });

  const onSubmit = (values: any) => {
    console.log("Form submitted", values);
  };

  return (
    <div>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div>
          <label>Name</label>
          <input {...form.register("name")} />
        </div>
        <div>
          <label>Email</label>
          <input {...form.register("email")} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" {...form.register("password")} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

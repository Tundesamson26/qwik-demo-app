/* eslint-disable @typescript-eslint/no-unused-vars */
import { component$, useSignal } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { z } from 'zod';
import { Button } from "~/components/ui/button/button";
import { Input } from "~/components/ui/input/input";
import { LuCommand } from "@qwikest/icons/lucide";
import type { InitialValues } from "@modular-forms/qwik";
import { useForm, zodForm$ } from "@modular-forms/qwik";

// Define your schema using Zod
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Created type using login schema
type LoginForm = z.infer<typeof loginSchema>;

// Set initial values
export const useFormLoader = routeLoader$<InitialValues<LoginForm>>(() => ({
  email: "",
  password: "",
}));

export default component$(() => {
  // Initialize the form with Zod validation and Modular Form
  const [, { Form, Field }] = useForm<LoginForm>({
    loader: useFormLoader(),
    validate: zodForm$(loginSchema),
  });

  return (
    <div class="flex h-screen">
      {/* Left panel */}
      <div class="hidden lg:flex lg:w-1/2 bg-black text-white flex-col justify-between p-12">
        <div>
          <div class="flex items-center space-x-2">
            <LuCommand class="w-8 h-8" />
            <span class="text-xl font-semibold">Acme Inc</span>
          </div>
        </div>
        <div class="text-[18rem] font-bold pl-5">dro</div>
        <div>
          <p class="text-lg mb-2">
            "This library has saved me countless hours of work and helped me
            deliver stunning designs to my clients faster than ever before."
          </p>
          <p class="font-semibold">Sofia Davis</p>
        </div>
      </div>

      {/* Right panel */}
      <div class="w-full lg:w-1/2 flex items-center justify-center p-12">
        <div class="w-full max-w-md">
          <h2 class="text-3xl font-bold mb-2">Login</h2>
          <p class="text-gray-600 mb-8">
            Enter your email below to login to your account
          </p>

          {/* Modular Form */}
          <Form>
            <div class="space-y-6">
              <div>
                <label
                  for="email"
                  class="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <Field name="email">
                  {({ value, error }, props: any) => (
                    <Input
                      {...props}
                      id="email"
                      type="email"
                      placeholder="m@telvida.com"
                      value={value}
                      class="rounded-lg"
                    />
                  )}
                </Field>
              </div>
              <div>
                <label
                  for="password"
                  class="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <Field name="password">
                  {({ value, error }, props: any) => (
                    <Input
                      {...props}
                      id="password"
                      type="password"
                      value={value}
                      class="rounded-lg"
                    />
                  )}
                </Field>
              </div>
              <Button class="w-full my-2 rounded-lg">Login</Button>
            </div>
          </Form>

          <p class="mt-4 text-sm text-gray-600">
            By clicking continue, you agree to our
            <a href="#" class="text-black hover:underline">
              {" "}
              Terms of Service
            </a>{" "}
            and
            <a href="#" class="text-black hover:underline">
              {" "}
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
});

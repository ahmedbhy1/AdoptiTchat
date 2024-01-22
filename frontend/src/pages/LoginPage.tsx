import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import Input from "../components/Input";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const onSubmit = async () => {
    await login({ email, password });
  };

  const shouldDisableSaveButton = !email || !password || password.length < 4; 

  return (
    <div className="w-full max-w-lg">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <Input type="email" placeholder="ahmed@gmail.com" label="Email" id="email" onChange={(value: string) => setEmail(value)} />
        <Input type="password" placeholder="******************" label="Password" id="password" onChange={(value: string) => setPassword(value)} />
        <div className="flex items-center justify-between">
          <button className="btn btn-primary" type="button" onClick={onSubmit} disabled={shouldDisableSaveButton}>
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
}
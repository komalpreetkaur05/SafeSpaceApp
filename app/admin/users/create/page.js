"use client";

import { useState } from "react";

export default function CreateUserPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "team_leader",
  });
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    try {
      const res = await fetch("/api/users/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("User created successfully!");
        setForm({ firstName: "", lastName: "", email: "", role: "team_leader" });
      } else {
        setMessage(data.error || "Failed to create user");
      }
    } catch (err) {
      console.error(err);
      setMessage("Error creating user");
    }
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Create User</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <input
          type="text"
          placeholder="First name"
          value={form.firstName}
          onChange={e => setForm({ ...form, firstName: e.target.value })}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Last name"
          value={form.lastName}
          onChange={e => setForm({ ...form, lastName: e.target.value })}
          className="w-full border p-2 rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          className="w-full border p-2 rounded"
        />
        <select
          value={form.role}
          onChange={e => setForm({ ...form, role: e.target.value })}
          className="w-full border p-2 rounded"
        >
          <option value="team_leader">Team Leader</option>
          <option value="support_worker">Support Worker</option>
        </select>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Create User
        </button>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </main>
  );
}

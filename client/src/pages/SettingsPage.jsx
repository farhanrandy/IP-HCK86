import { useState } from 'react';

export default function SettingsPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSave = (e) => {
    e.preventDefault();
    alert('Settings saved');
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSave} className="flex flex-col gap-2 max-w-md">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="border p-2"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="border p-2"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
      </form>
    </div>
  );
}

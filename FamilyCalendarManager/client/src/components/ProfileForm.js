import React, { useState } from 'react';

function ProfileForm({ onSubmit }) {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    people: [],
  });

  // Handle change for name and email fields
  // For people, you'll want a way to add and remove individual people

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(profile);
  };

  // Form validation and error handling would also be necessary here

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={profile.name}
        // other attributes
      />
      <input
        name="email"
        value={profile.email}
        // other attributes
      />
      {/* Render people fields */}
      <button type="submit">Save Profile</button>
    </form>
  );
}

export default ProfileForm;

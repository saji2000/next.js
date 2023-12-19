// Events.tsx
"use client";

import React, { useState, useEffect } from "react";
import { IEvent } from "./types";

const Events = () => {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [newEvent, setNewEvent] = useState<IEvent>({
    id: 0, // This should be generated automatically in a real application
    dj_name: "",
    location: "",
    date: "",
    attendees: 0,
    price: 0,
  });

  // Fetch events from the server
  useEffect(() => {
    const fetchEvents = async () => {
      console.log("In Read");
      const response = await fetch("../api/read.tsx", { method: "GET" });
      const data = await response.json();
      console.log(data);
      setEvents(data);
    };

    fetchEvents();
  }, []);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  // Handle new event submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("/api/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEvent),
    });

    if (response.ok) {
      setEvents([...events, newEvent]);
      // Reset the form or give some feedback
    }
    // Handle errors or give feedback
  };

  // Render the component
  return (
    <div>
      <h1>DJ Events</h1>
      <form onSubmit={handleSubmit}>
        {/* Form fields for each property of IEvent */}
        <input
          name="dj_name"
          placeholder="DJ Name"
          onChange={handleInputChange}
        />
        {/* Repeat for other fields */}
        <button type="submit">Add Event</button>
      </form>

      <ul>
        {events.map((event) => (
          <li key={event.id}>
            {event.dj_name} in {event.location} on {event.date}
            {/* Add buttons or links for update and delete */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Events;

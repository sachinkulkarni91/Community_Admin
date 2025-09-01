import React, { useState } from 'react';

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  platform: 'Zoom' | 'Teams' | 'Google Meet';
  link: string;
}

const defaultPlatforms = [
  { label: 'Zoom', value: 'Zoom' },
  { label: 'Teams', value: 'Teams' },
  { label: 'Google Meet', value: 'Google Meet' },
];

const EventsPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    platform: 'Zoom',
    link: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEvents([
      ...events,
      {
        id: Date.now(),
        ...form,
        platform: form.platform as 'Zoom' | 'Teams' | 'Google Meet',
      },
    ]);
    setShowModal(false);
    setForm({ title: '', description: '', date: '', time: '', platform: 'Zoom', link: '' });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Events</h2>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => setShowModal(true)}
        >
          + Create Event
        </button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {events.length === 0 && <div className="text-gray-500">No events yet.</div>}
        {events.map(event => (
          <div key={event.id} className="bg-white rounded shadow p-4 flex flex-col gap-2">
            <div className="font-semibold text-lg">{event.title}</div>
            <div className="text-sm text-gray-600">{event.description}</div>
            <div className="text-xs text-gray-500">{event.date} {event.time}</div>
            <div className="text-xs">Platform: <span className="font-medium">{event.platform}</span></div>
            <a href={event.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-xs">Join Link</a>
          </div>
        ))}
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <form className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md flex flex-col gap-4" onSubmit={handleSubmit}>
            <h3 className="text-xl font-bold mb-2">Create Event</h3>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Event Title"
              className="border rounded px-3 py-2"
              required
            />
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Description"
              className="border rounded px-3 py-2"
              required
            />
            <div className="flex gap-2">
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="border rounded px-3 py-2 w-1/2"
                required
              />
              <input
                type="time"
                name="time"
                value={form.time}
                onChange={handleChange}
                className="border rounded px-3 py-2 w-1/2"
                required
              />
            </div>
            <select
              name="platform"
              value={form.platform}
              onChange={handleChange}
              className="border rounded px-3 py-2"
              required
            >
              {defaultPlatforms.map(p => (
                <option key={p.value} value={p.value}>{p.label}</option>
              ))}
            </select>
            <input
              name="link"
              value={form.link}
              onChange={handleChange}
              placeholder="Meeting Link (Zoom/Teams/GMeet)"
              className="border rounded px-3 py-2"
              required
            />
            <div className="flex justify-end gap-2 mt-2">
              <button type="button" className="px-4 py-2 rounded bg-gray-200" onClick={() => setShowModal(false)}>Cancel</button>
              <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white">Create</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default EventsPage;


import React, { useState } from 'react';
import displayError from '../utils/error-toaster';
import { toast } from 'react-toastify';
import { getAnnouncements, createAnnouncement } from '../services/announcements';
import type { Announcement } from '../services/announcements';

// No initialAnnouncements needed

// type imported from services/announcements

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [header, setHeader] = useState("");
  const [subcontent, setSubcontent] = useState("");
  const [showForm, setShowForm] = useState(false);
  React.useEffect(() => {
    getAnnouncements()
      .then(data => setAnnouncements(Array.isArray(data) ? data : []))
      .catch(() => setAnnouncements([]));
  }, []);

  const handleAdd = () => {
    if (header.trim()) {
      createAnnouncement(header, subcontent)
        .then(() => {
          // Refetch announcements after add
          getAnnouncements()
            .then(data => setAnnouncements(Array.isArray(data) ? data : []));
          setHeader("");
          setSubcontent("");
          setShowForm(false);
          toast.success("Announcement added successfully!");
        })
        .catch((err) => {
          displayError(err);
        });
    }
  };

  return (
  <div className="flex min-h-screen bg-[#f7f7fa]">
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Announcements</h2>
          <button
            className="bg-[#00338D] text-white px-2 py-1 rounded-md text-sm hover:bg-[#002a75] transition"
            onClick={() => setShowForm(true)}
          >
            + Add Announcement
          </button>
        </div>
        <div className="flex flex-col gap-4">
          {announcements.length === 0 ? (
            <div className="text-center text-gray-400 py-8">
              <span>No announcements yet. Stay tuned for updates!</span>
            </div>
          ) : (
              announcements.map((announcement: Announcement, idx: number) => (
                <div key={idx} className="border rounded-lg p-2 bg-transparent shadow flex flex-col gap-1">
                  <span className="text-base font-semibold">{announcement.header}</span>
                  {announcement.subcontent && <span className="text-sm text-gray-700">{announcement.subcontent}</span>}
                </div>
              ))
          )}
        </div>
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 border relative flex flex-col items-center">
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
                onClick={() => setShowForm(false)}
                aria-label="Close"
              >
                &times;
              </button>
              <div className="w-full flex flex-col items-center mb-4">
                <h2 className="text-xl font-bold text-center">Add Announcement</h2>
              </div>
              <input
                type="text"
                placeholder="Announcement header..."
                className="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-base font-semibold"
                value={header}
                onChange={e => setHeader(e.target.value)}
              />
              <textarea
                placeholder="Announcement details (optional)..."
                className="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
                value={subcontent}
                onChange={e => setSubcontent(e.target.value)}
                rows={4}
              />
              <div className="flex justify-end gap-2 w-full">
                <button
                  className="bg-blue-700 text-white px-6 py-2 rounded-lg text-base font-medium shadow hover:bg-blue-800 transition"
                  onClick={handleAdd}
                >
                  Add
                </button>
                <button
                  className="bg-gray-200 px-6 py-2 rounded-lg text-base font-medium shadow hover:bg-gray-300 transition"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
    
  );
}

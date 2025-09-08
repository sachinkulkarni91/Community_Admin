import React, { useState, useRef, useEffect } from 'react';
import type { Event as ApiEvent } from '../../services/events';
import { getEvents, deleteEvent, formatEventDate, formatEventTime, getEventStatus } from '../../services/events';
import NewEvent from '../../CommonComponents/NewEvent';
import EditEvent from '../../CommonComponents/EditEvent';
import displayError from '../../utils/error-toaster';

interface UIEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  image?: string;
  category?: string;
  status: 'upcoming' | 'past';
  isPartnerEvent?: boolean;
}

const Events = () => {
  const [activeTab, setActiveTab] = useState<'new' | 'past'>('new');
  const [showFilter, setShowFilter] = useState(false);
  const [viewCalendar, setViewCalendar] = useState(false);
  const [newEventDisplay, setNewEventDisplay] = useState(false);
  const [events, setEvents] = useState<UIEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingEvent, setEditingEvent] = useState<UIEvent | null>(null);
  const newEventRef = useRef<HTMLDivElement | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  // Fetch events from API
  const fetchEvents = async () => {
    try {
      setLoading(true);
      console.log('Fetching events from API...');
      
      // Try to use the regular events endpoint instead of admin-only getAllEvents
      const eventsData = await getEvents();
      console.log('Raw events data from API:', eventsData);
      
      // Check if eventsData exists and has events array
      if (!eventsData || !eventsData.events) {
        console.error('Invalid API response structure:', eventsData);
        throw new Error('Invalid API response structure');
      }
      
      // Transform API events to local UIEvent interface
      const transformedEvents: UIEvent[] = eventsData.events.map((event: ApiEvent) => {
        const eventId = (event as any).id || event._id;
        console.log('Processing event:', event.title, 'ID:', eventId);
        if (!eventId) {
          console.warn('Event missing id:', event);
        }
        return {
          id: eventId,
          title: event.title,
          description: event.description,
          date: formatEventDate(event.startDateTime),
          time: formatEventTime(event.startDateTime),
          image: event.image,
          category: event.category,
          status: (getEventStatus(event) === 'past' ? 'past' : 'upcoming') as 'upcoming' | 'past',
          isPartnerEvent: false
        };
      });
      
      console.log('Transformed events:', transformedEvents);
      console.log('Events count:', transformedEvents.length);
      
      setEvents(transformedEvents);
    } catch (error) {
      console.error('Failed to fetch events from API:', error);
      displayError(error);
  // If API fails, clear events
  setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Handle modal close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (newEventRef.current && !newEventRef.current.contains(event.target as Node)) {
        setNewEventDisplay(false);
      }
    };

    if (newEventDisplay) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [newEventDisplay]);

  const handleEventCreated = () => {
    fetchEvents(); // Refresh the events list
  };

  const handleEventUpdated = () => {
    fetchEvents(); // Refresh the events list after edit
    setEditingEvent(null); // Close edit modal
  };

  const handleEditEvent = (event: UIEvent) => {
    setEditingEvent(event);
  };

  const handleDeleteEvent = async (eventId: string) => {
    if (!eventId || eventId.startsWith('temp-')) {
      displayError(new Error('Cannot delete event: Invalid backend event ID.'));
      return;
    }
    try {
      await deleteEvent(eventId);
      await fetchEvents(); // Refresh list
    } catch (error) {
      console.error('Delete event error:', error);
      displayError(error);
    }
  };

  const openDeleteModal = (eventId: string) => {
    setSelectedEventId(eventId);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (selectedEventId) await handleDeleteEvent(selectedEventId);
    setShowDeleteModal(false);
    setSelectedEventId(null);
  };

  const filteredEvents = events.filter(event => 
    activeTab === 'new' ? event.status === 'upcoming' : event.status === 'past'
  );

  console.log('Active tab:', activeTab);
  console.log('Total events:', events.length);
  console.log('Filtered events:', filteredEvents.length);
  console.log('Events statuses:', events.map(e => ({ title: e.title, status: e.status })));

  const EventCard = ({ event }: { event: UIEvent }) => {
    const getEventImage = () => {
      if (event.image) {
        if (event.image.startsWith('http')) {
          return event.image;
        } else if (event.image.startsWith('/')) {
          return event.image;
        } else {
          return `/assets/${event.image}`;
        }
      }
      return '/assets/generic4.jpg';
    };

    return (
      <div className="bg-post rounded-xl p-2 shadow-sm hover:shadow-md transition-shadow max-w-xs">
        <div className="relative mb-2">
          <img 
            src={getEventImage()} 
            alt={event.title}
            className="w-full h-43 object-cover rounded-lg"
            onError={(e) => {
              e.currentTarget.src = "/assets/generic.jpg";
            }}
          />
          {/* Partner Event Badge */}
          {event.isPartnerEvent && (
            <div className="absolute top-1 left-1">
              <span className="bg-purple-600 text-white text-xs px-1 py-0.5 rounded-full font-medium">
                Partner Event
              </span>
            </div>
          )}
          <div className="absolute top-1 right-1">
            <div className="flex gap-1">
              <button 
                onClick={() => handleEditEvent(event)}
                className="p-1.5 bg-white/80 rounded-full hover:bg-white transition-colors"
                title="Edit Event"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button 
                onClick={() => openDeleteModal(event.id)}
                className="p-1.5 bg-white/80 rounded-full hover:bg-white transition-colors text-[#00338D]"
                title="Delete Event"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="space-y-1">
          <h3 className="font-semibold text-text line-clamp-2 text-[0.8rem] leading-tight">
            {event.title}
          </h3>
          <div className="flex items-center gap-2 text-[0.7rem] text-lightText">
            <span className="flex items-center gap-1">
              <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {new Date(event.date).toLocaleDateString()}
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {event.time}
            </span>
          </div>
          <div className="flex gap-1">
            <button 
              onClick={() => handleEditEvent(event)}
              className="flex-1 bg-[#00338D] text-white py-1 px-2 rounded-lg text-[0.7rem] font-medium hover:bg-[#00338D]/90 transition-colors flex items-center justify-center gap-1"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit
            </button>
          </div>
        </div>
      </div>
    );
  // ...existing code...
  };

  return (
    <div className="flex flex-1 flex-col gap-6 pt-6 overflow-auto">
      {newEventDisplay && (
        <NewEvent 
          ref={newEventRef} 
          setVisible={setNewEventDisplay} 
          onEventCreated={handleEventCreated}
        />
      )}

      {editingEvent && (
        <EditEvent 
          event={editingEvent}
          setVisible={setEditingEvent}
          onEventUpdated={handleEventUpdated}
        />
      )}
      
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-text">My Events</h1>
        <button
          onClick={() => setNewEventDisplay(true)}
          className='bg-[#00338D] text-white px-3 py-1.5 rounded-lg flex items-center gap-1.5 hover:bg-[#002a75] transition-colors text-sm'
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
          </svg>
          New Event
        </button>
      </div>
      
      {/* Navigation and Controls */}
      <div className="flex justify-between items-center">
        <div className="flex gap-1 bg-secondary rounded-lg p-1">
          <button 
            onClick={() => setActiveTab('new')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'new' 
                ? 'bg-white text-text shadow-sm' 
                : 'text-lightText hover:text-text'
            }`}
          >
            New events
          </button>
          <button 
            onClick={() => setActiveTab('past')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'past' 
                ? 'bg-white text-text shadow-sm' 
                : 'text-lightText hover:text-text'
            }`}
          >
            Past events
          </button>
        </div>
        
        <div className="flex gap-3">
          <button 
            onClick={() => setShowFilter(!showFilter)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-text hover:bg-secondary transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
            </svg>
            Filter
          </button>
          
          <button 
            onClick={() => setViewCalendar(!viewCalendar)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-text hover:bg-secondary transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            View calendar
          </button>
        </div>
      </div>
      
      {/* Events Grid */}
      {loading ? (
        <div className='flex justify-center items-center h-64'>
          <div className="w-8 h-8 border-4 border-[#00338D] border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
      
      {/* Empty State */}
      {!loading && filteredEvents.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-lightText" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-text mb-2">No {activeTab} events</h3>
          <p className="text-lightText mb-4">
            {activeTab === 'new' 
              ? "There are no upcoming events at the moment." 
              : "No past events to display."}
          </p>
          {activeTab === 'new' && (
            <button
              onClick={() => setNewEventDisplay(true)}
              className='bg-[#00338D] text-white px-6 py-2 rounded-lg hover:bg-[#002a75] transition-colors'
            >
              Create Your First Event
            </button>
          )}
        </div>
      )}
    {/* Custom Delete Confirmation Modal */}
    {showDeleteModal && (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(0,0,0,0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
      }}>
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 2px 16px rgba(0,0,0,0.15)',
          minWidth: '320px',
          textAlign: 'center'
        }}>
          <h3 style={{marginBottom: '1rem'}}>Are you sure you want to delete this event?</h3>
          <div style={{display: 'flex', justifyContent: 'center', gap: '1rem'}}>
            <button
              onClick={confirmDelete}
              style={{background: '#00338D', color: 'white', padding: '0.5rem 1.5rem', borderRadius: '6px', border: 'none', fontWeight: 'bold'}}
            >Delete</button>
            <button
              onClick={() => setShowDeleteModal(false)}
              style={{background: '#e0e0e0', color: '#333', padding: '0.5rem 1.5rem', borderRadius: '6px', border: 'none', fontWeight: 'bold'}}
            >Cancel</button>
          </div>
        </div>
      </div>
    )}
    </div>
  );
};

export default Events;

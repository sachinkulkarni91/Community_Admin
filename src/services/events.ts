import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5174';

// Interfaces matching backend models
export interface CreateEventData {
  title: string;
  description: string;
  community: string; // Required by backend
  startDateTime: string; // ISO date string
  endDateTime: string; // ISO date string
  platform: string; // "Zoom", "In-Person", "Hybrid", etc.
  meetingLink?: string;
  maxAttendees?: number;
  category: string; // "Workshop", "Webinar", etc. (capitalized)
  tags?: string[];
}

// Interfaces matching backend models
export interface User {
  _id: string;
  name: string;
  username: string;
  profilePhoto?: string;
}

export interface Community {
  _id: string;
  name: string;
  profilePhoto?: string;
}

export interface Attendee {
  user: User;
  enrolledAt: Date;
  status: 'enrolled' | 'attended' | 'cancelled';
}

export interface Event {
  _id: string;
  title: string;
  description: string;
  community: Community;
  organizer: User;
  startDateTime: Date;
  endDateTime: Date;
  platform: 'virtual' | 'in-person' | 'hybrid';
  meetingLink?: string;
  location?: string;
  maxAttendees?: number;
  attendees: Attendee[];
  category: 'workshop' | 'webinar' | 'networking' | 'training' | 'conference' | 'social' | 'other';
  tags: string[];
  image?: string;
  status: 'draft' | 'published' | 'cancelled' | 'completed';
  isRecurring: boolean;
  recurringPattern?: {
    frequency: 'daily' | 'weekly' | 'monthly';
    interval: number;
    endDate?: Date;
  };
  createdAt: Date;
  updatedAt: Date;
  // Virtual properties
  isPast?: boolean;
  isUpcoming?: boolean;
  isLive?: boolean;
  attendeeCount?: number;
  spotsLeft?: number;
}

export interface EventsResponse {
  events: Event[];
  pagination: {
    current: number;
    pages: number;
    total: number;
    limit: number;
  };
}

export interface EventStats {
  total: number;
  draft: number;
  upcoming: number;
  past: number;
  totalAttendees: number;
}

export interface UpdateEventData extends Partial<CreateEventData> {}

class EventsService {
  private async makeRequest<T>(endpoint: string, options?: {
    method?: string;
    data?: any;
    params?: any;
  }): Promise<T> {
    try {
      const response = await axios({
        url: `/api/events${endpoint}`,
        method: options?.method || 'GET',
        data: options?.data,
        params: options?.params,
      });

      return response.data;
    } catch (error: any) {
      console.error(`Events API Error (${endpoint}):`, error);
      const errorMessage = error.response?.data?.error || 
                          error.response?.data?.message || 
                          error.message || 
                          'Unknown error';
      throw new Error(errorMessage);
    }
  }

  // Admin: Get all events (no community filtering)
  async getAllEvents(params?: {
    status?: string;
    timeFilter?: 'upcoming' | 'past' | 'live';
    limit?: number;
    page?: number;
  }): Promise<EventsResponse> {
    const queryParams = new URLSearchParams();
    if (params?.status) queryParams.append('status', params.status);
    if (params?.timeFilter) queryParams.append('timeFilter', params.timeFilter);
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.page) queryParams.append('page', params.page.toString());

    const query = queryParams.toString();
    return this.makeRequest<EventsResponse>(`/all${query ? `?${query}` : ''}`);
  }

  // Get events for current user (consumer view)
  async getEvents(params?: {
    community?: string;
    status?: string;
    timeFilter?: 'upcoming' | 'past' | 'live';
    limit?: number;
    page?: number;
  }): Promise<EventsResponse> {
    const queryParams = new URLSearchParams();
    if (params?.community) queryParams.append('community', params.community);
    if (params?.status) queryParams.append('status', params.status);
    if (params?.timeFilter) queryParams.append('timeFilter', params.timeFilter);
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.page) queryParams.append('page', params.page.toString());

    const query = queryParams.toString();
    return this.makeRequest<EventsResponse>(`/${query ? `?${query}` : ''}`);
  }

  // Get single event
  async getEvent(id: string): Promise<Event> {
    return this.makeRequest<Event>(`/${id}`);
  }

  // Admin: Create new event
  async createEvent(eventData: CreateEventData): Promise<Event> {
    return this.makeRequest<Event>('/', {
      method: 'POST',
      data: eventData,
    });
  }

  // Admin: Update event
  async updateEvent(id: string, eventData: UpdateEventData): Promise<Event> {
    return this.makeRequest<Event>(`/${id}`, {
      method: 'PUT',
      data: eventData,
    });
  }

  // Admin: Delete event
  async deleteEvent(id: string): Promise<void> {
    console.log('Deleting event with ID:', id);
    
    if (!id) {
      throw new Error('Event ID is required for deletion');
    }
    
    return this.makeRequest<void>(`/${id}`, {
      method: 'DELETE',
    });
  }

  // Upload event image
  async uploadImage(file: File): Promise<{ imageUrl: string; publicId: string }> {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch(`${API_BASE_URL}/api/events/upload-image`, {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Image upload error:', error);
      throw error;
    }
  }

  // Get event statistics (admin only)
  async getEventStats(): Promise<EventStats> {
    return this.makeRequest<EventStats>('/stats');
  }

  // Enroll in event
  async enrollInEvent(id: string): Promise<{ message: string; event: Event }> {
    return this.makeRequest<{ message: string; event: Event }>(`/${id}/enroll`, {
      method: 'POST',
    });
  }

  // Unenroll from event
  async unenrollFromEvent(id: string): Promise<{ message: string; event: Event }> {
    return this.makeRequest<{ message: string; event: Event }>(`/${id}/enroll`, {
      method: 'DELETE',
    });
  }

  // Get user's enrolled events
  async getMyEvents(timeFilter?: 'upcoming' | 'past'): Promise<Event[]> {
    const query = timeFilter ? `?timeFilter=${timeFilter}` : '';
    return this.makeRequest<Event[]>(`/my/enrolled${query}`);
  }
}

// Helper functions
export const formatEventDate = (date: Date | string): string => {
  const eventDate = new Date(date);
  return eventDate.toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const formatEventTime = (date: Date | string): string => {
  const eventDate = new Date(date);
  return eventDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

export const formatEventDateTime = (date: Date | string): string => {
  return `${formatEventDate(date)} at ${formatEventTime(date)}`;
};

export const getEventStatus = (event: Event): 'upcoming' | 'live' | 'past' => {
  const now = new Date();
  const start = new Date(event.startDateTime);
  const end = new Date(event.endDateTime);

  if (now < start) return 'upcoming';
  if (now >= start && now <= end) return 'live';
  return 'past';
};

export const isUserEnrolled = (event: Event, userId: string): boolean => {
  return event.attendees.some(attendee => attendee.user._id === userId);
};

export const canEnrollInEvent = (event: Event, userId: string): boolean => {
  if (getEventStatus(event) !== 'upcoming') return false;
  if (isUserEnrolled(event, userId)) return false;
  if (event.maxAttendees && event.attendees.length >= event.maxAttendees) return false;
  return true;
};

export const getAvailableSpots = (event: Event): number | null => {
  if (!event.maxAttendees) return null;
  return event.maxAttendees - event.attendees.length;
};

// Create and export singleton instance
const eventsService = new EventsService();
export default eventsService;
export { eventsService };

// Export individual methods for convenience - bound to the instance
export const getAllEvents = eventsService.getAllEvents.bind(eventsService);
export const getEvents = eventsService.getEvents.bind(eventsService);
export const getEvent = eventsService.getEvent.bind(eventsService);
export const createEvent = eventsService.createEvent.bind(eventsService);
export const updateEvent = eventsService.updateEvent.bind(eventsService);
export const deleteEvent = eventsService.deleteEvent.bind(eventsService);
export const uploadImage = eventsService.uploadImage.bind(eventsService);
export const getEventStats = eventsService.getEventStats.bind(eventsService);
export const enrollInEvent = eventsService.enrollInEvent.bind(eventsService);
export const unenrollFromEvent = eventsService.unenrollFromEvent.bind(eventsService);
export const getMyEvents = eventsService.getMyEvents.bind(eventsService);

// Legacy compatibility exports (matching old interface)
export const getEventById = getEvent;

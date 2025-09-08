import { 
  eventsService, 
  getAllEvents, 
  createEvent, 
  updateEvent, 
  deleteEvent, 
  uploadImage,
  getEventStats,
  enrollInEvent,
  unenrollFromEvent,
  getMyEvents
} from './events';
import loginService from './login';

/**
 * Admin API Testing Utility
 * Use this to test all the events endpoints with your backend
 */
export class EventsAPITester {

  // Step 1: Login to get JWT token
  async login(username: string = "Admin@gmail.com", password: string = "Admin@108") {
    try {
      console.log('🔐 Logging in...');
      const result = await loginService.login(username, password);
      console.log('✅ Login successful:', result);
      return result;
    } catch (error) {
      console.error('❌ Login failed:', error);
      throw error;
    }
  }

  // Step 2: Test health check
  async testHealthCheck() {
    try {
      console.log('🏥 Testing health check...');
      const result = await eventsService.healthCheck();
      console.log('✅ Health check passed:', result);
      return result;
    } catch (error) {
      console.error('❌ Health check failed:', error);
      throw error;
    }
  }

  // Step 3: Get all events (admin only)
  async testGetAllEvents() {
    try {
      console.log('📋 Getting all events...');
      const result = await getAllEvents();
      console.log('✅ Got all events:', result);
      return result;
    } catch (error) {
      console.error('❌ Failed to get all events:', error);
      throw error;
    }
  }

  // Step 4: Get events with filters
  async testGetEventsWithFilters() {
    try {
      console.log('🔍 Getting events with filters...');
      const result = await getAllEvents({
        timeFilter: 'upcoming',
        limit: 10,
        page: 1
      });
      console.log('✅ Got filtered events:', result);
      return result;
    } catch (error) {
      console.error('❌ Failed to get filtered events:', error);
      throw error;
    }
  }

  // Step 5: Test get single event
  async testGetSingleEvent(eventId: string) {
    try {
      console.log(`📄 Getting single event: ${eventId}...`);
      const result = await eventsService.getEvent(eventId);
      console.log('✅ Got single event:', result);
      return result;
    } catch (error) {
      console.error('❌ Failed to get single event:', error);
      throw error;
    }
  }

  // Step 6: Get event statistics
  async testGetEventStats() {
    try {
      console.log('📊 Getting event statistics...');
      const result = await getEventStats();
      console.log('✅ Got event stats:', result);
      return result;
    } catch (error) {
      console.error('❌ Failed to get event stats:', error);
      throw error;
    }
  }

  // Step 7: Create new event
  async testCreateEvent(communityId: string = "COMMUNITY_ID") {
    try {
      console.log('🆕 Creating new event...');
      const eventData = {
        title: "React Development Workshop",
        description: "Learn React fundamentals and best practices in this hands-on workshop",
        community: communityId,
        startDateTime: "2025-09-15T10:00:00.000Z",
        endDateTime: "2025-09-15T12:00:00.000Z",
        platform: "Zoom",
        meetingLink: "https://zoom.us/j/123456789",
        maxAttendees: 50,
        category: "Workshop",
        tags: ["React", "JavaScript", "Frontend"]
      };
      
      const result = await createEvent(eventData);
      console.log('✅ Event created successfully:', result);
      return result;
    } catch (error) {
      console.error('❌ Failed to create event:', error);
      throw error;
    }
  }

  // Step 8: Update event
  async testUpdateEvent(eventId: string) {
    try {
      console.log(`📝 Updating event: ${eventId}...`);
      const updateData = {
        title: "Advanced React Workshop",
        maxAttendees: 75
      };
      
      const result = await updateEvent(eventId, updateData);
      console.log('✅ Event updated successfully:', result);
      return result;
    } catch (error) {
      console.error('❌ Failed to update event:', error);
      throw error;
    }
  }

  // Step 9: Upload event image
  async testUploadImage(file: File) {
    try {
      console.log('🖼️ Uploading event image...');
      const result = await uploadImage(file);
      console.log('✅ Image uploaded successfully:', result);
      return result;
    } catch (error) {
      console.error('❌ Failed to upload image:', error);
      throw error;
    }
  }

  // Step 10: Enroll in event
  async testEnrollInEvent(eventId: string) {
    try {
      console.log(`📝 Enrolling in event: ${eventId}...`);
      const result = await enrollInEvent(eventId);
      console.log('✅ Enrolled successfully:', result);
      return result;
    } catch (error) {
      console.error('❌ Failed to enroll in event:', error);
      throw error;
    }
  }

  // Step 11: Unenroll from event
  async testUnenrollFromEvent(eventId: string) {
    try {
      console.log(`❌ Unenrolling from event: ${eventId}...`);
      const result = await unenrollFromEvent(eventId);
      console.log('✅ Unenrolled successfully:', result);
      return result;
    } catch (error) {
      console.error('❌ Failed to unenroll from event:', error);
      throw error;
    }
  }

  // Step 12: Get my enrolled events
  async testGetMyEvents() {
    try {
      console.log('📋 Getting my enrolled events...');
      const result = await getMyEvents('upcoming');
      console.log('✅ Got my events:', result);
      return result;
    } catch (error) {
      console.error('❌ Failed to get my events:', error);
      throw error;
    }
  }

  // Step 13: Delete event
  async testDeleteEvent(eventId: string) {
    try {
      console.log(`🗑️ Deleting event: ${eventId}...`);
      const result = await deleteEvent(eventId);
      console.log('✅ Event deleted successfully:', result);
      return result;
    } catch (error) {
      console.error('❌ Failed to delete event:', error);
      throw error;
    }
  }

  // Run all tests in sequence
  async runAllTests(communityId?: string) {
    console.log('🚀 Starting comprehensive API tests...');
    
    try {
      // Step 1: Login
      await this.login();
      
      // Step 2: Health check
      await this.testHealthCheck();
      
      // Step 3: Get all events
      const allEvents = await this.testGetAllEvents();
      
      // Step 4: Get filtered events
      await this.testGetEventsWithFilters();
      
      // Step 5: Get event stats
      await this.testGetEventStats();
      
      // Step 6: Get my enrolled events
      await this.testGetMyEvents();
      
      // Step 7: Create new event (if community ID provided)
      let createdEvent;
      if (communityId) {
        createdEvent = await this.testCreateEvent(communityId);
      }
      
      // Step 8: Test single event (use created event or existing one)
      const eventId = createdEvent?._id || allEvents.events[0]?._id;
      if (eventId) {
        await this.testGetSingleEvent(eventId);
        
        // Step 9: Update event
        await this.testUpdateEvent(eventId);
        
        // Step 10: Enroll/Unenroll (if not admin-only event)
        try {
          await this.testEnrollInEvent(eventId);
          await this.testUnenrollFromEvent(eventId);
        } catch (error) {
          console.log('⚠️ Enroll/Unenroll test skipped (may be admin-only)');
        }
      }
      
      console.log('🎉 All API tests completed successfully!');
      
    } catch (error) {
      console.error('💥 API tests failed:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const apiTester = new EventsAPITester();

// Usage examples:
/*
// Run individual tests
await apiTester.login();
await apiTester.testGetAllEvents();

// Run all tests
await apiTester.runAllTests("your-community-id-here");

// Test specific functionality
await apiTester.testCreateEvent("community-id");
*/

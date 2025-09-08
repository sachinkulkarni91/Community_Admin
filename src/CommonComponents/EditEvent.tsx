import React, { useState, useRef, useEffect } from 'react'
import displayError from '../utils/error-toaster'
import { updateEvent } from '../services/events'
import ImageUpload from './ImageUpload'
import Input from './Input'

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

type Props = {
  event: UIEvent;
  setVisible: React.Dispatch<React.SetStateAction<UIEvent | null>>;
  onEventUpdated?: () => void;
}

const EditEvent = ({ event, setVisible, onEventUpdated }: Props) => {
  const [isPartnerEvent, setIsPartnerEvent] = useState(event.isPartnerEvent || false);
  const [title, setTitle] = useState(event.title)
  const [description, setDescription] = useState(event.description)
  const [startDate, setStartDate] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endDate, setEndDate] = useState('')
  const [endTime, setEndTime] = useState('')
  const [platform, setPlatform] = useState<'virtual' | 'in-person' | 'hybrid'>('virtual')
  const [location, setLocation] = useState('')
  const [meetingLink, setMeetingLink] = useState('')
  const [maxAttendees, setMaxAttendees] = useState('')
  const [category, setCategory] = useState<'workshop' | 'webinar' | 'networking' | 'training' | 'conference' | 'social' | 'other'>(event.category as any || 'workshop')
  const [file, setFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Initialize form with event data
  useEffect(() => {
    // Parse date and time from event.date and event.time
    const eventDate = new Date(event.date);
    setStartDate(eventDate.toISOString().split('T')[0]);
    setStartTime(event.time);
    // For now, set end date/time as 2 hours later (you may want to get this from API)
    const endDateTime = new Date(eventDate.getTime() + 2 * 60 * 60 * 1000);
    setEndDate(endDateTime.toISOString().split('T')[0]);
    setEndTime(endDateTime.toTimeString().slice(0, 5));
  }, [event]);

  // Handle event update
  const handleUpdateEvent = async () => {
    if (isSubmitting) return;
    
    // Basic validation
    if (!title.trim() || !description.trim() || !startDate || !startTime || !endDate || !endTime) {
      displayError(new Error('Please fill in all required fields'));
      return;
    }

    setIsSubmitting(true);
    try {
      // Combine date and time for startDateTime and endDateTime
      const startDateTime = new Date(`${startDate}T${startTime}`);
      const endDateTime = new Date(`${endDate}T${endTime}`);

      // Validate dates
      if (isNaN(startDateTime.getTime()) || isNaN(endDateTime.getTime())) {
        displayError(new Error('Invalid date or time'));
        return;
      }

      if (startDateTime >= endDateTime) {
        displayError(new Error('End time must be after start time'));
        return;
      }

      // Create update payload
      const eventData: any = {
        title: title.trim(),
        description: description.trim(),
        startDateTime: startDateTime.toISOString(),
        endDateTime: endDateTime.toISOString(),
        platform: platform === 'virtual' ? 'Zoom' : platform === 'in-person' ? 'In-Person' : 'Hybrid',
        category: category.charAt(0).toUpperCase() + category.slice(1),
        tags: [category],
        isPartnerEvent: isPartnerEvent
      };

      // Add optional fields
      if (platform !== 'in-person' && meetingLink.trim()) {
        eventData.meetingLink = meetingLink.trim();
      }
      
      if (maxAttendees && parseInt(maxAttendees) > 0) {
        eventData.maxAttendees = parseInt(maxAttendees);
      }

      console.log('Updating event data:', eventData);

      // Upload image first if one was selected
      if (file) {
        try {
          console.log('Uploading new image...');
          // const imageResult = await uploadImage(file);
          // eventData.image = imageResult.imageUrl;
          console.log('Image upload would happen here');
        } catch (imageError) {
          console.warn('Failed to upload image:', imageError);
        }
      }

      await updateEvent(event.id, eventData);
      
      setVisible(null);
      
      // Callback to refresh events list
      if (onEventUpdated) {
        onEventUpdated();
      }
      
    } catch (error) {
      console.error('Error updating event:', error);
      displayError(error instanceof Error ? error : new Error('Failed to update event'));
    } finally {
      setIsSubmitting(false);
    }
  }

  // Handle click outside to close modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setVisible(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setVisible]);

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-30 flex items-center justify-center">
        <div ref={ref} className="bg-post py-6 px-6 z-40 rounded-2xl flex flex-col w-[40%] max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
          <div className='rounded-2xl mb-6 h-20'>
            <img className="rounded-2xl object-cover h-full w-full" src={event.image || "/assets/generic4.jpg"} alt="event editing" />
          </div>
          
          <div className='font-bold font-condensed text-xl text-left mb-4 text-text'>Edit Event</div>
          
          <div className='mb-6'>
            <div className='text-sm text-text mb-3 font-medium text-left'>Event Image</div>
            <ImageUpload width="100" height="60" setFile={setFile} />
          </div>
          <div className='mb-4 flex items-center'>
            <input
              id="partnered"
              type="checkbox"
              checked={isPartnerEvent}
              onChange={e => setIsPartnerEvent(e.target.checked)}
              className='mr-2 accent-[#00338D] w-4 h-4'
            />
            <label htmlFor="partnered" className='text-sm text-text font-medium'>Partnered Event</label>
          </div>
          
          <div className='grid grid-cols-2 gap-4 mb-4'>
            <Input 
              id="title" 
              type="text" 
              label="Event Title" 
              placeholder='Enter event title' 
              value={title} 
              setValue={setTitle} 
            />
            <div className='flex flex-col text-left'>
              <label className='text-xs text-text mb-2 font-medium relative'>
                <span className='bg-post px-1'>Platform *</span>
              </label>
              <select
                className='border border-gray-300 text-text bg-post w-full h-10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00338D] focus:border-transparent'
                value={platform}
                onChange={(e) => setPlatform(e.target.value as 'virtual' | 'in-person' | 'hybrid')}
              >
                <option value="virtual">Virtual</option>
                <option value="in-person">In-Person</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
            <Input 
              id="startDate" 
              type="date" 
              label="Start Date" 
              placeholder='dd-mm-yyyy' 
              value={startDate} 
              setValue={setStartDate} 
            />
            <Input 
              id="startTime" 
              type="time" 
              label="Start Time" 
              placeholder='--:--' 
              value={startTime} 
              setValue={setStartTime} 
            />
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
            <Input 
              id="endDate" 
              type="date" 
              label="End Date" 
              placeholder='dd-mm-yyyy' 
              value={endDate} 
              setValue={setEndDate} 
            />
            <Input 
              id="endTime" 
              type="time" 
              label="End Time" 
              placeholder='--:--' 
              value={endTime} 
              setValue={setEndTime} 
            />
          </div>

          {platform !== 'virtual' && (
            <div className='mb-4'>
              <Input 
                id="location" 
                type="text" 
                label="Location" 
                placeholder='Enter event location' 
                value={location} 
                setValue={setLocation} 
              />
            </div>
          )}

          {platform !== 'in-person' && (
            <div className='mb-4'>
              <Input 
                id="meetingLink" 
                type="url" 
                label="Meeting Link" 
                placeholder='Enter meeting link (Zoom, Teams, etc.)' 
                value={meetingLink} 
                setValue={setMeetingLink} 
              />
            </div>
          )}

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
            <div className='flex flex-col text-left'>
              <label className='text-xs text-text mb-2 font-medium relative'>
                <span className='bg-post px-1'>Description *</span>
              </label>
              <textarea
                className='px-3 py-2 rounded-lg border border-gray-300 bg-post text-text text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#00338D] focus:border-transparent placeholder:text-lightText h-20'
                placeholder='Enter event description'
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className='flex flex-col text-left'>
              <label className='text-xs text-text mb-2 font-medium relative'>
                <span className='bg-post px-1'>Max Attendees</span>
              </label>
              <input
                className='border border-gray-300 text-text bg-post w-full h-20 rounded-lg px-3 py-2 text-sm placeholder:text-lightText focus:outline-none focus:ring-2 focus:ring-[#00338D] focus:border-transparent'
                type="number"
                placeholder='Enter max attendees'
                value={maxAttendees}
                onChange={(e) => setMaxAttendees(e.target.value)}
              />
            </div>
          </div>

          <div className='mb-4'>
            <div className='flex flex-col text-left'>
              <label className='text-xs text-text mb-2 font-medium relative'>
                <span className='bg-post px-1'>Category *</span>
              </label>
              <select
                className='border border-gray-300 text-text bg-post w-full h-10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00338D] focus:border-transparent'
                value={category}
                onChange={(e) => setCategory(e.target.value as 'workshop' | 'webinar' | 'networking' | 'training' | 'conference' | 'social' | 'other')}
              >
                <option value="workshop">Workshop</option>
                <option value="webinar">Webinar</option>
                <option value="networking">Networking</option>
                <option value="training">Training</option>
                <option value="conference">Conference</option>
                <option value="social">Social</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className='mt-6 flex justify-between'>
            <button 
              className='py-2 px-4 rounded-2xl text-lightText text-sm items-center cursor-pointer hover:bg-gray-100' 
              onClick={() => setVisible(null)}
            >
              Cancel
            </button>
            <button 
              className={`py-2 px-4 rounded-2xl text-white bg-[#00338D] flex text-sm items-center gap-2 transition-all duration-300 hover:bg-[#002a75] ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={handleUpdateEvent}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Updating...
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 
                      .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"
                    />
                  </svg>
                  Update Event
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditEvent

/**
 * API Layer Usage Examples
 * Copy-paste these examples in your components
 */

import { eventsApi, usersApi, api } from '@/lib/api';

// ==================== EVENTS API EXAMPLES ====================

// 1. GET all events
export const getAllEventsExample = async () => {
  try {
    const response = await eventsApi.getAll();
    console.log('All events:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error:', error.message);
  }
};

// 2. GET single event
export const getSingleEventExample = async (eventId) => {
  try {
    const response = await eventsApi.getById(eventId);
    console.log('Event:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error:', error.message);
  }
};

// 3. CREATE new event
export const createEventExample = async () => {
  try {
    const newEvent = {
      name: 'React Conference 2024',
      details: 'Amazing React conference with latest updates',
      location: 'Dhaka, Bangladesh',
      imageUrl: 'https://example.com/image.jpg'
    };
    
    const response = await eventsApi.create(newEvent);
    console.log('Created event:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error:', error.message);
  }
};

// 4. UPDATE event
export const updateEventExample = async (eventId) => {
  try {
    const updates = {
      name: 'Updated Event Name',
      location: 'New Location'
    };
    
    const response = await eventsApi.update(eventId, updates);
    console.log('Updated event:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error:', error.message);
  }
};

// 5. DELETE event
export const deleteEventExample = async (eventId) => {
  try {
    const response = await eventsApi.delete(eventId);
    console.log('Deleted:', response.message);
    return true;
  } catch (error) {
    console.error('Error:', error.message);
    return false;
  }
};

// ==================== USERS API EXAMPLES ====================

// 1. GET all users
export const getAllUsersExample = async () => {
  try {
    const response = await usersApi.getAll();
    return response.data;
  } catch (error) {
    console.error('Error:', error.message);
  }
};

// 2. CREATE new user
export const createUserExample = async () => {
  try {
    const newUser = {
      name: 'John Doe',
      email: 'john@example.com'
    };
    
    const response = await usersApi.create(newUser);
    return response.data;
  } catch (error) {
    console.error('Error:', error.message);
  }
};

// ==================== GENERAL API EXAMPLES ====================

// 1. Custom endpoint with general api
export const customApiExample = async () => {
  try {
    // GET request
    const getData = await api.get('/custom-endpoint');
    
    // POST request
    const postData = await api.post('/custom-endpoint', { 
      key: 'value' 
    });
    
    // PUT request
    const putData = await api.put('/custom-endpoint/123', { 
      updated: true 
    });
    
    // DELETE request
    const deleteData = await api.delete('/custom-endpoint/123');
    
    return { getData, postData, putData, deleteData };
  } catch (error) {
    console.error('Error:', error.message);
  }
};

// ==================== REACT COMPONENT EXAMPLES ====================

// Example: Event Management Component
export const EventManagerComponent = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load events
  const loadEvents = async () => {
    setLoading(true);
    try {
      const response = await eventsApi.getAll();
      setEvents(response.data);
    } catch (error) {
      console.error('Failed to load events:', error);
    } finally {
      setLoading(false);
    }
  };

  // Create event
  const handleCreateEvent = async (eventData) => {
    try {
      const response = await eventsApi.create(eventData);
      setEvents(prev => [...prev, response.data]);
      alert('Event created successfully!');
    } catch (error) {
      alert('Failed to create event: ' + error.message);
    }
  };

  // Update event
  const handleUpdateEvent = async (eventId, updates) => {
    try {
      const response = await eventsApi.update(eventId, updates);
      setEvents(prev => prev.map(event => 
        event.id === eventId ? response.data : event
      ));
      alert('Event updated successfully!');
    } catch (error) {
      alert('Failed to update event: ' + error.message);
    }
  };

  // Delete event
  const handleDeleteEvent = async (eventId) => {
    if (!confirm('Are you sure?')) return;
    
    try {
      await eventsApi.delete(eventId);
      setEvents(prev => prev.filter(event => event.id !== eventId));
      alert('Event deleted successfully!');
    } catch (error) {
      alert('Failed to delete event: ' + error.message);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  // Component JSX here...
};

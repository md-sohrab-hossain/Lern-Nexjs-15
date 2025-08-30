import { eventModel } from "@/models/events";
import { replaceMongoIdInArray, replaceMongoIdInObject } from "@/utils/data-util";
import dbConnect from "@/lib/mongodb";

class EventService {
  async getAllEvents(searchQuery = '') {
    await dbConnect();
    let query = {};
    
    if (searchQuery) {
      // Create case-insensitive search across name, details, and location
      const searchRegex = new RegExp(searchQuery, 'i');
      query = {
        $or: [
          { name: searchRegex },
          { details: searchRegex },
          { location: searchRegex }
        ]
      };
    }
    
    const allEvents = await eventModel.find(query).lean();
    return replaceMongoIdInArray(allEvents);
  }

  async getEventById(eventId) {
    await dbConnect();
    const event = await eventModel.findById(eventId).lean();
    if (!event) {
      throw new Error('Event not found');
    }
    return replaceMongoIdInObject(event);
  }

  async createEvent(eventData) {
    await dbConnect();
    const event = await eventModel.create(eventData);
    return replaceMongoIdInObject(event.toObject());
  }

  async updateEvent(eventId, eventData) {
    await dbConnect();
    const event = await eventModel.findByIdAndUpdate(
      eventId, 
      eventData, 
      { new: true, runValidators: true }
    ).lean();
    if (!event) {
      throw new Error('Event not found');
    }
    return replaceMongoIdInObject(event);
  }

  async deleteEvent(eventId) {
    await dbConnect();
    const event = await eventModel.findByIdAndDelete(eventId).lean();
    if (!event) {
      throw new Error('Event not found');
    }
    return { success: true, message: 'Event deleted successfully' };
  }

  async updateInterest(eventId, userId) {
    await dbConnect();
    const event = await eventModel.findById(eventId);
    
    if (!event) {
      throw new Error('Event not found');
    }

    const foundUser = event.interested_ids.find(id => id.toString() === userId);

    if (foundUser) {
      // Remove user from interested list
      event.interested_ids.pull(userId);
    } else {
      // Add user to interested list
      event.interested_ids.push(userId);
    }

    await event.save();
    return replaceMongoIdInObject(event.toObject());
  }

  async updateGoing(eventId, userId) {
    await dbConnect();
    const event = await eventModel.findById(eventId);
    
    if (!event) {
      throw new Error('Event not found');
    }

    // Check if user is already going
    const foundUser = event.going_ids.find(id => id.toString() === userId);
    
    if (!foundUser) {
      // Add user to going list (only add, don't toggle)
      event.going_ids.push(userId);
      await event.save();
    }

    return replaceMongoIdInObject(event.toObject());
  }
}

export const eventService = new EventService();
export default eventService;

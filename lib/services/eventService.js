import { eventModel } from "@/models/events";
import { replaceMongoIdInArray, replaceMongoIdInObject } from "@/utils/data-util";
import dbConnect from "@/lib/mongodb";

class EventService {
  async getAllEvents() {
    await dbConnect();
    const allEvents = await eventModel.find().lean();
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
}

export const eventService = new EventService();
export default eventService;

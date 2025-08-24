import eventService from "@/lib/services/eventService";

export async function GET(_, { params }) {
  try {
    const { id } = params;
    const event = await eventService.getEventById(id);
    return Response.json({ success: true, data: event });
  } catch (error) {
    console.error('Error in GET /api/events/[id]:', error);
    const status = error.message === 'Event not found' ? 404 : 400;
    return Response.json(
      { success: false, error: error.message },
      { status }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const event = await eventService.updateEvent(id, body);
    return Response.json({ success: true, data: event });
  } catch (error) {
    console.error('Error in PUT /api/events/[id]:', error);
    const status = error.message === 'Event not found' ? 404 : 400;
    return Response.json(
      { success: false, error: error.message },
      { status }
    );
  }
}

export async function DELETE(_, { params }) {
  try {
    const { id } = params;
    await eventService.deleteEvent(id);
    return Response.json({ success: true, message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error in DELETE /api/events/[id]:', error);
    const status = error.message === 'Event not found' ? 404 : 400;
    return Response.json(
      { success: false, error: error.message },
      { status }
    );
  }
}

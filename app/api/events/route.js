import eventService from "@/lib/services/eventService";

export async function GET() {
  try {
    const events = await eventService.getAllEvents();
    return Response.json({ success: true, data: events });
  } catch (error) {
    console.error('Error in GET /api/events:', error);
    return Response.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const event = await eventService.createEvent(body);
    return Response.json({ success: true, data: event }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/events:', error);
    return Response.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

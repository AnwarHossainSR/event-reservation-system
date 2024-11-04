import { Prisma, PrismaClient } from '@prisma/client';

class EventService {
    private prisma = new PrismaClient();

    public async createEvent(data: Prisma.EventCreateInput): Promise<any> {
        try {
            // Assuming startDate and endDate are the same for a single-day event
            const startDate = data.startDate; // using the provided date as startDate
            const endDate = data.endDate; // using the provided date as endDate

            // Check for overlapping events based on startDate, endDate, and venue
            const overlapEvent = await this.prisma.event.findFirst({
                where: {
                    venue: data.venue,
                    AND: [
                        {
                            startDate: { lte: endDate },
                        },
                        {
                            endDate: { gte: startDate },
                        },
                    ],
                },
            });

            if (overlapEvent) {
                throw new Error(
                    'An event is already scheduled at this time and venue.'
                );
            }

            return await this.prisma.event.create({ data });
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    public async updateEvent(
        id: string,
        data: Prisma.EventUpdateInput
    ): Promise<any> {
        try {
            const event = await this.prisma.event.findUnique({ where: { id } });
            if (!event) throw new Error('Event not found');

            // Extract new values for venue, startDate, and endDate from incoming data
            const venue = data.venue || event.venue; // Use existing venue if not provided
            const startDate = data.startDate || event.startDate; // Use existing startDate if not provided
            const endDate = data.endDate || event.endDate; // Use existing endDate if not provided

            // Prepare the where conditions for overlapping events
            const whereConditions: Prisma.EventWhereInput = {
                id: { not: id }, // Exclude the current event
                venue: venue as string, // Ensure this is a string
                AND: [
                    {
                        startDate: { lte: endDate as Date }, // Ensure endDate is a Date
                    },
                    {
                        endDate: { gte: startDate as Date }, // Ensure startDate is a Date
                    },
                ] as Prisma.EventWhereInput[], // Explicitly assert the type
            };

            // Check for overlapping events if venue, startDate, or endDate are provided
            const overlapEvent = await this.prisma.event.findFirst({
                where: whereConditions,
            });

            if (overlapEvent) {
                throw new Error(
                    'Another event is already scheduled at this time and venue.'
                );
            }

            // Prepare the update data
            const updateData: Prisma.EventUpdateInput = {
                ...data, // Include any other fields from data
                venue,
                startDate,
                endDate,
            };

            // Perform the update
            return await this.prisma.event.update({
                where: { id },
                data: updateData,
            });
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    public async deleteEvent(id: string): Promise<void> {
        try {
            const event = await this.prisma.event.findUnique({ where: { id } });
            if (!event) throw new Error('Event not found');

            await this.prisma.event.delete({ where: { id } });
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    public async getEvents(): Promise<any[]> {
        try {
            return await this.prisma.event.findMany();
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}

export default EventService;

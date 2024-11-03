import { Prisma, PrismaClient } from '@prisma/client';

class EventService {
    private prisma = new PrismaClient();

    public async createEvent(data: Prisma.EventCreateInput): Promise<any> {
        try {
            const overlapEvent = await this.prisma.event.findFirst({
                where: {
                    venue: data.venue,
                    date: data.date,
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

            return await this.prisma.event.update({
                where: { id },
                data,
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

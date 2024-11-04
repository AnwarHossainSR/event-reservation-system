import { PrismaClient, Reservation } from '@prisma/client';

class ReservationService {
    private prisma = new PrismaClient();

    public async createReservation(
        userId: string,
        eventId: string,
        seats: number,
        startDate: Date,
        endDate: Date
    ): Promise<Reservation | Error> {
        try {
            const reservationData = {
                startDate,
                endDate,
                seats,
                user: { connect: { id: userId } },
                event: { connect: { id: eventId } },
            };

            const reservation = await this.prisma.reservation.create({
                data: reservationData,
            });
            return reservation;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    public async getReservation(id: string): Promise<Reservation | null> {
        try {
            return await this.prisma.reservation.findUnique({
                where: { id },
                include: { user: true, event: true },
            });
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}

export default ReservationService;

import adminMiddleware from '@/middleware/admin.middleware';
import authenticatedMiddleware from '@/middleware/authenticated.middleware';
import validationMiddleware from '@/middleware/validation.middleware';
import HttpException from '@/utils/exceptions/http.exception';
import Controller from '@/utils/interfaces/controller.interface';
import { NextFunction, Request, Response, Router } from 'express';
import EventService from './event.service';
import validate from './event.validation';

class EventController implements Controller {
    public path = '/events';
    public router = Router();
    private eventService = new EventService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post(
            `${this.path}`,
            authenticatedMiddleware,
            adminMiddleware,
            validationMiddleware(validate.createEvent),
            this.createEvent
        );
        this.router.put(
            `${this.path}/:id`,
            authenticatedMiddleware,
            adminMiddleware,
            validationMiddleware(validate.updateEvent),
            this.updateEvent
        );
        this.router.delete(
            `${this.path}/:id`,
            authenticatedMiddleware,
            adminMiddleware,
            this.deleteEvent
        );
        this.router.get(`${this.path}`, this.getEvents);
    }

    /**
     * @swagger
     * /api/events:
     *   get:
     *     tags:
     *       - "Event"
     *     description: "Get all events"
     *     operationId: "getEvents"
     *     responses:
     *       '200':
     *         description: A list of events retrieved successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: object
     *                 additionalProperties: true
     *       '400':
     *         description: Bad Request
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   description: Message = Invalid request
     *
     */
    private getEvents = async (
        _req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const events = await this.eventService.getEvents();
            res.status(200).json(events);
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    /**
     * @swagger
     * /api/events:
     *   post:
     *     tags:
     *       - "Event"
     *     description: "Create a new event"
     *     operationId: "createEvent"
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *                 example: "Sample Event"
     *               date:
     *                 type: string
     *                 format: date-time
     *                 example: "2024-11-03T00:00:00Z"
     *               location:
     *                 type: string
     *                 example: "123 Sample Street, City, Country"
     *               totalSeats:
     *                 type: number
     *                 example: 100
     *               availableSeats:
     *                 type: number
     *                 example: 50
     *               venue:
     *                 type: string
     *                 example: "Sample Venue"
     *
     *     responses:
     *       '201':
     *         description: Event created successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               additionalProperties: true
     *       '400':
     *         description: Bad Request
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   description: Message = Invalid request
     *
     */
    private createEvent = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            // Validate request body
            const { error, value } = validate.createEvent.validate(req.body);
            if (error) {
                return next(new HttpException(400, error.details[0].message));
            }

            value.createdBy = req.user.id;

            const event = await this.eventService.createEvent(value);

            res.status(201).json({
                message: 'Event created successfully',
                event,
            });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    /**
     * @swagger
     * /api/events/{id}:
     *   put:
     *     tags:
     *       - "Event"
     *     description: "Update an event"
     *     operationId: "updateEvent"
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         description: The ID of the event to update
     *         schema:
     *           type: string
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *                 example: "Updated Sample Event"
     *               date:
     *                 type: string
     *                 format: date-time
     *                 example: "2024-11-03T00:00:00Z"
     *               location:
     *                 type: string
     *                 example: "123 Updated Street, City, Country"
     *     responses:
     *       '200':
     *         description: Event updated successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               additionalProperties: true
     *       '400':
     *         description: Bad Request
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   description: Message = Invalid request
     *       '404':
     *         description: Event not found
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   description: Message = Event not found
     *
     */
    private updateEvent = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const eventId = req.params.id;
            const event = await this.eventService.updateEvent(
                eventId,
                req.body
            );
            res.status(200).json({
                message: 'Event updated successfully',
                event,
            });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    /**
     * @swagger
     * /api/events/{id}:
     *   delete:
     *     tags:
     *       - "Event"
     *     description: "Delete an event"
     *     operationId: "deleteEvent"
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         description: The ID of the event to delete
     *         schema:
     *           type: string
     *     responses:
     *       '204':
     *         description: Event deleted successfully
     *       '404':
     *         description: Event not found
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   description: Message = Event not found
     *
     */
    private deleteEvent = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const eventId = req.params.id;
            await this.eventService.deleteEvent(eventId);
            res.status(204).send({
                message: 'Event deleted successfully',
            });
        } catch (error: any) {
            next(new HttpException(404, error.message));
        }
    };
}

export default EventController;
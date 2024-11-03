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

    private createEvent = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const event = await this.eventService.createEvent(req.body);
            res.status(201).json(event);
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

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
            res.status(200).json(event);
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private deleteEvent = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const eventId = req.params.id;
            await this.eventService.deleteEvent(eventId);
            res.status(204).send();
        } catch (error: any) {
            next(new HttpException(404, error.message));
        }
    };

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
}

export default EventController;

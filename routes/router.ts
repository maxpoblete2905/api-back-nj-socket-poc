import { Router, Request, Response } from 'express';
import { simpleLogger } from '../config/logger';

const router = Router();

router.get('/mensajes', (req: Request, res: Response) => {
    simpleLogger.info(`inicio ejecucion GET mensajes`)
    try {
        res.json({
            ok: true,
            mesaje: "todo esta bien "
        })
        simpleLogger.info(`fin ejecucion GET mensajes`)
    } catch (ex) {
        simpleLogger.error(`Error: /mensajes ${ex}`);
    }

})

router.post('/mensajes', (req: Request, res: Response) => {
    simpleLogger.info(`inicio ejecucion POST mensajes`)
    try {
        const cuerpo = req.body.cuerpo;
        const de = req.body.de;
        res.json({
            ok: true,
            cuerpo,
            de
        })
        simpleLogger.info(`fin ejecucion POST mensajes`)
    } catch (ex) {
        simpleLogger.error(`Error: /mensajes ${ex}`);
    }

})

export default router

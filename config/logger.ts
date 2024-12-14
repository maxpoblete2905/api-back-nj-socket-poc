import winston from 'winston';

// Configuración detallada
export const detailedLogger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logs/http.log' })
    ]
});

// Configuración simple (solo mensajes)
export const simpleLogger = winston.createLogger({
    level: 'info',
    format: winston.format.simple(), // Solo el mensaje
    transports: [
        new winston.transports.Console(),
    ]
});

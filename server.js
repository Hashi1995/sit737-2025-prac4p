const express = require("express");
const winston = require('winston');
const app = express();

const add = (n1, n2) => {
    return n1 + n2;
};

const subtract = (n1, n2) => {
    return n1 - n2;
};

const multiply = (n1, n2) => {
    return n1 * n2;
};

const devide = (n1, n2) => {
    return n1 / n2;
};

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'calculator-microservice' },
    transports: [
    new winston.transports.Console({
    format: winston.format.simple(),
    }),
    new winston.transports.File({ filename: 'logs/error.log', level:
    'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
    ],
    });



app.get("/add", (req, res) => {
    try {
        const n1 = parseFloat(req.query.n1);
        const n2 = parseFloat(req.query.n2);
        calculateNumbers(n1, n2, req);
        const result = add(n1, n2);

        logger.info(`Addition: ${n1} + ${n2} = ${result}`);
        res.json({status: 200, result});
    }
    catch(error){
        sendErrorMessage(res, 400, error.message);
    }   
           
});

app.get("/subtract", (req, res) => {
    try {
        const n1 = parseFloat(req.query.n1);
        const n2 = parseFloat(req.query.n2);
        calculateNumbers(n1, n2, req);
        const result =subtract(n1, n2);

        logger.info(`Substraction: ${n1} - ${n2} = ${result}`);
        res.json({status: 200, result});
    }
    catch(error){
        sendErrorMessage(res, 400, error.message);
    }   
           
});


app.get("/multiply", (req, res) => {
    try {
        const n1 = parseFloat(req.query.n1);
        const n2 = parseFloat(req.query.n2);
        calculateNumbers(n1, n2, req);
        const result = multiply(n1, n2);

        logger.info(`Multipication: ${n1} * ${n2} = ${result}`);
        res.json({status: 200, result});
    }
    catch(error){
        sendErrorMessage(res, 400, error.message);
    }   
           
});

app.get("/devide", (req, res) => {
    try {
        const n1 = parseFloat(req.query.n1);
        const n2 = parseFloat(req.query.n2);
        calculateNumbers(n1, n2, req);
        const result = devide(n1, n2);

        logger.info(`Devision: ${n1} / ${n2} = ${result}`);
        res.json({status: 200, result});
    }
    catch(error){
        sendErrorMessage(res, 400, error.message);
    }   
           
});

const calculateNumbers = (n1, n2, req) => {
    if (isNaN(n1) || isNaN(n2)) {
        const errorMsgDisplay = "n1 and n2 should be valid";
        logger.error(`calculation Error: ${errorMsgDisplay} - Request: ${req.url} - Query: ${JSON.stringify(req.query)}`);
        throw new Error("n1 and n2 should be valid");
    }
};

const sendErrorMessage = (res, status, message) => {
    res.status(status).json({ status, message });
};


const port = 3040;
app.listen(port, () => {
    console.log(`Hello, I'm listening on port ${port}`);
});

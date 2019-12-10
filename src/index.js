import env from './app/config/env';
import express from 'express';
import CORS from './app/middlewares/CORS';
import bodyParser from 'body-parser';
import path from 'path';
import GLOBALS from './globals';
import next from 'next';
import morgan from 'morgan';
import NextRouter from './app/routes/nextRoutes';
import helmet from 'helmet';

//disabling console.log in production build
if (process.env.projectMode === 'Production')
    console.log = function () { }

let Project = next({
    dev: process.env.projectMode !== 'Production',
    dir: './src/front',
})
const handle = Project.getRequestHandler()


Project.prepare()
    .then(() => {
        console.info('NEXT.JS IS PREPARED!')
        const app = express();

        // Middlewares
        app.use(helmet())
        app.use(bodyParser.json());
        app.use(CORS);
        app.use('/static', express.static(path.join(__dirname + 'front/static')));
        app.use(morgan('dev'))

        NextRouter(app, Project);
        app.get('*', (req, res) => {
            return handle(req, res);
        });


        app.use(function (req, res, next) {
            var err = new Error('Not Found');
            err.status = 404;
            next(err);
        });
        app.use((err, req, res, next) => {
            if (!err) return res.validSend(201, {});
            if (!err.status) err.status = 500;
            res.statusCode = 404;

            return Project.render(req, res, '/_error')
        });

        let port = process.env.PORT || process.env.API_PORT;
        app.listen(port, (err) => {
            if (err) {
                console.error(err)
            }
            console.info(`listening on http://localhost:${Number(port)}`, )
        });

    });


// export default app;
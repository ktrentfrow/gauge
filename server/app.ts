import './env';

import express from 'express';
import helmet from 'helmet';
import * as mobxReact from 'mobx-react';
import next from 'next';
import * as path from 'path';

import { IS_DEV, PORT_APP, URL_APP, URL_API } from '../lib/consts';

mobxReact.useStaticRendering(true);

const app = next({ dev: IS_DEV });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // give all Nextjs's request to Nextjs before anything else
  server.get('/_next/*', (req, res) => {
    handle(req, res);
  });

  server.get('/static/*', (req, res) => {
    handle(req, res);
  });

  server.use(helmet());
  server.use(express.json());

  if (!IS_DEV) {
    server.set('trust proxy', 1); // sets req.hostname, req.ip
  }

  // middleware that populates req.user via fetching from API
  server.use(async (req: any, _, nextfn) => {
    const headers: any = {};
    if (req.headers && req.headers.cookie) {
      headers.cookie = req.headers.cookie;
    }

    nextfn();
  });

  server.get('/', async (req: any, res) => {
    let redirectUrl = 'login';
    redirectUrl = 'splash';
    console.log('GETTING LOGIN');

    if (req.user) {
      redirectUrl = 'dashboard';
    }

    res.redirect(`${URL_APP}/${redirectUrl}`);
  });

  server.get('/robots.txt', (_, res) => {
    res.sendFile(path.join(__dirname, '../static', 'robots.txt'));
  });

  server.get('*', (req, res) => {
    handle(req, res);
  });

  server.listen(PORT_APP, () => {
    // if (err) {
    //   throw err;
    // }
    console.log(`> Ready on ${URL_APP} ${URL_API} ${IS_DEV} ${PORT_APP}`);
  });
});

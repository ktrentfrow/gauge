FROM node:12-alpine as install

ARG LOG_LEVEL=error
ENV NPM_CONFIG_LOGLEVEL ${LOG_LEVEL}

ARG NODE_ENV=production
ENV NODE_ENV ${NODE_ENV}

RUN apk --no-cache add --update --no-progress --virtual git

COPY package.json .
COPY yarn.lock .

RUN yarn install --ignore-scripts --frozen-lockfile --ignore-optional

FROM node:12-alpine as build

# repeated ARG's, see Note in https://docs.docker.com/compose/compose-file/#args
ARG LOG_LEVEL=error
ENV NPM_CONFIG_LOGLEVEL ${LOG_LEVEL}

ARG NODE_ENV=production
ENV NODE_ENV ${NODE_ENV}

ARG PORT=3000
ENV PORT ${PORT}

ARG API_PORT=8000
ENV API_PORT ${API_PORT}

ARG URL_API 
ENV URL_API ${URL_API}

ARG URL_APP 
ENV URL_APP ${URL_APP}

ARG LAMBDA_API_ENDPOINT 
ENV LAMBDA_API_ENDPOINT ${LAMBDA_API_ENDPOINT}

# next is more eager, and requires most of the source code
# so here we don't have an intermediate stage, we build and are
# ready to run.
WORKDIR /usr/src/app
COPY --from=install node_modules node_modules
COPY . .

RUN yarn build

EXPOSE ${PORT}

CMD ["yarn", "start"]
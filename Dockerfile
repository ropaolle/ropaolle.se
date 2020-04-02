# https://docs.docker.com/samples/library/node/
ARG NODE_VERSION=12.16.1
# https://github.com/Yelp/dumb-init/releases
ARG DUMB_INIT_VERSION=1.2.2

# Build container
FROM node:${NODE_VERSION}-alpine AS build
ARG DUMB_INIT_VERSION

WORKDIR /home/node

RUN apk add --no-cache build-base python2 yarn && \
    wget -O dumb-init -q https://github.com/Yelp/dumb-init/releases/download/v${DUMB_INIT_VERSION}/dumb-init_${DUMB_INIT_VERSION}_amd64 && \
    chmod +x dumb-init
ADD . /home/node
# Keystone build needs an access to mongo if there is an external session store https://github.com/keystonejs/keystone/issues/2350.
ENV BUILD_STAGE="true"
RUN yarn install && yarn build && yarn cache clean

# Runtime container
FROM node:${NODE_VERSION}-alpine

WORKDIR /home/node

COPY --from=build /home/node /home/node

EXPOSE 3000
CMD ["./dumb-init", "yarn", "start"]

FROM node:24

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app/
COPY ./package.json /app/
RUN pnpm install -r

COPY . /app/
EXPOSE 8000

CMD [ "pnpm", "start" ]

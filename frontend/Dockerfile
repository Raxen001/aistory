# Build Stage
FROM node:24 AS build

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app/
COPY pnpm-lock.yaml /app/
RUN pnpm fetch --prod

COPY . .
RUN pnpm run build
 
# Production Stage
FROM nginx:stable-alpine AS production

# Copy config nginx
COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

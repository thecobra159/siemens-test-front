FROM node:16-alpine AS build
WORKDIR /app

COPY . .
RUN yarn install
RUN yarn run build --configuration=development

# Serve Application using Nginx Server
FROM nginx:alpine
COPY --from=build /app/dist/siemens-test-front/ /usr/share/nginx/html
EXPOSE 80

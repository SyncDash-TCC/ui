
FROM node:22.2

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/package.json
RUN npm install --silent

CMD ["npm", "start"]

# FROM node:22.2 as build
# WORKDIR /app
# COPY . /app
# ENV PATH /app/node_modules/.bin:$PATH
# RUN npm install --silent
# RUN npm run build

# FROM nginx:1.25.1
# COPY --from=build /app/build /usr/share/nginx/html
# RUN rm /etc/nginx/conf.d/default.conf
# COPY nginx/nginx.conf /etc/nginx/conf.d
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]
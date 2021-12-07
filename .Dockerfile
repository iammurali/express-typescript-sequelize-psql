FROM node:14 
WORKDIR /usr/src/app

COPY package*.json ./
RUN mkdir build
RUN yarn
COPY src ./src
COPY tsconfig.json ./
COPY .sequelizerc ./

# ENV NODE_ENV=development
# ENV DB_HOST=host.docker.internal
# ENV DB_PORT=5432
# ENV DB_NAME=jazy-shop-latest
# ENV DB_USER=postgres
# ENV DB_PASSWORD=postgres
# ENV JWT_SECRET_KEY=flyingtiger
RUN yarn tsc
#RUN yarn migrate
EXPOSE 8000
COPY start.sh ./
RUN chmod +x ./start.sh

CMD ["./start.sh"]




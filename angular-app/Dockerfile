#Firt Stage

FROM node:20-alpine AS build
WORKDIR /app

#Install Angular CLI and Create project  

RUN npm install -g @angular/cli

RUN ng new simple-app --directory=. --skip-git --defaults
#Replace default files with my Files 
COPY main.ts src/main.ts
COPY index.html src/index.html
#Build 
RUN npm run build
# Nginx 
FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
##
COPY --from=build /app/dist/simple-app/browser /usr/share/nginx/html
##
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

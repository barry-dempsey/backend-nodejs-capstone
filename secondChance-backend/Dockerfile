FROM node:18.12.1-bullseye-slim

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

# Install SSH server
RUN apt-get update && apt-get install -y openssh-server
RUN mkdir /var/run/sshd

COPY . .

EXPOSE 3060

CMD ["node", "app.js", "/usr/sbin/sshd", "-D"]
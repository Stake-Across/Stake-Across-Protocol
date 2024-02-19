# Dockerfile

FROM node:20.9.0

# create & set working directory
WORKDIR /app

# Install Doppler CLI
RUN apt-get update && apt-get install -y --allow-unauthenticated apt-transport-https ca-certificates curl gnupg && \
    curl -sLf --retry 3 --tlsv1.2 --proto "=https" 'https://packages.doppler.com/public/cli/gpg.DE2A7741A397C129.key' | apt-key add - && \
    echo "deb https://packages.doppler.com/public/cli/deb/debian any-version main" | tee /etc/apt/sources.list.d/doppler-cli.list && \
    apt-get update && \
    apt-get -y --allow-unauthenticated install doppler
# copy local files to working folder
COPY . .
# install web-server
RUN npm install
# build react application
RUN echo "Building React Application"
RUN npm run build
# expose web server port
EXPOSE 3000
CMD  doppler run -- npm start 
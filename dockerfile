FROM golang

RUN mkdir -p /usr/src/app/
WORKDIR /usr/src/app/

COPY ./gopher/ /usr/src/app/
COPY ./dist/NitroGopher /usr/src/app/static

RUN go mod download

RUN go build

EXPOSE 8080
EXPOSE 8081

# Run the executable
CMD ["/usr/src/app/gopher"]


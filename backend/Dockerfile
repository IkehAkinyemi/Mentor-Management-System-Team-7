FROM golang:latest

WORKDIR /mms_7_backend_app

COPY . /mms_7_backend_app

RUN go mod download


RUN go build -o mms_7_backend_app .

EXPOSE 4000

CMD go run main.go





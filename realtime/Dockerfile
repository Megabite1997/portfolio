# --- build stage ---
FROM golang:1.24-alpine AS build
WORKDIR /src
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-s -w" -o /bin/realtime .

# --- run stage ---
FROM gcr.io/distroless/static-debian12
COPY --from=build /bin/realtime /realtime
EXPOSE 8080
ENV PORT=8080
USER nonroot:nonroot
ENTRYPOINT ["/realtime"]

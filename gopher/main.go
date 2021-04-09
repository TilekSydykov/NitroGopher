package main

import (
	"encoding/json"
	"github.com/gorilla/websocket"
	"log"
	"net/http"
	"os"
	"strings"
)

func main() {
	http.HandleFunc("/", handler)

	http.ListenAndServe(":8081", nil)
}

func handler(w http.ResponseWriter, r *http.Request) {
	urlPath := r.URL.Path[1:]

	if strings.HasPrefix(urlPath, "socket/") {
		routePath(w, r)
	} else {
		log.Print("Entering static file handler: " + urlPath)
		staticFilePath := "./static/"
		if _, err := os.Stat(staticFilePath + urlPath); os.IsNotExist(err) {
			// path does not exist
			urlPath = ""
		}
		http.ServeFile(w, r, staticFilePath + urlPath)
	}
}

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

type Message struct {
	Type string `json:"type"`
	Data string `json:"data"`
}

func routePath(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		return
	}
	for {
		_, p, err := conn.ReadMessage()

		if err != nil {
			print("conn closed")
			return
		}

		messageResolverUser(p, conn)
	}
}



func messageResolverUser(s []byte, conn *websocket.Conn) {
	var m Message
	err := json.Unmarshal(s, &m)
	if err != nil {
		print(err)
	}

	switch m.Type {
	case "message":
		// got message from socket
	}
}



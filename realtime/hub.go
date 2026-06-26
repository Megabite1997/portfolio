package main

import (
	"encoding/json"
	"log"
	"sync"
)

// Message is the wire protocol shared with the Next.js client (lib/useWebSocket.ts).
type Message struct {
	Type  string `json:"type"`
	Count int    `json:"count,omitempty"`
	Emoji string `json:"emoji,omitempty"`
	ID    string `json:"id,omitempty"`
}

// allowedReactions guards against arbitrary payloads being broadcast.
var allowedReactions = map[string]bool{
	"🔥": true, "👏": true, "🚀": true, "💜": true, "👀": true, "⭐": true,
}

// Hub keeps the set of connected clients and broadcasts presence + reactions.
type Hub struct {
	mu         sync.RWMutex
	clients    map[*Client]bool
	register   chan *Client
	unregister chan *Client
	broadcast  chan Message
}

func newHub() *Hub {
	return &Hub{
		clients:    make(map[*Client]bool),
		register:   make(chan *Client),
		unregister: make(chan *Client),
		broadcast:  make(chan Message, 64),
	}
}

func (h *Hub) run() {
	for {
		select {
		case c := <-h.register:
			h.mu.Lock()
			h.clients[c] = true
			n := len(h.clients)
			h.mu.Unlock()
			// greet the newcomer, then tell everyone the new count
			c.trySend(encode(Message{Type: "hello", Count: n}))
			h.broadcastMsg(Message{Type: "presence", Count: n})

		case c := <-h.unregister:
			h.mu.Lock()
			if _, ok := h.clients[c]; ok {
				delete(h.clients, c)
				close(c.send)
			}
			n := len(h.clients)
			h.mu.Unlock()
			h.broadcastMsg(Message{Type: "presence", Count: n})

		case msg := <-h.broadcast:
			if msg.Type == "reaction" && !allowedReactions[msg.Emoji] {
				continue // drop anything that isn't a known reaction
			}
			h.broadcastMsg(msg)
		}
	}
}

func (h *Hub) broadcastMsg(msg Message) {
	data := encode(msg)
	if data == nil {
		return
	}
	h.mu.RLock()
	defer h.mu.RUnlock()
	for c := range h.clients {
		c.trySend(data)
	}
}

func encode(msg Message) []byte {
	data, err := json.Marshal(msg)
	if err != nil {
		log.Printf("marshal: %v", err)
		return nil
	}
	return data
}

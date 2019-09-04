package com.alvarlagerlof.helium;

class Event {
    String type;
    Object data;

    public Event(String type, Object data) {
        this.type = type;
        this.data = data;
    }

    String getType() {
        return this.type;
    }

    Object getData() {
        return this.data;
    }
}
package com.alvarlagerlof.helium;

class Chunk {
    int x;
    int y;
    int z;

    public Chunk(int x, int y, int z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    int getX() {
        return this.x;
    }

    int getY() {
        return this.y;
    }

    int getZ() {
        return this.z;
    }
}
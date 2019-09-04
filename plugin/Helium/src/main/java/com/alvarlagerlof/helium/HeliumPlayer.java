package com.alvarlagerlof.helium;

class HeliumPlayer {
    String uuid;
    String name;
    Double x;
    Double y;
    Double z;
    Double yaw;

    public HeliumPlayer(String uuid, String name, double x, double y, double z, double yaw) {
        this.uuid = uuid;
        this.name = name;
        this.x = x;
        this.y = y;
        this.z = z;
        this.yaw = yaw;
    }
}
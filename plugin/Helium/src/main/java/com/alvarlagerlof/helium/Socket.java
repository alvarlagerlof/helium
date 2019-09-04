package com.alvarlagerlof.helium;

import java.net.InetSocketAddress;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import com.google.gson.Gson;

import org.java_websocket.WebSocket;
import org.java_websocket.handshake.ClientHandshake;
import org.java_websocket.server.WebSocketServer;

import com.alvarlagerlof.helium.HeliumPlayer;


public class Socket extends WebSocketServer {

	HashMap<Chunk, Set<WebSocket>> loadedChunks;

	public Socket(int port) {
		super(new InetSocketAddress(port));
	}

	@Override
	public void onOpen(WebSocket conn, ClientHandshake handshake) {
		//conn.getRemoteSocketAddress().getAddress().getHostAddress()
	}

	@Override
	public void onClose(WebSocket conn, int code, String reason, boolean remote) {
		for(Map.Entry<Chunk, Set<WebSocket>> entry : loadedChunks.entrySet()) {
			Set<WebSocket> clients = entry.getValue();
			clients.remove(conn);
		}
	}

	@Override
	public void onMessage(WebSocket conn, String message) {
		// TODO: Add to loaded chunks
	}

	@Override
	public void onError(WebSocket conn, Exception ex) {
		ex.printStackTrace();
		if (conn != null) {
			System.out.println( conn + " error " + ex.toString());
		}
	}

	@Override
	public void onStart() {
		System.out.println("Server started!");
		setConnectionLostTimeout(1000);
	}

	public void addPlayer(HeliumPlayer player) {
		Event event = new Event("PLAYER_ADD", player);
		String json = new Gson().toJson(event);
		broadcast(json);
	}

	public void removePlayer(HeliumPlayer player) {
		Event event = new Event("PLAYER_REMOVE", player);
		String json = new Gson().toJson(event);
		broadcast(json);
	}

	public void updatePlayer(HeliumPlayer player) {
		Event event = new Event("PLAYER_UPDATE", player);
		String json = new Gson().toJson(event);
		broadcast(json);
		// Todo: Only send to clients where the player 
		// is inside at least one loaded chunk
	}


}
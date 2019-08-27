package com.alvarlagerlof.helium;

import org.bukkit.plugin.java.JavaPlugin;
import org.bukkit.configuration.file.FileConfiguration;
import org.bukkit.event.Listener;
import co.aikar.commands.PaperCommandManager;

import java.io.BufferedReader;
import java.io.InputStreamReader;

import com.alvarlagerlof.helium.Commands;
import com.alvarlagerlof.helium.Socket;



public final class Main extends JavaPlugin implements Listener {

    FileConfiguration conf;

    public void onEnable() {

        // Listen for events
        getServer().getPluginManager().registerEvents(this, this);

        // Setup command manager
        PaperCommandManager manager = new PaperCommandManager(this);
        manager.registerCommand(new Commands(this));

        // Set up websocket        
		Socket s = new Socket(8080);
		s.start();
        System.out.println( "ChatServer started on port: " + s.getPort());
        
    }
}
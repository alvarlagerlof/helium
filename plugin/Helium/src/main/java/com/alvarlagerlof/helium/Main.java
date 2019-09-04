package com.alvarlagerlof.helium;

import org.bukkit.plugin.java.JavaPlugin;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.event.player.PlayerJoinEvent;
import org.bukkit.event.player.PlayerMoveEvent;
import org.bukkit.event.player.PlayerQuitEvent;
import org.bukkit.entity.Player;

import co.aikar.commands.PaperCommandManager;

import com.alvarlagerlof.helium.Commands;
import com.alvarlagerlof.helium.Socket;
import com.alvarlagerlof.helium.HeliumPlayer;




public final class Main extends JavaPlugin implements Listener {

    Socket s;

    public void onEnable() {
        // Listen for events
        getServer().getPluginManager().registerEvents(this, this);

        // Setup command manager
        PaperCommandManager manager = new PaperCommandManager(this);
        manager.registerCommand(new Commands(this));

        // Set up websocket        
		s = new Socket(3000);
		s.start();
    }

    @EventHandler
    public void onPlayerJoin(PlayerJoinEvent event) {
        Player p = (Player) event.getPlayer();

        HeliumPlayer heliumPlayer = new HeliumPlayer(
            p.getUniqueId().toString(),
            p.getDisplayName(), 
            p.getLocation().getX(),
            p.getLocation().getY(),
            p.getLocation().getZ(),
            (double) p.getLocation().getYaw()
        );

        s.addPlayer(heliumPlayer);
    }

    @EventHandler
    public void onPlayerQuit(PlayerQuitEvent event) {
        Player p = (Player) event.getPlayer();

        HeliumPlayer heliumPlayer = new HeliumPlayer(
            p.getUniqueId().toString(),
            p.getDisplayName(), 
            p.getLocation().getX(),
            p.getLocation().getY(),
            p.getLocation().getZ(),
            (double) p.getLocation().getYaw()
        );

        s.removePlayer(heliumPlayer);
    }

    @EventHandler
    public void onMove(PlayerMoveEvent event) {
        if (
            event.getTo().getBlockX() == event.getFrom().getBlockX() && 
            event.getTo().getBlockY() == event.getFrom().getBlockY() && 
            event.getTo().getBlockZ() == event.getFrom().getBlockZ() && 
            event.getTo().getYaw() == event.getFrom().getYaw()) {
                return;
        }

        Player p = (Player) event.getPlayer();

        HeliumPlayer heliumPlayer = new HeliumPlayer(
            p.getUniqueId().toString(),
            p.getDisplayName(), 
            p.getLocation().getX(),
            p.getLocation().getY(),
            p.getLocation().getZ(),
            (double) p.getLocation().getYaw()
        );

        s.updatePlayer(heliumPlayer);
    }


}
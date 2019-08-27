package com.alvarlagerlof.helium;

import org.bukkit.plugin.java.JavaPlugin;
import org.bukkit.configuration.file.FileConfiguration;
import org.bukkit.event.Listener;
import org.bukkit.entity.Player;
import org.bukkit.event.EventHandler;
import org.bukkit.ChatColor;

import co.aikar.commands.PaperCommandManager;

import com.alvarlagerlof.helium.Commands;


public final class Main extends JavaPlugin implements Listener {

    FileConfiguration conf;

    public void onEnable() {

        getServer().getPluginManager().registerEvents(this, this);

        conf = this.getConfig();

        PaperCommandManager manager = new PaperCommandManager(this);
        manager.registerCommand(new Commands(this));

    }
}
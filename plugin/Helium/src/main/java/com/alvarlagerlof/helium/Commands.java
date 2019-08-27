package com.alvarlagerlof.helium;

import org.bukkit.plugin.java.JavaPlugin;
import org.bukkit.configuration.file.FileConfiguration;
import org.bukkit.entity.Player;
import org.bukkit.ChatColor;

import co.aikar.commands.BaseCommand;
import co.aikar.commands.annotation.Default;
import co.aikar.commands.annotation.CommandAlias;
import co.aikar.commands.annotation.Subcommand;


@CommandAlias("helium")
public class Commands extends BaseCommand {

    JavaPlugin plugin;
    FileConfiguration conf;

    public Commands(JavaPlugin plugin) {
        this.plugin = plugin;
        this.conf = plugin.getConfig();
    }

    @Default
    public void onDefault(Player player) { 
        player.sendMessage(ChatColor.translateAlternateColorCodes('&', "&6&l[Helium]&r Please specify a command"));
    }

    @Subcommand("reload")
    public void toggle(Player player) {
        player.sendMessage(ChatColor.translateAlternateColorCodes('&', "&6&l[Helium]&r Not implemented"));
    }

}
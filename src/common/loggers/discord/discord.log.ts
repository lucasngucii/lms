import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client, TextChannel, GatewayIntentBits } from 'discord.js';

@Injectable()
export class DiscordLogger implements OnModuleInit {
   private client: Client;
   private channel: TextChannel;

   constructor(private readonly configService: ConfigService) {
      this.client = new Client({
         intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent,
            GatewayIntentBits.GuildMembers,
         ],
      });
   }

   async onModuleInit() {
      await this.intializeDiscordClient();
   }

   private async intializeDiscordClient() {
      const token = this.configService.get<string>('logger.discordToken');
      const channelId = this.configService.get<string>('logger.discordChannelId');
      if (token && channelId) {
         await this.client.login(token);
         this.client.on('ready', async () => {
            const channel = await this.client.channels.fetch(channelId);
            if (channel?.isTextBased()) {
               this.channel = channel as TextChannel;
            } else {
               console.log('Invalid channel id provided');
            }
         });
      }
   }

   async sendMessage(embed: any) {
      if (this.channel) {
         try {
            await this.channel.send({ embeds: [embed] });
         } catch (error) {
            console.error(`Error sending message to discord: ${error}`);
         }
      }
   }
}

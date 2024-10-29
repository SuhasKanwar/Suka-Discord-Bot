# Suka (Discord Bot) 🌍🤖

Welcome to the **Suka Discord Bot**! This bot is designed to help users translate text across multiple languages effortlessly and provide various utility commands. With its interactive features and easy-to-use commands, Suka aims to enhance your Discord experience.

## Features ✨

- **Multi-language Translation**: Translate text between various languages using simple commands.
- **Language Detection**: Automatically detect the language of a given text.
- **Help Command**: Get a list of available commands and their usage.
- **Interactive Greetings**: Enjoy personalized greetings based on the time of day.
- **Easter Eggs**: Fun responses to common phrases!

## Installation 🚀

To get started with the Suka bot, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/SuhasKanwar/Suka-Discord-Bot.git
   cd Suka-Discord-Bot
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory and add your Discord bot token:
   ```
   DISCORD_BOT_TOKEN=YOUR_BOT_TOKEN_HERE
   ```

4. **Run the bot**:
   ```bash
   node index.js
   ```

## Usage 💻

Once the bot is running, invite it to your Discord server using the following link:

[Invite Suka to your server](https://discord.com/oauth2/authorize?client_id=1284383939896803349&permissions=8&integration_type=0&scope=bot)

Then, use the commands listed below to interact with it.

## Commands 📜

Here’s a list of commands you can use with the Suka bot:

### Translation Commands
- **Translate Text**: 
  ```
  suka translate [language] [text]
  ```
  Translates the given text to the specified language.

- **Detect Language**:
  ```
  suka detect [text]
  ```
  Detects the language of the provided text and translates it to English.

- **Available Languages**:
  ```
  suka languages
  ```
  Displays a list of supported languages.

### Utility Commands
- **Help**:
  ```
  suka help
  ```
  Lists all available commands and their usage.

- **Ping**:
  ```
  /ping
  ```
  Checks the bot's latency.

## Examples 📚

Here are some example commands to get you started:

- Translate "Hello, how are you?" to Spanish:
  ```
  suka translate es Hello, how are you?
  ```

- Detect the language of "こんにちは":
  ```
  suka detect こんにちは
  ```

- List available languages:
  ```
  suka languages
  ```

## ✨ Contributors

- **Suhas Kanwar** – [GitHub Profile](https://github.com/SuhasKanwar)

---
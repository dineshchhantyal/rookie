# Rookie

## Description

Rookie is a Discord bot designed to help you and your classmates manage tasks and deadlines efficiently. It also aids in managing study time and provides useful study resources. This app is built using Node.js and the Discord.js library. Node.js `v16.0.0` is required to run this app.

## Features

### Class Schedule Notification

- **Notification Alerts**: Get notifications before your class starts.
- **Schedule Lookup**: Check the date and time for your class schedule.
- **Command List**: Use `!help` to get a list of commands.

#### Usage

```bash
!roo cs
```

This command retrieves today's class schedule.

Sample Output:

```bash
Today's Class Schedule:
1. 9:00 - 10:00: Math
2. 10:00 - 11:00: Physics
3. 11:00 - 12:00: Chemistry
```

### Interactive Quiz

Random Quiz Questions: Receive a random quiz question.
Answer Tracking: Tracks all participants' answers and provides the final score.

#### Usage

```bash
!roo quiz
```

This command initiates a quiz.

```bash
Question: What is the capital of France?
A. Paris
B. London
C. Berlin
D. Rome

Type !answer <option> to answer.
```

### Random Team Generator

Team Creation: Generates random teams of specified members.

#### Usage

```bash
!roo team 5
```

This command generates random teams of 5 members each.

## Installation

1. Clone this repository.

```bash
git clone https://github.com/dineshchhantyal/rookie.git
```

2. Install the required dependencies.

```bash
cd rookie
npm install
```

3. Create a `.env` file in the root directory using the `.env.example` file as a template.

4. Add your Discord bot token to the `.env` file.
5. Start the bot.

```bash
npm start
```

## Usage

Once the bot is running, invite it to your Discord server using the invite link. Use the commands mentioned above to interact with the bot and explore its features.

## Contributing

We welcome contributions! Follow these steps to contribute:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m 'Add some feature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request.

## Support

If you encounter any issues or have questions, feel free to open an issue in the repository or contact us at support@rookie.com.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

Special thanks to the Discord.js community for their invaluable resources and support.
Inspired by various educational tools and resources that aim to make studying more efficient and enjoyable.

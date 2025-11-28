# Adding Custom Commands

This guide shows you how to add new slash commands to your Circuit Bot.

## Step 1: Define the Command

Edit `scripts/register-commands.js` and add your command to the `commands` array:

```javascript
{
  name: 'yourcommand',
  description: 'Description of what your command does',
  type: 1,
  options: [  // Optional: add parameters
    {
      name: 'option1',
      description: 'Description of this option',
      type: 3,  // 3 = STRING, 4 = INTEGER, 5 = BOOLEAN
      required: true
    }
  ]
}
```

### Common Option Types:
- `3` - STRING
- `4` - INTEGER  
- `5` - BOOLEAN
- `6` - USER
- `7` - CHANNEL
- `8` - ROLE

## Step 2: Add the Handler

Edit `api/interactions.js` and add a case for your command:

```javascript
case 'yourcommand':
  const option1Value = interaction.data.options?.[0]?.value;
  
  return res.status(200).json({
    type: 4,
    data: {
      content: `You used /yourcommand with: ${option1Value}`
    }
  });
```

## Step 3: Register the Command

Run the registration script:

```bash
node scripts/register-commands.js
```

## Step 4: Deploy

Push your changes to GitHub:

```bash
git add .
git commit -m "Added new command: yourcommand"
git push
```

Vercel will automatically redeploy your bot!

## Examples

### Example 1: Simple Text Command

**Registration:**
```javascript
{
  name: 'joke',
  description: 'Get a random joke',
  type: 1
}
```

**Handler:**
```javascript
case 'joke':
  const jokes = [
    'Why do programmers prefer dark mode? Because light attracts bugs!',
    'How many programmers does it take to change a light bulb? None, that\'s a hardware problem!',
    'Why do Java developers wear glasses? Because they don\'t C#!'
  ];
  const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
  
  return res.status(200).json({
    type: 4,
    data: {
      content: `😄 ${randomJoke}`
    }
  });
```

### Example 2: Command with User Input

**Registration:**
```javascript
{
  name: 'greet',
  description: 'Greet someone with a custom message',
  type: 1,
  options: [
    {
      name: 'user',
      description: 'The user to greet',
      type: 6,  // USER type
      required: true
    },
    {
      name: 'message',
      description: 'Your greeting message',
      type: 3,  // STRING type
      required: false
    }
  ]
}
```

**Handler:**
```javascript
case 'greet':
  const targetUser = interaction.data.options.find(opt => opt.name === 'user')?.value;
  const message = interaction.data.options.find(opt => opt.name === 'message')?.value || 'Hello';
  
  return res.status(200).json({
    type: 4,
    data: {
      content: `<@${targetUser}> ${message} 👋`
    }
  });
```

### Example 3: Embed Response

**Handler:**
```javascript
case 'status':
  return res.status(200).json({
    type: 4,
    data: {
      embeds: [{
        title: '🤖 Bot Status',
        description: 'All systems operational',
        color: 0x00ff00,  // Green
        fields: [
          {
            name: 'Uptime',
            value: '99.9%',
            inline: true
          },
          {
            name: 'Response Time',
            value: '< 100ms',
            inline: true
          }
        ],
        thumbnail: {
          url: 'https://cdn.discordapp.com/embed/avatars/0.png'
        },
        footer: {
          text: 'Circuit Bot'
        },
        timestamp: new Date().toISOString()
      }]
    }
  });
```

### Example 4: Buttons and Components

**Handler:**
```javascript
case 'button':
  return res.status(200).json({
    type: 4,
    data: {
      content: 'Click a button!',
      components: [
        {
          type: 1,  // ACTION_ROW
          components: [
            {
              type: 2,  // BUTTON
              style: 1,  // Primary (blue)
              label: 'Click me!',
              custom_id: 'button_clicked'
            },
            {
              type: 2,
              style: 3,  // Success (green)
              label: 'Or me!',
              custom_id: 'button_clicked_2'
            }
          ]
        }
      ]
    }
  });
```

## Response Types

- `type: 1` - PONG (for ping)
- `type: 4` - CHANNEL_MESSAGE_WITH_SOURCE (send a message)
- `type: 5` - DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE (acknowledge, send later)

## Tips

1. **Keep it simple** - Slash commands should respond quickly
2. **Use embeds** - They look more professional
3. **Add emojis** - Makes responses more engaging
4. **Error handling** - Always handle edge cases
5. **Test locally** - Use `vercel dev` to test before deploying

## Resources

- [Discord Interaction Response Types](https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-response-object-interaction-callback-type)
- [Discord Message Components](https://discord.com/developers/docs/interactions/message-components)
- [Discord Embed Builder](https://discohook.org/)

Happy coding! ⚡


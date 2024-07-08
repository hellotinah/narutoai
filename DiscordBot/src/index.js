require('dotenv').config();

const { Client, IntentsBitField } = require('discord.js');
const { Storage } = require('@google-cloud/storage');
const fs = require('fs');
const axios = require('axios');
const { GoogleAuth } = require('google-auth-library');

// Create a new instance of GoogleAuth
const auth = new GoogleAuth({
  keyFile: './compelling-pact-326521-31d858e08094.json', // Path to your service account key file
  scopes: 'https://www.googleapis.com/auth/cloud-platform', // Scopes required for accessing GCS
});
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers, 
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

const storage = new Storage({
    keyFilename: './compelling-pact-326521-31d858e08094.json', // Replace with your GCS service account key file path
    projectId: 'compelling-pact-326521', // Replace with your GCP project ID
});

client.on('ready', () => {
    console.log(`${client.user.username} is online.`);
});

client.on('messageCreate', async (message) => {
    try {
        if (message.author.bot) {
            return;
        }

        if (message.content.startsWith('Hello')) {
            message.reply('Hey!');
        }

        try {
            if (message.author.bot) {
                return;
            }
        
            // Handle reminder request
            if (message.content.startsWith('Remind me please')) {
                // Construct payload for HTTP POST request
                const payload = {
                    content: message.content, // Send the user's message as content
                };
        
                // Send HTTP POST request to Kestra webhook URL
                const response = await axios.post('http://localhost:8080/api/v1/executions/webhook/dev/Remind_me/4wjtkzwVGBM9yKnjm3yv8u', payload);
                message.reply('Sure, I will!');
            }

                // Handle image attachments
            if (message.attachments.size > 0) {
                 // Assuming only one image attachment, get the first one
                const attachment = message.attachments.first();
                const attachmentUrl = attachment.url; // Get the URL of the attachment
                    
                // Construct payload for HTTP POST request with image URL
                let payload = {
                    image: attachmentUrl, // Send the image URL as content
                };
                    
                // Send HTTP POST request to the webhook URL
                const response = await axios.post('http://localhost:8080/api/v1/executions/webhook/dev/two_way_communication_two/KlntkzwVGBM9yMrjm3yv9v', payload);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
        // Handle image uploads
        if (message.attachments.size > 0) {
            const attachment = message.attachments.first();
            if (attachment.contentType.startsWith('image')) {
                const bucketName = 'foodimages_kestraproject_animenarutoo';
                const fileName = `${Date.now()}_${attachment.name}`;

                const bucket = storage.bucket(bucketName);
                const file = bucket.file(fileName);
                
                const stream = fs.createWriteStream(fileName);

                // Fetch the attachment using its URL
                const response = await axios({
                    method: 'GET',
                    url: attachment.url,
                    responseType: 'stream', // Specify response type as stream
                });

                // Pipe the response stream to the writable stream
                response.data.pipe(stream);

                await new Promise((resolve, reject) => {
                    stream.on('finish', () => {
                        console.log(`Image uploaded to ${bucketName}/${fileName}`);

                        // Upload the file to Google Cloud Storage
                        bucket.upload(fileName, {
                            destination: fileName,
                        }, (err, file) => {
                            if (err) {
                                console.error('Error uploading file:', err);
                                return;
                            }
                            // Delete the local file after upload
                            fs.unlinkSync(fileName);
                            console.log('File uploaded successfully.');
                        });
                    });
                    stream.on('error', (err) => {
                        reject(err);
                    });
                });
            }
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
});

client.login(process.env.TOKEN);

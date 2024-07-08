# Kestra Project Setup

This guide will help you set up Kestra along with a Discord bot and integrate various services. The setup is divided into three milestones for ease of understanding and execution.


## Step 1: Install Docker-Compose
1. Install Docker-Compose by following the instructions [here](https://docs.docker.com/compose/install/).

## Step 2: Set Up Docker-Compose
 Download the Docker Compose file using the following command:

  ```sh
    curl -o docker-compose.yml https://raw.githubusercontent.com/kestra-io/kestra/develop/docker-compose.yml
  ```
    
   Ensure that the `docker-compose.yml` file is located within the KestraProject folder to properly configure and run the Docker services for this project.

For more details, refer to the [Kestra documentation](https://kestra.io/docs/installation/docker-compose#download-the-docker-compose-file).

## Milestone 1: Set Up Discord Bot

Completing the Discord bot part of this milestone will allow you to run the `daily_meditation` flow. Once this part is complete, you can move directly to Step 11.

## Step 3: Create Your Discord Bot
   - Go to Discord settings, click on "Advanced".
   - In the Developer Mode section, click Discord API, then click on Applications.
   - After navigating to [Discord API Applications](https://discord.com/developers/applications), click on "New Application", and name it after your favorite fictional character.
   - Under "Bot", enable all Privileged Gateway Intents and set the permissions to "Administrator".
![Alt text](https://github.com/KaoutharBousbaa1/Kestra_NarutoAI/blob/main/screenshots/sreenshot_1.png?raw=true)
![Alt text](https://github.com/KaoutharBousbaa1/Kestra_NarutoAI/blob/main/screenshots/screenshot_2.png?raw=true)
   - Save changes and click on "Reset Token" to generate a new token. Copy and save it securely.
![Alt text](https://github.com/KaoutharBousbaa1/Kestra_NarutoAI/blob/main/screenshots/screenshot_3.png?raw=true)

## Step 4: Create a Discord Server
1. Create a new Discord server by clicking the "+" button in the Discord app.

   ![Alt text](https://github.com/KaoutharBousbaa1/Kestra_NarutoAI/blob/main/screenshots/screenshot_20.png?raw=true)

## Step 5: Set Up a Webhook
1. In your Discord server, go to server settings, click "Integrations", then "New Webhook". Copy the webhook URL and save it.
![Alt text](https://github.com/KaoutharBousbaa1/Kestra_NarutoAI/blob/main/screenshots/screenshot_4.png?raw=true)

## Associate the Webhook to Your Bot

To authorize the Discord bot into your server, follow these steps to generate an OAuth2 link:

1. **Generate the OAuth2 URL:**
    - Under the **"OAuth2 URL Generator"** section, choose **“Bot”** for the scopes.
    - For the bot permissions, choose **“Administrator”**.
    - Scroll down and a generated URL will appear. Copy it and save it somewhere safe.
    - In **General Information**, copy this URL into **“LINKED ROLES VERIFICATION URL”**.

2. **Authorize the Bot:**
    - Go to the **“General Information”** tab.
    - Copy the URL into **“LINKED ROLES VERIFICATION URL”**.
    - Open the URL in a web browser.
    - Select the server you want to add the bot to from the dropdown menu.
    - Click **"Authorize"**.
    - Complete any CAPTCHA challenges if prompted.

## Milestone 2: Set Up Google Cloud Services

Completing the Google Cloud Services setup will allow you to run the `Remind_me`, `Remind_me_dependency`, `daily_report_nutrition`, `daily_report_workout`, `steps`, and `two_way_communication_two` flows. If this milestone is completed after the Discord milestone, you can move directly to Step 11.

### Step 7: Create and Configure a Google Cloud Service Account
1. **Create a Google Cloud Project:**
   - If you haven't already, go to the [Google Cloud Console](https://console.cloud.google.com/).
   - Click on the project drop-down menu at the top of the page.
   - Click on "New Project" and fill in the necessary details. Click "Create".

2. **Create a Service Account:**
   - Go to the [IAM & Admin Console](https://console.cloud.google.com/iam-admin/iam).
   - Click on "Service Accounts" from the left-hand menu.
   - Click on "Create Service Account".
   - Enter a name and description for the service account, then click "Create".
   - Assign the necessary roles:
     - BigQuery Admin
     - BigQuery Data Editor
     - BigQuery Data Owner
     - BigQuery Studio Admin
     - BigQuery User
     - Storage Object Admin
     - Storage Object Creator
   ![Service Account Roles](https://github.com/KaoutharBousbaa1/Kestra_NarutoAI/blob/main/screenshots/screenshot_5.png?raw=true)
   - Click "Done".

3. **Generate a Key for the Service Account:**
   - After creating the service account, you will see it listed on the Service Accounts page.
   - Click on the service account you just created.
   - Click the "Keys" tab.
   - Click "Add Key" and select "Create New Key".
   - Choose "JSON" and click "Create". A JSON file will be downloaded to your computer. Keep this file secure as it contains the credentials for your service account.
   - Place this file in your Kestra Project directory where the Docker-compose file is located for better organization.

4. **Assign Roles to the Service Account:**
    If you haven't already assign roles to your Service Account:
   - Go to the IAM & Admin Console and click on "IAM".
   - Find your service account in the list and click the pencil icon to edit it.
   - Click "Add Another Role" and add the roles mentioned earlier.

## Step 8: Setting Up BigQuery and Google Cloud Storage
1. **Go to the [BigQuery Console](https://console.cloud.google.com/bigquery)**.
2. Navigate to your GCS project
To create the necessary tables, you will need to execute the following SQL queries in the BigQuery interface. Follow these steps:

1. **Open the BigQuery Console** and select your project.
2. **Click on the SQL workspace** (or click on "Compose New Query").
3. **Copy and paste the following SQL queries** into the query editor and run them one by one:

#### Create the 'reminders', 'daily_workout' and 'daily_macros' tables:
```sql
-- Create the 'events' dataset
CREATE SCHEMA IF NOT EXISTS `your-project-id.events`;

-- Create the 'reminders' table within the 'events' dataset
CREATE TABLE IF NOT EXISTS `your-project-id.events.reminders` (
  Title STRING,
  Time TIME,
  Date DATE
);
```
```sql
-- Create the 'macros' dataset
CREATE SCHEMA IF NOT EXISTS `your-project-id.macros`;

-- Create the 'daily_macros' table within the 'macros' dataset
CREATE TABLE IF NOT EXISTS `your-project-id.macros.daily_macros` (
  Date DATE,
  Protein FLOAT64,
  Fat FLOAT64,
  Carbohydrate FLOAT64
);
```
```sql
-- Create the 'workout_strava' dataset
CREATE SCHEMA IF NOT EXISTS `your-project-id.workout_strava`;

-- Create the 'daily_workout' table within the 'workout_strava' dataset
CREATE TABLE IF NOT EXISTS `your-project-id.workout_strava.daily_workout` (
  `Sport Type` STRING,
  `Start Date` DATE,
  Distance FLOAT64,
  `Average Speed` FLOAT64
);
```
Replace `your-project-id` with your actual project ID.

#### Create the 'daily_macros_demo', 'daily_workout_demo' and 'totalsteps_demo' tables for the demo:

1. Download the demo CSV files attached to this repositiry and update the CSV files by adding rows where the date corresponds to the current date at the time you are running this code. This will ensure that you see the results.
   
3. Create `daily_macros_demo`, `daily_workout_demo` and `totalsteps_demo` tables following these steps:
   
    - Navigate to your dataset (macros)
      ![Alt text](https://github.com/KaoutharBousbaa1/Kestra_NarutoAI/blob/main/screenshots/screenshot_6.png?raw=true)
    - Click on "Create table" > "Upload", and upload the daily_macros_demo.csv file attached to this repository
      ![Alt text](https://github.com/KaoutharBousbaa1/Kestra_NarutoAI/blob/main/screenshots/screenshot_7.png?raw=true)
    - Click on 'Auto detect"
      ![Alt text](https://github.com/KaoutharBousbaa1/Kestra_NarutoAI/blob/main/screenshots/screenshot_8.png?raw=true)
    - Repeat the same steps to create the two other table by navigating to the the 'workout_strava' dataset instead

Below are example screenshots to guide you through the process of setting up your datasets and tables:
    ![Alt text](https://github.com/KaoutharBousbaa1/Kestra_NarutoAI/blob/main/screenshots/screenshot_9.png?raw=true)
    ![Alt text](https://github.com/KaoutharBousbaa1/Kestra_NarutoAI/blob/main/screenshots/screenshot_10.png?raw=true)
    ![Alt text](https://github.com/KaoutharBousbaa1/Kestra_NarutoAI/blob/main/screenshots/screenshot_11.png?raw=true)
    ![Alt text](https://github.com/KaoutharBousbaa1/Kestra_NarutoAI/blob/main/screenshots/screenshot_12.png?raw=true)
    ![Alt text](https://github.com/KaoutharBousbaa1/Kestra_NarutoAI/blob/main/screenshots/screenshot_13.png?raw=true)
    ![Alt text](https://github.com/KaoutharBousbaa1/Kestra_NarutoAI/blob/main/screenshots/screenshot_14.png?raw=true)
   
Ensure that the tables and schemas match those specified in the YAML code. If you need to add additional tables, ensure that the data types are correct. For this project, you will need the macros, workout,       and steps tables. Refer to the YAML code in the BigQuery task to obtain the correct schema.
    
4. Create a Google Cloud Storage (GCS) bucket:
   - Navigate to [Google Cloud Console](https://console.cloud.google.com/products/solutions/catalog/?hl=fr).
   - Go to "Resources" -> "Storage" and create a new bucket.
   
## Step 9: Enable Required APIs
1. Enable the BigQuery API and Google Cloud Storage API in your Google Cloud project:
    - Go to the [API & Services Dashboard](https://console.cloud.google.com/apis/dashboard).
    - Search for "BigQuery API" and "Google Cloud Storage API" and enable them.

## Milestone 3: Set Up Strava API

Completing the Strava API setup will allow you to run the `Workout_data` flow.

## Step 10: Set Up Strava API
1. Create a Strava account [here](https://www.strava.com/register/free?hl=fr-FR).
2. Log in to Strava and create an API application with the Authorization Callback Domain set to `localhost`.
3. Retrieve the Client ID and Client Secret from your Strava API application settings.
![Alt text](https://github.com/KaoutharBousbaa1/Kestra_NarutoAI/blob/main/screenshots/screenshot_15.png?raw=true)
5. Generate Access and Refresh tokens using Postman or a similar tool:
    - Replace `your_client_id` with your actual client ID in the following URL and paste it into your browser:
      ```sh
      https://www.strava.com/oauth/authorize?client_id=your_client_id&redirect_uri=http://localhost&response_type=code&scope=activity:read_all
      ```
    - You should see a page that looks like this, with your photo and website. Go ahead and hit authorize
   ![Alt text](https://github.com/KaoutharBousbaa1/Kestra_NarutoAI/blob/main/screenshots/screenshot_16.png?raw=true)
   - After you do that, your browser will probably error. That’s ok. With this error, we actually get the information that we want from Strava. If you look at the navigation bar, the URL should now look like:
      ```sh
      http://localhost/?state=&code=somecode&scope=read,activity:read_all
      ```
      Copy down whatever the code is between code= and the & sign (where my snippet says “somecode”). Now you are ready to get your access and refresh token.
    - You will then make a POST request to Strava which will give you the tokens you need. To make the call in Postman, replace the placeholders in the call below with your Client ID, Client Secret, and the code      from the previous step.

      ```sh
      https://www.strava.com/oauth/token?client_id=your_client_id&client_secret=your_client_secret&code=your_code_from_previous_step&grant_type=authorization_code
      ```
    - Retrieve the Access and Refresh tokens from the JSON response.
      After you make the POST request, you will get a response which includes an Access and Refresh token in the JSON response.
    ![Alt text](https://github.com/KaoutharBousbaa1/Kestra_NarutoAI/blob/main/screenshots/screenshot_17.png?raw=true)
## Step 11: Encrypt Your Keys
Before proceeding, the Kestra flows interact with external sources such as OpenAI, Google Cloud Storage, BigQuery, Strava API, and Discord. Therefore, it is important to keep your keys secret for practical use.

In our case, in the YAML code, the keys are referenced as `{{ secret('SECRET_KEY_NAME') }}`, while the actual keys are stored in the `.env` file and their encrypted versions in the `.env_encoded` file.

1. Create an `.env` file in the KestraProject folder with the following keys:
    ```sh
    OPENAI_API_KEY=THE_ACTUAL_KEY_HERE
    DISCORD_WEBHOOK=THE_ACTUAL_KEY_HERE
    CLIENT_ID_STRAVA=THE_ACTUAL_KEY_HERE
    CLIENT_SECRET_STRAVA=THE_ACTUAL_KEY_HERE
    REFRESH_TOKEN_STRAVA=THE_ACTUAL_KEY_HERE
    ```
    For Milestone 1, you only need to obtain the following:
    - `OPENAI_API_KEY`
    - `DISCORD_WEBHOOK`

    For Milestone 3, in addition to the keys from Milestone 1, you will need:
    - `CLIENT_ID_STRAVA`
    - `CLIENT_SECRET_STRAVA`
    - `REFRESH_TOKEN_STRAVA`
    - `DISCORD_WEBHOOK`

2. To encode the values, run the following command prompt for each key in the Git Bash:
    ```sh
    echo -n "THE_ACTUAL_KEY_HERE" | base64
    ```
3. Navigate to the location of the .env file (within the KestraProject folder) and create a new file .env_encoded and paste the encoded value from the previous step.
    ```sh
    SECRET_YOUR_KEY_NAME=RESULT_FROM_ABOVE_PASTED
    ```
5. Update your `docker-compose.yml` file to use the encoded keys:
    ```yaml
    kestra:
      image: kestra/kestra:latest-full
      env_file:
        - .env_encoded
    ```
6. For Milestone 2, you will need to encode the service account JSON file, to do encode it to base64, use the following command in Git Bash, where sa.json is your service account JSON file:
    ```sh
    echo "SECRET_SERVICE_ACCOUNT=$(base64 --input=sa.json)" >> .env_encoded
    ```
Attached to this repo, you will find a template of .env_encoded and .env files.
    
For more information, refer to the [Kestra Documentation](https://kestra.io/docs/concepts/secret).

## Step 12: Schema Setup
1. In the Discord directory (not inside the src folder) , create an `.env` file with the following code:
    ```sh
    TOKEN=Paste_here_the_token_of_your_discord_bot_from_the_previous_steps
    ```
2. In `index.js`, replace `keyFilename` and `keyFile` with your GCS service account key file path and the `projectID` variable with your GCS project ID. Also, replace the `bucketName` variable with the actual bucket name you created in the Google Cloud Storage project:
    ```javascript
    const bucketName = 'your_bucket_name_here';
    ```
    
## Run the Project
1. Install `Node.js`(which includes `npm`):
   - Open your web browser and go to the [Node.js download page](https://nodejs.org/en).
   - Download the LTS (Long Term Support) version for most stability.
   - Once the installer is downloaded, open it to start the installation process.
2. Verify that they have been installed correctly, run the following commands in your terminal or command prompt:
    ```bash
    node -v
    npm -v
3. Install `nodemon` using the command:
   ```sh
    npm install -g nodemon
    ```
4. Navigate to your Discord Bot directory and run the following command to unzip the node_modules folder:
   ```sh
      tar -xf node_modules.zip
    ```
6. Then navigate to the node_modules folder and install the required packages by running the command:
    ```sh
    npm install
    ```

7. Navigate to your Discord Bot directory and run the following command to start the bot:
    ```sh
    nodemon src/index.js
    ```
8. Open Docker Desktop application
9. Navigate to the folder where the `docker-compose.yml` and run the following command:
    ```sh
    docker-compose up -d
    ```
10. Open [http://localhost:8080](http://localhost:8080) in your browser to access the Kestra UI.
11. Import the flows to Kestra UI by clicking on 'Import'
   ![Alt text](https://github.com/KaoutharBousbaa1/Kestra_NarutoAI/blob/main/screenshots/screenshot_18.png?raw=true)

## Final Notes
- Ensure that both the Docker Compose setup and the Discord bot are running.
- Remember to configure the timezone in the Kestra UI to fit your local timezone.

Follow these steps, and you'll have your Kestra project and Discord bot up and running smoothly. If you have any questions about the project, face any problems while following along, or have a suggestion for me, feel free to comment or drop me a DM on [X](https://x.com/kaouthar_sc).

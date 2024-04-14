# Family Calendar Manager

This is a tool to manage calendar events.

## Structure

This application consists of 3 parts:
1. Client side: react App
2. Server side: expressJs App
3. Backend: MongoDB

## How to use

1. Download the code
2. Under /server folder, create .env file, add the following keys:
MONGO_DB_USERNAME: {your MongoDB connection user name}
MONGO_DB_PWD: {your MongoDB connection password}
MONGO_DB_NAME: {your MongoDB deployment name}
3. In PowerShell terminal, input the following command:
```
cd server
npm run start
```

In another PowerShell terminal, input the following command:
```
cd client
npm run start
```

It should load the service automatically in your browser.

## Features

1. User profile management
2. Calendar events management
3. Notification (WIP)

### User profile management

Current allows to create new user account, or update existing user account.
User account contains the following attributes:
name: the name of the user
Email: the Email that will be used for notification
people: people involved in this account's calendar events. Each person will have their name and event color.

### Calendar events management

Current allows to navigate through months and view/add/update/delete calendar events.
Calendar events contains the following attributes:
title: the title of the event. This will be shown in the calendar view.
startTime: start date & time of the event.
endTime: end date & time of the event.
location: address of the event. Will integrate with Google map in the future.
people: people associated with this event. This determines the color of this event displayed in calendar view.
description: detailed description of the event.


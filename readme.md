# Installation

With docker and docker-compose installed run:

`docker-compose up --build`

This should create 3 containers:

1. `client` - React frontend. The code is mounted from the repository `client/` directory.
2. `server` - NestJS backend. Volume mounted from `server/`.
3. `mongodb` - MongoDB image from dockerhub.

Each service has its own Dockerfile within their respective directories.

# Features

## Frontend

The react frontend has 3 sections:

`Home` contains a split pane view of upcoming events (7 days or less) as well as recently expired events

`Events` contains a larger list of all the events stored on the persistence store.

`Edit/Add` is where we can view the event, as well as edit the attendees and description.

The components all have the ability to jump to a specific event to edit, or you can delete a specific event from the list view. You can also delete an event when you go to edit it.

## Backend

TODO finish writing

# Testing

TODO finish writing

# Admin Tools

TODO finish writing

# Improvements

TODO finish writing

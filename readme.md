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

The Nest backend comes with a basic CRUD API for our events. We use MongoDB as well as Mongoose to facilitate our persistence storage. We also provide a notification service that alerts users via email 30 minutes before a meeting they've been added to starts.

### Events API

`get:/events` - Fetches all the events (expired and upcoming). Returns: `<Event[]>`
`get:/events/:startDate/:endDate - Fetches all events occuring within the given timeframe. Returns: `<Event[]>`
`post:/events` - Adds a new event based on the `@Body()` parameters. A `class-validations` DTO makes sure that the body received is a valid Event object before committing it into the database. The expected body is shown below:

```
{
	"name": "Meeting Name",
	"description": "Meeting description goes here",
	"attendees": ["tim@tim.com", "steve@steve.com", "bugs@bugs.com"], 
	"eventDate": "2/22/2024 12:11:04 PM"
}
```

The only required fields are `name` and `eventDate`. `attendees` can be left blank as an empty array `[]` or just left off the JSON body entirely. Returns: `<Event>`.

`put:/events/:id` - Updates the given id with a new event. Same validations as the post request on the body object. Returns: `<Event>`.
`delete:/events/:id` - Deletes the specified event based on id. Returns: `<void>`.

### Notification

Using the `nestjs/scheduler` package there is a cron job that is scheduled to run every 5 minutes. This cron job will fetch all events happening in the next 30 minutes and if any are found, it will send an email to the recipients based on the user attendees (The email send functionality isn't implemented as per the take home requirements) but everything leading up to the actual sending of the email is implemented and available to see in `src/tasks/eventnotifier.service.ts`.

Additionally, when an event has a notification sent out it will automatically be sent into a Redis queue, which schedules a job to change a flag on the `Event` from `notified=false` to `notified=true`. If `notified=true` events will not trigger the notifier service and recipients will not continually receive reminders once the 30m reminder has been sent once.

### Logging

All API endpoints are covered by a logger that logs the incoming request and response. Additionally, services have a logger that outputs pertinent events within the system.

# Admin API

In the base directory is a `event_api_collection.json` collection (Postman or Insomnia supported) that has a collection of api's. In addition to the API's mentioned above there are two new API's to get started with testing functionality in the project.

`post:/events/testdata` - Hitting this endpoint will create 4 new events

1. Event in 10 days - Only shows up on the main event page (since the home dashboard only shows the events coming up in 7 days).
2. Event in 1 day - Shows up in both the main event page and home dashboard, but does not trigger an notification.
3. Event in 25 minutes - Shows up on both main event page, home dashboard, and will trigger a notification.
4. Event in 30 seconds - Shows up on both main event page, home dashboard, triggering a notification and will move to the expired column once the event passes.

In doing so you should see the different events populate on the frontend.

`post:/events/deleteallevents` - This endpoint will delete all the events in the database. 

# Testing

Running `npm run test` should run some tests on the service while injecting in a testing repository that abstracts away the data layer. The testing suite isn't fully realized. When completed, we should be able to write tests that use our `testing.event.repository` interface to test our methods.

For example, when we mock our service to test our controller we will instead inject `testing.event.repository` in addition to a new file `testing.event.service` in order to mock everything down to the data layer.

# Improvements

## Logging

The logging framework hasn't been injected everywhere and only the surface level API requests get caught. Creating a production ready service requires more robust logging.

## Auth and Users

I didn't focus on authentication and users (preventing access to API's based on tokens) and preventing unauthorized access to the backend.

Additionally, with users we can tie events to users allowing them to see events that they are allowed to see. End-users can only see their own events while administrators can see all events, etc...

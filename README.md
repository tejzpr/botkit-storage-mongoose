# botkit-storage-mongoose

A MongoDB/Mongoose storage module for Botkit. Added the option to use an existing mongoDB connection and the ability to use new Models.

## Usage

Just require `botkit-storage-mongoose` and pass it a config with a `mongoUri` option.
Then pass the returned storage when creating your Botkit controller. Botkit will do the rest.

Make sure everything you store has an `id` property, that's what you'll use to look it up later.

```
var Botkit = require('botkit'),
    mongodbStorage = require('botkit-storage-mongoose')({mongoUri: '...', tables: ['TABLE1', 'TABLE2']}),
    controller = Botkit.slackbot({
        storage: mongodbStorage // or db: MongoDB-instance
    });
```

```
// then you can use the Botkit storage api, make sure you have an id property
var beans = {id: 'cool', beans: ['pinto', 'garbanzo']};
controller.storage.teams.save(beans);
beans = controller.storage.teams.get('cool');

```

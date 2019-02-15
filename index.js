const Hapi = require('hapi');
const knex = require('./src/knex');
const fileUpload = require('./src/fileUpload');
require('dotenv').config();

const server = Hapi.server({
  port: process.env.PORT || 5000,
  routes: {
    cors: {
      origin: ['*']
    },
    payload: {
      maxBytes: 104857600
    }
  }
});

// Read all items
server.route({
  method: 'GET',
  path: '/',
  handler: (request, h) => {
    return knex('items')
      .select('id', 'name', 'description', 'price', 'image_url')
      .then(results => {
        if (!results || results.length === 0) {
          return {
            error: true,
            errMessage: 'no items found'
          };
        }
        return results;
      })
      .catch(err => {
        return 'server-side error';
      });
  }
});

server.route({
  method: 'GET',
  path: '/api/items',
  handler: (request, h) => {
    return knex('items')
      .select('id', 'name', 'description', 'price', 'image_url')
      .then(results => {
        if (!results || results.length === 0) {
          return {
            error: true,
            errMessage: 'no items found'
          };
        }
        return results;
      })
      .catch(err => {
        return 'server-side error';
      });
  }
});

// Handler for creating item, using s3 to upload image
// and then store the image url along with the data to database.
const uploadHandler = () => async (request, h) => {
  let item = request.payload;

  let itemData = {
    name: item.name,
    description: item.description,
    price: item.price,
    image_url: null
  };
  let responseFile = null;
  await fileUpload(request.payload.file)
    .then(resp => {
      responseFile = resp.Location;
      itemData.image_url = responseFile;
      return knex('items')
        .insert(itemData)
        .returning('id')
        .into('items')
        .then(id => {
          itemData.id = id[0];
        })
        .catch(err => {
          return 'server-side error';
        });
    })
    .catch(err => {
      responseFile = err.message;
    });
  return {
    data: itemData,
    message: 'successfully created item'
  };
};

// Create an item
server.route({
  method: 'POST',
  options: {
    handler: uploadHandler()
  },
  path: '/api/items'
});

// Update an item
server.route({
  method: 'PUT',
  path: '/api/items/{id}',
  handler: (request, h) => {
    const itemId = request.params.id;
    const item = request.payload;
    return knex('items')
      .where({ id: itemId })
      .update({
        name: item.name,
        description: item.description,
        price: item.price,
      })
      .then(res => {
        return {
          newItem: {
            id: item.id,
            name: item.name,
            description: item.description,
            price: item.price,
          },
          message: 'successfuly updated item'
        };
      })
      .catch(err => {
        return 'server-side error';
      });
  }
});

// Delete an item
server.route({
  method: 'DELETE',
  path: '/api/items/{id}',
  handler: (request, h) => {
    const itemId = request.params.id;
    return knex('items')
      .where({ id: itemId })
      .del()
      .then(res => {
        return {
          id: itemId,
          message: 'successfuly deleted item with id: ' + itemId
        };
      })
      .catch(err => {
        return 'server-side error';
      });
  }
});

const init = async () => {
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

init();

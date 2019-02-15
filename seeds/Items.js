// Default data items sb

exports.seed = function seed(knex, Promise) {
  const tableName = 'items';

  const rows = [
    {
      name: 'Teddy Bear',
      description: "Brown, big bear plush and it's very cute!",
      price: 50000,
      image_url:
        'https://s3-ap-southeast-1.amazonaws.com/jubelio-s3-bucket/brown-teddy-bear.jpg'
    },
    {
      name: 'Korpokkur Plushie',
      description: 'Cute, green, fluffy, imported from Japan',
      price: 400000,
      image_url:
        'https://s3-ap-southeast-1.amazonaws.com/jubelio-s3-bucket/korpokkur-plush.jpeg'
    },
    {
      name: 'Namazu Plushie',
      description: 'Hefty Namazu to keep you company at all times!',
      price: 500000,
      image_url:
        'https://s3-ap-southeast-1.amazonaws.com/jubelio-s3-bucket/namazu-plush.png'
    },
    {
      name: 'Fat Cat Plushie',
      description: 'The heftiest, be careful!',
      price: 500000,
      image_url:
        'https://s3-ap-southeast-1.amazonaws.com/jubelio-s3-bucket/fat-cat-plush.jpg'
    }
  ];

  return knex(tableName)
    .del()
    .then(function() {
      return knex.insert(rows).into(tableName);
    });
};

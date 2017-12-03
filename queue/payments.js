'use strict';

let redisConfig;
if (process.env.NODE_ENV === 'production') {
  redisConfig = {
    redis: {
      port: process.env.REDIS_PORT,
      host: process.env.REDIS_HOST,
      auth: process.env.REDIS_PASS
    }
  };
} else {
  redisConfig = {};
}

const queue = require('kue').createQueue(redisConfig);

queue.watchStuckJobs(6000);

queue.on('ready', () => {
  // If you need to
  console.info('Queue is ready!');
});

queue.on('error', (err) => {
  // handle connection errors here
  console.error('There was an error in the main queue!');
  console.error(err);
  console.error(err.stack);
});

function createPayment(data, done) {
  queue.create('payment', data)
    .priority('high')
    .attempts(8)
    .backoff(true)
    .removeOnComplete(false)
		.delay(1000)
    .save((err) => {
      if (err) {
        console.error(err);
        done(err);
      }
      if (!err) {
        done();
      }
    });
}


// Process up to 20 jobs concurrently
queue.process('payment', 5, function(job, done){
	setTimeout( done, Math.random() * 5000 );
  // Call done when finished
  //done();
});


module.exports = {
  create: (data, done) => {
		createPayment(data, done);
  }
};

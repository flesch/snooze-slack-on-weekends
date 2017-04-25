const { WebClient } = require('@slack/client');
const moment = require('moment');
const { isHoliday } = require('wgl-holidays');

const isWeekday = new Date().getDay() !== 0 && new Date().getDay() !== 6;
const isBusinessDay = isWeekday && !isHoliday(moment());

module.exports.handler = (event, context, callback) => {
  const client = new WebClient(process.env.SLACK_API_TOKEN);
  if (!isBusinessDay) {
    client.dnd.setSnooze(1440, (err, res) => {
      console.log(!err && res.ok ? 'Snooze set for 24 hours' : err);
    });
  }
};

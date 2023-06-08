import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const VIDEOPLAYER_CURRENT_TIME = 'videoplayer-current-time';
const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on(
  'timeupdate',
  throttle(data => {
    localStorage.setItem(VIDEOPLAYER_CURRENT_TIME, data.seconds);
  }, 1000)
);

const currentTime = localStorage.getItem(VIDEOPLAYER_CURRENT_TIME);
if (currentTime) {
  player.setCurrentTime(currentTime).catch(function (error) {
    console.error(error);
  });
}

import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);
    
const KEY = 'videoplayer-current-time';
const key = localStorage.getItem(KEY);
if (key) {
  player.setCurrentTime(parseFloat(key));
}

player.getVideoTitle().then(function(title) {
        console.log('title:', title);
    });

player.on(
  'timeupdate',
  throttle(data => {
    localStorage.setItem(KEY, data.seconds.toString());
  }, 1000),
);
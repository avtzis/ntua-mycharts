const dateDiff = date => {
  date = new Date(date);
  const diff = Date.now() - date;

  const ms = Math.floor(diff);
  const sec = Math.floor(ms / 1000);
  const min = Math.floor(sec / 60);
  const h = Math.floor(min / 60);
  const days = Math.floor(h / 24);

  if(days >= 1) return days === 1 ? 'Yesterday' : `${days} days ago`;
  if(h >= 1) return h === 1 ? '1 hour ago' : `${h} hours ago`;
  if(min >= 1) return min === 1 ? '1 minute ago' : `${min} minutes ago`;
  if(sec >= 1) return days === 1 ? '1 second ago' : `${sec} seconds ago`;
  return `${ms} milliseconds ago`;
}

export default dateDiff;
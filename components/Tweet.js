import timeago from "lib/timeago";

export default function Tweet({ tweet }) {
  return (
    <>
      <p>
        {tweet.content} | {timeago.format(new Date(tweet.createdAt))}
      </p>
      <p>by: {tweet.author.name}</p>
      <hr />
    </>
  );
}

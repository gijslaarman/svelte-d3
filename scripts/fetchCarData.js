import getRandomNumber from "./getRandomNumber";

async function fetchData() {
  const { url, randomNumber } = constructUrl();

  const res = await fetch(url);
  const data = await res.json();

  if (res.ok) {
    return { data, randomNumber };
  } else {
    throw new Error(data);
  }
}

function constructUrl() {
  const json = "https://opendata.rdw.nl/resource/m9d7-ebf2.json";
  const url = new URL(json);
  const MAX_NUMBER = 14000000;

  const randomNumber = getRandomNumber(MAX_NUMBER);

  const searchQuery = {
    $limit: 10,
    $offset: randomNumber,
  };

  for (const query in searchQuery) {
    url.searchParams.set(query, searchQuery[query]);
  }

  return {
    url,
    randomNumber,
  };
}

export default fetchData;

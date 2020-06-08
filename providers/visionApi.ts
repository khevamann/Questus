import { firebaseConfig } from '../config/firebaseConfig';
import { GameItem } from '../util/types';

const API_URL = `https://vision.googleapis.com/v1/images:annotate?key=${firebaseConfig.apiKey}`;

export async function callGoogleVisionAsync(image: string) {
  const body = {
    requests: [
      {
        image: {
          content: image,
        },
        features: [{ type: 'LABEL_DETECTION', maxResults: 5 }],
      },
    ],
  };

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const parsed = await response.json();
  if (
    !parsed ||
    parsed.responses.length === 0 ||
    parsed.responses[0].labelAnnotations === 0
  ) {
    return [];
  }
  return parsed.responses[0].labelAnnotations.map((label: Label) =>
    label.description.toLowerCase()
  );
}

export const isItemMatch = (results: string[], item: GameItem) => {
  const altNames = [...item.alternate, item.name];
  for (const name of altNames) {
    for (const res of results) {
      if (res.indexOf(name) !== -1) return true;
    }
  }
  return false;
};

type Label = {
  description: string;
  mid: string;
  score: number;
  topicality: number;
};

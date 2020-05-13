import { firebaseConfig } from '../config/firebaseConfig';

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
  if (!parsed) {
    return null;
  }
  console.log(parsed.responses[0].labelAnnotations);
  return parsed.responses[0].labelAnnotations.reduce(
    (res: string, label: Label) => res + label.description + ', ',
    ''
  );
}

type Label = {
  description: string;
  mid: string;
  score: number;
  topicality: number;
};

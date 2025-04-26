// File: /api/properties.js

import fetch from 'node-fetch';

export default async function handler(req, res) {
  const GHL_API_KEY = process.env.GHL_API_KEY;
  const CUSTOM_OBJECT_ID = process.env.CUSTOM_OBJECT_ID;

  if (!GHL_API_KEY || !CUSTOM_OBJECT_ID) {
    res.status(500).json({ error: 'Missing API Key or Custom Object ID' });
    return;
  }

  try {
    const ghlResponse = await fetch(`https://001-sas-properties.vercel.app/`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${GHL_API_KEY}`,
        'Content-Type': 'application/json',
        'Version': '2021-07-28'
      }
    });

    const data = await ghlResponse.json();
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow CORS
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching GHL data:', error);
    res.status(500).send('Error fetching properties');
  }
}

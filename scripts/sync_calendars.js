const fs = require('fs');
const https = require('https');
const path = require('path');

// 1. iCal Parser (RFC 5545) helper
function parseICal(icsContent) {
  const bookedDates = new Set();
  const eventRegex = /BEGIN:VEVENT([\s\S]*?)END:VEVENT/gi;
  let match;

  while ((match = eventRegex.exec(icsContent)) !== null) {
    const eventBlock = match[1];
    
    // Extract DTSTART & DTEND
    const dtStartMatch = eventBlock.match(/DTSTART(?:;VALUE=DATE)?:?([0-9]{8})/i);
    const dtEndMatch = eventBlock.match(/DTEND(?:;VALUE=DATE)?:?([0-9]{8})/i);

    if (dtStartMatch && dtEndMatch) {
      const sStr = dtStartMatch[1];
      const eStr = dtEndMatch[1];

      const start = new Date(sStr.slice(0, 4), parseInt(sStr.slice(4, 6)) - 1, sStr.slice(6, 8));
      const end = new Date(eStr.slice(0, 4), parseInt(eStr.slice(4, 6)) - 1, eStr.slice(6, 8));

      // Loop through all dates in range
      let cur = new Date(start);
      while (cur < end) {
        const y = cur.getFullYear();
        const m = String(cur.getMonth() + 1).padStart(2, '0');
        const d = String(cur.getDate()).padStart(2, '0');
        bookedDates.add(`${y}-${m}-${d}`);
        cur.setDate(cur.getDate() + 1);
      }
    }
  }

  return [...bookedDates].sort();
}

function fetchUrl(url) {
  return new Promise(resolve => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) PhuketVipConcierge-CalendarSync/1.0'
      }
    }, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve(data));
    }).on('error', () => resolve(''));
  });
}

// 2. Automated Sync Engine
async function syncAllCalendars() {
  console.log('⏰ [CRON HOURLY SYNC] Starting Airbnb & iCal Calendars Synchronizer...');

  const appJsPath = 'e:/laragon/www/phuketvipconcierge/js/app.js';
  let appJs = fs.readFileSync(appJsPath, 'utf8');

  // Find fallback properties in app.js
  const propMatch = appJs.match(/const fallbackProperties = (\[[\s\S]*?\n\]);/);
  if (!propMatch) {
    console.error('Could not locate fallbackProperties array in app.js');
    return;
  }

  let properties = JSON.parse(propMatch[1]);
  let updated = 0;

  for (const p of properties) {
    if (p.purpose === 'rent' || p.airbnb_id) {
      console.log(`Checking property ${p.id} (${p.title})...`);

      // If an iCal feed is configured
      if (p.ical_url && p.ical_url.startsWith('http')) {
        console.log(`  Downloading iCal from: ${p.ical_url}`);
        const icsData = await fetchUrl(p.ical_url);
        if (icsData && icsData.includes('BEGIN:VCALENDAR')) {
          const booked = parseICal(icsData);
          p.booked_dates = booked;
          p.last_calendar_sync = new Date().toISOString();
          console.log(`  ✓ Synced ${booked.length} booked dates from iCal!`);
          updated++;
        }
      }
    }
  }

  // Persist updated properties back to app.js and data folder
  const newBlock = `const fallbackProperties = ${JSON.stringify(properties, null, 2)};`;
  appJs = appJs.replace(/const fallbackProperties = \[[\s\S]*?\n\];/, newBlock);
  fs.writeFileSync(appJsPath, appJs, 'utf8');

  // Also save to static data file
  const dataDir = 'e:/laragon/www/phuketvipconcierge/public/data';
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  fs.writeFileSync(path.join(dataDir, 'calendars.json'), JSON.stringify({
    last_sync: new Date().toISOString(),
    properties: properties.map(p => ({
      id: p.id,
      airbnb_id: p.airbnb_id,
      booked_dates: p.booked_dates || []
    }))
  }, null, 2), 'utf8');

  console.log(`✅ [CRON HOURLY SYNC] Finished! Checked ${properties.length} listings. Sync timestamp: ${new Date().toISOString()}`);
}

syncAllCalendars();

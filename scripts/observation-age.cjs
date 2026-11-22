// Report the age of a delayed NOAA observation. The hook only reads its event on stdin.
const fs = require('node:fs');

function observationTime(response) {
  const content = typeof response === 'string' ? response : JSON.stringify(response ?? '');
  const match = /Latest report\s+(\d{4}-\d{2}-\d{2})\s+(\d{2}:\d{2}) UTC/.exec(content);
  return match ? Date.parse(match[1] + 'T' + match[2] + ':00Z') : NaN;
}

function emitAge(event) {
  const timestamp = observationTime(event.tool_response);
  const ageHours = Math.floor((Date.now() - timestamp) / 3600000);
  if (Number.isFinite(ageHours) && ageHours >= 6) {
    const additionalContext = `The latest buoy report is ${ageHours} hours old. Label its observation time explicitly when describing sea conditions.`;
    const output = { hookSpecificOutput: { hookEventName: 'PostToolUse', additionalContext } };
    process.stdout.write(JSON.stringify(output));
  }
}

try {
  emitAge(JSON.parse(fs.readFileSync(0, 'utf8')));
} catch {
  // Unexpected host payloads do not interrupt the source tool or alter its result.
}

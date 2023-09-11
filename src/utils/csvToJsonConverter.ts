// src/csvToJsonConverter.ts
import fs from 'fs';
import csvtojson from 'csvtojson';

export async function convertCsvToJson(inputBuffer: Buffer): Promise<string> {
  const jsonArray = await csvtojson().fromString(inputBuffer.toString());
  return JSON.stringify(jsonArray);
}

export function saveJsonToFile(jsonData: string, outputFilePath: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    fs.writeFile(outputFilePath, jsonData, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}
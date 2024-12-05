import { readFileSync, writeFileSync } from 'fs';

/**
 * Get Json at FilePath
 */
export async function getJsonFile(filePath: string): Promise<any> {
  let json: any;
  try {
    json = readFileSync(`${filePath}.json`, 'utf-8');
  } catch (error) {
    console.error('Read Json File Error: ', error);
  }

  return JSON.parse(json);
}

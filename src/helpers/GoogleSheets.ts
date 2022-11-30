import axios from "axios";

const SPREADSHEET_ID = "1VdYCVpx7_u3dAitZaaI8riJ07xalUzWm_SVK_F5r-fo";
const API_KEY = "AIzaSyAZMP57la0KaBNN1YL7W2E2afx0vmmth-I";

// function Delay(milliseconds: number) {
// 	return new Promise<number>(
// 		(resolve) => setTimeout(() => resolve(5), milliseconds)
// 	);
// }
// const resultPromise = Delay(1000);
// // .............. 1s, resultPromise = 5

// async function GetValue() {
// 	return (await fetch('some URL')).data.value;
// }

// import { GoogleSpreadsheet } from "google-spreadsheet";
// const spreadsheet = new GoogleSpreadsheet(SPREADSHEET_ID);
// spreadsheet.useApiKey(API_KEY);
// export async function FetchData() {
// 	// Load basic spreadsheet properties
// 	try {
// 		await spreadsheet.loadInfo();
// 		console.log("Spreadsheet title", spreadsheet.title);

// 		const [sheet] = spreadsheet.sheetsByIndex;
// 		console.log("Sheet title", sheet.title);

// 		const rows = await sheet.getRows();
// 		console.log("Rows", rows);
// 	} catch (error) {
// 		console.error(
// 			"An error occurred while connecting to the Google Sheets API:",
// 			error
// 		);
// 	}
// }

export class Entry {
	constructor(
		public type: string,
		public title: string,
		public description: string,
		public tags: string,
		public link?: string,
		public code?: string,
		public authors?: string,
		public isbn?: string
	) {}
}

/**
 * Fetch speechiegoodies data from Google Sheets
 * @throws if request fails
 */
export async function FetchData() {
	const range = "A:H";
	const URL = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${range}`;
	const params = `?key=${API_KEY}`;

	const { data } = await axios.get(URL + params);
	const { values } = data;

	// Put everything into an object structure
	const [headers, ...rows] = values as string[][];
	const entries = rows.map(
		(row) =>
			new Entry(
				...(row as [
					string,
					string,
					string,
					string,
					string,
					string,
					string,
					string // this is gross
				])
			)
	);

	return entries;
}

import * as readline from "readline";

type Pair = [number, number];

let result = 0;

function parseHarga(harga: string): number {
	const cleaned = harga.replace("Rp", "").replace(",", "");
	return parseInt(cleaned.split(".")[0], 10);
}

function calculatePendapatan(
	pesanan: Pair[],
	baku: Pair[],
	mesin: Pair[]
): void {
	for (const p of pesanan) {
		if (p[0] === 0) continue;
		for (const b of baku) {
			if (b[0] === 0) continue;
			for (const m of mesin) {
				// menghindari maintenance
				while (p[0] > 0 && b[0] > 0 && m[0] > 1) {
					const pendapatan = p[1] - b[1] - m[1];
					// console.log("PEND", pendapatan);
					if (pendapatan <= 0) return;
					result += pendapatan;
					p[0]--;
					b[0]--;
					m[0]--;
				}
			}
		}
	}
}

async function main(): Promise<void> {
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});

	let input = "";

	rl.on("line", (line) => {
		input += line + "\n";
	});

	rl.on("close", () => {
		const data = input.split("\n").filter((line) => line.trim() !== "");
		let index = 0;

		const na = parseInt(data[index++]);
		const pesanan: Pair[] = [];
		for (let i = 0; i < na; i++) {
			const [total, harga] = data[index++].split(" ");
			pesanan.push([parseInt(total), parseHarga(harga)]);
		}
		pesanan.sort((a, b) => b[1] - a[1]);

		const nb = parseInt(data[index++]);
		const baku: Pair[] = [];
		for (let i = 0; i < nb; i++) {
			const [total, harga] = data[index++].split(" ");
			baku.push([parseInt(total), parseHarga(harga)]);
		}
		baku.sort((a, b) => a[1] - b[1]);

		const nc = parseInt(data[index++]);
		const mesin: Pair[] = [];
		for (let i = 0; i < nc; i++) {
			const [total, harga] = data[index++].split(" ");
			mesin.push([parseInt(total), parseHarga(harga)]);
		}
		mesin.sort((a, b) => a[1] - b[1]);

		calculatePendapatan(pesanan, baku, mesin);
		console.log(result);
	});
}

main();

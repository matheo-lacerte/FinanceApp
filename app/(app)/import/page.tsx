'use client'
import { useState } from "react"

export default function ImportPage() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [fileContent, setFileContent] = useState("");


    async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0] ?? null;
        setSelectedFile(file);

        if (!file) {
            setFileContent("");
            return;
        }

        const text = await file.text();
        setFileContent(text);
    }
    const rows = fileContent
        .split("\n")
        .map((row) => row.trim())
        .filter((row) => row !== "");


    function parseCsvLine(line: String) {
        const values: string[] = [];
        let currentValue = "";
        let insideQuotes = false;

        for (const char of line) {
            if (char === '"') {
                insideQuotes = !insideQuotes;
                continue;
            }

            if (char === "," && !insideQuotes) {
                values.push(currentValue);
                currentValue = "";
                continue;
            }

            currentValue += char;
        }

        values.push(currentValue);
        return values;
    }
    const parsedRows = rows.map(parseCsvLine);
    const importedTransactions = parsedRows.map((row, index) => ({
        id: Date.now() + index,
        merchant: row[5]?.trim() || "Transaction importee",
        category: "Autres",
        amount: -Math.abs(Number(row[11] || 0)),
        date: row[3]?.replaceAll("/", "-") || "",
        account: row[0].trim(),
    }));


    return (
        <main className="space-y-6">
            <header>
                <h1>Impoter des transactions</h1>
                <p>Importer a partir de CSV</p>
            </header>
            <section>
                Choisi un CSV a importer de ta banque
                <input type="file" accept=".csv, .ofx, .qfx" onChange={handleFileChange}>
                </input>
                <pre>{JSON.stringify(importedTransactions.slice(0, 3), null, 2)}</pre>

            </section>
        </main>
    )
}
/**
 * Script para parsear o CSV TACO e gerar o array "alimentos" no db.json.
 * Estrutura: id (índice), descricao, macronutrientes (proteína, lipídeos, carboidratos),
 * micronutrientes (demais campos por 100g).
 * Execute: node scripts/parse-taco.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const CSV_PATH = path.join(__dirname, '../src/TACO/Taco-4a-Edicao - CMVCol taco3.csv');
const DB_PATH = path.join(__dirname, '../db.json');

function parseCSVLine(line) {
  const result = [];
  let i = 0;
  while (i < line.length) {
    if (line[i] === '"') {
      let end = i + 1;
      while (end < line.length && line[end] !== '"') end++;
      result.push(line.slice(i + 1, end));
      i = end + 1;
      if (line[i] === ',') i++;
    } else {
      let end = line.indexOf(',', i);
      if (end === -1) end = line.length;
      result.push(line.slice(i, end).trim());
      i = end + 1;
    }
  }
  return result;
}

function parseValue(raw) {
  if (raw === undefined || raw === '' || raw === 'NA' || raw === '*') return null;
  if (raw === 'Tr' || raw === 'Tr,') return 0;
  const num = parseFloat(String(raw).replace(',', '.'));
  return Number.isNaN(num) ? raw : num;
}

function run() {
  const csvContent = fs.readFileSync(CSV_PATH, 'utf-8');
  const lines = csvContent.split(/\r?\n/);

  const alimentos = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;
    const firstChar = line.trimStart()[0];
    if (!/^\d/.test(firstChar)) continue;
    const cols = parseCSVLine(line);
    if (cols.length < 9) continue;

    const id = parseValue(cols[0]);
    if (id == null || typeof id !== 'number') continue;

    const descricao = cols[1] || '';

    const proteinas = parseValue(cols[5]);
    const lipideos = parseValue(cols[6]);
    const carboidratos = parseValue(cols[8]);

    const alimento = {
      id: Number(id),
      descricao,
      macronutrientes: {
        proteinas_g: proteinas,
        lipideos_g: lipideos,
        carboidratos_g: carboidratos,
      },
      micronutrientes: {
        umidade_pct: parseValue(cols[2]),
        energia_kcal: parseValue(cols[3]),
        energia_kj: parseValue(cols[4]),
        colesterol_mg: parseValue(cols[7]),
        fibra_alimentar_g: parseValue(cols[9]),
        cinzas_g: parseValue(cols[10]),
        calcio_mg: parseValue(cols[11]),
        magnesio_mg: parseValue(cols[12]),
        manganes_mg: parseValue(cols[14]),
        fosforo_mg: parseValue(cols[15]),
        ferro_mg: parseValue(cols[16]),
        sodio_mg: parseValue(cols[17]),
        potassio_mg: parseValue(cols[18]),
        cobre_mg: parseValue(cols[19]),
        zinco_mg: parseValue(cols[20]),
        retinol_mcg: parseValue(cols[21]),
        re_mcg: parseValue(cols[22]),
        rae_mcg: parseValue(cols[23]),
        tiamina_mg: parseValue(cols[24]),
        riboflavina_mg: parseValue(cols[25]),
        piridoxina_mg: parseValue(cols[26]),
        niacina_mg: parseValue(cols[27]),
        vitamina_c_mg: parseValue(cols[28]),
      },
    };

    alimentos.push(alimento);
  }

  let db = { users: [] };
  if (fs.existsSync(DB_PATH)) {
    db = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
  }
  db.alimentos = alimentos;
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf-8');
  console.log(`Alimentos gerados: ${alimentos.length}. db.json atualizado.`);
}

run();

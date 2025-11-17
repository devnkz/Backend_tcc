const fs = require('fs');
const path = require('path');
const mysql = require('mysql');

function loadEnv(envPath) {
  if (!fs.existsSync(envPath)) return {};
  const content = fs.readFileSync(envPath, 'utf8');
  const res = {};
  content.split(/\r?\n/).forEach((line) => {
    const m = line.match(/^\s*([^#=]+?)\s*=\s*(.*)?\s*$/);
    if (!m) return;
    const key = m[1].trim();
    let val = m[2] ?? '';
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    res[key] = val;
  });
  return res;
}

function parseDatabaseUrl(url) {
  try {
    const u = new URL(url);
    return {
      host: u.hostname,
      port: u.port || '3306',
      user: decodeURIComponent(u.username),
      password: decodeURIComponent(u.password),
      database: u.pathname.replace(/^\//, ''),
    };
  } catch (err) {
    return null;
  }
}

(async function main() {
  const root = process.cwd();
  const env = loadEnv(path.join(root, '.env'));
  const dbUrl = env.DATABASE_URL || process.env.DATABASE_URL;
  if (!dbUrl) {
    console.error('DATABASE_URL not found in .env or env');
    process.exit(1);
  }
  const connInfo = parseDatabaseUrl(dbUrl);
  if (!connInfo) {
    console.error('Failed to parse DATABASE_URL:', dbUrl);
    process.exit(1);
  }

  const schemaPath = path.join(root, 'prisma', 'schema.prisma');
  if (!fs.existsSync(schemaPath)) {
    console.error('schema.prisma not found at', schemaPath);
    process.exit(1);
  }

  const schema = fs.readFileSync(schemaPath, 'utf8');
  const models = [];
  const re = /^model\s+(\w+)/gm;
  let m;
  while ((m = re.exec(schema)) !== null) {
    models.push(m[1]);
  }

  const connection = mysql.createConnection({
    host: connInfo.host,
    port: connInfo.port,
    user: connInfo.user,
    password: connInfo.password,
    database: connInfo.database,
    multipleStatements: false,
  });

  connection.connect((err) => {
    if (err) {
      console.error('MySQL connection error:', err.message);
      process.exit(1);
    }
    connection.query(
      'SELECT table_name FROM information_schema.tables WHERE table_schema = ?;',
      [connInfo.database],
      (err, results) => {
        if (err) {
          console.error('Query error:', err.message);
          process.exit(1);
        }
        const tables = results.map((r) => String(r.TABLE_NAME || r.table_name).toLowerCase());
        const missing = [];
        const present = [];
        for (const model of models) {
          const lower = model.toLowerCase();
          // match exact or plural variations (simple heuristics)
          const candidates = [lower, lower + 's', lower + 'es'];
          const found = candidates.some((c) => tables.includes(c));
          if (found) present.push(model);
          else missing.push(model);
        }

        console.log('\nDetected models in prisma/schema.prisma:');
        console.log(models.join(', '));
        console.log('\nTables found in database', connInfo.database + ':');
        console.log(tables.join(', '));
        console.log('\nModels missing from database (not found as tables):');
        if (missing.length === 0) console.log('None — all models found.');
        else console.log(missing.join(', '));

        connection.end();
      }
    );
  });
})();

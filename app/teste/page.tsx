import { executeQuery } from '@/lib/db-helper';
import { getR2Client } from '@/lib/r2-client';
import { S3Client, ListBucketsCommand } from '@aws-sdk/client-s3';

async function testD1() {
  try {
    // Teste simples: verificar se consegue executar uma query
    const result = await executeQuery("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name");
    return {
      success: true,
      message: 'Conexão D1 OK',
      tables: result?.results || [],
      details: `Encontradas ${result?.results?.length || 0} tabelas`
    };
  } catch (error: any) {
    return {
      success: false,
      message: 'Erro na conexão D1',
      error: error.message,
      stack: error.stack
    };
  }
}

async function testR2() {
  try {
    // Teste: tentar criar o cliente e listar buckets (ou pelo menos verificar se o cliente é criado)
    const client = getR2Client();
    
    if (!client) {
      return {
        success: false,
        message: 'Erro na conexão R2',
        error: 'Cliente R2 não pôde ser criado. Verifique as variáveis de ambiente.',
      };
    }
    
    // Tentar listar buckets para verificar conexão
    try {
      const command = new ListBucketsCommand({});
      const response = await client.send(command);
      return {
        success: true,
        message: 'Conexão R2 OK',
        details: `Cliente R2 criado com sucesso. Buckets encontrados: ${response.Buckets?.length || 0}`
      };
    } catch (listError: any) {
      // Se não conseguir listar, mas o cliente foi criado, ainda é um sucesso parcial
      if (listError.message?.includes('Access Denied') || listError.message?.includes('403')) {
        return {
          success: true,
          message: 'Conexão R2 OK (cliente criado, mas sem permissão para listar buckets)',
          details: 'O cliente R2 foi criado com sucesso. A permissão de listar buckets não é necessária para uploads.',
          warning: listError.message
        };
      }
      throw listError;
    }
  } catch (error: any) {
    return {
      success: false,
      message: 'Erro na conexão R2',
      error: error.message,
      stack: error.stack
    };
  }
}

function checkEnvVars() {
  const vars = {
    D1: {
      CLOUDFLARE_ACCOUNT_ID: !!process.env.CLOUDFLARE_ACCOUNT_ID,
      CLOUDFLARE_API_TOKEN: !!process.env.CLOUDFLARE_API_TOKEN,
      D1_DATABASE_ID: !!process.env.D1_DATABASE_ID,
    },
    R2: {
      R2_ACCOUNT_ID: !!process.env.R2_ACCOUNT_ID,
      R2_ACCESS_KEY_ID: !!process.env.R2_ACCESS_KEY_ID,
      R2_SECRET_ACCESS_KEY: !!process.env.R2_SECRET_ACCESS_KEY,
      R2_BUCKET_NAME: !!process.env.R2_BUCKET_NAME,
      R2_PUBLIC_URL: !!process.env.R2_PUBLIC_URL,
    }
  };

  return vars;
}

export default async function TestePage() {
  const envVars = checkEnvVars();
  const d1Test = await testD1();
  const r2Test = await testR2();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">Teste de Conexão - D1 e R2</h1>

        {/* Variáveis de Ambiente */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">Variáveis de Ambiente</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* D1 Vars */}
            <div>
              <h3 className="font-medium mb-2 text-gray-700">D1 (Database)</h3>
              <ul className="space-y-1 text-sm">
                <li className={envVars.D1.CLOUDFLARE_ACCOUNT_ID ? 'text-green-600' : 'text-red-600'}>
                  {envVars.D1.CLOUDFLARE_ACCOUNT_ID ? '✓' : '✗'} CLOUDFLARE_ACCOUNT_ID
                </li>
                <li className={envVars.D1.CLOUDFLARE_API_TOKEN ? 'text-green-600' : 'text-red-600'}>
                  {envVars.D1.CLOUDFLARE_API_TOKEN ? '✓' : '✗'} CLOUDFLARE_API_TOKEN
                </li>
                <li className={envVars.D1.D1_DATABASE_ID ? 'text-green-600' : 'text-red-600'}>
                  {envVars.D1.D1_DATABASE_ID ? '✓' : '✗'} D1_DATABASE_ID
                </li>
              </ul>
            </div>

            {/* R2 Vars */}
            <div>
              <h3 className="font-medium mb-2 text-gray-700">R2 (Storage)</h3>
              <ul className="space-y-1 text-sm">
                <li className={envVars.R2.R2_ACCOUNT_ID ? 'text-green-600' : 'text-red-600'}>
                  {envVars.R2.R2_ACCOUNT_ID ? '✓' : '✗'} R2_ACCOUNT_ID
                </li>
                <li className={envVars.R2.R2_ACCESS_KEY_ID ? 'text-green-600' : 'text-red-600'}>
                  {envVars.R2.R2_ACCESS_KEY_ID ? '✓' : '✗'} R2_ACCESS_KEY_ID
                </li>
                <li className={envVars.R2.R2_SECRET_ACCESS_KEY ? 'text-green-600' : 'text-red-600'}>
                  {envVars.R2.R2_SECRET_ACCESS_KEY ? '✓' : '✗'} R2_SECRET_ACCESS_KEY
                </li>
                <li className={envVars.R2.R2_BUCKET_NAME ? 'text-green-600' : 'text-red-600'}>
                  {envVars.R2.R2_BUCKET_NAME ? '✓' : '✗'} R2_BUCKET_NAME
                </li>
                <li className={envVars.R2.R2_PUBLIC_URL ? 'text-green-600' : 'text-red-600'}>
                  {envVars.R2.R2_PUBLIC_URL ? '✓' : '✗'} R2_PUBLIC_URL
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Teste D1 */}
        <div className={`bg-white rounded-lg shadow-sm border p-6 mb-6 ${d1Test.success ? 'border-green-200' : 'border-red-200'}`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Teste D1 (Database)</h2>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              d1Test.success 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {d1Test.success ? '✓ OK' : '✗ ERRO'}
            </span>
          </div>
          
          <p className={`mb-2 ${d1Test.success ? 'text-green-700' : 'text-red-700'}`}>
            {d1Test.message}
          </p>
          
          {d1Test.success && (
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">{d1Test.details}</p>
              {d1Test.tables && d1Test.tables.length > 0 && (
                <div className="bg-gray-50 rounded p-3 mt-2">
                  <p className="text-sm font-medium text-gray-700 mb-1">Tabelas encontradas:</p>
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    {d1Test.tables.map((table: any) => (
                      <li key={table.name}>{table.name}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
          
          {!d1Test.success && (
            <div className="mt-4 bg-red-50 rounded p-4">
              <p className="text-sm font-medium text-red-800 mb-2">Erro:</p>
              <p className="text-sm text-red-700 font-mono">{d1Test.error}</p>
              {d1Test.stack && (
                <details className="mt-2">
                  <summary className="text-sm text-red-600 cursor-pointer">Stack trace</summary>
                  <pre className="text-xs text-red-600 mt-2 overflow-auto">{d1Test.stack}</pre>
                </details>
              )}
            </div>
          )}
        </div>

        {/* Teste R2 */}
        <div className={`bg-white rounded-lg shadow-sm border p-6 mb-6 ${r2Test.success ? 'border-green-200' : 'border-red-200'}`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Teste R2 (Storage)</h2>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              r2Test.success 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {r2Test.success ? '✓ OK' : '✗ ERRO'}
            </span>
          </div>
          
          <p className={`mb-2 ${r2Test.success ? 'text-green-700' : 'text-red-700'}`}>
            {r2Test.message}
          </p>
          
          {r2Test.success && (
            <div className="mt-4">
              <p className="text-sm text-gray-600">{r2Test.details}</p>
              {r2Test.warning && (
                <div className="bg-yellow-50 border border-yellow-200 rounded p-3 mt-2">
                  <p className="text-sm text-yellow-800">
                    <strong>Aviso:</strong> {r2Test.warning}
                  </p>
                </div>
              )}
            </div>
          )}
          
          {!r2Test.success && (
            <div className="mt-4 bg-red-50 rounded p-4">
              <p className="text-sm font-medium text-red-800 mb-2">Erro:</p>
              <p className="text-sm text-red-700 font-mono">{r2Test.error}</p>
              {r2Test.stack && (
                <details className="mt-2">
                  <summary className="text-sm text-red-600 cursor-pointer">Stack trace</summary>
                  <pre className="text-xs text-red-600 mt-2 overflow-auto">{r2Test.stack}</pre>
                </details>
              )}
            </div>
          )}
        </div>

        {/* Resumo */}
        <div className={`bg-white rounded-lg shadow-sm border p-6 ${
          d1Test.success && r2Test.success 
            ? 'border-green-200 bg-green-50' 
            : 'border-yellow-200 bg-yellow-50'
        }`}>
          <h2 className="text-xl font-semibold mb-4 text-gray-900">Resumo</h2>
          <div className="space-y-2">
            <p className={d1Test.success ? 'text-green-700' : 'text-red-700'}>
              D1: {d1Test.success ? '✓ Conectado' : '✗ Erro na conexão'}
            </p>
            <p className={r2Test.success ? 'text-green-700' : 'text-red-700'}>
              R2: {r2Test.success ? '✓ Conectado' : '✗ Erro na conexão'}
            </p>
            {d1Test.success && r2Test.success && (
              <p className="text-green-700 font-medium mt-4">
                ✓ Todas as conexões estão funcionando!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

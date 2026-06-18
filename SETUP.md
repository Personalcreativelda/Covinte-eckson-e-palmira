# Setup do Projecto - Covinte Digital

## 1. Instalar dependências (necessita internet)

```bash
cd covinte-app
npm install
```

## 2. Criar projecto no Supabase

1. Aceda a https://app.supabase.com e crie uma conta gratuita
2. Clique em **New Project**
3. Dê o nome `covinte-eckson-palmira` e escolha uma senha forte
4. Aguarde a criação (1-2 minutos)

## 3. Executar o schema SQL

1. No Supabase, vá a **SQL Editor → New Query**
2. Cole o conteúdo do ficheiro `supabase/schema.sql`
3. Clique **Run**

## 4. Criar o bucket de fotos

1. No Supabase, vá a **Storage → New Bucket**
2. Nome: `wedding-photos`
3. Marque **Public bucket** como activo
4. Clique **Save**

## 5. Configurar as variáveis de ambiente

1. No Supabase, vá a **Settings → API**
2. Copie a **Project URL** e a **anon/public key**
3. Crie o ficheiro `.env` na raiz do projecto:

```env
VITE_SUPABASE_URL=https://xxxxxxxxxxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_ADMIN_PASSWORD=admin2025
```

## 6. Iniciar em modo de desenvolvimento

```bash
npm run dev
```

Aceda a http://localhost:5173

## 7. Build para produção

```bash
npm run build
```

Os ficheiros ficam na pasta `dist/` — pode hospedar no Netlify, Vercel, ou qualquer hosting.

## Painel Admin

Aceda a `/admin` (ex: http://localhost:5173/admin)
- Senha padrão: `admin2025` (pode alterar no ficheiro `.env`)

### O que pode fazer no Admin:
| Aba | Função |
|-----|--------|
| **Confirmações** | Ver, editar, adicionar e apagar RSVPs. Exportar CSV. Imprimir. |
| **Galeria** | Fazer upload de fotos (arrastar e soltar). Adicionar legendas. Apagar. |
| **Configurações** | Mudar datas, locais, M-Pesa, foto principal — sem tocar no código. |

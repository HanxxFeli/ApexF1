# ApexF1 — Formula 1 Race Prediction & Analytics Platform

An end-to-end Formula 1 analytics platform that processes 10 years of F1 race data (40,000+ records), applies machine learning to predict race outcomes, and surfaces insights through an interactive dashboard.

**Stack:** Python · pandas · Supabase (PostgreSQL) · Docker · scikit-learn · Next.js · TypeScript · Tailwind CSS

---

## 👥 Team

| Person | Role | Folder |
|--------|------|--------|
| **Hans** | Data Engineer | `etl/` |
| **Kunj** | Data Scientist | `ml/` |
| **Yvana & Celine** | Frontend Developers | `web/` |
| **Xander** | Backend Developer | `web/` |

---

## 🏗️ Architecture

```
Raw F1 CSV Data (Kaggle)
        │
        ▼
┌───────────────────┐
│   ETL Pipeline    │  Python · pandas · Docker
│  Extract          │  Reads 9 CSV files from disk
│  Transform        │  Cleans, filters, reshapes data
│  Load             │  Upserts into Supabase
└────────┬──────────┘
         │
         ▼
┌───────────────────┐
│     Supabase      │  PostgreSQL · REST API
│    (8 tables)     │
└────────┬──────────┘
         │
    ┌────┴─────┐
    ▼          ▼
┌───────┐  ┌──────────────┐
│  ML   │  │  Next.js     │
│ Model │  │  Dashboard   │
└───────┘  └──────────────┘
```

---

## 📁 Project Structure

```
apexf1/
├── .env                    # Credentials - never commit this
├── .env.example            # Template for credentials
├── .gitignore
├── docker-compose.yml      # Orchestrates all services
├── etl/                    # Data Engineering (Hans) ✅ Complete
│   ├── Dockerfile
│   ├── run_etl.py
│   ├── requirements.txt
│   ├── data/
│   │   └── raw/f1/         # Raw Kaggle CSV files
│   └── src/
│       ├── __init__.py
│       ├── extract/        # Reads CSVs into DataFrames
│       ├── transform/      # Cleans and filters data
│       └── load/           # Upserts into Supabase
├── ml/                     # Machine Learning (Kunj) 🚧 In Progress
│   ├── src/
│   ├── notebooks/
│   └── models/
└── web/                    # Next.js Dashboard (Yvana, Celine, Xander) 🚧 In Progress
    ├── src/
    └── public/
```

---

## 🚀 Getting Started

### Prerequisites

- Python 3.12+
- Node.js 18+
- Docker Desktop
- Supabase project access (ask Hans for credentials)

### 1. Clone the Repository

```bash
git clone https://github.com/hanxxfeli/ApexF1.git
cd apexf1
```

### 2. Switch to Develop Branch

```bash
git checkout develop
git pull
```

> ⚠️ Always work from `develop`, never directly on `main`

### 3. Set Up Credentials

```bash
cp .env.example .env
```

Fill in your Supabase credentials in `.env`:

```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-service-role-key
```

---

## 💻 Service Setup

### ✅ ETL Pipeline (Hans)

A modular, containerised Python ETL pipeline that extracts raw F1 data, applies table-specific cleaning and validation, and loads 8 normalised tables into Supabase via upsert — making it safe to re-run after every new race.

```bash
cd etl

# Create and activate virtual environment
python -m venv venv
venv\Scripts\activate        # Windows
source venv/bin/activate     # Mac/Linux

# Install dependencies
pip install -r requirements.txt

# Run the full pipeline
python run_etl.py
```

**Run with Docker:**

```bash
cd etl
docker build -t apexf1-etl .
docker run --env-file ../.env apexf1-etl
```

**Tables loaded into Supabase:**

| Table | Rows | Description |
|-------|------|-------------|
| `circuits` | 76 | Circuit locations and coordinates |
| `constructors` | 168 | Team reference data |
| `constructor_standings` | 111 | Championship standings per season |
| `drivers` | 616 | Driver reference data |
| `driver_standings` | 244 | Driver standings per season |
| `qualifying` | 1,100 | Q1/Q2/Q3 lap times (2015–2025) |
| `races` | 233 | Race calendar (2015–2025) |
| `results` | 1,100 | Race results and points (2015–2025) |

**Key technical decisions:**
- Encoding fallback strategy (UTF-8 → Latin-1 → CP1252) handles accented circuit names
- Upsert loading pattern ensures idempotent runs — safe to re-run after every new race
- Automated null and duplicate validation logs data quality on every run
- Modular architecture (one function per table) keeps transforms isolated and testable

---

### 🚧 ML Models (Kunj)

> In progress — predicting top-10 race finishes using XGBoost and Random Forest

```bash
cd ml

python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt

# Run Jupyter notebooks
jupyter notebook

# Train models
python src/train_model.py
```

**Libraries:** pandas · numpy · scikit-learn · xgboost · lightgbm · matplotlib · seaborn · supabase

---

### 🚧 Web Dashboard (Yvana, Celine & Xander)

> In progress — Next.js/TypeScript dashboard visualising race trends and ML predictions

```bash
cd web
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

**Environment setup:**

```bash
cp .env.example .env.local
# Add to .env.local:
# NEXT_PUBLIC_SUPABASE_URL=your_url
# NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
```

**Libraries:** @supabase/supabase-js · recharts · tailwind · clsx · lucide-react

---

## 🐳 Docker Compose

Once all services are ready, the full platform runs with one command from the project root:

```bash
docker-compose up           # start all services
docker-compose up -d        # start in background
docker-compose up --build   # rebuild after code changes
docker-compose down         # stop all services
```

---

## 🔄 Git Workflow

### Starting a New Feature

```bash
# 1. Get the latest code
git checkout develop
git pull

# 2. Create your feature branch
git checkout -b feature/your-feature-name
# Examples:
#   feature/etl-transform
#   feature/ml-xgboost-model
#   feature/dashboard-standings-chart
```

### Committing and Pushing

```bash
git add .
git commit -m "Brief description of what you did"
git push -u origin feature/your-feature-name
```

### Creating a Pull Request

1. Go to GitHub and click **Compare & pull request**
2. Confirm the base branch is `develop`
3. Add a description of your changes
4. Request a review from a teammate
5. After approval, merge and delete the branch

### After Merging

```bash
git checkout develop
git pull
git branch -d feature/your-feature-name
```

---

## 📦 Installing Additional Libraries

**Python (Hans & Kunj):**

```bash
venv\Scripts\activate
pip install package-name
pip freeze > requirements.txt   # always update this after installing
```

**Node (Yvana, Celine, Xander):**

```bash
npm install package-name
# package.json updates automatically
```

---

## 🆘 Troubleshooting

**Virtual environment not activating:**
```bash
# Windows - if blocked by execution policy
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
venv\Scripts\activate
```

**Module not found:**
```bash
# Python
venv\Scripts\activate
pip install -r requirements.txt

# Node
npm install
```

**Git push rejected:**
```bash
git pull
git push
```

**Merge conflicts:**
```bash
# Open conflicted files and look for <<<<<<< and >>>>>>>
# Resolve manually, then:
git add .
git commit -m "Resolve merge conflicts"
git push
```

---

## ✅ Team Rules

- ✅ Always branch from `develop`
- ✅ Always create PRs to `develop`
- ✅ Activate Python venv every time you work
- ✅ Run `pip freeze > requirements.txt` after installing new packages
- ✅ Commit `package.json` changes when installing Node packages
- ❌ Never commit `.env` or `.env.local`
- ❌ Never commit `venv/` or `node_modules/`
- ❌ Never push directly to `main` or `develop`

---

**Questions? Drop them in the team chat! 🏁**

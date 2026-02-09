# ApexF1 - Formula 1 Data Analytics Platform

End-to-end F1 data analytics platform with ETL pipelines, ML predictions, and interactive dashboards.

---

## 👥 Team

| Person | Role | Work On |
|--------|------|---------|
| **Hans** | ETL Engineer | ``etl/`` folder |
| **Kunj** | Data Scientist | ``ml/`` folder |
| **Yvana & Celine** | Frontend Developers | ``web/`` folder |
| **Xander** | Backend Developer | ``web/`` folder |

---

## 🚀 Getting Started

### 1. Clone the Repository
``````bash
git clone https://github.com/hanxxfeli/ApexF1.git
cd apexf1
``````

### 2. Switch to Develop Branch
``````bash
git checkout develop
git pull
``````

**⚠️ Always work from ``develop``, never directly on ``main``**

---

## 💻 Setup Your Environment

### For Hans (ETL - Python)
``````bash
cd etl

# Create virtual environment
python -m venv venv

# Activate it (do this EVERY TIME you work)
venv\Scripts\activate

# Install core libraries
pip install pandas sqlalchemy python-dotenv supabase

# Save dependencies
pip freeze > requirements.txt

# Create environment file
copy ..\.env.example .env
# Edit .env with your Supabase credentials
``````

**Libraries you'll use:**
- ``pandas`` - Data manipulation
- ``sqlalchemy`` - Database connections
- ``python-dotenv`` - Environment variables
- ``supabase`` - Supabase client
- Additional: ``requests``, ``pytest`` (for testing)

**Run ETL:**
``````bash
venv\Scripts\activate
python src/your_script.py
``````

---

### For Kunj (ML - Python)
``````bash
cd ml

# Create virtual environment
python -m venv venv

# Activate it (do this EVERY TIME you work)
venv\Scripts\activate

# Install ML libraries
pip install pandas numpy scikit-learn jupyter supabase python-dotenv matplotlib seaborn

# Save dependencies
pip freeze > requirements.txt

# Create environment file
copy ..\.env.example .env
# Edit .env with your Supabase credentials
``````

**Libraries you'll use:**
- ``pandas`` - Data manipulation
- ``numpy`` - Numerical operations
- ``scikit-learn`` - Machine learning models
- ``jupyter`` - Jupyter notebooks
- ``matplotlib`` & ``seaborn`` - Data visualization
- ``supabase`` - Database connection
- Additional: ``xgboost``, ``lightgbm`` (advanced models)

**Run Jupyter:**
``````bash
venv\Scripts\activate
jupyter notebook
``````

**Train models:**
``````bash
venv\Scripts\activate
python src/train_model.py
``````

---

### For Yvana, Celine & Xander (Web - Next.js)

#### First Time Setup:
``````bash
cd web

# Initialize Next.js project (ONLY ONCE - probably already done)
npx create-next-app@latest . --typescript --tailwind --app --no-src-dir

# When prompted, choose:
# ✔ Would you like to use ESLint? … Yes
# ✔ Would you like to use Turbopack? … No
# ✔ Would you like to customize the import alias? … No
``````

#### Install Dependencies:
``````bash
# Core dependencies (after Next.js is initialized)
npm install @supabase/supabase-js recharts clsx tailwind-merge

# Development dependencies
npm install -D @types/node @types/react
``````

**Libraries you'll use:**
- ``@supabase/supabase-js`` - Supabase client for API calls
- ``recharts`` - Charts and data visualization
- ``clsx`` & ``tailwind-merge`` - Utility for styling
- ``lucide-react`` - Icon library (optional)

#### Environment Setup:
``````bash
# Create environment file
copy .env.example .env.local
# Edit .env.local with:
# NEXT_PUBLIC_SUPABASE_URL=your_url
# NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
``````

**Run dev server:**
``````bash
npm run dev
``````
Open [http://localhost:3000](http://localhost:3000)

**Build for production:**
``````bash
npm run build
npm start
``````

---

## 🔄 Git Workflow

### Every Time You Start Working:
``````bash
# 1. Get latest code
git checkout develop
git pull

# 2. Create your feature branch
git checkout -b feature/your-feature-name
# Examples: feature/etl-races, feature/ml-training, feature/frontend-dashboard

# 3. Work on your code...

# 4. Commit your changes
git add .
git commit -m "Describe what you did"

# 5. Push your branch
git push -u origin feature/your-feature-name
``````

### Create Pull Request:

1. Go to GitHub
2. Click "Compare & pull request"
3. Base should automatically be ``develop`` (if not, change it!)
4. Add description and create PR
5. Request review from teammate
6. After approval, merge

### After Your PR is Merged:
``````bash
git checkout develop
git pull
git branch -d feature/your-feature-name  # Delete old branch
# Start next feature...
``````

---

## 🐳 Docker (Sprint 1 Week 3+)

Once Docker is set up by Xander:
``````bash
# Start all services
docker-compose up

# Start in background
docker-compose up -d

# Stop services
docker-compose down

# Rebuild after changes
docker-compose up --build
``````

---

## 📁 Project Structure
``````
apexf1/
├── etl/              # Hans - ETL pipelines
│   ├── src/
│   ├── tests/
│   ├── venv/        # Not in Git
│   └── requirements.txt
├── ml/               # Kunj - ML models
│   ├── src/
│   ├── notebooks/
│   ├── models/
│   ├── venv/        # Not in Git
│   └── requirements.txt
├── web/              # Yvana, Celine, Xander - Next.js
│   ├── src/
│   ├── public/
│   ├── node_modules/  # Not in Git
│   └── package.json
└── docs/             # Documentation
``````

---

## 🆘 Quick Troubleshooting

**"Command not found"**: Activate your environment first
- Python: ``venv\Scripts\activate``
- Node: ``npm install``

**Git push rejected**: Pull first, then push
``````bash
git pull
git push
``````

**Module not found**:
``````bash
# Python: 
venv\Scripts\activate
pip install -r requirements.txt

# Node: 
npm install
``````

**Merge conflicts**:
``````bash
# Open conflicted files, resolve manually
# Look for <<<<<<< and >>>>>>>
git add .
git commit -m "Resolve merge conflicts"
git push
``````

---

## 📦 Installing Additional Libraries

### Python (Hans & Kunj):
``````bash
venv\Scripts\activate
pip install package-name
pip freeze > requirements.txt  # Update requirements file
``````

### Node (Yvana, Celine, Xander):
``````bash
npm install package-name
# package.json updates automatically
``````

---

## ✅ Important Rules

- ✅ Always branch from ``develop``
- ✅ Always create PRs to ``develop`` (default is set!)
- ✅ Activate Python venv EVERY TIME you work
- ✅ Run ``pip freeze > requirements.txt`` after installing new Python packages
- ✅ Commit ``package.json`` changes when installing Node packages
- ❌ Never commit ``.env`` or ``.env.local`` files
- ❌ Never commit ``venv/`` or ``node_modules/`` folders
- ❌ Never push directly to ``main`` or ``develop``

---

**Questions? Ask in the team chat! 🏁**

# ApexF1 - Formula 1 Data Analytics Platform

End-to-end F1 data analytics platform with ETL pipelines, ML predictions, and interactive dashboards.

---

## 👥 Team

| Person | Role | Work On |
|--------|------|---------|
| **Person A** | ETL Engineer | `etl/` folder |
| **Person B** | Data Scientist | `ml/` folder |
| **Person C, D** | Frontend Developers | `web/` folder |
| **Person E** | Backend Developer | `web/` folder |

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/apexf1.git
cd apexf1
```

### 2. Switch to Develop Branch
```bash
git checkout develop
git pull
```

**⚠️ Always work from `develop`, never directly on `main`**

---

## 💻 Setup Your Environment

### For Person A (ETL - Python)
```bash
cd etl

# Create virtual environment
python -m venv venv

# Activate it (do this EVERY TIME you work)
venv\Scripts\activate

# Install dependencies (when available)
pip install -r requirements.txt

# Create environment file
copy ..\.env.example .env
# Edit .env with your Supabase credentials
```

**Run ETL:**
```bash
venv\Scripts\activate
python src/your_script.py
```

---

### For Person B (ML - Python)
```bash
cd ml

# Create virtual environment
python -m venv venv

# Activate it (do this EVERY TIME you work)
venv\Scripts\activate

# Install dependencies (when available)
pip install -r requirements.txt

# Create environment file
copy ..\.env.example .env
```

**Run Jupyter:**
```bash
venv\Scripts\activate
jupyter notebook
```

---

### For Persons C, D, E (Web - Next.js)
```bash
cd web

# Install dependencies
npm install

# Create environment file
copy .env.example .env.local
# Edit .env.local with Supabase credentials
```

**Run dev server:**
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

---

## 🔄 Git Workflow

### Every Time You Start Working:
```bash
# 1. Get latest code
git checkout develop
git pull

# 2. Create your feature branch
git checkout -b feature/your-feature-name
# Examples: feature/etl-races, feature/frontend-dashboard

# 3. Work on your code...

# 4. Commit your changes
git add .
git commit -m "Describe what you did"

# 5. Push your branch
git push -u origin feature/your-feature-name
```

### Create Pull Request:

1. Go to GitHub
2. Click "Compare & pull request"
3. **⚠️ IMPORTANT**: Change **base** to `develop` (not main!)
4. Create PR and request review
5. After approval, merge

### After Your PR is Merged:
```bash
git checkout develop
git pull
git branch -d feature/your-feature-name  # Delete old branch
# Start next feature...
```

---

## 🐳 Docker (Sprint 1 Week 3+)

Once Docker is set up:
```bash
# Start all services
docker-compose up

# Stop services
docker-compose down
```

---

## 📁 Project Structure
```
apexf1/
├── etl/           # Person A - ETL pipelines
├── ml/            # Person B - ML models
├── web/           # Persons C,D,E - Next.js app
└── docs/          # Documentation
```

---

## 🆘 Quick Troubleshooting

**"Command not found"**: Activate your environment first
- Python: `venv\Scripts\activate`
- Node: `npm install`

**Git push rejected**: Pull first, then push
```bash
git pull
git push
```

**Module not found**:
```bash
# Python: pip install -r requirements.txt
# Node: npm install
```

---

## ✅ Important Rules

- ✅ Always branch from `develop`
- ✅ Always create PRs to `develop` (NOT `main`)
- ✅ Activate Python venv EVERY TIME you work
- ❌ Never commit `.env` files
- ❌ Never push directly to `main` or `develop`

---

**Questions? Ask in the team chat! 🏁**

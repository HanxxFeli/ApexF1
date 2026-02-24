# Dockerfile - ApexF1 ETL Pipeline
# To Build: docker build -t apexf1-etl . (run inside etl/)
# To Run: docker run --env-file ../.env apexf1-etl

# Start from python official image
FROM python:3.12-slim

# Set working dir inside container
WORKDIR /app

# Install python dependencies
# Docker cache each step 
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy ETL package (done after requirements)
COPY src/ ./src/

# Copy pipeline runner script 
COPY run_etl.py .

# Copy raw CSV data into container from data 
COPY data/ ./data/

# Make Python print log output from logger immediately
ENV PYTHONUNBUFFERED=1

# CMD for when container starts (Credentials are passed in at runtime via --env-file)
CMD ["python", "run_etl.py"]
#!/usr/bin/env bash

# Exit on error
set -o errexit

# Upgrade pip and install dependencies
pip install --upgrade pip setuptools wheel

# Check Python version and conditionally install backports.zoneinfo if Python < 3.9
# python_version=$(python -c 'import sys; print(sys.version_info[:2])')
# if [[ "$python_version" < "(3, 9)" ]]; then
#     pip install backports.zoneinfo==0.2.1
# fi

pip install -r requirements.txt

# Collect static files and run migrations
python manage.py collectstatic --no-input
python manage.py migrate

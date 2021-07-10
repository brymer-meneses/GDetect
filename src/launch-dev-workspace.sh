
#!/bin/bash


PROJECT_DIR=~/Projects/GDetect
CONDA_INIT=~/.local/share/apps/miniconda3/etc/profile.d/conda.sh

# Source miniconda to change environment
source $CONDA_INIT
conda activate gdetect

# Launch another kitty instance and run the FRONTEND server
kitty --directory="${PROJECT_DIR}/src/frontend" yarn start &

# Launch Neovim
cd $PROJECT_DIR
kitty --directory="${PROJECT_DIR}/src" nvim &

# Run the BACKEND server
cd $PROJECT_DIR/src/backend
uvicorn main:app --host 127.0.0.1 --port 8000 --reload



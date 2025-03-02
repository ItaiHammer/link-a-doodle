# Commands to Use Docker

### For Dev:

- Running:
    ```bash
    docker-compose -f docker-compose.dev.yaml up -d
    ```
    - **Description:** Starts the services defined in `docker-compose.dev.yaml` in detached mode (background).
    - **Command Breakdown:**
        - `docker-compose`: The Docker Compose command-line tool.
        - `-f docker-compose.dev.yaml`: Specifies the Compose file to use (`docker-compose.dev.yaml`).
        - `up`: Creates and starts the containers.
        - `-d`: Runs the containers in detached mode (in the background).

- Stopping:
    ```bash
    docker-compose -f docker-compose.dev.yaml down --volumes --rmi all
    ```
    - **Description:** Stops and removes the containers, networks, and volumes defined in `docker-compose.dev.yaml`. Also removes all images built by Docker Compose.
    - **Command Breakdown:**
        - `docker-compose`: The Docker Compose command-line tool.
        - `-f docker-compose.dev.yaml`: Specifies the Compose file to use (`docker-compose.dev.yaml`).
        - `down`: Stops and removes the containers, networks, and volumes.
        - `--volumes`: Removes the volumes created by Docker Compose.
        - `--rmi all`: Removes all images built by Docker Compose.

### For Production:

- Running:
    ```bash
    docker-compose up -d
    ```
    - **Description:** Starts the services defined in `docker-compose.yml` in detached mode (background).
    - **Command Breakdown:**
        - `docker-compose`: The Docker Compose command-line tool.
        - `up`: Creates and starts the containers.
        - `-d`: Runs the containers in detached mode (in the background).

- Stopping:
    ```bash
    docker-compose down --volumes --rmi all
    ```
    - **Description:** Stops and removes the containers, networks, and volumes defined in `docker-compose.yml`. Also removes all images built by Docker Compose.
    - **Command Breakdown:**
        - `docker-compose`: The Docker Compose command-line tool.
        - `down`: Stops and removes the containers, networks, and volumes.
        - `--volumes`: Removes the volumes created by Docker Compose.
        - `--rmi all`: Removes all images built by Docker Compose.

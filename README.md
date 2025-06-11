# Local Server

## Phase 0

    - [x] Flash Pi OS Lite
    - [x] Attach Pi to power and router via ethernet cord
    - [x] ssh in (find ip via ISP dashboard for router)
    - [x] Change password
    - [ ] Add authorized key to pi
      - On work computer: copy output from `cat [ssh key .pub file]`
      - On pi: `mkdir -p ~/.ssh/authorized_keys`
      - Pi: paste ssh key into `nano ~/.ssh/authorized_keys`
      - Pi: `chmod 700 ~/.ssh`
      - Pi: `chmod 600 ~/.ssh/authorized_keys`
    - [ ] Expand memory
      - `sudo raspi-config` -> advanced options ->
    - [ ] Update/download software
      - `sudo apt-get update && sudo apt-get upgrade -y`
      - `curl -fsSL https://get.docker.com -o get-docker.sh`
      - `sudo sh get-docker.sh`
      - `sudo usermod -aG docker $USER`
      - `sudo apt-get install git`
    - [ ] copy the start-local-server.sh text into a ~/start-local-server.sh file
    - [ ] update permissions

## Phase 1

-   [ ] Setup MongoDB
-   [ ] Is there a prebuilt MongoDB dashboard?
-   [ ] Update es practice script to write DB to MongoDB
-   [ ] Create react frontend

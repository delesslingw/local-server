# Local Server

## Phase 0

    - [x] Flash Pi OS Lite
    - [x] Attach Pi to power and router via ethernet cord
    - [x] ssh in (find ip via ISP dashboard for router)
    - [x] Change password
    - [x] Add authorized key to pi
      - On work computer: copy output from `cat [ssh key .pub file]`
      - On pi: `mkdir -p ~/.ssh/authorized_keys`
      - Pi: paste ssh key into `nano ~/.ssh/authorized_keys`
      - Pi: `chmod 700 ~/.ssh`
      - Pi: `chmod 600 ~/.ssh/authorized_keys`
    - [x] Expand memory
      - `sudo raspi-config` -> advanced options ->
    - [x] Update/download software
      - `sudo apt-get update && sudo apt-get upgrade -y`
      - `curl -fsSL https://get.docker.com -o get-docker.sh`
      - `sudo sh get-docker.sh`
      - `sudo usermod -aG docker $USER`
      - `sudo apt-get install git`
    - [x] copy the start-local-server.sh text into a ~/start-local-server.sh file
    - [x] Add reboot script
      - `crontab -e`
      - `@reboot /home/pi/start-local-server.sh`
      - `chmod +x /home/pi/start-local-server.sh`

## Phase 1

-   [x] Setup MongoDB
    -   Adjust docker-compose
    -   add endpoints in router
-   [x] Is there a prebuilt MongoDB dashboard?
-   [x] Create minimal react frontend
-   [ ] Add tailwind-css and shadcn

## Setup Reverse Poxy

-   [ ] `sudo apt update`
-   [ ] `sudo apt install nginx`
-   [ ] `sudo nano /etc/nginx/sites-available/reverse-proxy`
        ```nginx
        server {
        listen 80;
        server_name api.pi;

              location / {
                  proxy_pass http://localhost:3000;
                  proxy_set_header Host $host;
                  proxy_set_header X-Real-IP $remote_addr;
              }

          }
    ```
- [ ] `sudo ln -s /etc/nginx/sites-available/reverse-proxy /etc/nginx/sites-enabled/`
- [ ] `sudo nginx -t`



## Phase 2

-   [ ] Update es practice script to write DB to MongoDB
-   [ ] Create frontend display for infinite notecards
-   [ ] Add DB for user data

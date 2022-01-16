#/bin/bash

# Taking Variables from config file
. ./config.sh

printSpaces () {
        for i in {1..2}; do
                echo ""
        done
}

sleep5 () {
        for i in {1..5}; do
                echo $i;
                sleep 1;
        done
}

error() {
        printf "Error:\%s\\n" "$1" >&2; exit 1;
}

# port=5000;

# container_name="psql-container1";
# psql_user="postgres";
# psql_pass="secret";
# psql_db="newdb";
# psql_port=8082;

# Create Docker Container
echo "###############################"
echo "Creating Docker Container with name=$container_name";
sudo docker run --name \
  $container_name -p $psql_port:5432 \
  -e POSTGRES_PASSWORD=$psql_pass \
  -d postgres || error "Docker container error"

printSpaces

echo "Sleeping for 5 seconds"

create_db_file="recreate_database.sh"
sleep5 

printSpaces

### Creating Database
./$create_db_file

printSpaces

echo "Creating .env File"
# Creating Env file
echo "PORT=$port" > .env;
echo "";
echo "DB_HOST=localhost" >> .env;
echo "DB_USER=$psql_user" >> .env;
echo "DB_PASSWORD=$psql_pass" >> .env;
echo "DB_DATABASE=$psql_db" >> .env;
echo "DB_PORT=$psql_port" >> .env;

printSpaces

### Installing Packages

echo "Installing Packages"
npm install

printSpaces
echo "Everything Completed"
echo "###############################"

printSpaces

echo "Run \`npm start\` for starting server "
echo "Run \`npm run dev\` for running development server "
#/bin/bash

. ./config.sh
# $($(cat config.sh))

echo "###############################"
echo "Recreating Database";

input_file=database.sql

# checking if container_name exists and if not then set them
if [ -z ${container_name} ]; then 
    # If not Exists
    container_name="postgres";
    psql_user="postgres";
    psql_db="demodb2";
else 
    # If Exists
    echo "container_name is set to '$container_name'"; 
    echo "psql_user is set to '$psql_user'"; 
    echo "psql_db is set to '$psql_db'"; 
fi

# container_name="postgres";
# psql_user="postgres";
# psql_db="demodb2";

sudo docker exec -it $container_name psql -U $psql_user -c "DROP DATABASE IF EXISTS $psql_db"
echo "Deleted Database If Exists";
sudo docker exec -it $container_name psql -U $psql_user -c "CREATE DATABASE $psql_db";
echo "Created Database";

fileData=$(echo $(cat $input_file | grep -v "\-\-"));
sudo docker exec -it $container_name psql -U $psql_user -d $psql_db -c "$(echo $fileData)";
echo "Created All Tables And Inserted All Data";

echo "Database Work Finished";
echo "###############################";
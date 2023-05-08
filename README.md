- tạo tất cả table trong db: npx sequelize-cli db:migrate

- cấu hình deploy database
  DB_HOST=aws.connect.psdb.cloud
  DB_DATABASE_NAME=s-market
  DB_USERNAME=qtx1b9v8vi73rdoiqlh7
  DB_PASSWORD=pscale_pw_kSv61PmR0q5EaTu83lYhmqJxniz1oAxO1rs4oCK4JxM
  DB_DIALECT=mysql
  //run at localhost, set ssl to false; run on heroku, set ssl to true
  DB_SSL=true

- cấu hình sử dụng ở local
  DB_HOST=localhost
  DB_DATABASE_NAME=s-market
  DB_USERNAME=root
  DB_PASSWORD=
  DB_DIALECT=mysql
  //run at localhost, set ssl to false; run on heroku, set ssl to true
  DB_SSL=false

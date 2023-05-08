- tạo tất cả table trong db: npx sequelize-cli db:migrate

- cấu hình deploy database
  DB_HOST=aws.connect.psdb.cloud
  DB_DATABASE_NAME=s-market
  DB_USERNAME=qguatb0iqgpqqqm8xtb5
  DB_PASSWORD=pscale_pw_C5FFL9xrDGY0tOonGZhq2NokQmJ4ywQr0TkZYMVTYK1
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

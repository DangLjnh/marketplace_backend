- tạo tất cả table trong db: npx sequelize-cli db:migrate

- cấu hình deploy database
  DB_HOST=aws.connect.psdb.cloud
  DB_DATABASE_NAME=s-market
  DB_USERNAME=y3q1djedyvnccyl1929l
  DB_PASSWORD=pscale_pw_WnfZRR1UvJ7Lg6Xkf7GFQ58e77w6bHZYiEPfbNwhQGj
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

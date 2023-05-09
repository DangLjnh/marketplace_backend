- tạo tất cả table trong db: npx sequelize-cli db:migrate

- cấu hình deploy database
  DB_HOST=aws.connect.psdb.cloud
  DB_DATABASE_NAME=s-market
  DB_USERNAME=uzcfx9mwfejtfqo179u8
  DB_PASSWORD=pscale_pw_nBs7dOprq1W08rUGRWWfuxGTo2wNo695Bn00KJ03M0d
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

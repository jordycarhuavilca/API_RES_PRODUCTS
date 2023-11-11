# API_RES_PRODUCTS_SERVER_A
NODE.JS-SEQUELIZE-MYSQL
user endpoint

curl --location 'http://localhost:3004/user/74378866'
curl --location 'http://localhost:3004/user/checkout/listUsers'
curl --location 'http://localhost:3004/user/add' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'document_Identity=9948585' \
--data-urlencode 'name=fabrizio' \
--data-urlencode 'fatherLastName=mato' \
--data-urlencode 'motherLastName=ganto'


order endpoint
curl --location 'http://localhost:3004/order/checkout/74378866/buying' \
--header 'Content-Type: application/json' \
--data '[
    {
        "quantity" : 1,
        "price" : 3239.00,
        "product_id": 1
    },
    {
        "quantity" : 1,
        "price" : 1799.00,
        "product_id": 2
    },
    {
        "quantity" : 1,
        "price" : 639.00,
        "product_id": 3
    }
]
curl --location 'http://localhost:3004/order/9459595/my_purchases'
curl --location 'http://localhost:3004/order/1/getOrdersDetail'

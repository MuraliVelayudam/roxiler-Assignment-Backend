
# Roxiler Backend Assignment

Backend Task: Product Transaction API
This repository contains a backend API for managing product transactions. The API fetches data from a third-party source, initializes a database with seed data, and provides various endpoints for querying and analyzing product transactions.


## Backend API

https://roxiler-assignment-backend-aq9d.onrender.com

## Dependencies
cors: ^2.8.5
dotenv: ^16.4.5
express: ^4.19.2
mongodb: ^6.7.0
mongoose: ^8.4.3
morgan: ^1.10.0

##Development Dependencies
nodemon: ^3.1.3


## API Reference

#### Get all items

```http
  GET /api/transaction
  An API to list the all transactions
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
|  | `string` | To Get all Transaction|

Default pagination values will be like page = 1, per page = 10
search text on product title/description/price
search and pagination on product transactions
#### Get item

```http
GET /api/statistics
API for statistics
Total sale amount of selected month
Total number of sold items of selected month
Total number of not sold items of selected month
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | To get statistics |

#### Get item

```http
GET /api/chart
API for bar chart ( the response should contain price range and the number
of items in that range for the selected month regardless of the year )
- 0 - 100
- 101-200
- 201-300
- 301-400
- 401-500
- 501-600
- 601-700
- 701-800
- 801-900
- 901-above
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | To get bar Chart data |

#### Get item

```http
GET /api/pie
API for pie chart 
Find unique categories of items from that category for 
the selected month
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | To get an unique categories |

## Authors

- [@muralivelayudam](https://github.com/MuraliVelayudam/roxiler-Assignment-Backend)


## Deployment

To deploy this project run

```install
  npm install
```

```start
  npm run start
```

```Dev
  npm run dev
```


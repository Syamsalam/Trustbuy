# by Syamsalam

## _SIMPLE CRUD NODEJS WITH PRISMA JS_

![Prisma](https://i.imgur.com/h6UIYTu.png)

<div align="center">
  <h1>Prisma</h1>
  <a href="https://www.npmjs.com/package/prisma"><img src="https://img.shields.io/npm/v/prisma.svg?style=flat" /></a>
  <a href="https://github.com/prisma/prisma/blob/main/CONTRIBUTING.md"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" /></a>
  <a href="https://github.com/prisma/prisma/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-Apache%202-blue" /></a>
  <a href="https://slack.prisma.io/"><img src="https://img.shields.io/badge/chat-on%20slack-blue.svg" /></a>
  <br />
  <br />
  <a href="https://www.prisma.io/docs/getting-started/quickstart">Quickstart</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://www.prisma.io/">Website</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://www.prisma.io/docs/">Docs</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://github.com/prisma/prisma-examples/">Examples</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://www.prisma.io/blog">Blog</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://slack.prisma.io/">Slack</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://twitter.com/prisma">Twitter</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://github.com/prisma/prisma1">Prisma 1</a>
  <br />
  <hr />
</div>


## Install npm dependencies:

```
cd crud-node-prisma
npm install
```


## API Reference

#### Get all users

```http
  GET /all-users
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| ``        | `string`` | Untuk Semua Data Users |

#### Create users

```http
  POST /create-users
```

| Body   | Type     | Description                        |
| :----- | :------- | :--------------------------------- |
| `id`| `Int` | **Required**. Untuk penanda Id Users |
| `username` | `string` | **Required**. Untuk Username Users |
| `email`  | `string` | **Required**. Untuk Email Users  |
| `password` | `string` | **Required**. Untuk Password Users |
| `full_name` | `string` | **Required**. Untuk Nama Users |
| `address` | `string` | **Required**. Untuk Alamat Users |
| `phone_number` | `string` | **Required**. Untuk Nomor Telefon Users |
| `role_id` | `Int` | **Required**. Untuk Role Users |



#### Update users

```http
  UPDATE /update-users/${id}
```

| Parameter | Type     | Description                              |
| :-------- | :------- | :--------------------------------------- |
| `id`     | `Int` | **Required**.Sebagai Penanda Id Update |

| Body   | Type     | Description                        |
| :----- | :------- | :--------------------------------- |
| `username` | `string` | **Required**. Untuk Username Users |

#### Delete users

```http
  DELETE /delete-users/${id}
```

| Parameter | Type     | Description                              |
| :-------- | :------- | :--------------------------------------- |
| `id`     | `Int` | **Required**.Sebagai Penanda Id |



#### Get all products

```http
  GET /all-products
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| ``        | `string`` | Untuk Semua Data Products |

#### Create products

```http
  POST /create-products
```

| Body   | Type     | Description                        |
| :----- | :------- | :--------------------------------- |
| `id`| `Int` | **Required**. Untuk penanda Id Products |
| `product_name` | `string` | **Required**. Untuk Nama Products |
| `description`  | `string` | **Required**. Untuk Deskripsi Products |
| `price` | `Decimal` | **Required**. Untuk Harga Products |
| `stock` | `Int` | **Required**. Untuk Stok Products |
| `category_id` | `Int` | **Required**. Untuk Category Products |


#### Update products

```http
  UPDATE /update-products/${id}
```

| Parameter | Type     | Description                              |
| :-------- | :------- | :--------------------------------------- |
| `id`     | `Int` | **Required**.Sebagai Penanda Id Update |

| Body   | Type     | Description                        |
| :----- | :------- | :--------------------------------- |
| `product_name` | `string` | **Required**. Untuk Nama Products |

#### Delete products

```http
  DELETE /delete-products/${id}
```

| Parameter | Type     | Description                              |
| :-------- | :------- | :--------------------------------------- |
| `id`     | `Int` | **Required**.Sebagai Penanda Id |



#### Get all orders

```http
  GET /all-orders
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| ``        | `string`` | Untuk Semua Data Orders |

#### Create orders

```http
  POST /create-orders
```

| Body   | Type     | Description                        |
| :----- | :------- | :--------------------------------- |
| `id`| `Int` | **Required**. Untuk penanda Id Orders |
| `user_id` | `Int` | **Required**. Untuk User Orders |
| `order_date`  | `DateTime` | **Required**. Untuk Waktu Orders |
| `status_id` | `Int` | **Required**. Untuk Status Orders |
| `shipping_address` | `String` | **Required**. Untuk Alamat Pengirim Orders |
| `payment_method_id` | `Int` | **Required**. Untuk Pembayaran Orders |


#### Update orders

```http
  UPDATE /update-orders/${id}
```

| Parameter | Type     | Description                              |
| :-------- | :------- | :--------------------------------------- |
| `id`     | `Int` | **Required**.Sebagai Penanda Id Update |

| Body   | Type     | Description                        |
| :----- | :------- | :--------------------------------- |
| `shipping_address` | `string` | **Required**. Untuk Alamat Pengirim Orders |

#### Delete orders

```http
  DELETE /delete-orders/${id}
```

| Parameter | Type     | Description                              |
| :-------- | :------- | :--------------------------------------- |
| `id`     | `Int` | **Required**.Sebagai Penanda Id |



#### Get all order-items

```http
  GET /all-order-items
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| ``        | `string`` | Untuk Semua Data Order-items |

#### Create order-items

```http
  POST /create-order-items
```

| Body   | Type     | Description                        |
| :----- | :------- | :--------------------------------- |
| `id`| `Int` | **Required**. Untuk penanda Id Order-items |
| `order_id` | `Int` | **Required**. Untuk Id Order-items |
| `product_id`  | `Int` | **Required**. Untuk Id Produk Order-items  |
| `quantity` | `Int` | **Required**. Untuk Jumlah Order-items |
| `subtotal` | `Decimal` | **Required**. Untuk Subtotal Order-items |

#### Update order-items

```http
  UPDATE /update-order-items/${id}
```

| Parameter | Type     | Description                              |
| :-------- | :------- | :--------------------------------------- |
| `id`     | `Int` | **Required**.Sebagai Penanda Id Update |

| Body   | Type     | Description                        |
| :----- | :------- | :--------------------------------- |
| `quantity` | `Int` | **Required**. Untuk Subtotal Order-items |

#### Delete order-items

```http
  DELETE /delete-order-items/${id}
```

| Parameter | Type     | Description                              |
| :-------- | :------- | :--------------------------------------- |
| `id`     | `Int` | **Required**.Sebagai Penanda Id |



#### Get all payment

```http
  GET /all-payment
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| ``        | `string`` | Untuk Semua Data Payment |

#### Create payment

```http
  POST /create-payment
```

| Body   | Type     | Description                        |
| :----- | :------- | :--------------------------------- |
| `id`| `Int` | **Required**. Untuk penanda Id Payment |
| `order_id` | `Int` | **Required**. Untuk Id Payment |
| `payment_date`  | `DateTime` | **Required**. Untuk Waktu Pembayaran Payment  |
| `amount` | `Decimal` | **Required**. Untuk Jumlah Payment |

#### Update payment

```http
  UPDATE /update-payment/${id}
```

| Parameter | Type     | Description                              |
| :-------- | :------- | :--------------------------------------- |
| `id`     | `Int` | **Required**.Sebagai Penanda Id Update |

| Body   | Type     | Description                        |
| :----- | :------- | :--------------------------------- |
| `amount` | `Decimal` | **Required**. Untuk Jumlah Payment |

#### Delete payment

```http
  DELETE /delete-payment/${id}
```

| Parameter | Type     | Description                              |
| :-------- | :------- | :--------------------------------------- |
| `id`     | `Int` | **Required**.Sebagai Penanda Id |


# trustBuy-backend

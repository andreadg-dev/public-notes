# DATABASE NOTES #

- [DATABASE NOTES](#database-notes)
  - [How to create a table](#how-to-create-a-table)
  - [How to add values to a table](#how-to-add-values-to-a-table)
  - [How to get/filter data from a table](#how-to-getfilter-data-from-a-table)
  - [How to update a value](#how-to-update-a-value)
  - [How to add a column to the table](#how-to-add-a-column-to-the-table)
  - [How to update a row](#how-to-update-a-row)
  - [How to delete a row from a table](#how-to-delete-a-row-from-a-table)
  - [Foreign Keys](#foreign-keys)
  - [How to join all revelant values in a new table](#how-to-join-all-revelant-values-in-a-new-table)



## How to create a table ##

Use https://sqliteonline.com/ for testing purposes.

**Example 1**
```sql
CREATE TABLE customers(
  id INT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  PRIMARY KEY(id)
)

/*or*/

CREATE TABLE customers(
  id SERIAL PRIMARY KEY,
  first_name TEXT,
  last_name TEXT
)
```

**Example 2**
```sql
CREATE TABLE products(
  id INT NOT NULL,
  name TEXT,
  price REAL,
  PRIMARY KEY(id)
)
```
- `TEXT` is used to declare string data type. This data type is flexible since it only stores the data in the cell and we do not have to declare any data limit, for instance, like we would do when using `VARCHAR`
- `INT` is used to declare integer data type
- `REAL` is used to declare float data type
- The `PRIMARY KEY` value must always be provided and it is usually used with a unique value in the table, for instance the ID value
- `SERIAL` stores a sequential integer, of the INT data type, that is automatically assigned by the database server when a new row is inserted. The default serial starting number is 1. In this case, there is no need to specify the SERIAL value when adding new rows 


## How to add values to a table ##

**Example 1**

```sql
INSERT INTO customers
VALUES 
   (1,"John","Doe"),
   (2,"Jane","Doe");
```

**Example 2**
```sql
INSERT INTO products
VALUES 
   (1,"Laptop",399.9),
   (2,"Mouse",15.5);
```

No need to specify the columns when adding values for all columns. On the contrary, when adding only some value, specify the columns too:

```sql
INSERT INTO customers (id, last_name)
VALUES
	(3, "Jackson"),
	(4, "Rickson"),
	(5, "Dickson");
```
Insert is used to add new rows to the table. If we want to update a value in a row, then we should use the `UPDATE` statement.




## How to get/filter data from a table ##

```sql
SELECT * FROM customers
```
This returns everything from the `customers` table.

```sql
SELECT name, price FROM products
```
This returns only the name and price columns of the products table

Filter with operators
```sql
SELECT * FROM products WHERE id=1
```
This returns all values from the raw with id = 1





## How to update a value ##

```sql
UPDATE customers
SET first_name = "Johnson"
WHERE id=3
```
Remember to specify which colomn to update with an operator (`WHERE`, `IN`, `BETWEEN` etc)







## How to add a column to the table ##

```sql
ALTER TABLE products
ADD stock INT
```





## How to update a row ##


```sql
UPDATE products
SET stock=12
WHERE id=2
```





## How to delete a row from a table ##

```sql
DELETE FROM products
WHERE id=2
```
Alway specify which row should be deleted, else the all table will be deleted.





## Foreign Keys ##

A `FOREIGN KEY` is a field (or collection of fields) in one table, that refers to the `PRIMARY KEY` in another table.

The table with the foreign key is called the child table, and the table with the primary key is called the referenced or parent table (see https://www.w3schools.com/sql/sql_foreignkey.asp).

```sql
CREATE TABLE orders(
  id INT NOT NULL,
  order_number INT,
  customer_id INT,
  product_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY (customer_id) REFERENCES customers(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
)
```
Inserting a row as an example:
```sql
INSERT INTO orders
VALUES (1, 4362, 2, 1)
```





## How to join all revelant values in a new table ##

The `INNER JOIN` keyword selects records that have matching values in both tables. This is possible by leveraging the foreign and primary keys in the aforementioned table:

```sql
SELECT orders.id, customers.first_name, customers.last_name, products.name, products.price
FROM orders
INNER JOIN customers ON orders.customer_id = customers.id
INNER JOIN products ON orders.product_id = products.id
```

You first select all the revelant columns using the parent.child syntax and then specifying the matching criteria between foreign keys of the parent table and the primary keys of the children tables.

In the example above, we are joining 3 tables but this can be done with 2, 4 or more.










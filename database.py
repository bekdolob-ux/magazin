import sqlite3
from datetime import datetime

conn = sqlite3.connect("store.db", check_same_thread=False)
cur = conn.cursor()

cur.execute("""
CREATE TABLE IF NOT EXISTS products(
id INTEGER PRIMARY KEY AUTOINCREMENT,
name TEXT,
price REAL,
quantity INTEGER
)
""")

cur.execute("""
CREATE TABLE IF NOT EXISTS sales(
id INTEGER PRIMARY KEY AUTOINCREMENT,
product TEXT,
qty INTEGER,
total REAL,
date TEXT
)
""")

conn.commit()

# ➕ товар кошуу
def add_product(name, price, qty):
    cur.execute("INSERT INTO products(name,price,quantity) VALUES (?,?,?)",
                (name, price, qty))
    conn.commit()

# 📦 товарлар
def get_products():
    cur.execute("SELECT * FROM products")
    return cur.fetchall()

# 📉 складдан чыгаруу
def update_stock(name, qty):
    cur.execute("UPDATE products SET quantity = quantity - ? WHERE name=?",
                (qty, name))
    conn.commit()

# 💰 сатуу
def add_sale(product, qty, total):
    cur.execute("INSERT INTO sales(product,qty,total,date) VALUES (?,?,?,?)",
                (product, qty, total, datetime.now().strftime("%Y-%m-%d")))
    conn.commit()

# 📊 отчет
def report():
    cur.execute("SELECT date, SUM(total) FROM sales GROUP BY date")
    return cur.fetchall()
